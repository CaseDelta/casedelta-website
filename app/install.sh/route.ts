/**
 * GET /install.sh  the macOS machine installer, behind the same key as /setup.
 *
 * A proxy rather than a redirect: a redirect would hand the caller the bucket URL and the
 * gate would then be protecting only the first request. See lib/rep-setup.ts.
 */
import { proxyArtifact } from "@/lib/rep-setup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return proxyArtifact(req, "install.sh", "text/x-shellscript; charset=utf-8");
}
