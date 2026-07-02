"use client";

/**
 * Use-case detail template. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * Per use case: answer-first overview -> the problem -> how Delta handles it ->
 * what you get -> FAQ -> related comparisons -> CTA to /demo. Honest claims only
 * (POSITIONING.md): teammate not tool, a human reviews before anything sends,
 * outputs cited to source. Security is parity, so never "no third-party LLM" or
 * "data never leaves our infrastructure" (false). Delta is gender-neutral. No em dashes.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import type { UseCase } from "@/lib/use-cases";
import { getComparisonBySlug } from "@/lib/comparisons";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, PageHero,
} from "@/components/marketing/kit";

/* Per-practice-area related comparisons (cross-links into the /compare funnel). */
const RELATED_COMPARE: Record<string, string[]> = {
  "personal-injury": ["casedelta-vs-evenup", "casedelta-vs-supio", "casedelta-vs-clio"],
  "medical-malpractice": ["casedelta-vs-supio", "casedelta-vs-evenup", "casedelta-vs-eve"],
  "employment-law": ["casedelta-vs-clio", "casedelta-vs-chatgpt", "casedelta-vs-proplaintiff"],
  "mass-tort": ["casedelta-vs-supio", "casedelta-vs-evenup", "casedelta-vs-proplaintiff"],
};

/* Skip pain points framed as a public-AI / third-party-provider scare. Delta runs
   on enterprise AI under no-training terms, so security is parity, not a
   no-third-party-LLM architecture claim (see lib/comparisons.ts house rules). */
const HIDE_PROBLEM = /third-party provider|public ai|free ai tool/i;

