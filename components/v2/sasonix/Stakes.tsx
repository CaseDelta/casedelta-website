"use client";

/**
 * The problem, in one sentence.
 *
 * THE ARGUMENT: a firm's throughput is not capped by demand, it is capped by how
 * much work the people already on payroll can get through in a day. Say that, and
 * then ask the question the whole product answers. Nothing else belongs here.
 *
 * THE DEVICE: the subject of the sentence dissolves and reforms. "your paralegals",
 * "your case managers" and "your intake specialists" name the roles a firm hires to
 * lift the cap, and then it lands on "you" and HOLDS there, roughly twice as long,
 * because that is the one the reader was not expecting and the one that actually
 * stings. Keep "you" last and keep it dwelling; reorder the list and the section
 * stops making its point. "you" is the one entry that takes no "your", for the
 * obvious reason, so do not "fix" it into the pattern of the other three.
 *
 * HOW THE CHANGE READS. Letters fade out one after another from the left, the
 * sentence glides to the width of the next wording while nothing is showing, and
 * the new letters fade in the same way. It is a wave passing through the word, not
 * a swap, not a slide, and not typing. Everything about the timing serves that:
 * the fades are long and heavily overlapped, so roughly half the word is always
 * mid-fade and no single letter ever reads as a discrete event.
 *
 * THE STAGGER IS NORMALISED, which matters more than it sounds. The delay between
 * letters is SPREAD divided by the letter count, not a fixed per-letter figure, so
 * "you" and "your intake specialists" take exactly the same time to dissolve and
 * to reform. A fixed per-letter delay makes the long wording take seven times
 * longer than the short one and the section loses its pulse.
 *
 * THE THREE PHASES NEVER OVERLAP, and that is a correctness point rather than a
 * stylistic one. The width only moves while the slot is empty. Earlier versions
 * animated the width underneath visible letters and painted a long wording
 * straight through "can do." for about a fifth of a second on every change, which
 * reads as a rendering fault rather than a transition.
 *
 * THE LINE STRUCTURE IS PINNED. The lede is its own block, so the word ALWAYS
 * begins a line. Without that the word is an inline run whose width changes: on a
 * desktop column "…by what you" fits on the first line while "…by what your intake
 * specialists" does not, so the word would drop a line mid-change and the sentence
 * would lurch. Pinning the break also fixes the height, because the lede and the
 * word line are each a constant number of lines whichever wording is showing.
 *
 * On phones the word is a block of its own, so "can do." sits on the line below and
 * nothing to the right of the word can move at all.
 *
 * Reduced motion renders "you" and never animates, which still reads as a complete
 * sentence. The animated copy is aria-hidden and a complete sentence is exposed to
 * assistive technology instead, so a half-faded word is never announced.
 *
 * EVERY CLASS HERE IS PREFIXED sx-stakes-. A plain .sx-caret in an earlier version
 * collided with the product panels' own caret markup and restyled it, on a page
 * where nothing reported an error. Keep the prefix.
 */
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

/** The cycle. "you" is last and dwells; see the header comment. */
const ROLES = ["your paralegals", "your case managers", "your intake specialists", "you"] as const;

/** The two halves of the sentence, either side of the word. */
const LEDE = "Your entire firm is bottlenecked by what";
const TAIL = "can do.";

/**
 * The longest wording, which the hidden ghost renders to reserve the heading's
 * height. Derived rather than typed, so adding a role cannot leave a wording
 * longer than the ghost makes room for.
 */
const LONGEST = ROLES.reduce((a, b) => (b.length > a.length ? b : a));

/* Milliseconds. FADE is one letter's own fade; SPREAD is how long the wave takes
   to cross the whole word, shared out between however many letters there are. The
   heavy overlap between the two is what makes it read as a dissolve. */
const FADE_OUT = 240;
const SPREAD_OUT = 280;
const RESIZE = 360;
const FADE_IN = 320;
const SPREAD_IN = 380;
const HOLD_MS = 1400;
const HOLD_YOU_MS = 3000;

const OUT_TOTAL = SPREAD_OUT + FADE_OUT;
const IN_TOTAL = SPREAD_IN + FADE_IN;

