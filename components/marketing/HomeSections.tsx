"use client";

/**
 * Below-the-fold homepage. FIXED LIGHT design, identical under every hero variant.
 *
 * v2 information architecture (casedelta-cloud/pi_pain_research/offer/website_copy_v2.md):
 *   problem (their words) -> how it works (3 steps) -> what it does (the jobs) ->
 *   accuracy + security -> proof -> leverage/price -> FAQ -> final CTA.
 *
 * Built on Hormozi's page teaching (pain first below the fold, proof over promise, mechanism
 * shown not asserted, headlines carry the meaning, one CTA repeated) and the skeptical-B2B
 * cross-check (elevate "how it works"/security/no-migration, demo-shaped risk reversal, easy
 * on urgency). The dream outcome is peace + control, never "the firm runs without you."
 *
 * SEO/AEO: copy renders into static HTML; client JS is limited to the FAQ accordion; the FAQ
 * mirrors the FAQPage schema (lib/home-content.ts, kept in sync). Honest claims only: no
 * fabricated metrics, no "data never leaves" / "no third-party LLM". Delta is gender-neutral.
 * No em dashes.
 */
import Link from "next/link";
import { useState } from "react";
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
   two dark bands (a warm-black leverage band + the brand-navy CTA band). */
const BG = {
  white: "#ffffff",
  offWhite: "#f7f4ee",
  softBlue: "linear-gradient(180deg, #fbfaf7 0%, #eef2fb 100%)",
  softCool: "linear-gradient(180deg, #faf7f1 0%, #ffffff 100%)",
  statBand: "#16140f",
  ctaBand: "#1f3a5f",
};

/* ---- shared inline styles ---- */
const cardTitle: React.CSSProperties = { fontFamily: SERIF, fontWeight: 400, fontSize: 22, letterSpacing: "-0.5px", lineHeight: 1.18, color: BF.ink, margin: 0 };
const cardBody: React.CSSProperties = { fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: BF.muted, marginTop: 12 };
const card: React.CSSProperties = { background: "#fff", border: `1px solid ${BF.hairline}`, borderRadius: 18, padding: "30px 28px 32px", boxShadow: "0 30px 60px -48px rgba(28,24,18,0.26)" };
const numBadge: React.CSSProperties = { display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 18 };
const closer: React.CSSProperties = { fontFamily: SANS, fontSize: "clamp(17px, 1.9vw, 20px)", lineHeight: 1.5, color: BF.ink, fontWeight: 500, marginTop: 44, maxWidth: 760 };
const jobRow: React.CSSProperties = { display: "flex", gap: 18, alignItems: "flex-start", padding: "26px 4px", borderTop: `1px solid ${BF.hairline}` };
const jobCheck: React.CSSProperties = { flex: "0 0 auto", width: 30, height: 30, borderRadius: "50%", background: BF.accent, display: "grid", placeItems: "center", marginTop: 4 };

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

