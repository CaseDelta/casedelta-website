"use client";

/**
 * Beat 6: Pricing. CaseDelta is priced per FIRM by attorney count, flat monthly,
 * regardless of staff size (the wedge against per-seat research tools). Three tiers:
 *   up to 5 attorneys  -> $999/mo
 *   up to 10 attorneys -> $1,999/mo   (highlighted)
 *   up to 20 attorneys -> $3,999/mo
 * A contact line handles firms above 20. The value is identical across tiers, so the
 * feature list is shared once below the cards rather than repeated three times.
 *
 * Kept Sasonix-styled (cream / orange) until the tokens.ts rebrand.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal, revealProps } from "./reveal";

const TIERS = [
  { band: "Up to 5 attorneys", price: "$999", featured: false },
  { band: "Up to 10 attorneys", price: "$1,999", featured: true },
  { band: "Up to 20 attorneys", price: "$3,999", featured: false },
];

function Check({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" style={{ background: SX.white, padding: "60px 0 60px" }}>
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Pricing"
            title="A fraction of another salary"
            sub="One flat price by attorney count. Your whole staff included."
            titleMaxW={560}
            subMaxW={480}
          />
        </Reveal>

        {/* three attorney-count tiers */}
        <div className="sx-price-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1120, margin: "56px auto 0", alignItems: "stretch" }}>
          {TIERS.map((t, i) => {
            const on = t.featured;
            const nameColor = on ? SX.onInk : SX.ink;
            const subColor = on ? "color-mix(in srgb, var(--sx-on-ink) 82%, transparent)" : SX.ink2;
            return (
              <motion.div key={t.band} {...revealProps({ delay: i * 0.08, amount: 0.3 })} style={{ position: "relative", background: on ? SX.orange : SX.cream, borderRadius: 16, padding: "32px 30px", display: "flex", flexDirection: "column", boxShadow: on ? "0 40px 80px -46px color-mix(in srgb, var(--sx-accent) 50%, transparent)" : "none" }}>
                {on && (
                  <span style={{ position: "absolute", top: 24, right: 24, fontFamily: SX.ui, fontSize: 12, fontWeight: 600, color: SX.orange, background: SX.surface, borderRadius: 999, padding: "5px 12px" }}>Most popular</span>
                )}
                <div style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 600, color: nameColor }}>{t.band}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "20px 0 0" }}>
                  <span style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, letterSpacing: "-1px", color: nameColor, lineHeight: 1 }}>{t.price}</span>
                  <span style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 400, color: subColor }}>/month</span>
                </div>
                <div style={{ fontFamily: SX.body, fontSize: 15, lineHeight: "22px", color: subColor, margin: "12px 0 28px" }}>Flat monthly. Unlimited staff.</div>
                <a href="/v2/demo" className="sx-btn" style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "center", background: SX.ink, color: SX.surface, borderRadius: 12, padding: "14px 20px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", ["--v2-btn-hover" as string]: SX.accentDeep }}>Book a demo</a>
              </motion.div>
            );
          })}
        </div>

        {/* firms above 20 attorneys */}
        <Reveal>
          <p style={{ textAlign: "center", marginTop: 22, fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>
            More than 20 attorneys? <a href="/v2/demo" style={{ color: SX.orange, fontWeight: 500, textDecoration: "none" }}>Contact us for a custom plan.</a>
          </p>
        </Reveal>
      </Container>
      <style>{`@media (max-width: 860px){ .sx-price-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
