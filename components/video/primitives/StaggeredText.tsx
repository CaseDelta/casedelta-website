"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";
import { FONT } from "./tokens";

/* StaggeredText — letter-by-letter cinematic text reveal.
 *
 * Each character animates in independently with a staggered delay. Words are
 * kept together to avoid mid-word line breaks. Text is white-with-glow by
 * default for cinematic openings on landscape backgrounds.
 *
 * Animation per character: scale 0.94 → 1, opacity 0 → 1, y +18 → 0,
 * filter blur(4px) → blur(0px). Stagger ~22ms between characters so a
 * 30-character line reveals over ~660ms; full line settle in ~1.2s.
 *
 * On exit (visible=false), the reveal reverses faster and from the END of
 * the line, so the line "lifts off" backward.
 */

export function StaggeredText({
  visible,
  text,
  fontSize,
  fontWeight,
  color = "#FFFFFF",
  letterSpacing = "-0.02em",
  lineHeight = 1.18,
  glow = "0 0 28px rgba(255, 255, 255, 0.25), 0 4px 18px rgba(0, 0, 0, 0.55)",
  charDelay = 0.022,
  enterDuration = 0.65,
  exitDuration = 0.35,
  entryDelay = 0,
  style,
}: {
  visible: boolean;
  text: string;
  fontSize: number;
  fontWeight: number;
  color?: string;
  letterSpacing?: string;
  lineHeight?: number;
  glow?: string;
  charDelay?: number;
  enterDuration?: number;
  exitDuration?: number;
  /** Extra delay added to every char's enter delay. Useful when chaining two
   *  StaggeredText groups so they stagger as one continuous reveal. */
  entryDelay?: number;
  style?: CSSProperties;
}) {
  const words = text.split(" ");
  const totalChars = text.length;

  /* Compute the global character index across word groups so stagger is
   * left-to-right across the whole line, not per-word. */
  let runningIdx = 0;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: `${fontSize * 0.28}px`,
        fontFamily: FONT,
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        lineHeight,
        textShadow: glow,
        ...style,
      }}
    >
      {words.map((word, wi) => {
        const wordStart = runningIdx;
        runningIdx += word.length;
        return (
          <span
            key={wi}
            style={{
              whiteSpace: "nowrap",
              display: "inline-flex",
            }}
          >
            {Array.from(word).map((char, ci) => {
              const globalIdx = wordStart + ci;
              const enterDelay = visible ? globalIdx * charDelay + entryDelay : 0;
              const exitDelay = visible
                ? 0
                : (totalChars - 1 - globalIdx) * (charDelay * 0.5);
              return (
                <motion.span
                  key={ci}
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.94,
                    y: visible ? 0 : 18,
                    filter: visible ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{
                    duration: visible ? enterDuration : exitDuration,
                    ease: visible ? [0.16, 1, 0.3, 1] : [0.4, 0, 0.7, 0.2],
                    delay: visible ? enterDelay : exitDelay,
                  }}
                  style={{
                    display: "inline-block",
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}