type Phase = "in" | "hold" | "out" | "resize";

/**
 * Server-renders the first wording settled, so hydration matches and the section
 * is a finished sentence before any script runs.
 */
function useDissolve(paused: boolean) {
  const [{ i, phase }, set] = useState<{ i: number; phase: Phase }>({ i: 0, phase: "hold" });

  useEffect(() => {
    if (paused) return;
    const next: Record<Phase, { ms: number; to: { i: number; phase: Phase } }> = {
      in: { ms: IN_TOTAL, to: { i, phase: "hold" } },
      hold: { ms: ROLES[i] === "you" ? HOLD_YOU_MS : HOLD_MS, to: { i, phase: "out" } },
      out: { ms: OUT_TOTAL, to: { i, phase: "resize" } },
      resize: { ms: RESIZE, to: { i: (i + 1) % ROLES.length, phase: "in" } },
    };
    const t = setTimeout(() => set(next[phase].to), next[phase].ms);
    return () => clearTimeout(t);
  }, [i, phase, paused]);

  return { i, phase };
}

/**
 * Measures every wording at the heading's real typography, so the slot can glide
 * to a known width. Returns [] until it has measured, and until then the slot
 * takes the natural width of its own letters, which is correct, just not animated.
 */
function useWordWidths(ref: React.RefObject<HTMLSpanElement | null>) {
  const [widths, setWidths] = useState<number[]>([]);
  // useEffect, not useLayoutEffect: this prerenders on the server, where there is
  // nothing to measure, and the natural width is right until the measurement lands.
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const next = Array.from(el.children).map((c) => c.getBoundingClientRect().width);
      setWidths((prev) =>
        prev.length === next.length && prev.every((w, k) => Math.abs(w - next[k]) < 0.5) ? prev : next,
      );
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
  const { i, phase } = useDissolve(!!reduced);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const widths = useWordWidths(sizerRef);

  const word = reduced ? "you" : ROLES[i];
  // While the slot is empty the width is already travelling to the next wording.
  const targetWidth = widths[phase === "resize" ? (i + 1) % ROLES.length : i];
  const letters = reduced || phase !== "resize" ? word.split("") : [];
  const spread = phase === "out" ? SPREAD_OUT : SPREAD_IN;

  return (
    <section id="stakes" style={{ background: SX.surface, padding: "120px 0 60px" }}>
      <Container>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            {/* The section is the sentence. It closed on "Why not operate like you
                had double the headcount?" until 2026-08-28; the heading makes the
                point on its own and the answer belongs to the sections below. */}
            <h2 className="sx-stakes-h2">
              {/* A complete sentence for assistive technology, so a half-faded word
                  is never announced. The visible copy below is aria-hidden. */}
              <span className="sx-stakes-sr-only">{`${LEDE} you ${TAIL}`}</span>

              {/* Reserves the height of the longest wording. Mirrors the real
                  structure exactly, or it reserves the wrong number of lines. */}
              <span className="sx-stakes-ghost" aria-hidden>
                <span className="sx-stakes-lede">{LEDE}</span>
                <span className="sx-stakes-word">{LONGEST}</span> {TAIL}
              </span>

              <span className="sx-stakes-real" aria-hidden>
                <span className="sx-stakes-lede">{LEDE}</span>
                <motion.span
                  className="sx-stakes-word"
                  animate={targetWidth ? { width: targetWidth } : undefined}
                  transition={{ duration: RESIZE / 1000, ease: [0.44, 0, 0.56, 1] }}
                >
                  {/* Keyed by phase so the letters remount and replay their fade.
                      Within a phase the key is the position, so a letter that is
                      already on screen is never restarted by an unrelated render. */}
                  {letters.map((c, n) => (
                    <span
                      key={`${phase}-${i}-${n}`}
                      className={phase === "out" ? "sx-stakes-letter-out" : phase === "in" ? "sx-stakes-letter-in" : undefined}
                      style={
                        reduced || phase === "hold"
                          ? undefined
                          : { animationDelay: `${(letters.length > 1 ? n / (letters.length - 1) : 0) * spread}ms` }
                      }
                    >
                      {c}
                    </span>
                  ))}
                </motion.span>{" "}
                {TAIL}
              </span>

              {/* off-layout, for measurement only */}
              <span className="sx-stakes-measure" ref={sizerRef} aria-hidden>
                {ROLES.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </span>
            </h2>

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
          line-height: 1.15;
          letter-spacing: -1px;
          color: var(--sx-ink);
          margin: 0;
          max-width: 880px;
        }
        /* both in the same cell: the ghost sets the box, the real sentence paints it */
        .sx-stakes-ghost, .sx-stakes-real { grid-area: 1 / 1; align-self: start; }
        .sx-stakes-ghost { visibility: hidden; }

        .sx-stakes-sr-only {
          position: absolute;
          width: 1px; height: 1px;
          margin: -1px; padding: 0; border: 0;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }

        /* The lede is a BLOCK so the word always begins a line. See the header: without
           this the word jumps a line mid-change on wide columns. */
        .sx-stakes-lede { display: block; }

        /* white-space:pre keeps the spaces inside the word, which are their own
           spans and would otherwise collapse, and stops the word breaking at one.
           accent-TEXT, never the raw accent: that token exists because the brand
           accent is not legible as body copy in every palette. */
        .sx-stakes-word {
          display: inline-block;
          white-space: pre;
          color: var(--sx-accent-text);
        }

        /* Letters stay display:inline. As inline-blocks each letter becomes its own
           box, kerning between them is lost and the word measures wider than the
           width the slot was told to animate to, which shows up as a ragged right
           edge. That also rules out transforms here, since they do not apply to
           non-replaced inline elements: opacity and blur are the whole effect. */
        .sx-stakes-letter-in {
          animation: sx-stakes-fade-in ${FADE_IN}ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .sx-stakes-letter-out {
          animation: sx-stakes-fade-out ${FADE_OUT}ms cubic-bezier(0.55, 0, 0.68, 0.4) both;
        }
        @keyframes sx-stakes-fade-in {
          from { opacity: 0; filter: blur(6px); }
          to   { opacity: 1; filter: blur(0); }
        }
        @keyframes sx-stakes-fade-out {
          from { opacity: 1; filter: blur(0); }
          to   { opacity: 0; filter: blur(6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sx-stakes-letter-in, .sx-stakes-letter-out { animation: none; }
        }

        .sx-stakes-measure {
          position: absolute;
          left: 0; top: 0;
          visibility: hidden;
          pointer-events: none;
          white-space: pre;
        }
        /* width:max-content, or each block child inherits the absolutely positioned
           parent's shrink-to-fit width and every wording measures the same as the
           longest, which silently pins the slot to one width. */
        .sx-stakes-measure > span { display: block; width: max-content; }


        /* Below the desktop breakpoint the heading is sized off the COLUMN rather
           than off a breakpoint value.

           WHERE 0.060 COMES FROM: the lede is 798px wide at 48px, and the heading
           shrink-wraps to it, so the desktop column IS the lede's width. The fluid
           rule has to keep the lede inside the column, which means
           font <= column / 16.625, or 0.0601 of the column. 0.062 left the lede
           wrapping to two lines between 861px and 879px. Do not raise it.

           Under 600px the word becomes a block of its own, because at phone sizes
           the longest wording plus "can do." cannot share a line at any type size
           worth reading. Nothing then sits to the right of the word, so the width
           animation is irrelevant there and is overridden. */
        @media (min-width: 600px) and (max-width: 879px) {
          .sx-stakes-h2 {
            font-size: calc((100vw - 80px) * 0.060);
            letter-spacing: -0.4px;
          }
        }
        @media (max-width: 599px) {
          .sx-stakes-h2 {
            font-size: max(18px, calc((100vw - 80px) * 0.08));
            letter-spacing: -0.4px;
          }
          /* The measured width is an inline style from the animation, and a block
             slot must ignore it and take the column. */
          .sx-stakes-word { display: block; width: auto !important; }
        }
      `}</style>
    </section>
  );
}
