"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

/* Composable atmospheric landscape primitives.
 *
 * Each scene composes a unique landscape from these atoms:
 *
 *   • SkyGradient      — top-to-bottom palette transition (dominant story)
 *   • HorizonBand      — soft horizontal stripe at a configurable Y position
 *   • DriftAuras       — large radial gradients that drift slowly (the "weather")
 *   • LightSource      — directional radial light from a scene-specific origin
 *   • AtmosphericHaze  — full-screen tinted overlay at low opacity (mist/sun-haze)
 *   • TextureGrain     — faint noise across everything for an "earthy" feel
 *   • HorizonStrokes   — thin horizontal lines suggesting water/grain
 *   • HillSilhouettes  — soft hill outlines for Dream/Outro horizons
 *   • DepthVignette    — strong cinematic radial darkening that pulls eye to center
 *   • FocalBloom       — center-screen radial bloom; pulses at beat changes
 *   • AtmosphericRays  — soft god-rays emanating from a light source
 *   • ParticleField    — slow-drifting dust motes / mist particles
 *
 * The product UI (AppFrame, cards, chat bar) stays clean white. The landscape
 * is the WORLD around the product — they're separate concerns. Tinted shadows
 * on the product surface are how you make the white app feel integrated into
 * the world. See `productShadow()` helper.
 */

/* ───────── SkyGradient ───────── */

export type GradientStop = { offset: number; color: string };

export function SkyGradient({
  stops,
  direction = "180deg",
}: {
  stops: GradientStop[];
  direction?: string;
}) {
  const gradient = `linear-gradient(${direction}, ${stops
    .map((s) => `${s.color} ${s.offset * 100}%`)
    .join(", ")})`;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: gradient,
        pointerEvents: "none",
      }}
    />
  );
}

/* ───────── HorizonBand ───────── */
/* A soft horizontal band at a configurable Y. Reads as a horizon line. */

export function HorizonBand({
  y = "62%",
  height = 240,
  topColor,
  bottomColor,
  glowColor,
  glowIntensity = 0.55,
}: {
  y?: string;
  height?: number;
  topColor: string;
  bottomColor: string;
  glowColor?: string;
  glowIntensity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 0,
        right: 0,
        height,
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`,
          filter: "blur(40px)",
          opacity: 0.7,
        }}
      />
      {glowColor && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120%",
            height: 200,
            background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(60px)",
            opacity: glowIntensity,
            mixBlendMode: "screen",
          }}
        />
      )}
    </div>
  );
}

/* ───────── DriftAuras ───────── */
/* Large soft radial gradients that drift on independent loops.
 * Each scene gets a tuned set; defaults below match the field/grain motif. */

export type AuraSpec = {
  size: number;            // px
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  color: string;           // CSS color (gets a hex-alpha suffix applied)
  opacity?: number;        // 0..1, default 0.5
  blur?: number;           // px, default 80
  drift?: { x: number; y: number; scale?: number; duration: number };
};

export function DriftAuras({ auras }: { auras: AuraSpec[] }) {
  return (
    <>
      {auras.map((a, i) => (
        <motion.div
          key={i}
          animate={
            a.drift
              ? {
                  x: [0, a.drift.x, -a.drift.x * 0.6, 0],
                  y: [0, a.drift.y, -a.drift.y * 0.6, 0],
                  scale: a.drift.scale
                    ? [1, a.drift.scale, 1 / a.drift.scale, 1]
                    : [1, 1, 1, 1],
                }
              : undefined
          }
          transition={
            a.drift
              ? { duration: a.drift.duration, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{
            position: "absolute",
            top: a.top,
            bottom: a.bottom,
            left: a.left,
            right: a.right,
            width: a.size,
            height: a.size,
            background: `radial-gradient(circle, ${a.color}${alphaHex(a.opacity ?? 0.5)} 0%, ${a.color}00 60%)`,
            filter: `blur(${a.blur ?? 80}px)`,
            pointerEvents: "none",
            willChange: a.drift ? "transform" : undefined,
          }}
        />
      ))}
    </>
  );
}

/* ───────── LightSource ───────── */
/* Directional radial light from a scene-specific origin.
 * Use this for sun, moon, lamp light, etc. */

export function LightSource({
  origin = "top-right",
  color,
  size = "75%",
  intensity = 0.55,
  blendMode = "screen",
}: {
  origin?:
    | "top-left"
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left"
    | "center";
  color: string;
  size?: string;
  intensity?: number;
  blendMode?: CSSProperties["mixBlendMode"];
}) {
  const pos = ORIGIN_POSITIONS[origin];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle ${size} at ${pos.x} ${pos.y}, ${color}${alphaHex(intensity)} 0%, transparent 70%)`,
        pointerEvents: "none",
        mixBlendMode: blendMode,
      }}
    />
  );
}

