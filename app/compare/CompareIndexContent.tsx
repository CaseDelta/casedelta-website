"use client";

/**
 * Compare index. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * Honest positioning (POSITIONING.md): Delta's wedge is shape, not a security
 * claim. It operates the tools the firm already runs, does the whole routine job,
 * learns the firm's playbook, cites its sources, and waits for a human to approve.
 * Never claim "no third-party LLM" or "data never leaves our infrastructure"
 * (false: prod runs on enterprise OpenAI). Delta is gender-neutral. No em dashes.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, TextLink, Check, PageHero,
} from "@/components/marketing/kit";
import { COMPARISONS } from "@/lib/comparisons";

export function CompareIndexContent() {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Comparisons"
        title={<>How CaseDelta <span style={{ color: BF.accent, fontStyle: "italic" }}>compares.</span></>}
        sub="Most legal AI is a place you send work to, or a tab you paste into. Delta is a different shape: it operates the tools your firm already runs, does the routine job end to end, cites its sources, and waits for a human to approve before anything goes out. Here is how it stacks up, honestly and with sources."
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* GRID OF COMPARISONS */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Side by side</Eyebrow>
            <H>
              Pick the tool you are <Accent>weighing.</Accent>
            </H>
            <Sub>
              Every comparison leads with a straight answer, lays the differences out in a table, then explains the real distinction. We state CaseDelta&apos;s strengths without inventing weaknesses in anyone else.
            </Sub>
            <TextLink href="/pricing">See transparent, flat pricing</TextLink>
          </motion.div>

          <div className="cd-compare-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
            {COMPARISONS.map((c, i) => (
              <motion.div key={c.slug} {...rise(0.05 * i)}>
                <Link
                  href={`/compare/${c.slug}`}
                  className="cd-compare-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    textDecoration: "none",
                    background: BF.card,
                    border: `1px solid ${BF.hairlineStrong}`,
                    borderRadius: 16,
                    padding: "28px 26px 26px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.5px", color: BF.ink, margin: 0 }}>
                    CaseDelta vs {c.competitor}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: BF.muted, margin: "12px 0 0" }}>
                    {c.cardBlurb}
                  </p>
                  <span style={{ marginTop: "auto", paddingTop: 22, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: SANS, fontSize: 15, fontWeight: 600, color: BF.accent, letterSpacing: "-0.2px" }}>
                    See the comparison
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
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
              The honest comparison is a live demo.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 560 }}>
              See Delta drive a sandbox of your firm&apos;s actual stack, end to end, in fifteen minutes. Bring one real file.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="compare_index_final" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        .cd-compare-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 32px 64px -36px rgba(47,111,224,0.32);
          border-color: ${BF.accentBorderHover};
        }
        @media (max-width: 980px) {
          .cd-compare-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .cd-compare-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
