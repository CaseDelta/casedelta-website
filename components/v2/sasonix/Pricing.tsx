"use client";

/**
 * Beat 6: Pricing. Priced per FIRM by account count, flat monthly, regardless of
 * staff size. That is the wedge against per-seat research tools. The numbers, the
 * bands and every derived figure live in lib/pricing.ts and are not to be retyped
 * here; this file owns how they LOOK and nothing about what they are.
 *
 * This was three SaaS pricing cards with a highlighted middle tier until
 * 2026-08-28. It is now three horizontal line items that expand, and the highlight
 * is gone. Both of those matter and neither is decoration:
 *
 *   - Cards invite comparison shopping between the tiers. There is nothing to
 *     compare. The value is identical in all three and the only variable is how
 *     many accounts the firm provisions, so a row that reads "band ....... price"
 *     answers the actual question and a card full of repeated checkmarks does not.
 *   - A featured middle tier tells a reader that one band is the normal choice and
 *     the other two are the compromise. Account count is a fact about the firm, not
 *     a preference, so steering is worse than useless here: it makes a five-person
 *     firm feel like it is buying the cheap one. All three rows are styled
 *     identically. Do not reintroduce a "most popular" badge.
 *
 * The shared "everything included" checklist that used to sit under the rows is
 * gone, along with the section subhead. Both were saying what the row already
 * says. What replaced them is per-tier detail behind a disclosure, so the section
 * reads as three prices at a glance and rewards a click with the arithmetic.
 *
 * EVERY NUMBER IN THE DISCLOSURE IS DERIVED, none is a claim. Annual cost, cost
 * per account and the multiple against a hire are all computed in lib/pricing.ts
 * from the tier price and the loaded-hire figure the site already publishes. There
 * are deliberately no hours-saved figures, payback periods or percentages: a
 * pricing page is the wrong place to debut a productivity number we cannot source.
 */
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal, revealProps } from "./reveal";
import { TIERS, TOP_BAND_ACCOUNTS, annualCost, perAccount, hireMultiple, HIRE_LOW, HIRE_HIGH, type Tier } from "@/lib/pricing";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/** The rows of arithmetic behind one tier. Label, value, and why it is here. */
function detailRows(t: Tier) {
  return [
    {
      label: "Automations included",
      value: String(t.automations),
      note: "Recurring workflows Delta runs on its own, without being asked.",
    },
    {
      label: "Per account, per month",
      value: perAccount(t),
      note: "At the full band. This is the number that improves as the bands go up.",
    },
    {
      label: "Per year",
      value: annualCost(t),
      note: "The whole firm, billed monthly.",
    },
    {
      label: "Against one hire",
      value: hireMultiple(t),
      note: `A paralegal runs ${usd(HIRE_LOW)} to ${usd(HIRE_HIGH)} a year, loaded.`,
    },
  ];
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke={SX.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: "0 0 auto", transform: `rotate(${open ? 180 : 0}deg)`, transition: "transform 0.24s ease" }}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Pricing() {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="pricing" style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <Container>
        <Reveal>
          <SectionHead eyebrow="Pricing" title="A fraction of another salary" titleMaxW={560} />
        </Reveal>

        {/* Three equivalent bands as rows. No cards, no featured tier. */}
        <div style={{ maxWidth: 860, margin: "52px auto 0", borderTop: `1px solid ${SX.hairline}` }}>
          {TIERS.map((t, i) => {
            const isOpen = open === t.band;
            const panelId = `tier-${t.accounts}`;
            return (
              <motion.div key={t.band} {...revealProps({ delay: i * 0.06, amount: 0.3 })} style={{ borderBottom: `1px solid ${SX.hairline}` }}>
                <button
                  type="button"
                  className="sx-price-row"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : t.band)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    font: "inherit",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 20,
                    padding: "26px 4px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Chevron open={isOpen} />
                    <span className="sx-price-band" style={{ fontFamily: SX.body, fontSize: 19, fontWeight: 500, color: SX.ink }}>
                      {t.band}
                    </span>
                  </span>
                  <span style={{ display: "flex", alignItems: "baseline", gap: 6, flex: "0 0 auto" }}>
                    <span className="sx-price-amt" style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 40, letterSpacing: "-1px", color: SX.ink, lineHeight: 1 }}>
                      {t.price}
                    </span>
                    <span className="sx-price-per" style={{ fontFamily: SX.body, fontSize: 17, fontWeight: 400, color: SX.ink2 }}>/month</span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="sx-price-detail" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "22px 40px", padding: "6px 4px 30px 46px" }}>
                        {detailRows(t).map((d) => (
                          <div key={d.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <span style={{ fontFamily: SX.mono, fontSize: 11.5, letterSpacing: "0.7px", textTransform: "uppercase", color: SX.ink3 }}>
                              {d.label}
                            </span>
                            <span style={{ fontFamily: SX.display, fontSize: 26, fontWeight: 500, letterSpacing: "-0.5px", color: SX.ink, lineHeight: 1.2 }}>
                              {d.value}
                            </span>
                            <span style={{ fontFamily: SX.body, fontSize: 14, lineHeight: "21px", color: SX.ink2 }}>{d.note}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <Reveal>
          <div style={{ maxWidth: 860, margin: "34px auto 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }} className="sx-price-foot">
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
        .sx-price-row:hover .sx-price-band { color: ${SX.accentText}; }
        .sx-price-row:focus-visible { outline: 2px solid ${SX.accent}; outline-offset: 2px; border-radius: 6px; }
        /* Narrow screens: shrink the row rather than stacking it. The band and the
           price belong on one line, which is the whole point of a line item, and at
           these sizes the longest pair still fits a 360px viewport. */
        @media (max-width: 620px) {
          .sx-price-detail { grid-template-columns: 1fr !important; padding-left: 4px !important; }
        }
        @media (max-width: 560px) {
          .sx-price-row { padding: 20px 2px !important; gap: 12px !important; }
          .sx-price-band { font-size: 16px !important; white-space: nowrap; }
          .sx-price-amt { font-size: 30px !important; }
          /* "/month" contracts to "/mo" so the longest pair still holds one line. */
          .sx-price-per { font-size: 0 !important; }
          .sx-price-per::after { content: "/mo"; font-size: 14px; }
        }
        @media (max-width: 700px) {
          .sx-price-foot { flex-direction: column !important; align-items: stretch !important; }
          .sx-price-foot p { text-align: center; }
        }
      `}</style>
    </section>
  );
}
