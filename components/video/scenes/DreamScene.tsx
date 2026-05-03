"use client";

import { memo } from "react";
import { StaggeredText } from "@/components/video/primitives/StaggeredText";
import {
  SkyGradient,
  DriftAuras,
  LightSource,
  AtmosphericHaze,
  AtmosphericRays,
  ParticleField,
  FocalBloom,
  DepthVignette,
  TextureGrain,
  TwinkleField,
  LightShafts,
  BloomFlare,
  AuroraBands,
  BokehField,
} from "@/components/video/primitives/Landscape";
import { FONT } from "@/components/video/primitives/tokens";

export const DREAM_DURATION_MS = 15000;
export const DREAM_BACKGROUND = "#1A0F2E";

/* ATMOSPHERICS — temporary kill-switch.
 * Set to false to strip ALL background gradients, landscape primitives, washes,
 * blooms, vignettes, and the heavenly arc. The scene renders on plain white so
 * we can review structural elements (text, icons, mockup organization, timing)
 * without atmospheric noise. Flip back to `true` to restore the full Dream
 * landscape (pre-dawn aurora + heavenly arc + warm wash). All atmospheric code
 * is preserved beneath this flag. */
const ATMOSPHERICS = false;

/* DREAM scene — 0:00–0:12 of the VSL.
 *
 * Landscape: PRE-DAWN AURORA.
 *   Abstract gradient flow — deep pre-dawn night sky drifting through mauve,
 *   warm rose, peach, and cream. No literal hills or horizon line. Color
 *   masses drift at varied depths; warm rays and bloom suggest a rising sun
 *   in the upper-right without drawing one. Fading dawn stars high in the sky.
 *
 * Opening (4-state cinematic transition):
 *   STATE 1: black text fades in on a plain white screen
 *   STATE 2: text shifts toward orange; warm radial wash builds and then
 *            fades to reveal the aurora landscape underneath
 *   STATE 3: text settles to white on the aurora landscape
 *   STATE 4: motion continues — auras drift, twinkles pulse, particles flow
 *
 * No logo at the start; the wordmark first appears in the Solution scene.
 *
 * Color choreography (one sustained warm phase between white and final palette):
 *   White → warm wash (held through the entire Setup beat) → fades out at
 *   3.8–4.6s synchronized with "…already handled." revealing the full
 *   landscape's darker oranges and purple/mauve hues. Two transitions total:
 *   white→warm at the open, warm→landscape on the resolution beat.
 *
 * Internal timeline:
 *   0.4s  – Setup text begins fading in (BLACK on plain white — STATE 1)
 *   1.0s  – Setup text fully visible (STATE 1 hold)
 *   1.4s  – STATE 2 begins: text shifts toward deep orange; warm wash builds
 *   2.0s  – Warm wash at full saturation; held through the Setup beat
 *   2.6s  – Text shifts toward white
 *   3.4s  – Setup text fades out (per-char reverse stagger, single block)
 *   ~4.4s  – Setup fully cleared (chars finish reverse-stagger exit)
 *   4.5s  – Resolution-A "were already handled for you" emerges (faster reveal:
 *           charDelay 0.020, enterDur 0.55 — fully formed by ~5.6s)
 *   5.7s  – Resolution-A begins exiting; ~6.3s fully gone
 *   6.0s  – Resolution-B "before the day started." begins entering (default
 *           charDelay 0.030). Brief cross-fade overlap with A's exit tail
 *           (~0.3s, A→B transition).
 *   6.7s  – Sky arc begins. Resolution-B has been entering for 0.7s and is
 *           substantially visible — the text has "already changed" by the
 *           time the moon rises from the LEFT endpoint of the arc. The arc
 *           sits ABOVE the text and sweeps 180° over the top.
 *   ~7.45s – Body crosses the peak; moon crossfades to sun (u ∈ [0.4, 0.6])
 *   8.2s  – Body reaches the RIGHT endpoint (full 180° complete). At this
 *           same moment, BOTH the arc and Resolution-B begin fading
 *           simultaneously.
 *   9.0s  – Arc + text fully gone
 *   9.0–9.2s – Brief gap before the Email/Drafts/Discovery/Billing beat
 *   9.2s  – Email tile fades in at NW corner
 *   9.8s  – Drafts tile fades in at NE corner
 *  10.4s  – Discovery tile fades in at SW corner
 *  11.0s  – Billing tile fades in at SE corner — all 4 now visible together
 *           (visual sentence under VO "Email. Drafts. Discovery. Billing.":
 *           breadth/scope of admin pain).
 *  11.4–12.0s – All 4 tiles hold; viewer takes in the cluttered pile.
 *  12.0–12.7s – Tiles drift outward (40% past home) and fade. The frame
 *           clears.
 *  12.5–13.2s – Focal element enters at center: a case file with a
 *           check-badge ("case won"). Visual sentence under VO "So you
 *           can focus on winning more cases.": the clutter is gone, what
 *           remains is the case win itself.
 *  13.2–14.4s – Focal holds.
 *  14.4–14.7s – Focal fades out.
 *  15.0s  – scene end
 */
