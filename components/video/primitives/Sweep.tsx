"use client";

import { BLUE, BLUE_LIGHT, INDIGO } from "./tokens";

/* Horizon sweep — blue gradient band travels off-left → off-right.
 * Used at every beat change inside a scene. Driven by scene's local clock t.
 */
export function Sweep({
  t,
  startTime,
  duration = 1.4,
  height = 380,
  intensity = 0.7,
}: {
  t: number;
  startTime: number;
  duration?: number;
  height?: number;
  intensity?: number;
}) {
  const progress = (t - startTime) / duration;
  if (progress < 0 || progress > 1) return null;

  const x = -30 + 160 * progress;
  let opacity: number;
  if (progress < 0.18) opacity = progress / 0.18;
  else if (progress > 0.82) opacity = (1 - progress) / 0.18;
  else opacity = 1;
  opacity *= intensity;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: `${x}%`,
        transform: "translateY(-50%)",
        width: "56vw",
        height,
        background: `linear-gradient(90deg, transparent 0%, ${BLUE_LIGHT}DD 25%, ${BLUE}EE 50%, ${INDIGO}CC 75%, transparent 100%)`,
        filter: "blur(70px)",
        pointerEvents: "none",
        opacity,
        mixBlendMode: "multiply",
      }}
    />
  );
}
