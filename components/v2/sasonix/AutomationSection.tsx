"use client";

/**
 * "What Delta is": the thesis line, then three stacked capability cards. The third
 * one carries automations, moved up from the pricing section on 2026-08-28: pricing
 * is where a reader works out what it costs, not where they find out what it does. Each card
 * is a 50/50 split: left is a 54px icon chip, an Archivo 32px heading, the claim in
 * prose and a three-item checklist; right is an ambient photograph with a product
 * panel floating over the seam between the halves.
 *
 * THE PANELS ARE DRAWN IN CODE, in ProductPanels.tsx. They used to be the Sasonix
 * template's stock product shots, which showed a database schema of order_id and
 * products.id, a token-usage bar chart naming four foundation models, and a tile
 * counting API credits. That artwork survived the clone-fidelity phase, the rebrand
 * from orange to blue, and the promotion of this page to the homepage, illustrating
 * a developer SaaS on the largest section of a site that sells to personal injury
 * firms. Do not reintroduce stock product imagery here: if a panel needs to change,
 * it is a React component and it is edited as one.
 *
 * THE PHOTOGRAPHS are the site's own ambient set, self-hosted in /v2/ambient. The
 * three warm desert and Yosemite shots that used to sit here came with the template
 * and fought the blue brand; the ambient set is the one coherent family across the
 * hero, this section and the two banded sections. Pick ones not already spoken for:
 * mountain is the hero, water-dark is HowItWorks, forest-dark is Trust.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";
import { HubSpokes } from "./HubSpokes";
import { ComputerPanel, MemoryPanel, ProductPanelStyles, TeammatePanel } from "./ProductPanels";

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconChip({ path }: { path: React.ReactNode }) {
  return (
    <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, borderRadius: 12, background: SX.surface, border: `1px solid ${SX.hairline}` }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{path}</svg>
    </span>
  );
}

const ICONS = [
  <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6v6H9z" /></>,
  <><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="18" cy="17" r="2.5" /></>,
  <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>,
];

/**
 * REAL AUTOMATIONS, FROM REAL FIRMS. Not one is illustrative, and the value of the
 * card is that a reader can tell. "Automates your intake" is worth nothing to someone
 * who has heard it from six vendors.
 *
 * EACH ONE NAMES ITS TRIGGER AND ITS SYSTEM, and that is a correction (Camren,
 * 2026-08-28). The first pass was written in the shorthand the firms themselves use:
 * "flag more than two claimants against a limited policy", "work the mailroom faxes
 * at ten, one and four", "fill in the settlement row when the sheet lands". Every one
 * of those is true and precise, and every one is opaque to a reader who has not sat
 * in the firm. A line here has to say what starts it and where the work lands, or it
 * is decoration. Keep the shape: trigger, then what Delta does, then where.
 *
 * NAMING FILEVINE AND OUTLOOK IS DELIBERATE and is not the vendor-logo rule being
 * broken. That rule (see HowItWorks) bars a LOGO WALL, because a row of marks implies
 * a fixed integration list when the claim is the opposite. A named system inside a
 * concrete example does the reverse: it is evidence the work is real. Both names are
 * grounded, not chosen for recognition.
 *
 * SOURCES, so nobody softens these back into marketing:
 *   Holston & Huntley, from Camren's 2026-08-17 email to Sidney Howell offering to
 *   build one before they paid a cent: scanned mail out of Outlook filed to the right
 *   matter with the task opened, and surgery or an injection in the notes checked
 *   against the limits while the file is still awaiting records and bills.
 *
 *   Auto Injury Firm, from the 2026-08-11 intake-handoff thread and the 2026-08-27
 *   call summary to Jared Colcord: the new-client email that becomes a text to the
 *   attorney's cell before they ring the client, and settlement sheets that fill the
 *   matter's settlement figures with the totals reconciled against the client's net.
 *
 * FOUR, AND SHORT. The card is a FIXED 654px on desktop with overflow hidden, so a
 * line too long does not push the card taller, it disappears. The first pass at these
 * named the systems and ran to two lines each, which clipped the fourth example off
 * the bottom of the card with no error anywhere. Keep each one to a single line at
 * 1280px. If a fifth is ever added, one has to leave. Others that are real and could

 * rotate in: police reports flagged when more than two
 * claimants sit against a limited policy, the mailroom fax runs at ten, one and four,
 * client texts nobody has answered drafted in the attorney's own voice from his sent
 * messages, and a callback reminder texted ten minutes before the window the client
 * asked for.
 */
