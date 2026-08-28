"use client";

/**
 * The problem, in one sentence.
 *
 * THE ARGUMENT: a firm's throughput is not capped by demand, it is capped by how
 * much work the people already on payroll can get through in a day. Say that, and
 * then ask the question the whole product answers. Nothing else belongs here.
 *
 * THE DEVICE: one word of the sentence cycles. "paralegals", "case managers" and
 * "intake specialists" name the roles a firm hires to lift the cap, and then it
 * lands on "you" and HOLDS there, roughly twice as long, because that is the one
 * the reader was not expecting and the one that actually stings. Keep "you" last
 * and keep it dwelling; reorder the list and the section stops making its point.
 *
 * This replaced a two-track evening chart (a "tonight" bar running the full width
 * against a "with Delta" bar stopping after five) on 2026-08-28. The chart argued
 * about hours worked. This argues about headcount, which is the frame the closing
 * question and the pricing section both use.
 *
 * TWO THINGS HOLD THE LAYOUT STILL, and both matter more than they look:
 *   - A hidden copy of the LONGEST variant sits in the same grid cell as the real
 *     sentence, so the heading's height is fixed to the longest word and the page
 *     below it never jumps as the word changes.
 *   - The word sits in a slot whose width is measured for all four words up front
 *     and animated between them, so the tail of the sentence slides instead of
 *     snapping. Measurement re-runs once webfonts land and on resize, because
 *     Archivo's metrics are not the fallback's.
 *
 * Reduced motion holds the word on "you" and animates nothing, which still reads
 * as a complete sentence.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SX } from "./tokens";
import { Container, Eyebrow } from "./kit";
import { Reveal, REVEAL_EASE } from "./reveal";

/** The cycle. "you" is last and dwells; see the header comment. */
const ROLES = ["paralegals", "case managers", "intake specialists", "you"] as const;

/**
 * The widest variant, which is what the hidden ghost renders to lock the heading's
 * height. Derived rather than typed, so adding a role to ROLES cannot leave a
 * longer word than the ghost reserves room for.
 */
const LONGEST = ROLES.reduce((a, b) => (b.length > a.length ? b : a));

const HOLD_MS = 1750;
const HOLD_YOU_MS = 3800;

function useCycle(paused: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setI((n) => (n + 1) % ROLES.length),
      ROLES[i] === "you" ? HOLD_YOU_MS : HOLD_MS,
    );
    return () => clearTimeout(t);
  }, [i, paused]);
  return paused ? ROLES.length - 1 : i;
}

/**
 * Measures every word once at the heading's real typography, so the slot can
 * animate to a known width instead of snapping to whatever the content happens to
 * be. Returns [] until it has measured, and the slot falls back to auto width.
 */
function useWordWidths(ref: React.RefObject<HTMLSpanElement | null>) {
  const [widths, setWidths] = useState<number[]>([]);
  // useEffect, not useLayoutEffect: this prerenders on the server, and the slot
  // falls back to its natural auto width until the measurement lands, so there is
  // nothing to fix up before paint.
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const next = Array.from(el.children).map((c) => c.getBoundingClientRect().width);
      setWidths((prev) => (prev.length === next.length && prev.every((w, i) => Math.abs(w - next[i]) < 0.5) ? prev : next));
    };
    measure();
    window.addEventListener("resize", measure);
    // Webfonts land after first paint and the fallback face is a different width.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [ref]);
  return widths;
}

