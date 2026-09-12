// Fetches the private delta-ui package into vendor/delta-ui at the commit pinned
// in vendor-delta-ui.sha. Runs before every build and dev start (npm prebuild,
// predev).
//
// Why not a git submodule: Vercel never fetched the private submodule, so every
// preview failed with "Module not found: delta-ui/...". On Vercel this uses a
// fine-grained, read-only GitHub token in DELTA_UI_TOKEN (Project Settings,
// Environment Variables). Locally it uses your own git credentials. To move to
// a newer package, put the new casedelta-delta-ui commit in vendor-delta-ui.sha.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, mkdirSync } from "node:fs";

const dir = "vendor/delta-ui";
const sha = readFileSync("vendor-delta-ui.sha", "utf8").trim();
const git = (args, cwd) =>
  execFileSync("git", args, { cwd, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();

if (existsSync(dir + "/.git")) {
  try {
    if (git(["rev-parse", "HEAD"], dir) === sha) {
      console.log("delta-ui " + sha.slice(0, 7) + " already present");
      process.exit(0);
    }
  } catch {}
}

const token = process.env.DELTA_UI_TOKEN || "";
if (process.env.VERCEL && !token) {
  console.error("delta-ui: DELTA_UI_TOKEN is not set on this Vercel project. Add a read-only GitHub token for CaseDelta/casedelta-delta-ui.");
  process.exit(1);
}
const url = token
  ? "https://x-access-token:" + token + "@github.com/CaseDelta/casedelta-delta-ui.git"
  : "https://github.com/CaseDelta/casedelta-delta-ui.git";

rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
try {
  git(["init", "-q"], dir);
  git(["remote", "add", "origin", url], dir);
  git(["fetch", "-q", "--depth", "1", "origin", sha], dir);
  git(["checkout", "-q", "FETCH_HEAD"], dir);
  git(["remote", "remove", "origin"], dir); // never leave the token in .git/config
} catch (e) {
  let msg = String((e && e.stderr) || (e && e.message) || e);
  if (token) msg = msg.split(token).join("***");
  console.error("delta-ui: could not fetch " + sha + ": " + msg);
  process.exit(1);
}
console.log("delta-ui " + sha.slice(0, 7) + " fetched");
