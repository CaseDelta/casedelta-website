"use client";

/**
 * The closing proof, immediately before the CTA: it takes five minutes to connect,
 * and here is a firm it is already working for.
 *
 * WHY THIS SECTION EXISTS. The last objection before someone books is not "does it
 * work", it is "what does this cost me to try". Everything above argues capability;
 * this answers effort. Placing it last is deliberate: onboarding is a reason to say
 * yes at the end, and an interruption in the middle.
 *
 * It replaced the full HowItWorks band on the homepage on 2026-08-28. That band ran
 * three numbered steps on a full-bleed photograph and was the page's second dark
 * interruption, which cost the Trust band its impact. HowItWorks.tsx is still in the
 * repo and still routed from nowhere; the steps live on /features in full.
 *
 * NO VENDOR LOGOS, and this is a standing rule rather than an omission. Naming Clio,
 * Filevine and the rest dates the page, invites "do you support X" objections we then
 * have to answer, and implies a fixed list when the actual claim is the opposite:
 * Delta signs in to whatever the firm already runs. A row of category pills was tried
 * instead and also cut, because it restated the sentence above it.
 *
 * THE QUOTE SLOT IS EMPTY ON PURPOSE. Camren asked for a second, smaller testimonial
 * here. There is exactly one real attributable quote (Kirschbaum & Nowotny), and it
 * carries the testimonial section above, so putting it here too would be the same
 * voice twice on one page. Fabricating a second one is forbidden outright; see
 * CLAUDE.md, where two invented quotes shipped once already. Drop a real one into
 * QUOTE and it renders. Nothing else needs to change.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

type Quote = { text: string; name: string; where: string };

/** Real and attributable, or null. There is no third option. */
const QUOTE: Quote | null = null;

const FACTS: { k: string; v: string }[] = [
  { k: "Five minutes", v: "Delta signs in to your case system, inbox, calendar and files. You do not need an engineer." },
  { k: "Nothing to migrate", v: "Your files stay where they are. There is no data project and no new system to learn." },
  { k: "Even without an API", v: "Where a platform has no clean API, Delta works it the way your staff does, in a browser." },
];

export function IntegrationClose() {
  return (
    <section id="onboarding" style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <Container>
        <Reveal>
          <h2 className="sx-close-h">Delta is working your cases this afternoon.</h2>
        </Reveal>

        <Reveal delay={0.06}>
          <dl className="sx-close-grid">
            {FACTS.map((f) => (
              <div key={f.k} className="sx-close-item">
                <dt className="sx-close-k">{f.k}</dt>
                <dd className="sx-close-v">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {QUOTE && (
          <Reveal delay={0.1}>
            <figure className="sx-close-quote">
              <blockquote className="sx-close-quote-text">&ldquo;{QUOTE.text}&rdquo;</blockquote>
              <figcaption className="sx-close-quote-by">
                <span style={{ fontWeight: 600, color: SX.ink }}>{QUOTE.name}</span>
                <span aria-hidden style={{ margin: "0 8px" }}>&middot;</span>
                {QUOTE.where}
              </figcaption>
            </figure>
          </Reveal>
        )}
      </Container>

      <style>{`
        .sx-close-h {
          font-family: var(--sx-archivo), 'Archivo Placeholder', sans-serif;
          font-weight: 500;
          font-size: 48px;
          line-height: 1.15;
          letter-spacing: -1px;
          color: var(--sx-ink);
          margin: 0 auto;
          max-width: 720px;
          text-align: center;
          text-wrap: balance;
        }

        /* A definition list, because that is what this is: three terms and what each
           one means. The label column is fixed so the three sentences share a left
           edge and read as a set rather than three unrelated paragraphs. */
        .sx-close-grid {
          display: grid;
          gap: 0;
          max-width: 900px;
          margin: 56px auto 0;
          border-top: 1px solid var(--sx-hairline);
        }
        .sx-close-item {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: 32px;
          align-items: baseline;
          padding: 26px 4px;
          border-bottom: 1px solid var(--sx-hairline);
        }
        .sx-close-k {
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.2px;
          color: var(--sx-accent-text);
          margin: 0;
        }
        .sx-close-v {
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 17px;
          line-height: 27px;
          color: var(--sx-ink-2);
          margin: 0;
        }

        .sx-close-quote {
          max-width: 720px;
          margin: 48px auto 0;
          text-align: center;
        }
        .sx-close-quote-text {
          margin: 0;
          font-family: var(--sx-archivo), 'Archivo Placeholder', sans-serif;
          font-weight: 500;
          font-size: 26px;
          line-height: 1.35;
          letter-spacing: -0.5px;
          color: var(--sx-ink);
        }
        .sx-close-quote-by {
          margin-top: 18px;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 16px;
          color: var(--sx-ink-2);
        }

        @media (max-width: 760px) {
          .sx-close-h { font-size: 32px; letter-spacing: -0.5px; }
          .sx-close-grid { margin-top: 40px; }
          .sx-close-item { grid-template-columns: minmax(0, 1fr); gap: 8px; padding: 22px 2px; }
          .sx-close-v { font-size: 16px; line-height: 25px; }
          .sx-close-quote-text { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
