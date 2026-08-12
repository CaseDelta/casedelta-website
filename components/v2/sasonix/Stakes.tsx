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
 * BUILT FROM THE PAGE'S OWN PRIMITIVES, deliberately: SectionHead for the centered
 * eyebrow and heading, the AutomationSection card language for the turn (cream
 * surface, radius 22, hairline, soft shadow), and the same Reveal cascade. An
 * earlier version hand-rolled left-aligned type and read as a different site.
 *
 * Structure is pain, then turn, then dream, all centered. The pain runs muted and
 * lands on the reader; the turn sits in a raised card at full contrast, so the
 * reversal is visible before a word is read. Keep that contrast if you edit it, it
 * is the whole device. No product claim belongs here. The product starts next.
 */
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
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
        <Reveal>
          <SectionHead
            eyebrow="The problem"
            title="The file does not stop when you do."
            titleMaxW={620}
          />
        </Reveal>

        {/* the pain, centered and muted */}
        <Reveal delay={0.06}>
          <div className="sx-stakes-pain">
            {PAIN.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="sx-stakes-landing">And most nights, that somebody is you.</p>
          </div>
        </Reveal>

        {/* the turn, raised out of the page in the card language used elsewhere */}
        <Reveal delay={0.12} amount={0.2}>
          <div className="sx-stakes-turn">
            <span aria-hidden className="sx-stakes-mark">
              <span className="sx-stakes-glow" />
              <span className="sx-stakes-dot" />
            </span>
            <p className="sx-stakes-lead">Delta is the one that stays on.</p>
            <p className="sx-stakes-body">
              It works the file overnight and leaves the work waiting in the morning. Your firm runs like you hired
              again, and you get your evenings back.
            </p>
          </div>
        </Reveal>
      </Container>

      <style>{`
        .sx-stakes-pain {
          margin: 36px auto 0;
          max-width: 620px;
          display: grid;
          gap: 8px;
          text-align: center;
        }
        .sx-stakes-pain p {
          margin: 0;
          font-size: 20px;
          line-height: 32px;
          color: var(--sx-ink-3);
        }
        /* the line that names the reader carries the weight */
        .sx-stakes-pain .sx-stakes-landing {
          color: var(--sx-ink);
          font-weight: 500;
          margin-top: 8px;
        }

        .sx-stakes-turn {
          max-width: 860px;
          margin: 56px auto 0;
          background: var(--sx-surface-alt);
          border: 1px solid var(--sx-hairline);
          border-radius: 22px;
          box-shadow: 0 1px 3px rgba(var(--sx-shadow-rgb), 0.04);
          padding: 56px 48px 60px;
          text-align: center;
        }
        .sx-stakes-mark {
          position: relative;
          display: inline-block;
          width: 10px; height: 10px;
          margin-bottom: 22px;
        }
        .sx-stakes-glow {
          position: absolute; left: 50%; top: 50%;
          width: 10px; height: 10px;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          background: var(--sx-accent);
          filter: blur(7px);
          animation: sx-stakes-pulse 2.6s ease-in-out infinite;
        }
        .sx-stakes-dot {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: var(--sx-accent);
        }
        @keyframes sx-stakes-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.85; }
          50%      { transform: translate(-50%,-50%) scale(1.9); opacity: 0.25; }
        }

        .sx-stakes-lead {
          margin: 0;
          font-family: var(--sx-archivo), sans-serif;
          font-weight: 500;
          font-size: 40px;
          line-height: 48px;
          letter-spacing: -0.8px;
          color: var(--sx-ink);
          text-wrap: balance;
        }
        .sx-stakes-body {
          margin: 18px auto 0;
          font-size: 18px;
          line-height: 30px;
          color: var(--sx-ink-2);
          max-width: 520px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sx-stakes-glow { animation: none; }
        }
        @media (max-width: 760px) {
          .sx-stakes-pain p { font-size: 18px; line-height: 29px; }
          .sx-stakes-turn { padding: 40px 26px 44px; margin-top: 44px; }
          .sx-stakes-lead { font-size: 30px; line-height: 37px; }
        }
      `}</style>
    </section>
  );
}