export function DreamScene({ t }: { t: number }) {
  /* Text moments */
  const setupVisible       = t > 0.4 && t < 3.6;
  const resolutionAVisible = t > 4.5 && t < 5.7;   // "were already handled for you"
  const resolutionBVisible = t > 6.0 && t < 8.2;   // "before the day started."

  /* Beat changes */
  const beatBloom1 = t > 9.0 && t < 10.4;
  const beatBloom2 = t > 12.2 && t < 13.5;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: ATMOSPHERICS ? DREAM_BACKGROUND : "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {ATMOSPHERICS && (
        <>
          <DawnLandscape />
          <FocalBloom
            color="#FFD7A8"
            size="60%"
            baseIntensity={0.14}
            pulse={beatBloom1 || beatBloom2}
            pulseDuration={1.4}
            blendMode="screen"
          />
          <DepthVignette tint="#0A0518" intensity={0.55} innerStop={32} outerStop={100} />
          <HeavenlyArc t={t} />
          <OpeningWash t={t} />
        </>
      )}

      {/* Sky arc — visible on white-mode, paired with the resolution
       * text "...were already handled for you." to visualize the night-to-day
       * transition. Moon rises from the LEFT horizon, crossfades to a sun at
       * the peak, and lands as a sun on the RIGHT horizon (full 180° sweep). */}
      <RisingSunArc t={t} />

      <div style={{ position: "absolute", inset: 0, fontFamily: FONT, zIndex: 5 }}>
        <Setup visible={setupVisible} t={t} />
        <Resolution
          visible={resolutionAVisible}
          text="were already handled for you"
          charDelay={0.020}
          enterDuration={0.55}
        />
        <Resolution visible={resolutionBVisible} text="before the day started." />
        <BeatIcons t={t} />
        <FocalReveal t={t} />
      </div>
    </div>
  );
}

/* ───────── Landscape: pre-dawn aurora ───────── */

