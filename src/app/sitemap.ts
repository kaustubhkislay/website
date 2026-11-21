import type { MetadataRoute } from "next";

export const BASE_URL = "https://kaustubhais.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const dates: Record<string, string> = JSON.parse(process.env.SITEMAP_ARTICLE_DATES ?? "{}");
  return [
    {
      url: BASE_URL,
      lastModified: process.env.SITEMAP_HOME_LASTMOD,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: process.env.SITEMAP_WRITING_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...Object.entries(dates).map(([slug, date]) => ({
      url: `${BASE_URL}/writing/${slug}`,
      lastModified: date || undefined,
    })),
  ];
}
