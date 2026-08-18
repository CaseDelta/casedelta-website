"use client";

/**
 * Shared scroll-in reveal for /v2, so every section enters with the same language
 * as the hero's Perform entrance: a fade + short rise (opacity 0.001 -> 1, y -> 0)
 * on the same easing, triggered once when the element scrolls into view.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user"> at the
 * page root (Sasonix.tsx): transform animations are dropped, the opacity fade kept.
 *
 * Two forms:
 *   <Reveal>            wrap headings / standalone blocks (adds a motion.div).
 *   {...revealProps()}  spread onto an element you turn into <motion.div ...>, for
 *                       grid/flex items whose identity must be preserved (equal-height
 *                       tiers, stretched cards) so no extra wrapper alters the layout.
 */
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

// The hero/Perform text-appear easing, reused site-wide for one consistent feel.
export const REVEAL_EASE = [0.44, 0, 0.56, 1] as [number, number, number, number];

type RevealOpts = { delay?: number; y?: number; amount?: number; duration?: number; once?: boolean };

export function revealProps(opts: RevealOpts = {}) {
  const { delay = 0, y = 24, amount = 0.25, duration = 0.6, once = true } = opts;
  return {
    initial: { opacity: 0.001, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, amount },
    transition: { duration, ease: REVEAL_EASE, delay },
  };
}

export function Reveal({
  children,
  delay,
  y,
  amount,
  duration,
  once,
  style,
  className,
}: RevealOpts & { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <motion.div className={className} style={style} {...revealProps({ delay, y, amount, duration, once })}>
      {children}
    </motion.div>
  );
}
