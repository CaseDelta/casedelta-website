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

/* ---- chat demo: type a query into a simple input box, then watch Delta complete the task
   list for it. The asks also render as a static list below, so the content is in the
   crawlable HTML and does not depend on the animation. */
const ASKS = [
  { q: "Request Ortega's missing records and chase them until they're in.", tasks: ["Find the outstanding providers", "Send the records requests", "Set follow-up reminders", "Log it all in Clio"] },
  { q: "Draft the demand letter for Martinez from the file.", tasks: ["Read the medical records", "Pull the damages and billing", "Draft the demand letter", "Flag it for your review"] },
  { q: "What's slipping across my open cases this week?", tasks: ["Scan every open matter", "Find deadlines inside seven days", "Flag the urgent discovery response", "Build your priority list"] },
  { q: "Update the Clio matter and log my time.", tasks: ["Update the matter in Clio", "Log the time entry", "Post a note to the client portal"] },
  { q: "Summarize the new intake and flag anything off.", tasks: ["Read the intake packet", "Check the statute of limitations", "Flag a gap in the timeline", "Write the summary"] },
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
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(0);

  useEffect(() => {
    const ask = ASKS[idx];
    if (reduce) { setTyped(ask.q); setWorking(true); setDone(ask.tasks.length); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    setTyped("");
    setWorking(false);
    setDone(0);
    let i = 0;
    const type = () => {
      i += 1;
      setTyped(ask.q.slice(0, i));
      if (i < ask.q.length) { timers.push(setTimeout(type, 26)); return; }
      // query sent -> run the task list
      timers.push(setTimeout(() => {
        setWorking(true);
        for (let k = 1; k <= ask.tasks.length; k += 1) timers.push(setTimeout(() => setDone(k), 720 * k));
        timers.push(setTimeout(() => setIdx((p) => (p + 1) % ASKS.length), 720 * ask.tasks.length + 2400));
      }, 480));
    };
    timers.push(setTimeout(type, 360));
    return () => timers.forEach(clearTimeout);
  }, [idx, reduce]);

  const ask = ASKS[idx];
  const total = ask.tasks.length;
  const allDone = working && done >= total;
  const pct = working ? Math.round((Math.min(done, total) / total) * 100) : 0;

  return (
    <div style={{ maxWidth: 680, margin: "56px auto 0", position: "relative" }}>
      {/* input box: elevated, with a soft blue-tinted glow */}
      <div style={{ display: "flex", alignItems: "center", gap: 13, height: 66, padding: "0 13px 0 22px", background: "linear-gradient(180deg, #ffffff, #fcfbf8)", border: "1px solid rgba(28,24,18,0.10)", borderRadius: 33, position: "relative", zIndex: 2, boxShadow: "0 1px 2px rgba(28,24,18,0.04), 0 16px 30px -18px rgba(28,24,18,0.20), 0 34px 82px -38px rgba(47,111,224,0.42)" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BF.faint} strokeWidth="2" strokeLinecap="round" style={{ flex: "0 0 auto" }}><path d="M12 5v14M5 12h14" /></svg>
        <div style={{ flex: 1, minWidth: 0, fontFamily: SANS, fontSize: 16.5, letterSpacing: "-0.2px", color: typed ? BF.ink : BF.faint, whiteSpace: "nowrap", overflow: "hidden" }}>
          {typed || "Ask Delta to handle something on a case"}
          {!working && <span className="cd-caret" style={{ display: "inline-block", width: 2, height: 18, background: BF.accent, marginLeft: 1, verticalAlign: "-3px" }} />}
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: SANS, fontSize: 13.5, fontWeight: 500, color: BF.muted, flex: "0 0 auto" }}>
          Fast
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BF.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BF.faint} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
        <span style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(160deg, #284b78, #16140f)", display: "grid", placeItems: "center", flex: "0 0 auto", boxShadow: "0 8px 20px -6px rgba(31,58,95,0.5)" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </span>
      </div>

      {/* the task list Delta runs for the query (revealed once it sends) */}
      <div style={{ minHeight: 286, position: "relative" }}>
        <div style={{ opacity: working ? 1 : 0, transform: working ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.55s ease, transform 0.55s ease" }}>
          {/* connector */}
          <div aria-hidden style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ width: 2, height: 26, background: "linear-gradient(#2f6fe0, rgba(47,111,224,0))" }} />
          </div>
          {/* task card */}
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: "#fff", border: "1px solid rgba(28,24,18,0.08)", boxShadow: "0 2px 4px rgba(28,24,18,0.03), 0 26px 50px -34px rgba(28,24,18,0.26), 0 46px 100px -50px rgba(47,111,224,0.30)" }}>
            {/* progress bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(28,24,18,0.06)" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #3a78e0, #2f6fe0)", transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }} />
            </div>
            <div style={{ padding: "22px 24px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <DeltaMark size={24} />
                <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 600, color: BF.ink }}>{allDone ? "All done" : "Delta is on it"}</span>
                <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7 }}>
                  {working && !allDone && <span className="cd-spin" style={{ width: 13, height: 13, borderRadius: "50%", border: `2px solid ${BF.accentBorderHover}`, borderTopColor: BF.accent }} />}
                  <span style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: allDone ? "#1f8a55" : BF.faint }}>{Math.min(done, total)}/{total}</span>
                </span>
              </div>
              {ask.tasks.map((t, k) => {
                const state = !working ? "pending" : k < done ? "done" : k === done ? "run" : "pending";
                return (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 12px", margin: "0 -12px", borderRadius: 11, background: state === "run" ? BF.accentSoft : "transparent", transition: "background 0.3s ease" }}>
                    <span style={{ width: 20, height: 20, flex: "0 0 auto", display: "grid", placeItems: "center" }}>
                      {state === "done" ? (
                        <span className="cd-pop" style={{ width: 20, height: 20, borderRadius: "50%", background: "#1f8a55", display: "grid", placeItems: "center" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                        </span>
                      ) : state === "run" ? (
                        <span className="cd-spin" style={{ width: 17, height: 17, borderRadius: "50%", border: `2px solid ${BF.accentBorderHover}`, borderTopColor: BF.accent }} />
                      ) : (
                        <span style={{ width: 15, height: 15, borderRadius: "50%", border: `2px solid ${BF.hairlineStrong}` }} />
                      )}
                    </span>
                    <span style={{ fontFamily: SANS, fontSize: 15.5, letterSpacing: "-0.2px", fontWeight: state === "run" ? 600 : 400, color: state === "pending" ? BF.faint : BF.ink, transition: "color 0.3s ease, font-weight 0.2s ease" }}>{t}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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

// Real quote from Heidi Nowotny (provided by the founder, 2026-06-10), excerpted from her
// reply about hours saved. The 4.9 rating beside it is the real attorney rating.
const TESTIMONIAL = {
  quote:
    "Maybe five hours a week. And I think it will be more once I stop double-checking it so much.",
  initials: "HN",
  name: "Heidi Nowotny",
  title: "Attorney, Kirschbaum & Nowotny, LLC",
};

export function HomeSections() {
  const rise = useRise();

  return (
    <>
      {/* CHAT DEMO (first below the fold) — the showpiece, on a glowing stage */}
      <section id="demo" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #ffffff 0%, #f6f4ef 100%)", padding: "clamp(96px, 12vw, 164px) 0", borderTop: `1px solid ${BF.hairline}` }}>
        {/* ambient glow */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%, -50%)", width: "min(1120px, 130%)", height: 780, background: "radial-gradient(closest-side, rgba(47,111,224,0.16), rgba(47,111,224,0.05) 46%, rgba(47,111,224,0) 72%)" }} />
          <div style={{ position: "absolute", left: "50%", top: "62%", transform: "translate(-50%, -50%)", width: 600, height: 440, background: "radial-gradient(closest-side, rgba(245,180,0,0.05), rgba(245,180,0,0) 70%)" }} />
        </div>
        {/* faint dotted grid, masked to fade at the edges */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(28,24,18,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px", WebkitMaskImage: "radial-gradient(ellipse 70% 56% at 50% 42%, #000 18%, transparent 72%)", maskImage: "radial-gradient(ellipse 70% 56% at 50% 42%, #000 18%, transparent 72%)", opacity: 0.55 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: MAXW, margin: "0 auto", padding: `0 ${PAGE_PAD}` }}>
          <motion.div {...rise(0)} style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px, 6vw, 68px)", lineHeight: 1.02, letterSpacing: "-2px", color: BF.ink, margin: 0 }}>
              Just ask. Delta does the rest.
            </h2>
          </motion.div>
          <motion.div {...rise(0.08)}>
            <ChatDemo />
          </motion.div>
        </div>
      </section>

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
        .cd-spin { animation: cd-rot 0.7s linear infinite; }
        @keyframes cd-rot { to { transform: rotate(360deg); } }
        .cd-pop { animation: cd-pop 0.36s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes cd-pop { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
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
