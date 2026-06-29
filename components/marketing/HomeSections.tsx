"use client";

/**
 * Below-the-fold homepage. FIXED LIGHT design (cool palette, no warm tones), identical
 * under every hero variant. Structured like Harvey / Legora / Filevine: a product-demo
 * video, concise use-cases, a dark impact/stats band, the differentiator line, a security
 * grid, a compact FAQ, and a bold CTA band. Scannability-first: headings carry the pitch,
 * subheadings are for the inquisitive, body prose is kept out (FAQ excepted). Honest claims
 * only (POSITIONING.md): no fabricated customer metrics.
 */
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";
import { HOME_FAQ } from "@/lib/home-content";

const MAXW = 1320;
const PAGE_PAD = "clamp(24px, 4vw, 48px)";
const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* Cool light palette (no warm tones). */
const BF = {
  ink: "#14171f",
  muted: "#54565f",
  faint: "#8a8c95",
  hairline: "rgba(20, 23, 31, 0.09)",
  hairlineStrong: "rgba(20, 23, 31, 0.13)",
  accent: "#2f6fe0",
  accentSoft: "rgba(47, 111, 224, 0.08)",
  accentBorderHover: "rgba(47, 111, 224, 0.40)",
  card: "#ffffff",
  pillBg: "#1f3a5f",
  pillBgHover: "#284b78",
  pillText: "#ffffff",
};

const BG = {
  white: "#ffffff",
  gray1: "#eef1f6",
  gray2: "#f3f5f9",
  statBand: "#0e1420", // dark impact band
  ctaBand: "#1f3a5f", // deep-blue CTA band
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
    <section id={id} style={{ background: bg, padding: "clamp(72px, 9vw, 112px) 0", borderTop: `1px solid ${BF.hairline}` }}>
      {children}
    </section>
  );
}

function H({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.07, letterSpacing: "-1.1px", color: light ? "#fff" : BF.ink, margin: 0 }}>
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
  const fg = onDark ? "#1f3a5f" : BF.pillText;
  const dot = onDark ? "#1f3a5f" : "#ffffff";
  const arrow = onDark ? "#ffffff" : "#1f3a5f";
  return (
    <a
      href={href}
      onClick={() => trackEvent("cta_click", { location })}
      className={onDark ? "cd-pill-d" : "cd-pill2"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, background: bg, color: fg,
        borderRadius: 48, padding: "11px 11px 11px 24px", fontFamily: SANS, fontSize: 15.5, fontWeight: 600,
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
    <Link href={href} className="cd-tlink" style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: BF.accent, letterSpacing: "-0.2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, marginTop: 22 }}>
      {children}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
    </Link>
  );
}

/* ---- product-demo video placeholder (real video drops into .cd-video-stage) ---- */
function VideoPlaceholder() {
  return (
    <a
      href="/demo"
      onClick={() => trackEvent("cta_click", { location: "demo_video" })}
      className="cd-video"
      style={{ display: "block", maxWidth: 980, margin: "44px auto 0", borderRadius: 18, overflow: "hidden", border: `1px solid ${BF.hairlineStrong}`, background: "#0e1420", boxShadow: "0 50px 100px -40px rgba(20,23,31,0.45), 0 0 0 1px rgba(47,111,224,0.05)", textDecoration: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 42, padding: "0 16px", background: "linear-gradient(#171c27, #11151e)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2c2f3a" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2c2f3a" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2c2f3a" }} />
        <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: SANS, fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6aa6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          app.casedelta.com / Ortega v. Memorial
        </span>
      </div>
      <div className="cd-video-stage" style={{ position: "relative", aspectRatio: "16 / 9", background: "radial-gradient(80% 90% at 50% 35%, rgba(47,111,224,0.18) 0%, rgba(14,20,32,0) 60%), linear-gradient(160deg, #131a26 0%, #0c1119 100%)", display: "grid", placeItems: "center" }}>
        <span className="cd-play" style={{ width: 72, height: 72, borderRadius: "50%", background: "#ffffff", display: "grid", placeItems: "center", boxShadow: "0 16px 40px -10px rgba(0,0,0,0.5)", transition: "transform 0.2s ease" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#1f3a5f"><path d="M8 5.5v13l11-6.5z" /></svg>
        </span>
        <span style={{ position: "absolute", bottom: 18, fontFamily: SANS, fontSize: 13, fontWeight: 500, letterSpacing: "0.2px", color: "rgba(255,255,255,0.62)" }}>
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
      <Section bg={BG.gray1}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>It does the routine case work, end to end.</H>
            <Sub>The repetitive work that eats your team&apos;s hours. Your team reviews and approves before anything goes out.</Sub>
          </motion.div>
          <div className="cd-task-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 44 }}>
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

      {/* IMPACT / STATS (dark band) */}
      <Section bg={BG.statBand}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <H light>One teammate. Your whole firm.</H>
            <Sub light>Priced against the help you can&apos;t hire, not a per-seat app. The math is simple.</Sub>
          </motion.div>
          <div className="cd-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 56 }}>
            {STATS.map((s, i) => (
              <motion.div key={i} {...rise(0.05 * i)} style={{ padding: "0 28px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px, 5vw, 60px)", lineHeight: 1, letterSpacing: "-1.6px", color: "#fff" }}>{s.n}</div>
                <div style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.45, color: "rgba(255,255,255,0.6)", marginTop: 16 }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY DIFFERENT */}
      <Section bg={BG.gray2}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>
              A one-task tool gives you an output. <span style={{ color: BF.accent, fontStyle: "italic" }}>CaseDelta gives you capacity.</span>
            </H>
            <Sub>Most legal AI does one task in one more browser tab. CaseDelta does the whole routine job inside the tools you already use, and learns how your firm works, so it gets more useful over time.</Sub>
          </motion.div>
        </Container>
      </Section>

      {/* SECURITY / TRUST */}
      <Section bg={BG.gray1}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <H>Built for the sensitivity of legal work.</H>
            <Sub>Your client matters are handled under enterprise terms, and a human on your team signs off before anything leaves the firm.</Sub>
          </motion.div>
          <div className="cd-sec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginTop: 44, background: BF.hairline, border: `1px solid ${BF.hairline}`, borderRadius: 14, overflow: "hidden" }}>
            {SECURITY.map((s, i) => (
              <motion.div key={i} {...rise(0.04 * i)} style={{ background: BG.gray1, padding: "26px 24px", display: "flex", alignItems: "center", gap: 12 }}>
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
          <div style={{ marginTop: 36 }}>
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
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4.6vw, 54px)", lineHeight: 1.05, letterSpacing: "-1.3px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              See it work on one of your real cases.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 520 }}>
              Bring one real file, and watch Delta do the job inside your own tools in fifteen minutes.
            </p>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
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
          .cd-stat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 36px 0 !important; }
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
