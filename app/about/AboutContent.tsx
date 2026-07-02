"use client";

/**
 * About page. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * Mission-driven: give a small, growing firm the capacity of a bigger team
 * without the hire. Honest claims only (POSITIONING.md): teammate not tool,
 * a human keeps a hand on the wheel, never "no third-party LLM / data never
 * leaves our infrastructure." Delta is gender-neutral (never she/her). No em
 * dashes. Founder facts (Camren Hall) are real and mirrored in the PersonSchema
 * JSON-LD on app/about/page.tsx, keep them in sync.
 */
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, TextLink, Check, PageHero,
} from "@/components/marketing/kit";

const para: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 17,
  lineHeight: 1.65,
  letterSpacing: "-0.2px",
  color: BF.muted,
  margin: 0,
};

const MISSION_PARAS = [
  "A growing firm does not lose cases because the lawyers are not good enough. It loses them because there are not enough hours, and not enough people, to keep every matter moving at once. The next hire is months away and expensive. The work does not wait.",
  "We build CaseDelta so a small firm can carry the caseload of a much bigger one without adding headcount. Delta is an AI teammate that works inside the tools a firm already uses and takes on the routine case work, the records requests, the drafting, the file updates, the deadline tracking. The firm runs more matters, and nothing slips through the cracks.",
];

const PROBLEM_PARAS = [
  "Talk to a growing plaintiff firm and the same picture appears every time. The case lives across five or six systems: the case manager, email, the drive, the calendar, billing. No single tool holds the whole matter, so the work of stitching them together falls on people, and those are exactly the people a firm cannot hire fast enough.",
  "When that stitching slips, the cost is not abstract. A missed deadline is a bar complaint. A dropped follow-up is a lost fee. The firm is one forgotten task away from real harm, and the only lever it has is to work its team harder.",
  "Delta is the teammate that keeps everything moving. It sees across the whole stack, does the routine work end to end, and flags what is about to slip before it becomes a problem. So the firm grows on the caseload, not on the payroll.",
];

const BELIEFS = [
  {
    t: "A teammate, not another tool.",
    d: "Delta is meant to take work off the desk the way a good hire would, not to add one more app to check. You delegate to it in plain English, and it does the job inside the systems you already have.",
  },
  {
    t: "Operate the firm's tools, do not replace them.",
    d: "A firm already chose its case manager, its email, its drive. Delta works inside that stack. No migration, no rip-out, nothing new for the team to learn on day one.",
  },
  {
    t: "A human keeps a hand on the wheel.",
    d: "Delta drafts, gathers, and updates, but a person on the team reviews and approves before anything leaves the firm. The judgment stays with the lawyer, always.",
  },
  {
    t: "Held to the standard the work demands.",
    d: "Client matters carry a duty of confidentiality and often protected health information. Delta treats that data to the standard the bar and HIPAA require: encrypted, access-controlled, never used to train a model, with a BAA available.",
  },
];

const FOUNDER_CREDS = [
  "Vanderbilt University",
  "Computer Science & Applied Mathematics",
  "2.5 years at Capital One",
  "Kansas City Metropolitan Bar Association",
];

const FOUNDER_PARAS = [
  "CaseDelta started after months of customer discovery with practicing attorneys at plaintiff firms. The same finding kept surfacing: a personal injury, medical malpractice, employment, or mass tort firm runs on a stack of five or six tools, and every workflow means switching between them by hand.",
  "Every legal AI on the market lived inside one of those tools and asked the firm to adopt yet another platform. None of them ran across the firm's actual workflow. That gap became CaseDelta.",
  "Before CaseDelta, Camren spent two and a half years at Capital One building data systems that power real-time financial decisions at scale. That experience shapes how Delta is built: a single conversation runs work across many systems, with security and reliability treated as architecture, not policy.",
];

const EARLY_PARAS = [
  "CaseDelta is early, and we would rather say that plainly than dress it up. Being early is exactly why a founding firm has leverage a later customer will not.",
  "Your cases shape how Delta learns the work. Your feedback sets what we build next. And your pricing is locked in as a founding partner, on terms the next firm will not get. You are not buying a finished product off a shelf. You are helping shape the teammate your firm will rely on.",
];

