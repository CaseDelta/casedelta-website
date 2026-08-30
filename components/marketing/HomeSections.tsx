"use client";

/**
 * Below-the-fold homepage. FIXED LIGHT design, identical under every hero variant.
 *
 * The hero (above the fold) states the promise: "Run more cases without hiring."
 * Everything below answers the questions a first-time visitor asks next, in order:
 * what is it -> how does it work -> what does it do -> why is it different ->
 * does it work (proof) -> is it worth it (price anchor) -> is it safe -> will it
 * fit my stack -> the objections (FAQ) -> the ask.
 *
 * Design system lives in components/marketing/kit.tsx (Newsreader serif + Hanken
 * grotesk, one blue accent, two dark bands). Honest claims only (POSITIONING.md):
 * teammate not tool, anchor to a salary, leverage not layoff, never "no third-party
 * LLM / data never leaves our infrastructure." Delta is gender-neutral. No em dashes.
 */
import { Fragment } from "react";
import { motion } from "framer-motion";
import { HOME_FAQ } from "@/lib/home-content";
import {
  BF, BG, SERIF, SANS, MAXW, PAGE_PAD,
  useRise, Container, Section, H, Sub, Accent, PillLink, TextLink, Check, FaqAccordion,
} from "@/components/marketing/kit";

/* ---- how Delta works: the product shape as a three-node flow ----
   Replaces the old product-demo video. The whole differentiator is WHERE Delta
   sits: between the person delegating and the systems the firm already runs on.
   A video buried that lede behind a play button; three big icons state it at a
   glance. Left to right: you ask -> Delta works -> the work lands in your tools,
   with the approval gate called out because it is the #1 buyer objection. */

const FLOW_NODES = [
  {
    k: "you",
    label: "You delegate",
    body: "Tell Delta what you would tell a new paralegal, in plain English.",
  },
  {
    k: "delta",
    label: "Delta does the work",
    body: "Reads the file, drafts the letter, chases the records, takes the next action.",
  },
  {
    // The payoff node carries the dream outcome from the hero ("Run more cases
    // without hiring"), not a description of the plumbing. Landing the work in the
    // firm's own systems is the MECHANISM, so it belongs in the body, not the label.
    k: "systems",
    label: "You run more cases",
    body: "It lands in the tools you already pay for. Same team, more files moving.",
  },
] as const;

/* The four logos shown inside the "your systems" node. A concrete, honest subset
   of the full wall further down the page. */
const FLOW_LOGOS = [
  { src: "/assets/integrations/clio-icon.png", name: "Clio" },
  { src: "/assets/integrations/gmail.svg", name: "Gmail" },
  { src: "/assets/integrations/google-drive.svg", name: "Google Drive" },
  { src: "/assets/integrations/quickbooks-icon.svg", name: "QuickBooks" },
];

const TILE = 132;

function NodeIcon({ k }: { k: (typeof FLOW_NODES)[number]["k"] }) {
  if (k === "you") {
    return (
      <svg width="62" height="62" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M8.5 10.5h7M8.5 14h4.5" />
      </svg>
    );
  }
  if (k === "delta") {
    // Delta is personified on purpose: the positioning is "the teammate you cannot
    // hire", so this node reads as a person, not a product mark or an abstract glyph.
    return (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="8.2" r="3.6" />
        <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
      </svg>
    );
  }
  // The systems node shows the real tools rather than an abstract glyph: it is the
  // one node where concreteness beats iconography.
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 18px", placeItems: "center" }} aria-hidden>
      {FLOW_LOGOS.map((l) => (
        <img key={l.name} src={l.src} alt="" title={l.name} style={{ width: 30, height: 30, objectFit: "contain" }} />
      ))}
    </div>
  );
}

/* Connector: a rail with an accent pulse travelling along it into an arrowhead, so
   the graphic reads as a directed flow rather than three unrelated cards. Fixed
   width so the nodes (not the gaps) get the space. The rail runs horizontally on
   desktop and rotates vertical when the nodes stack; the pulse is CSS (not framer)
   so the media query can flip its axis, and it is dropped under reduced-motion. */
function Connector() {
  return (
    <div className="cd-flow-conn" aria-hidden style={{ marginTop: TILE / 2 - 7 }}>
      <span className="cd-flow-rail">
        <span className="cd-flow-pulse" />
      </span>
      <svg className="cd-flow-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BF.faint} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </div>
  );
}

