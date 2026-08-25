/**
 * GET  /setup   the new-hire setup page, behind a shared key
 * POST /setup   the unlock form
 *
 * The page is a plain HTML document held at content/rep-setup.html rather than a React
 * page, because that document is the artifact that was actually tested end to end in a
 * browser: platform detection, the copy button, the exact bytes reaching the clipboard.
 * Re-expressing it as components would mean re-proving all of that for no gain.
 *
 * Three placeholders are filled in at serve time so the command a rep pastes has exactly
 * one source, which is this file, rather than a copy in the page that can quietly drift
 * from the one the installer publisher believes it published.
 *
 * See lib/rep-setup.ts for the access and no-index posture.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  NO_INDEX,
  checkAccess,
  accessKey,
  setAccessCookie,
  siteOrigin,
} from "@/lib/rep-setup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE = path.join(process.cwd(), "content", "rep-setup.html");

function commands() {
  const origin = siteOrigin();
  const key = accessKey() ?? "";
  const q = `?k=${encodeURIComponent(key)}`;
  return {
    // Single quotes inside the command substitution so the query string is never touched
    // by pathname expansion. bash -c "$(curl ...)" and not curl | bash, so stdin stays on
    // the terminal and sudo can still prompt.
    mac: `bash -c "$(curl -fsSL '${origin}/install.sh${q}')"`,
    win: `irm '${origin}/install.ps1${q}' | iex`,
    zip: `/outreach-kit.zip${q}`,
  };
}

function page(): string {
  const c = commands();
  return readFileSync(PAGE, "utf8")
    .replace("__CMD_MAC__", c.mac)
    .replace("__CMD_WIN__", c.win)
    .replace("__ZIP_HREF__", c.zip);
}

const html = (body: string, status = 200) =>
  new Response(body, {
    status,
    headers: { ...NO_INDEX, "Content-Type": "text/html; charset=utf-8" },
  });

function unlock(message?: string): string {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>CaseDelta</title>
<style>
  :root { --bg:#f6f6f4; --panel:#fff; --ink:#1a1a18; --ink-soft:#5c5c56; --line:#e2e2dc;
          --accent:#b8562f; --err:#a33a22; }
  @media (prefers-color-scheme: dark) { :root {
          --bg:#17171a; --panel:#201f23; --ink:#ececea; --ink-soft:#a8a8a2; --line:#33323a;
          --accent:#e08256; --err:#e0836b; } }
  * { box-sizing:border-box; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; background:var(--bg);
         color:var(--ink); padding:24px;
         font:16px/1.6 ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; }
  .card { background:var(--panel); border:1px solid var(--line); border-radius:10px;
          box-shadow:0 1px 2px rgba(0,0,0,.05),0 8px 24px rgba(0,0,0,.06);
          padding:30px 28px; width:100%; max-width:400px; }
  .mark { display:inline-flex; align-items:center; gap:9px; font-weight:620; font-size:15px;
          color:var(--ink-soft); }
  .dot { width:9px; height:9px; border-radius:50%; background:var(--accent); }
  h1 { font-size:21px; letter-spacing:-.01em; margin:16px 0 6px; }
  p { margin:0 0 18px; color:var(--ink-soft); font-size:15px; }
  label { display:block; font-size:14px; font-weight:580; margin-bottom:6px; }
  input { width:100%; font:inherit; padding:10px 12px; border-radius:7px;
          border:1px solid var(--line); background:var(--bg); color:var(--ink); }
  input:focus { outline:2px solid var(--accent); outline-offset:1px; }
  button { width:100%; margin-top:14px; font:inherit; font-weight:580; padding:10px 12px;
           border:0; border-radius:7px; background:var(--ink); color:var(--bg); cursor:pointer; }
  .err { color:var(--err); font-size:14px; margin:0 0 14px; }
</style>
</head><body>
  <form class="card" method="POST" action="/setup">
    <div class="mark"><span class="dot"></span> CaseDelta</div>
    <h1>Set up your machine</h1>
    <p>Your manager sent you a key along with this link. Paste it in.</p>
    ${message ? `<p class="err">${message}</p>` : ""}
    <label for="k">Key</label>
    <input id="k" name="k" type="text" autocomplete="off" autocapitalize="off"
           autocorrect="off" spellcheck="false" autofocus required>
    <button type="submit">Continue</button>
  </form>
</body></html>`;
}

const UNCONFIGURED = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex, nofollow"><title>CaseDelta</title></head>
<body style="font:16px/1.6 system-ui;margin:40px">
<p>This page is not configured yet. Tell your manager.</p></body></html>`;

export async function GET(req: Request) {
  const access = checkAccess(req);

  if (!access.ok && access.reason === "unconfigured") return html(UNCONFIGURED, 503);

  // Arriving with the key in the URL: keep it, then send them to the clean address so the
  // key is not sitting in their history, their screenshots or the tab they show somebody.
  if (access.ok && access.via === "query") {
    const res = new Response(null, {
      status: 303,
      headers: { ...NO_INDEX, Location: "/setup" },
    });
    return setAccessCookie(res, req);
  }

  if (!access.ok) return html(unlock(), 401);
  return html(page());
}

export async function POST(req: Request) {
  if (!accessKey()) return html(UNCONFIGURED, 503);

  const form = await req.formData();
  const supplied = String(form.get("k") ?? "").trim();

  // Re-run the real check rather than comparing here, so there is one place that decides
  // what a valid key is. Built without the request headers on purpose: carrying the cookie
  // across would let an already-unlocked browser submit any string and be told it was right.
  const probe = new Request(`${siteOrigin()}/setup?k=${encodeURIComponent(supplied)}`);
  if (!checkAccess(probe).ok) {
    return html(unlock("That key is not right. Check it against the message you were sent."), 401);
  }

  const res = new Response(null, { status: 303, headers: { ...NO_INDEX, Location: "/setup" } });
  return setAccessCookie(res, req);
}
