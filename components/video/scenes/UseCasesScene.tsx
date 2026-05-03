"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { CheckBubble } from "@/components/video/primitives/CheckBubble";
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
import {
  FONT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  BLUE,
  BLUE_DEEP,
  BLUE_LIGHT,
  AMBER_DEEP,
  AMBER,
  AMBER_LIGHT,
  EMERALD_DEEP,
  EMERALD,
  EMERALD_LIGHT,
  VIOLET_DEEP,
  VIOLET,
  VIOLET_LIGHT,
  BORDER,
  SOFT_EASE,
  SWEEP_EASE,
} from "@/components/video/primitives/tokens";

export const USECASES_DURATION_MS = 11000;
export const USECASES_BACKGROUND = "#0F172A";

/* ATMOSPHERICS — temporary kill-switch (see VSL_HANDOFF.md). */
const ATMOSPHERICS = false;

/* USE CASES scene — 0:34–0:45 of the VSL.
 *
 * Four distinct practice-area mini-landscapes back-to-back. Each card sits in
 * its own atmospheric world (same recipe, different palette + light origin —
 * pure abstract gradient flow, no literal terrestrial elements):
 *
 *   • PI         — STORMY BLUE (deep night-sky, moody indigo)
 *   • Mass Tort  — SUNSET RUST (rust → orange → peach)
 *   • Med Mal    — EMERALD FLOW (deep emerald → green → sage)
 *   • Employment — LAVENDER TWILIGHT (deep indigo → violet → lavender)
 *
 * VO contrast pairs:
 *   "From a single demand letter / to three hundred client updates."  → PI → Mass Tort
 *   "From a medical chronology / to a class wage calculation."         → Med Mal → Employment
 *   "You make the calls. / Delta makes them happen."                   → mosaic
 *
 * Internal timeline:
 *   0.4s  – PI demand letter card scales in (stormy blue landscape)
 *   2.0s  – focal bloom, transitions to mass-tort (sunset desert)
 *   3.8s  – focal bloom, transitions to med-mal (forest canopy)
 *   5.6s  – focal bloom, transitions to employment (lavender twilight)
 *   7.4s  – focal bloom, all 4 collapse into mosaic
 *  10.6s  – fade out
 */
export function UseCasesScene({ t }: { t: number }) {
  const piVisible        = !mosaicState(t) && between(t, 0.0, 2.1);
  const massTortVisible  = !mosaicState(t) && between(t, 2.0, 3.9);
  const medMalVisible    = !mosaicState(t) && between(t, 3.8, 5.7);
  const employmentVisible = !mosaicState(t) && between(t, 5.6, 7.5);
  const mosaicVisible    = mosaicState(t);

  /* Beat blooms — one at every card transition + mosaic */
  const beatBloom =
    between(t, 1.9, 3.0) ||
    between(t, 3.7, 4.8) ||
    between(t, 5.5, 6.6) ||
    between(t, 7.3, 8.4);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: ATMOSPHERICS ? USECASES_BACKGROUND : "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {ATMOSPHERICS && (
        <>
          {/* Stacked card landscapes — one visible at a time */}
          <CardLandscape variant="pi"         visible={piVisible} />
          <CardLandscape variant="masstort"   visible={massTortVisible} />
          <CardLandscape variant="medmal"     visible={medMalVisible} />
          <CardLandscape variant="employment" visible={employmentVisible} />
          <MosaicLandscape visible={mosaicVisible} />

          <FocalBloom
            color="#FFFFFF"
            size="55%"
            baseIntensity={0.10}
            pulse={beatBloom}
            pulseDuration={1.2}
            blendMode="screen"
          />
          <DepthVignette tint="#000000" intensity={0.45} innerStop={32} outerStop={100} />
        </>
      )}

      {/* Sequential cards — one at a time */}
      <SequentialCards t={t} mosaicVisible={mosaicVisible} />

      {/* Mosaic — 2x2 layout */}
      <Mosaic visible={mosaicVisible} />
    </div>
  );
}

function mosaicState(t: number): boolean {
  return t > 7.4;
}

/* ───────── Card-specific atmospheric landscapes ─────────
 * Each card variant gets a full Landscape composition: same recipe across all
 * four (sky gradient + light + rays + auras + particles + haze + grain), only
 * the palette changes. */

type CardVariant = "pi" | "masstort" | "medmal" | "employment";

function CardLandscape({ variant, visible }: { variant: CardVariant; visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7, ease: SOFT_EASE }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {variant === "pi"         && <PIStormyBlue />}
      {variant === "masstort"   && <MassTortSunset />}
      {variant === "medmal"     && <MedMalForest />}
      {variant === "employment" && <EmploymentTwilight />}
    </motion.div>
  );
}

