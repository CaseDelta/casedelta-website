"use client";

/**
 * "What a run looks like" — the concrete illustration of the abstract claim.
 *
 * WHY: every other section says what Delta can do. This one shows what comes back.
 * The research on the Grok Bot launch named the device that carries their whole
 * page and that ours was missing: close on the ARTIFACT, never on the capability.
 * Their lines end on "a review list", "a repro pack", "a filed ticket". A capability
 * is a promise; an artifact is a thing on your desk.
 *
 * Three rules this section exists to satisfy, do not break them in edits:
 *   1. The artifact is rendered, not described. The reader sees the chronology.
 *   2. Every row carries its page cite, because that IS the product claim.
 *   3. The run ends at an approval gate, in frame, attached to a specific object.
 *      The critique that stuck to Grok Bot was accountability ("who is on the hook"),
 *      and the answer only lands if approval attaches to THIS chronology rather than
 *      to a vague plan agreed twenty steps earlier.
 *
 * The rows are illustrative and generic on purpose. No real matter, no real provider.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

const BEATS: { time?: string; text: string }[] = [
  { time: "9:14 PM", text: "812 pages of records land in the file." },
  { text: "Delta reads every page, dates each treatment, and links each fact to the page it came from." },
  { text: "It drafts the demand from your firm's own template." },
  { time: "7:02 AM", text: "A cited chronology and a draft demand, waiting for your approval." },
];

const ROWS: { date: string; entry: string; cite: string }[] = [
  { date: "03 / 14", entry: "ER admission, cervical strain noted", cite: "p. 118" },
  { date: "04 / 02", entry: "MRI shows C5-C6 disc herniation", cite: "p. 244" },
  { date: "05 / 19", entry: "Physical therapy begins, 3x weekly", cite: "p. 310" },
  { date: "08 / 07", entry: "Surgical consult, fusion recommended", cite: "p. 502" },
];

export function RunIllustration() {
  return (
    <section id="run" style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <div className="sx-run-grid">
          {/* LEFT: the run, told as four beats */}
          <Reveal>
            <h2
              style={{
                fontFamily: SX.display,
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "55.2px",
                letterSpacing: "-1px",
                color: SX.ink,
                margin: 0,
                maxWidth: 460,
              }}
            >
              You hand it the records. You get back the chronology.
            </h2>
            <p
              style={{
                fontFamily: SX.body,
                fontSize: 18,
                lineHeight: "30px",
                color: SX.ink2,
                margin: "18px 0 0",
                maxWidth: 420,
              }}
            >
              Instead of a weekend with a box of paper.
            </p>

            <ol className="sx-run-beats">
              {BEATS.map((b, i) => (
                <li key={i}>
                  <span aria-hidden className="sx-run-node" />
                  <div>
                    {b.time && <span className="sx-run-time">{b.time}</span>}
                    <span className="sx-run-text">{b.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* RIGHT: the artifact itself */}
          <Reveal delay={0.08}>
            <div className="sx-artifact">
              <div className="sx-artifact-head">
                <span className="sx-artifact-title">Fact chronology</span>
                <span className="sx-artifact-meta">812 pages read</span>
              </div>

              <div className="sx-artifact-rows">
                {ROWS.map((r) => (
                  <div key={r.cite} className="sx-artifact-row">
                    <span className="sx-row-date">{r.date}</span>
                    <span className="sx-row-entry">{r.entry}</span>
                    <span className="sx-row-cite">{r.cite}</span>
                  </div>
                ))}
                <div className="sx-artifact-more">and 46 more entries</div>
              </div>

              {/* the approval gate, attached to this specific object */}
              <div className="sx-artifact-foot">
                <span className="sx-artifact-status">
                  <span aria-hidden className="sx-status-dot" />
                  Waiting for your approval
                </span>
                <span className="sx-artifact-actions">
                  <span className="sx-btn-ghost">Open in file</span>
                  <span className="sx-btn-solid">Approve</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <style>{`
        .sx-run-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1fr);
          gap: 64px;
          align-items: center;
        }

        /* the four beats, on a hairline spine */
        .sx-run-beats {
          list-style: none;
          margin: 40px 0 0;
          padding: 0;
          display: grid;
          gap: 22px;
          position: relative;
        }
        .sx-run-beats::before {
          content: "";
          position: absolute;
          left: 5px; top: 8px; bottom: 8px;
          width: 1px;
          background: var(--sx-hairline);
        }
        .sx-run-beats li {
          position: relative;
          display: grid;
          grid-template-columns: 11px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
        }
        .sx-run-node {
          width: 11px; height: 11px; border-radius: 999px; margin-top: 7px;
          background: var(--sx-surface);
          border: 2px solid var(--sx-accent);
        }
        .sx-run-time {
          display: block;
          font-family: var(--sx-mono, ui-monospace, monospace);
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--sx-ink-3);
          margin-bottom: 3px;
        }
        .sx-run-text {
          font-size: 16px;
          line-height: 26px;
          color: var(--sx-ink-2);
        }

        /* the artifact */
        .sx-artifact {
          background: var(--sx-surface);
          border: 1px solid var(--sx-hairline);
          border-radius: 18px;
          box-shadow: 0 30px 70px -34px rgba(var(--sx-shadow-rgb), 0.30);
          overflow: hidden;
        }
        .sx-artifact-head {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 12px;
          padding: 18px 22px;
          border-bottom: 1px solid var(--sx-hairline);
          background: var(--sx-surface-alt);
        }
        .sx-artifact-title { font-size: 15px; font-weight: 600; color: var(--sx-ink); }
        .sx-artifact-meta {
          font-family: var(--sx-mono, ui-monospace, monospace);
          font-size: 12px; color: var(--sx-ink-3);
        }
        .sx-artifact-rows { padding: 6px 0; }
        .sx-artifact-row {
          display: grid;
          grid-template-columns: 62px minmax(0, 1fr) 52px;
          gap: 14px;
          align-items: baseline;
          padding: 13px 22px;
          border-bottom: 1px solid var(--sx-hairline);
        }
        .sx-artifact-row:last-of-type { border-bottom: 0; }
        .sx-row-date {
          font-family: var(--sx-mono, ui-monospace, monospace);
          font-size: 12.5px; color: var(--sx-ink-3); font-variant-numeric: tabular-nums;
        }
        .sx-row-entry { font-size: 15px; line-height: 22px; color: var(--sx-ink); }
        .sx-row-cite {
          font-family: var(--sx-mono, ui-monospace, monospace);
          font-size: 12px; color: var(--sx-accent); text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .sx-artifact-more {
          padding: 12px 22px 14px;
          font-size: 13px;
          color: var(--sx-ink-3);
        }
        .sx-artifact-foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 14px; flex-wrap: wrap;
          padding: 16px 22px;
          border-top: 1px solid var(--sx-hairline);
          background: var(--sx-surface-alt);
        }
        .sx-artifact-status {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 14px; color: var(--sx-ink-2);
        }
        .sx-status-dot {
          width: 8px; height: 8px; border-radius: 999px; background: var(--sx-accent);
        }
        .sx-artifact-actions { display: inline-flex; align-items: center; gap: 10px; }
        .sx-btn-ghost {
          font-size: 14px; color: var(--sx-ink-2);
          border: 1px solid var(--sx-hairline);
          border-radius: 9px; padding: 8px 14px;
        }
        .sx-btn-solid {
          font-size: 14px; font-weight: 500;
          color: var(--sx-on-ink); background: var(--sx-ink);
          border-radius: 9px; padding: 8px 16px;
        }

        @media (max-width: 980px) {
          .sx-run-grid { grid-template-columns: minmax(0, 1fr); gap: 44px; }
          .sx-artifact-row { grid-template-columns: 56px minmax(0, 1fr) 48px; padding: 12px 18px; }
        }
      `}</style>
    </section>
  );
}
