"use client";

/**
 * Below-the-fold homepage. FIXED LIGHT design, identical under every hero variant.
 *
 * Order (per founder direction): an animated chat demo that immediately shows the range of
 * end-to-end work Delta handles, then one clarification section (what it is / why different),
 * then a testimonial, then the impact band, security, FAQ, and CTA.
 *
 * Look reproduced from the live references (Harvey / Legora / Filevine), whose real computed
 * styles were sampled: warm neutral surfaces, large 400-weight display headings with tight
 * negative tracking, small muted body, soft pastel fades, large-radius product frames.
 *
 * SEO/AEO discipline (website_rebuild_2026/seo_research): copy renders into the static HTML
 * (the example asks + answers are present as real text, not only in the animation); client JS
 * is limited to the chat ticker and the FAQ accordion; the FAQ mirrors the FAQPage schema.
 * Honest claims only (POSITIONING.md). No em dashes; Delta is referred to neutrally.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";
import { HOME_FAQ } from "@/lib/home-content";
import { LOGOS, LOGO_CAP } from "@/lib/variants";

const MAXW = 1320;
const PAGE_PAD = "clamp(24px, 4vw, 48px)";
const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Warm neutral palette (Harvey / Legora / Filevine all use warm bone + warm-black, not
// cool blue-gray). Brand blue + navy stay for accents and CTAs.
const BF = {
  ink: "#1c1a16",
  muted: "#5d574e",
  faint: "#948c7f",
  hairline: "rgba(28, 24, 18, 0.08)",
  hairlineStrong: "rgba(28, 24, 18, 0.12)",
  accent: "#2f6fe0",
  accentSoft: "rgba(47, 111, 224, 0.07)",
  accentBorderHover: "rgba(47, 111, 224, 0.38)",
  card: "#ffffff",
  pillBg: "#1f3a5f",
  pillBgHover: "#284b78",
};

/* Surfaces: white + a warm bone for flat light sections, soft pastel fades for airiness,
   two dark bands (a warm-black impact band + the brand-navy CTA band). */
const BG = {
  white: "#ffffff",
  offWhite: "#f7f4ee",
  softBlue: "linear-gradient(180deg, #fbfaf7 0%, #eef2fb 100%)",
  softCool: "linear-gradient(180deg, #faf7f1 0%, #ffffff 100%)",
  statBand: "#16140f",
  ctaBand: "#1f3a5f",
};

/* ---- motion ---- */
function useRise() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
}

/* ---- layout primitives ---- */
function Container({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `0 ${PAGE_PAD}` }}>
      <div style={{ maxWidth: narrow ? 820 : "100%" }}>{children}</div>
    </div>
  );
}

function Section({ children, bg, id, tight = false }: { children: React.ReactNode; bg: string; id?: string; tight?: boolean }) {
  return (
    <section id={id} style={{ background: bg, padding: tight ? "clamp(40px, 5vw, 64px) 0" : "clamp(92px, 11.5vw, 152px) 0", borderTop: `1px solid ${BF.hairline}` }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.55)" : BF.accent, marginBottom: 18, textAlign: center ? "center" : "left" }}>
      {children}
    </div>
  );
}

function H({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(36px, 5.2vw, 58px)", lineHeight: 1.03, letterSpacing: "-1.8px", color: light ? "#faf8f4" : BF.ink, margin: 0 }}>
      {children}
    </h2>
  );
}

function Sub({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: "clamp(16px, 1.7vw, 18.5px)", lineHeight: 1.55, letterSpacing: "-0.1px", color: light ? "rgba(255,255,255,0.66)" : BF.muted, marginTop: 22, maxWidth: 600 }}>
      {children}
    </p>
  );
}

