"use client";

/**
 * Below-the-fold homepage sections. Copy is the canonical AEO copy from site_copy.md
 * (answer-first blocks, question H2s, real FAQ for FAQPage schema).
 *
 * Unlike the hero, this content is a FIXED LIGHT design, identical under every hero
 * variant (harvey-light / harvey-dark / legora). The first section is white and each
 * subsequent section has its own light background for differentiation. Decoupled from
 * the hero theme on purpose.
 */
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";

const MAXW = 1320;
const PAGE_PAD = "clamp(24px, 4vw, 48px)";
const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* Fixed light palette for the whole below-the-fold. */
const BF = {
  ink: "#14171f",
  muted: "#54514c",
  faint: "#8a857d",
  hairline: "rgba(20, 23, 31, 0.09)",
  hairlineStrong: "rgba(20, 23, 31, 0.14)",
  accent: "#2f6fe0",
  accentDeep: "#1f3a5f",
  accentSoft: "rgba(47, 111, 224, 0.08)",
  accentBorderHover: "rgba(47, 111, 224, 0.40)",
  card: "#ffffff",
  pillBg: "#1f3a5f",
  pillBgHover: "#284b78",
  pillText: "#ffffff",
  pillDotStroke: "#1f3a5f",
};

/* Per-section light backgrounds, each clearly distinct from its neighbors. */
const BG = {
  white: "#ffffff",
  coolGray: "#eceff4",
  warmWhite: "#f6f2ea",
  blueGray: "#e6edf7",
  warmNeutral: "#f0eee8",
  blueTint: "#e1eafa", // the demo / proof highlight (most saturated)
  coolNeutral: "#eaeef3",
  cream: "#f5eee2",
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

// The first section peeks into the hero's fold on load, so it animates on mount
// rather than on scroll (whileInView would leave the peeking heading invisible).
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
      <div style={{ maxWidth: narrow ? 760 : "100%" }}>{children}</div>
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
  const padTop = tightTop ? "clamp(44px, 5vw, 64px)" : "clamp(72px, 9vw, 116px)";
  return (
    <section id={id} style={{ background: bg, padding: `${padTop} 0 clamp(72px, 9vw, 116px)`, borderTop: `1px solid ${BF.hairline}` }}>
      {children}
    </section>
  );
}

function Q({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.08, letterSpacing: "-1px", color: BF.ink, margin: 0 }}>
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: "clamp(18px, 2.2vw, 21px)", lineHeight: 1.5, letterSpacing: "-0.2px", color: BF.ink, marginTop: 22, fontWeight: 500 }}>
      {children}
    </p>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.62, letterSpacing: "-0.1px", color: BF.muted, marginTop: 18 }}>
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
    <Link href={href} className="cd-tlink" style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: BF.accent, letterSpacing: "-0.2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, marginTop: 26 }}>
      {children}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
    </Link>
  );
}

/* ---- content ---- */

const TASKS = [
  { t: "Requests records and chases them.", d: "It sends the request, tracks what is outstanding, and follows up with the source until the documents come in." },
  { t: "Drafts the routine writing.", d: "Letters, status updates, intake follow-ups, the standard correspondence that eats a paralegal's afternoon. You approve before it sends." },
  { t: "Keeps the file current everywhere.", d: "It updates the matter across your case manager, your CRM, and your billing, so the case moves instead of stalling between systems." },
  { t: "Watches what is slipping.", d: "It tracks deadlines and open items across every active file and flags what needs attention before it becomes a problem." },
];

