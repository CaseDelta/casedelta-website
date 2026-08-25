/**
 * GET /outreach-kit.zip  the rep folder itself.
 *
 * install.sh downloads this on its own, so a person only ever reaches it from the fallback
 * link on /setup. See app/install.sh/route.ts.
 */
import { proxyArtifact } from "@/lib/rep-setup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return proxyArtifact(
    req,
    "outreach-kit.zip",
    "application/zip",
    'attachment; filename="outreach-kit.zip"',
  );
}
