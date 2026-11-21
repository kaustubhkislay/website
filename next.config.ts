import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import { getSitemapDates } from "./scripts/sitemap-dates.mjs";

export default function nextConfig(phase: string): NextConfig {
  if (phase !== PHASE_DEVELOPMENT_SERVER && phase !== PHASE_PRODUCTION_BUILD) return {};

  const { home, writing, articles } = getSitemapDates();
  return {
    env: {
      SITEMAP_HOME_LASTMOD: home,
      SITEMAP_WRITING_LASTMOD: writing,
      SITEMAP_ARTICLE_DATES: JSON.stringify(articles),
    },
  };
}
