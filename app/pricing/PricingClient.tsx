"use client";

/**
 * Pricing page. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * The strategy is a PUBLISHED price used as a transparency wedge against
 * quote-gated competitors, and the value anchor is a hire (a $4-5k/mo paralegal),
 * not another app. Honest claims only, Delta is gender-neutral, no em dashes.
 *
 * Every number comes from lib/pricing.ts. Do not retype one here. Until
 * 2026-08-28 this page said "$349 per user, per month, flat, no tiers" while the
 * homepage said $499 / $999 / $1,999 by account band, because each surface had
 * typed its own price. One prospect could read both in a single session.
 *
 * The three bands are shown as equivalent rows, not as cards with a highlighted
 * middle tier. See the header of components/v2/sasonix/Pricing.tsx for why that
 * is a correctness point and not a style one.
 */
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, Check, PageHero, FaqAccordion,
} from "@/components/marketing/kit";
import { TIERS, TOP_BAND_ACCOUNTS, INCLUDED, PRICE_PARAGRAPH, STARTING_PRICE, annualCost, perAccount, hireMultiple, HIRE_LOW, HIRE_HIGH, type Tier } from "@/lib/pricing";

const COMPARE = [
  { k: "Cost", hire: "$50,000 to $65,000 a year, loaded", delta: `${STARTING_PRICE} to $2,099 a month for the firm, flat` },
  { k: "Time to start", hire: "Months to recruit, interview, and train", delta: "Working your cases the same afternoon" },
  { k: "Capacity", hire: "One person, one desk, 40 hours a week", delta: "Every matter at once, around the clock" },
  { k: "Turnover", hire: "Often gone within 18 months, knowledge with them", delta: "Never quits, never forgets your firm" },
];

const FAQ = [
  {
    q: "How much does CaseDelta cost?",
    a: PRICE_PARAGRAPH,
  },
  {
    q: "Is it priced per seat?",
    a: `No. The price is for the firm, by the number of accounts you provision, so it does not climb every time someone new needs to use it. A heavy case with thousands of pages does not change the number either. Firms above ${TOP_BAND_ACCOUNTS} accounts get a custom plan.`,
  },
  {
    q: "Which tier is the right one?",
    a: "Whichever band your account count falls into. The three tiers are the same product with the same integrations and the same work; none of them is the standard one and none is a stripped-down version of another. If you are on the line between two bands, the lower number includes its own bound, so exactly five accounts is the five-account price.",
  },
  {
    q: "Are there setup, migration, or add-on fees?",
    a: "No. There is nothing to migrate and no implementation project. Delta connects to the tools you already pay for, so getting started is a login, not an invoice.",
  },
  {
    q: "What if it is not the right fit for my firm?",
    a: "See it on one of your real cases first. Bring a real file to a fifteen-minute demo and watch Delta do the work inside your own tools before you decide anything.",
  },
];

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/**
 * The arithmetic behind one tier. Every value is derived in lib/pricing.ts from
 * the tier price and the loaded-hire figure this page already publishes in the
 * comparison table below. No hours-saved numbers, no payback periods, no
 * percentages: those would be claims, and this page cannot source them.
 */