/* PI — Stormy blue dusk sky */
const PIStormyBlue = memo(function PIStormyBlue() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#050B1A" },
          { offset: 0.30, color: "#0F1E40" },
          { offset: 0.65, color: "#1E3A8A" },
          { offset: 1,    color: "#0A1428" },
        ]}
      />
      <LightSource origin="top" color="#7DD3FC" size="65%" intensity={0.32} blendMode="screen" />
      <LightShafts
        origin="top"
        color="#93C5FD"
        count={5}
        intensity={0.14}
        spread={50}
        length={130}
        rotateDeg={2}
        pulseDuration={5.5}
      />
      <BloomFlare cx="50%" cy="14%" color="#BFDBFE" intensity={0.40} size={500} pulseDuration={5.5} />
      <AtmosphericRays origin="top" color="#93C5FD" rayCount={5} intensity={0.10} spread={50} length={120} />
      <DriftAuras
        auras={[
          { size: 1320, top: -320, left: -320, color: "#0F1E40", opacity: 0.55, blur: 120,
            drift: { x: 80, y: 50, scale: 1.08, duration: 24 } },
          { size: 1240, top: -280, right: -300, color: "#1E3A8A", opacity: 0.50, blur: 120,
            drift: { x: -70, y: 60, scale: 0.94, duration: 26 } },
          { size: 1180, top: -180, left: -180, color: "#1E40AF", opacity: 0.50, blur: 90,
            drift: { x: 110, y: 50, scale: 1.10, duration: 14 } },
          { size: 980, top: "8%", right: -180, color: "#3B82F6", opacity: 0.40, blur: 80,
            drift: { x: -90, y: 70, scale: 0.92, duration: 16 } },
          { size: 760, top: -100, left: "38%", color: "#60A5FA", opacity: 0.26, blur: 70,
            drift: { x: 45, y: 30, duration: 22 } },
          { size: 1080, bottom: -280, left: 60, color: "#1E3A8A", opacity: 0.45, blur: 90,
            drift: { x: 70, y: -55, scale: 1.06, duration: 18 } },
          { size: 1180, bottom: -300, right: 40, color: "#312E81", opacity: 0.42, blur: 90,
            drift: { x: -60, y: -70, scale: 1.07, duration: 20 } },
          { size: 720, bottom: "16%", left: "40%", color: "#3B82F6", opacity: 0.30, blur: 60,
            drift: { x: 30, y: -25, duration: 19 } },
          { size: 620, bottom: "8%", left: "70%", color: "#60A5FA", opacity: 0.22, blur: 55,
            drift: { x: -40, y: -30, scale: 1.05, duration: 17 } },
        ]}
      />
      <AuroraBands
        bands={[
          { y: "22%", color: "#3B82F6", height: 220, rotate: -3, intensity: 0.30, duration: 30, driftX: 140 },
          { y: "48%", color: "#60A5FA", height: 180, rotate: 4,  intensity: 0.24, duration: 36, driftX: 160 },
          { y: "74%", color: "#1E40AF", height: 240, rotate: -2, intensity: 0.22, duration: 26, driftX: 120 },
        ]}
      />
      <BokehField
        dots={[
          { size: 320, top: "16%", left: "12%", color: "#BFDBFE", opacity: 0.28, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "30%", left: "78%", color: "#93C5FD", opacity: 0.26, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#3B82F6", opacity: 0.20, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "76%", left: "82%", color: "#60A5FA", opacity: 0.26, duration: 16, driftX: 28, driftY: 18 },
        ]}
      />
      {/* Cool blue twinkles in the storm — rare lightning hints */}
      <TwinkleField
        count={12}
        color="#DBEAFE"
        minSize={1.4}
        maxSize={2.8}
        intensity={0.55}
        yMin={5}
        yMax={45}
        durationRange={[2.5, 5]}
        seed={73}
      />
      <AtmosphericHaze color="#1E40AF" opacity={0.10} blendMode="multiply" />
      <ParticleField count={22} color="#BFDBFE" minSize={1.2} maxSize={3.4} intensity={0.50}
        driftDistance={70} durationRange={[18, 32]} seed={71} />
      <TextureGrain opacity={0.022} />
    </>
  );
});

