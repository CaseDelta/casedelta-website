"use client";

/**
 * Pricing Section (live top 8448, h1160): centered mono eyebrow + Archivo 48px heading
 * + Geist sub, a Monthly/Yearly toggle ("SAVE 20%"), two plan cards (Professional
 * highlighted with an orange border), and a wide contact card below.
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

function Check() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SX.orange} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden><path d="M20 6L9 17l-5-5" /></svg>;
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
        {/* toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 34 }}>
          <span style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: yearly ? SX.ink2 : SX.ink }}>Monthly</span>
          <button type="button" role="switch" aria-checked={yearly} onClick={() => setYearly((v) => !v)} aria-label="Toggle yearly billing" style={{ width: 52, height: 30, borderRadius: 999, background: yearly ? SX.orange : "rgba(26,23,18,0.18)", border: "none", cursor: "pointer", padding: 3, transition: "background 0.2s ease" }}>
            <span style={{ display: "block", width: 24, height: 24, borderRadius: "50%", background: "#fff", transform: yearly ? "translateX(22px)" : "translateX(0)", transition: "transform 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </button>
          <span style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: yearly ? SX.ink : SX.ink2 }}>Yearly</span>
          <span style={{ fontFamily: SX.ui, fontSize: 12, fontWeight: 500, color: SX.orange, background: "rgba(255,112,41,0.12)", borderRadius: 999, padding: "5px 11px" }}>SAVE 20%</span>
        </div>
        {/* plan cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 940, margin: "44px auto 0", alignItems: "start" }}>
          {PLANS.map((p) => (
            <div key={p.name} style={{ background: SX.white, borderRadius: 20, border: p.featured ? `2px solid ${SX.orange}` : `1px solid ${SX.hairline}`, padding: "34px 34px 38px", boxShadow: p.featured ? "0 40px 80px -46px rgba(255,112,41,0.4)" : "none" }}>
              <h3 style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 600, color: SX.ink, margin: 0 }}>{p.name}</h3>
              <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "10px 0 0", minHeight: 52 }}>{p.blurb}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "22px 0 26px" }}>
                <span style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 52, letterSpacing: "-1.5px", color: SX.ink, lineHeight: 1 }}>${price(p.monthly)}</span>
                <span style={{ fontFamily: SX.body, fontSize: 18, color: SX.ink2 }}>/per month</span>
              </div>
              <a href="#" className="sx-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: p.featured ? SX.orange : SX.ink, color: "#fff", borderRadius: 12, padding: "14px 20px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", ["--v2-btn-hover" as string]: p.featured ? "#e85f18" : "#2c2820" }}>Book a Free Demo</a>
              <div style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink, margin: "28px 0 16px" }}>What&rsquo;s included:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {FEATURES.map((f) => (
                  <span key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: SX.body, fontSize: 16, color: SX.ink }}><Check />{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* contact card */}
        <div style={{ maxWidth: 940, margin: "24px auto 0", background: SX.cream, borderRadius: 20, border: `1px solid ${SX.hairline}`, padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 620 }}>
            <h3 style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 600, color: SX.ink, margin: 0 }}>Custom solutions for growing teams</h3>
            <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "8px 0 0" }}>Design automation that fits your exact requirements with flexible integrations and scalable performance.</p>
          </div>
          <a href="#" className="sx-btn" style={{ display: "inline-flex", alignItems: "center", background: SX.ink, color: "#fff", borderRadius: 12, padding: "14px 22px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap", ["--v2-btn-hover" as string]: "#2c2820" }}>Contact Sales</a>
        </div>
      </Container>
    </section>
  );
}
