"use client";

/**
 * Sasonix hero, rebuilt pixel-exact from the live site (desktop 1440).
 * Measured values (Playwright computed styles):
 *   H1  Archivo 500 / 60px / lh 66 / -2px / #fff  (y=147)
 *   sub Geist 400 / 18px / lh 30.6 / #fff          (y=295)
 *   btns Geist 500 / 16px, radius 12, pad 11px 18px (y=389)
 *   full-bleed hero photo (y=0, h969); dashboard PNG 1000x461 (y=592, centered);
 *   code-card PNG 458x297 (y=543, overlapping right).
 * Positions are constants below so the pixel-diff loop can tune them.
 */
import { SX, SX_IMG } from "./tokens";

const DASH_W = 1000;
const DASH_TOP = 592;
const DASH_DX = -32; // dashboard is shifted left of page center (live: left 188, center 688)
const CODE_W = 458;
const CODE_TOP = 543;
const CODE_DX = 303; // code-card center 1023 (live: left 794) relative to page center 720


export function Hero() {
  return (
    <section style={{ position: "relative", height: 969, background: SX.white, fontFamily: SX.body }}>
      {/* full-bleed hero photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SX_IMG.heroBg} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }} />
      {/* bottom fade into the page (the Framer "Linear" scrim) */}
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 220, zIndex: 1, background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 62%, ${SX.white} 100%)` }} />

      {/* centered copy */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
        <div style={{ paddingTop: 128, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 60, lineHeight: "66px", letterSpacing: "-2px", color: "#fff", margin: 0, maxWidth: 620 }}>
            Turn your ideas into execution with AI agents
          </h1>
          <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 18, lineHeight: "30.6px", color: "#fff", margin: "18px 0 0", maxWidth: 560 }}>
            No coding. No setup complexity. Just describe your workflow and watch Sasonix turn ideas into automated execution.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <a href="#" className="sx-btn" style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: "#fff", background: SX.ink, borderRadius: 12, padding: "11px 18px", textDecoration: "none" }}>Get Started Free</a>
            <a href="#" className="sx-btn" style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.black, background: "#fff", borderRadius: 12, padding: "11px 18px", textDecoration: "none" }}>Book a Demo</a>
          </div>
        </div>
      </div>

      {/* dashboard PNG (base, centered) + code-card composite (floating, overlapping right) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SX_IMG.dashboard} alt="Dashboard" style={{ position: "absolute", top: DASH_TOP, left: "50%", transform: `translateX(calc(-50% + ${DASH_DX}px))`, width: DASH_W, height: "auto", zIndex: 12, borderRadius: 12, maskImage: "linear-gradient(to bottom, #000 60%, transparent 92%)", WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 92%)" }} />
      <CodeCard />
    </section>
  );
}

/* The "Untitled Database" card: a composite of the frame PNG (white body + footer),
   live header text, and a code-line image, matching the live site's layered card. */
function CodeCard() {
  const CARD_H = Math.round((CODE_W * 1200) / 1848); // frame aspect 1848x1200
  return (
    <div style={{ position: "absolute", top: CODE_TOP, left: "50%", transform: `translateX(calc(-50% + ${CODE_DX}px))`, width: CODE_W, height: CARD_H, zIndex: 13, borderRadius: 12, boxShadow: "0 4px 68px rgba(0,0,0,0.10)", overflow: "hidden", background: "#fff" }}>
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