/* Mass Tort — Sunset desert */
const MassTortSunset = memo(function MassTortSunset() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#3B0F0A" },
          { offset: 0.28, color: "#7C2D12" },
          { offset: 0.55, color: "#C2410C" },
          { offset: 0.78, color: "#F97316" },
          { offset: 1,    color: "#FCD9A0" },
        ]}
      />
      <LightSource origin="bottom-right" color="#FFCF7A" size="80%" intensity={0.50} blendMode="screen" />
      <LightShafts
        origin="bottom-right"
        color="#FFDF9D"
        count={6}
        intensity={0.20}
        spread={75}
        length={150}
        rotateDeg={3}
        pulseDuration={6}
      />
      <BloomFlare cx="88%" cy="86%" color="#FFE3A8" intensity={0.60} size={620} pulseDuration={6} />
      <AtmosphericRays origin="bottom-right" color="#FFDF9D" rayCount={6} intensity={0.14} spread={70} length={140} />
      <DriftAuras
        auras={[
          { size: 1320, top: -300, left: -320, color: "#3B0F0A", opacity: 0.55, blur: 120,
            drift: { x: 80, y: 40, scale: 1.08, duration: 24 } },
          { size: 1240, top: -260, right: -300, color: "#7C2D12", opacity: 0.50, blur: 120,
            drift: { x: -70, y: 55, scale: 0.94, duration: 26 } },
          { size: 1100, top: -180, left: -180, color: "#7C2D12", opacity: 0.45, blur: 90,
            drift: { x: 90, y: 40, scale: 1.07, duration: 16 } },
          { size: 1080, top: "10%", right: -180, color: "#C2410C", opacity: 0.48, blur: 90,
            drift: { x: -75, y: 55, scale: 0.93, duration: 18 } },
          { size: 760, top: -100, left: "40%", color: "#FED7AA", opacity: 0.48, blur: 70,
            drift: { x: 40, y: 25, duration: 22 } },
          { size: 1180, bottom: -260, left: 80, color: "#F97316", opacity: 0.42, blur: 90,
            drift: { x: 80, y: -40, scale: 1.07, duration: 20 } },
          { size: 1240, bottom: -280, right: 60, color: "#EA580C", opacity: 0.46, blur: 90,
            drift: { x: -65, y: -50, scale: 1.05, duration: 22 } },
          { size: 720, bottom: "18%", left: "42%", color: "#FB923C", opacity: 0.34, blur: 60,
            drift: { x: 30, y: -22, duration: 19 } },
          { size: 620, bottom: "8%", left: "72%", color: "#FED7AA", opacity: 0.38, blur: 55,
            drift: { x: -40, y: -25, scale: 1.06, duration: 17 } },
        ]}
      />
      <AuroraBands
        bands={[
          { y: "22%", color: "#FB923C", height: 220, rotate: -3, intensity: 0.32, duration: 30, driftX: 140 },
          { y: "48%", color: "#F97316", height: 180, rotate: 4,  intensity: 0.28, duration: 36, driftX: 160 },
          { y: "74%", color: "#C2410C", height: 240, rotate: -2, intensity: 0.22, duration: 26, driftX: 120 },
        ]}
      />
      <BokehField
        dots={[
          { size: 320, top: "16%", left: "12%", color: "#FED7AA", opacity: 0.30, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "30%", left: "78%", color: "#FFE3A8", opacity: 0.28, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#F97316", opacity: 0.22, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "76%", left: "82%", color: "#FB923C", opacity: 0.28, duration: 16, driftX: 28, driftY: 18 },
        ]}
      />
      {/* Heat shimmer twinkles — bright spots in the sky */}
      <TwinkleField
        count={14}
        color="#FFE3A8"
        minSize={1.4}
        maxSize={2.6}
        intensity={0.65}
        yMin={20}
        yMax={70}
        durationRange={[2.0, 4.0]}
        seed={117}
      />
      <AtmosphericHaze color="#9A3412" opacity={0.07} blendMode="multiply" />
      <ParticleField count={24} color="#FED7AA" minSize={1.4} maxSize={3.8} intensity={0.60}
        driftDistance={75} durationRange={[20, 36]} seed={113} />
      <TextureGrain opacity={0.022} />
    </>
  );
});

/* Med Mal — Forest canopy */
const MedMalForest = memo(function MedMalForest() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#022C22" },
          { offset: 0.30, color: "#064E3B" },
          { offset: 0.65, color: "#047857" },
          { offset: 1,    color: "#022B1B" },
        ]}
      />
      <LightSource origin="top" color="#A7F3D0" size="75%" intensity={0.36} blendMode="screen" />
      <LightShafts
        origin="top"
        color="#6EE7B7"
        count={6}
        intensity={0.18}
        spread={65}
        length={140}
        rotateDeg={3}
        pulseDuration={5.5}
      />
      <BloomFlare cx="50%" cy="14%" color="#A7F3D0" intensity={0.40} size={520} pulseDuration={6} />
      <AtmosphericRays origin="top" color="#6EE7B7" rayCount={6} intensity={0.13} spread={60} length={130} />
      <DriftAuras
        auras={[
          { size: 1320, top: -320, left: -320, color: "#022C22", opacity: 0.55, blur: 120,
            drift: { x: 80, y: 40, scale: 1.08, duration: 24 } },
          { size: 1240, top: -280, right: -300, color: "#064E3B", opacity: 0.50, blur: 120,
            drift: { x: -70, y: 50, scale: 0.94, duration: 26 } },
          { size: 1180, top: -180, left: -180, color: "#064E3B", opacity: 0.50, blur: 90,
            drift: { x: 110, y: 40, scale: 1.07, duration: 16 } },
          { size: 1100, top: "8%", right: -180, color: "#047857", opacity: 0.44, blur: 90,
            drift: { x: -85, y: 55, scale: 0.92, duration: 18 } },
          { size: 760, top: -100, left: "38%", color: "#A7F3D0", opacity: 0.30, blur: 70,
            drift: { x: 45, y: 30, duration: 22 } },
          { size: 1080, bottom: -260, left: 80, color: "#10B981", opacity: 0.36, blur: 90,
            drift: { x: 70, y: -55, scale: 1.07, duration: 20 } },
          { size: 1180, bottom: -280, right: 60, color: "#065F46", opacity: 0.46, blur: 90,
            drift: { x: -60, y: -70, scale: 1.05, duration: 22 } },
          { size: 720, bottom: "16%", left: "42%", color: "#34D399", opacity: 0.32, blur: 60,
            drift: { x: 30, y: -22, duration: 19 } },
          { size: 620, bottom: "8%", left: "70%", color: "#A7F3D0", opacity: 0.28, blur: 55,
            drift: { x: -40, y: -25, scale: 1.05, duration: 17 } },
        ]}
      />
      <AuroraBands
        bands={[
          { y: "22%", color: "#34D399", height: 220, rotate: -3, intensity: 0.30, duration: 30, driftX: 140 },
          { y: "48%", color: "#10B981", height: 180, rotate: 4,  intensity: 0.26, duration: 36, driftX: 160 },
          { y: "74%", color: "#047857", height: 240, rotate: -2, intensity: 0.22, duration: 26, driftX: 120 },
        ]}
      />
      <BokehField
        dots={[
          { size: 320, top: "16%", left: "12%", color: "#D1FAE5", opacity: 0.28, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "30%", left: "78%", color: "#A7F3D0", opacity: 0.26, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#10B981", opacity: 0.20, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "76%", left: "82%", color: "#6EE7B7", opacity: 0.26, duration: 16, driftX: 28, driftY: 18 },
        ]}
      />
      {/* Dappled light through canopy — bright spots that twinkle */}
      <TwinkleField
        count={16}
        color="#D1FAE5"
        minSize={1.4}
        maxSize={2.8}
        intensity={0.65}
        yMin={5}
        yMax={50}
        durationRange={[2.0, 4.0]}
        seed={203}
      />
      <AtmosphericHaze color="#047857" opacity={0.08} blendMode="multiply" />
      <ParticleField count={24} color="#D1FAE5" minSize={1.3} maxSize={3.6} intensity={0.55}
        driftDistance={70} durationRange={[20, 36]} seed={199} />
      <TextureGrain opacity={0.022} />
    </>
  );
});