function Section({ children, bg, id }: { children: React.ReactNode; bg: string; id?: string }) {
  return (
    <section id={id} style={{ background: bg, padding: "clamp(92px, 11.5vw, 152px) 0", borderTop: `1px solid ${BF.hairline}` }}>
      {children}
    </section>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.55)" : BF.accent, marginBottom: 18 }}>
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
    <p style={{ fontFamily: SANS, fontSize: "clamp(16px, 1.7vw, 18.5px)", lineHeight: 1.55, letterSpacing: "-0.1px", color: light ? "rgba(255,255,255,0.66)" : BF.muted, marginTop: 22, maxWidth: 640 }}>
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

/* ---- content (v2 copy) ---- */
const PAINS = [
  { t: "2 a.m., checking a date.", d: "You wake up and tear through a file to be sure a deadline did not slip. The safety net is your own memory." },
  { t: "The good case hit voicemail.", d: "It called, nobody picked up, and it signed with whoever called back first. Your marketing worked. Intake leaked." },
  { t: "$60k to switch case software.", d: "And you still log in just to find out what is actually happening on a matter." },
];

const STEPS = [
  { t: "Connect what you already use", d: "Your case manager, your inbox, your billing. In minutes, not a migration project. Nothing to rip out, nothing to move." },
  { t: "Hand it the work, in plain English", d: "Tell it what you would tell a new hire. 'Request the records on the Alvarez file. Draft the demand.'" },
  { t: "It does the work, and shows you", d: "Every answer points to the page it came from. You approve before anything goes out." },
];

const JOBS = [
  { t: "Pulls the records, chases the providers, builds the chronology.", d: "The most expensive, most error-prone hours in the building, off your team's plate. In minutes, not the days a paralegal loses to it." },
  { t: "Drafts the letters.", d: "Demands, representation letters, client updates. You review, you send." },
  { t: "Keeps every file moving across every system.", d: "Case manager, inbox, billing, in sync. Nothing stalls because someone forgot to update something." },
  { t: "Watches every deadline and statute of limitations.", d: "Across all your files. Flags what is slipping before it bites. The safety net stops being one person's memory." },
  { t: "Keeps the follow-up from slipping.", d: "New leads, waiting clients, open loops, kept warm on a relentless cadence." },
];

const TRUST = [
  { t: "It cites the page it came from.", d: "Every answer links to the source. You can check it in seconds." },
  { t: "You approve before anything goes out.", d: "It drafts and preps. Your team has the final say, always." },
  { t: "It earns rope, task by task.", d: "Like a new hire. You decide what it handles on its own, and when." },
];

const SECURITY = [
  "Encrypted in transit and at rest",
  "Zero data retention",
  "No training on your data",
  "BAA available",
  "Human approval on every action",
  "Your firm's data, isolated",
];

const STATS = [
  { n: "$4-5k", l: "What one paralegal costs a month, if you can find and keep one." },
  { n: "0", l: "Migrations, rip-outs, or new logins. Delta runs on your stack." },
  { n: "1 fee", l: "One flat fee for the whole firm. Not another per-seat app." },
  { n: "Never quits", l: "It works your files and never takes a day off." },
];

// Real quote from Heidi Nowotny (provided by the founder, 2026-06-10), excerpted from her
// reply about hours saved. The 4.9 beside it is the real attorney rating (do not remove).
const TESTIMONIAL = {
  quote: "Maybe five hours a week. And I think it will be more once I stop double-checking it so much.",
  initials: "HN",
  name: "Heidi Nowotny",
  title: "Attorney, Kirschbaum & Nowotny, LLC",
};

export function HomeSections() {
  const rise = useRise();

  return (
    <>
      {/* 1. PROBLEM (first below the fold) */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <Eyebrow>The reality</Eyebrow>
            <H>{"The firm doesn't move unless you do."}</H>
            <Sub>{"You left a salary to buy your freedom. Instead you bought a job that needs you in the room."}</Sub>
          </motion.div>
          <div className="cd-cards3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
            {PAINS.map((c, i) => (
              <motion.div key={c.t} {...rise(0.05 * i)} style={card}>
                <h3 style={cardTitle}>{c.t}</h3>
                <p style={cardBody}>{c.d}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.18)}>
            <p style={closer}>{"That's not a case problem. It's a capacity problem. And good paralegals are slow to find, expensive to train, and gone in a year."}</p>
          </motion.div>
        </Container>
      </Section>

      {/* 2. WHAT IT IS + HOW IT WORKS */}
      <Section bg={BG.white} id="how">
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>How it works</Eyebrow>
            <H>{"A teammate you hand work to. Not another tool to log into."}</H>
            <Sub>{"Delta works the way your best paralegal works. It just never forgets a step and never takes a day off."}</Sub>
          </motion.div>
          <div className="cd-cards3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
            {STEPS.map((c, i) => (
              <motion.div key={c.t} {...rise(0.05 * i)} style={card}>
                <span style={numBadge}><span style={{ fontFamily: SERIF, fontSize: 18, color: BF.accent }}>{i + 1}</span></span>
                <h3 style={cardTitle}>{c.t}</h3>
                <p style={cardBody}>{c.d}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.16)}>
            <p style={closer}>{"The longer it works with you, the more it learns your firm's way. You explain less and approve faster. You never lose the wheel."}</p>
          </motion.div>
          {/* integration logos: the tools Delta runs inside */}
          <motion.div {...rise(0.2)} style={{ marginTop: 52, textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: BF.faint, marginBottom: 22 }}>{LOGO_CAP}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px 40px", flexWrap: "wrap" }}>
              {LOGOS.map((logo) => (
                <span key={logo.name} style={{ fontFamily: logo.style === "serif" ? SERIF : SANS, fontSize: logo.style === "wide" ? 13.5 : 17, fontWeight: logo.style === "wide" ? 600 : 500, letterSpacing: logo.style === "wide" ? "1.4px" : "-0.2px", textTransform: logo.style === "wide" ? "uppercase" : "none", color: "#a59d8e", whiteSpace: "nowrap" }}>{logo.name}</span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* 3. WHAT IT DOES */}
      <Section bg={BG.softBlue}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>What it does</Eyebrow>
            <H>{"The grind that eats your evenings. Handled."}</H>
          </motion.div>
          <div style={{ marginTop: 48 }}>
            {JOBS.map((j, i) => (
              <motion.div key={j.t} {...rise(0.04 * i)} style={jobRow}>
                <span style={jobCheck}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(20px, 2.4vw, 25px)", letterSpacing: "-0.5px", lineHeight: 1.2, color: BF.ink, margin: 0 }}>{j.t}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: BF.muted, marginTop: 8, maxWidth: 760 }}>{j.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.16)}>
            <p style={closer}>{"You stay the lawyer. Delta wears the second hat."}</p>
          </motion.div>
        </Container>
      </Section>

      {/* 4. ACCURACY + SECURITY */}
      <Section bg={BG.white}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>Accuracy and trust</Eyebrow>
            <H>{"“Is it just making things up?”"}</H>
            <Sub>{"No. Delta works from the facts already in your file. It does not invent them."}</Sub>
          </motion.div>
          <div className="cd-cards3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 48 }}>
            {TRUST.map((c, i) => (
              <motion.div key={c.t} {...rise(0.05 * i)} style={card}>
                <h3 style={cardTitle}>{c.t}</h3>
                <p style={cardBody}>{c.d}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.12)} style={{ marginTop: 64, maxWidth: 820 }}>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "-0.8px", lineHeight: 1.12, color: BF.ink, margin: 0 }}>{"Your client data, handled like client data."}</h3>
          </motion.div>
          <div className="cd-sec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginTop: 28, background: BF.hairline, border: `1px solid ${BF.hairline}`, borderRadius: 14, overflow: "hidden" }}>
            {SECURITY.map((s, i) => (
              <motion.div key={s} {...rise(0.04 * i)} style={{ background: "#fff", padding: "24px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M5 13l4 4L19 7" /></svg>
                <span style={{ fontFamily: SANS, fontSize: 15.5, fontWeight: 500, letterSpacing: "-0.2px", color: BF.ink }}>{s}</span>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.1)}>
            <TextLink href="/security">Read about security and trust</TextLink>
          </motion.div>
        </Container>
      </Section>

      {/* 5. PROOF (Heidi Nowotny) */}
      <Section bg={BG.softCool}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760, marginBottom: 48 }}>
            <Eyebrow>Proof</Eyebrow>
            <H>{"Don't take our word for it."}</H>
          </motion.div>
          <div className="cd-quote" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "stretch" }}>
            <motion.div {...rise(0.05)} className="cd-quote-card" style={{ borderRadius: 20, padding: "40px 36px", background: "linear-gradient(160deg, #1f3a5f 0%, #16140f 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280, boxShadow: "0 40px 80px -44px rgba(28,24,18,0.55)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#f5b400" aria-hidden><path d="M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.27 6.09 20.36l1.13-6.57L2.45 9.14l6.6-.96L12 2.2z" /></svg>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 52, lineHeight: 1, color: "#fff", letterSpacing: "-1.5px" }}>4.9</div>
                <div style={{ fontFamily: SANS, fontSize: 15, color: "rgba(255,255,255,0.66)", marginTop: 10, maxWidth: 240 }}>From the attorneys using it.</div>
              </div>
            </motion.div>
            <motion.figure {...rise(0.1)} style={{ margin: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
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

      {/* 6. LEVERAGE / PRICE (dark band) */}
      <Section bg={BG.statBand}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow light>Leverage, not layoff</Eyebrow>
            <H light>{"It's not a smaller payroll. It's a bigger firm with the team you have."}</H>
            <Sub light>{"Delta is not here to replace your people. It is here so they stop drowning, and so your next hire is a choice, not an emergency. Priced against the help you can't hire, not a per-seat app."}</Sub>
          </motion.div>
          <div className="cd-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 60 }}>
            {STATS.map((s, i) => (
              <motion.div key={i} {...rise(0.05 * i)} style={{ padding: "0 30px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.02, letterSpacing: "-1.4px", color: "#fff" }}>{s.n}</div>
                <div style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.45, color: "rgba(255,255,255,0.6)", marginTop: 16 }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...rise(0.22)} style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <PillLink href="/demo" location="leverage_cta" onDark>See it on your case</PillLink>
            <span style={{ fontFamily: SANS, fontSize: 14.5, color: "rgba(255,255,255,0.62)" }}>{"See it first. Then we talk price."}</span>
          </motion.div>
        </Container>
      </Section>

      {/* 7. FAQ */}
      <Section bg={BG.offWhite}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Eyebrow>Questions</Eyebrow>
            <H>Questions firms ask</H>
          </motion.div>
          <motion.div {...rise(0.05)} style={{ marginTop: 40, borderBottom: `1px solid ${BF.hairline}` }}>
            {HOME_FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 8. FINAL CTA (deep-blue band) */}
      <Section bg={BG.ctaBand}>
        <Container narrow>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See it on your own case. 15 minutes.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Bring one real, messy, active file. We will show you Delta do the work, inside your own tools. You tell us if it is nothing.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="final_cta" onDark>Book your 15 minutes</PillLink>
            </div>
            <p style={{ fontFamily: SANS, fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 18 }}>
              15 minutes. Nothing to rip out. Your data stays yours.
            </p>
          </motion.div>
        </Container>
      </Section>

      <style>{`
        .cd-pill2:hover { background: ${BF.pillBgHover}; box-shadow: 0 10px 26px rgba(31,58,95,0.22); transform: translateY(-1px); }
        .cd-pill-d:hover { transform: translateY(-1px); box-shadow: 0 12px 30px rgba(0,0,0,0.22); }
        .cd-tlink:hover { gap: 11px; }
        .cd-faq-btn:hover span:first-child { color: ${BF.accent}; }
        .cd-faq-btn:hover span:last-child { border-color: ${BF.accentBorderHover}; }
        @media (max-width: 880px) {
          .cd-cards3 { grid-template-columns: 1fr !important; }
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
      <div style={{ maxHeight: open ? 320 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height 0.42s ease, opacity 0.3s ease" }}>
        <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.62, color: BF.muted, margin: "0 4px 28px", maxWidth: 720 }}>{a}</p>
      </div>
    </div>
  );
}
