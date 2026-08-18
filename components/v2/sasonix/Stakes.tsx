"use client";

/**
 * The stakes. Sits between the hero and the product, and it is the only section on
 * the page that talks about the lawyer instead of Delta.
 *
 * THE ARGUMENT: Grok Bot sells always-on ("your team of always-on agents", "keep
 * working 24/7"). Said to an attorney that lands wrong, because an attorney is
 * ALREADY always on and has been for years. So the claim is inverted: the work
 * stays on so the person does not have to.
 *
 * THE DEVICE: one evening, drawn twice, on a shared clock. Two tracks over the same
 * 5 PM to 7 AM axis.
 *   Track 1, tonight: your bar runs the whole width. That IS the problem, and it
 *     needs no sentence explaining it.
 *   Track 2, with Delta: your bar stops just after five, and Delta's continues to
 *     morning underneath it.
 * The second row carries the entire thesis in one picture: the work does not stop,
 * you do. If you edit this, keep that contrast between the two bars. Everything
 * else here is captioning.
 *
 * Deliberately drawn in CSS from the existing token set rather than as an image or
 * a chart library: it stays crisp, it re-tints with the brand, and it costs nothing.
 *
 * Earlier versions of this section were a centered stack of muted sentences and a
 * cream card with a pulsing dot. Both stated the problem. Neither showed it.
 */
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal } from "./reveal";

/** The clock the two evenings share. */
const HOURS = ["5 PM", "8 PM", "11 PM", "2 AM", "5 AM", "7 AM"];

/** Where the lawyer's evening ends, as a percentage of that axis. */
const YOU_TONIGHT = 100; // it does not
const YOU_WITH_DELTA = 17; // just after five

export function Stakes() {
  return (
    <section id="stakes" style={{ background: SX.surface, padding: "120px 0 60px" }}>
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="The problem"
            title="The file does not stop when you do."
            sub="The records come in after five. The demand is due Friday. Somebody has to read all eight hundred pages, and most nights that somebody is you."
            titleMaxW={620}
            subMaxW={560}
          />
        </Reveal>

        {/* one evening, drawn twice on the same clock */}
        <Reveal delay={0.08} amount={0.2}>
          <div className="sx-clock">
            {/* hour axis */}
            <div className="sx-clock-axis" aria-hidden>
              {HOURS.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>

            <div className="sx-track-group">
              {/* tonight */}
              <div className="sx-track">
                <span className="sx-track-label">Tonight</span>
                <div className="sx-rail">
                  <span className="sx-bar sx-bar-you" style={{ width: `${YOU_TONIGHT}%` }}>
                    <span className="sx-seg-tag">You, still reading</span>
                  </span>
                </div>
              </div>

              {/* the same evening, with Delta */}
              <div className="sx-track">
                <span className="sx-track-label">With Delta</span>
                <div className="sx-rail">
                  <span className="sx-bar sx-bar-you" style={{ width: `${YOU_WITH_DELTA}%` }}>
                    <span className="sx-seg-tag sx-seg-tag-center">You</span>
                  </span>
                  <span
                    className="sx-bar sx-bar-delta"
                    style={{ left: `calc(${YOU_WITH_DELTA}% + 6px)`, right: 0, width: "auto" }}
                  >
                    <span className="sx-seg-tag sx-seg-tag-onaccent">Delta, working through the night</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="sx-clock-caption">Same file. Same deadline. One of you gets to leave.</p>
          </div>
        </Reveal>
      </Container>

      <style>{`
        .sx-clock {
          max-width: 900px;
          margin: 56px auto 0;
          background: var(--sx-surface-alt);
          border: 1px solid var(--sx-hairline);
          border-radius: 22px;
          box-shadow: 0 1px 3px rgba(var(--sx-shadow-rgb), 0.04);
          padding: 40px 44px 34px;
        }

        .sx-clock-axis {
          display: flex;
          justify-content: space-between;
          font-family: var(--sx-mono), ui-monospace, monospace;
          font-size: 11.5px;
          letter-spacing: 0.06em;
          color: var(--sx-ink-3);
          padding-left: 104px;
          margin-bottom: 14px;
        }

        .sx-track-group { display: grid; gap: 26px; }

        .sx-track {
          display: grid;
          grid-template-columns: 104px minmax(0, 1fr);
          align-items: center;
          gap: 0;
        }
        .sx-track-label {
          font-size: 15px;
          font-weight: 500;
          color: var(--sx-ink-2);
        }

        .sx-rail {
          position: relative;
          height: 44px;
          border-radius: 12px;
          background: color-mix(in srgb, var(--sx-ink) 5%, transparent);
        }
        /* faint hour gridlines, so the bars read against a clock */
        .sx-rail::before {
          content: "";
          position: absolute; inset: 0;
          border-radius: 12px;
          background-image: repeating-linear-gradient(
            to right,
            transparent 0,
            transparent calc(20% - 1px),
            color-mix(in srgb, var(--sx-ink) 8%, transparent) calc(20% - 1px),
            color-mix(in srgb, var(--sx-ink) 8%, transparent) 20%
          );
          pointer-events: none;
        }

        .sx-bar {
          position: absolute;
          top: 8px; bottom: 8px; left: 0;
          border-radius: 999px;
        }
        /* The whole device is the contrast between the two bars, so they must stay
           distinguishable in EVERY palette. A solid ink bar against a solid accent
           bar works in the orange brand and collapses in the achromatic ones, where
           accent and ink are both near-white. So: "you" is a translucent ink bar,
           "Delta" is a solid accent bar with a hairline. Different value AND
           different treatment, which survives any brand. */
        /* The device is the contrast between the two bars, so they must stay
           distinguishable in EVERY palette. The segments sit SIDE BY SIDE rather
           than stacked: an earlier version laid "you" on top of Delta's bar, which
           vanished in the achromatic palettes where both resolve to near-white.
           Adjacent segments also read truer: your evening ends where Delta's
           continues. */
        .sx-bar-you {
          background: color-mix(in srgb, var(--sx-ink) 50%, transparent);
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--sx-ink) 66%, transparent);
        }
        /* accent-DEEP, not accent: this bar carries a small white label, and white
           on the raw brand blue is 4.11:1, an AA fail at this size. The deeper fill
           is 5.80:1 and reads as the same colour. Same rule as the featured pricing
           tier. */
        .sx-bar-delta { background: var(--sx-accent-deep); }

        .sx-seg-tag {
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          color: var(--sx-ink);
        }
        .sx-seg-tag-onaccent { color: var(--sx-on-accent); }
        /* the short segment centres its label instead of right-aligning it */
        .sx-seg-tag-center {
          right: auto;
          left: 0;
          width: 100%;
          text-align: center;
        }

        .sx-clock-caption {
          margin: 30px 0 0;
          text-align: center;
          font-size: 16px;
          line-height: 26px;
          color: var(--sx-ink-2);
        }

        @media (max-width: 820px) {
          .sx-clock { padding: 28px 22px 26px; margin-top: 40px; }
          .sx-clock-axis { padding-left: 0; font-size: 10.5px; }
          .sx-track { grid-template-columns: minmax(0, 1fr); gap: 8px; }
          .sx-track-label { font-size: 14px; }
          .sx-rail { height: 40px; }
          .sx-bar-tag { font-size: 12px; }
          .sx-bar-tag-start { display: none; }
        }
      `}</style>
    </section>
  );
}