/* Employment — Lavender twilight */
const EmploymentTwilight = memo(function EmploymentTwilight() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#1E1B4B" },
          { offset: 0.32, color: "#3730A3" },
          { offset: 0.62, color: "#7C3AED" },
          { offset: 1,    color: "#312E81" },
        ]}
      />
      <LightSource origin="bottom-left" color="#DDD6FE" size="78%" intensity={0.45} blendMode="screen" />
      <LightShafts
        origin="bottom-left"
        color="#C4B5FD"
        count={6}
        intensity={0.18}
        spread={65}
        length={150}
        rotateDeg={3}
        pulseDuration={6}
      />
      <BloomFlare cx="14%" cy="86%" color="#DDD6FE" intensity={0.50} size={560} pulseDuration={6} />
      <AtmosphericRays origin="bottom-left" color="#C4B5FD" rayCount={6} intensity={0.12} spread={60} length={130} />
      <DriftAuras
        auras={[
          { size: 1320, top: -320, left: -320, color: "#1E1B4B", opacity: 0.60, blur: 120,
            drift: { x: 80, y: 40, scale: 1.08, duration: 24 } },
          { size: 1240, top: -280, right: -300, color: "#3730A3", opacity: 0.50, blur: 120,
            drift: { x: -70, y: 50, scale: 0.94, duration: 26 } },
          { size: 1180, top: -180, left: -180, color: "#3730A3", opacity: 0.50, blur: 90,
            drift: { x: 105, y: 40, scale: 1.07, duration: 16 } },
          { size: 980, top: "8%", right: -180, color: "#6D28D9", opacity: 0.42, blur: 90,
            drift: { x: -80, y: 55, scale: 0.94, duration: 18 } },
          { size: 760, top: -100, left: "38%", color: "#DDD6FE", opacity: 0.30, blur: 70,
            drift: { x: 45, y: 30, duration: 22 } },
          { size: 1080, bottom: -260, left: 80, color: "#8B5CF6", opacity: 0.38, blur: 90,
            drift: { x: 70, y: -55, scale: 1.07, duration: 20 } },
          { size: 1240, bottom: -280, right: 60, color: "#A78BFA", opacity: 0.34, blur: 90,
            drift: { x: -60, y: -70, scale: 1.05, duration: 22 } },
          { size: 720, bottom: "16%", left: "42%", color: "#A78BFA", opacity: 0.32, blur: 60,
            drift: { x: 30, y: -22, duration: 19 } },
          { size: 620, bottom: "8%", left: "70%", color: "#C4B5FD", opacity: 0.30, blur: 55,
            drift: { x: -40, y: -25, scale: 1.05, duration: 17 } },
        ]}
      />
      <AuroraBands
        bands={[
          { y: "22%", color: "#A78BFA", height: 220, rotate: -3, intensity: 0.32, duration: 30, driftX: 140 },
          { y: "48%", color: "#8B5CF6", height: 180, rotate: 4,  intensity: 0.26, duration: 36, driftX: 160 },
          { y: "74%", color: "#6D28D9", height: 240, rotate: -2, intensity: 0.22, duration: 26, driftX: 120 },
        ]}
      />
      <BokehField
        dots={[
          { size: 320, top: "16%", left: "12%", color: "#DDD6FE", opacity: 0.32, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "30%", left: "78%", color: "#C4B5FD", opacity: 0.28, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#8B5CF6", opacity: 0.20, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "76%", left: "82%", color: "#A78BFA", opacity: 0.28, duration: 16, driftX: 28, driftY: 18 },
        ]}
      />
      {/* Early stars emerging in the lavender twilight */}
      <TwinkleField
        count={20}
        color="#FFFFFF"
        minSize={1.4}
        maxSize={2.6}
        intensity={0.85}
        yMin={2}
        yMax={45}
        durationRange={[2.5, 5.5]}
        seed={263}
      />
      <AtmosphericHaze color="#4C1D95" opacity={0.10} blendMode="multiply" />
      <ParticleField count={24} color="#E9D5FF" minSize={1.3} maxSize={3.6} intensity={0.60}
        driftDistance={70} durationRange={[20, 38]} seed={257} />
      <TextureGrain opacity={0.022} />
    </>
  );
});

