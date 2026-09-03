"use client";

/**
 * Why Delta is different, said by naming the field rather than gesturing at it.
 *
 * THE HEADING MAKES TWO CLAIMS, not three. It signs in to the systems the firm
 * already runs, and it is working the firm's case five minutes later.
 *
 * A third clause, "can work without being prompted", sat between them until
 * 2026-09-02, when Camren cut it. Two claims land; three is a list, and the reader
 * stops counting. AutomationSection still describes the capability, so it is not
 * gone from the page; it stopped being one of the two things this heading says.
 *
 * Three earlier wordings and why each moved: "live in five minutes" is a claim about
 * our onboarding rather than about the firm's day, and being live is our milestone
 * while work coming back is theirs; "paralegal work" boxed Delta into one job title,
 * the same reason the thesis stopped calling it an AI paralegal; "real work" fixed
 * that and said nothing, because all work is real. Naming the CASE is what makes the
 * claim concrete.
 *
 * IF THE CLAUSE EVER COMES BACK, anywhere, it comes back as "CAN work without being
 * prompted" and never as "works without being prompted" (Camren, 2026-08-28). An
 * assistant that simply acts on its own reads as a liability to a lawyer who is
 * personally responsible for the file; capability the firm switches on is the
 * selling point. And PROMPTED, never "asked": "asked" is what you do to a person and
 * makes it sound like Delta is being managed, where "prompted" is what you do to
 * software and names the thing every other tool requires.
 *
 * THE CLAIMS CARD IS GONE (Camren, 2026-09-02). An accent-ringed panel sat under the
 * heading with the CaseDelta mark and four ticks: signs in to any platform, can work
 * without being prompted, working your case in five minutes, cites every answer. It
 * restated the heading directly above it and then answered the comparison before the
 * comparison had been made, so the section said the same thing three times. The
 * heading makes the claim and the named rivals prove it; the card was the middle
 * step that did neither.
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
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Rules } from "./Rules";
import { Reveal } from "./reveal";

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

export function WhySasonix() {
  return (
    <section id="why" style={{ position: "relative", background: SX.surface, padding: "60px 0 60px" }}>
      <Rules />
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
        /* SAME SIZE AS THE h2 UNDER IT (Camren, 2026-09-02). Every value here is
           SectionHead's heading, copied deliberately: 48px on a 55.2px line at
           -1px, weight 500. The two blocks are meant to read as one heading in
           two beats, the question and then the answer, so neither may be set
           smaller than the other. If SectionHead's scale changes in kit.tsx,
           change this with it; there is no shared token for it yet.

           It stays a <p> and not an <h2>. It is a lead-in to the heading, not a
           second heading, and a section with two h2s is a broken outline no
           matter how the two look on screen. */
        .sx-why-setup {
          max-width: 900px;
          margin: 0 auto 22px;
          text-align: center;
          font-family: var(--sx-archivo), 'Archivo Placeholder', sans-serif;
          /* 500, never 400: app/fonts/archivo-400.woff2 is a slanted cut. */
          font-weight: 500;
          font-size: 48px;
          line-height: 55.2px;
          letter-spacing: -1px;
          color: var(--sx-ink-3);
        }
        /* Same size, different ink. With the size hierarchy gone this is the only
           thing left separating the setup from the question inside it, and the
           question is the half the reader is meant to carry into the claim. */
        .sx-why-setup span { color: var(--sx-ink); }
        @media (max-width: 760px) {
          .sx-why-setup { font-size: 32px; line-height: 38px; letter-spacing: -0.6px; }
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
          .sx-rival { grid-template-columns: 116px minmax(0, 1fr); gap: 6px 22px; }
          .sx-rival-name { grid-row: span 2; }
        }
        @media (max-width: 639px) {
          .sx-why-lead { margin-top: 40px; }
          .sx-rival { grid-template-columns: minmax(0, 1fr); gap: 4px; padding: 20px 2px; }
          .sx-rival-name { grid-row: auto; }
        }
      `}</style>
    </section>
  );
}
