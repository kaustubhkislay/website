import type { MetadataRoute } from "next";

export const BASE_URL = "https://kaustubhais.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