/* Mosaic landscape — all four palettes converging */
const MosaicLandscape = memo(function MosaicLandscape({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: SOFT_EASE }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {/* Quad-color ambient base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(135deg, #0F1E40 0%, transparent 50%),
            linear-gradient(225deg, #7C2D12 0%, transparent 50%),
            linear-gradient(45deg, #064E3B 0%, transparent 50%),
            linear-gradient(315deg, #3730A3 0%, transparent 50%),
            #0F0F1F
          `,
        }}
      />
      <DriftAuras
        auras={[
          { size: 980, top: -180, left: -200, color: "#1E3A8A", opacity: 0.50, blur: 90,
            drift: { x: 90, y: 40, duration: 18 } },
          { size: 980, top: -180, right: -200, color: "#C2410C", opacity: 0.46, blur: 90,
            drift: { x: -80, y: 50, duration: 16 } },
          { size: 1080, bottom: -240, left: -180, color: "#047857", opacity: 0.44, blur: 100,
            drift: { x: 70, y: -55, duration: 20 } },
          { size: 1080, bottom: -240, right: -180, color: "#7C3AED", opacity: 0.46, blur: 100,
            drift: { x: -65, y: -60, duration: 22 } },
        ]}
      />
      {/* Aurora streamers across all four palettes for convergence */}
      <AuroraBands
        bands={[
          { y: "22%", color: "#3B82F6", height: 200, rotate: -3, intensity: 0.24, duration: 30, driftX: 140 },
          { y: "48%", color: "#FFFFFF", height: 180, rotate: 4,  intensity: 0.22, duration: 36, driftX: 160 },
          { y: "74%", color: "#8B5CF6", height: 220, rotate: -2, intensity: 0.22, duration: 28, driftX: 120 },
        ]}
      />
      <BokehField
        dots={[
          { size: 320, top: "16%", left: "16%", color: "#BFDBFE", opacity: 0.30, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "20%", left: "78%", color: "#FED7AA", opacity: 0.28, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "70%", left: "22%", color: "#A7F3D0", opacity: 0.24, duration: 26, driftX: 35, driftY: 22 },
          { size: 240, top: "76%", left: "78%", color: "#C4B5FD", opacity: 0.30, duration: 16, driftX: 28, driftY: 18 },
          { size: 280, top: "48%", left: "50%", color: "#FFFFFF", opacity: 0.20, duration: 24, driftX: 32, driftY: 22 },
        ]}
      />
      {/* Sparkles across the whole stage — magic / convergence feel */}
      <TwinkleField
        count={28}
        color="#FFFFFF"
        minSize={1.4}
        maxSize={3}
        intensity={0.85}
        yMin={5}
        yMax={92}
        durationRange={[2.5, 5]}
        seed={409}
      />
      <BloomFlare cx="50%" cy="50%" color="#FFFFFF" intensity={0.30} size={500} pulseDuration={5.5} />
      <ParticleField count={28} color="#FFFFFF" minSize={1.4} maxSize={3.4} intensity={0.55}
        driftDistance={75} durationRange={[22, 40]} seed={401} />
      <TextureGrain opacity={0.025} />
    </motion.div>
  );
});

/* ───────── Sequential cards (one big card at a time) ───────── */

function SequentialCards({
  t,
  mosaicVisible,
}: {
  t: number;
  mosaicVisible: boolean;
}) {
  if (mosaicVisible) return null;

  const piVisible        = between(t, 0.4, 2.0);
  const massTortVisible  = between(t, 2.0, 3.8);
  const medMalVisible    = between(t, 3.8, 5.6);
  const employmentVisible = between(t, 5.6, 7.4);

  return (
    <>
      <BigCardSlot visible={piVisible}>
        <PIDemandCard scale={1} />
      </BigCardSlot>
      <BigCardSlot visible={massTortVisible}>
        <MassTortEmailCard scale={1} />
      </BigCardSlot>
      <BigCardSlot visible={medMalVisible}>
        <MedMalChronologyCard scale={1} />
      </BigCardSlot>
      <BigCardSlot visible={employmentVisible}>
        <EmploymentWageCard scale={1} />
      </BigCardSlot>
    </>
  );
}