const ORIGIN_POSITIONS: Record<string, { x: string; y: string }> = {
  "top-left":     { x: "8%",  y: "8%"  },
  "top":          { x: "50%", y: "0%"  },
  "top-right":    { x: "92%", y: "8%"  },
  "right":        { x: "100%", y: "50%" },
  "bottom-right": { x: "92%", y: "92%" },
  "bottom":       { x: "50%", y: "100%"},
  "bottom-left":  { x: "8%",  y: "92%" },
  "left":         { x: "0%",  y: "50%" },
  "center":       { x: "50%", y: "50%" },
};

/* ───────── AtmosphericHaze ───────── */
/* Full-screen low-opacity tint. Use for mist, sun-dust, twilight wash. */

export function AtmosphericHaze({
  color,
  opacity = 0.08,
  blendMode = "multiply",
}: {
  color: string;
  opacity?: number;
  blendMode?: CSSProperties["mixBlendMode"];
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity,
        mixBlendMode: blendMode,
        pointerEvents: "none",
      }}
    />
  );
}

/* ───────── TextureGrain ───────── */
/* Subtle noise grain for an "earthy" feel. SVG-based fractal noise. */

export function TextureGrain({
  opacity = 0.025,
  baseFrequency = 0.85,
}: {
  opacity?: number;
  baseFrequency?: number;
}) {
  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "multiply",
      }}
      aria-hidden
    >
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}

/* ───────── HorizonStrokes ───────── */
/* Thin horizontal lines suggesting water ripples, field grain, etc.
 * Variant of the curve sweep but tuned for landscape feel. */

export function HorizonStrokes({
  count = 6,
  color,
  yStart = "60%",
  yEnd = "85%",
  opacity = 0.18,
  strokeWidth = 1.5,
}: {
  count?: number;
  color: string;
  yStart?: string;
  yEnd?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const lines = Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0 : i / (count - 1);
    const y = lerpPercent(yStart, yEnd, t);
    const widthPct = round4(60 + t * 30);
    const opacityT = round4(opacity * (1 - t * 0.5));
    const startX = round4((100 - widthPct) / 2);
    return { y, startX, widthPct, opacityT };
  });
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden
    >
      {lines.map((l, i) => {
        const yPx = round2((parseFloat(l.y) / 100) * 1080);
        const x1Px = round2((l.startX / 100) * 1920);
        const x2Px = round2(((l.startX + l.widthPct) / 100) * 1920);
        return (
          <line
            key={i}
            x1={x1Px}
            y1={yPx}
            x2={x2Px}
            y2={yPx}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={l.opacityT}
          />
        );
      })}
    </svg>
  );
}

/* ───────── HillSilhouettes ───────── */
/* Soft rolling-hill silhouettes — used for Dream/Outro horizons. */

export type HillSpec = {
  d: string;          // SVG path data
  color: string;
  opacity?: number;
  blur?: number;
};

