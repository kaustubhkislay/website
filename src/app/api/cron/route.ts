import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { classifyLinks } from "@/lib/classify";

const CURIUS_USERNAME = "kaustubh-kislay";
let lastSeenId: number | null = null;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userRes = await fetch(`https://curius.app/api/users/${CURIUS_USERNAME}`, {
      headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` },
      cache: "no-store",
    });
    if (!userRes.ok) return NextResponse.json({ skipped: true });

    const { user } = await userRes.json();

    const linksRes = await fetch(`https://curius.app/api/users/${user.id}/links?page=0`, {
      headers: { Referer: `https://curius.app/${CURIUS_USERNAME}` },
      cache: "no-store",
    });
    if (!linksRes.ok) return NextResponse.json({ skipped: true });

    const { userSaved } = await linksRes.json();
    const latest = userSaved
      ?.sort(
        (a: { createdDate: string }, b: { createdDate: string }) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      )[0];

    if (latest && latest.id !== lastSeenId) {
      lastSeenId = latest.id;
      // Warm the classification cache for recent links so render path stays cache-only.
      const recent = (userSaved as Array<{ link: string; title: string; snippet: string | null }>)
        .slice(0, 30)
        .map((l) => ({ url: l.link, title: l.title, snippet: l.snippet }));
      await classifyLinks(recent).catch(() => {});
      revalidatePath("/");
      revalidatePath("/reading");
      return NextResponse.json({ revalidated: true });
    }

    return NextResponse.json({ revalidated: false });
  } catch {
    return NextResponse.json({ error: "check failed" }, { status: 500 });
  }
}
