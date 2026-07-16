"use client";

/**
 * Pricing Section (live top 8448, h1160): centered mono eyebrow + Archivo 48px heading
 * + Geist sub, a Monthly/Yearly toggle ("SAVE 20%"), then two large plan cards.
 *
 * Measured against the live (Playwright, desktop 1440):
 *  - Card list: maxWidth 1220 (x110..1330), two cards w594 each, gap 32, radius 12, pad 24.
 *  - Starter card bg = cream #fcf8f4; Professional card bg = FULL orange #ff7029.
 *  - Each card opens with an inner WHITE box (radius 12, pad 20) holding name / blurb / price.
 *    name  Geist 18/600 ink | blurb Geist 16/400 ink2 | price Archivo 500 48px/-1px ink
 *    + "/per month" Geist 18/400 ink2.
 *  - Below the box: "What's included:" (Geist 16/500) + a 2-column feature grid (Geist 16/400).
 *    Starter = orange checks + ink text; Professional = white checks + white text.
 *  - Full-width "Book a Free Demo" button (ink bg, white text, radius 12) at the bottom of both.
 *  - There is NO separate contact card in the live section.
 */
import { useState } from "react";
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";

const FEATURES = [
  "Automated task assignment",
  "Real-time performance",
  "Customizable agent profiles",
  "Customizable notifications",
  "Data export options",
  "Multi-language support",
];

const PLANS = [
  { name: "Starter Plan", blurb: "Perfect for individuals exploring ai agents and simple workflow automation.", monthly: 49, featured: false },
  { name: "Professional Plan", blurb: "Built for professionals and teams who want to automate and scale workflows efficiently.", monthly: 99, featured: true },
];

function Check({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const price = (m: number) => (yearly ? Math.round(m * 0.8) : m);
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <SectionHead
          eyebrow="Pricing & Plan"
          title="Get started with transparent plan"
          sub="Getting started with Sasonix is simple. You don't need complex setup or technical knowledge."
          titleMaxW={560}
          subMaxW={440}
        />
        {/* Monthly / Yearly toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 34 }}>
          <span style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: yearly ? SX.ink2 : SX.ink }}>Monthly</span>
          <button type="button" role="switch" aria-checked={yearly} onClick={() => setYearly((v) => !v)} aria-label="Toggle yearly billing" style={{ width: 52, height: 30, borderRadius: 999, background: yearly ? SX.orange : "rgba(26,23,18,0.18)", border: "none", cursor: "pointer", padding: 3, transition: "background 0.2s ease" }}>
            <span style={{ display: "block", width: 24, height: 24, borderRadius: "50%", background: "#fff", transform: yearly ? "translateX(22px)" : "translateX(0)", transition: "transform 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </button>
          <span style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: yearly ? SX.ink : SX.ink2 }}>Yearly</span>
          <span style={{ fontFamily: SX.ui, fontSize: 12, fontWeight: 500, color: SX.orange, background: "rgba(255,112,41,0.12)", borderRadius: 999, padding: "5px 11px" }}>SAVE 20%</span>
        </div>

        {/* plan cards */}
        <div className="sx-price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 1220, margin: "44px auto 0", alignItems: "stretch" }}>
          {PLANS.map((p) => {
            const onOrange = p.featured;
            const onText = onOrange ? "#fff" : SX.ink;
            const checkColor = onOrange ? "#fff" : SX.orange;
            return (
              <div key={p.name} style={{ background: onOrange ? SX.orange : SX.cream, borderRadius: 12, padding: 24, minHeight: 527, display: "flex", flexDirection: "column" }}>
                {/* inner white box: name + blurb + price */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 20 }}>
                  <h3 style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 600, color: SX.ink, margin: 0 }}>{p.name}</h3>
                  <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "8px 0 0", minHeight: 52 }}>{p.blurb}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 24 }}>
                    <span style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, letterSpacing: "-1px", color: SX.ink, lineHeight: 1 }}>${price(p.monthly)}</span>
                    <span style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 400, color: SX.ink2 }}>/per month</span>
                  </div>
                </div>

                {/* What's included */}
                <div style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: onText, margin: "24px 0 16px" }}>What&rsquo;s included:</div>

                {/* 2-column feature grid (column-major: first 3 left, last 3 right) */}
                <div style={{ display: "flex", gap: 24 }}>
                  {[FEATURES.slice(0, 3), FEATURES.slice(3, 6)].map((col, ci) => (
                    <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                      {col.map((f) => (
                        <span key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: onText }}>
                          <Check color={checkColor} />{f}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* full-width button, pinned to the card bottom */}
                <a href="#" className="sx-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: SX.ink, color: "#fff", borderRadius: 12, padding: "14px 20px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", marginTop: "auto", ["--v2-btn-hover" as string]: "#2c2820" }}>Book a Free Demo</a>
              </div>
            );
          })}
        </div>
      </Container>
      <style>{`@media (max-width: 820px){ .sx-price-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