export function HillSilhouettes({ hills }: { hills: HillSpec[] }) {
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden
    >
      {hills.map((h, i) => (
        <path
          key={i}
          d={h.d}
          fill={h.color}
          opacity={h.opacity ?? 0.6}
          style={h.blur ? { filter: `blur(${h.blur}px)` } : undefined}
        />
      ))}
    </svg>
  );
}

/* ───────── ProductShadow helper ─────────
 * Returns a box-shadow string tinted to match the scene's atmosphere.
 * Apply this to AppFrame / chat bar / cards inside a scene so the white
 * product surface feels integrated into the world (warm-tinted shadow in a
 * golden field, blue-tinted in an ocean, violet-tinted at twilight). */

export function productShadow({
  tint,
  intensity = 1,
  size = "lg",
}: {
  tint: string;       // hex like "#D97706"
  intensity?: number; // 0..2 multiplier
  size?: "sm" | "md" | "lg" | "xl";
}): string {
  const profiles = {
    sm: { spread1: 16, blur1: 32,  alpha1: 0.10, spread2: 6,  blur2: 14, alpha2: 0.04 },
    md: { spread1: 30, blur1: 60,  alpha1: 0.14, spread2: 12, blur2: 28, alpha2: 0.06 },
    lg: { spread1: 60, blur1: 140, alpha1: 0.18, spread2: 24, blur2: 60, alpha2: 0.10 },
    xl: { spread1: 80, blur1: 180, alpha1: 0.20, spread2: 32, blur2: 80, alpha2: 0.12 },
  } as const;
  const p = profiles[size];
  const tinted = (a: number) =>
    `${tint}${alphaHex(Math.min(1, a * intensity))}`;
  return [
    `0 ${p.spread1}px ${p.blur1}px ${tinted(p.alpha1)}`,
    `0 ${p.spread2}px ${p.blur2}px ${tinted(p.alpha2)}`,
    `0 0 0 1px ${tinted(0.05 * intensity)}`,
  ].join(", ");
}

/* ───────── DepthVignette ─────────
 * Strong cinematic radial darkening — pulls the eye to center.
 * Pass scene-specific `tint` (hex like "#1A1410") and intensity for cohesion. */

export function DepthVignette({
  tint = "#14120E",
  intensity = 0.42,
  innerStop = 35,
  outerStop = 100,
  shape = "ellipse",
}: {
  tint?: string;
  intensity?: number;
  innerStop?: number;
  outerStop?: number;
  shape?: "ellipse" | "circle";
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(${shape} at center, ${tint}00 ${innerStop}%, ${tint}${alphaHex(intensity)} ${outerStop}%)`,
        pointerEvents: "none",
      }}
    />
  );
}

/* ───────── FocalBloom ─────────
 * A radial bloom centered on the focal point. Use `pulse` to brighten briefly
 * at beat changes (replaces the rejected horizontal sweep). Static bloom holds
 * eye anchor when not pulsing. */

export function FocalBloom({
  color = "#FFFFFF",
  size = "60%",
  baseIntensity = 0.18,
  pulse = false,
  pulseDuration = 1.2,
  blendMode = "screen",
  cx = "50%",
  cy = "50%",
}: {
  color?: string;
  size?: string;
  baseIntensity?: number;
  pulse?: boolean;
  pulseDuration?: number;
  blendMode?: CSSProperties["mixBlendMode"];
  cx?: string;
  cy?: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: pulse ? [baseIntensity, baseIntensity * 2.6, baseIntensity] : baseIntensity,
      }}
      transition={
        pulse
          ? { duration: pulseDuration, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.4, 1] }
          : { duration: 0 }
      }
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle ${size} at ${cx} ${cy}, ${color} 0%, transparent 70%)`,
        pointerEvents: "none",
        mixBlendMode: blendMode,
        willChange: "opacity",
      }}
    />
  );
}

/* ───────── AtmosphericRays ─────────
 * Soft god-rays from a configurable origin. Multiple cones at varying angles
 * give a layered light feel. Slowly drifts. */

