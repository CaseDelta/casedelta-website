/** GET /install.ps1  the Windows machine installer. See app/install.sh/route.ts. */
import { proxyArtifact } from "@/lib/rep-setup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return proxyArtifact(req, "install.ps1", "text/plain; charset=utf-8");
}
