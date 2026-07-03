"use client";

/**
 * Security and trust page. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * This page carries a top-three buyer objection, so honesty is load-bearing.
 * Honest claims only (POSITIONING.md): never "no third-party LLM", never "no OpenAI",
 * never "data never leaves our infrastructure", never "bar-compliant by design". Prod
 * runs on enterprise OpenAI under zero-retention, no-training agreements, which is how
 * Clio and MyCase describe their own AI. The honest story is: enterprise agreements,
 * encryption, zero retention, never trained, per-firm isolation, a BAA for PII/PHI,
 * and a human on the team who approves before anything leaves the firm. No fabricated
 * certifications. Delta is gender-neutral (never she/her). No em dashes anywhere.
 */
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, Check, PageHero, FaqAccordion,
} from "@/components/marketing/kit";

/* How client data is handled: the concrete guarantees, in plain language. */
const DATA_HANDLING = [
  "Enterprise agreements with the model provider govern every request",
  "Encrypted in transit and at rest",
  "Zero data retention: the provider keeps nothing once a request completes",
  "Never used to train any model, yours or anyone else's",
  "Your firm's data is isolated to your firm, walled off from every other firm",
];

/* Human in the loop: Delta prepares, a person approves, autonomy is earned. */
const HUMAN_STEPS = [
  {
    n: "01",
    t: "Delta drafts and prepares.",
    d: "It gathers the records, builds the chronology, and drafts the letter, then stops at the edge of your firm.",
  },
  {
    n: "02",
    t: "A person on your team approves.",
    d: "Nothing leaves the firm until someone reads it and signs off. The final send is always a human decision.",
  },
  {
    n: "03",
    t: "It earns autonomy task by task.",
    d: "As it proves reliable on a kind of work, you can let it run further on that work. Trust is granted, never assumed.",
  },
];

/* Accuracy and grounding: answers come from the file and cite the source. */
const GROUNDING = [
  "Every answer is grounded in your real matter, not a general guess",
  "It cites the source, so you can open the document behind any claim",
  "It works from the facts in your file, it does not invent them",
  "You can verify every answer against the record it came from",
];

/* Compliance: the specifics a firm's risk-conscious partner will ask about. */
const COMPLIANCE = [
  {
    t: "A BAA is available.",
    d: "For firms handling protected health information, a Business Associate Agreement is available covering PII and PHI.",
  },
  {
    t: "Built around Rule 1.6.",
    d: "Encryption, per-firm isolation, no training on your data, and a full audit trail support your reasonable-efforts obligation to protect client information under ABA Rule 1.6.",
  },
  {
    t: "A complete audit trail.",
    d: "Every action Delta takes is logged: timestamp, document accessed, query made, answer generated, and sources cited. The trail is exportable for bar review.",
  },
];

/* Security FAQ: honest answers to the questions a firm actually asks. */
const FAQ = [
  {
    q: "Does CaseDelta use third-party AI models like OpenAI?",
    a: "Yes, and we are direct about it, the same way Clio and MyCase are. Delta runs on enterprise AI models used under strict agreements: your data is never used to train any model, never retained by the provider once a request completes, and never sold or shared. Every matter is isolated to your firm, with a full, exportable audit trail.",
  },
  {
    q: "How does this support ABA Rule 1.6?",
    a: "Rule 1.6 requires lawyers to make reasonable efforts to prevent unauthorized disclosure of client information. That is exactly what this is built for: encryption in transit and at rest, per-firm data isolation, enterprise agreements with no retention and no training, a human who approves before anything leaves the firm, and a complete audit trail of every action.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your data is yours. You can export everything before canceling, and after cancellation your data is permanently deleted from CaseDelta's systems within 30 days.",
  },
  {
    q: "Who can see my firm's data?",
    a: "Only authorized users at your firm. Every firm's data is isolated from every other firm, and no CaseDelta employee accesses your case data without explicit authorization. The enterprise AI Delta uses never retains your data and never trains on it.",
  },
];

