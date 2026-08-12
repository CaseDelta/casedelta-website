"use client";

/**
 * The stakes. Sits between the hero and "How Delta is different", and it is the
 * only section on the page that talks about the lawyer instead of the product.
 *
 * THE ARGUMENT, and why it is shaped this way:
 * Grok Bot's pitch is that the agent is always on ("your team of always-on agents",
 * "keep working 24/7"). Said to an attorney that lands wrong, because an attorney
 * is ALREADY always on, and has been for years. So the claim is inverted here: the
 * work stays on so the person does not have to. Same mechanism, aimed at the pain
 * the buyer actually feels.
 *
 * The copy is Camren's, from outreach that already worked. The Sidney email: "let
 * your firm operate like you had double the headcount, and let you actually have
 * your nights and weekends back". The earlier CTA headline: "Give your team back
 * their evenings".
 *
 * Structure is pain, then turn, then dream. The pain runs in muted ink at body
 * size, the turn lands in display size at full contrast, so the eye sees the
 * reversal before it reads a word. Keep that contrast if you edit: it is the whole
 * device. Do not add a product claim here. The product arrives in the next section.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

/** The pain, in the order a bad evening actually happens. */
const PAIN = [
  "The records come in after five.",
  "The demand is due Friday.",
  "Somebody has to read all eight hundred pages.",
];

export function Stakes() {
  return (
    <section id="stakes" style={{ background: SX.white, padding: "120px 0 60px" }}>
      <Container>
        <div className="sx-stakes">
          <Reveal>
            <span
              style={{
                display: "inline-flex",
                fontFamily: SX.mono,
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: SX.ink3,
              }}
            >
              The problem
            </span>

            <h2
              style={{
                fontFamily: SX.display,
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "55.2px",
                letterSpacing: "-1px",
                color: SX.ink,
                margin: "20px 0 0",
                maxWidth: 700,
                textWrap: "balance",
              }}
            >
              The file does not stop when you do.
            </h2>

            {/* the pain, muted */}
            <div className="sx-stakes-pain">
              {PAIN.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>And most nights, that somebody is you.</p>
            </div>
          </Reveal>

          {/* the turn */}
          <Reveal delay={0.1}>
            <div className="sx-stakes-turn">
              <p className="sx-stakes-lead">Delta is the one that stays on.</p>
              <p className="sx-stakes-body">
                It works the file overnight and leaves the work waiting in the morning. Your firm runs like you hired
                again, and you get your evenings back.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>

      <style>{`
        .sx-stakes { max-width: 820px; }
        .sx-stakes-pain {
          margin-top: 28px;
          display: grid;
          gap: 6px;
        }
        .sx-stakes-pain p {
          margin: 0;
          font-size: 20px;
          line-height: 32px;
          color: var(--sx-ink-3);
        }
        /* the last pain line is the one that names the reader */
        .sx-stakes-pain p:last-child { color: var(--sx-ink-2); }

        .sx-stakes-turn {
          margin-top: 48px;
          padding-top: 40px;
          border-top: 1px solid var(--sx-hairline);
        }
        .sx-stakes-lead {
          margin: 0;
          font-family: var(--sx-archivo), sans-serif;
          font-weight: 500;
          font-size: 40px;
          line-height: 48px;
          letter-spacing: -0.8px;
          color: var(--sx-ink);
        }
        .sx-stakes-body {
          margin: 16px 0 0;
          font-size: 18px;
          line-height: 30px;
          color: var(--sx-ink-2);
          max-width: 560px;
        }

        @media (max-width: 760px) {
          .sx-stakes-pain p { font-size: 18px; line-height: 29px; }
          .sx-stakes-lead { font-size: 30px; line-height: 37px; }
        }
      `}</style>
    </section>
  );
}