export function AtmosphericRays({
  origin = "top-right",
  color = "#FFFFFF",
  rayCount = 5,
  intensity = 0.18,
  spread = 60,    // degrees of arc
  length = 140,   // % of viewport
}: {
  origin?:
    | "top-left"
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left";
  color?: string;
  rayCount?: number;
  intensity?: number;
  spread?: number;
  length?: number;
}) {
  const pos = ORIGIN_POSITIONS[origin];
  const baseAngle = ORIGIN_ANGLES[origin];
  const halfSpread = spread / 2;
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const t = rayCount === 1 ? 0.5 : i / (rayCount - 1);
    const angle = baseAngle - halfSpread + spread * t;
    return { angle, opacity: intensity * (0.6 + Math.sin(t * Math.PI) * 0.4) };
  });
  return (
    <motion.div
      animate={{ rotate: [0, 0.6, -0.4, 0] }}
      transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        transformOrigin: `${pos.x} ${pos.y}`,
        willChange: "transform",
      }}
    >
      {rays.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: pos.y,
            left: pos.x,
            width: `${length}vmax`,
            height: 240,
            background: `linear-gradient(90deg, ${color}${alphaHex(r.opacity)} 0%, transparent 75%)`,
            transform: `translate(-0%, -50%) rotate(${r.angle}deg)`,
            transformOrigin: "0% 50%",
            filter: "blur(50px)",
            mixBlendMode: "screen",
          }}
        />
      ))}
    </motion.div>
  );
}

const ORIGIN_ANGLES: Record<string, number> = {
  "top-left":     45,
  "top":          90,
  "top-right":    135,
  "right":        180,
  "bottom-right": 225,
  "bottom":       270,
  "bottom-left":  315,
  "left":         0,
};

/* ───────── ParticleField ─────────
 * Slow-drifting dust motes / mist particles. Constant gentle motion across the
 * entire scene — gives the world a sense of life without being beat-tied. */