const AUTOMATIONS = [
  "A client signs: text the attorney a brief before they call",
  "Read new records in Filevine, flag the file when it is demand-ready",
  "File the mail from Outlook on the matter and open the task",
  "Fill in a settlement sheet's figures and check they reconcile",
];

type Card = { heading: string; sub: string[]; checks: string[]; photo: string; panel: React.ReactNode };

const CARDS: Card[] = [
  {
    heading: "Run the firm like there are two of you",
    sub: [
      "Ask about any part of the practice and get an answer, not a dashboard.",
      "Financials, case status, and the state of every open matter.",
    ],
    checks: ["Firm financials", "Case status", "Firm-wide overview", "Case management"],
    photo: "/v2/ambient/horizon-blue.webp",
    panel: <ComputerPanel />,
  },
  {
    heading: "Every system, one place",
    sub: [
      "Intake and case management, whatever platform they live on.",
      "Delta signs in and works there. A new system takes about five minutes and no engineer.",
    ],
    checks: ["Intake and case management", "Any platform, even with no API", "Connected in five minutes"],
    photo: "/v2/ambient/valley-mist.webp",
    panel: <TeammatePanel />,
  },
  {
    heading: "Set it running in the background",
    sub: [
      "Tell Delta what to watch for and what to do about it, in plain English. No builder, no rules engine.",
      "It runs on your cases without being prompted again, and stops for your approval wherever you want it to.",
      "Four that real firms asked us for:",
    ],
    checks: AUTOMATIONS,
    photo: "/v2/ambient/meadow-light.webp",
    panel: <MemoryPanel />,
  },
];


/**
 * SPLIT IN TWO on 2026-09-02 (Camren): the thesis and the capability cards used to
 * be one section, and a testimonial now sits between them. Recker's quote answers
 * "does it really do that" while the claim is still on screen, before the reader has
 * been walked through the three things it does.
 *
 * They are two exported sections rather than one section with a quote rendered
 * inside it, so Sasonix.tsx stays the page's table of contents. A section that
 * secretly contains another page beat is a section you cannot reorder.
 *
 * The anchor stays on the THESIS. "What it does" in the nav should land on the
 * claim, not on the first card.
 */
