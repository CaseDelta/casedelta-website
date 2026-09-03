"use client";

/**
 * Why Delta is different, said by naming the field rather than gesturing at it.
 *
 * THE HEADING MAKES TWO CLAIMS, not three. It signs in to the systems the firm
 * already runs, and it is working the firm's case five minutes later.
 *
 * A third clause, "can work without being prompted", sat between them until
 * 2026-09-02, when Camren cut it. Two claims land; three is a list, and the reader
 * stops counting. The capability itself is not gone: it is still a bullet in the
 * claims card below and still described in AutomationSection. It just stopped being
 * one of the two things this heading exists to say.
 *
 * Three earlier wordings and why each moved: "live in five minutes" is a claim about
 * our onboarding rather than about the firm's day, and being live is our milestone
 * while work coming back is theirs; "paralegal work" boxed Delta into one job title,
 * the same reason the thesis stopped calling it an AI paralegal; "real work" fixed
 * that and said nothing, because all work is real. Naming the CASE is what makes the
 * claim concrete.
 *
 * IF THE CLAUSE EVER COMES BACK, it comes back as "CAN work without being prompted"
 * and never as "works without being prompted" (Camren, 2026-08-28). An assistant
 * that simply acts on its own reads as a liability to a lawyer who is personally
 * responsible for the file; capability the firm switches on is the selling point.
 * And PROMPTED, never "asked": "asked" is what you do to a person and makes it sound
 * like Delta is being managed, where "prompted" is what you do to software and names
 * the thing every other tool requires. The same two rules govern the bullet in
 * CLAIMS below, which still carries the claim today.
 *
 * THERE IS NO "OTHER LEGAL AI" COLUMN ANY MORE. It used to be a generic third
 * column of crosses, which is the weakest form this section can take: a reader
 * discounts an unnamed strawman instantly, and every prospect already has specific
 * names in mind. So the comparison names them. Delta states what it does, once, and
 * each competitor gets one line of what it is and one line of the difference.
 *
 * EVERY COMPETITOR LINE IS SOURCED FROM lib/comparisons.ts, where the house rules
 * live: only what a competitor says on its own site or a credible third party,
 * security treated as PARITY, and differentiation on SHAPE rather than on quality.
 * Do not add a name here without adding it there first, and do not sharpen a line
 * past what that file supports.
 *   EvenUp, Supio, Eve  -> their own comparison pages, verified June 2026.
 *   Claude              -> the verified ChatGPT row applies unchanged: a general
 *                          assistant has no access to the firm's client or systems.
 *   Filevine            -> framed as the verified Clio row is framed, a case system
 *                          Delta signs INTO rather than a rival. It is one of our
 *                          largest integration targets; what we differ from is its
 *                          AI's reach, not the platform.
 *
 * NO COMPETITOR LOGOS, and no crosses against their names. Their marks are their
 * trademarks and we do not hold the assets, and a wall of red crosses next to real
 * companies invites a fight over every cell. Names set in our own type, with one
 * sourced sentence each, is both more defensible and quieter.
 *
 * THE DELTA MARK IS THE REAL FILE. This column header carried a hand-drawn
 * three-triangle SVG inherited from the Sasonix template, which was a fabricated
 * logo sitting on the homepage. Camren's rule: always the real logo, never a faked
 * one. The same fake mark is still in Integrations.tsx, which is unmounted.
 *
 * THE ID IS "why", NOT "security". It carried id="security" while it sat unmounted,
 * which collided with the Trust band the moment it was mounted again and would have
 * stolen the nav's Security link.
 */
import Image from "next/image";
import { SX } from "./tokens";
import { LOGO, logoWidth } from "./brand";
import { Container, SectionHead } from "./kit";
import { Reveal } from "./reveal";

/** What Delta does. The three the heading claims, plus the context they are for. */
const CLAIMS = [
  "Signs in to any platform your firm runs, even ones with no API",
  "Can work without being prompted, on a schedule you set",
  "Working your case in five minutes. No IT team, no migration",
  "Cites every answer back to the source",
];

/**
 * The named field. `what` is what the product is, in its own framing; `diff` is the
 * difference. Both trace to lib/comparisons.ts.
 */
const RIVALS: { name: string; what: string; diff: string }[] = [
  { name: "EvenUp", what: "A place you send a case to get a demand back.", diff: "Delta works the whole matter, in the tools you already run." },
  { name: "Supio", what: "Strong chronologies, on a human review queue.", diff: "Delta does the whole job across your tools, in minutes." },
  { name: "Eve", what: "A platform your firm moves into.", diff: "Delta drives the tools your firm already has." },
  { name: "Filevine", what: "Your case system. Its AI sees what is inside Filevine.", diff: "Delta signs in to Filevine and works across everything else too." },
  { name: "Claude", what: "Knows the law in general.", diff: "Delta knows your client, your file, and what you decided last week." },
];

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: 3 }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/** Bigger and centred (Camren, 2026-08-28). At 26px it read as a footnote on the
 *  card it is supposed to be heading. */
