"use client";

import { motion } from "framer-motion";
import {
  BG_CREAM,
  BLUE,
  BLUE_LIGHT,
  BLUE_FAINT,
  BLUE_PALE,
  BLUE_DEEP,
  INDIGO,
  SWEEP_EASE,
} from "./tokens";

/* ─── Drifting blue auras — 5 independent loops ─── */
export function Auras({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <motion.div
        animate={{ x: [0, 90, -50, 0], y: [0, -70, 35, 0], scale: [1, 1.10, 0.94, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -360,
          left: -340,
          width: 1280,
          height: 1280,
          background: `radial-gradient(circle, ${BLUE}${alpha(0.38 * intensity)} 0%, ${BLUE}00 62%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, -80, 50, 0], y: [0, 50, -40, 0], scale: [1, 0.94, 1.08, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          right: -380,
          width: 1340,
          height: 1340,
          background: `radial-gradient(circle, ${BLUE_LIGHT}${alpha(0.40 * intensity)} 0%, ${BLUE_LIGHT}00 60%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -50, 25, 0], scale: [1, 1.06, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: -320,
          left: 80,
          width: 1080,
          height: 1080,
          background: `radial-gradient(circle, ${INDIGO}${alpha(0.28 * intensity)} 0%, ${INDIGO}00 60%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -180,
          left: "30%",
          width: 880,
          height: 880,
          background: `radial-gradient(circle, ${BLUE_PALE}${alpha(0.65 * intensity)} 0%, ${BLUE_PALE}00 64%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, -40, 25, 0], y: [0, 30, -20, 0], scale: [1, 1.04, 0.98, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: -260,
          right: 60,
          width: 940,
          height: 940,
          background: `radial-gradient(circle, ${BLUE_DEEP}${alpha(0.22 * intensity)} 0%, ${BLUE_DEEP}00 60%)`,
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ─── Parallax SVG curve sweeps ─── */
const CURVES = [
  { d: "M-50 880 Q 380 620 800 700 Q 1240 780 2000 540", w: 4.5, c: BLUE,       o: 0.32, delay: 0.0 },
  { d: "M-50 940 Q 420 680 880 750 Q 1320 820 2000 620", w: 3.5, c: BLUE_LIGHT, o: 0.40, delay: 0.2 },
  { d: "M-50 1000 Q 500 740 980 800 Q 1400 850 2000 700", w: 2.5, c: BLUE_FAINT, o: 0.36, delay: 0.4 },
  { d: "M2000 240 Q 1500 360 1100 400 Q 700 440 -50 380", w: 4,   c: BLUE_LIGHT, o: 0.30, delay: 0.6 },
  { d: "M2000 320 Q 1600 460 1200 500 Q 800 540 -50 470", w: 3,   c: BLUE_FAINT, o: 0.30, delay: 0.8 },
  { d: "M2000 400 Q 1700 560 1300 590 Q 900 620 -50 550", w: 2,   c: BLUE_PALE,  o: 0.32, delay: 1.0 },
];

export function CurveSweeps({ idPrefix = "vsl" }: { idPrefix?: string }) {
  const maskId = `${idPrefix}-curve-mask`;
  const maskRectId = `${idPrefix}-curve-mask-rect`;
  return (
    <motion.div
      animate={{ x: [0, -16, 10, 0], y: [0, 12, -8, 0] }}
      transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id={maskId} cx="0.5" cy="0.5" r="0.78">
            <stop offset="0%"  stopColor="white" stopOpacity="0.55" />
            <stop offset="55%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskRectId}>
            <rect width="1920" height="1080" fill={`url(#${maskId})`} />
          </mask>
        </defs>
        <g mask={`url(#${maskRectId})`}>
          {CURVES.map((curve, i) => (
            <motion.path
              key={i}
              d={curve.d}
              stroke={curve.c}
              strokeWidth={curve.w}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: curve.o }}
              transition={{
                pathLength: { duration: 2.4, delay: curve.delay, ease: SWEEP_EASE },
                opacity:    { duration: 1.0, delay: curve.delay, ease: "easeOut" },
              }}
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

/* ─── Subtle radial vignette ─── */
export function Vignette() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at center, transparent 50%, rgba(15,23,41,0.05) 100%)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Composed background — drop-in for any scene ─── */
export function SceneBackground({
  intensity = 1,
  curveIdPrefix,
}: {
  intensity?: number;
  curveIdPrefix?: string;
}) {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: BG_CREAM }} />
      <Auras intensity={intensity} />
      <CurveSweeps idPrefix={curveIdPrefix} />
      <Vignette />
    </>
  );
}

/* Helper to build hex alpha suffix from 0..1 float */
function alpha(v: number): string {
  const clamped = Math.max(0, Math.min(1, v));
  return Math.round(clamped * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}