const DawnLandscape = memo(function DawnLandscape() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#1A0F2E" },
          { offset: 0.20, color: "#2E1A40" },
          { offset: 0.40, color: "#5A2A50" },
          { offset: 0.55, color: "#A04864" },
          { offset: 0.72, color: "#E08070" },
          { offset: 0.88, color: "#FFC68A" },
          { offset: 1,    color: "#FFE0BC" },
        ]}
      />

      <LightSource origin="top-right" color="#FFD7A8" size="85%" intensity={0.52} blendMode="screen" />

      <LightShafts
        origin="top-right"
        color="#FFE3B8"
        count={5}
        intensity={0.14}
        spread={75}
        length={130}
        rotateDeg={3}
        pulseDuration={6.5}
      />

      <BloomFlare cx="92%" cy="14%" color="#FFE0B8" intensity={0.55} size={600} pulseDuration={6} />

      {/* Drifting color masses — varied depths (sharp foreground, deep blur background)
       * to create parallax-like depth without literal silhouettes. */}
      <DriftAuras
        auras={[
          /* Deep background — softest, slowest */
          { size: 1320, top: -320, left: -320, color: "#3A1F40", opacity: 0.60, blur: 120,
            drift: { x: 70, y: 40, scale: 1.08, duration: 26 } },
          { size: 1240, top: -260, right: -300, color: "#5A2A50", opacity: 0.55, blur: 120,
            drift: { x: -65, y: 50, scale: 0.94, duration: 28 } },

          /* Midground color washes — primary mood carriers */
          { size: 1080, top: "4%", left: -180, color: "#A04864", opacity: 0.50, blur: 90,
            drift: { x: 90, y: 30, scale: 1.06, duration: 18 } },
          { size: 980,  top: "12%", right: -180, color: "#E08070", opacity: 0.46, blur: 80,
            drift: { x: -70, y: 50, scale: 0.94, duration: 20 } },
          { size: 820,  top: -100, left: "36%", color: "#FF9078", opacity: 0.42, blur: 70,
            drift: { x: 35, y: 22, duration: 22 } },

          /* Foreground warm masses — sharper, faster, lower */
          { size: 1080, bottom: -260, left: 60,  color: "#FFC68A", opacity: 0.55, blur: 80,
            drift: { x: 60, y: -30, scale: 1.05, duration: 16 } },
          { size: 1180, bottom: -300, right: 40, color: "#FFB67A", opacity: 0.50, blur: 80,
            drift: { x: -55, y: -40, scale: 1.04, duration: 18 } },
          { size: 760,  bottom: "18%", left: "42%", color: "#FFE0BC", opacity: 0.38, blur: 60,
            drift: { x: 30, y: -20, duration: 20 } },
          { size: 640,  bottom: "8%", left: "70%", color: "#FFD7A8", opacity: 0.32, blur: 50,
            drift: { x: -40, y: -25, scale: 1.06, duration: 17 } },
        ]}
      />

      {/* Aurora streamers — flowing curved light bands across the sky */}
      <AuroraBands
        bands={[
          { y: "22%", color: "#FFB67A", height: 220, rotate: -4, intensity: 0.32, duration: 32, driftX: 140 },
          { y: "48%", color: "#FF9078", height: 180, rotate: 3,  intensity: 0.28, duration: 38, driftX: 160 },
          { y: "72%", color: "#FFC68A", height: 240, rotate: -2, intensity: 0.22, duration: 28, driftX: 120 },
        ]}
      />

      {/* Bokeh — soft out-of-focus highlights drifting through depth */}
      <BokehField
        dots={[
          { size: 320, top: "18%", left: "12%", color: "#FFE0B8", opacity: 0.30, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "32%", left: "78%", color: "#FFB67A", opacity: 0.26, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#FFC68A", opacity: 0.24, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "76%", left: "82%", color: "#FFD7A8", opacity: 0.30, duration: 16, driftX: 28, driftY: 18 },
          { size: 300, top: "54%", left: "54%", color: "#FFE3B8", opacity: 0.20, duration: 24, driftX: 32, driftY: 22 },
        ]}
      />

      {/* Faint fading dawn stars high in the sky */}
      <TwinkleField
        count={14}
        color="#FFFFFF"
        minSize={1.2}
        maxSize={2.4}
        intensity={0.45}
        yMin={2}
        yMax={28}
        durationRange={[3, 6]}
        seed={3}
      />

      <AtmosphericHaze color="#5A2A50" opacity={0.07} blendMode="multiply" />

      <AtmosphericRays
        origin="top-right"
        color="#FFE3B8"
        rayCount={5}
        intensity={0.10}
        spread={70}
        length={130}
      />

      <ParticleField
        count={30}
        color="#FFD7A8"
        minSize={1.4}
        maxSize={3.6}
        intensity={0.55}
        driftDistance={65}
        durationRange={[20, 36]}
        seed={5}
      />

      <TextureGrain opacity={0.025} />
    </>
  );
});

/* ───────── Opening wash ─────────
 *
 * Layered above the landscape and below the text. A single radial-gradient
 * plane that morphs from solid white → warm peach/orange wash → transparent.
 * Combined with synchronized text-color animation, this creates the
 * 4-state opening: white→warm→landscape, with text shifting black→orange→white.
 */

const TEXT_BLACK         = "#1A0F2E";
const TEXT_ORANGE_DEEP   = "#C2410C";
const TEXT_ORANGE_BRIGHT = "#F97316";
const TEXT_WHITE_HEX     = "#FFFFFF";

function smoothStep(x: number): number {
  const k = Math.max(0, Math.min(1, x));
  return k * k * (3 - 2 * k);
}

function lerpHex(a: string, b: string, kRaw: number): string {
  const k = Math.max(0, Math.min(1, kRaw));
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ar + (br - ar) * k);
  const g = Math.round(ag + (bg - ag) * k);
  const bl = Math.round(ab + (bb - ab) * k);
  const hh = (n: number) => n.toString(16).padStart(2, "0");
  return `#${hh(r)}${hh(g)}${hh(bl)}`;
}

function setupTextColor(t: number): string {
  /* On white-bg mode, hold black throughout (no orange/white animation). */
  if (!ATMOSPHERICS) return TEXT_BLACK;
  if (t < 1.4) return TEXT_BLACK;
  if (t < 1.9) return lerpHex(TEXT_BLACK, TEXT_ORANGE_DEEP, (t - 1.4) / 0.5);
  if (t < 2.4) return lerpHex(TEXT_ORANGE_DEEP, TEXT_ORANGE_BRIGHT, (t - 1.9) / 0.5);
  if (t < 2.8) return lerpHex(TEXT_ORANGE_BRIGHT, TEXT_WHITE_HEX, (t - 2.4) / 0.4);
  return TEXT_WHITE_HEX;
}

