import type { MetadataRoute } from "next";

export const BASE_URL = "https://kaustubhais.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Update each date when the corresponding page's main content changes.
  return [
    {
      url: BASE_URL,
      lastModified: "2026-11-21",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: "2026-11-12",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
