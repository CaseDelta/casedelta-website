"use client";

/**
 * Features page. Migrated to the marketing kit (components/marketing/kit.tsx) so it
 * reads as one system with the homepage and pricing page.
 *
 * Benefit-led: each group leads with the outcome, then answers the objection under
 * it. Honest positioning (POSITIONING.md): Delta is a teammate, not a tool; leverage,
 * not layoff; a human on the team approves before anything goes out (Delta drafts,
 * preps, and tracks). Never claim "no third-party LLM" or "data never leaves our
 * infrastructure." Delta is gender-neutral. No em dashes.
 */
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, Check, PageHero,
} from "@/components/marketing/kit";

/* ---- content ---- */

/* Group 1: connects to the stack the firm already runs on. */
const STACK = [
  "Your case manager: Clio, Filevine, MyCase, and the systems your firm already runs on",
  "Email and calendar: reads the thread, drafts the reply, and tracks the deadline",
  "Drive and document storage: pulls the records and exhibits already on file",
  "Billing: keeps time entries and matter status current across systems",
  "No migration and no rip-out: Delta logs in the way a new hire would",
];

/* Group 2: the routine job, done end to end. */
const WORK = [
  { t: "Requests records and chases them.", d: "Sends the request, tracks what is still outstanding, and follows up until it arrives." },
  { t: "Drafts the routine writing.", d: "Demand letters, client and status letters, and intake follow-ups, ready for your review before anything sends." },
  { t: "Keeps the file current everywhere.", d: "Updates the matter across your case manager, calendar, and billing, so nothing lives in one person's head." },
  { t: "Watches what is slipping.", d: "Tracks deadlines and open items across every active file, and flags who owes a response before it becomes a problem." },
];

/* Groups 3 + 4: grounded in the real matter. */
const GROUNDED = [
  { t: "Reads the whole file, not just what you paste.", d: "Because Delta is connected and always current, it works from your email, calendar, documents, and notes together, not the one paragraph you drop into a chat window." },
  { t: "Cites its sources.", d: "Every answer points back to the source page it came from. Delta reasons from your real matter, so it works from the record instead of inventing facts." },
];

/* Group 5: the document-heavy work. */
const DOCS = [
  { t: "Chronologies across thousands of records.", d: "Delta builds the timeline from the full document set and cites each entry back to its source page." },
  { t: "Damages and records math.", d: "Totals the billing across providers and organizes the treatment record so the numbers trace to the page." },
  { t: "Deposition and records summaries.", d: "Turns long transcripts and record sets into a readable summary you can check against the source." },
  { t: "Records review at scale.", d: "Reads the full production, surfaces gaps and outliers, and works across any document-heavy litigation, not just one practice area." },
];

/* Group 7: the one proactive feature. */
const BRIEFING = [
  "What changed overnight across your matters",
  "What is due this week, before it slips",
  "Who owes a response: opposing counsel, adjusters, and clients",
  "The drafts already prepared and waiting for your review",
];

/* ---- local card, in the HomeSections card style ---- */
function FeatureCard({ t, d, delay }: { t: string; d: string; delay: number }) {
  const rise = useRise();
  return (
    <motion.article
      {...rise(delay)}
      style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "28px 26px 30px" }}
    >
      <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 16 }}>
        <Check />
      </span>
      <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, lineHeight: 1.16, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>{t}</h3>
      <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: BF.muted, marginTop: 10 }}>{d}</p>
    </motion.article>
  );
}

