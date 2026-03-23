import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kaustubhkislay.com",
      lastModified: new Date(),
    },
    {
      url: "https://kaustubhkislay.com/reading",
      lastModified: new Date(),
    },
  ];
}
