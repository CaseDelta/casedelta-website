"use client";

import { motion } from "framer-motion";

const BLUE = "#2563EB";
const BLUE_LIGHT = "#60A5FA";
const BLUE_FAINT = "#93C5FD";

const SVG = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 1000 800" fill="none" preserveAspectRatio="none"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
    {children}
  </svg>
);

const curves = [
  { d: "M200 800Q400 500 600 550Q800 600 1050 400", w: 3.5, o: 0.38, c: BLUE },
  { d: "M300 800Q480 520 650 560Q820 600 1050 430", w: 3, o: 0.32, c: BLUE },
  { d: "M400 800Q550 550 700 580Q850 610 1050 460", w: 2.5, o: 0.28, c: BLUE_LIGHT },
  { d: "M500 800Q620 580 740 600Q870 620 1050 490", w: 2, o: 0.22, c: BLUE_LIGHT },
  { d: "M600 800Q690 610 780 620Q880 630 1050 520", w: 1.5, o: 0.18, c: BLUE_FAINT },
  { d: "M700 800Q760 640 830 650Q900 660 1050 560", w: 1.25, o: 0.14, c: BLUE_FAINT },
];

export function HeroDeco() {
  return (
    <SVG>
      <defs>
        <linearGradient id="vfade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="40%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="vmask"><rect width="100%" height="100%" fill="url(#vfade)" /></mask>
      </defs>
      <g mask="url(#vmask)">
        {curves.map((curve, i) => (
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
              pathLength: { duration: 2, delay: i * 0.3, ease: "easeOut" },
              opacity: { duration: 0.5, delay: i * 0.3 },
            }}
          />
        ))}
      </g>
    </SVG>
  );
}