export function AboutContent() {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="About CaseDelta"
        title={<>The capacity of a bigger team, <Accent>without the hire.</Accent></>}
        sub="We build Delta, an AI teammate that works inside the tools a firm already uses and handles the routine case work, so a growing firm can run more matters without adding headcount and nothing slips."
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* MISSION */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Our mission</Eyebrow>
            <H>
              Give a small firm the reach of a <Accent>much bigger one.</Accent>
            </H>
          </motion.div>
          <motion.div {...rise(0.08)} style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 28 }}>
            {MISSION_PARAS.map((p, i) => (
              <p key={i} style={para}>{p}</p>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* WHY WE EXIST / THE PROBLEM */}
      <Section bg={BG.white}>
        <Container>
          <div className="cd-two-col" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "start" }}>
            <motion.div {...rise(0)}>
              <Eyebrow>Why we exist</Eyebrow>
              <H>
                A firm's work lives across <Accent>five systems.</Accent>
              </H>
              <Sub>The stitching-together falls on people you cannot hire fast enough, and every gap between the tools is a chance for something to slip.</Sub>
            </motion.div>
            <motion.div {...rise(0.1)} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {PROBLEM_PARAS.map((p, i) => (
                <p key={i} style={para}>{p}</p>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* WHAT WE BELIEVE */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>What we believe</Eyebrow>
            <H>How we build Delta.</H>
            <Sub>Four convictions shape every decision, from how Delta connects to a firm's tools to how it handles a client's most sensitive files.</Sub>
          </motion.div>
          <div className="cd-belief-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 48 }}>
            {BELIEFS.map((b, i) => (
              <motion.article
                key={i}
                {...rise(0.05 * i)}
                style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "28px 26px 30px" }}
              >
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 16 }}>
                  <Check />
                </span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, lineHeight: 1.16, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>{b.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: BF.muted, marginTop: 10 }}>{b.d}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* FOUNDER */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ marginBottom: 44 }}>
            <Eyebrow>Founder</Eyebrow>
          </motion.div>
          <div className="cd-founder-grid" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 56, alignItems: "start" }}>
            <motion.div {...rise(0.05)}>
              <div style={{ width: 84, height: 84, borderRadius: "50%", background: "linear-gradient(150deg,#3a78e0,#1f3a5f)", display: "grid", placeItems: "center", marginBottom: 22 }}>
                <span style={{ fontFamily: SANS, fontSize: 25, fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>CH</span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(26px, 2.6vw, 34px)", lineHeight: 1.1, letterSpacing: "-0.6px", color: BF.ink, margin: 0 }}>Camren Hall</h3>
              <p style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 600, letterSpacing: "0.2px", color: BF.faint, margin: "8px 0 26px" }}>Founder &amp; CEO</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {FOUNDER_CREDS.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: BF.accent, flex: "0 0 auto" }} />
                    <span style={{ fontFamily: SANS, fontSize: 14.5, color: BF.muted, lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...rise(0.12)} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {FOUNDER_PARAS.map((p, i) => (
                <p key={i} style={para}>{p}</p>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* EARLY-STAGE HONESTY */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Where we are</Eyebrow>
            <H>
              We are early, and that is <Accent>the offer.</Accent>
            </H>
          </motion.div>
          <motion.div {...rise(0.08)} style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 28 }}>
            {EARLY_PARAS.map((p, i) => (
              <p key={i} style={para}>{p}</p>
            ))}
          </motion.div>
          <motion.div {...rise(0.14)}>
            <TextLink href="/demo">Become a founding firm</TextLink>
          </motion.div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section bg={BG.ctaBand}>
        <Container narrow center>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See Delta work one of your real cases.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Bring one real file to a fifteen-minute demo. Watch Delta do the job inside your own tools, then decide if it belongs on the team.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="about_final" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        @media (max-width: 880px) {
          .cd-two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cd-belief-grid { grid-template-columns: 1fr !important; }
          .cd-founder-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}
