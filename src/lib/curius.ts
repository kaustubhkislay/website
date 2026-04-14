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
}

async function fetchUserId(): Promise<number | null> {
  const userRes = await fetch(
    `https://curius.app/api/users/${CURIUS_USERNAME}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 86400 } }
  );
  if (!userRes.ok) return null;
  const { user } = await userRes.json();
  return user.id;
}

async function fetchPage(userId: number, page: number): Promise<CuriusLink[] | null> {
  const res = await fetch(
    `https://curius.app/api/users/${userId}/links?page=${page}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const { userSaved } = await res.json();
  return (userSaved as CuriusLink[]) ?? [];
}

async function fetchAllUserLinks(): Promise<{ links: CuriusLink[]; userId: number } | null> {
  const userId = await fetchUserId();
  if (!userId) return null;

  const all: CuriusLink[] = [];
  let startPage = 0;
  // Fetch pages in parallel batches; stop when a batch returns any empty page.
  while (true) {
    const pages = Array.from({ length: PAGE_BATCH }, (_, i) => startPage + i);
    const results = await Promise.all(pages.map((p) => fetchPage(userId, p)));
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
  };
}

async function applyTags(
  links: CuriusLink[],
  userId: number
): Promise<ReadingItem[]> {
  const tagMap = await getCachedTags(links.map((l) => ({ url: l.link })));
  return links.map((item) => toReadingItem(item, userId, tagMap.get(item.link) ?? null));
}

export async function getHomeReading(): Promise<{ today: ReadingItem[]; favorites: ReadingItem[] }> {
  const data = await fetchAllUserLinks();
  if (!data) return { today: [], favorites: [] };

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

  return { today, favorites };
}

export async function getAllReading(): Promise<ReadingItem[]> {
  const data = await fetchAllUserLinks();
  if (!data) return [];
  const sorted = [...data.links].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
  return applyTags(sorted, data.userId);
}