function setupTextGlow(t: number): string {
  if (!ATMOSPHERICS) return "0 1px 2px rgba(0, 0, 0, 0.04)";
  /* State 1: minimal shadow (black on white needs no glow). */
  if (t < 1.4) return "0 1px 2px rgba(0, 0, 0, 0.04)";
  /* States 2–3: ramp up to the full warm cinematic glow. */
  const k = Math.min(1, (t - 1.4) / 1.4);
  return [
    `0 0 ${Math.round(32 * k)}px rgba(255, 200, 168, ${0.45 * k})`,
    `0 0 ${Math.round(80 * k)}px rgba(255, 215, 168, ${0.20 * k})`,
    `0 4px 22px rgba(20, 8, 36, ${0.65 * k})`,
  ].join(", ");
}

/* Wash plane: 0 background opacity at start (solid white), morphs to a warm
 * radial gradient, then fades to fully transparent revealing the landscape. */
function washColorBlend(t: number): number {
  if (t < 1.4) return 0;
  if (t > 2.0) return 1;
  return smoothStep((t - 1.4) / 0.6);
}

function washPlaneOpacity(t: number): number {
  /* Solid white at start, builds to full warm by 2.0s, holds through the
   * entire Setup beat, then fades out at 3.8–4.6s as "…already handled."
   * enters — revealing the full landscape (dark purples + rich aurora) on
   * that beat. One sustained warm phase between white and the final palette. */
  if (t < 3.8) return 1.0;
  if (t > 4.6) return 0;
  return 1 - smoothStep((t - 3.8) / 0.8);
}

