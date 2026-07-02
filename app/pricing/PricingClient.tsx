"use client";

/**
 * Pricing page. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * The site's live strategy is a PUBLISHED price used as a transparency wedge
 * against quote-gated competitors: "$349 per user, per month, flat, published,
 * self-serve" (mirrored in app/pricing metadata, lib/answers.ts, and every
 * lib/comparisons.ts page). Keep that number and framing consistent here. The
 * value anchor is a hire ($4-5k/mo paralegal), not another app. Honest claims
 * only, Delta is gender-neutral, no em dashes.
 */
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, Check, PageHero,
} from "@/components/marketing/kit";

const INCLUDED = [
  "Every attorney, paralegal, and admin who uses it",
  "Every integration: your case manager, email, calendar, drive, and billing",
  "The full job: records requests, drafting, file updates, deadline tracking, chronologies",
  "Onboarding by login, with no migration and no implementation project",
  "Your firm's learned playbook, which compounds the longer Delta works your cases",
];

const COMPARE = [
  { k: "Cost", hire: "$50,000 to $65,000 a year, loaded", delta: "$349 per user, per month, flat" },
  { k: "Time to start", hire: "Months to recruit, interview, and train", delta: "Working your cases the same afternoon" },
  { k: "Capacity", hire: "One person, one desk, 40 hours a week", delta: "Every matter at once, around the clock" },
  { k: "Turnover", hire: "Often gone within 18 months, knowledge with them", delta: "Never quits, never forgets your firm" },
];

const FAQ = [
  {
    q: "How much does CaseDelta cost?",
    a: "CaseDelta is $349 per user, per month, flat. No tiers, no add-ons, no per-case or per-demand metering, and no setup fees. The price is published and self-serve, so a firm knows its cost before the demo.",
  },
  {
    q: "Is it priced per user?",
    a: "Yes. Every attorney, paralegal, and admin who uses it is a flat $349 per month, priced like an associate rather than a per-case bill. A heavy case with thousands of pages does not change the number.",
  },
  {
    q: "Are there setup, migration, or add-on fees?",
    a: "No. There is nothing to migrate and no implementation project. Delta connects to the tools you already pay for, so getting started is a login, not an invoice.",
  },
  {
    q: "How does it compare to hiring a paralegal?",
    a: "A paralegal runs roughly $50,000 to $65,000 a year loaded, takes months to hire, and often moves on within two years. Delta is a fraction of that per user, works every case at once, and never leaves with what it learned.",
  },
  {
    q: "What if it is not the right fit for my firm?",
    a: "See it on one of your real cases first. Bring a real file to a fifteen-minute demo and watch Delta do the work inside your own tools before you decide anything.",
  },
];

export default function PricingClient() {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Pricing"
        title={<>Priced like a hire, <span style={{ color: BF.accent, fontStyle: "italic" }}>published like a promise.</span></>}
        sub="$349 per user, per month. Flat, published, and self-serve, so you know your cost before the demo. Priced like an associate, not a per-case bill."
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* PRICE + WHAT YOU GET */}
      <Section bg={BG.offWhite}>
        <Container>
          <div className="cd-price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <motion.div {...rise(0)}>
              <Eyebrow>One plan</Eyebrow>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
                <span style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(64px, 8vw, 96px)", lineHeight: 1, letterSpacing: "-2.4px", color: BF.ink }}>$349</span>
                <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 500, color: BF.muted }}>per user, per month</span>
              </div>
              <Sub>Flat and published. No tiers, no add-ons, no setup fees, and no per-case metering. Priced against a hire, not another app.</Sub>
              <div style={{ marginTop: 32 }}>
                <PillLink href="/demo" location="pricing_body">Book a demo</PillLink>
              </div>
            </motion.div>
            <motion.ul {...rise(0.08)} style={{ listStyle: "none", margin: 0, background: BG.white, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "10px 28px" }}>
              {INCLUDED.map((item, i, arr) => (
                <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "20px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BF.hairline}` : "none" }}>
                  <Check />
                  <span style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, color: BF.ink, lineHeight: 1.5, letterSpacing: "-0.2px" }}>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
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
          <div style={{ marginTop: 40 }}>
            {FAQ.map((item, i) => (
              <motion.div key={i} {...rise(0.03 * i)} style={{ padding: "24px 0", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
                <h3 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, letterSpacing: "-0.3px", color: BF.ink, margin: 0 }}>{item.q}</h3>
                <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: BF.muted, marginTop: 10 }}>{item.a}</p>
              </motion.div>
            ))}
          </div>
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
        @media (max-width: 880px) {
          .cd-price-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cd-cmp-head, .cd-cmp-row { grid-template-columns: 1fr !important; }
          .cd-cmp-head > div:first-child { display: none !important; }
          .cd-cmp-row > div:first-child { background: ${BG.offWhite}; font-weight: 700 !important; }
        }
      `}</style>
    </main>
  );
}