export default function FeaturesClient() {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Features"
        title={<>Your firm&apos;s routine work, <Accent>handled inside the tools you already use.</Accent></>}
        sub="Delta is an AI paralegal that does the routine case work end to end, with citations and your approval, across your case manager, email, drive, and billing. Not one more tab to open."
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* GROUP 1: WORKS INSIDE YOUR STACK */}
      <Section bg={BG.offWhite}>
        <Container>
          <div className="cd-feat-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <motion.div {...rise(0)}>
              <Eyebrow>Works inside your stack</Eyebrow>
              <H>It works where your firm <Accent>already works.</Accent></H>
              <Sub>Delta connects to the case manager, email, calendar, drive, and billing your firm already runs on. There is no migration, no rip-out, and nothing new for your team to learn.</Sub>
              <div style={{ marginTop: 32 }}>
                <PillLink href="/demo" location="features_stack">See it on your stack</PillLink>
              </div>
            </motion.div>
            <motion.ul {...rise(0.08)} style={{ listStyle: "none", margin: 0, background: BG.white, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "10px 28px" }}>
              {STACK.map((item, i, arr) => (
                <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "20px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BF.hairline}` : "none" }}>
                  <Check />
                  <span style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, color: BF.ink, lineHeight: 1.5, letterSpacing: "-0.2px" }}>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </Section>

      {/* GROUP 2: DOES THE ROUTINE WORK END TO END */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Does the routine work end to end</Eyebrow>
            <H>The job, start to finish, not just the answer.</H>
            <Sub>The repetitive work that eats your team&apos;s hours, handled from request to filed. You review and approve before anything goes out: Delta drafts, preps, and tracks, and the decision stays with your team.</Sub>
          </motion.div>
          <div className="cd-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 48 }}>
            {WORK.map((task, i) => (
              <FeatureCard key={task.t} t={task.t} d={task.d} delay={0.05 * i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* GROUPS 3 + 4: GROUNDED IN THE REAL MATTER */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Grounded in your real matter</Eyebrow>
            <H>It reads the whole file, and <Accent>shows its work.</Accent></H>
            <Sub>A chatbot in a tab only knows what you paste. Delta is connected to your matter and points every answer back to the source, so you can trust it and check it.</Sub>
          </motion.div>
          <div className="cd-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 48 }}>
            {GROUNDED.map((item, i) => (
              <FeatureCard key={item.t} t={item.t} d={item.d} delay={0.06 * i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* GROUP 5: THE DOCUMENT-HEAVY WORK */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Handles the document-heavy work</Eyebrow>
            <H>Thousands of pages, read and organized.</H>
            <Sub>The record review that takes a week of a paralegal&apos;s time, done in a working session and traced to source. It applies to any document-heavy litigation, not just one practice area.</Sub>
          </motion.div>
          <div className="cd-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 48 }}>
            {DOCS.map((item, i) => (
              <FeatureCard key={item.t} t={item.t} d={item.d} delay={0.05 * i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* GROUP 6: LEARNS YOUR FIRM */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Learns your firm</Eyebrow>
            <H>The longer it works your cases, <Accent>the less you have to explain.</Accent></H>
            <Sub>Over about a month, Delta picks up your firm&apos;s playbook and preferences: how you draft, what you flag, and the way you run a matter. That learned memory compounds, so you delegate instead of instruct.</Sub>
          </motion.div>
        </Container>
      </Section>

      {/* GROUP 7: THE MORNING BRIEFING */}
      <Section bg={BG.white}>
        <Container>
          <div className="cd-feat-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <motion.div {...rise(0)}>
              <Eyebrow>The morning briefing</Eyebrow>
              <H>Walk in to what changed <Accent>overnight.</Accent></H>
              <Sub>Once a day, Delta pulls together what moved on every active matter and has the drafts ready before you sit down. It is the one thing Delta does without being asked, by design.</Sub>
            </motion.div>
            <motion.ul {...rise(0.08)} style={{ listStyle: "none", margin: 0, background: BG.offWhite, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "10px 28px" }}>
              {BRIEFING.map((item, i, arr) => (
                <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "20px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BF.hairline}` : "none" }}>
                  <Check />
                  <span style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, color: BF.ink, lineHeight: 1.5, letterSpacing: "-0.2px" }}>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section bg={BG.ctaBand}>
        <Container narrow>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See it work on one of your real cases.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Bring one real file to a fifteen-minute demo and watch Delta do the work inside your own tools, with citations and your sign-off.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="features_final" onDark>Book a demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        @media (max-width: 880px) {
          .cd-feat-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cd-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
