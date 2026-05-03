"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { BrandLogoReveal } from "@/components/video/primitives/BrandLogo";
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
  SOFT_EASE,
} from "@/components/video/primitives/tokens";

export const OUTRO_DURATION_MS = 9500;
export const OUTRO_BACKGROUND = "#1E1B4B";

/* ATMOSPHERICS — temporary kill-switch (see VSL_HANDOFF.md). */
const ATMOSPHERICS = false;

/* OUTRO scene — 0:43–0:52 of the VSL.
 *
 * Landscape: TWILIGHT AURORA.
 *   Deep violet → warm rose → amber → soft gold as drifting color masses.
 *   No literal hills, no horizon line. Warm light + bloom from low-center
 *   suggesting a setting sun without drawing one. Stars beginning to emerge
 *   in the upper sky.
 *
 * Logo uses the REAL brand wordmark asset.
 *
 * Internal timeline (text-stripped — VO carries the verbal narrative):
 *   0.4s  – scene settles, twinkles emerge, sun warming the horizon
 *   1.5s  – FOCAL BLOOM (beat change)
 *   1.8s  – brand wordmark scales in (the only on-screen text — logo)
 *   8.8s  – fade out begins
 *   9.5s  – scene end
 */
export function OutroScene({ t }: { t: number }) {
  const beatBloom   = t > 1.5 && t < 2.7;
  const logoVisible = t > 1.8;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: ATMOSPHERICS ? OUTRO_BACKGROUND : "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {ATMOSPHERICS && (
        <>
          <TwilightLandscape />
          <FocalBloom
            color="#FFD7A8"
            size="58%"
            baseIntensity={0.14}
            pulse={beatBloom}
            pulseDuration={1.5}
            blendMode="screen"
          />
          <DepthVignette tint="#0A0420" intensity={0.50} innerStop={32} outerStop={100} />
        </>
      )}

      <FinalLogo visible={logoVisible} />
    </div>
  );
}

/* ───────── Landscape: twilight aurora ───────── */