function PillLink({ href, children, location, onDark = false }: { href: string; children: React.ReactNode; location: string; onDark?: boolean }) {
  const bg = onDark ? "#ffffff" : BF.pillBg;
  const fg = onDark ? "#1f3a5f" : "#ffffff";
  const dot = onDark ? "#1f3a5f" : "#ffffff";
  const arrow = onDark ? "#ffffff" : "#1f3a5f";
  return (
    <a
      href={href}
      onClick={() => trackEvent("cta_click", { location })}
      className={onDark ? "cd-pill-d" : "cd-pill2"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, background: bg, color: fg,
        borderRadius: 48, padding: "12px 12px 12px 26px", fontFamily: SANS, fontSize: 15.5, fontWeight: 600,
        letterSpacing: "-0.2px", lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
      }}
    >
      {children}
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: dot, display: "grid", placeItems: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={arrow} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </span>
    </a>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="cd-tlink" style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: BF.accent, letterSpacing: "-0.2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, marginTop: 24 }}>
      {children}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
    </Link>
  );
}

/* ---- chat demo: Delta handling a range of end-to-end asks, typed and answered in a loop ----
   The asks + answers also render as a static list below the frame, so the content is in the
   crawlable HTML and does not depend on the animation. */
const ASKS = [
  { q: "Request Ortega's missing records and chase them until they're in.", a: "Requested records from 3 providers. Two are still outstanding, I'll follow up Friday.", tags: ["3 requests sent", "Follow-up set"] },
  { q: "Draft the demand letter for Martinez from the file.", a: "Draft is ready for your review. I pulled the damages from the medical records and billing.", tags: ["Demand drafted", "Cited to the file"] },
  { q: "What's slipping across my open cases this week?", a: "Three deadlines in the next seven days. The discovery response on Ortega is the urgent one.", tags: ["3 deadlines", "1 urgent"] },
  { q: "Update the Clio matter and log my time.", a: "Matter updated in Clio, time entry logged, and a note posted to the client portal.", tags: ["Clio updated", "Time logged"] },
  { q: "Summarize the new intake and flag anything off.", a: "Summarized. Statute runs in 18 months, no prior counsel, and I flagged one gap in the timeline.", tags: ["Intake summarized", "1 flag"] },
];

function DeltaMark({ size = 26 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: 8, flex: "0 0 auto", background: "linear-gradient(150deg,#3a78e0,#1f3a5f)", display: "grid", placeItems: "center", fontFamily: SERIF, color: "#fff", fontSize: size * 0.56, lineHeight: 1 }}>D</span>
  );
}

