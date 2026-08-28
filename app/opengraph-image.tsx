import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CaseDelta: AI Paralegal for Law Firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link-preview card for casedelta.com. This is the rectangle a prospect sees
 * when someone texts or posts the link, so it has to read as the site.
 *
 * It mirrors the live hero (components/v2/sasonix/Hero.tsx): the same mountain
 * ambient photograph, the same left-to-right scrim over an ink ground, the same
 * Archivo display face, the same subhead. Palette values are the resolved
 * casedelta theme from components/v2/sasonix/theme.ts, written as literals
 * because Satori cannot read CSS custom properties.
 *
 * The photograph is app/og-ambient.jpg, a copy of the hero backdrop that the
 * bundler turns into a deployment asset, NOT a fetch of casedelta.com. A card that
 * reaches back out to its own site to draw itself adds a network round trip to
 * every scrape and breaks whenever the site is the thing that is down. A missing
 * file here fails the BUILD, which is where it should fail. If the hero backdrop is
 * ever swapped (BACKDROPS in Hero.tsx), copy the new one over this.
 *
 * The webfont is the one genuine runtime dependency: Archivo ships as woff2, which
 * Satori cannot parse, so it comes from Google at render time. That fetch is
 * allowed to fail. The card then renders in Satori's built-in sans with everything
 * else intact, which is much better than no preview at all. The gradient behind the
 * photograph is the same idea and should never be reached.
 *
 * The route is server-rendered on demand, so it carries its own cache headers.
 * Next appends a content hash to the og:image URL, so a deploy that changes this
 * file changes the URL; the image at any one URL never changes and can be held
 * forever.
 *
 * History: the previous card said "An AI associate that knows every case" on flat
 * white, three positionings behind the site, and the page title underneath it said
 * "for Small Law Firms". A prospect got sent that combination on 2026-08-28.
 */

// Resolved [data-sx-theme="casedelta"] values.
const INK = "#0F1115";
const ON_MEDIA = "#FFFFFF";
const ON_MEDIA_MUTED = "rgba(255,255,255,0.88)";
const ACCENT_ON_MEDIA = "#9CB0FF";

const HEADLINE = "The AI paralegal you can give real work to.";
const SUBHEAD =
  "Delta signs in to your firm’s tools, uses them just like you do, and comes back with finished work.";
const STACK = "Clio · Filevine · MyCase · Microsoft 365 · Google";

/**
 * Google's CSS endpoint hands back a TrueType face to a plain fetch and woff2 only
 * to a browser user-agent. Satori cannot parse woff2, so do not add one here.
 */
async function archivo(weight: number, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}&text=${encodeURIComponent(text)}`
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("no truetype face in the Archivo css");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OGImage() {
  const [fonts, photo] = await Promise.all([
    Promise.all([
      archivo(700, `CaseDelta${HEADLINE}`),
      archivo(400, `${SUBHEAD}${STACK}casedelta.com`),
    ])
      .then(([bold, regular]) => [
        { name: "Archivo", data: bold, weight: 700 as const, style: "normal" as const },
        { name: "Archivo", data: regular, weight: 400 as const, style: "normal" as const },
      ])
      .catch(() => undefined),
    fetch(new URL("./og-ambient.jpg", import.meta.url))
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .catch(() => null),
  ]);

  const family = fonts ? "Archivo" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: INK,
          fontFamily: family,
        }}
      >
        {/* The hero photograph, or a cool gradient in the same family when it is unreachable. */}
        {photo ? (
          <img
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            src={photo as any}
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              display: "flex",
              backgroundImage:
                "radial-gradient(120% 120% at 78% 22%, #3E5AA8 0%, #1B2440 46%, #0F1115 78%)",
            }}
          />
        )}

        {/* The hero's own scrim: heavy at the left where the type sits, clear at the right. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(8,12,24,0.94) 0%, rgba(8,12,24,0.86) 38%, rgba(8,12,24,0.62) 68%, rgba(8,12,24,0.42) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 80px",
          }}
        >
          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: ON_MEDIA, letterSpacing: "-0.03em" }}>
              Case
            </span>
            <span
              style={{ fontSize: 30, fontWeight: 700, color: ACCENT_ON_MEDIA, letterSpacing: "-0.03em" }}
            >
              Delta
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: 56,
                height: 4,
                backgroundColor: ACCENT_ON_MEDIA,
                borderRadius: 2,
                marginBottom: 26,
              }}
            />
            <div
              style={{
                fontSize: 62,
                fontWeight: 700,
                color: ON_MEDIA,
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
                maxWidth: 880,
              }}
            >
              {HEADLINE}
            </div>
            <div
              style={{
                fontSize: 27,
                fontWeight: 400,
                color: ON_MEDIA_MUTED,
                letterSpacing: "-0.01em",
                lineHeight: 1.42,
                maxWidth: 820,
                marginTop: 24,
              }}
            >
              {SUBHEAD}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 20,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: ON_MEDIA }}>casedelta.com</span>
            <span style={{ color: "rgba(255,255,255,0.62)" }}>{STACK}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
      headers: {
        "cache-control": "public, immutable, no-transform, max-age=31536000",
      },
    }
  );
}
