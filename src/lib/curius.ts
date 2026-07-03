import { getCachedTags, type LinkTag } from "./classify";

const CURIUS_USERNAME = "kaustubh-kislay";
const PAGE_BATCH = 4;

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

export interface ReadingItem {
  title: string;
  url: string;
  date: string;
  snippet: string | null;
  highlights: string[];
  tag: LinkTag | null;
  favorite: boolean;
}

type FetchOpts = { fresh?: boolean };

function cacheOpt(fresh: boolean | undefined, revalidate: number): RequestInit {
  return fresh
    ? { cache: "no-store" }
    : { next: { revalidate } };
}

async function fetchUserId(opts: FetchOpts = {}): Promise<number | null> {
  const userRes = await fetch(
    `https://curius.app/api/users/${CURIUS_USERNAME}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, ...cacheOpt(opts.fresh, 86400) }
  );
  if (!userRes.ok) return null;
  const { user } = await userRes.json();
  return user.id;
}

async function fetchPage(userId: number, page: number, opts: FetchOpts = {}): Promise<CuriusLink[] | null> {
  const res = await fetch(
    `https://curius.app/api/users/${userId}/links?page=${page}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, ...cacheOpt(opts.fresh, 3600) }
  );
  if (!res.ok) return null;
  const { userSaved } = await res.json();
  return (userSaved as CuriusLink[]) ?? [];
}

export async function fetchAllUserLinks(opts: FetchOpts = {}): Promise<{ links: CuriusLink[]; userId: number } | null> {
  const userId = await fetchUserId(opts);
  if (!userId) return null;

  const all: CuriusLink[] = [];
  let startPage = 0;
  // Fetch pages in parallel batches; stop when a batch returns any empty page.
  while (true) {
    const pages = Array.from({ length: PAGE_BATCH }, (_, i) => startPage + i);
    const results = await Promise.all(pages.map((p) => fetchPage(userId, p, opts)));
    let done = false;
    for (const r of results) {
      if (!r || r.length === 0) { done = true; continue; }
      all.push(...r);
    }
    if (done) break;
    startPage += PAGE_BATCH;
  }

  return { links: all, userId };
}

function toReadingItem(item: CuriusLink, userId: number, tag: LinkTag | null): ReadingItem {
  return {
    title: item.title,
    url: item.link,
    date: new Date(item.createdDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
    snippet: item.snippet && item.snippet !== "N/A" ? item.snippet : null,
    highlights: item.highlights
      .filter((h) => h.userId === userId)
      .map((h) => h.highlight)
      .filter(Boolean),
    tag,
    favorite: item.favorite,
  };
}

async function applyTags(
  links: CuriusLink[],
  userId: number
): Promise<ReadingItem[]> {
  const tagMap = await getCachedTags(links.map((l) => ({ url: l.link })));
  // Falls back to null (renders as no badge) instead of "other", so unclassified
  // links don't masquerade as deliberately-classified-other.
  return links.map((item) => toReadingItem(item, userId, tagMap.get(item.link) ?? null));
}

const MANUAL_FAVORITES: ReadingItem[] = [
  {
    title: "Strategy as a Wicked Problem (Camillus, 2008)",
    url: "https://axveco.com/wp-content/uploads/2020/09/Strategy-as-a-Wicked-Problem-Camillus-2008.pdf",
    date: "Sep 2008",
    snippet: null,
    highlights: [],
    tag: null,
    favorite: true,
  },
];

export async function getHomeReading(): Promise<{ today: ReadingItem[]; favorites: ReadingItem[] }> {
  const data = await fetchAllUserLinks();
  if (!data) return { today: [], favorites: [...MANUAL_FAVORITES] };

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startMs = startOfDay.getTime();

  const byDate = [...data.links].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  const todayLinks = byDate.filter((i) => new Date(i.createdDate).getTime() >= startMs);
  const favoriteLinks = byDate.filter((i) => i.favorite);

  const [today, favorites] = await Promise.all([
    applyTags(todayLinks, data.userId),
    applyTags(favoriteLinks, data.userId),
  ]);

  const manualUrls = new Set(MANUAL_FAVORITES.map((m) => m.url));
  const merged = [...MANUAL_FAVORITES, ...favorites.filter((f) => !manualUrls.has(f.url))];

  return { today, favorites: merged };
}

export async function getAllLinksForClassification(
  opts: FetchOpts = {}
): Promise<Array<{ url: string; title: string; snippet: string | null }>> {
  const data = await fetchAllUserLinks(opts);
  if (!data) return [];
  return data.links.map((l) => ({ url: l.link, title: l.title, snippet: l.snippet }));
}

export async function getAllReading(): Promise<ReadingItem[]> {
  const data = await fetchAllUserLinks();
  if (!data) return [];
  const sorted = [...data.links].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
  return applyTags(sorted, data.userId);
}

// Slim wire type for the reading page. Snippets/highlights/dates are ~80% of
// the raw data but never rendered, so they must not reach the client props —
// they'd be serialized into the RSC payload and shipped on every page load.
export type ReadingListItem = Pick<ReadingItem, "title" | "url" | "tag">;

// Reading page: favorites (manual + flagged) pinned, plus the full read list.
export async function getReadingPageData(): Promise<{
  favorites: ReadingListItem[];
  all: ReadingListItem[];
}> {
  const slim = ({ title, url, tag }: ReadingItem): ReadingListItem => ({ title, url, tag });

  const data = await fetchAllUserLinks();
  if (!data) return { favorites: MANUAL_FAVORITES.map(slim), all: [] };

  const sorted = [...data.links].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
  const all = await applyTags(sorted, data.userId);

  const manualUrls = new Set(MANUAL_FAVORITES.map((m) => m.url));
  const favorites = [
    ...MANUAL_FAVORITES,
    ...all.filter((a) => a.favorite && !manualUrls.has(a.url)),
  ];

  return { favorites: favorites.map(slim), all: all.map(slim) };
}
