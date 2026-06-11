import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/* On-demand revalidation. Call after publishing or editing a CMS post so it
   appears immediately instead of waiting for the ISR window.
   POST /api/revalidate?secret=...   body: { "paths": ["/blog", "/blog/my-slug"] } */

export async function POST(req: NextRequest) {
  const secret =
    req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { paths?: string[] };
  const paths =
    Array.isArray(body.paths) && body.paths.length > 0
      ? body.paths
      : ["/blog", "/sitemap.xml"];

  for (const p of paths) revalidatePath(p);

  return NextResponse.json({ revalidated: true, paths });
}