export function ParticleField({
  count = 28,
  color = "#FFFFFF",
  minSize = 1.5,
  maxSize = 4,
  intensity = 0.6,
  driftDistance = 60,
  durationRange = [22, 38] as [number, number],
  seed = 0,
}: {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  intensity?: number;
  driftDistance?: number;
  durationRange?: [number, number];
  seed?: number;
}) {
  /* Deterministic pseudo-random so renders are stable across hot reloads.
   * All computed values are rounded to fixed precision so server-rendered
   * HTML and client-rendered HTML serialize identically (avoids hydration
   * mismatch errors on floating-point style values). */
  const particles = Array.from({ length: count }, (_, i) => {
    const r1 = pseudoRandom(seed + i * 2);
    const r2 = pseudoRandom(seed + i * 2 + 1);
    const r3 = pseudoRandom(seed + i * 7);
    const r4 = pseudoRandom(seed + i * 11);
    const r5 = pseudoRandom(seed + i * 13);
    const r6 = pseudoRandom(seed + i * 17);
    return {
      x: round4(r1 * 100),
      y: round4(r2 * 100),
      size: round2(minSize + r3 * (maxSize - minSize)),
      opacity: round4(0.35 + r4 * 0.55),
      duration: round2(durationRange[0] + r5 * (durationRange[1] - durationRange[0])),
      delay: round2(-r6 * durationRange[1]),
      driftX: round2((r4 - 0.5) * driftDistance * 2),
      driftY: round2(-driftDistance - r5 * driftDistance),
    };
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: round4(p.opacity * intensity) }}
          animate={{
            x: [0, p.driftX, round2(p.driftX * 0.6), 0],
            y: [0, p.driftY, round2(p.driftY * 1.4), round2(p.driftY * 1.6)],
            opacity: [
              round4(p.opacity * intensity),
              round4(p.opacity * intensity * 1.2),
              0,
            ],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: 999,
            background: color,
            filter: `blur(${p.size > 3 ? 1 : 0.4}px)`,
            mixBlendMode: "screen",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

/* ───────── HillRange ─────────
 * Multiple SVG-path silhouettes layered with parallax horizontal drift.
 * Each layer drifts at its own speed; deeper layers drift slower (depth cue).
 * Use for distant horizons in dawn / sunset / twilight scenes. */

export type HillLayer = {
  d: string;            // SVG path, viewBox 1920x1080
  color: string;
  opacity?: number;     // 0..1
  blur?: number;        // px
  parallaxAmp?: number; // px of horizontal drift
  duration?: number;    // s for one cycle
};

export function HillRange({ layers }: { layers: HillLayer[] }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {layers.map((layer, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMax slice"
          animate={{
            x: [0, layer.parallaxAmp ?? 30, -(layer.parallaxAmp ?? 30) * 0.6, 0],
          }}
          transition={{
            duration: layer.duration ?? 30 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "108%",
            height: "100%",
            left: "-4%",
            filter: layer.blur ? `blur(${layer.blur}px)` : undefined,
            willChange: "transform",
          }}
        >
          <path d={layer.d} fill={layer.color} opacity={layer.opacity ?? 0.6} />
        </motion.svg>
      ))}
    </div>
  );
}

/* ───────── TwinkleField ─────────
 * Small bright points at deterministic positions that pulse opacity.
 * Use for stars (Outro), water glints (Solution), dawn fading stars (Dream),
 * or magic sparkles (Use Cases mosaic). */

export function TwinkleField({
  count = 24,
  color = "#FFFFFF",
  minSize = 1.5,
  maxSize = 3,
  intensity = 0.85,
  yMin = 0,
  yMax = 100,
  durationRange = [2.4, 5.0] as [number, number],
  seed = 0,
}: {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  intensity?: number;
  yMin?: number;       // %
  yMax?: number;       // %
  durationRange?: [number, number];
  seed?: number;
}) {
  const stars = Array.from({ length: count }, (_, i) => {
    const r1 = pseudoRandom(seed + i * 3);
    const r2 = pseudoRandom(seed + i * 5);
    const r3 = pseudoRandom(seed + i * 7);
    const r4 = pseudoRandom(seed + i * 11);
    const r5 = pseudoRandom(seed + i * 13);
    const size = round2(minSize + r3 * (maxSize - minSize));
    return {
      x: round4(r1 * 100),
      y: round4(yMin + r2 * (yMax - yMin)),
      size,
      duration: round2(durationRange[0] + r4 * (durationRange[1] - durationRange[0])),
      delay: round2(-r5 * durationRange[1]),
      peakOpacity: round4((0.6 + r3 * 0.4) * intensity),
    };
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, s.peakOpacity, round4(s.peakOpacity * 0.4), s.peakOpacity, 0],
            scale: [0.5, 1, 0.85, 1, 0.5],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.55, 0.75, 1],
          }}
          style={{
            position: "absolute",
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 ${round2(s.size * 4)}px ${color}, 0 0 ${round2(s.size * 2)}px ${color}`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

/* ───────── LightShafts ─────────
 * Visible animated god-rays — distinct streaks emanating from a light source.
 * More prominent than AtmosphericRays. Each shaft has its own opacity pulse
 * and slight rotation animation. */

export function LightShafts({
  origin = "top-right",
  color = "#FFFFFF",
  count = 4,
  intensity = 0.18,
  spread = 70,
  length = 130,
  rotateDeg = 4,
  pulseDuration = 6,
}: {
  origin?:
    | "top-left"
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left";
  color?: string;
  count?: number;
  intensity?: number;
  spread?: number;
  length?: number;
  rotateDeg?: number;
  pulseDuration?: number;
}) {
  const pos = ORIGIN_POSITIONS[origin];
  const baseAngle = ORIGIN_ANGLES[origin];
  const halfSpread = spread / 2;
  const shafts = Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = baseAngle - halfSpread + spread * t;
    const peak = intensity * (0.7 + Math.sin(t * Math.PI) * 0.5);
    const dur = pulseDuration + i * 0.7;
    return { angle, peak, dur, phase: i * 0.3 };
  });
  return (
    <motion.div
      animate={{ rotate: [0, rotateDeg, -rotateDeg * 0.5, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        transformOrigin: `${pos.x} ${pos.y}`,
        willChange: "transform",
      }}
    >
      {shafts.map((s, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [s.peak * 0.3, s.peak, s.peak * 0.6, s.peak * 0.9, s.peak * 0.3] }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.phase,
          }}
          style={{
            position: "absolute",
            top: pos.y,
            left: pos.x,
            width: `${length}vmax`,
            height: 90,
            background: `linear-gradient(90deg, ${color}${alphaHex(0.85)} 0%, ${color}${alphaHex(0.55)} 25%, transparent 80%)`,
            transform: `translateY(-50%) rotate(${s.angle}deg)`,
            transformOrigin: "0% 50%",
            filter: "blur(28px)",
            mixBlendMode: "screen",
            willChange: "opacity",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ───────── BloomFlare ─────────
 * Anamorphic lens flare at a configurable position. Horizontal stretched
 * streak + bright vertical core + radial bloom. Subtle pulse animation.
 * Use at the location of a sun / strong light source for cinematic polish. */

export function BloomFlare({
  cx = "92%",
  cy = "12%",
  color = "#FFFFFF",
  intensity = 0.55,
  size = 600,
  pulseDuration = 7,
}: {
  cx?: string;
  cy?: string;
  color?: string;
  intensity?: number;
  size?: number;
  pulseDuration?: number;
}) {
  return (
    <motion.div
      animate={{ opacity: [intensity * 0.7, intensity, intensity * 0.85, intensity, intensity * 0.7] }}
      transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: cy,
        left: cx,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        mixBlendMode: "screen",
        willChange: "opacity",
      }}
    >
      {/* Anamorphic horizontal streak */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size * 2.2,
          height: size * 0.13,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(90deg, transparent 0%, ${color}${alphaHex(0.30)} 30%, ${color}${alphaHex(0.65)} 50%, ${color}${alphaHex(0.30)} 70%, transparent 100%)`,
          filter: "blur(14px)",
          borderRadius: 999,
        }}
      />
      {/* Bright vertical core */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size * 0.14,
          height: size * 1.2,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(180deg, transparent 0%, ${color}${alphaHex(0.45)} 50%, transparent 100%)`,
          filter: "blur(16px)",
          borderRadius: 999,
        }}
      />
      {/* Radial bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle, ${color}${alphaHex(0.45)} 0%, ${color}${alphaHex(0.18)} 28%, transparent 70%)`,
          filter: "blur(22px)",
        }}
      />
    </motion.div>
  );
}