function SystemFlow() {
  const rise = useRise();
  return (
    <motion.div
      {...rise(0.08)}
      style={{
        maxWidth: 1000, margin: "56px auto 0", padding: "clamp(40px, 5vw, 68px) clamp(24px, 3.5vw, 52px)",
        background: BG.offWhite, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 20,
      }}
    >
      <div className="cd-flow" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 0 }}>
        {FLOW_NODES.map((node, i) => {
          const isDelta = node.k === "delta";
          return (
            <Fragment key={node.k}>
              {i > 0 && <Connector />}
              <div className="cd-flow-node" style={{ flex: "1 1 0", minWidth: 0, textAlign: "center" }}>
                {/* big icon tile: Delta is the filled, elevated one because it is the subject */}
                <div
                  style={{
                    width: TILE, height: TILE, margin: "0 auto", borderRadius: 26, display: "grid", placeItems: "center",
                    background: isDelta ? "linear-gradient(155deg, #3a7ce8, #1f3a5f)" : BF.card,
                    border: `1px solid ${isDelta ? "transparent" : BF.hairlineStrong}`,
                    boxShadow: isDelta
                      ? "0 26px 54px -20px rgba(47,111,224,0.5)"
                      : "0 14px 34px -24px rgba(20,23,31,0.45)",
                  }}
                >
                  <NodeIcon k={node.k} />
                </div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 23, lineHeight: 1.15, letterSpacing: "-0.4px", color: BF.ink, margin: "26px 0 0" }}>
                  {node.label}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: BF.muted, margin: "10px auto 0", maxWidth: 252 }}>
                  {node.body}
                </p>
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* the approval gate: the objection this graphic has to answer up front */}
      <div
        className="cd-approve"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          margin: "clamp(36px, 4vw, 52px) auto 0", padding: "13px 24px", maxWidth: "fit-content",
          background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, borderRadius: 48,
        }}
      >
        <Check />
        <span style={{ fontFamily: SANS, fontSize: 15.5, fontWeight: 500, letterSpacing: "-0.2px", color: BF.ink }}>
          Your team reviews and approves before anything leaves the firm.
        </span>
      </div>
    </motion.div>
  );
}

/* ---- content ---- */
const STEPS = [
  { n: "01", t: "Connect the tools you already use.", d: "Your case manager, email, calendar, drive, and billing. No migration, no rip-out, and nothing new for your team to learn." },
  { n: "02", t: "Hand it work in plain English.", d: "Tell Delta what you would tell a new paralegal. Request these records. Draft the demand. Update the file. Chase the client." },
  { n: "03", t: "Review, approve, and it learns.", d: "You approve before anything goes out. Over about a month it learns your firm's playbook, so you delegate instead of instruct." },
];

const TASKS = [
  { t: "Requests records and chases them.", d: "Sends the request, tracks what is still outstanding, and follows up until it arrives." },
  { t: "Drafts the routine writing.", d: "Demand letters, status updates, intake follow-ups. Your team approves before anything sends." },
  { t: "Keeps the file current everywhere.", d: "Updates the matter across your case manager, CRM, and billing, so nothing lives in one person's head." },
  { t: "Watches what is slipping.", d: "Tracks deadlines and open items across every active file, and flags who owes a response before it becomes a problem." },
];

const STATS = [
  { n: "$4–5k", l: "What one paralegal costs a month, if you can find and keep one." },
  { n: "0", l: "Migrations, rip-outs, or new logins. It runs on your stack." },
  { n: "$599", l: "A month for the firm, up to 5 accounts. Flat, published, no add-ons." },
  { n: "24/7", l: "It works your files and never takes a day off." },
];

const SECURITY = [
  "Encrypted in transit and at rest",
  "Zero data retention by the model provider",
  "Never used to train any model",
  "BAA available for PII and PHI",
  "A human on your team approves every action",
  "Your firm's data, isolated to your firm",
];

/* Real, attributable testimonial (Heidi Nowotny, provided with permission). Never
   replace with a fabricated or composite quote: an invented endorsement is an FTC
   and honesty risk. */
const TESTIMONIAL = {
  quote:
    "Delta gives us back five hours a week per person, and we can handle more cases.",
  initials: "KN",
  name: "Kirschbaum & Nowotny, LLC",
  title: "Overland Park, KS",
};

const COMPARE = {
  tool: ["Opens in one more browser tab", "You re-key its output into your real systems", "Answers a question, then stops", "Forgets your case the moment you close it"],
  delta: ["Works inside the tools you already use", "Does the whole routine job, end to end", "Takes the next action, not just the answer", "Learns your firm and compounds over time"],
};