const MARK_H = 44;

export function WhySasonix() {
  return (
    <section id="why" style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <Container>
        {/* THE SETUP, THEN THE ANSWER. Camren's line, 2026-09-02, kept verbatim.
            It poses the question this whole section exists to answer, so it sits
            above the claim rather than below it: the reader arrives at "no other
            legal AI signs in to your systems" already asking why that matters.

            It is deliberately NOT the h2. The question is the better hook, but
            the claim underneath it is the differentiator and the thing worth
            being a heading. Setting the question smaller and lighter makes the
            claim land as the answer instead of competing with it. */}
        <Reveal>
          <p className="sx-why-setup">
            Your case info doesn&rsquo;t just live in one system.{" "}
            <span>So why would you use an AI that only sees one part of the entire picture?</span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <SectionHead
            title="No other legal AI signs in to your systems and is working your case in five minutes."
            titleMaxW={900}
          />
        </Reveal>

        {/* What Delta does, stated once and on its own, rather than as a column
            fighting a strawman. The accent ring is the only highlight in the
            section, so the eye starts here and reads down into the names. */}
        <Reveal amount={0.2} className="sx-why-card">
          <div className="sx-why-mark">
            <Image src={LOGO.onLight} alt="CaseDelta" width={logoWidth(MARK_H)} height={MARK_H} style={{ display: "block", height: MARK_H, width: "auto" }} />
          </div>
          <ul className="sx-why-claims">
            {CLAIMS.map((c) => (
              <li key={c}>
                <Check />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal amount={0.15} delay={0.05}>
          <p className="sx-why-lead">How that compares to what else you are looking at</p>
          <ul className="sx-rivals">
            {RIVALS.map((r) => (
              <li key={r.name} className="sx-rival">
                <span className="sx-rival-name">{r.name}</span>
                <span className="sx-rival-what">{r.what}</span>
                <span className="sx-rival-diff">{r.diff}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <style>{`
        .sx-why-setup {
          max-width: 740px;
          margin: 0 auto 26px;
          text-align: center;
          font-family: var(--sx-archivo), 'Archivo Placeholder', sans-serif;
          /* 500, never 400: app/fonts/archivo-400.woff2 is a slanted cut. */
          font-weight: 500;
          font-size: 25px;
          line-height: 34px;
          letter-spacing: -0.5px;
          color: var(--sx-ink-3);
        }
        /* The question carries the weight; the statement in front of it is setup. */
        .sx-why-setup span { color: var(--sx-ink); }
        @media (max-width: 760px) {
          .sx-why-setup { font-size: 20px; line-height: 28px; }
        }

        .sx-why-card {
          max-width: 940px;
          margin: 56px auto 0;
          border: 2px solid var(--sx-accent);
          background: var(--sx-accent-soft);
          border-radius: 20px;
          padding: 34px 38px 30px;
        }
        .sx-why-mark { display: flex; justify-content: center; margin-bottom: 30px; }

        .sx-why-claims {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px 40px;
        }
        .sx-why-claims li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 17px;
          line-height: 26px;
          color: var(--sx-ink);
        }

        .sx-why-lead {
          max-width: 940px;
          margin: 56px auto 0;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--sx-ink-3);
        }

        .sx-rivals {
          list-style: none;
          max-width: 940px;
          margin: 18px auto 0;
          padding: 0;
        }
        .sx-rival {
          display: grid;
          grid-template-columns: 132px minmax(0, 1fr) minmax(0, 1fr);
          gap: 28px;
          align-items: baseline;
          padding: 22px 4px;
          border-top: 1px solid var(--sx-hairline);
        }
        .sx-rival:last-child { border-bottom: 1px solid var(--sx-hairline); }
        .sx-rival-name {
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.2px;
          color: var(--sx-ink);
        }
        .sx-rival-what {
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 16px;
          line-height: 25px;
          color: var(--sx-ink-2);
        }
        /* The difference carries the accent, so the eye can read only this column
           straight down the list and still take the whole argument. */
        .sx-rival-diff {
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 16px;
          line-height: 25px;
          font-weight: 500;
          color: var(--sx-accent-text);
        }

        @media (max-width: 860px) {
          .sx-why-claims { grid-template-columns: minmax(0, 1fr); gap: 14px; }
          .sx-rival { grid-template-columns: 116px minmax(0, 1fr); gap: 6px 22px; }
          .sx-rival-name { grid-row: span 2; }
        }
        @media (max-width: 639px) {
          .sx-why-card { padding: 26px 22px 24px; margin-top: 40px; }
          .sx-why-mark img { height: 34px !important; }
          .sx-why-claims li { font-size: 16px; line-height: 25px; }
          .sx-why-lead { margin-top: 40px; }
          .sx-rival { grid-template-columns: minmax(0, 1fr); gap: 4px; padding: 20px 2px; }
          .sx-rival-name { grid-row: auto; }
        }
      `}</style>
    </section>
  );
}