/* ───────── WheatStrokes ─────────
 * Vertical thin lines in a foreground band that sway slightly (like wheat
 * caught in a breeze). Use for Demo's foreground field detail. */

export function WheatStrokes({
  count = 80,
  color = "#A16207",
  yBase = 78,         // % from top — bottom of viewport area
  heightRange = [80, 200] as [number, number],
  opacity = 0.18,
  swayAngle = 2.5,
  swayDuration = 4.5,
  seed = 0,
}: {
  count?: number;
  color?: string;
  yBase?: number;
  heightRange?: [number, number];
  opacity?: number;
  swayAngle?: number;
  swayDuration?: number;
  seed?: number;
}) {
  const strokes = Array.from({ length: count }, (_, i) => {
    const r1 = pseudoRandom(seed + i * 2);
    const r2 = pseudoRandom(seed + i * 5);
    const r3 = pseudoRandom(seed + i * 7);
    const r4 = pseudoRandom(seed + i * 11);
    const height = round2(heightRange[0] + r2 * (heightRange[1] - heightRange[0]));
    return {
      x: round4(r1 * 100),
      heightPx: height,
      lineOpacity: round4(opacity * (0.5 + r3 * 0.7)),
      duration: round2(swayDuration + r4 * 2.5),
      delay: round2(-r4 * swayDuration),
      strokeWidth: round2(0.8 + r3 * 1.2),
    };
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {strokes.map((s, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [-swayAngle, swayAngle, -swayAngle * 0.7, swayAngle * 0.9, -swayAngle] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
          style={{
            position: "absolute",
            top: `${yBase}%`,
            left: `${s.x}%`,
            width: `${s.strokeWidth}px`,
            height: `${s.heightPx}px`,
            background: `linear-gradient(180deg, transparent 0%, ${color} 30%, ${color} 100%)`,
            opacity: s.lineOpacity,
            transformOrigin: "50% 100%",
            filter: "blur(0.4px)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

/* ───────── AnimatedRipples ─────────
 * Horizontal lines simulating water surface ripples. Each ripple fades in
 * and out on its own loop, suggesting subtle wave motion. Use below the
 * horizon line for ocean / lake / river scenes. */

export function AnimatedRipples({
  count = 9,
  color = "#FFFFFF",
  yStart = 56,
  yEnd = 90,
  baseOpacity = 0.18,
  durationRange = [4, 7.5] as [number, number],
  strokeWidth = 1.4,
  seed = 0,
}: {
  count?: number;
  color?: string;
  yStart?: number;     // %
  yEnd?: number;       // %
  baseOpacity?: number;
  durationRange?: [number, number];
  strokeWidth?: number;
  seed?: number;
}) {
  const ripples = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const y = yStart + t * (yEnd - yStart);
    const r1 = pseudoRandom(seed + i * 3);
    const r2 = pseudoRandom(seed + i * 7);
    const widthPct = round4(50 + (1 - t) * 35 + r1 * 12); // wider near horizon
    const startX = round4((100 - widthPct) / 2);
    const peak = round4(baseOpacity * (1 - t * 0.5) * (0.6 + r1 * 0.8));
    const duration = round2(durationRange[0] + r2 * (durationRange[1] - durationRange[0]));
    return {
      y: round4(y),
      startX,
      widthPct,
      peak,
      duration,
      delay: round2(-r1 * duration),
      strokeWidth: round2(strokeWidth * (1.2 - t * 0.4)),
    };
  });
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden
    >
      {ripples.map((r, i) => {
        const yPx = round2((r.y / 100) * 1080);
        const x1Px = round2((r.startX / 100) * 1920);
        const x2Px = round2(((r.startX + r.widthPct) / 100) * 1920);
        return (
          <motion.line
            key={i}
            x1={x1Px}
            y1={yPx}
            x2={x2Px}
            y2={yPx}
            stroke={color}
            strokeWidth={r.strokeWidth}
            strokeLinecap="round"
            animate={{ opacity: [0, r.peak, round4(r.peak * 0.4), r.peak, 0] }}
            transition={{
              duration: r.duration,
              delay: r.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.55, 0.75, 1],
            }}
          />
        );
      })}
    </svg>
  );
}

function pseudoRandom(n: number): number {
  /* Simple deterministic hash → [0,1] */
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

/* ───────── AuroraBands ─────────
 *
 * Wide, very soft, slowly-drifting horizontal color streamers. Reads as
 * aurora-borealis style flowing light bands — adds depth and motion to the
 * sky without literal terrestrial elements. Each band is a wide blurred
 * gradient with `mix-blend-mode: screen` so it brightens whatever it
 * overlays.
 *
 * Usage: 2–4 bands per scene, varied y-position, color, rotation, and drift
 * duration. Use long durations (24–40s) so motion feels atmospheric, not
 * busy. */

export type AuroraBand = {
  /** Vertical center of the band (CSS top value or px). */
  y: string | number;
  /** Color of the band's brightest center. */
  color: string;
  /** Width as % of viewport (default 220, extends past edges so drift wraps gracefully). */
  width?: number;
  /** Height of the band in px. */
  height?: number;
  /** Rotation angle in degrees. */
  rotate?: number;
  /** Peak opacity. */
  intensity?: number;
  /** Full sweep duration in seconds. */
  duration?: number;
  /** Horizontal drift distance in px (peak-to-peak). */
  driftX?: number;
};

export function AuroraBands({ bands }: { bands: AuroraBand[] }) {
  return (
    <>
      {bands.map((b, i) => {
        const width  = b.width ?? 220;
        const height = b.height ?? 200;
        const driftX = b.driftX ?? 120;
        const duration = b.duration ?? 30;
        const intensity = b.intensity ?? 0.40;
        const rotate = b.rotate ?? 0;
        const y = typeof b.y === "number" ? b.y : b.y;
        return (
          <motion.div
            key={i}
            animate={{
              x: [-driftX / 2, driftX / 2, -driftX / 2],
              opacity: [intensity * 0.7, intensity, intensity * 0.7],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            style={{
              position: "absolute",
              top: y,
              left: "50%",
              width: `${width}%`,
              height,
              marginLeft: `-${width / 2}%`,
              marginTop: `-${height / 2}px`,
              transform: `rotate(${rotate}deg)`,
              transformOrigin: "center center",
              background: `linear-gradient(90deg, transparent 0%, ${b.color} 30%, ${b.color} 70%, transparent 100%)`,
              filter: `blur(${Math.round(height * 0.45)}px)`,
              mixBlendMode: "screen",
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
}

/* ───────── BokehField ─────────
 *
 * Soft, large, out-of-focus circular highlights that drift and breathe.
 * Reads as a dreamy bokeh layer — pure light points at varied depths giving
 * a tactile "lens looking into the world" feel. Use 3–5 dots per scene at
 * varied positions, sizes, and durations. */

export type BokehDot = {
  /** Diameter in px. */
  size: number;
  top?: string | number;
  left?: string | number;
  bottom?: string | number;
  right?: string | number;
  /** Bright core color. */
  color: string;
  /** Peak opacity (default 0.35). */
  opacity?: number;
  /** Outer blur radius in px (default proportional to size). */
  blur?: number;
  /** Breathing cycle duration in seconds. */
  duration?: number;
  /** Horizontal drift distance in px (peak-to-peak). */
  driftX?: number;
  /** Vertical drift distance in px (peak-to-peak). */
  driftY?: number;
};

export function BokehField({ dots }: { dots: BokehDot[] }) {
  return (
    <>
      {dots.map((d, i) => {
        const opacity = d.opacity ?? 0.35;
        const blur = d.blur ?? Math.round(d.size * 0.18);
        const duration = d.duration ?? 18;
        const driftX = d.driftX ?? 30;
        const driftY = d.driftY ?? 20;
        return (
          <motion.div
            key={i}
            animate={{
              x: [-driftX / 2, driftX / 2, -driftX / 2],
              y: [-driftY / 2, driftY / 2, -driftY / 2],
              scale: [1, 1.12, 1],
              opacity: [opacity * 0.7, opacity, opacity * 0.7],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            style={{
              position: "absolute",
              top: d.top,
              left: d.left,
              bottom: d.bottom,
              right: d.right,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: `radial-gradient(circle at center, ${d.color} 0%, ${d.color}88 35%, transparent 70%)`,
              filter: `blur(${blur}px)`,
              mixBlendMode: "screen",
              willChange: "transform, opacity",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
}

/* ───────── helpers ───────── */

function alphaHex(v: number): string {
  const clamped = Math.max(0, Math.min(1, v));
  return Math.round(clamped * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}

function lerpPercent(a: string, b: string, t: number): string {
  const aN = parseFloat(a);
  const bN = parseFloat(b);
  return `${aN + (bN - aN) * t}%`;
}
