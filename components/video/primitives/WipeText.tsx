"use client";

import { motion } from "framer-motion";
import { FONT, TEXT_PRIMARY, SWEEP_EASE } from "./tokens";

/* Text reveal primitive — clip-path L→R + opacity + blur fade.
 * Used everywhere prose appears in the VSL.
 */
export function WipeText({
  visible,
  children,
  fontSize,
  fontWeight,
  enterDuration = 1.4,
  exitDuration = 0.6,
  color = TEXT_PRIMARY,
  style,
}: {
  visible: boolean;
  children: React.ReactNode;
  fontSize: number;
  fontWeight: number;
  enterDuration?: number;
  exitDuration?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(6px)",
      }}
      transition={{
        clipPath: { duration: visible ? enterDuration : exitDuration, ease: SWEEP_EASE },
        opacity:  { duration: visible ? enterDuration : exitDuration, ease: SWEEP_EASE },
        filter:   { duration: visible ? enterDuration * 0.7 : exitDuration, ease: SWEEP_EASE },
      }}
      style={{
        fontFamily: FONT,
        fontSize,
        fontWeight,
        letterSpacing: "-0.025em",
        lineHeight: 1.18,
        color,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
