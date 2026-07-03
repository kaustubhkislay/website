import { getReadingSnapshot } from "@/lib/curius";
import { BASE_URL } from "../sitemap";

// Same trade as /reading: force-static keeps the Upstash client's no-store
// fetches from making every crawler request hit Redis. Regenerated hourly or
// when the cron sees new links.
export const dynamic = "force-static";
export const revalidate = 3600;

const FEED_LIMIT = 50;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const items = (await getReadingSnapshot()) ?? [];

  const entries = items.slice(0, FEED_LIMIT).map((i) => {
    const pubDate = i.date ? `<pubDate>${new Date(i.date).toUTCString()}</pubDate>` : "";
    const category = i.tag ? `<category>${esc(i.tag)}</category>` : "";
    return `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.url)}</link>
      <guid isPermaLink="false">${esc(i.url)}</guid>
      ${category}${pubDate}
    </item>`;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kaustubh Kislay — Reading</title>
    <link>${BASE_URL}/reading</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Everything I read, tagged.</description>
    <language>en-us</language>
${entries.join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
