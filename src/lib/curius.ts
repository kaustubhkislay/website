const CURIUS_USERNAME = "kaustubh-kislay";

interface CuriusLink {
  id: number;
  link: string;
  title: string;
  snippet: string | null;
  createdBy: number;
  createdDate: string;
  highlights: { highlight: string }[];
}

export interface ReadingItem {
  title: string;
  url: string;
  date: string;
  snippet: string | null;
  highlights: string[];
}

export async function getRecentReading(limit = 10): Promise<ReadingItem[]> {
  const userRes = await fetch(
    `https://curius.app/api/users/${CURIUS_USERNAME}`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
  );

  if (!userRes.ok) return [];

  const { user } = await userRes.json();

  const linksRes = await fetch(
    `https://curius.app/api/users/${user.id}/links?page=0`,
    { headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` }, next: { revalidate: 3600 } }
  );

  if (!linksRes.ok) return [];

  const { userSaved } = await linksRes.json();

  return (userSaved as CuriusLink[])
    .filter((item) => item.createdBy === user.id)
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, limit)
    .map((item) => ({
      title: item.title,
      url: item.link,
      date: new Date(item.createdDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      snippet: item.snippet && item.snippet !== "N/A" ? item.snippet : null,
      highlights: item.highlights
        .map((h) => h.highlight)
        .filter(Boolean),
    }));
}