const INTEGRATIONS = [
  { src: "/assets/integrations/clio.svg", name: "Clio", h: 26 },
  { src: "/assets/integrations/filevine.svg", name: "Filevine", h: 24 },
  { src: "/assets/integrations/litify.svg", name: "Litify", h: 26 },
  { src: "/assets/integrations/mycase.webp", name: "MyCase", h: 24 },
  { src: "/assets/integrations/casepeer-icon.png", name: "CasePeer", h: 26 },
  { src: "/assets/integrations/neos-icon.svg", name: "Neos", h: 28 },
  { src: "/assets/integrations/microsoft.svg", name: "Microsoft 365", h: 26 },
  { src: "/assets/integrations/outlook.svg", name: "Outlook", h: 28 },
  { src: "/assets/integrations/google-drive.svg", name: "Google Drive", h: 30 },
  { src: "/assets/integrations/gmail.svg", name: "Gmail", h: 26 },
  { src: "/assets/integrations/dropbox.svg", name: "Dropbox", h: 28 },
  { src: "/assets/integrations/quickbooks.svg", name: "QuickBooks", h: 26 },
];

export function HomeSections() {
  const rise = useRise();

  return (
    <>
      {/* PRIMER: the problem, stated before the answer. First beat below the hero.
          Sits on off-white so the answer section that follows lands on bright white.

          Enumerating the systems is CORRECT here and wrong in the section below. Here
          the list IS the pain (the buyer's own words: "not having to go and log in to
          20 different platforms", "toggling between these different myriad of
          spreadsheets", GH #3925). Below, the same list would read as a cap on what
          Delta can touch. Same nouns, opposite jobs.

          Copy is POSITIONING.md line 95 ("Every case lives in five places, and
          stitching it together falls on people you can't hire fast enough"), which is
          the approved problem line and ties the sprawl to the hiring pain the hero
          promises to solve. */}
      <Section bg={BG.offWhite} id="problem" tight>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>
              Your case lives in <Accent>five places at once.</Accent>
            </H>
            <Sub>
              Email, your case manager, your drive, your billing, and a note in someone&apos;s head. Stitching it together falls on the people you cannot hire fast enough.
            </Sub>
          </motion.div>
        </Container>
      </Section>

      {/* WHAT IT IS: the comprehension moment, the answer to the primer above */}
      <Section bg={BG.white} id="what">
        <Container narrow>
          <motion.div {...rise(0)}>
            {/* "systems your firm already uses" is deliberately open-ended. Do NOT
                "clarify" it into a list ("your case manager, your email, your billing",
                POSITIONING.md line 27): that enumeration reads as the CAP on what Delta
                can touch, when the point is that it has none. Per #3657, breadth-as-a-
                claim is PARITY (EvenUp/Eve/Supio all claim it), so a longer list wins
                nothing, and an explicit "any platform" boast is a crown-jewel claim we
                have to demo rather than assert. */}
            <H>
              CaseDelta is the AI that <Accent>actually does the work</Accent> in the systems your firm already uses.
            </H>
            {/* Kept short on purpose: the flow graphic below carries the explanation,
                so a long paragraph here just competes with it. */}
            <Sub>
              Hand off work to Delta just like you would a paralegal.
            </Sub>
          </motion.div>
        </Container>
        <Container>
          <motion.div {...rise(0.08)}>
            <SystemFlow />
          </motion.div>
        </Container>
      </Section>

      {/* HOW IT WORKS: the 3-step mechanic (belief) */}
      <Section bg={BG.offWhite} id="how">
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>
              Working your cases <Accent>the same afternoon you say yes.</Accent>
            </H>
            <Sub>No implementation team, no training week, no data import. The only setup is telling Delta which tools your firm runs on.</Sub>
          </motion.div>
          <div className="cd-step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.n} {...rise(0.06 * i)} style={{ paddingTop: 26, borderTop: `2px solid ${BF.accent}` }}>
                <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: BF.accent, letterSpacing: "-1px", lineHeight: 1 }}>{step.n}</div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 23, lineHeight: 1.15, letterSpacing: "-0.4px", color: BF.ink, margin: "18px 0 0" }}>{step.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: BF.muted, marginTop: 12 }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHAT IT DOES: the concrete jobs */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>It does the routine case work, end to end.</H>
            <Sub>The repetitive work that eats your team&apos;s hours, handled start to finish. Your team reviews and approves before anything goes out.</Sub>
          </motion.div>
          <div className="cd-task-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 48 }}>
            {TASKS.map((task, i) => (
              <motion.article key={i} {...rise(0.05 * i)} className="cd-card" style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "28px 26px 30px" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 16 }}>
                  <Check />
                </span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, lineHeight: 1.16, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>{task.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: BF.muted, marginTop: 10 }}>{task.d}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY DIFFERENT: vs a chatbot / one-task tool */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>
              A chatbot gives you an answer. <Accent>CaseDelta does the work.</Accent>
            </H>
            <Sub>Most legal AI is a brain in one more browser tab: it answers what you paste, then forgets it. CaseDelta is connected to your systems, shared across your team, and it takes the next action, not just the reply.</Sub>
          </motion.div>
        </Container>
        <Container>
          <div className="cd-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 52 }}>
            <motion.div {...rise(0)} style={{ background: BG.white, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "32px 30px 34px" }}>
              <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: BF.faint, marginBottom: 20 }}>A chatbot in a tab</div>
              {COMPARE.tool.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 0", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BF.faint} strokeWidth="2.2" strokeLinecap="round" style={{ flex: "0 0 auto", marginTop: 1 }}><path d="M6 6l12 12M18 6L6 18" /></svg>
                  <span style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.45, color: BF.muted }}>{t}</span>
                </div>
              ))}
            </motion.div>
            <motion.div {...rise(0.08)} style={{ background: BF.card, border: `1px solid ${BF.accentBorderHover}`, borderRadius: 16, padding: "32px 30px 34px", boxShadow: "0 32px 64px -36px rgba(47,111,224,0.32)" }}>
              <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: BF.accent, marginBottom: 20 }}>CaseDelta</div>
              {COMPARE.delta.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 0", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
                  <Check />
                  <span style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.45, color: BF.ink, fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* TESTIMONIAL: real, attributable */}
      <Section bg={BG.white}>
        <Container narrow center>
          <motion.figure {...rise(0)} style={{ margin: "0 auto", textAlign: "center", maxWidth: 880 }}>
            <div aria-hidden style={{ fontFamily: SERIF, fontSize: 64, lineHeight: 0.5, color: BF.accent, opacity: 0.28 }}>&ldquo;</div>
            <blockquote style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.26, letterSpacing: "-0.6px", color: BF.ink, margin: "16px auto 0", maxWidth: 880 }}>
              {TESTIMONIAL.quote}
            </blockquote>
            <figcaption style={{ marginTop: 38, display: "inline-flex", alignItems: "center", gap: 13 }}>
              <span style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(150deg,#3a78e0,#1f3a5f)", display: "grid", placeItems: "center", fontFamily: SANS, fontSize: 15, fontWeight: 600, color: "#fff", flex: "0 0 auto" }}>{TESTIMONIAL.initials}</span>
              <span style={{ textAlign: "left" }}>
                <span style={{ display: "block", fontFamily: SANS, fontSize: 15.5, fontWeight: 600, color: BF.ink, letterSpacing: "-0.2px" }}>{TESTIMONIAL.name}</span>
                <span style={{ display: "block", fontFamily: SANS, fontSize: 14, color: BF.muted, marginTop: 2 }}>{TESTIMONIAL.title}</span>
              </span>
            </figcaption>
          </motion.figure>
        </Container>
      </Section>

      {/* IMPACT / STATS + PRICE ANCHOR (dark band) */}
      <Section bg={BG.statBand}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <H light>One teammate. Your whole firm.</H>
            <Sub light>Priced against the help you cannot hire. Every attorney and paralegal gets a teammate, for a fraction of what the next hire costs.</Sub>
          </motion.div>
          <div className="cd-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 60 }}>
            {STATS.map((s, i) => (
              <motion.div key={i} {...rise(0.05 * i)} style={{ padding: "0 30px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(42px, 5vw, 62px)", lineHeight: 1, letterSpacing: "-1.6px", color: "#fff" }}>{s.n}</div>
                <div style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.45, color: "rgba(255,255,255,0.6)", marginTop: 16 }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECURITY / TRUST */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>Built for the sensitivity of legal work.</H>
            <Sub>Your client matters run under enterprise agreements, never used to train a model and never retained by the provider, and a human on your team signs off before anything leaves the firm.</Sub>
          </motion.div>
          <div className="cd-sec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginTop: 48, background: BF.hairline, border: `1px solid ${BF.hairline}`, borderRadius: 14, overflow: "hidden" }}>
            {SECURITY.map((s, i) => (
              <motion.div key={i} {...rise(0.04 * i)} style={{ background: BG.offWhite, padding: "28px 26px", display: "flex", alignItems: "center", gap: 12 }}>
                <Check />
                <span style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, letterSpacing: "-0.2px", color: BF.ink }}>{s}</span>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.1)}>
            <TextLink href="/security">Read about security and trust</TextLink>
          </motion.div>
        </Container>
      </Section>

      {/* INTEGRATIONS: fits your stack */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>No platform to switch. No tool to learn.</H>
            <Sub>Delta logs into the systems your firm already runs on and gets to work. Your data stays where it is, and your team keeps the tools they know.</Sub>
          </motion.div>
          <motion.div {...rise(0.1)} className="cd-logo-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(22px, 3.4vw, 52px)", marginTop: 52 }}>
            {INTEGRATIONS.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className="cd-logo"
                style={{ height: logo.h, width: "auto", opacity: 0.55 }}
              />
            ))}
          </motion.div>
          <motion.p {...rise(0.16)} style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: BF.faint, letterSpacing: "-0.2px", marginTop: 26 }}>
            + any other tool your firm uses. If it has a login, Delta can learn to drive it.
          </motion.p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>Frequently asked questions</H>
          </motion.div>
          <motion.div {...rise(0.06)} style={{ marginTop: 28 }}>
            <FaqAccordion items={HOME_FAQ} />
          </motion.div>
          <motion.div {...rise(0.12)}>
            <TextLink href="/answers">See all questions</TextLink>
          </motion.div>
        </Container>
      </Section>

      {/* FINAL CTA (deep-blue band) */}
      <Section bg={BG.ctaBand}>
        <Container narrow center>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See it work on one of your real cases.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Bring one real file and watch Delta do the job inside your own tools, in fifteen minutes. No migration, nothing to rip out.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="final_cta" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <style>{`
        /* Flow connector: rail + travelling pulse + arrowhead. */
        .cd-flow-conn { display: flex; align-items: center; gap: 3px; flex: 0 0 auto; width: 74px; align-self: flex-start; }
        .cd-flow-rail { position: relative; flex: 1 1 auto; height: 2px; background: ${BF.hairlineStrong}; overflow: hidden; }
        .cd-flow-pulse {
          position: absolute; top: -1px; left: 0; width: 28px; height: 4px; border-radius: 2px;
          background: linear-gradient(90deg, transparent, ${BF.accent});
          animation: cd-flow-x 2s ease-in-out infinite;
        }
        @keyframes cd-flow-x { from { transform: translateX(-28px); } to { transform: translateX(74px); } }
        /* framer's useReducedMotion covers the rise animations; this pulse is CSS, so it opts out here */
        @media (prefers-reduced-motion: reduce) { .cd-flow-pulse { display: none; } }

        /* Flow: horizontal rail on desktop, vertical stack on narrow screens.
           The rail turns vertical and the arrow points down between stacked nodes. */
        @media (max-width: 880px) {
          .cd-flow { flex-direction: column !important; align-items: center !important; }
          .cd-flow-node { max-width: 420px; }
          .cd-flow-conn {
            flex-direction: column; width: auto; height: 52px;
            align-self: center; margin: 26px 0 !important;
          }
          .cd-flow-rail { width: 2px; height: auto; }
          .cd-flow-arrow { transform: rotate(90deg); }
          .cd-flow-pulse {
            top: 0; left: -1px; width: 4px; height: 28px;
            background: linear-gradient(180deg, transparent, ${BF.accent});
            animation-name: cd-flow-y;
          }
          @keyframes cd-flow-y { from { transform: translateY(-28px); } to { transform: translateY(52px); } }
          .cd-approve { border-radius: 16px !important; align-items: flex-start !important; }
          .cd-step-grid { grid-template-columns: 1fr !important; }
          .cd-task-grid { grid-template-columns: 1fr !important; }
          .cd-two { grid-template-columns: 1fr !important; }
          .cd-sec-grid { grid-template-columns: 1fr !important; }
          .cd-stat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px 0 !important; }
          .cd-stat-grid > div:nth-child(odd) { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 520px) {
          .cd-stat-grid { grid-template-columns: 1fr !important; }
          .cd-stat-grid > div { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </>
  );
}