function OpeningWash({ t }: { t: number }) {
  const opacity = washPlaneOpacity(t);
  if (opacity <= 0) return null;

  const k = washColorBlend(t);
  const inner = lerpHex("#FFFFFF", "#FFE3B8", k);
  const mid   = lerpHex("#FFFFFF", "#FFB67A", k);
  const outer = lerpHex("#FFFFFF", "#FF9078", k);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at 92% 14%, ${inner} 0%, ${mid} 40%, ${outer} 100%)`,
        opacity,
        pointerEvents: "none",
        zIndex: 4,
      }}
    />
  );
}

/* ───────── Heavenly arc — sun & moon ─────────
 *
 * Yesterday's sun sets, the moon rises and crosses the night sky, today's
 * sun rises and holds at peak. Sun/moon traverse a half-circle arc whose
 * diameter sits below screen-center; the arc itself is invisible — the
 * motion implies it. Visually compresses the passage of an entire night
 * into the resolution beat, signaling "before the day started".
 *
 * Phases:
 *   3.8–4.0s  sun fades in at peak (yesterday's noon)
 *   4.0–4.7s  sun descends right side to horizon (sunset)
 *   4.6–6.0s  moon traverses left horizon → peak → right horizon
 *   5.9–6.8s  sun ascends left side to peak (sunrise)
 *   6.8s+     sun holds at peak (morning) */

const ARC_CX = 50;   // % of viewport width
const ARC_CY = 62;   // % of viewport height (the arc's diameter sits here)
const ARC_RX = 36;   // % horizontal radius
const ARC_RY = 46;   // % vertical radius

function arcPos(u: number): { x: number; y: number } {
  /* u=0 → left horizon; u=0.5 → peak; u=1 → right horizon. */
  return {
    x: ARC_CX - ARC_RX * Math.cos(Math.PI * u),
    y: ARC_CY - ARC_RY * Math.sin(Math.PI * u),
  };
}

function sunState(t: number): { u: number; opacity: number } | null {
  /* Fade-in at peak (yesterday's noon already overhead). */
  if (t >= 3.8 && t < 4.0) {
    return { u: 0.5, opacity: smoothStep((t - 3.8) / 0.2) };
  }
  /* Sunset — descending right side. */
  if (t >= 4.0 && t < 4.7) {
    const u = 0.5 + 0.5 * smoothStep((t - 4.0) / 0.7);
    const opacity = t > 4.55 ? 1 - smoothStep((t - 4.55) / 0.15) : 1;
    return { u, opacity };
  }
  /* Sunrise — ascending left side. */
  if (t >= 5.9 && t < 6.8) {
    const u = 0.5 * smoothStep((t - 5.9) / 0.9);
    const opacity = t < 6.05 ? smoothStep((t - 5.9) / 0.15) : 1;
    return { u, opacity };
  }
  /* Hold at peak through the close of the scene. */
  if (t >= 6.8) {
    return { u: 0.5, opacity: 1 };
  }
  return null;
}

function moonState(t: number): { u: number; opacity: number } | null {
  if (t >= 4.6 && t < 6.0) {
    const u = smoothStep((t - 4.6) / 1.4);
    let opacity = 1;
    if (t < 4.75) opacity = smoothStep((t - 4.6) / 0.15);
    if (t > 5.85) opacity = 1 - smoothStep((t - 5.85) / 0.15);
    return { u, opacity };
  }
  return null;
}

function HeavenlyArc({ t }: { t: number }) {
  const sun = sunState(t);
  const moon = moonState(t);
  return (
    <>
      {sun && <CelestialBody type="sun" u={sun.u} opacity={sun.opacity} />}
      {moon && <CelestialBody type="moon" u={moon.u} opacity={moon.opacity} />}
    </>
  );
}

function CelestialBody({ type, u, opacity }: { type: "sun" | "moon"; u: number; opacity: number }) {
  const { x, y } = arcPos(u);
  const isSun = type === "sun";
  const size = isSun ? 92 : 76;
  const background = isSun
    ? "radial-gradient(circle at 50% 50%, #FFF8DA 0%, #FFD088 55%, #FFA040 100%)"
    : "radial-gradient(circle at 35% 35%, #F8FAFE 0%, #D8E0EC 55%, #8AA0BC 100%)";
  const boxShadow = isSun
    ? "0 0 70px rgba(255, 178, 88, 0.7), 0 0 140px rgba(255, 112, 48, 0.40), inset 0 0 24px rgba(255, 240, 200, 0.55)"
    : "0 0 50px rgba(200, 215, 240, 0.50), 0 0 100px rgba(100, 130, 175, 0.25), inset 0 0 18px rgba(255, 255, 255, 0.30)";

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
        borderRadius: "50%",
        background,
        boxShadow,
        pointerEvents: "none",
        opacity,
      }}
    />
  );
}

/* ───────── Setup ─────────
 *
 * Full sentence "Imagine if hours of case prep and admin work" reveals as a
 * single letter-by-letter stagger and exits as one block (no split fade). */

const SETUP_FONT_SIZE = 56;

function Setup({ visible, t }: { visible: boolean; t: number }) {
  const color = setupTextColor(t);
  const glow  = setupTextGlow(t);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center",
        padding: "0 80px",
      }}
    >
      <StaggeredText
        visible={visible}
        text="Imagine if hours of case prep and admin work"
        fontSize={SETUP_FONT_SIZE}
        fontWeight={600}
        color={color}
        glow={glow}
        charDelay={0.020}
      />
    </div>
  );
}

/* ───────── Resolution ───────── */

function Resolution({
  visible,
  text,
  charDelay = 0.030,
  enterDuration = 0.75,
}: {
  visible: boolean;
  text: string;
  charDelay?: number;
  enterDuration?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center",
        padding: "0 80px",
      }}
    >
      <StaggeredText
        visible={visible}
        text={text}
        fontSize={92}
        fontWeight={700}
        color={ATMOSPHERICS ? "#FFFFFF" : TEXT_BLACK}
        letterSpacing="-0.035em"
        glow={
          ATMOSPHERICS
            ? "0 0 40px rgba(255, 215, 168, 0.55), 0 0 100px rgba(255, 182, 122, 0.30), 0 6px 28px rgba(20, 8, 36, 0.70)"
            : "0 1px 2px rgba(0, 0, 0, 0.04)"
        }
        charDelay={charDelay}
        enterDuration={enterDuration}
      />
    </div>
  );
}

/* ───────── Beat icons — accumulate at corners, then disperse ─────────
 *
 * VO line "Email. Drafts. Discovery. Billing." is staccato. Each beat
 * adds a tile (icon + label) at one of four corner positions around
 * center. By the end of the line, all four are present together —
 * communicating the BREADTH of admin work that drains a lawyer's day.
 * After a brief hold, all four drift outward and fade out, clearing
 * the frame for the focal "Cases won" element on the resolving line
 * "So you can focus on winning more cases." */

type BeatType = "email" | "drafts" | "discovery" | "billing";

const BEAT_TILES: { type: BeatType; label: string; at: number; x: number; y: number }[] = [
  { type: "email",     label: "Email",     at: 9.2,  x: -300, y: -160 },
  { type: "drafts",    label: "Drafts",    at: 9.8,  x:  300, y: -160 },
  { type: "discovery", label: "Discovery", at: 10.4, x: -300, y:  160 },
  { type: "billing",   label: "Billing",   at: 11.0, x:  300, y:  160 },
];

const BEATS_HOLD_END     = 12.0;   // all 4 visible together until this point
const BEATS_DISPERSE_END = 12.7;   // tiles fully gone (drift-out + fade)
const BEAT_ENTER_DUR     = 0.40;   // per-tile fade-in duration

function tileState(t: number, tile: typeof BEAT_TILES[number]) {
  if (t < tile.at) return null;

  /* Phase 1+2: enter at home position, then hold. */
  if (t < BEATS_HOLD_END) {
    const k = smoothStep((t - tile.at) / BEAT_ENTER_DUR);
    return { x: tile.x, y: tile.y, scale: 0.92 + 0.08 * k, opacity: k };
  }

  /* Phase 3: drift outward (40% past home) + fade. */
  if (t < BEATS_DISPERSE_END) {
    const k = smoothStep((t - BEATS_HOLD_END) / (BEATS_DISPERSE_END - BEATS_HOLD_END));
    return {
      x: tile.x * (1 + k * 0.40),
      y: tile.y * (1 + k * 0.40),
      scale: 1 - k * 0.08,
      opacity: 1 - k,
    };
  }

  return null;
}

function BeatIcons({ t }: { t: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {BEAT_TILES.map((tile) => {
        const s = tileState(t, tile);
        if (!s) return null;
        return (
          <div
            key={tile.type}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${s.x}px, ${s.y}px) scale(${s.scale})`,
              transformOrigin: "center",
              opacity: s.opacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ transform: "scale(0.62)", transformOrigin: "center" }}>
              <BeatIcon type={tile.type} />
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: ATMOSPHERICS ? "#FFFFFF" : TEXT_BLACK,
                letterSpacing: "-0.020em",
                textShadow: ATMOSPHERICS
                  ? "0 0 28px rgba(255, 215, 168, 0.55), 0 0 60px rgba(255, 182, 122, 0.28), 0 3px 14px rgba(20, 8, 36, 0.65)"
                  : "none",
              }}
            >
              {tile.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const ICON_STROKE = 4;
const ICON_FILL = ATMOSPHERICS ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 41, 0.04)";
const ICON_COLOR = ATMOSPHERICS ? "#FFFFFF" : TEXT_BLACK;
const ICON_GLOW = ATMOSPHERICS
  ? "drop-shadow(0 0 28px rgba(255, 215, 168, 0.55)) drop-shadow(0 0 60px rgba(255, 182, 122, 0.30)) drop-shadow(0 4px 22px rgba(20, 8, 36, 0.55))"
  : "none";