function ChatDemo() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const ask = ASKS[idx];
    if (reduce) { setTyped(ask.q); setAnswered(true); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    setTyped("");
    setAnswered(false);
    let i = 0;
    const step = () => {
      i += 1;
      setTyped(ask.q.slice(0, i));
      if (i < ask.q.length) timers.push(setTimeout(step, 26));
      else {
        timers.push(setTimeout(() => setAnswered(true), 480));
        timers.push(setTimeout(() => setIdx((p) => (p + 1) % ASKS.length), 3800));
      }
    };
    timers.push(setTimeout(step, 360));
    return () => timers.forEach(clearTimeout);
  }, [idx, reduce]);

  const ask = ASKS[idx];
  return (
    <div className="cd-chat" style={{ maxWidth: 880, margin: "56px auto 0", borderRadius: 20, overflow: "hidden", background: "#fff", border: `1px solid ${BF.hairlineStrong}`, boxShadow: "0 60px 110px -50px rgba(28,24,18,0.42), 0 2px 8px rgba(28,24,18,0.04)" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: `1px solid ${BF.hairline}`, background: "#fcfbf9" }}>
        <DeltaMark size={26} />
        <span style={{ fontFamily: SERIF, fontSize: 16, color: BF.ink }}>Delta</span>
        <span style={{ fontFamily: SANS, fontSize: 12.5, color: BF.faint, marginLeft: 2 }}>· Ortega v. Memorial</span>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontFamily: SANS, fontSize: 12, fontWeight: 600, color: "#1f8a55" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1f8a55" }} /> Online
        </span>
      </div>

      {/* thread */}
      <div style={{ padding: "30px 26px", minHeight: 280, display: "flex", flexDirection: "column", gap: 18, background: "#fff" }}>
        {/* user ask (typed) */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ maxWidth: "82%", background: BF.pillBg, color: "#fff", borderRadius: "16px 16px 4px 16px", padding: "13px 17px", fontFamily: SANS, fontSize: 15.5, lineHeight: 1.45, letterSpacing: "-0.2px", minHeight: 22 }}>
            {typed}
            {!answered && <span className="cd-caret" style={{ display: "inline-block", width: 2, height: 17, background: "rgba(255,255,255,0.8)", marginLeft: 2, verticalAlign: "-3px" }} />}
          </div>
        </div>
        {/* delta response */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <DeltaMark size={30} />
          <div style={{ maxWidth: "82%" }}>
            <div style={{ background: "#f5f3ef", borderRadius: "16px 16px 16px 4px", padding: "13px 17px", fontFamily: SANS, fontSize: 15.5, lineHeight: 1.5, letterSpacing: "-0.2px", color: BF.ink, minHeight: 22 }}>
              {answered ? (
                ask.a
              ) : (
                <span className="cd-dots" style={{ display: "inline-flex", gap: 4, padding: "3px 0" }}>
                  <span /><span /><span />
                </span>
              )}
            </div>
            {answered && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {ask.tags.map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: BF.accent, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, borderRadius: 7, padding: "5px 10px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* input bar (decorative) */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderTop: `1px solid ${BF.hairline}`, background: "#fcfbf9" }}>
        <span style={{ flex: 1, fontFamily: SANS, fontSize: 14.5, color: BF.faint }}>Ask Delta to handle something on a case...</span>
        <span style={{ width: 34, height: 34, borderRadius: "50%", background: BF.pillBg, display: "grid", placeItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </div>
  );
}

/* ---- clarification: what it is / why different (one section) ---- */
const CLARIFY = [
  { t: "Runs inside your stack", d: "Delta drives the tools you already pay for, your case manager, email, drive, and billing. Nothing to rip out, nothing to migrate." },
  { t: "Does the whole job", d: "Not one task in another tab. Delta takes routine work from the first request to ready-to-send, across every system the matter touches." },
  { t: "You stay in control", d: "Delta drafts and prepares, your team approves before anything goes out, and it learns your firm's standards as it goes." },
];

/* ---- content ---- */
const STATS = [
  { n: "$4–5k", l: "What one paralegal costs a month, if you can find and keep one." },
  { n: "0", l: "Migrations, rip-outs, or new logins. It runs on your stack." },
  { n: "Unlimited", l: "Users, one flat firm fee. Everyone gets a teammate." },
  { n: "24/7", l: "It works your files and never takes a day off." },
];

const SECURITY = [
  "Encrypted in transit and at rest",
  "Zero data retention",
  "No training on your data",
  "BAA available",
  "Human approval on every action",
  "Your firm's data, isolated",
];

// PLACEHOLDER quote pending Heidi's real words + confirmed title/firm and her sign-off to be
// featured. The 4.9 rating beside it is the real attorney rating. Do not ship to prod until
// the quote and attribution are real.
const TESTIMONIAL = {
  quote:
    "Delta took the records chase and the first drafts off our plate, and it does it inside the tools we already use. It is the closest thing to adding a paralegal without the hire.",
  initials: "HN",
  name: "Heidi Nowotny",
  title: "Personal Injury Attorney",
};

export function HomeSections() {
  const rise = useRise();

  return (
    <>
      {/* CHAT DEMO (first below the fold) */}
      <Section bg={BG.white} id="demo">
        <Container>
          <motion.div {...rise(0)} style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
            <Eyebrow center>What Delta can do</Eyebrow>
            <H>Just ask. Delta does the rest.</H>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Sub>Hand Delta a case in plain English. It requests the records, drafts the writing, updates your tools, and tracks every deadline, end to end.</Sub>
            </div>
          </motion.div>
          <motion.div {...rise(0.08)}>
            <ChatDemo />
          </motion.div>
          {/* static example asks (in the HTML for SEO + range at a glance) */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 30 }}>
            {ASKS.map((x) => (
              <span key={x.q} style={{ fontFamily: SANS, fontSize: 13.5, color: BF.muted, background: BG.offWhite, border: `1px solid ${BF.hairline}`, borderRadius: 40, padding: "8px 16px" }}>
                {x.q}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* CLARIFICATION (one section) */}
      <Section bg={BG.softBlue}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <Eyebrow>What it is</Eyebrow>
            <H>A teammate that runs inside the tools you already use.</H>
            <Sub>CaseDelta is an AI paralegal, not another app to log into. It works where your firm already works, and it works the way a good associate would.</Sub>
          </motion.div>
          <div className="cd-clarify" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
            {CLARIFY.map((c, i) => (
              <motion.div key={c.t} {...rise(0.05 * i)} style={{ background: "#fff", border: `1px solid ${BF.hairline}`, borderRadius: 18, padding: "30px 28px 32px", boxShadow: "0 30px 60px -48px rgba(28,24,18,0.26)" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 18 }}>
                  <span style={{ fontFamily: SERIF, fontSize: 18, color: BF.accent }}>{i + 1}</span>
                </span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 23, letterSpacing: "-0.5px", lineHeight: 1.16, color: BF.ink, margin: 0 }}>{c.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: BF.muted, marginTop: 12 }}>{c.d}</p>
              </motion.div>
            ))}
          </div>
          {/* integration logos: the tools Delta runs inside */}
          <motion.div {...rise(0.12)} style={{ marginTop: 56, textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: BF.faint, marginBottom: 22 }}>{LOGO_CAP}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px 40px", flexWrap: "wrap" }}>
              {LOGOS.map((logo) => (
                <span key={logo.name} style={{ fontFamily: logo.style === "serif" ? SERIF : SANS, fontSize: logo.style === "wide" ? 13.5 : 17, fontWeight: logo.style === "wide" ? 600 : 500, letterSpacing: logo.style === "wide" ? "1.4px" : "-0.2px", textTransform: logo.style === "wide" ? "uppercase" : "none", color: "#a59d8e", whiteSpace: "nowrap" }}>{logo.name}</span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* TESTIMONIAL (Heidi Nowotny) */}
      <Section bg={BG.softCool}>
        <Container>
          <div className="cd-quote" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "stretch" }}>
            {/* left: branded card carrying the real 4.9 rating */}
            <motion.div {...rise(0)} className="cd-quote-card" style={{ borderRadius: 20, padding: "40px 36px", background: "linear-gradient(160deg, #1f3a5f 0%, #16140f 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280, boxShadow: "0 40px 80px -44px rgba(28,24,18,0.55)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#f5b400" aria-hidden><path d="M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.27 6.09 20.36l1.13-6.57L2.45 9.14l6.6-.96L12 2.2z" /></svg>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 52, lineHeight: 1, color: "#fff", letterSpacing: "-1.5px" }}>4.9</div>
                <div style={{ fontFamily: SANS, fontSize: 15, color: "rgba(255,255,255,0.66)", marginTop: 10, maxWidth: 240 }}>Average rating from the attorneys who use it.</div>
              </div>
            </motion.div>
            {/* right: the quote */}
            <motion.figure {...rise(0.08)} style={{ margin: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <blockquote style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.28, letterSpacing: "-0.6px", color: BF.ink, margin: 0 }}>
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(150deg,#3a78e0,#1f3a5f)", display: "grid", placeItems: "center", fontFamily: SANS, fontSize: 16, fontWeight: 600, color: "#fff", flex: "0 0 auto" }}>{TESTIMONIAL.initials}</span>
                <span>
                  <span style={{ display: "block", fontFamily: SANS, fontSize: 16, fontWeight: 600, color: BF.ink, letterSpacing: "-0.2px" }}>{TESTIMONIAL.name}</span>
                  <span style={{ display: "block", fontFamily: SANS, fontSize: 14.5, color: BF.muted, marginTop: 2 }}>{TESTIMONIAL.title}</span>
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </Container>
      </Section>

      {/* IMPACT / STATS (dark band) */}
      <Section bg={BG.statBand}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <Eyebrow light>The math</Eyebrow>
            <H light>One teammate. Your whole firm.</H>
            <Sub light>Priced against the help you can&apos;t hire, not a per-seat app. The math is simple.</Sub>
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
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Built for legal</Eyebrow>
            <H>Built for the sensitivity of legal work.</H>
            <Sub>Your client matters are handled under enterprise terms, and a human on your team signs off before anything leaves the firm.</Sub>
          </motion.div>
          <div className="cd-sec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginTop: 48, background: BF.hairline, border: `1px solid ${BF.hairline}`, borderRadius: 14, overflow: "hidden" }}>
            {SECURITY.map((s, i) => (
              <motion.div key={i} {...rise(0.04 * i)} style={{ background: "#fff", padding: "28px 26px", display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M5 13l4 4L19 7" /></svg>
                <span style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, letterSpacing: "-0.2px", color: BF.ink }}>{s}</span>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.1)}>
            <TextLink href="/security">Read about security and trust</TextLink>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Questions</Eyebrow>
            <H>Frequently asked questions</H>
          </motion.div>
          <motion.div {...rise(0.05)} style={{ marginTop: 40, borderBottom: `1px solid ${BF.hairline}` }}>
            {HOME_FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* FINAL CTA (deep-blue band) */}
      <Section bg={BG.ctaBand}>
        <Container narrow>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See it work on one of your real cases.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 520 }}>
              Bring one real file, and watch Delta do the job inside your own tools in fifteen minutes.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="final_cta" onDark>Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <style>{`
        .cd-pill2:hover { background: ${BF.pillBgHover}; box-shadow: 0 10px 26px rgba(31,58,95,0.22); transform: translateY(-1px); }
        .cd-pill-d:hover { transform: translateY(-1px); box-shadow: 0 12px 30px rgba(0,0,0,0.22); }
        .cd-tlink:hover { gap: 11px; }
        .cd-faq-btn:hover span:first-child { color: ${BF.accent}; }
        .cd-faq-btn:hover span:last-child { border-color: ${BF.accentBorderHover}; }
        .cd-caret { animation: cd-blink 1s step-end infinite; }
        @keyframes cd-blink { 50% { opacity: 0; } }
        .cd-dots span { width: 6px; height: 6px; border-radius: 50%; background: ${BF.faint}; display: inline-block; animation: cd-bounce 1.2s ease-in-out infinite; }
        .cd-dots span:nth-child(2) { animation-delay: 0.15s; }
        .cd-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes cd-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }
        @media (max-width: 880px) {
          .cd-clarify { grid-template-columns: 1fr !important; }
          .cd-quote { grid-template-columns: 1fr !important; gap: 28px !important; }
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

/* Expandable FAQ row. Answer stays in the DOM (collapsed, not display:none) so it remains
   crawlable and in sync with the FAQPage schema. */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${BF.hairline}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cd-faq-btn"
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "26px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}
      >
        <span style={{ fontFamily: SANS, fontSize: "clamp(17px, 1.9vw, 19px)", fontWeight: 600, letterSpacing: "-0.3px", color: BF.ink, lineHeight: 1.3 }}>{q}</span>
        <span style={{ flex: "0 0 auto", width: 30, height: 30, borderRadius: "50%", border: `1px solid ${BF.hairlineStrong}`, display: "grid", placeItems: "center", transition: "transform 0.3s ease, background 0.2s ease", transform: open ? "rotate(45deg)" : "none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={open ? BF.accent : BF.muted} strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? 260 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height 0.42s ease, opacity 0.3s ease" }}>
        <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.62, color: BF.muted, margin: "0 4px 28px", maxWidth: 720 }}>{a}</p>
      </div>
    </div>
  );
}