const FAQ = [
  { q: "What is CaseDelta in one sentence?", a: "CaseDelta is an AI paralegal that works inside the tools your firm already uses, your case manager, your email, your billing, and does the routine case work for you, while your team reviews and approves." },
  { q: "Is CaseDelta accurate? How do I know it is not making things up?", a: "Every answer points back to the source it came from. It works from the facts already in your file, it does not invent them, and your team approves before anything goes out. You always have the final read." },
  { q: "Why not just use Claude or ChatGPT?", a: "A general chatbot is a brain in another tab. It does not know your firm, it does not work inside your case manager, and it cannot move a matter forward. CaseDelta is a brain that knows your firm and operates the tools you already run on." },
  { q: "Do I have to switch software or migrate my data?", a: "No. There is nothing to rip out and nothing to migrate. CaseDelta works on top of the tools you already pay for, so your data stays where it is and your team keeps the systems they know." },
  { q: "Will CaseDelta replace my staff?", a: "No. It is here so your people stop drowning in routine work, and so your next hire is a choice rather than an emergency. It adds capacity to the team you have. It does not shrink it." },
  { q: "How long until it is useful?", a: "It is useful on day one for routine tasks you delegate directly. Over about a month it learns your firm's standards and preferences, so you move from instructing it step by step to simply handing it the case." },
  { q: "Does CaseDelta act on its own without me?", a: "Not by default. It works like a new hire: it drafts and prepares, your team reviews and approves, and it earns more autonomy task by task as it proves itself. You decide what goes out." },
  { q: "We are a small firm. Is this overkill for us?", a: "It is built for small, growing firms that feel the squeeze of hiring. If you are taking on more work than your team can comfortably carry and your next hire is hard to find, this is squarely for you." },
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
            <Q>Why does growing your firm feel like drowning?</Q>
            <Lead>Because growth does not just add cases, it adds the routine work behind every case. Records to request, files to update, clients to chase, deadlines to watch. That work falls on people you cannot hire fast enough, so the more you win, the further behind you fall.</Lead>
            <P>You don&apos;t have a case problem. You have a capacity problem. Your best people spend their days on twenty-dollar work, requesting records, updating files, returning status calls, while the real legal work waits. More cases means more dropped balls, and a dropped ball is a missed deadline, an unhappy client, or a complaint to the bar. You would hire your way out of it, but good paralegals are slow to find, expensive to train, and often gone inside a year.</P>
            <blockquote style={{ fontFamily: SERIF, fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.35, letterSpacing: "-0.4px", color: BF.ink, margin: "34px 0 0", paddingLeft: 22, borderLeft: `2px solid ${BF.accent}` }}>
              &ldquo;How your firm runs lives almost entirely in your head. You can&apos;t take a week off without being available by phone.&rdquo; That is not a staffing gap. It is a structural one.
            </blockquote>
          </motion.div>
        </Container>
      </Section>

      {/* WHAT IT IS */}
      <Section bg={BG.coolGray}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Q>What is CaseDelta?</Q>
            <Lead>CaseDelta is an AI paralegal that works inside the software your firm already uses and does your routine case work. You delegate to it in plain English, the way you would brief a new hire, and it drafts, requests, and updates inside your tools while your team reviews and approves.</Lead>
            <P>It is not another tool to log into. It is a teammate you hand work to. A tool is something you operate. A teammate is something you delegate to. You tell CaseDelta what you would tell a new paralegal, and it does the work inside the systems you already run on. Nothing new for your team to learn. Nothing to migrate. It works on top of what you already pay for, so there is nothing to rip out and nothing to lose.</P>
            <P>The longer it works with you, the more it learns your firm&apos;s way of doing things. Within about a month it knows your playbook, so instead of telling it what to do, you just hand it the case.</P>
          </motion.div>
        </Container>
      </Section>

      {/* WHAT IT DOES */}
      <Section bg={BG.warmWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 760 }}>
            <Q>What does CaseDelta actually do for a small law firm?</Q>
            <Lead>It does the repetitive case work a paralegal does: requests records and chases them, drafts letters and client updates, updates files across your case manager, CRM, and billing, and flags deadlines that are slipping. Your team reviews and approves before anything goes out.</Lead>
          </motion.div>
          <div className="cd-task-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 44 }}>
            {TASKS.map((task, i) => (
              <motion.article key={i} {...rise(0.05 * i)} className="cd-card" style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "30px 28px 32px" }}>
                <span style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 11, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 18 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 23, lineHeight: 1.16, letterSpacing: "-0.4px", color: BF.ink, margin: 0 }}>{task.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: BF.muted, marginTop: 12 }}>{task.d}</p>
              </motion.article>
            ))}
          </div>
          <motion.div {...rise(0.1)}>
            <Container narrow>
              <p style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.62, color: BF.muted, marginTop: 36 }}>
                <strong style={{ color: BF.ink, fontWeight: 600 }}>Always a hand on the wheel.</strong> CaseDelta works like your best paralegal. It just never forgets a step and never takes a day off. It drafts and prepares, your team reviews and approves, and it earns more responsibility as it proves itself, task by task. You decide what goes out and when.
              </p>
            </Container>
          </motion.div>
        </Container>
      </Section>

      {/* WHY DIFFERENT */}
      <Section bg={BG.blueGray}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Q>How is CaseDelta different from other AI legal tools?</Q>
            <Lead>Most AI legal tools do one task in one more browser tab: a research tool, a summarizing tool, another login your team has to learn. CaseDelta does the whole routine job inside the tools you already use, and it learns how your specific firm works, so it gets more useful over time.</Lead>
            <P>A tool that does one thing is still a tool. You still have to open it, feed it, and stitch its output back into your real systems by hand. That is not capacity. That is another tab. CaseDelta works across the tools you already run on and does the mechanical case work in place, then learns your firm&apos;s standards so the next case takes less instruction than the last.</P>
          </motion.div>
          <motion.div {...rise(0.08)} style={{ marginTop: 36, padding: "30px 32px", borderRadius: 16, background: BF.card, border: `1px solid ${BF.hairlineStrong}` }}>
            <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(24px, 3.2vw, 34px)", lineHeight: 1.18, letterSpacing: "-0.6px", color: BF.ink, margin: 0 }}>
              A one-task tool gives you an output. <span style={{ color: BF.accent, fontStyle: "italic" }}>CaseDelta gives you capacity.</span>
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* LEVERAGE NOT LAYOFF */}
      <Section bg={BG.warmNeutral}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Q>Will CaseDelta replace my paralegal?</Q>
            <Lead>No. CaseDelta is leverage, not layoff. It exists so your people stop drowning in routine work and get back to the work that needs judgment. Same team, more cases, fewer dropped balls. Your next hire becomes a choice you make on your terms, not an emergency.</Lead>
            <P>This is not a smaller payroll. It is a bigger firm with the payroll you have. Operate like a firm twice your size with the team you already trust. Your people stop spending their best hours on busywork, your caseload grows without your chaos growing with it, and when you do hire, you hire because you chose to expand, not because you are underwater.</P>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.35, letterSpacing: "-0.4px", color: BF.ink, margin: "30px 0 0" }}>
              Same team. More throughput. Hire when you want to, not because you have to.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* PROOF / DEMO (light-blue highlight) */}
      <Section bg={BG.blueTint} id="proof">
        <Container narrow>
          <motion.div {...rise(0)}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.08, letterSpacing: "-1px", color: BF.ink, margin: 0 }}>
              See it work on one of your real cases.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "clamp(18px, 2.2vw, 21px)", lineHeight: 1.5, color: BF.ink, marginTop: 22, fontWeight: 500 }}>
              Do not take our word for it. Bring a real, active file, and watch CaseDelta do what your paralegal does: request the records, draft the letter, update the file, flag the deadlines, right inside your own tools. Fifteen minutes. You tell us if it is nothing.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: BF.muted, marginTop: 18 }}>
              The category is crowded with demos on fake data. This is your file, on your stack, doing your workflow.
            </p>
            <div style={{ marginTop: 32 }}>
              <PillLink href="/demo" location="proof">Book a 15-minute demo on your own case</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* PRICING + SECURITY (two-up) */}
      <Section bg={BG.coolNeutral}>
        <Container>
          <div className="cd-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
            <motion.div {...rise(0)}>
              <Q>How much does CaseDelta cost?</Q>
              <P>CaseDelta is priced as a fraction of your next hire, not as another per-seat app. A loaded paralegal runs roughly four to five thousand dollars a month, if you can find and keep one. CaseDelta is a flat fee for your whole firm, well under that, unlimited users, a teammate that never calls in sick and never takes the playbook with it when it leaves.</P>
              <P><span style={{ color: BF.ink, fontWeight: 600 }}>Founding firms lock in a rate the next firm will not get.</span></P>
              <TextLink href="/pricing">See pricing</TextLink>
            </motion.div>
            <motion.div {...rise(0.08)}>
              <Q>Is my client data safe?</Q>
              <P>Yes. Your client data is handled under enterprise terms, with encryption in transit and at rest, a zero-retention posture, and a contractual no-training commitment, so your matters are never used to train anyone&apos;s model. For firms that need one, a BAA is available.</P>
              <TextLink href="/security">Read about security and trust</TextLink>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg={BG.cream}>
        <Container narrow>
          <motion.div {...rise(0)}>
            <Q>Frequently asked questions</Q>
          </motion.div>
          <div style={{ marginTop: 36 }}>
            {FAQ.map((item, i) => (
              <motion.div key={i} {...rise(0.03 * i)} style={{ padding: "26px 0", borderTop: i === 0 ? "none" : `1px solid ${BF.hairline}` }}>
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
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.06, letterSpacing: "-1.2px", color: BF.ink, margin: "0 auto", maxWidth: 700 }}>
              Run a bigger firm with the team you have.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.55, color: BF.muted, margin: "20px auto 0", maxWidth: 540 }}>
              Stop losing your best hours to routine work. Bring one real case, and see CaseDelta do the job inside your own tools in fifteen minutes.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <PillLink href="/demo" location="final_cta">Book a 15-minute demo</PillLink>
            </div>
          </motion.div>
        </Container>
      </Section>

      <style>{`
        .cd-pill2:hover { background: ${BF.pillBgHover}; box-shadow: 0 10px 26px rgba(31,58,95,0.22); transform: translateY(-1px); }
        .cd-tlink:hover { gap: 11px; }
        .cd-card { transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .cd-card:hover { border-color: ${BF.accentBorderHover}; transform: translateY(-4px); box-shadow: 0 24px 50px -28px rgba(20,23,31,0.18); }
        @media (max-width: 880px) {
          .cd-task-grid { grid-template-columns: 1fr !important; }
          .cd-two { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  );
}
