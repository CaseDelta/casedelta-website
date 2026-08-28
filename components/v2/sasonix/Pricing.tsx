"use client";

/**
 * Beat 6: Pricing. Priced per FIRM by account count, flat monthly, regardless of
 * staff size. That is the wedge against per-seat research tools. The numbers and
 * the bands live in lib/pricing.ts and are not to be retyped here; this file owns
 * how they LOOK and nothing about what they are.
 *
 * This was three SaaS pricing cards with a highlighted middle tier until
 * 2026-08-28. It is now three horizontal line items, by request, and the
 * highlight is gone. Both changes matter and neither is decoration:
 *
 *   - Cards invite comparison shopping between the tiers. There is nothing to
 *     compare. The value is identical in all three and the only variable is how
 *     many accounts the firm provisions, so a row that reads "band ......... price"
 *     answers the actual question and a card full of repeated checkmarks does not.
 *   - A featured middle tier tells a reader that one band is the normal choice and
 *     the other two are the compromise. Account count is a fact about the firm, not
 *     a preference, so steering is worse than useless here: it makes a five-person
 *     firm feel like it is buying the cheap one. All three rows are styled
 *     identically. Do not reintroduce a "most popular" badge.
 *
 * The included list sits once below the rows, because it is the same list for
 * every tier.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal, revealProps } from "./reveal";
import { TIERS, TOP_BAND_ACCOUNTS, INCLUDED } from "@/lib/pricing";

function Check({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: 3 }} aria-hidden>
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
            sub="One flat monthly price for the firm, by the number of accounts you provision."
            titleMaxW={560}
            subMaxW={520}
          />
        </Reveal>

        {/* Three equivalent bands as rows. No cards, no featured tier. */}
        <div style={{ maxWidth: 860, margin: "52px auto 0", borderTop: `1px solid ${SX.hairline}` }}>
          {TIERS.map((t, i) => (
            <motion.div
              key={t.band}
              className="sx-price-row"
              {...revealProps({ delay: i * 0.06, amount: 0.3 })}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 20,
                padding: "26px 4px",
                borderBottom: `1px solid ${SX.hairline}`,
              }}
            >
              <span style={{ fontFamily: SX.body, fontSize: 19, fontWeight: 500, color: SX.ink }}>
                {t.band}
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: 6, flex: "0 0 auto" }}>
                <span className="sx-price-amt" style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 40, letterSpacing: "-1px", color: SX.ink, lineHeight: 1 }}>
                  {t.price}
                </span>
                <span className="sx-price-per" style={{ fontFamily: SX.body, fontSize: 17, fontWeight: 400, color: SX.ink2 }}>/month</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Included once, because it is the same for every band. */}
        <Reveal>
          <ul style={{ listStyle: "none", maxWidth: 860, margin: "34px auto 0", padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }} className="sx-price-incl">
            {INCLUDED.map((item) => (
              <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontFamily: SX.body, fontSize: 15, lineHeight: "23px", color: SX.ink2 }}>
                <Check color={SX.accentText} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div style={{ maxWidth: 860, margin: "38px auto 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }} className="sx-price-foot">
            <p style={{ margin: 0, fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>
              More than {TOP_BAND_ACCOUNTS} accounts?{" "}
              <a href="/demo" style={{ color: SX.accentText, fontWeight: 500, textDecoration: "none" }}>
                Contact us for a custom plan.
              </a>
            </p>
            <a href="/demo" className="sx-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: SX.ink, color: SX.surface, borderRadius: 12, padding: "14px 26px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", ["--v2-btn-hover" as string]: SX.accentDeep }}>
              Book a demo
            </a>
          </div>
        </Reveal>
      </Container>
      <style>{`
        /* Narrow screens: shrink the row rather than stacking it. The band and the
           price belong on one line, which is the whole point of a line item, and
           at these sizes the longest pair ("Up to 20 accounts" / "$2,099") still
           fits a 360px viewport. */
        @media (max-width: 560px) {
          .sx-price-row { padding: 20px 2px !important; gap: 12px !important; }
          .sx-price-row > span:first-child { font-size: 16px !important; white-space: nowrap; }
          .sx-price-row .sx-price-amt { font-size: 30px !important; }
          /* "/month" contracts to "/mo" so the longest pair still holds one line. */
          .sx-price-per { font-size: 0 !important; }
          .sx-price-per::after { content: "/mo"; font-size: 14px; }
        }
        @media (max-width: 700px) {
          .sx-price-incl { grid-template-columns: 1fr !important; }
          .sx-price-foot { flex-direction: column !important; align-items: stretch !important; }
          .sx-price-foot p { text-align: center; }
        }
      `}</style>
    </section>
  );
}
