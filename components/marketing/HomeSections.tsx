"use client";

/**
 * Below-the-fold homepage. FIXED LIGHT design, identical under every hero variant.
 * Structured + styled like Harvey / Legora / Filevine: a product-demo video (with a
 * real product-UI poster), concise use-cases, a dark impact/stats band, the
 * differentiator line, a security grid, a compact FAQ, and a bold CTA band.
 * Consistent surfaces (white / one off-white + two dark bands), generous whitespace,
 * scannability-first. Honest claims only (POSITIONING.md).
 */
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";
import { HOME_FAQ } from "@/lib/home-content";

const MAXW = 1320;
const PAGE_PAD = "clamp(24px, 4vw, 48px)";
const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const BF = {
  ink: "#14171f",
  muted: "#54565f",
  faint: "#8a8c95",
  hairline: "rgba(20, 23, 31, 0.09)",
  hairlineStrong: "rgba(20, 23, 31, 0.12)",
  accent: "#2f6fe0",
  accentSoft: "rgba(47, 111, 224, 0.08)",
  accentBorderHover: "rgba(47, 111, 224, 0.40)",
  card: "#ffffff",
  pillBg: "#1f3a5f",
  pillBgHover: "#284b78",
};

/* Consistent surfaces: white + one off-white for light sections, two dark bands. */
const BG = {
  white: "#ffffff",
  offWhite: "#f5f7fb",
  statBand: "#0e1420",
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

function Section({ children, bg, id }: { children: React.ReactNode; bg: string; id?: string }) {
  return (
    <section id={id} style={{ background: bg, padding: "clamp(92px, 11.5vw, 152px) 0", borderTop: `1px solid ${BF.hairline}` }}>
      {children}
    </section>
  );
}

function H({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(33px, 4.6vw, 50px)", lineHeight: 1.06, letterSpacing: "-1.2px", color: light ? "#fff" : BF.ink, margin: 0 }}>
      {children}
    </h2>
  );
}

function Sub({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.5, letterSpacing: "-0.2px", color: light ? "rgba(255,255,255,0.7)" : BF.muted, marginTop: 20, maxWidth: 640 }}>
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
const TASKS = [
  { t: "Requests records and chases them.", d: "Sends the request, tracks what's outstanding, follows up until it arrives." },
  { t: "Drafts the routine writing.", d: "Letters, status updates, intake follow-ups. You approve before it sends." },
  { t: "Keeps the file current everywhere.", d: "Updates the matter across your case manager, CRM, and billing." },
  { t: "Watches what's slipping.", d: "Tracks deadlines and open items across every active file." },
];

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

// PLACEHOLDER testimonial — fictional. Replace with a real, attributable quote (with the
// person's permission) before launch; a fabricated endorsement is an FTC / honesty risk.
const TESTIMONIAL = {
  quote:
    "Delta runs the records chase and the first draft on every file, then hands it back for us to approve. It is the first thing we have tried that took work off my paralegals instead of giving them one more tab to manage.",
  initials: "DH",
  name: "Daniel Hartley",
  title: "Managing Partner, Hartley Injury Law",
};

const COMPARE = {
  tool: ["Opens in one more browser tab", "You re-key its output into your real systems", "Solves a single task, then stops"],
  delta: ["Works inside the tools you already use", "Does the whole routine job, end to end", "Learns your firm and compounds over time"],
};

export function HomeSections() {
  const rise = useRise();

  return (
    <>
      {/* PRODUCT DEMO VIDEO */}
      <Section bg={BG.white} id="demo">
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>Watch it do a day of your paralegal&apos;s work.</H>
            <Sub>Hand Delta a real case. It requests the records, drafts the demand, updates the file, and chases the client, right inside the tools you already use.</Sub>
          </motion.div>
        </Container>
        <Container>
          <motion.div {...rise(0.08)}>
            <VideoPlaceholder />
          </motion.div>
        </Container>
      </Section>

      {/* WHAT IT DOES */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>It does the routine case work, end to end.</H>
            <Sub>The repetitive work that eats your team&apos;s hours. Your team reviews and approves before anything goes out.</Sub>
          </motion.div>
          <div className="cd-task-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 48 }}>
            {TASKS.map((task, i) => (
              <motion.article key={i} {...rise(0.05 * i)} className="cd-card" style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "28px 26px 30px" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 16 }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, lineHeight: 1.16, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>{task.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: BF.muted, marginTop: 10 }}>{task.d}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* TESTIMONIAL (PLACEHOLDER — swap for a real one before launch) */}
      <Section bg={BG.white}>
        <Container narrow>
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

      {/* IMPACT / STATS (dark band) */}
      <Section bg={BG.statBand}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
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

      {/* WHY DIFFERENT (comparison module) */}
      <Section bg={BG.white}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>
              A one-task tool gives you an output. <span style={{ color: BF.accent, fontStyle: "italic" }}>CaseDelta gives you capacity.</span>
            </H>
            <Sub>Most legal AI does one task in one more browser tab. CaseDelta does the whole routine job inside the tools you already use, and learns how your firm works.</Sub>
          </motion.div>
        </Container>
        <Container>
          <div className="cd-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 52 }}>
            <motion.div {...rise(0)} style={{ background: BG.offWhite, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "32px 30px 34px" }}>
              <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: BF.faint, marginBottom: 20 }}>A one-task tool</div>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: 1 }}><path d="M5 13l4 4L19 7" /></svg>
                  <span style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.45, color: BF.ink, fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* SECURITY / TRUST */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>Built for the sensitivity of legal work.</H>
            <Sub>Your client matters are handled under enterprise terms, and a human on your team signs off before anything leaves the firm.</Sub>
          </motion.div>
          <div className="cd-sec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginTop: 48, background: BF.hairline, border: `1px solid ${BF.hairline}`, borderRadius: 14, overflow: "hidden" }}>
            {SECURITY.map((s, i) => (
              <motion.div key={i} {...rise(0.04 * i)} style={{ background: BG.offWhite, padding: "28px 26px", display: "flex", alignItems: "center", gap: 12 }}>
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
      <Section bg={BG.white}>
        <Container narrow>
          <motion.div {...rise(0)}>
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
        .cd-card { transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .cd-card:hover { border-color: ${BF.accentBorderHover}; transform: translateY(-4px); box-shadow: 0 24px 50px -28px rgba(20,23,31,0.16); }
        .cd-video { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .cd-video:hover { transform: translateY(-3px); }
        .cd-video:hover .cd-play { transform: scale(1.06); }
        @media (max-width: 880px) {
          .cd-task-grid { grid-template-columns: 1fr !important; }
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
