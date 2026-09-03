import { NextRequest, NextResponse } from "next/server";

/**
 * Edge middleware. In Next 16 the `middleware.ts` convention was renamed to
 * `proxy.ts`, so this file exports `proxy()` plus a `config.matcher`.
 *
 * IT DOES EXACTLY ONE THING, and that thing is a legal obligation: it suppresses the
 * Meta Pixel for visitors in jurisdictions with strict consent rules. Do not weaken
 * it, and do not add unrelated work here. This runs before every page render, so
 * anything put in it is on the critical path of every request the site serves.
 *
 * An A/B variant rewrite used to live here too, gated behind
 * NEXT_PUBLIC_ENABLE_AB_TESTING and pointed at /light/* and /dark/* routes that were
 * deleted long ago. It could not have worked if the flag had ever been turned on: the
 * rewrite targets 404. Removed on 2026-09-02 along with the env var.
 */

const COOKIE_PIXEL_BLOCKED = "cd_pixel_blocked";

/**
 * EU, EEA, UK and Switzerland. Where a visitor is from is read from
 * `x-vercel-ip-country`, which Vercel sets at the edge and a client cannot forge.
 */
const PIXEL_BLOCKED_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  "IS", "LI", "NO",
  "GB",
  "CH",
]);

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country");
  const blocked = country ? PIXEL_BLOCKED_COUNTRIES.has(country.toUpperCase()) : false;

  if (blocked) {
    response.cookies.set(COOKIE_PIXEL_BLOCKED, "1", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      // MetaPixel is a client component and has to read this to refuse to render,
      // so it cannot be httpOnly.
      httpOnly: false,
    });
  } else if (request.cookies.get(COOKIE_PIXEL_BLOCKED)?.value === "1") {
    // The visitor has moved out of a blocked region. Clear the stale cookie rather
    // than leaving them suppressed for the rest of its thirty days.
    response.cookies.delete(COOKIE_PIXEL_BLOCKED);
  }

  return response;
}

/**
 * Every route except Next internals, the API and static assets, so the cookie is set
 * on any page entry rather than only on the homepage.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|api/|.*\\..*).*)"],
};