export default function SecurityClient() {
  const rise = useRise();

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Security and trust"
        title={<>The security a law firm <Accent>is held to.</Accent></>}
        sub="Client data is handled to the standard the bar and HIPAA demand: enterprise agreements, encryption, per-firm isolation, and a human who approves before anything leaves the firm."
        ctaHref="/demo"
        ctaLabel="Book a demo"
      />

      {/* HOW CLIENT DATA IS HANDLED */}
      <Section bg={BG.offWhite}>
        <Container>
          <div className="cd-sec-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <motion.div {...rise(0)}>
              <Eyebrow>How client data is handled</Eyebrow>
              <H>
                Your matters, held <Accent>to a privileged standard.</Accent>
              </H>
              <Sub>Client files are the most sensitive data a firm holds. They are handled that way: under enterprise agreements, encrypted end to end, and isolated so your work never mixes with another firm&apos;s.</Sub>
              <div style={{ marginTop: 32 }}>
                <PillLink href="/demo" location="security_data">See how it works</PillLink>
              </div>
            </motion.div>
            <motion.ul {...rise(0.08)} style={{ listStyle: "none", margin: 0, background: BG.white, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "10px 28px" }}>
              {DATA_HANDLING.map((item, i, arr) => (
                <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "20px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BF.hairline}` : "none" }}>
                  <Check />
                  <span style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, color: BF.ink, lineHeight: 1.5, letterSpacing: "-0.2px" }}>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </Section>

      {/* HUMAN IN THE LOOP */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>A human in the loop</Eyebrow>
            <H>
              Delta prepares the work. <Accent>Your team approves it.</Accent>
            </H>
            <Sub>Delta does the drafting and the legwork, but it does not act on the firm&apos;s behalf without a person. A human reviews and approves before anything leaves the firm, and autonomy is earned one task at a time.</Sub>
          </motion.div>
          <div className="cd-step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
            {HUMAN_STEPS.map((step, i) => (
              <motion.div key={step.n} {...rise(0.06 * i)} style={{ paddingTop: 26, borderTop: `2px solid ${BF.accent}` }}>
                <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: BF.accent, letterSpacing: "-1px", lineHeight: 1 }}>{step.n}</div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 23, lineHeight: 1.15, letterSpacing: "-0.4px", color: BF.ink, margin: "18px 0 0" }}>{step.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: BF.muted, marginTop: 12 }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ACCURACY / GROUNDING (dark band, as punctuation) */}
      <Section bg={BG.statBand}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <Eyebrow light>Grounded in your file</Eyebrow>
            <H light>Answers you can trace back to the record.</H>
            <Sub light>Delta works from the facts in your matter, not from a general impression of what a case like yours usually says. Every answer cites the document it came from, so you can check the source yourself.</Sub>
          </motion.div>
          <div className="cd-ground-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px 40px", marginTop: 52 }}>
            {GROUNDING.map((item, i) => (
              <motion.div key={item} {...rise(0.05 * i)} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "6px 0" }}>
                <Check color="#6aa6ff" />
                <span style={{ fontFamily: SANS, fontSize: 16.5, fontWeight: 500, lineHeight: 1.5, letterSpacing: "-0.2px", color: "rgba(255,255,255,0.86)" }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* COMPLIANCE */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Compliance</Eyebrow>
            <H>The paperwork your risk-conscious partner will ask for.</H>
            <Sub>The specifics that matter when a firm signs off on a new tool: a BAA when you handle health information, the controls your ethical duties require, and a record of everything that happened.</Sub>
          </motion.div>
          <div className="cd-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 48 }}>
            {COMPLIANCE.map((item, i) => (
              <motion.article key={item.t} {...rise(0.05 * i)} style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "28px 26px 30px" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 16 }}>
                  <Check />
                </span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, lineHeight: 1.16, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>{item.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: BF.muted, marginTop: 10 }}>{item.d}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg={BG.white}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Questions</Eyebrow>
            <H>Security questions</H>
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
              See exactly how your data is handled.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Bring the questions your risk-conscious partner would ask. We will walk through the controls, the agreements, and the audit trail in a fifteen-minute demo.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="security_final" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        @media (max-width: 880px) {
          .cd-sec-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cd-step-grid { grid-template-columns: 1fr !important; }
          .cd-ground-grid { grid-template-columns: 1fr !important; }
          .cd-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
