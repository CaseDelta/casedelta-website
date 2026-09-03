"use client";

/**
 * /about — on the v2 kit (components/v2/sasonix/*).
 *
 * Copy is carried over verbatim from the previous version. It is the only page that
 * states the mission and the founder's background in full, and the founder facts are
 * mirrored in the PersonSchema JSON-LD in page.tsx, so the two must stay in step.
 *
 * House rules that bite on this page specifically: Delta is "it", never she or her;
 * no em dashes; a human on the firm's team reviews before anything leaves the firm,
 * so nothing here may imply autonomy; and no claim that data never reaches a third
 * party, because prod runs on enterprise AI under zero-retention and BAA terms.
 *
 * The early-stage section stays. Saying plainly that the product is early is what
 * makes the founding-firm offer credible, and dressing it up would cost more than
 * it buys.
 */
import { SX } from "@/components/v2/sasonix/tokens";
import { PageShell } from "@/components/v2/sasonix/PageShell";
import { PageHero, Container, SectionHead, Prose } from "@/components/v2/sasonix/kit";
import { Reveal } from "@/components/v2/sasonix/reveal";

const MISSION_PARAS = [
  "A growing firm does not lose cases because the lawyers are not good enough. It loses them because there are not enough hours, and not enough people, to keep every matter moving at once. The next hire is months away and expensive. The work does not wait.",
  "We build CaseDelta so a small firm can carry the caseload of a much bigger one without adding headcount. Delta is an AI teammate that works inside the tools a firm already uses and takes on the routine case work, the records requests, the drafting, the file updates, the deadline tracking. The firm runs more matters, and nothing slips through the cracks.",
];

const PROBLEM_PARAS = [
  "Talk to a growing plaintiff firm and the same picture appears every time. The case lives across five or six systems: the case manager, email, the drive, the calendar, billing. No single tool holds the whole matter, so the work of stitching them together falls on people, and those are exactly the people a firm cannot hire fast enough.",
  "When that stitching slips, the cost is not abstract. A missed deadline is a bar complaint. A dropped follow-up is a lost fee. The firm is one forgotten task away from real harm, and the only lever it has is to work its team harder.",
  "Delta is the teammate that keeps everything moving. It sees across the whole stack, does the routine work end to end, and flags what is about to slip before it becomes a problem. So the firm grows on the caseload, not on the payroll.",
];

const BELIEFS = [
  {
    t: "A teammate, not another tool.",
    d: "Delta is meant to take work off the desk the way a good hire would, not to add one more app to check. You delegate to it in plain English, and it does the job inside the systems you already have.",
  },
  {
    t: "Operate the firm's tools, do not replace them.",
    d: "A firm already chose its case manager, its email, its drive. Delta works inside that stack. No migration, no rip-out, nothing new for the team to learn on day one.",
  },
  {
    t: "A human keeps a hand on the wheel.",
    d: "Delta drafts, gathers, and updates, but a person on the team reviews and approves before anything leaves the firm. The judgment stays with the lawyer, always.",
  },
  {
    t: "Held to the standard the work demands.",
    d: "Client matters carry a duty of confidentiality and often protected health information. Delta treats that data to the standard the bar and HIPAA require: encrypted, access-controlled, never used to train a model, with a BAA available.",
  },
];

const FOUNDER_CREDS = [
  "Vanderbilt University",
  "Computer Science & Applied Mathematics",
  "2.5 years at Capital One",
  "Kansas City Metropolitan Bar Association",
];

const FOUNDER_PARAS = [
  "CaseDelta started after months of customer discovery with practicing attorneys at plaintiff firms. The same finding kept surfacing: a personal injury, medical malpractice, employment, or mass tort firm runs on a stack of five or six tools, and every workflow means switching between them by hand.",
  "Every legal AI on the market lived inside one of those tools and asked the firm to adopt yet another platform. None of them ran across the firm's actual workflow. That gap became CaseDelta.",
  "Before CaseDelta, Camren spent two and a half years at Capital One building data systems that power real-time financial decisions at scale. That experience shapes how Delta is built: a single conversation runs work across many systems, with security and reliability treated as architecture, not policy.",
];

const EARLY_PARAS = [
  "CaseDelta is early, and we would rather say that plainly than dress it up. Being early is exactly why a founding firm has leverage a later customer will not.",
  "Your cases shape how Delta learns the work. Your feedback sets what we build next. And your pricing is locked in as a founding partner, on terms the next firm will not get. You are not buying a finished product off a shelf. You are helping shape the teammate your firm will rely on.",
];

