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
}

async function fetchUserLinks(): Promise<{ links: CuriusLink[]; userId: number } | null> {
  const userRes = await fetch(
    `https://curius.app/api/users/${CURIUS_USERNAME}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
  );

  if (!userRes.ok) return null;

  const { user } = await userRes.json();

  const linksRes = await fetch(
    `https://curius.app/api/users/${user.id}/links?page=0`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
  );

  if (!linksRes.ok) return null;

  const { userSaved } = await linksRes.json();
  return { links: userSaved as CuriusLink[], userId: user.id };
}

function toReadingItem(item: CuriusLink, userId: number): ReadingItem {
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
  };
}

export async function getRecentReading(limit = 10): Promise<ReadingItem[]> {
  const data = await fetchUserLinks();
  if (!data) return [];

  return data.links
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, limit)
    .map((item) => toReadingItem(item, data.userId));
}

export async function getFavoriteReading(): Promise<ReadingItem[]> {
  const data = await fetchUserLinks();
  if (!data) return [];

  return data.links
    .filter((item) => item.favorite)
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .map((item) => toReadingItem(item, data.userId));
}
