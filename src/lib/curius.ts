import { getCachedTags, getRedis, type LinkTag } from "./classify";

const CURIUS_USERNAME = "kaustubh-kislay";
const PAGE_BATCH = 4;
// Curius serves fixed 25-link pages, so a short page marks the end of the
// list — no need to fetch further batches just to find an empty page.
const PAGE_SIZE = 25;
const USER_ID_KEY = "curius:userId";
// Versioned: bump when SnapshotItem gains fields so stale-shaped snapshots
// are rebuilt instead of served without the new data.
const SNAPSHOT_KEY = "curius:snapshot:v2";

interface CuriusLink {
  id: number;
  link: string;
  title: string;
  snippet: string | null;
  favorite: boolean;
  createdBy: number;
  createdDate: string;
  highlights: { highlight: string; userId: number }[];
  userIds: number[];
}

// Slim wire type for the reading page. Snippets and dates are never rendered,
// so they must not reach the client props — they'd be serialized into the RSC
// payload and shipped on every page load. Highlights ARE rendered (expandable
// per item), so they ride along, but only when non-empty.
export type ReadingListItem = {
  title: string;
  url: string;
  tag: LinkTag | null;
  highlights?: string[];
};

// date/highlights are optional so snapshots written before those fields
// existed still deserialize cleanly until the next cron rebuild.
export type SnapshotItem = {
  title: string;
  url: string;
  tag: LinkTag | null;
  favorite: boolean;
  date?: string;
  highlights?: string[];
};

type FetchOpts = { fresh?: boolean };

function cacheOpt(fresh: boolean | undefined, revalidate: number): RequestInit {
  return fresh
    ? { cache: "no-store" }
    : { next: { revalidate } };
}

async function fetchUserId(opts: FetchOpts = {}): Promise<number | null> {
  // The id behind a username never changes, so Redis short-circuits the
  // ~2s Curius profile lookup on every crawl.
  const redis = getRedis();
  if (redis) {
    try {
      const cached = await redis.get<number>(USER_ID_KEY);
      if (cached) return cached;
    } catch {
      // Redis unavailable — fall through to the API lookup.
    }
  }

  const userRes = await fetch(
    `https://curius.app/api/users/${CURIUS_USERNAME}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, ...cacheOpt(opts.fresh, 86400) }
  );
  if (!userRes.ok) return null;
  const { user } = await userRes.json();
  if (redis) {
    try {
      await redis.set(USER_ID_KEY, user.id);
    } catch {
      // Cache write failed; the lookup still succeeded.
    }
  }
  return user.id;
}

async function fetchPage(userId: number, page: number, opts: FetchOpts = {}): Promise<CuriusLink[]> {
  const res = await fetch(
    `https://curius.app/api/users/${userId}/links?page=${page}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, ...cacheOpt(opts.fresh, 3600) }
  );
  // Throw rather than return a sentinel: an HTTP error must not read as
  // end-of-list, or one flaky response silently truncates the crawl.
  if (!res.ok) throw new Error(`Curius page ${page}: HTTP ${res.status}`);
  const { userSaved } = await res.json();
  return (userSaved as CuriusLink[]) ?? [];
}

export async function fetchAllUserLinks(opts: FetchOpts = {}): Promise<{ links: CuriusLink[]; userId: number } | null> {
  try {
    const userId = await fetchUserId(opts);
    if (!userId) return null;

    const all: CuriusLink[] = [];
    let startPage = 0;
    // Fetch pages in parallel batches; a short page ends the crawl.
    while (true) {
      const pages = Array.from({ length: PAGE_BATCH }, (_, i) => startPage + i);
      const results = await Promise.all(pages.map((p) => fetchPage(userId, p, opts)));
      let done = false;
      for (const r of results) {
        all.push(...r);
        if (r.length < PAGE_SIZE) {
          done = true;
          break;
        }
      }
      if (done) break;
      startPage += PAGE_BATCH;
    }

    return { links: all, userId };
  } catch {
    // Callers treat null as "crawl unavailable" and fall back to the snapshot
    // (or empty) — a partial list is never returned or persisted.
    return null;
  }
}

type Crawl = NonNullable<Awaited<ReturnType<typeof fetchAllUserLinks>>>;

export async function buildReadingSnapshot(data: Crawl): Promise<SnapshotItem[]> {
  const sorted = [...data.links].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
  // Unclassified links get null, which renders as no badge.
  const tagMap = await getCachedTags(sorted.map((l) => ({ url: l.link })));
  return sorted.map((l) => ({
    title: l.title,
    url: l.link,
    tag: tagMap.get(l.link) ?? null,
    favorite: l.favorite,
    date: l.createdDate,
    highlights: l.highlights
      .filter((h) => h.userId === data.userId)
      .map((h) => h.highlight)
      .filter(Boolean),
  }));
}

export async function saveReadingSnapshot(items: SnapshotItem[]): Promise<void> {
  const redis = getRedis();
  if (!redis || items.length === 0) return;
  try {
    await redis.set(SNAPSHOT_KEY, items);
  } catch {
    // Write failed; the previous snapshot keeps serving and the next cron
    // run retries.
  }
}

async function loadReadingSnapshot(): Promise<SnapshotItem[] | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const items = await redis.get<SnapshotItem[]>(SNAPSHOT_KEY);
    return Array.isArray(items) && items.length > 0 ? items : null;
  } catch {
    return null;
  }
}

const MANUAL_FAVORITES: SnapshotItem[] = [
  {
    title: "Strategy as a Wicked Problem (Camillus, 2008)",
    url: "https://axveco.com/wp-content/uploads/2020/09/Strategy-as-a-Wicked-Problem-Camillus-2008.pdf",
    tag: null,
    favorite: true,
  },
];

// Served from the Redis snapshot the cron maintains (one round trip); a live
// Curius crawl (~8s of 2-3s API calls) is only the cold-start fallback.
export async function getReadingSnapshot(): Promise<SnapshotItem[] | null> {
  const cached = await loadReadingSnapshot();
  if (cached) return cached;

  const data = await fetchAllUserLinks();
  if (!data) return null;
  const items = await buildReadingSnapshot(data);
  await saveReadingSnapshot(items);
  return items;
}

// Reading page: favorites (manual + flagged) pinned, plus the full read list.
export async function getReadingPageData(): Promise<{
  favorites: ReadingListItem[];
  all: ReadingListItem[];
}> {
  const items = await getReadingSnapshot();

  const slim = (i: SnapshotItem): ReadingListItem => {
    const out: ReadingListItem = { title: i.title, url: i.url, tag: i.tag };
    if (i.highlights?.length) out.highlights = i.highlights;
    return out;
  };
  if (!items) return { favorites: MANUAL_FAVORITES.map(slim), all: [] };

  const manualUrls = new Set(MANUAL_FAVORITES.map((m) => m.url));
  const favorites = [
    ...MANUAL_FAVORITES,
    ...items.filter((i) => i.favorite && !manualUrls.has(i.url)),
  ];

  return { favorites: favorites.map(slim), all: items.map(slim) };
}