export function AutomationThesis() {
  return (
    <section id="features" style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <Container>
        {/* THE DARK CARD LIVES HERE NOW (Camren, 2026-09-02). It was around the
            Stakes sentence with a stack of records beside it. Both moved: this is
            the sentence a picture can actually illustrate, because "in the systems
            your firm already uses" is a claim about SHAPE, and a hub is that shape.
            The problem statement went back to standing on its own.

            Taller than the card it came from, 256 to 520, because it now holds a
            heading, four capabilities, a closing line and a 420px diagram rather
            than two lines of type.

            The definition is still the one place on the page that states the whole
            product in a breath. It is left-aligned rather than centred now, because
            it shares the card with the diagram. */}
        <Reveal>
          <div className="sx-thesis-card">
            <span aria-hidden className="sx-thesis-ellipse" />
            <div className="sx-thesis-copy">
          {/* TWO READS AND ONE WRITE. Every legal AI can read. Writing back into
              the system of record is the thing almost none of them do, and three
              reads in a row describe a chatbot, so the last example is
              unmistakably a write.

              THE OPENING NAMES DELTA FIRST. "Hand off work to Delta, like ..."
              led with the instruction; "Delta is the AI you can hand real work
              to, like ..." leads with what it is, then earns the claim with three
              examples. "REAL work" is the load-bearing word: it is the answer to
              what every reader already assumes, which is that this is another
              chatbot that drafts a paragraph.

              THEY ARE VERBS, NOT NOUNS. This read "like the cases missing an SOL
              date" until Camren caught it: you do not hand off a noun. You hand
              off a job, and "the cases missing an SOL date" is the ANSWER to a
              job, not the job. Gerunds fix it and keep the three parallel, so
              each one is something a person could actually be asked to go do.

              THEN CUT FOR LENGTH, also Camren. Four words went: "every case
              missing an SOL date" to "a missing SOL", "chasing down" to
              "chasing", and "a full file review straight into" to "a file review
              into". Nothing load-bearing left with them. "The money" stays,
              because it is the word that makes that example about money, and
              "into Filevine" stays, because it is the word that makes the third
              one a write. Trim around those two, never through them.

              Each also has to land as "that takes me hours", "that is how I get
              sued", or "that is my money". All three are Rudin Law's real
              production usage, 2026-08-19 to 09-02:

                finding a missing SOL      READ, RISK. The malpractice one. Delta
                                           reads their `SOL Field Empty` report,
                  and on 2026-09-02 it cross-checked the 351-row whole-docket
                  report and found a litigation matter their own saved report had
                  MISSED. A blank SOL field is how a firm loses a case it won.

                chasing money stuck        READ, MONEY. Josh's "reverse docket
                in disbursement            cashflow analysis": what is settled and
                  pending disbursement and what is holding it up. Also what
                  Poletti's testimonial further down this page is about, so the
                  page argues it twice, once in the firm's words and once in a
                  customer's.

                writing a file review      WRITE, TIME. "File review" is their
                into Filevine              exact phrase, 14 threads, and Josh's
                                           version is a stored template Delta
                  fills and then writes INTO THE CASE DESCRIPTION FIELD. The write
                  example is a job they already ask for that already ends in a
                  write, rather than one invented to have a write on the list.

              Filevine is named on purpose even though Delta reaches nine systems
              at this firm. A named system is a claim a reader can check; "your
              case system" is a hedge. The second paragraph and the hub beside it
              do the generalising, which is the division of labour between them.

              STILL UNSHIPPED, and it is the strongest thing in the data: the
              pattern the firm calls "dry run", typed 10 times. Spreadsheet with
              nothing applied, they review it, then Delta writes the approved rows
              back into Filevine. On 2026-09-01 it wrote 34 dates back and re-read
              every one to confirm. It is also where the approval promise belongs,
              which nothing on this card currently makes. */}
          <h2 className="sx-thesis">
            Delta is the AI you can hand real work to, like finding a missing SOL, chasing money stuck in
            disbursement, or writing a file review into Filevine.
          </h2>
          {/* Camren's line, verbatim, and at the SAME SIZE as the paragraph above
              it. That is the point of it: the first paragraph is three specifics,
              and this one says the specifics are not the limit. Set smaller it
              would read as a caption on the examples, which is the opposite.

              A <p> and not a second <h2>. Two h2s in a section is a broken
              document outline however the two look on screen; the size makes them
              equal to the eye, and the markup keeps the outline honest. */}
          <p className="sx-thesis-close">
            Whatever you need done, Delta does it in any system your firm uses.
          </p>
          {/* The rest of the same statement, set smaller. It is one thought with the
              line above and reads as one, but at 44px the whole thing runs eight lines
              and stops being a statement. The definition keeps display scale; the list
              of what that means in practice supports it. */}
            </div>
            <HubSpokes />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** The three capability cards. The "value props", in Camren's words. */
export function AutomationCards() {
  return (
    <section style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <ProductPanelStyles />
      <Container>
        <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
          {CARDS.map((c, i) => (
            <Reveal key={c.heading} amount={0.2} className="sx-cap-card" style={{ position: "relative", background: SX.surfaceAlt, borderRadius: 22, border: "1px solid rgba(var(--sx-shadow-rgb), 0.10)", boxShadow: "0 1px 3px rgba(var(--sx-shadow-rgb), 0.04)", overflow: "hidden" }}>
              {/* left text */}
              <div className="sx-cap-copy">
                <IconChip path={ICONS[i]} />
                <h3 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 32, lineHeight: "38.4px", letterSpacing: "-0.5px", color: SX.ink, margin: "28px 0 0", maxWidth: 410 }}>{c.heading}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "16px 0 0", maxWidth: 380 }}>
                  {c.sub.map((line) => (
                    <p key={line} style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: 0 }}>{line}</p>
                  ))}
                </div>
                <div className="sx-cap-checks">
                  {c.checks.map((ck) => (
                    <span key={ck} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}><Check />{ck}</span>
                  ))}
                </div>
              </div>
              {/* right photo + panel */}
              <div className="sx-cap-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.photo} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                {c.panel}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        /* Two halves at full width; the panel floats over the seam between them.
           The fixed height is what lets the checklist sit on the card's floor and
           the photo fill its half edge to edge. */
        .sx-cap-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 654px;
        }
        .sx-cap-copy { padding: 56px 40px 56px 32px; display: flex; flex-direction: column; }
        .sx-cap-checks { margin-top: auto; display: flex; flex-direction: column; gap: 14px; }
        .sx-cap-media { position: relative; overflow: hidden; }

        /* Below the split the card STACKS: copy first, then the photo with the panel
           centred in it. The card's height goes to auto, because a fixed 654 with one
           column crushed the copy and clipped it mid-sentence, which is how this
           section rendered on every phone until 2026-08-27.

           position: RELATIVE, not static, and this is not cosmetic. The backdrop
           photograph is position: absolute in the same box, and an absolutely
           positioned element paints above every non-positioned sibling, so a static
           panel here renders completely behind the photo: the whole panel disappears
           and only its SVG glyphs show through. It looked like the panel had failed to
           render. Keep the panel positioned and keep it above the photo. */
        @media (max-width: 1040px) {
          .sx-cap-card { grid-template-columns: 1fr; height: auto; }
          .sx-cap-copy { padding: 40px 32px 36px; }
          .sx-cap-checks { margin-top: 28px; }
          .sx-cap-media { min-height: 0; padding: 44px 0; }
          .sx-panel-float {
            position: relative;
            z-index: 1;
            top: auto;
            left: auto;
            transform: none;
            display: flex;
            justify-content: center;
          }
        }

        /* Narrower than the panel's own 434px, so it is zoomed rather than reflowed:
           the layout inside it is tuned at that width and squeezing it breaks the form
           grid and the chat bubble. zoom, not transform: scale, because zoom shrinks
           the box the panel occupies, and a scale would leave its original height
           behind as a band of empty photograph. */
        @media (max-width: 520px) {
          .sx-cap-copy { padding: 32px 22px 30px; }
          .sx-cap-media { padding: 34px 0; }
          .sx-panel-float { zoom: 0.88; }
        }
        @media (max-width: 460px) { .sx-panel-float { zoom: 0.72; } }
        @media (max-width: 400px) { .sx-panel-float { zoom: 0.64; } }

        /* Was .sx-thesis-icp, a one-line "purpose-built for personal injury, mass
           tort, and medical malpractice firms" qualifier. That line is gone as of
           2026-08-28 and this slot now carries the back half of the thesis, so it is
           wider and a size up: it is content, not a caption. */




        /* The card. Same geometry language as the one it replaced: radius 24,
           overflow hidden so the ellipse is cut by the frame, and surfaceInverse
           rather than a colour literal so it follows the palette. */
        .sx-thesis-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          padding: 64px;
          background: var(--sx-surface-inverse);
          min-height: 520px;
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .sx-thesis-copy { position: relative; z-index: 2; flex: 1 1 auto; }
        .sx-thesis-ellipse {
          position: absolute;
          left: -18%;
          top: -320px;
          width: 1053px;
          height: 1053px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.07);
          pointer-events: none;
          z-index: 0;
        }
        @media (max-width: 980px) {
          .sx-thesis-card { flex-direction: column; align-items: stretch; padding: 44px 32px; gap: 24px; min-height: 0; }
        }
        @media (max-width: 620px) {
          .sx-thesis-card { padding: 34px 22px; border-radius: 18px; }
        }


        /* Deliberately the same scale as .sx-thesis. If one changes, change both:
           they are one statement in two beats and a size gap turns the second into
           a caption. */
        .sx-thesis-close {
          max-width: 640px;
          margin: 26px 0 0;
          text-align: left;
          font-family: var(--sx-archivo), sans-serif;
          font-weight: 500;
          font-size: 38px;
          line-height: 48px;
          letter-spacing: -1px;
          color: var(--sx-on-media-muted);
          text-wrap: balance;
        }
        @media (max-width: 1100px) { .sx-thesis-close { font-size: 32px; line-height: 42px; } }
        @media (max-width: 760px)  { .sx-thesis-close { font-size: 26px; line-height: 35px; letter-spacing: -0.6px; margin-top: 20px; } }

        .sx-thesis {
          max-width: 640px;
          margin: 0;
          text-align: left;
          font-family: var(--sx-archivo), sans-serif;
          font-weight: 500;
          font-size: 38px;
          line-height: 48px;
          letter-spacing: -1px;
          color: var(--sx-on-media);
          text-wrap: balance;
        }
        @media (max-width: 1100px) { .sx-thesis { font-size: 32px; line-height: 42px; } }
        @media (max-width: 760px)  { .sx-thesis { font-size: 26px; line-height: 35px; letter-spacing: -0.6px; } }
      `}</style>
    </section>
  );
}
