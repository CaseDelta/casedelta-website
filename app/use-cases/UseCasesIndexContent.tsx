"use client";

/**
 * Use-cases index. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * Frames the page as the work an associate should handle, one card per practice
 * area, each linking to its slug. Honest claims only (POSITIONING.md): teammate
 * not tool, a human reviews before anything sends, outputs cited to source. Never
 * "no third-party LLM" or "data never leaves our infrastructure" (false). Delta is
 * gender-neutral. No em dashes.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { USE_CASES } from "@/lib/use-cases";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, PageHero,
} from "@/components/marketing/kit";

/* One-line outcome per practice area for the index cards. Honest framing: the
   routine work Delta handles across the firm's existing stack, with a person
   reviewing before anything leaves the firm. */
const CARD_OUTCOME: Record<string, string> = {
  "personal-injury":
    "Records review, demand packages, and adjuster correspondence, handled across your case manager, Word, Drive, and inbox in one conversation.",
  "medical-malpractice":
    "Thousands of pages of records turned into a cited chronology, plus complaint and affidavit drafts an attorney reviews before anything goes out.",
  "employment-law":
    "Intake, wage and hour math, and complaint drafting, from the first call to a filed complaint in a single conversation.",
  "mass-tort":
    "Personalized plaintiff updates, intake, and drafting at firm-wide scale, across the tools your firm already runs on.",
};

export function UseCasesIndexContent() {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Use cases"
        title={
          <>
            The work an associate should handle.{" "}
            <span style={{ color: BF.accent, fontStyle: "italic" }}>Across any kind of case.</span>
          </>
        }
        sub="Delta is a teammate that works inside the tools your firm already runs on. Hand it the routine case work, review before anything goes out, and let it keep every matter moving. Here is the work it handles, by practice area."
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* THE WORK, BY PRACTICE AREA */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>By practice area</Eyebrow>
            <H>
              The work Delta handles for <Accent>document-heavy litigation firms.</Accent>
            </H>
            <Sub>
              Same teammate, same review-before-it-sends discipline, tuned to the work each practice runs on. Pick the one that looks like your firm.
            </Sub>
          </motion.div>
          <div
            className="uc-card-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 52 }}
          >
            {USE_CASES.map((uc, i) => (
              <motion.div key={uc.slug} {...rise(0.05 * i)}>
                <Link
                  href={`/use-cases/${uc.slug}`}
                  className="uc-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    background: BF.card,
                    border: `1px solid ${BF.hairlineStrong}`,
                    borderRadius: 16,
                    padding: "30px 30px 32px",
                    textDecoration: "none",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: "clamp(24px, 2.4vw, 30px)",
                      lineHeight: 1.14,
                      letterSpacing: "-0.6px",
                      color: BF.ink,
                      margin: 0,
                    }}
                  >
                    {uc.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: BF.muted,
                      marginTop: 12,
                      flex: 1,
                    }}
                  >
                    {CARD_OUTCOME[uc.slug] ?? uc.heroSubheadline}
                  </p>
                  <span
                    className="uc-card-cta"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      fontFamily: SANS,
                      fontSize: 15,
                      fontWeight: 600,
                      color: BF.accent,
                      letterSpacing: "-0.2px",
                      marginTop: 22,
                    }}
                  >
                    See how Delta handles it
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

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
              See it work on one of your real cases.
            </h2>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 18,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.72)",
                margin: "20px auto 0",
                maxWidth: 540,
              }}
            >
              Bring one real file and watch Delta do the job inside your own tools, in fifteen minutes. No migration, nothing to rip out.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="use_cases_index_cta" onDark>
                Book a 15-minute demo
              </PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        .uc-card { transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
        .uc-card:hover { transform: translateY(-3px); border-color: ${BF.accentBorderHover}; box-shadow: 0 32px 64px -40px rgba(47,111,224,0.32); }
        .uc-card-cta svg { transition: transform 0.2s ease; }
        .uc-card:hover .uc-card-cta svg { transform: translateX(3px); }
        @media (max-width: 880px) {
          .uc-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
