import { getReadingPageData } from "@/lib/curius";
import { ReadingList } from "./reading-list";

// force-static is load-bearing: the Upstash Redis client issues no-store
// fetches, which would otherwise opt this route into dynamic rendering and
// make every visitor pay a full Curius crawl. With it, the page is ISR —
// served from cache, regenerated hourly or when the cron sees new links.
export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Reading",
  description:
    "Everything I read, auto-tagged by topic — AI safety research, policy, self-improvement, and culture.",
  // Canonicalize the query-string filter variants (?tags=…&q=…) to the base page.
  alternates: { canonical: "/reading" },
};

export default async function ReadingPage() {
  const { favorites, all } = await getReadingPageData();

  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
      <ReadingList items={all} favorites={favorites} />
    </div>
  );
}
