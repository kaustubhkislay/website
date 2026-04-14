import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { classifyLinks, getCachedTags } from "@/lib/classify";
import { getAllLinksForClassification } from "@/lib/curius";

const CURIUS_USERNAME = "kaustubh-kislay";
const BATCH_SIZE = 25;
let lastSeenId: number | null = null;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const env = {
    openrouter: Boolean(process.env.OPENROUTER_API_KEY),
    kvUrl: Boolean(process.env.KV_REST_API_URL),
    kvToken: Boolean(process.env.KV_REST_API_TOKEN),
  };

  try {
    const userRes = await fetch(`https://curius.app/api/users/${CURIUS_USERNAME}`, {
      headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` },
      cache: "no-store",
    });
    if (!userRes.ok) return NextResponse.json({ skipped: true, env, stage: "userRes" });

    const { user } = await userRes.json();

    const linksRes = await fetch(`https://curius.app/api/users/${user.id}/links?page=0`, {
      headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` },
      cache: "no-store",
    });
    if (!linksRes.ok) return NextResponse.json({ skipped: true, env, stage: "linksRes" });

    const { userSaved } = await linksRes.json();
    const latest = userSaved
      ?.sort(
        (a: { createdDate: string }, b: { createdDate: string }) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      )[0];

    // Backfill classification for ALL uncached links, regardless of lastSeenId.
    // Redis is authoritative; module-scoped lastSeenId is volatile on serverless.
    const all = await getAllLinksForClassification();
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

    const newContent = latest && latest.id !== lastSeenId;
    if (newContent) {
      lastSeenId = latest.id;
      revalidatePath("/");
      revalidatePath("/reading");
    } else if (classified > 0) {
      // Tags changed even without new links — refresh rendered pages.
      revalidatePath("/");
      revalidatePath("/reading");
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
