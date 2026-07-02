"use client";

/**
 * Per-competitor comparison page. Migrated to the marketing kit
 * (components/marketing/kit.tsx).
 *
 * Shape of the page (answer-engine friendly): answer-first paragraph, then a clean
 * comparison table, then the short narrative of the real difference, an honest
 * "when the competitor wins" note, and the FAQ. All copy comes from lib/comparisons.ts,
 * where every competitor claim is sourced and security is treated as parity.
 *
 * Honest positioning (POSITIONING.md): Delta's wedge is operating the firm's own
 * stack, doing the whole job, learned firm memory, citations, and human sign-off,
 * priced like a hire. Never claim "no third-party LLM" or "data never leaves our
 * infrastructure" (false: prod runs on enterprise OpenAI). Delta is gender-neutral.
 * No em dashes.
 */
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, TextLink, Check, PageHero,
} from "@/components/marketing/kit";
import type { Comparison } from "@/lib/comparisons";

export function CompareContent({ comparison: c }: { comparison: Comparison }) {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero eyebrow="Comparison" title={c.heroHeadline} sub={c.heroSubheadline} />

      {/* THE SHORT ANSWER (answer-first, for people and answer engines) */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>The short answer</Eyebrow>
            <p style={{ fontFamily: SANS, fontSize: "clamp(19px, 2.2vw, 24px)", fontWeight: 400, lineHeight: 1.5, letterSpacing: "-0.3px", color: BF.ink, margin: 0 }}>
              {c.geoOpening}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* COMPARISON TABLE */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Side by side</Eyebrow>
            <H>CaseDelta versus {c.competitor}, in a table.</H>
          </motion.div>

          <div style={{ maxWidth: 1000, margin: "48px auto 0", border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, overflow: "hidden" }}>
            <div className="cd-ct-head" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", background: BG.offWhite, borderBottom: `1px solid ${BF.hairline}` }}>
              <div style={{ padding: "18px 24px" }} />
              <div style={{ padding: "18px 24px", fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: BF.accent }}>CaseDelta</div>
              <div style={{ padding: "18px 24px", fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: BF.faint }}>{c.competitor}</div>
            </div>
            {c.table.map((row, i) => (
              <motion.div key={i} {...rise(0.03 * i)} className="cd-ct-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
                <div style={{ padding: "22px 24px", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: BF.ink, display: "flex", alignItems: "center" }}>
                  {row.feature}
                </div>
                <div style={{ padding: "22px 24px", display: "flex", gap: 10, alignItems: "flex-start", fontFamily: SANS, fontSize: 15.5, fontWeight: 500, lineHeight: 1.45, color: BF.ink, background: BF.accentSoft }}>
                  <Check />
                  <span>{row.casedelta}</span>
                </div>
                <div style={{ padding: "22px 24px", fontFamily: SANS, fontSize: 15.5, lineHeight: 1.45, color: BF.muted, display: "flex", alignItems: "center" }}>
                  {row.competitor}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom line callout */}
          <motion.div {...rise(0.05)} style={{ maxWidth: 1000, margin: "40px auto 0" }}>
            <div style={{ borderLeft: `3px solid ${BF.accent}`, paddingLeft: "clamp(20px, 3vw, 32px)", maxWidth: 760 }}>
              <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.6px", color: BF.ink, margin: 0 }}>
                {c.bottomLine}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* THE REAL DIFFERENCE (narrative) */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>The real difference</Eyebrow>
            <H>
              Where they <Accent>diverge.</Accent>
            </H>
          </motion.div>
          <div style={{ marginTop: 48 }}>
            {c.sections.map((s, i) => (
              <motion.div key={i} {...rise(0.04 * i)} style={{ paddingTop: i === 0 ? 0 : "clamp(32px, 4vw, 52px)" }}>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(22px, 2.8vw, 30px)", lineHeight: 1.18, letterSpacing: "-0.5px", color: BF.ink, margin: 0 }}>
                  {s.heading}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 16.5, lineHeight: 1.65, color: BF.muted, marginTop: 14 }}>
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHEN THE COMPETITOR IS THE BETTER FIT (honesty) */}
      <Section bg={BG.white}>
        <Container narrow>
          <motion.div {...rise(0)} style={{ background: BG.offWhite, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "clamp(28px, 3.4vw, 44px)" }}>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(22px, 2.8vw, 30px)", lineHeight: 1.18, letterSpacing: "-0.5px", color: BF.ink, margin: 0 }}>
              {c.whenToChoose.heading}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: 16.5, lineHeight: 1.65, color: BF.muted, marginTop: 14 }}>
              {c.whenToChoose.body}
            </p>
          </motion.div>
          <motion.div {...rise(0.05)}>
            <TextLink href="/compare">See all comparisons</TextLink>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Questions</Eyebrow>
            <H>Common questions</H>
          </motion.div>
          <div style={{ marginTop: 40 }}>
            {c.faq.map((item, i) => (
              <motion.div key={i} {...rise(0.03 * i)} style={{ padding: "24px 0", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
                <h3 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, letterSpacing: "-0.3px", color: BF.ink, margin: 0 }}>{item.question}</h3>
                <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: BF.muted, marginTop: 10 }}>{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section bg={BG.ctaBand}>
        <Container narrow>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See Delta inside your firm&apos;s stack.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 560 }}>
              A fifteen-minute live demo on a sandbox of your firm&apos;s tools, running a real workflow end to end.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="compare_slug_final" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        @media (max-width: 880px) {
          .cd-ct-head, .cd-ct-row { grid-template-columns: 1fr !important; }
          .cd-ct-head > div:first-child { display: none !important; }
          .cd-ct-row > div:first-child { background: ${BG.offWhite}; font-weight: 700 !important; }
        }
      `}</style>
    </main>
  );
}