function BigCardSlot({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: FONT,
      }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 12,
          scale: visible ? 1 : 0.96,
          filter: visible ? "blur(0px)" : "blur(10px)",
        }}
        transition={{ duration: 0.55, ease: SOFT_EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── PI — Demand letter card ─── */

function PIDemandCard({ scale }: { scale: number }) {
  return (
    <CardSurface tone={{ deep: BLUE_DEEP, main: BLUE, light: BLUE_LIGHT }} scale={scale}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "32px 36px" }}>
        {/* Letterhead */}
        <div style={{ textAlign: "center", paddingBottom: 14, borderBottom: `2px solid ${BLUE_DEEP}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: BLUE_DEEP, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Schmidt &amp; Associates
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, color: TEXT_SECONDARY, letterSpacing: "0.12em", marginTop: 4, textTransform: "uppercase" }}>
            Attorneys at Law · Kansas City, MO
          </div>
        </div>

        {/* Date + addressee */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22, marginBottom: 18 }}>
          <div style={{ fontSize: 11.5, color: TEXT_PRIMARY }}>April 29, 2026</div>
          <div style={{ fontSize: 11.5, color: TEXT_PRIMARY, lineHeight: 1.5 }}>
            Allstate Insurance Co.<br />
            Claims Department<br />
            1234 Sand Lane<br />
            Northbrook, IL 60062
          </div>
        </div>

        {/* Subject */}
        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 18 }}>
          RE: Smith v. Allstate · Claim # SA-2026-04891
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <BodyLine width="100%" />
          <BodyLine width="96%" />
          <BodyLine width="100%" />
          <BodyLine width="78%" />
          <BodyLine width="92%" />
          <BodyLine width="100%" />
          <BodyLine width="60%" />
        </div>

        {/* Demand callout */}
        <div
          style={{
            marginTop: 22,
            padding: "20px 24px",
            borderRadius: 12,
            background: `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_DEEP} 100%)`,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: `0 14px 30px ${BLUE_DEEP}44`,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Total Demand
          </span>
          <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>
            $2,400,000
          </span>
        </div>
      </div>

    </CardSurface>
  );
}

function BodyLine({ width }: { width: string }) {
  return <div style={{ height: 4, width, background: "#9CA3AF", borderRadius: 1, opacity: 0.55 }} />;
}

/* ─── Mass Tort — Email composition card ─── */

function MassTortEmailCard({ scale }: { scale: number }) {
  return (
    <CardSurface tone={{ deep: AMBER_DEEP, main: AMBER, light: AMBER_LIGHT }} scale={scale}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Compose header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DEEP} 100%)`,
            color: "#FFFFFF",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.005em" }}>
            ✉️ New Message
          </span>
          <span style={{ fontSize: 14, opacity: 0.7 }}>—</span>
        </div>

        {/* To row with badge */}
        <div style={{ padding: "14px 24px 12px 24px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: TEXT_TERTIARY, width: 50 }}>To:</span>
          <RecipientChip count={300} />
        </div>

        <FieldRow label="From:" value="k.schmidt@schmidt-law.com" />
        <FieldRow label="Subject:" value="PFAS Settlement — Important Update on Your Case" bold />

        {/* Body */}
        <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 12.5, color: TEXT_PRIMARY, fontWeight: 500 }}>
            Dear <span style={{ background: AMBER_LIGHT, padding: "2px 6px", borderRadius: 3, color: AMBER_DEEP, fontWeight: 700 }}>{`{client_first_name}`}</span>,
          </div>
          <BodyLine width="100%" />
          <BodyLine width="96%" />
          <BodyLine width="88%" />
          <BodyLine width="100%" />
          <BodyLine width="74%" />
          <BodyLine width="92%" />
          <BodyLine width="58%" />
        </div>

        {/* Send button row */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 14 }}>
          <SendPill tone={AMBER} toneDeep={AMBER_DEEP} label="Send to all 300" />
          <span style={{ fontSize: 11.5, color: TEXT_TERTIARY }}>
            Personalized · merged from PFAS plaintiff group
          </span>
        </div>
      </div>

    </CardSurface>
  );
}

function RecipientChip({ count }: { count: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px 6px 6px",
        borderRadius: 8,
        background: `linear-gradient(135deg, ${AMBER}22 0%, ${AMBER_LIGHT}33 100%)`,
        border: `1px solid ${AMBER}55`,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DEEP} 100%)`,
          color: "#FFFFFF",
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✓
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY }}>
        PFAS Plaintiff Group
      </span>
      <span
        style={{
          marginLeft: 4,
          padding: "2px 8px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          color: "#FFFFFF",
          background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DEEP} 100%)`,
          boxShadow: `0 4px 10px ${AMBER}66`,
        }}
      >
        +{count - 1}
      </span>
    </div>
  );
}

function FieldRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div
      style={{
        padding: "10px 24px",
        borderBottom: `1px solid ${BORDER}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 11.5, fontWeight: 600, color: TEXT_TERTIARY, width: 50 }}>
        {label}
      </span>
      <span style={{ fontSize: 12.5, color: TEXT_PRIMARY, fontWeight: bold ? 700 : 500 }}>
        {value}
      </span>
    </div>
  );
}

function SendPill({
  tone,
  toneDeep,
  label,
}: {
  tone: string;
  toneDeep: string;
  label: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        borderRadius: 10,
        background: `linear-gradient(135deg, ${tone} 0%, ${toneDeep} 100%)`,
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: 700,
        boxShadow: `0 8px 20px ${tone}55`,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M9 14 L9 4 M5 8 L9 4 L13 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}

/* ─── Med Mal — Chronology timeline card ─── */

const CHRONOLOGY_EVENTS = [
  { date: "03/12/2024", title: "Initial ER visit", detail: "Northwest Hospital · abdominal pain", severity: 1 },
  { date: "03/14/2024", title: "Lap chole performed", detail: "Surgeon: Dr. Reynolds", severity: 2 },
  { date: "03/14/2024", title: "Bowel perforation noted", detail: "Post-op imaging · missed", severity: 3 },
  { date: "03/16/2024", title: "ICU admission", detail: "Sepsis · multi-organ involvement", severity: 3 },
  { date: "03/19/2024", title: "Patient deceased", detail: "Cause: septic shock", severity: 3 },
];

function MedMalChronologyCard({ scale }: { scale: number }) {
  return (
    <CardSurface tone={{ deep: EMERALD_DEEP, main: EMERALD, light: EMERALD_LIGHT }} scale={scale}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 28px",
            background: `linear-gradient(135deg, ${EMERALD} 0%, ${EMERALD_DEEP} 100%)`,
            color: "#FFFFFF",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.85 }}>
            Medical Chronology
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4, letterSpacing: "-0.012em" }}>
            Garcia v. Northwest Hospital
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4, opacity: 0.85 }}>
            47 events · 14 records integrated · 7 day window
          </div>
        </div>

        {/* Timeline */}
        <div style={{ flex: 1, padding: "22px 28px 18px 28px", overflow: "hidden" }}>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 8,
                top: 8,
                bottom: 8,
                width: 2,
                background: `linear-gradient(180deg, ${EMERALD_LIGHT} 0%, ${EMERALD} 50%, ${EMERALD_DEEP} 100%)`,
                borderRadius: 1,
              }}
            />
            {CHRONOLOGY_EVENTS.map((evt, i) => (
              <TimelineEvent key={i} {...evt} last={i === CHRONOLOGY_EVENTS.length - 1} />
            ))}
          </div>
        </div>
      </div>

    </CardSurface>
  );
}

function TimelineEvent({
  date,
  title,
  detail,
  severity,
  last,
}: {
  date: string;
  title: string;
  detail: string;
  severity: number;
  last: boolean;
}) {
  const dotColor = severity === 3 ? "#DC2626" : severity === 2 ? AMBER : EMERALD;
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: last ? 0 : 16,
        marginBottom: last ? 0 : 0,
      }}
    >
      {/* Dot */}
      <div
        style={{
          position: "absolute",
          left: -29,
          top: 4,
          width: 14,
          height: 14,
          borderRadius: 999,
          background: dotColor,
          border: `3px solid #FFFFFF`,
          boxShadow: `0 0 0 1px ${dotColor}55, 0 0 8px ${dotColor}44`,
        }}
      />

      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: EMERALD_DEEP,
            fontFamily: '"SF Mono", ui-monospace, Menlo, monospace',
            letterSpacing: "0.02em",
            padding: "2px 6px",
            borderRadius: 4,
            background: `${EMERALD_LIGHT}33`,
          }}
        >
          {date}
        </span>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: "-0.005em" }}>
          {title}
        </span>
        {severity === 3 && <SeverityFlag />}
      </div>
      <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 3, marginLeft: 0 }}>
        {detail}
      </div>
    </div>
  );
}