function detailRows(t: Tier) {
  return [
    { label: "Automations included", value: String(t.automations), note: "Recurring workflows Delta runs on its own, without being asked." },
    { label: "Per account, per month", value: perAccount(t), note: "At the full band. This is the number that improves as the bands go up." },
    { label: "Per year", value: annualCost(t), note: "The whole firm, billed monthly." },
    { label: "Against one hire", value: hireMultiple(t), note: `A paralegal runs ${usd(HIRE_LOW)} to ${usd(HIRE_HIGH)} a year, loaded.` },
  ];
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BF.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: "0 0 auto", transform: `rotate(${open ? 180 : 0}deg)`, transition: "transform 0.24s ease" }} aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function PricingClient() {
  const rise = useRise();
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Pricing"
        title={<>Priced like a hire, <span style={{ color: BF.accent, fontStyle: "italic" }}>published like a promise.</span></>}
        sub={`One flat monthly price for the firm, by account count, starting at ${STARTING_PRICE}. Published and self-serve, so you know your cost before the demo. Priced against a hire, not per seat.`}
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* PRICE + WHAT YOU GET */}
      {/* Three equivalent bands as rows, then the included list once. The value is
          identical across the tiers, so repeating it three times in three cards
          would be three copies of the same paragraph and an implied ranking that
          does not exist. */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 720 }}>
            <Eyebrow>Three bands, one product</Eyebrow>
            <H>
              Pick the band your <Accent>account count falls into.</Accent>
            </H>
            <Sub>
              Every tier is the same Delta, with the same integrations and the same work. The only
              variable is how many accounts your firm provisions. No add-ons, no setup fees, and no
              per-case or per-demand metering.
            </Sub>
          </motion.div>

          <div style={{ marginTop: 44, borderTop: `1px solid ${BF.hairlineStrong}` }}>
            {TIERS.map((t, i) => {
              const isOpen = open === t.band;
              const panelId = `cd-tier-${t.accounts}`;
              return (
                <motion.div key={t.band} {...rise(0.05 * i)} style={{ borderBottom: `1px solid ${BF.hairline}` }}>
                  <button
                    type="button"
                    className="cd-tier-row"
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
                      padding: "28px 4px",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Chevron open={isOpen} />
                      <span className="cd-tier-band" style={{ fontFamily: SANS, fontSize: 19, fontWeight: 600, color: BF.ink, letterSpacing: "-0.2px" }}>
                        {t.band}
                      </span>
                    </span>
                    <span style={{ display: "flex", alignItems: "baseline", gap: 8, flex: "0 0 auto" }}>
                      <span style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1, letterSpacing: "-1.6px", color: BF.ink }}>
                        {t.price}
                      </span>
                      <span className="cd-tier-per" style={{ fontFamily: SANS, fontSize: 17, fontWeight: 500, color: BF.muted }}>per month</span>
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
                        <div className="cd-tier-detail" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "22px 48px", padding: "4px 4px 32px 46px" }}>
                          {detailRows(t).map((d) => (
                            <div key={d.label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                              <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.7px", textTransform: "uppercase", color: BF.faint }}>
                                {d.label}
                              </span>
                              <span style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, letterSpacing: "-0.8px", color: BF.ink, lineHeight: 1.2 }}>
                                {d.value}
                              </span>
                              <span style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.5, color: BF.muted }}>{d.note}</span>
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

          <motion.p {...rise(0.2)} style={{ fontFamily: SANS, fontSize: 16, color: BF.muted, margin: "20px 0 0" }}>
            More than {TOP_BAND_ACCOUNTS} accounts?{" "}
            <a href="/demo" style={{ color: BF.accent, fontWeight: 600, textDecoration: "none" }}>
              Contact us for a custom plan.
            </a>
          </motion.p>

          <motion.ul {...rise(0.24)} style={{ listStyle: "none", margin: "40px 0 0", background: BG.white, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "10px 28px" }}>
            {INCLUDED.map((item, i, arr) => (
              <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "20px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BF.hairline}` : "none" }}>
                <Check />
                <span style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, color: BF.ink, lineHeight: 1.5, letterSpacing: "-0.2px" }}>{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div {...rise(0.28)} style={{ marginTop: 32 }}>
            <PillLink href="/demo" location="pricing_body">Book a demo</PillLink>
          </motion.div>
        </Container>
      </Section>

      {/* VS A HIRE */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>The math</Eyebrow>
            <H>
              Compared to the help you <Accent>cannot hire fast enough.</Accent>
            </H>
            <Sub>The honest comparison is not another app. It is the paralegal you are trying to recruit, train, and keep.</Sub>
          </motion.div>
          <div style={{ marginTop: 48, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, overflow: "hidden" }}>
            <div className="cd-cmp-head" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", background: BG.offWhite, borderBottom: `1px solid ${BF.hairline}` }}>
              <div style={{ padding: "18px 24px" }} />
              <div style={{ padding: "18px 24px", fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: BF.faint }}>A new paralegal</div>
              <div style={{ padding: "18px 24px", fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: BF.accent }}>CaseDelta</div>
            </div>
            {COMPARE.map((row, i) => (
              <motion.div key={row.k} {...rise(0.04 * i)} className="cd-cmp-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
                <div style={{ padding: "22px 24px", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: BF.ink }}>{row.k}</div>
                <div style={{ padding: "22px 24px", fontFamily: SANS, fontSize: 15.5, color: BF.muted, lineHeight: 1.45 }}>{row.hire}</div>
                <div style={{ padding: "22px 24px", fontFamily: SANS, fontSize: 15.5, color: BF.ink, fontWeight: 500, lineHeight: 1.45, background: BF.accentSoft }}>{row.delta}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Questions</Eyebrow>
            <H>Pricing questions</H>
          </motion.div>
          <motion.div {...rise(0.06)} style={{ marginTop: 28 }}>
            <FaqAccordion items={FAQ} />
          </motion.div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section bg={BG.ctaBand}>
        <Container narrow center>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See what it does before you decide.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Bring one real file to a fifteen-minute demo. Watch Delta work it in your own tools, then decide if it belongs on the team.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="pricing_final" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        /* Narrow screens: shrink the row rather than stacking it. A line item that
           stacks stops being a line item. "per month" contracts to "/mo" so the
           longest pair still fits one line on a 360px viewport. */
        .cd-tier-row:hover .cd-tier-band { color: ${BF.accent}; }
        .cd-tier-row:focus-visible { outline: 2px solid ${BF.accent}; outline-offset: 2px; border-radius: 6px; }
        @media (max-width: 620px) {
          .cd-tier-detail { grid-template-columns: 1fr !important; padding-left: 4px !important; }
        }
        @media (max-width: 560px) {
          .cd-tier-row { padding: 20px 2px !important; gap: 12px !important; }
          .cd-tier-band { font-size: 16px !important; white-space: nowrap; }
          .cd-tier-per { font-size: 0 !important; }
          .cd-tier-per::after { content: "/mo"; font-size: 14px; }
        }
        @media (max-width: 880px) {
          .cd-cmp-head, .cd-cmp-row { grid-template-columns: 1fr !important; }
          .cd-cmp-head > div:first-child { display: none !important; }
          .cd-cmp-row > div:first-child { background: ${BG.offWhite}; font-weight: 700 !important; }
        }
      `}</style>
    </main>
  );
}
