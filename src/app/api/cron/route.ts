import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { classifyLinks, getCachedTags, getRedis } from "@/lib/classify";
import { buildReadingSnapshot, fetchAllUserLinks, saveReadingSnapshot } from "@/lib/curius";

const BATCH_SIZE = 25;
const LAST_SEEN_KEY = "cron:lastSeenLinkId";
// Volatile fallback when Redis is absent. Module scope resets on every cold
// start, which is why Redis is the source of truth: a null lastSeenId must
// never be treated as "new content" or the page cache gets purged each run.
let lastSeenIdFallback: number | null = null;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const env = {
    openrouter: Boolean(process.env.OPENROUTER_API_KEY),
    kvUrl: Boolean(process.env.KV_REST_API_URL || process.env.redis1_KV_REST_API_URL),
    kvToken: Boolean(process.env.KV_REST_API_TOKEN || process.env.redis1_KV_REST_API_TOKEN),
  };

  try {
    // One fresh crawl feeds everything below: the new-content check, the
    // classification backfill, and the page snapshot.
    const data = await fetchAllUserLinks({ fresh: true });
    if (!data) return NextResponse.json({ skipped: true, env, stage: "crawl" });

    const latest = [...data.links].sort(
      (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    )[0];

    // Backfill classification for ALL uncached links, regardless of lastSeenId.
    // Redis is authoritative; module-scoped lastSeenId is volatile on serverless.
    const all = data.links.map((l) => ({ url: l.link, title: l.title, snippet: l.snippet }));
    let classified = 0;
    let uncachedCount = 0;
    const errors: string[] = [];
    if (all.length > 0) {
      const cached = await getCachedTags(all.map((l) => ({ url: l.url })));
      const uncached = all.filter((l) => !cached.has(l.url));
      uncachedCount = uncached.length;
      for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
        const batch = uncached.slice(i, i + BATCH_SIZE);
        try {
          const result = await classifyLinks(batch);
          classified += result.size;
        } catch (e) {
          errors.push(e instanceof Error ? e.message : String(e));
        }
      }
    }

    // Persist the render-ready snapshot (built after classification so fresh
    // tags are included); /reading regenerates from this single Redis key
    // instead of re-crawling Curius.
    await saveReadingSnapshot(await buildReadingSnapshot(data));

    const redis = getRedis();
    let lastSeenId = lastSeenIdFallback;
    if (redis) {
      try {
        lastSeenId = await redis.get<number>(LAST_SEEN_KEY);
      } catch {
        // Redis unavailable — fall back to the volatile module value.
      }
    }

    // Only revalidate for genuinely new content: a null lastSeenId means we
    // have no baseline (first run / Redis miss), so record it and wait for the
    // next tick rather than purging the cache spuriously.
    const newContent = Boolean(latest) && lastSeenId !== null && latest.id !== lastSeenId;
    if (latest && latest.id !== lastSeenId) {
      lastSeenIdFallback = latest.id;
      if (redis) {
        try {
          await redis.set(LAST_SEEN_KEY, latest.id);
        } catch {
          // Persist failed; the fallback still covers warm instances.
        }
      }
    }

    if (newContent || classified > 0) {
      // The home page doesn't render Curius data — only the snapshot readers.
      revalidatePath("/reading");
      revalidatePath("/feed.xml");
    }

    return NextResponse.json({
      revalidated: newContent || classified > 0,
      totalLinks: all.length,
      uncached: uncachedCount,
      classified,
      errors,
      env,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "check failed", message: e instanceof Error ? e.message : String(e), env },
      { status: 500 }
    );
  }
}
