import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CaseDelta: the AI paralegal for law firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link-preview card for casedelta.com: the rectangle a prospect sees when the
 * link is texted or posted. It mirrors the homepage hero: the mountain photograph
 * under the hero's solid navy scrim, the hero headline in Geist 400 with the orange
 * underline, the white logo. Solid colours and the photo only, no gradients.
 *
 * Satori cannot read CSS custom properties, so the palette from app/globals.css is
 * written out here: navy #08162b (scrim 8,22,43), tint #d0dbe7, orange #e78340.
 * Satori cannot parse webp or woff2: the photo is the .jpg copy of mountain.webp,
 * and Geist comes from Google Fonts' TrueType response.
 */
const SITE = "https://casedelta.com";
const NAVY = "#08162b";
const TINT = "#d0dbe7";
const ORANGE = "#e78340";

const LEAD = "Run the firm like there were ";
const EM = "100 of you.";
const SUB = "The AI paralegal that works inside every system your firm uses.";
const STACK = "Filevine · Clio · Lead Docket · Outlook · Gmail · and anything else";

async function geist(text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Geist:wght@400&text=${encodeURIComponent(text)}`
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("no truetype face in the Geist css");
  return fetch(url).then((r) => r.arrayBuffer());
}

const load = (path: string) =>
  fetch(`${SITE}${path}`).then((r) => (r.ok ? r.arrayBuffer() : null)).catch(() => null);

export default async function OGImage() {
  const [font, photo, logo] = await Promise.all([
    geist(`${LEAD}${EM}${SUB}${STACK}casedelta.com`).catch(() => null),
    load("/v2/ambient/mountain.jpg"),
    load("/assets/branding/trimmed-logo-white.png"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", position: "relative", backgroundColor: NAVY, fontFamily: font ? "Geist" : "sans-serif" }}>
        {photo && (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <img src={photo as any} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundColor: "rgba(8,22,43,0.62)" }} />

        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px" }}>
          {logo ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <img src={logo as any} height={52} width={Math.round((52 * 1860) / 567)} />
          ) : (
            <div style={{ display: "flex", fontSize: 34, color: "#fff" }}>CaseDelta</div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 74, color: "#fff", letterSpacing: "-0.045em", lineHeight: 1.1, maxWidth: 980 }}>
              <span>{LEAD}</span>
              <span style={{ borderBottom: `5px solid ${ORANGE}`, paddingBottom: 2 }}>{EM}</span>
            </div>
            <div style={{ display: "flex", fontSize: 32, color: TINT, letterSpacing: "-0.02em", lineHeight: 1.35, maxWidth: 900, marginTop: 28 }}>
              {SUB}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: TINT, letterSpacing: "-0.01em" }}>
            <span>{STACK}</span>
            <span style={{ color: "#fff" }}>casedelta.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Geist", data: font, weight: 400, style: "normal" }] : undefined }
  );
}
