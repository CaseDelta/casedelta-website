"use client";

/**
 * CaseDelta hero, composed to the "Perform" template's split layout
 * (https://perform.framer.website/): the eyebrow + headline + sub + CTA + proof
 * stack is anchored to the LEFT half over a full-bleed background photo, and the
 * product composite (dashboard screenshot + "Untitled Database" code card) sits
 * on the RIGHT half.
 *
 * Like Perform, the hero is exactly one viewport tall (900 @1440) and HARD-CUTS
 * into the white section below (BrandStrip) with no fade-to-white. Content is
 * vertically centered. Text aligns to the page content-left (x=80, matching the
 * nav wordmark + the kit Container). Background image and product assets are
 * unchanged Sasonix placeholders (tokens.ts) pending the CaseDelta rebrand.
 *
 * Right-side composite positions are constants so the pixel-diff loop can tune
 * them; the page is tuned for desktop 1440 (responsive pass pending).
 */
import { SX, SX_IMG } from "./tokens";

const HERO_H = 900; // one viewport; hard cut into the white strip below (Perform)

// Right-half product composite, contained within the page content edge (x=1360).
const DASH_W = 700;
const DASH_TOP = 294;
const DASH_RIGHT = 80; // aligns the dashboard's right edge to the content column
const CODE_W = 340;
const CODE_TOP = 452;
const CODE_LEFT = 700; // floats over the dashboard's lower-left, fully on-page

export function Hero() {
  return (
    <section style={{ position: "relative", height: HERO_H, background: SX.white, fontFamily: SX.body, overflow: "hidden" }}>
      {/* full-bleed hero photo (unchanged background) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SX_IMG.heroBg} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }} />
      {/* left-darkening scrim so the white text reads over the bright sky (no bottom fade: Perform hard-cuts) */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(6,6,10,0.64) 0%, rgba(6,6,10,0.44) 26%, rgba(6,6,10,0.14) 48%, rgba(6,6,10,0) 66%)" }} />

      {/* right-half product composite: dashboard base + floating code card */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SX_IMG.dashboard}
        alt="Delta driving a firm's workflows"
        style={{ position: "absolute", top: DASH_TOP, right: DASH_RIGHT, width: DASH_W, height: "auto", zIndex: 5, borderRadius: 14, border: "1px solid rgba(255,255,255,0.55)", boxShadow: "0 34px 90px rgba(8,10,20,0.34)" }}
      />
      <CodeCard />

      {/* left text column, vertically centered and aligned to the page content-left */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "0 40px", height: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 620 }}>
          {/* eyebrow: thin rule + label (Perform pattern) */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <span aria-hidden style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)" }} />
            <span style={{ fontFamily: SX.mono, fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)" }}>
              AI associate for law firms
            </span>
          </div>

          <h1 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 70, lineHeight: "74px", letterSpacing: "-3px", color: "#fff", margin: 0, maxWidth: 580 }}>
            Run more cases without hiring
          </h1>

          <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "rgba(255,255,255,0.88)", margin: "24px 0 0", maxWidth: 470 }}>
            Delta is an AI associate that works inside the tools your firm already runs on. Hand it the routine case work, and your team approves before anything goes out.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32 }}>
            {/* primary: white pill + dark circular arrow badge (Perform CTA) */}
            <a href="#" className="sx-btn" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink, background: "#fff", borderRadius: 999, padding: "8px 8px 8px 22px", textDecoration: "none" }}>
              Book a demo
              <span aria-hidden style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 999, background: SX.ink, color: "#fff" }}>
                <ArrowUpRight />
              </span>
            </a>
            {/* secondary: ghost */}
            <a href="#" className="sx-btn" style={{ display: "inline-flex", alignItems: "center", fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.42)", borderRadius: 999, padding: "11px 22px", textDecoration: "none", backdropFilter: "blur(2px)" }}>
              See how it works
            </a>
          </div>

          {/* proof: vertical rule + stars + one real, attributable line */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 46, textShadow: "0 1px 18px rgba(0,0,0,0.35)" }}>
            <span aria-hidden style={{ width: 1, height: 46, background: "rgba(255,255,255,0.4)" }} />
            <div>
              <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
              </div>
              <div style={{ fontFamily: SX.body, fontSize: 14.5, lineHeight: "20px", color: "rgba(255,255,255,0.94)" }}>
                &ldquo;Delta gives us back about five hours a week.&rdquo;
              </div>
              <div style={{ fontFamily: SX.body, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.72)", marginTop: 2 }}>
                Kirschbaum &amp; Nowotny, LLC &middot; Overland Park, KS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* The "Untitled Database" card: a composite of the frame PNG (white body + footer),
   live header text, and a code-line image, matching the live site's layered card.
   Floats over the right-half dashboard, contained within the page. */
function CodeCard() {
  const CARD_H = Math.round((CODE_W * 1200) / 1848); // frame aspect 1848x1200
  return (
    <div style={{ position: "absolute", top: CODE_TOP, left: CODE_LEFT, width: CODE_W, height: CARD_H, zIndex: 6, borderRadius: 12, boxShadow: "0 24px 80px rgba(8,10,20,0.32)", overflow: "hidden", background: "#fff" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SX_IMG.codeCard} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      {/* header row: orange bar + title + Unsaved */}
      <div style={{ position: "absolute", top: 15, left: 18, right: 18, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 3, height: 18, background: SX.orange, borderRadius: 2 }} />
        <span style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 400, color: SX.ink }}>Untitled Database</span>
        <span style={{ marginLeft: "auto", fontFamily: SX.ui, fontSize: 13, fontStyle: "italic", color: "#0c0c0c" }}>Unsaved</span>
      </div>
      {/* code lines */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SX_IMG.codeWrapper} alt="" aria-hidden style={{ position: "absolute", top: 52, left: 14, width: CODE_W - 28, height: "auto" }} />
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11L11 4M11 4H5M11 4V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill={SX.orange} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z" />
    </svg>
  );
}
