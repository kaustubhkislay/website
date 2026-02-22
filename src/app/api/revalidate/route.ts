import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token") ?? req.nextUrl.searchParams.get("token");

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true });
}