export function Stakes() {
  const reduced = useReducedMotion();
  const i = useCycle(!!reduced);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const widths = useWordWidths(sizerRef);
  const width = widths[i];

  return (
    <section id="stakes" style={{ background: SX.surface, padding: "120px 0 60px" }}>
      <Container>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Eyebrow>The problem</Eyebrow>

            <h2 className="sx-stakes-h2">
              {/* The hidden longest variant fixes the height; the real sentence overlays it.
                  The word MUST sit in the same unbreakable inline-block the real one uses:
                  as plain text the browser breaks "intake specialists" across two lines and
                  the ghost measures a line shorter than the sentence it is supposed to be
                  reserving room for, which is exactly the jump this ghost exists to stop. */}
              <span className="sx-stakes-ghost" aria-hidden>
                Your cases are bottlenecked by the work <span className="sx-slot">{LONGEST}</span> can do.
              </span>

              <span className="sx-stakes-real">
                Your cases are bottlenecked by the work{" "}
                <motion.span
                  className="sx-slot"
                  animate={width ? { width } : undefined}
                  transition={{ duration: 0.42, ease: REVEAL_EASE }}
                >
                  {/* in flow, invisible: sets the slot's baseline and line box */}
                  <span className="sx-slot-ghost" aria-hidden>{ROLES[i]}</span>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={ROLES[i]}
                      className="sx-slot-word"
                      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                      transition={{ duration: 0.26, ease: REVEAL_EASE }}
                    >
                      {ROLES[i]}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>{" "}
                can do.
              </span>

              {/* off-layout, for measurement only */}
              <span className="sx-stakes-measure" ref={sizerRef} aria-hidden>
                {ROLES.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </span>
            </h2>

            <p className="sx-stakes-ask">Why not operate like you had double the headcount?</p>
          </div>
        </Reveal>
      </Container>

      <style>{`
        .sx-stakes-h2 {
          display: grid;
          position: relative;
          font-family: var(--sx-archivo), 'Archivo Placeholder', sans-serif;
          font-weight: 500;
          font-size: 48px;
          line-height: 55.2px;
          letter-spacing: -1px;
          color: var(--sx-ink);
          margin: 24px 0 0;
          max-width: 880px;
        }
        /* both in the same cell: the ghost sets the box, the real sentence paints it */
        .sx-stakes-ghost, .sx-stakes-real { grid-area: 1 / 1; align-self: start; }
        .sx-stakes-ghost { visibility: hidden; }

        /* The cycling word. accent-TEXT, never the raw accent: that token exists
           because the brand accent is not legible as body copy in every palette. */
        .sx-slot {
          display: inline-block;
          position: relative;
          white-space: nowrap;
          color: var(--sx-accent-text);
        }
        .sx-slot-ghost { visibility: hidden; }
        .sx-slot-word { position: absolute; left: 0; top: 0; white-space: nowrap; }

        .sx-stakes-measure {
          position: absolute;
          left: 0; top: 0;
          visibility: hidden;
          pointer-events: none;
          white-space: nowrap;
        }
        /* width:max-content, or each block child would inherit the absolutely
           positioned parent's shrink-to-fit width and every word would measure the
           same as the longest one. That silently pins the slot to one width. */
        .sx-stakes-measure > span { display: block; width: max-content; }

        .sx-stakes-ask {
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 20px;
          line-height: 30px;
          color: var(--sx-ink-2);
          margin: 28px 0 0;
          max-width: 560px;
        }

        /* Below the desktop breakpoint the heading is sized off the COLUMN, not off
           a fixed breakpoint value, and the two bands below are measured rather than
           chosen by eye.

           WHY IT MATTERS: the cycling word is an unbreakable inline-block, so at most
           sizes "intake specialists" needs one more line than "you". The ghost above
           reserves the tallest variant, so that extra line does not move the page,
           but it does show up as dead space under every shorter word. For any given
           column width there are narrow bands of font size where all four variants
           wrap to the SAME number of lines, and the two rules below stay inside them:
           0.086 of the column lands in the three-line band on phones, 0.062 lands in
           the two-line band on tablets. A single formula cannot span both, and a
           clamp() ceiling is what breaks it: capping the phone rule drops the size
           out of the three-line band without dropping it into the two-line one, which
           is how 600px and 700px viewports each grew a blank line. Re-measure both
           constants if this sentence or the word list changes. */
        @media (max-width: 820px) {
          .sx-stakes-h2 { line-height: 1.18; letter-spacing: -0.4px; }
          .sx-stakes-ask { font-size: 18px; line-height: 28px; margin-top: 22px; }
        }
        @media (max-width: 560px) {
          .sx-stakes-h2 { font-size: max(19px, calc((100vw - 80px) * 0.086)); }
        }
        @media (min-width: 561px) and (max-width: 820px) {
          .sx-stakes-h2 { font-size: calc((100vw - 80px) * 0.062); }
        }
      `}</style>
    </section>
  );
}