export function UseCasePageContent({ useCase }: { useCase: UseCase }) {
  const rise = useRise();
  const area = useCase.title.toLowerCase();
  const problems = useCase.painPoints.filter(
    (p) => !HIDE_PROBLEM.test(`${p.title} ${p.description}`)
  );
  const related = (RELATED_COMPARE[useCase.slug] ?? [])
    .map((slug) => getComparisonBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow={useCase.title}
        title={useCase.heroHeadline}
        sub={useCase.heroSubheadline}
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* ANSWER-FIRST OVERVIEW */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Overview</Eyebrow>
            <H>
              What CaseDelta does for <Accent>{area} firms.</Accent>
            </H>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "clamp(17px, 1.6vw, 20px)",
                lineHeight: 1.7,
                letterSpacing: "-0.2px",
                color: BF.muted,
                marginTop: 22,
                maxWidth: 760,
              }}
            >
              {useCase.geoOpening}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* STATS BAND */}
      <Section bg={BG.statBand}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <Eyebrow light>By the numbers</Eyebrow>
            <H light>What that looks like in practice.</H>
          </motion.div>
          <div
            className="uc-stat-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 56 }}
          >
            {useCase.stats.map((s, i) => (
              <motion.div
                key={i}
                {...rise(0.05 * i)}
                style={{ padding: "0 30px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)" }}
              >
                <div
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: "clamp(38px, 4.6vw, 56px)",
                    lineHeight: 1.02,
                    letterSpacing: "-1.4px",
                    color: "#fff",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.45, color: "rgba(255,255,255,0.6)", marginTop: 16 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* THE PROBLEM */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>The problem</Eyebrow>
            <H>The work that piles up.</H>
          </motion.div>
          <div
            className="uc-prob-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 48 }}
          >
            {problems.map((p, i) => (
              <motion.article
                key={i}
                {...rise(0.05 * i)}
                style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "28px 26px 30px" }}
              >
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, lineHeight: 1.16, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: BF.muted, marginTop: 10 }}>
                  {p.description}
                </p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* HOW DELTA HANDLES IT */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>How Delta handles it</Eyebrow>
            <H>
              How Delta runs your <Accent>{area}</Accent> practice.
            </H>
            <Sub>
              Delta works across the tools your firm already uses and does the routine work end to end. A person on your team reviews and approves before anything leaves the firm, and every output is cited to its source.
            </Sub>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 52 }}>
            {useCase.howDeltaHelps.map((cap, i) => (
              <motion.div
                key={i}
                {...rise(0.05 * i)}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  padding: "22px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}`,
                }}
              >
                <span
                  style={{
                    flex: "0 0 auto",
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: BF.accentSoft,
                    border: `1px solid ${BF.accentBorderHover}`,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: SERIF,
                    fontSize: 17,
                    color: BF.accent,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, lineHeight: 1.18, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>
                    {cap.title}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: BF.muted, marginTop: 10, maxWidth: 720 }}>
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHAT YOU GET */}
      <Section bg={BG.white}>
        <Container>
          <div
            className="uc-know-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 4vw, 64px)", alignItems: "center" }}
          >
            <motion.div {...rise(0)}>
              <Eyebrow>What you get</Eyebrow>
              <H>
                What Delta runs <Accent>across the firm.</Accent>
              </H>
              <Sub>
                The tools it connects to, the workflows it runs, and how your firm&apos;s data is handled. One teammate across the stack you already use, with a person signing off before anything goes out.
              </Sub>
            </motion.div>
            <motion.div
              {...rise(0.08)}
              style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, overflow: "hidden" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 22px",
                  borderBottom: `1px solid ${BF.hairline}`,
                  background: BG.offWhite,
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: BF.ink }}>
                  What Delta runs across the firm
                </span>
                <span style={{ fontFamily: SANS, fontSize: 12, color: BF.faint, marginLeft: "auto" }}>
                  {useCase.deltaLearnsExample.firmName}
                </span>
              </div>
              <div>
                {useCase.deltaLearnsExample.entries.map((e, i, arr) => (
                  <div
                    key={i}
                    style={{ padding: "16px 22px", borderBottom: i < arr.length - 1 ? `1px solid ${BF.hairline}` : "none" }}
                  >
                    <div
                      style={{
                        fontFamily: SANS,
                        fontSize: 11.5,
                        fontWeight: 600,
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        color: BF.faint,
                        marginBottom: 6,
                      }}
                    >
                      {e.label}
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.55, color: BF.ink }}>{e.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Questions</Eyebrow>
            <H>Frequently asked questions</H>
          </motion.div>
          <div style={{ marginTop: 40 }}>
            {useCase.faq.map((item, i) => (
              <motion.div
                key={i}
                {...rise(0.03 * i)}
                style={{ padding: "24px 0", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}
              >
                <h3 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, letterSpacing: "-0.3px", color: BF.ink, margin: 0 }}>
                  {item.question}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: BF.muted, marginTop: 10 }}>
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* RELATED COMPARISONS */}
      {related.length > 0 && (
        <Section bg={BG.white}>
          <Container>
            <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
              <Eyebrow>Compare</Eyebrow>
              <H>Comparing your options?</H>
              <Sub>See how CaseDelta stacks up against the tools firms like yours evaluate.</Sub>
            </motion.div>
            <motion.div {...rise(0.08)} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="uc-cmp-pill"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    fontFamily: SANS,
                    fontSize: 15,
                    fontWeight: 600,
                    color: BF.accent,
                    letterSpacing: "-0.2px",
                    textDecoration: "none",
                    border: `1px solid ${BF.hairlineStrong}`,
                    borderRadius: 999,
                    padding: "11px 20px",
                    background: BF.card,
                  }}
                >
                  CaseDelta vs {c.competitor}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </motion.div>
          </Container>
        </Section>
      )}

      {/* FINAL CTA */}
      <Section bg={BG.ctaBand}>
        <Container narrow center>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(34px, 4.8vw, 56px)",
                lineHeight: 1.04,
                letterSpacing: "-1.4px",
                color: "#fff",
                margin: "0 auto",
                maxWidth: 720,
              }}
            >
              See Delta work your {area} cases in your own tools.
            </h2>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 18,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.72)",
                margin: "20px auto 0",
                maxWidth: 560,
              }}
            >
              {useCase.ctaText}
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location={`use_case_${useCase.slug}_cta`} onDark>
                Book a 15-minute demo
              </PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        @media (max-width: 880px) {
          .uc-prob-grid { grid-template-columns: 1fr !important; }
          .uc-know-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 760px) {
          .uc-stat-grid { grid-template-columns: 1fr !important; gap: 36px 0 !important; }
          .uc-stat-grid > div { border-left: none !important; padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </main>
  );
}
