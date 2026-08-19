"use client";

/**
 * Beat 6: Pricing. CaseDelta is priced per FIRM by account count, flat monthly,
 * regardless of staff size (the wedge against per-seat research tools). Three tiers:
 *   less than 5 accounts  -> $499/mo
 *   less than 10 accounts -> $999/mo   (highlighted)
 *   less than 20 accounts -> $1,999/mo
 * A contact line handles firms at 20 accounts or more. The value is identical across
 * tiers, so the feature list is shared once below the cards rather than repeated
 * three times.
 *
 * The bands counted ATTORNEYS until 2026-08-19 and now count ACCOUNTS, which is the
 * thing the firm actually provisions. Two knock-on notes for whoever edits next:
 *
 *  - The boundary moved. "Up to 5" included a five-attorney firm; "less than 5"
 *    does not, so a firm with exactly five accounts now lands in the $999 band.
 *    That is the wording as asked for, not a slip.
 *  - The overflow line reads "20 or more accounts", not "more than 20". With a top
 *    band of "less than 20", "more than 20" would have left a firm sitting on
 *    exactly 20 matching no line on the page at all.
 *
 * UNRESOLVED, and left as it was found rather than quietly rewritten: the page
 * still says "Your whole staff included" and "Flat monthly. Unlimited staff." Those
 * read cleanly against an ATTORNEY count, where the point was that paralegals and
 * admins cost nothing. Against an ACCOUNT count they only hold if an account is
 * narrower than a person, and a cold reader has no way to know that. Whether the
 * two can stand together depends on what an account IS, which is a pricing
 * question, not a copy one. Ask before editing either line.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal, revealProps } from "./reveal";

const TIERS = [
  { band: "Less than 5 accounts", price: "$499", featured: false },
  { band: "Less than 10 accounts", price: "$999", featured: true },
  { band: "Less than 20 accounts", price: "$1,999", featured: false },
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
    <section id="pricing" style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Pricing"
            title="A fraction of another salary"
            sub="One flat price by account count. Your whole staff included."
            titleMaxW={560}
            subMaxW={480}
          />
        </Reveal>

        {/* three account-count tiers */}
        <div className="sx-price-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1120, margin: "56px auto 0", alignItems: "stretch" }}>
          {/* The featured tier fills with accentDeep, not accent. It carries 15px body
              text and a muted "/month", and white on the raw brand blue is 4.11:1, so
              the muted variant of it lands near 3:1. The deeper fill takes white to
              5.80:1 and the muted text back over AA, at a blue nobody reads as a
              different colour. */}
          {TIERS.map((t, i) => {
            const on = t.featured;
            const nameColor = on ? SX.onInk : SX.ink;
            const subColor = on ? "color-mix(in srgb, var(--sx-on-ink) 82%, transparent)" : SX.ink2;
            return (
              <motion.div key={t.band} className="sx-tier" data-featured={on ? "true" : "false"} {...revealProps({ delay: i * 0.08, amount: 0.3 })} whileHover={{ y: -6 }} transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ position: "relative", background: on ? SX.accentDeep : SX.bgAlt, borderRadius: 16, padding: "32px 30px", display: "flex", flexDirection: "column", boxShadow: "var(--sx-tier-shadow)" }}>
                <div style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 600, color: nameColor }}>{t.band}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "20px 0 0" }}>
                  <span style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, letterSpacing: "-1px", color: nameColor, lineHeight: 1 }}>{t.price}</span>
                  <span style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 400, color: subColor }}>/month</span>
                </div>
                <div style={{ fontFamily: SX.body, fontSize: 15, lineHeight: "22px", color: subColor, margin: "12px 0 28px" }}>Flat monthly. Unlimited staff.</div>
                <a href="/demo" className="sx-btn" style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "center", background: SX.ink, color: SX.surface, borderRadius: 12, padding: "14px 20px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", ["--v2-btn-hover" as string]: SX.accentDeep }}>Book a demo</a>
              </motion.div>
            );
          })}
        </div>

        {/* firms at 20 accounts or more */}
        <Reveal>
          <p style={{ textAlign: "center", marginTop: 22, fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>
            20 or more accounts? <a href="/demo" style={{ color: SX.accentText, fontWeight: 500, textDecoration: "none" }}>Contact us for a custom plan.</a>
          </p>
        </Reveal>
      </Container>
      <style>{`
        /* Tier hover: the card lifts and its shadow deepens.
           TWO THINGS TO KNOW BEFORE EDITING THIS.
           1. The lift comes from framer's whileHover, not CSS. These are motion
              components, so framer owns the inline transform and any stylesheet
              :hover transform is simply overridden. A CSS-only version looked
              correct in the file and did nothing in the browser.
           2. The shadow routes through --sx-tier-shadow. The card sets
              box-shadow inline, which beats any stylesheet rule at any
              specificity, but the VARIABLE it references still cascades, so
              :hover can change it. */
        .sx-tier {
          --sx-tier-shadow: 0 1px 2px rgba(var(--sx-shadow-rgb), 0.04);
          transition: box-shadow 0.28s ease;
          will-change: transform;
        }
        .sx-tier:hover { --sx-tier-shadow: 0 26px 50px -28px rgba(var(--sx-shadow-rgb), 0.30); }
        /* the featured tier keeps its accent glow, deepened rather than replaced */
        .sx-tier[data-featured="true"] {
          --sx-tier-shadow: 0 40px 80px -46px color-mix(in srgb, var(--sx-accent) 50%, transparent);
        }
        .sx-tier[data-featured="true"]:hover {
          --sx-tier-shadow: 0 52px 90px -44px color-mix(in srgb, var(--sx-accent) 66%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .sx-tier { transition: none; }
        }
        @media (max-width: 860px){ .sx-price-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
