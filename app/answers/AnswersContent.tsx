"use client";

/**
 * Answers hub. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * AEO-friendly: question-based headings that mirror what a lawyer would type,
 * each answered answer-first from the shared lib/answers data (reused as-is).
 * Grouped by category, restyled to the Newsreader serif + Hanken grotesk system.
 * Honest claims only, Delta is gender-neutral, no em dashes.
 */
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { ANSWER_CATEGORIES } from "@/lib/answers";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Eyebrow, Accent, PillLink, TextLink, PageHero,
} from "@/components/marketing/kit";

export function AnswersContent() {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Answers"
        title={<>The questions firms ask, <Accent>answered directly.</Accent></>}
        sub="CaseDelta is an AI associate for plaintiff law firms that drives the tools you already use. Direct, answer-first responses to what firms want to know before a demo."
      >
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 36 }}>
          {ANSWER_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="cd-jump"
              style={{
                fontFamily: SANS, fontSize: 14, fontWeight: 600, color: BF.muted,
                textDecoration: "none", border: `1px solid ${BF.hairlineStrong}`,
                borderRadius: 999, padding: "9px 18px", background: BG.white,
                letterSpacing: "-0.1px", transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {cat.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {ANSWER_CATEGORIES.map((cat, i) => (
        <Section key={cat.id} id={cat.id} bg={i % 2 === 0 ? BG.offWhite : BG.white}>
          <Container narrow>
            <motion.div {...rise(0)}>
              <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
              <H>{cat.title}</H>
            </motion.div>
            <div style={{ marginTop: 44 }}>
              {cat.items.map((item, j) => (
                <motion.div
                  key={item.question}
                  {...rise(0.05 * j)}
                  style={{ padding: "28px 0", borderTop: `1px solid ${j === 0 ? BF.hairlineStrong : BF.hairline}` }}
                >
                  <h3 style={{ fontFamily: SANS, fontSize: 19.5, fontWeight: 600, letterSpacing: "-0.35px", color: BF.ink, lineHeight: 1.3, margin: 0 }}>
                    {item.question}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: 16.5, lineHeight: 1.65, letterSpacing: "-0.1px", color: BF.muted, marginTop: 12 }}>
                    {item.answer}
                  </p>
                  {item.href && <TextLink href={item.href}>{item.hrefLabel ?? "Learn more"}</TextLink>}
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* FINAL CTA */}
      <Section bg={BG.ctaBand}>
        <Container narrow center>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              The best answer is a live demo.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Bring one real file and watch Delta do the job inside your own tools, in fifteen minutes. No migration, nothing to rip out.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="answers_final" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        .cd-jump:hover { color: ${BF.accent} !important; border-color: ${BF.accentBorderHover} !important; }
        @media (max-width: 600px) {
          .cd-jump { font-size: 13px !important; padding: 8px 14px !important; }
        }
      `}</style>
    </main>
  );
}