export function AboutContent() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About CaseDelta"
        title="The capacity of a bigger team, without the hire"
        sub="We build Delta, an AI teammate that works inside the tools a firm already uses and handles the routine case work, so a growing firm can run more matters without adding headcount and nothing slips."
      />

      {/* MISSION */}
      <section style={{ background: SX.bg, padding: "60px 0" }}>
        <Container>
          <Reveal>
            <SectionHead
              title="Give a small firm the reach of a much bigger one"
              titleMaxW={720}
            />
          </Reveal>
          <Reveal delay={0.08} style={{ marginTop: 36 }}>
            <Prose>
              {MISSION_PARAS.map((p) => <p key={p}>{p}</p>)}
            </Prose>
          </Reveal>
        </Container>
      </section>

      {/* WHY WE EXIST */}
      <section style={{ background: SX.bgAlt, padding: "80px 0" }}>
        <Container>
          <div className="sx-about-two" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "start" }}>
            <Reveal>
              <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 38, lineHeight: "44px", letterSpacing: "-1px", color: SX.ink, margin: 0 }}>
                A firm&rsquo;s work lives across five systems
              </h2>
              <p style={{ fontFamily: SX.body, fontSize: 17, lineHeight: "28px", color: SX.ink2, margin: "18px 0 0" }}>
                The stitching-together falls on people you cannot hire fast enough, and every gap between the tools is a chance for something to slip.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Prose style={{ maxWidth: "none", margin: 0 }}>
                {PROBLEM_PARAS.map((p) => <p key={p}>{p}</p>)}
              </Prose>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHAT WE BELIEVE */}
      <section style={{ background: SX.bg, padding: "80px 0" }}>
        <Container>
          <Reveal>
            <SectionHead
              title="How we build Delta"
              sub="Four convictions shape every decision, from how Delta connects to a firm's tools to how it handles a client's most sensitive files."
            />
          </Reveal>
          <div className="sx-belief-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 48 }}>
            {BELIEFS.map((b, i) => (
              <Reveal
                key={b.t}
                delay={0.05 * i}
                style={{ background: SX.surface, border: `1px solid ${SX.hairline}`, borderRadius: 16, padding: "30px 28px 32px" }}
              >
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: SX.accentSoft, marginBottom: 18 }}>
                  <Check />
                </span>
                <h3 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 21, lineHeight: 1.24, letterSpacing: "-0.4px", color: SX.ink, margin: 0 }}>{b.t}</h3>
                <p style={{ fontFamily: SX.body, fontSize: 15.5, lineHeight: "25px", color: SX.ink2, margin: "12px 0 0" }}>{b.d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FOUNDER */}
      <section style={{ background: SX.bgAlt, padding: "80px 0" }}>
        <Container>
          <div className="sx-founder-grid" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 56, alignItems: "start" }}>
            <Reveal>
              <div style={{ width: 84, height: 84, borderRadius: "50%", background: `linear-gradient(150deg, ${SX.accent}, ${SX.accentDeep})`, display: "grid", placeItems: "center", marginBottom: 22 }}>
                <span style={{ fontFamily: SX.body, fontSize: 25, fontWeight: 600, color: SX.onAccent, letterSpacing: "0.02em" }}>CH</span>
              </div>
              <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 32, lineHeight: 1.14, letterSpacing: "-0.8px", color: SX.ink, margin: 0 }}>Camren Hall</h2>
              <p style={{ fontFamily: SX.body, fontSize: 14.5, fontWeight: 500, letterSpacing: "0.2px", color: SX.ink3, margin: "8px 0 26px" }}>Founder &amp; CEO</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {FOUNDER_CREDS.map((c) => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: SX.accent, flex: "0 0 auto" }} />
                    <span style={{ fontFamily: SX.body, fontSize: 14.5, color: SX.ink2, lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <Prose style={{ maxWidth: "none", margin: 0 }}>
                {FOUNDER_PARAS.map((p) => <p key={p}>{p}</p>)}
              </Prose>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHERE WE ARE */}
      <section style={{ background: SX.bg, padding: "80px 0 60px" }}>
        <Container>
          <Reveal>
            <SectionHead title="We are early, and that is the offer" titleMaxW={640} />
          </Reveal>
          <Reveal delay={0.08} style={{ marginTop: 36 }}>
            <Prose>
              {EARLY_PARAS.map((p) => <p key={p}>{p}</p>)}
              <p>
                <a href="/demo">Become a founding firm</a>
              </p>
            </Prose>
          </Reveal>
        </Container>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .sx-about-two { grid-template-columns: 1fr !important; gap: 32px !important; }
          .sx-belief-grid { grid-template-columns: 1fr !important; }
          .sx-founder-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </PageShell>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
