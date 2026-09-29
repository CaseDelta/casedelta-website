/**
 * The rep onboarding page at /setup and the three artifacts it hands out.
 *
 * These are internal new-hire pages living on a public marketing domain, so they carry
 * two protections that are unrelated to each other and both have to hold.
 *
 * ACCESS. One shared key in the REP_SETUP_KEY environment variable. A browser unlocks the
 * page with a form and keeps a cookie afterwards; curl carries the same key as ?k= so the
 * installer one-liner works with no session at all. There is no per-person identity here
 * and there is not meant to be one. What is being protected is an onboarding folder that
 * holds no secrets; the goal is only that it is not sitting on a guessable public URL for
 * anyone who wanders past.
 *
 * If REP_SETUP_KEY is missing, every one of these routes refuses. A missing key must never
 * read as "no restriction", which is the same failure as a check that cannot run reporting
 * a pass.
 *
 * SEARCH. Every one of these paths is noindex, disallowed in robots.txt, absent from the
 * sitemap, unlinked from anywhere on the site, and answers an unauthenticated request with
 * 401. A crawler that somehow reaches one is given nothing and told not to keep it.
 */

export const REP_SETUP_COOKIE = "cd_rep_setup";
export const REP_SETUP_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

/**
 * The origin the pasted command points at. Deliberately a constant rather than something
 * read off the request headers: the whole point of moving this onto casedelta.com is that
 * a rep can recognise the host in the command, so that host is never derived from a header
 * a caller can set. Overridden only for local development.
 */
export function siteOrigin(): string {
  return (process.env.REP_SETUP_ORIGIN || "https://casedelta.com").replace(/\/+$/, "");
}

export function accessKey(): string | null {
  const k = (process.env.REP_SETUP_KEY || "").trim();
  return k.length > 0 ? k : null;
}

/**
 * Where the artifacts actually live. An unguessable prefix inside the rep-kit bucket, held
 * server side only, so the gate on this domain is the only published way in rather than a
 * suggestion sitting in front of an open door.
 */
export function kitOrigin(): string | null {
  const o = (process.env.REP_KIT_ORIGIN || "").trim();
  return o.length > 0 ? o.replace(/\/+$/, "") : null;
}

function sameSecret(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function cookieValue(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(eq + 1).trim());
    } catch {
      return part.slice(eq + 1).trim();
    }
  }
  return null;
}

export type Access =
  | { ok: true; via: "cookie" | "query" }
  | { ok: false; reason: "unconfigured" | "denied" };

export function checkAccess(req: Request): Access {
  const key = accessKey();
  if (!key) return { ok: false, reason: "unconfigured" };

  const supplied = new URL(req.url).searchParams.get("k");
  if (supplied && sameSecret(supplied, key)) return { ok: true, via: "query" };

  const cookie = cookieValue(req.headers.get("cookie"), REP_SETUP_COOKIE);
  if (cookie && sameSecret(cookie, key)) return { ok: true, via: "cookie" };

  return { ok: false, reason: "denied" };
}

/** Applied to every response these routes produce, including the refusals. */
export const NO_INDEX: Record<string, string> = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
  "Cache-Control": "no-store, max-age=0, must-revalidate",
};

export function setAccessCookie(res: Response, req: Request): Response {
  const key = accessKey();
  if (!key) return res;
  const https = new URL(req.url).protocol === "https:" ||
    req.headers.get("x-forwarded-proto") === "https";
  res.headers.append(
    "Set-Cookie",
    [
      `${REP_SETUP_COOKIE}=${encodeURIComponent(key)}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${REP_SETUP_MAX_AGE}`,
      https ? "Secure" : "",
    ].filter(Boolean).join("; "),
  );
  return res;
}

/**
 * Stream one artifact out of the kit bucket. A proxy and not a redirect on purpose: a
 * redirect would hand the caller the unguessable bucket URL and the gate would then only
 * be protecting the first request.
 */
export async function proxyArtifact(
  req: Request,
  object: string,
  contentType: string,
  disposition?: string,
): Promise<Response> {
  const access = checkAccess(req);
  if (!access.ok) {
    return new Response(
      access.reason === "unconfigured"
        ? "This download is not configured. Tell your manager.\n"
        : "This download needs the key your manager sent you.\n" +
          `Go to ${siteOrigin()}/setup and start there.\n`,
      { status: access.reason === "unconfigured" ? 503 : 401, headers: { ...NO_INDEX, "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const origin = kitOrigin();
  if (!origin) {
    return new Response("This download is not configured. Tell your manager.\n", {
      status: 503,
      headers: { ...NO_INDEX, "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const upstream = await fetch(`${origin}/${object}`, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) {
    return new Response(`The file could not be fetched (${upstream.status}). Tell your manager.\n`, {
      status: 502,
      headers: { ...NO_INDEX, "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const headers: Record<string, string> = { ...NO_INDEX, "Content-Type": contentType };
  if (disposition) headers["Content-Disposition"] = disposition;
  const len = upstream.headers.get("content-length");
  if (len) headers["Content-Length"] = len;

  return new Response(upstream.body, { status: 200, headers });
}