function SeverityFlag() {
  return (
    <span
      style={{
        marginLeft: "auto",
        fontSize: 9.5,
        fontWeight: 700,
        color: "#DC2626",
        background: "#FEE2E2",
        padding: "2px 7px",
        borderRadius: 4,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      Critical
    </span>
  );
}

/* ─── Employment — Wage spreadsheet card ─── */

const WAGE_ROWS = [
  { name: "J. Aguirre",   hours: "142.5", rate: "28.50", owed: "6,094.13" },
  { name: "M. Brooks",    hours: "127.0", rate: "31.20", owed: "5,943.60" },
  { name: "R. Cordova",   hours: "168.5", rate: "25.75", owed: "6,508.81" },
  { name: "A. Diaz",      hours: " 96.5", rate: "29.80", owed: "4,313.05" },
  { name: "K. Henderson", hours: "184.0", rate: "32.40", owed: "8,942.40" },
  { name: "P. Okafor",    hours: "115.5", rate: "27.25", owed: "4,720.69" },
  { name: "S. Yoshida",   hours: "143.0", rate: "27.50", owed: "5,899.50" },
];

function EmploymentWageCard({ scale }: { scale: number }) {
  return (
    <CardSurface tone={{ deep: VIOLET_DEEP, main: VIOLET, light: VIOLET_LIGHT }} scale={scale}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <div
          style={{
            padding: "18px 26px",
            background: `linear-gradient(135deg, ${VIOLET} 0%, ${VIOLET_DEEP} 100%)`,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.85 }}>
              Wage &amp; Hour Calculation
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4, letterSpacing: "-0.012em" }}>
              Henderson Wage &amp; Hour Class
            </div>
          </div>
          <SpreadsheetIcon />
        </div>

        {/* Column header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 0.7fr 0.7fr 0.9fr",
            gap: 10,
            padding: "10px 26px",
            background: `${VIOLET_LIGHT}1A`,
            borderBottom: `1px solid ${BORDER}`,
            fontSize: 10.5,
            fontWeight: 700,
            color: VIOLET_DEEP,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>Employee</span>
          <span style={{ textAlign: "right" }}>OT Hrs</span>
          <span style={{ textAlign: "right" }}>Rate</span>
          <span style={{ textAlign: "right" }}>Owed</span>
        </div>

        {/* Rows */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          {WAGE_ROWS.map((r, i) => (
            <WageRow key={r.name} {...r} striped={i % 2 === 1} />
          ))}
          <div
            style={{
              padding: "8px 26px",
              fontSize: 12,
              color: TEXT_TERTIARY,
              fontStyle: "italic",
              fontFamily: '"SF Mono", ui-monospace, Menlo, monospace',
            }}
          >
            … 40 more employees
          </div>
        </div>

        {/* Total row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 0.7fr 0.7fr 0.9fr",
            gap: 10,
            padding: "16px 26px",
            background: `linear-gradient(135deg, ${VIOLET}10 0%, ${VIOLET_DEEP}10 100%)`,
            borderTop: `2px solid ${VIOLET}`,
            fontSize: 13.5,
            fontWeight: 800,
            color: VIOLET_DEEP,
          }}
        >
          <span>47 employees</span>
          <span style={{ textAlign: "right" }}>—</span>
          <span style={{ textAlign: "right" }}>—</span>
          <span style={{ textAlign: "right", fontSize: 16 }}>$284,931</span>
        </div>
      </div>

    </CardSurface>
  );
}

function WageRow({
  name,
  hours,
  rate,
  owed,
  striped,
}: {
  name: string;
  hours: string;
  rate: string;
  owed: string;
  striped: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 0.7fr 0.7fr 0.9fr",
        gap: 10,
        padding: "9px 26px",
        background: striped ? `${VIOLET_LIGHT}0A` : "transparent",
        fontSize: 12.5,
        color: TEXT_PRIMARY,
        fontFamily: '"SF Mono", ui-monospace, Menlo, monospace',
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <span style={{ fontFamily: FONT, fontWeight: 600 }}>{name}</span>
      <span style={{ textAlign: "right" }}>{hours}</span>
      <span style={{ textAlign: "right" }}>${rate}</span>
      <span style={{ textAlign: "right", fontWeight: 700, color: VIOLET_DEEP }}>${owed}</span>
    </div>
  );
}

function SpreadsheetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
      <path d="M3 9 H21 M3 15 H21 M9 3 V21 M15 3 V21" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.7" />
    </svg>
  );
}

/* ─── Card surface (consistent base across all 4) ─── */

function CardSurface({
  tone,
  scale,
  children,
}: {
  tone: { deep: string; main: string; light: string };
  scale: number;
  children: React.ReactNode;
}) {
  /* Strong colored ambient glow + soft white halo. The dark scene backgrounds
   * absorb dark shadows, so we pair a tinted ambient with a faint white outer
   * ring to lift the white card off the world. */
  return (
    <div
      style={{
        position: "relative",
        width: 720 * scale,
        height: 580 * scale,
        background: "#FFFFFF",
        borderRadius: 22 * scale,
        overflow: "hidden",
        border: `1px solid ${tone.light}55`,
        boxShadow: `
          0 60px 140px ${tone.light}40,
          0 24px 60px ${tone.deep}55,
          0 0 0 1px ${tone.light}33,
          0 0 0 8px ${tone.main}18,
          0 0 80px rgba(255,255,255,0.10)
        `,
        fontFamily: FONT,
      }}
    >
      {children}
    </div>
  );
}

/* ───────── Mosaic — 2x2 closing layout ───────── */

function Mosaic({ visible }: { visible: boolean }) {
  if (!visible) return null;
  const slots: { x: string; y: string; render: React.ReactNode; delay: number }[] = [
    { x: "27%", y: "32%", render: <PIDemandCard scale={0.45} />,           delay: 0.0 },
    { x: "73%", y: "32%", render: <MassTortEmailCard scale={0.45} />,     delay: 0.08 },
    { x: "27%", y: "72%", render: <MedMalChronologyCard scale={0.45} />,  delay: 0.16 },
    { x: "73%", y: "72%", render: <EmploymentWageCard scale={0.45} />,    delay: 0.24 },
  ];
  return (
    <>
      {slots.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            transform: "translate(-50%, -50%)",
            fontFamily: FONT,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SOFT_EASE, delay: s.delay }}
            style={{ transformOrigin: "center" }}
          >
            {s.render}
          </motion.div>
        </div>
      ))}
    </>
  );
}

/* ───────── helpers ───────── */

function between(t: number, lo: number, hi: number): boolean {
  return t > lo && t < hi;
}