const TwilightLandscape = memo(function TwilightLandscape() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#1E1B4B" },
          { offset: 0.20, color: "#3B0764" },
          { offset: 0.40, color: "#831843" },
          { offset: 0.55, color: "#BE185D" },
          { offset: 0.70, color: "#EA580C" },
          { offset: 0.85, color: "#F59E0B" },
          { offset: 1,    color: "#FCD34D" },
        ]}
      />

      <LightSource origin="bottom" color="#FCD34D" size="85%" intensity={0.58} blendMode="screen" />

      <LightShafts
        origin="bottom"
        color="#FED7AA"
        count={6}
        intensity={0.20}
        spread={75}
        length={160}
        rotateDeg={3.5}
        pulseDuration={6.5}
      />

      <BloomFlare cx="50%" cy="68%" color="#FFE3A8" intensity={0.65} size={680} pulseDuration={7} />

      {/* Drifting violet → rose → amber → gold masses at varied depths */}
      <DriftAuras
        auras={[
          /* Deep background — softest, slowest */
          { size: 1320, top: -320, left: -320, color: "#1E0635", opacity: 0.65, blur: 120,
            drift: { x: 80, y: 40, scale: 1.08, duration: 26 } },
          { size: 1240, top: -280, right: -300, color: "#3B0764", opacity: 0.60, blur: 120,
            drift: { x: -70, y: 50, scale: 0.94, duration: 28 } },

          /* Midground — primary mood carriers */
          { size: 1180, top: -180, left: -180, color: "#3B0764", opacity: 0.55, blur: 90,
            drift: { x: 100, y: 40, scale: 1.06, duration: 18 } },
          { size: 980,  top: "8%", right: -180, color: "#831843", opacity: 0.52, blur: 90,
            drift: { x: -80, y: 50, scale: 0.94, duration: 20 } },
          { size: 760,  top: -100, left: "38%", color: "#BE185D", opacity: 0.45, blur: 70,
            drift: { x: 35, y: 22, duration: 22 } },

          /* Foreground warm masses — sharper, faster */
          { size: 1080, bottom: -260, left: 60,  color: "#EA580C", opacity: 0.55, blur: 80,
            drift: { x: 70, y: -35, scale: 1.06, duration: 17 } },
          { size: 1180, bottom: -300, right: 40, color: "#F59E0B", opacity: 0.50, blur: 80,
            drift: { x: -55, y: -40, scale: 1.05, duration: 19 } },
          { size: 760,  bottom: "20%", left: "44%", color: "#FCD34D", opacity: 0.45, blur: 60,
            drift: { x: 30, y: -20, duration: 20 } },
          { size: 640,  bottom: "8%", left: "72%", color: "#FED7AA", opacity: 0.36, blur: 55,
            drift: { x: -40, y: -25, scale: 1.06, duration: 16 } },
        ]}
      />

      {/* Aurora streamers — twilight flowing light bands */}
      <AuroraBands
        bands={[
          { y: "22%", color: "#BE185D", height: 220, rotate: -3, intensity: 0.30, duration: 32, driftX: 140 },
          { y: "48%", color: "#EA580C", height: 180, rotate: 4,  intensity: 0.30, duration: 38, driftX: 160 },
          { y: "74%", color: "#FCD34D", height: 240, rotate: -2, intensity: 0.26, duration: 28, driftX: 120 },
        ]}
      />

      {/* Bokeh — soft out-of-focus highlights */}
      <BokehField
        dots={[
          { size: 320, top: "14%", left: "12%", color: "#DDD6FE", opacity: 0.26, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "30%", left: "78%", color: "#F9A8D4", opacity: 0.28, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#FCD34D", opacity: 0.24, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "76%", left: "82%", color: "#FED7AA", opacity: 0.30, duration: 16, driftX: 28, driftY: 18 },
          { size: 300, top: "52%", left: "56%", color: "#FFE3A8", opacity: 0.22, duration: 24, driftX: 32, driftY: 22 },
        ]}
      />

      {/* Early stars emerging in the upper twilight sky */}
      <TwinkleField
        count={24}
        color="#FFFFFF"
        minSize={1.4}
        maxSize={2.6}
        intensity={0.80}
        yMin={2}
        yMax={42}
        durationRange={[2.5, 5.5]}
        seed={47}
      />

      <AtmosphericHaze color="#9A3412" opacity={0.07} blendMode="multiply" />

      <ParticleField
        count={28}
        color="#FED7AA"
        minSize={1.4}
        maxSize={3.8}
        intensity={0.55}
        driftDistance={70}
        durationRange={[20, 38]}
        seed={37}
      />

      <AtmosphericRays
        origin="bottom"
        color="#FCD34D"
        rayCount={5}
        intensity={0.10}
        spread={60}
        length={140}
      />

      <TextureGrain opacity={0.022} />
    </>
  );
});

/* ───────── Final logo ───────── */

function FinalLogo({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: FONT,
        zIndex: 5,
      }}
    >
      <FinalWordmarkAnim visible={visible} />
    </div>
  );
}

function FinalWordmarkAnim({ visible }: { visible: boolean }) {
  return (
    <BrandLogoReveal
      visible={visible}
      variant={ATMOSPHERICS ? "white" : "dark"}
      height={140}
      glowColor="#FCD34D"
      glowIntensity={ATMOSPHERICS ? 0.65 : 0}
      enterDuration={1.2}
      dropShadow={
        ATMOSPHERICS
          ? "drop-shadow(0 0 44px rgba(252, 211, 77, 0.65)) drop-shadow(0 0 110px rgba(125, 211, 252, 0.32)) drop-shadow(0 8px 28px rgba(15, 4, 32, 0.70))"
          : "drop-shadow(0 2px 8px rgba(15, 23, 41, 0.10))"
      }
    />
  );
}

