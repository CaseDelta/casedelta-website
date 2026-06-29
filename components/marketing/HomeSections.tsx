"use client";

/**
 * Below-the-fold homepage sections. FIXED LIGHT design, identical under every hero
 * variant. Scannability-first: the HEADINGS alone carry the whole pitch, subheadings
 * are for the inquisitive, and body text is kept out (assume nobody reads it). The FAQ
 * is the one place prose lives, since a question invites its answer (and powers the
 * FAQPage schema). Copy obeys POSITIONING.md.
 */
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";
import { HOME_FAQ } from "@/lib/home-content";

const MAXW = 1320;
const PAGE_PAD = "clamp(24px, 4vw, 48px)";
const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* Fixed COOL light palette (no warm tones). */
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
  pillDotStroke: "#1f3a5f",
};

/* Per-section cool light backgrounds, each clearly distinct from its neighbors. */
const BG = {
  white: "#ffffff",
  gray1: "#e9edf4",
  gray2: "#f3f5f9",
  blueGray: "#e3eaf5",
  gray3: "#eef1f6",
  blueTint: "#dfe8fb", // demo / proof highlight (most saturated)
  gray4: "#eaeef4",
  gray5: "#f1f3f8",
};

/* ---- shared bits ---- */

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

// The first section peeks into the hero's fold on load, so it animates on mount.
function useRiseLoad() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
}

function Container({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `0 ${PAGE_PAD}` }}>
      <div style={{ maxWidth: narrow ? 820 : "100%" }}>{children}</div>
    </div>
  );
}

function Section({
  children,
  bg,
  id,
  tightTop = false,
}: {
  children: React.ReactNode;
  bg: string;
  id?: string;
  tightTop?: boolean;
}) {
  const padTop = tightTop ? "clamp(44px, 5vw, 64px)" : "clamp(72px, 9vw, 112px)";
  return (
    <section id={id} style={{ background: bg, padding: `${padTop} 0 clamp(72px, 9vw, 112px)`, borderTop: `1px solid ${BF.hairline}` }}>
      {children}
    </section>
  );
}

// Heading: carries the message on its own.
function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.07, letterSpacing: "-1.1px", color: BF.ink, margin: 0 }}>
      {children}
    </h2>
  );
}

// Subheading: for the inquisitive.
function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.5, letterSpacing: "-0.2px", color: BF.muted, marginTop: 20, maxWidth: 640 }}>
      {children}
    </p>
  );
}

function PillLink({ href, children, location }: { href: string; children: React.ReactNode; location: string }) {
  return (
    <a
      href={href}
      onClick={() => trackEvent("cta_click", { location })}
      className="cd-pill2"
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, background: BF.pillBg, color: BF.pillText,
        borderRadius: 48, padding: "10px 10px 10px 24px", fontFamily: SANS, fontSize: 15.5, fontWeight: 600,
        letterSpacing: "-0.2px", lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap",
        transition: "background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
      }}
    >
      {children}
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BF.pillDotStroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
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

/* ---- content ---- */

const TASKS = [
  { t: "Requests records and chases them.", d: "Sends the request, tracks what's outstanding, follows up until it arrives." },
  { t: "Drafts the routine writing.", d: "Letters, status updates, intake follow-ups. You approve before it sends." },
  { t: "Keeps the file current everywhere.", d: "Updates the matter across your case manager, CRM, and billing." },
  { t: "Watches what's slipping.", d: "Tracks deadlines and open items across every active file." },
];

export function HomeSections() {
  const rise = useRise();
  const riseLoad = useRiseLoad();

  return (
    <>
      {/* PROBLEM */}
      <Section bg={BG.white} tightTop>
        <Container narrow>
          <motion.div {...riseLoad(0)}>
            <H>You don&apos;t have a case problem. You have a capacity problem.</H>
            <Sub>Growth doesn&apos;t just add cases. It adds the routine work behind every one, and that lands on people you can&apos;t hire fast enough.</Sub>
          </motion.div>
        </Container>
      </Section>

      {/* WHAT IT IS */}
      <Section bg={BG.gray1}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>An AI paralegal that works inside the tools you already use.</H>
            <Sub>You delegate in plain English, the way you would brief a new hire. It drafts, requests, and updates inside your case manager, inbox, and billing, while your team reviews and approves.</Sub>
          </motion.div>
        </Container>
      </Section>

      {/* WHAT IT DOES */}
      <Section bg={BG.gray2}>
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

      {/* WHY DIFFERENT */}
      <Section bg={BG.blueGray}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>
              A one-task tool gives you an output. <span style={{ color: BF.accent, fontStyle: "italic" }}>CaseDelta gives you capacity.</span>
            </H>
            <Sub>Most legal AI does one task in one more browser tab. CaseDelta does the whole routine job inside the tools you already use, and learns how your firm works, so it gets more useful over time.</Sub>
          </motion.div>
        </Container>
      </Section>

      {/* LEVERAGE NOT LAYOFF */}
      <Section bg={BG.gray3}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>Leverage, not layoff.</H>
            <Sub>It adds capacity to the team you have, so your next hire is a choice, not an emergency. Same team, more cases, fewer dropped balls.</Sub>
          </motion.div>
        </Container>
      </Section>

      {/* PROOF / DEMO (blue highlight) */}
      <Section bg={BG.blueTint} id="proof">
        <Container narrow>
          <motion.div {...rise(0)}>
            <H>See it work on one of your real cases.</H>
            <Sub>Bring a real, active file. Watch CaseDelta request the records, draft the letter, update the file, and flag the deadlines, right inside your own tools. Fifteen minutes, and you tell us if it is nothing.</Sub>
            <div style={{ marginTop: 30 }}>
              <PillLink href="/demo" location="proof">Book a 15-minute demo on your own case</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* PRICING + SECURITY (two-up) */}
      <Section bg={BG.gray4}>
        <Container>
          <div className="cd-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
            <motion.div {...rise(0)}>
              <H>Priced like a hire, not a seat.</H>
              <Sub>A flat fee for your whole firm, a fraction of one paralegal. Founding firms lock in a rate the next firm will not get.</Sub>
              <TextLink href="/pricing">See pricing</TextLink>
            </motion.div>
            <motion.div {...rise(0.08)}>
              <H>Your client data stays enterprise-safe.</H>
              <Sub>Encryption in transit and at rest, a zero-retention posture, no training on your data, and a BAA when you need one.</Sub>
              <TextLink href="/security">Read about security and trust</TextLink>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* FAQ (prose lives here, for the inquisitive) */}
      <Section bg={BG.gray5}>
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

      {/* FINAL CTA */}
      <Section bg={BG.white}>
        <Container narrow>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4.6vw, 54px)", lineHeight: 1.05, letterSpacing: "-1.3px", color: BF.ink, margin: "0 auto", maxWidth: 720 }}>
              Run a bigger firm with the team you have.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: BF.muted, margin: "20px auto 0", maxWidth: 520 }}>
              Bring one real case, and see CaseDelta do the job inside your own tools in fifteen minutes.
            </p>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="final_cta">Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <style>{`
        .cd-pill2:hover { background: ${BF.pillBgHover}; box-shadow: 0 10px 26px rgba(31,58,95,0.22); transform: translateY(-1px); }
        .cd-tlink:hover { gap: 11px; }
        .cd-card { transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .cd-card:hover { border-color: ${BF.accentBorderHover}; transform: translateY(-4px); box-shadow: 0 24px 50px -28px rgba(20,23,31,0.16); }
        @media (max-width: 880px) {
          .cd-task-grid { grid-template-columns: 1fr !important; }
          .cd-two { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  );
}
