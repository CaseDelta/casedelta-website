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
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";
import { HOME_FAQ } from "@/lib/home-content";
import {
  BF, BG, SERIF, SANS, MAXW, PAGE_PAD,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, PillLink, TextLink, Check,
} from "@/components/marketing/kit";

/* ---- product-demo video: a faux product-UI poster (real video drops into the stage) ---- */
const POSTER_ROWS = [
  { s: "done", t: "Requested records from Mercy General" },
  { s: "run", t: "Drafting the demand letter" },
  { s: "done", t: "Updated the matter in Clio + billing" },
  { s: "todo", t: "Flagged: response deadline in 4 days" },
];

function VideoPlaceholder() {
  return (
    <a
      href="/demo"
      onClick={() => trackEvent("cta_click", { location: "demo_video" })}
      className="cd-video"
      style={{ display: "block", maxWidth: 1000, margin: "52px auto 0", borderRadius: 18, overflow: "hidden", border: `1px solid ${BF.hairlineStrong}`, background: "#0e1420", boxShadow: "0 60px 110px -45px rgba(20,23,31,0.5), 0 0 0 1px rgba(47,111,224,0.05)", textDecoration: "none" }}
    >
      {/* browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 42, padding: "0 16px", background: "linear-gradient(#171c27, #11151e)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2c2f3a" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2c2f3a" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2c2f3a" }} />
        <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6aa6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          app.casedelta.com / Ortega v. Memorial
        </span>
      </div>

      {/* stage: faux product UI poster + dimmed overlay + play */}
      <div className="cd-video-stage" style={{ position: "relative", aspectRatio: "16 / 9", background: "#0c1119", overflow: "hidden" }}>
        <div className="cd-poster" style={{ position: "absolute", inset: 0, display: "flex" }}>
          {/* sidebar */}
          <div style={{ width: "23%", minWidth: 150, background: "#10151f", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "18px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, background: "linear-gradient(150deg,#3a78e0,#1f3a5f)", display: "grid", placeItems: "center", fontFamily: SERIF, color: "#fff", fontSize: 14, lineHeight: 1 }}>D</span>
              <span style={{ fontFamily: SERIF, color: "rgba(255,255,255,0.86)", fontSize: 15 }}>Delta</span>
            </div>
            {["Cases", "Inbox", "Tasks", "Documents", "Billing"].map((n, i) => (
              <span key={n} style={{ fontFamily: SANS, fontSize: 12.5, color: i === 0 ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.38)", padding: "3px 0" }}>{n}</span>
            ))}
          </div>
          {/* main */}
          <div style={{ flex: 1, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontFamily: SERIF, color: "#fff", fontSize: 17, letterSpacing: "-0.3px" }}>Ortega v. Memorial</span>
              <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: "#6aa6ff", background: "rgba(58,120,224,0.16)", border: "1px solid rgba(106,166,255,0.25)", borderRadius: 6, padding: "4px 8px" }}>Delta working</span>
            </div>
            {POSTER_ROWS.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 9, marginBottom: 7, background: r.s === "todo" ? "rgba(58,120,224,0.12)" : "rgba(255,255,255,0.02)", border: r.s === "todo" ? "1px solid rgba(106,166,255,0.22)" : "1px solid transparent" }}>
                <span style={{ width: 17, height: 17, borderRadius: 5, flex: "0 0 auto", display: "grid", placeItems: "center", background: r.s === "done" ? "#3a78e0" : "transparent", border: r.s === "done" ? "none" : r.s === "run" ? "2px solid #6aa6ff" : "1.5px solid rgba(255,255,255,0.25)" }}>
                  {r.s === "done" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
                </span>
                <span style={{ fontFamily: SANS, fontSize: 13, color: r.s === "todo" ? "#fff" : "rgba(255,255,255,0.7)" }}>{r.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* dim overlay + play */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 70% at 50% 45%, rgba(8,12,20,0.35) 0%, rgba(8,12,20,0.72) 100%)", display: "grid", placeItems: "center" }}>
          <span className="cd-play" style={{ width: 76, height: 76, borderRadius: "50%", background: "#ffffff", display: "grid", placeItems: "center", boxShadow: "0 18px 44px -10px rgba(0,0,0,0.55)", transition: "transform 0.2s ease" }}>
            <svg width="27" height="27" viewBox="0 0 24 24" fill="#1f3a5f"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
        </div>
        <span style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontSize: 13, fontWeight: 500, letterSpacing: "0.2px", color: "rgba(255,255,255,0.72)" }}>
          Watch Delta work a real case · 2 min
        </span>
      </div>
    </a>
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
  { n: "$349", l: "Per user, per month. Flat, published, no tiers or add-ons." },
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
  context: "Asked how many hours a week Delta saves her firm",
  quote:
    "Maybe five hours a week. And I think it will be more once I stop double-checking it so much.",
  initials: "HN",
  name: "Heidi Nowotny",
  title: "Attorney, Kirschbaum & Nowotny, LLC",
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
      {/* WHAT IT IS: the comprehension moment, first thing below the hero */}
      <Section bg={BG.white} id="what">
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>What CaseDelta is</Eyebrow>
            <H>
              An AI paralegal that works <Accent>inside the tools you already use.</Accent>
            </H>
            <Sub>
              You delegate to it in plain English, the way you would a new hire: request the records, draft the demand, update the file, keep the case moving. It does the work inside your case manager, your email, and your billing, and your team reviews and approves before anything goes out.
            </Sub>
          </motion.div>
        </Container>
        <Container>
          <motion.div {...rise(0.08)}>
            <VideoPlaceholder />
          </motion.div>
        </Container>
      </Section>

      {/* HOW IT WORKS: the 3-step mechanic (belief) */}
      <Section bg={BG.offWhite} id="how">
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>How it works</Eyebrow>
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
            <Eyebrow>What it does</Eyebrow>
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
            <Eyebrow>Why it is different</Eyebrow>
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
        <Container narrow>
          <motion.figure {...rise(0)} style={{ margin: "0 auto", textAlign: "center", maxWidth: 880 }}>
            <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: BF.accent, marginBottom: 8 }}>
              {TESTIMONIAL.context}
            </div>
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
            <Eyebrow light>The math</Eyebrow>
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
            <Eyebrow>Trust and security</Eyebrow>
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
            <Eyebrow>Works with your stack</Eyebrow>
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
            <Eyebrow>Questions</Eyebrow>
            <H>Frequently asked questions</H>
          </motion.div>
          <div style={{ marginTop: 40 }}>
            {HOME_FAQ.map((item, i) => (
              <motion.div key={i} {...rise(0.03 * i)} style={{ padding: "24px 0", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
                <h3 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, letterSpacing: "-0.3px", color: BF.ink, margin: 0 }}>{item.q}</h3>
                <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: BF.muted, marginTop: 10 }}>{item.a}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA (deep-blue band) */}
      <Section bg={BG.ctaBand}>
        <Container narrow>
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
        @media (max-width: 880px) {
          .cd-step-grid { grid-template-columns: 1fr !important; }
          .cd-task-grid { grid-template-columns: 1fr !important; }
          .cd-two { grid-template-columns: 1fr !important; }
          .cd-sec-grid { grid-template-columns: 1fr !important; }
          .cd-stat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px 0 !important; }
          .cd-stat-grid > div:nth-child(odd) { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 600px) {
          .cd-poster { display: none !important; }
        }
        @media (max-width: 520px) {
          .cd-stat-grid { grid-template-columns: 1fr !important; }
          .cd-stat-grid > div { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </>
  );
}
