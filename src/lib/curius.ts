import { classifyLinks, type LinkTag } from "./classify";

const CURIUS_USERNAME = "kaustubh-kislay";

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
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
  );
  if (!userRes.ok) return null;
  const { user } = await userRes.json();
  return user.id;
}

async function fetchUserLinks(): Promise<{ links: CuriusLink[]; userId: number } | null> {
  const userId = await fetchUserId();
  if (!userId) return null;

  const linksRes = await fetch(
    `https://curius.app/api/users/${userId}/links?page=0`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
  );
  if (!linksRes.ok) return null;

  const { userSaved } = await linksRes.json();
  return { links: userSaved as CuriusLink[], userId };
}

async function fetchAllUserLinks(): Promise<{ links: CuriusLink[]; userId: number } | null> {
  const userId = await fetchUserId();
  if (!userId) return null;

  const all: CuriusLink[] = [];
  let page = 0;

  while (true) {
    const res = await fetch(
      `https://curius.app/api/users/${userId}/links?page=${page}`,
      { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
    );
    if (!res.ok) break;

    const { userSaved } = await res.json();
    if (!userSaved || userSaved.length === 0) break;

    all.push(...(userSaved as CuriusLink[]));
    page++;
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

export async function getTodaysReading(): Promise<ReadingItem[]> {
  const data = await fetchAllUserLinks();
  if (!data) return [];

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const todayLinks = data.links
    .filter((item) => new Date(item.createdDate).getTime() >= startOfDay)
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  const tagMap = await classifyLinks(
    todayLinks.map((item) => ({ url: item.link, title: item.title, snippet: item.snippet }))
  );

  return todayLinks.map((item) => toReadingItem(item, data.userId, tagMap.get(item.link) ?? null));
}

export async function getAllReading(): Promise<ReadingItem[]> {
  const data = await fetchAllUserLinks();
  if (!data) return [];

  const sorted = data.links
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  const tagMap = await classifyLinks(
    sorted.map((item) => ({ url: item.link, title: item.title, snippet: item.snippet }))
  );

  return sorted.map((item) => toReadingItem(item, data.userId, tagMap.get(item.link) ?? null));
}

export async function getFavoriteReading(): Promise<ReadingItem[]> {
  const data = await fetchAllUserLinks();
  if (!data) return [];

  const favorites = data.links
    .filter((item) => item.favorite)
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  const tagMap = await classifyLinks(
    favorites.map((item) => ({ url: item.link, title: item.title, snippet: item.snippet }))
  );

  return favorites.map((item) => toReadingItem(item, data.userId, tagMap.get(item.link) ?? null));
}
