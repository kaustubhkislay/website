import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { classifyLinks, getRedis } from "@/lib/classify";
import { buildReadingSnapshot, fetchAllUserLinks, saveReadingSnapshot } from "@/lib/curius";

// POST /api/reclassify
// Body: { mode: "other" | "all" | "urls", urls?: string[] }
// Auth: Authorization: Bearer <CRON_SECRET>
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "Redis not configured" }, { status: 500 });

  const body = (await req.json().catch(() => ({}))) as {
    mode?: "other" | "all" | "urls";
    urls?: string[];
  };
  const mode = body.mode ?? "other";

  const data = await fetchAllUserLinks({ fresh: true });
  if (!data || data.links.length === 0) {
    return NextResponse.json({ error: "No links found" }, { status: 500 });
  }
  const all = data.links.map((l) => ({ url: l.link, title: l.title, snippet: l.snippet }));

  // Read every existing tag in one batch.
  const keys = all.map((l) => `tag:${l.url}`);
  const existingTags = await redis.mget<(string | null)[]>(...keys);

  let toReclassify: typeof all;
  if (mode === "urls") {
    const set = new Set(body.urls ?? []);
    toReclassify = all.filter((l) => set.has(l.url));
  } else if (mode === "all") {
    toReclassify = all;
  } else {
    // "other": only links currently tagged as other
    toReclassify = all.filter((l, i) => existingTags[i] === "other");
  }

  if (toReclassify.length === 0) {
    return NextResponse.json({ reclassified: 0, message: "Nothing matched" });
  }

  // Wipe the existing tags so classifyLinks treats them as uncached.
  await redis.del(...toReclassify.map((l) => `tag:${l.url}`));

  // Run in batches to avoid LLM rate limits.
  const BATCH = 25;
  let classified = 0;
  const errors: string[] = [];
  for (let i = 0; i < toReclassify.length; i += BATCH) {
    const batch = toReclassify.slice(i, i + BATCH);
    try {
      const r = await classifyLinks(batch);
      classified += r.size;
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  // The snapshot embeds tags, so rebuild it before revalidating or the page
  // regenerates from pre-reclassification data.
  await saveReadingSnapshot(await buildReadingSnapshot(data));

  // The home page doesn't render Curius data, so only /reading needs it.
  revalidatePath("/reading");

  return NextResponse.json({
    requested: toReclassify.length,
    classified,
    errors,
    mode,
  });
}