function BeatIcon({ type }: { type: BeatType }) {
  switch (type) {
    case "email":     return <BigEnvelope />;
    case "drafts":    return <BigDocument />;
    case "discovery": return <BigFolder />;
    case "billing":   return <BigClock />;
  }
}

function BigEnvelope() {
  return (
    <svg width="160" height="124" viewBox="0 0 160 124" fill="none" aria-hidden style={{ filter: ICON_GLOW }}>
      <rect x="3" y="3" width="154" height="118" rx="8" stroke={ICON_COLOR} strokeWidth={ICON_STROKE} fill={ICON_FILL} strokeLinejoin="round" />
      <path d="M8 14 L80 70 L152 14" stroke={ICON_COLOR} strokeWidth={ICON_STROKE} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function BigDocument() {
  return (
    <svg width="120" height="150" viewBox="0 0 120 150" fill="none" aria-hidden style={{ filter: ICON_GLOW }}>
      <path d="M8 4 L82 4 L116 38 L116 146 L8 146 Z" stroke={ICON_COLOR} strokeWidth={ICON_STROKE} fill={ICON_FILL} strokeLinejoin="round" />
      <path d="M82 4 L82 38 L116 38" stroke={ICON_COLOR} strokeWidth={ICON_STROKE} fill="none" strokeLinejoin="round" />
      <path d="M28 70 L96 70" stroke={ICON_COLOR} strokeWidth="3" strokeLinecap="round" />
      <path d="M28 90 L96 90" stroke={ICON_COLOR} strokeWidth="3" strokeLinecap="round" />
      <path d="M28 110 L74 110" stroke={ICON_COLOR} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BigFolder() {
  return (
    <svg width="160" height="128" viewBox="0 0 160 128" fill="none" aria-hidden style={{ filter: ICON_GLOW }}>
      <path d="M4 22 L52 22 L72 42 L156 42 L156 122 L4 122 Z" stroke={ICON_COLOR} strokeWidth={ICON_STROKE} fill={ICON_FILL} strokeLinejoin="round" />
    </svg>
  );
}

function BigClock() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" aria-hidden style={{ filter: ICON_GLOW }}>
      <circle cx="70" cy="70" r="64" stroke={ICON_COLOR} strokeWidth={ICON_STROKE} fill={ICON_FILL} />
      <path d="M70 24 L70 70 L100 90" stroke={ICON_COLOR} strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───────── Focal reveal — case file with "won" check ─────────
 *
 * After the four BeatIcon tiles disperse outward, a single focal element
 * resolves at center: a stylized case file with a check-badge on its
 * top-right corner. Reads as "case closed / won." The contrast (cluttered
 * 4-corner pile → single clean focal) is the visual sentence for VO
 * "So you can focus on winning more cases." */

const FOCAL_IN_START  = 12.5;   // begins entering as tiles finish dispersing
const FOCAL_IN_END    = 13.2;
const FOCAL_OUT_START = 14.4;
const FOCAL_OUT_END   = 14.7;

function FocalReveal({ t }: { t: number }) {
  if (t < FOCAL_IN_START || t > FOCAL_OUT_END) return null;

  let opacity = 0;
  let scale   = 0.92;

  if (t < FOCAL_IN_END) {
    const k = smoothStep((t - FOCAL_IN_START) / (FOCAL_IN_END - FOCAL_IN_START));
    opacity = k;
    scale   = 0.92 + 0.08 * k;
  } else if (t < FOCAL_OUT_START) {
    opacity = 1;
    scale   = 1;
  } else {
    opacity = 1 - smoothStep((t - FOCAL_OUT_START) / (FOCAL_OUT_END - FOCAL_OUT_START));
    scale   = 1;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity,
      }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        <CaseFileWon />
      </div>
    </div>
  );
}

function CaseFileWon() {
  /* Case file (manila folder) with a check-badge in the top-right corner.
   * Same b/w line-art aesthetic as the BeatIcons. The check reads as
   * "won/closed/resolved" without language. */
  const badgeFill = ATMOSPHERICS ? "#1A0F2E" : "#FFFFFF";
  return (
    <svg
      width="320"
      height="280"
      viewBox="0 0 320 280"
      fill="none"
      aria-hidden
      style={{ filter: ICON_GLOW }}
    >
      {/* Folder body with tab on top-left */}
      <path
        d="M30 60 L110 60 L130 80 L290 80 L290 252 L30 252 Z"
        stroke={ICON_COLOR}
        strokeWidth={ICON_STROKE}
        fill={ICON_FILL}
        strokeLinejoin="round"
      />

      {/* Content lines (suggest a real document inside the folder) */}
      <line x1="60" y1="128" x2="240" y2="128" stroke={ICON_COLOR} strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="158" x2="240" y2="158" stroke={ICON_COLOR} strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="188" x2="180" y2="188" stroke={ICON_COLOR} strokeWidth="3" strokeLinecap="round" />

      {/* Won badge — circle with check, sitting on the folder's top-right corner */}
      <circle cx="270" cy="80" r="38" fill={badgeFill} stroke={ICON_COLOR} strokeWidth={ICON_STROKE} />
      <path
        d="M252 80 L266 95 L290 70"
        stroke={ICON_COLOR}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ───────── Sky arc — moon → sun, full 180° sweep ─────────
 *
 * Visualizes the night-to-day transition above the resolution text
 * "were already handled for you." An elliptical arc sits directly above
 * the text, with its endpoints aligned to the text's left and right
 * edges. A celestial body sweeps 180° from left endpoint up over the
 * peak to the right endpoint — starting as a moon (representing the
 * night that's passing) and crossfading to a sun (representing the new
 * day arriving) around the peak.
 *
 * Sequencing: the resolution text appears at 4.5s and is fully formed by
 * ~6.1s. The arc sweep begins at 6.7s — after the text has sat for a
 * moment. The body completes its 180° traversal at 8.2s (right horizon).
 * At that exact moment, BOTH the arc and the resolution text begin
 * fading together, clearing the frame for the BeatIcons sequence.
 *
 * Geometry uses scene viewBox (1920×1080), sized to sit ABOVE the resolution
 * text with the arc endpoints aligning with the text's left and right edges
 * (text spans CSS x≈317–1603, top y≈485.5 at 1920×1080):
 *   arc center        = (960, 430) — endpoints sit ~55px above text top
 *   horizontal radius = 643  → endpoints at x=317 and x=1603 (text edges)
 *   vertical radius   = 220  → peak at y=210 (upper third of viewport)
 *   left endpoint     = (317, 430)  — moon rises from here
 *   right endpoint    = (1603, 430) — sun lands here
 *   peak              = (960, 210)
 */

const ARC_START_T      = 6.7;   // s — sweep begins (visible from 6.4 via fade-in)
const ARC_END_T        = 8.2;   // s — body reaches right horizon (180° complete)
const ARC_FADE_OUT_S   = 8.2;   // s — arc + text fade simultaneously
const ARC_FADE_OUT_E   = 9.0;   // s — fully gone (~0.2s gap before BeatIcons at 9.2s)

function RisingSunArc({ t }: { t: number }) {
  if (t < ARC_START_T - 0.3 || t > ARC_FADE_OUT_E) return null;

  /* Sweep progress: 0 = left horizon (moon), 0.5 = peak (crossfade),
   * 1 = right horizon (sun). Held at 1 during the post-sweep fade. */
  let u = 0;
  if (t > ARC_END_T) u = 1;
  else if (t > ARC_START_T) u = smoothStep((t - ARC_START_T) / (ARC_END_T - ARC_START_T));

  const CX = 960;
  const CY = 430;
  const RX = 643;
  const RY = 220;

  /* Angle from π (left horizon) to 0 (right horizon) as u goes 0 → 1. */
  const angle = Math.PI * (1 - u);
  const bodyX = CX + RX * Math.cos(angle);
  const bodyY = CY - RY * Math.sin(angle);

  /* Group fade — in over 0.3s before ARC_START_T, out over the fade-out window. */
  let opacity = 1;
  if (t < ARC_START_T) {
    opacity = smoothStep((t - (ARC_START_T - 0.3)) / 0.3);
  } else if (t > ARC_FADE_OUT_S) {
    opacity = 1 - smoothStep((t - ARC_FADE_OUT_S) / (ARC_FADE_OUT_E - ARC_FADE_OUT_S));
  }

  /* Moon → sun crossfade across the middle 20% of the sweep (u ∈ [0.4, 0.6]). */
  const moonOpacity = 1 - smoothStep((u - 0.4) / 0.2);
  const sunOpacity  = smoothStep((u - 0.4) / 0.2);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        zIndex: 3,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <defs>
          <radialGradient id="sun-glow-grad">
            <stop offset="0"   stopColor="#FFB74D" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#FFB74D" stopOpacity="0.30" />
            <stop offset="1"   stopColor="#FFB74D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sun-body-grad">
            <stop offset="0"    stopColor="#FFE9B0" />
            <stop offset="0.55" stopColor="#FFB74D" />
            <stop offset="1"    stopColor="#FF8F2E" />
          </radialGradient>
          <radialGradient id="moon-glow-grad">
            <stop offset="0"   stopColor="#A8B8D0" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#A8B8D0" stopOpacity="0.18" />
            <stop offset="1"   stopColor="#A8B8D0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="moon-body-grad">
            <stop offset="0"    stopColor="#F0F4FA" />
            <stop offset="0.55" stopColor="#C0CCDE" />
            <stop offset="1"    stopColor="#7088A8" />
          </radialGradient>
        </defs>

        {/* Arc path — faint dashed elliptical curve showing the trajectory */}
        <path
          d={`M ${CX - RX} ${CY} A ${RX} ${RY} 0 0 1 ${CX + RX} ${CY}`}
          stroke="rgba(140, 140, 140, 0.20)"
          strokeWidth="1.5"
          strokeDasharray="6 9"
          fill="none"
        />

        {/* Moon — crescent, dominant on the left half of the sweep.
         * Path: outer arc on the left side (full radius 48) + inner arc back
         * on the right side (horizontal radius 16, vertical radius 48). The
         * lit body sits on the LEFT, the open concave side faces RIGHT toward
         * where the sun will rise — like 🌙. */}
        <g opacity={moonOpacity}>
          <circle cx={bodyX} cy={bodyY} r="100" fill="url(#moon-glow-grad)" />
          <path
            d={`M ${bodyX},${bodyY - 48} A 48,48 0 0,0 ${bodyX},${bodyY + 48} A 16,48 0 0,1 ${bodyX},${bodyY - 48} Z`}
            fill="url(#moon-body-grad)"
          />
        </g>

        {/* Sun — dominant on the right half of the sweep */}
        <g opacity={sunOpacity}>
          <circle cx={bodyX} cy={bodyY} r="140" fill="url(#sun-glow-grad)" />
          <circle cx={bodyX} cy={bodyY} r="48"  fill="url(#sun-body-grad)" />
        </g>
      </svg>
    </div>
  );
}

