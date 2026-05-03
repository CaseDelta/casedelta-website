"use client";

import { motion } from "framer-motion";
import { CSSProperties, useEffect, useState } from "react";

/* Real CaseDelta brand assets — the live website's logo files.
 *
 *   • trimmed-logo-white.png   — full wordmark + icon, WHITE (1860×567, ~3.28:1)
 *     Use on dark scene backgrounds (Solution, Outro twilight, Use Cases)
 *
 *   • trimmed-logo.png         — full wordmark + icon, DARK (1860×567)
 *     Use on light scene backgrounds (Demo, original Dream)
 *
 *   • delta-icon-light.svg     — icon only, DARK (for light backgrounds)
 *     Use as small chat-bar Delta avatar inside the white app surface.
 *
 * All cinematic logo work in the VSL must use these assets — never a
 * hand-drawn triangle path.
 */

const ASPECT_RATIO = 1860 / 567;

export function BrandWordmark({
  variant = "white",
  height,
  style,
}: {
  variant?: "white" | "dark";
  height: number;
  style?: CSSProperties;
}) {
  const src =
    variant === "white"
      ? "/assets/branding/trimmed-logo-white.png"
      : "/assets/branding/trimmed-logo.png";
  const width = height * ASPECT_RATIO;
  return (
    <img
      src={src}
      alt="CaseDelta"
      style={{
        height,
        width,
        display: "block",
        userSelect: "none",
        pointerEvents: "none",
        ...style,
      }}
      draggable={false}
    />
  );
}

export function DeltaIcon({
  size,
  style,
}: {
  size: number;
  style?: CSSProperties;
}) {
  /* The dark icon — designed to sit on light/white surfaces (chat-bar avatar). */
  return (
    <img
      src="/assets/branding/delta-icon-light.svg"
      alt="Delta"
      style={{
        width: size,
        height: size,
        display: "block",
        userSelect: "none",
        pointerEvents: "none",
        ...style,
      }}
      draggable={false}
    />
  );
}

/* ───────── BrandLogoReveal ─────────
 * Two-phase cinematic reveal:
 *   Phase A — the delta icon enters alone at scene center (entrance bloom +
 *             scale overshoot + filter blur).
 *   Phase B — after `iconHoldDuration`, the wordmark slides left to its
 *             natural composition position while a clip-path mask wipes the
 *             "CaseDelta" text into view from the icon's right edge.
 *
 * Implementation: a single `trimmed-logo*.png` is rendered, but during Phase
 * A it's translated right by (50 - ICON_CENTER_PCT)% so the icon portion
 * lands at scene center, and clip-path hides everything past the icon
 * region. On Phase B both animate to their natural state simultaneously, so
 * the text appears to emerge from where the icon was while the icon shifts
 * to its proper left position.
 *
 * The glow elements (outer bloom, inner core, anamorphic streak) re-anchor
 * from icon-center to wordmark-center on the same delayed transition, so
 * the bloom tracks the icon during Phase A.
 *
 * State machine:
 *   • visible=false                       → hidden
 *   • visible=true, dissolving=false      → Phase A → hold → Phase B → pulse
 *   • visible=true, dissolving=true       → scale up + fade + bloom flash
 */
export function BrandLogoReveal({
  visible,
  dissolving = false,
  variant = "white",
  height,
  glowColor = "#FFFFFF",
  glowIntensity = 0.55,
  enterDuration = 1.0,
  iconHoldDuration = 0.95,
  textRevealDuration = 1.4,
  showShimmer = true,
  dropShadow,
  style,
}: {
  visible: boolean;
  dissolving?: boolean;
  variant?: "white" | "dark";
  height: number;
  glowColor?: string;
  glowIntensity?: number;
  enterDuration?: number;
  iconHoldDuration?: number;
  textRevealDuration?: number;
  showShimmer?: boolean;
  dropShadow?: string;
  style?: CSSProperties;
}) {
  const showLogo = visible && !dissolving;
  const showBloom = visible;

  /* Inner reveal state — once Phase B completes, the inner layers stay at
   * their revealed positions even when `visible` flips false. This prevents
   * the icon + text from "collapsing back together" during the outer fade
   * out; only the outer wrapper's opacity animates on hide. */
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (!visible) return;
    /* Reset on each visible=true → schedule the Phase A → Phase B handoff
     * after entrance + hold completes. */
    setHasRevealed(false);
    const handoffMs = (enterDuration + iconHoldDuration) * 1000;
    const timer = setTimeout(() => setHasRevealed(true), handoffMs);
    return () => clearTimeout(timer);
  }, [visible, enterDuration, iconHoldDuration]);

  /* Icon position within the wordmark, measured from trimmed-logo.png:
   *   icon center sits at ~20% of wordmark width
   *   the gap between icon and "C" sits at ~36% of wordmark width — clean
   *   spot to clip without nicking either glyph
   *   text center (midpoint of 36% → 100%) sits at ~68% of wordmark width
   *
   * To make the text emerge FROM the icon, the wordmark renders as two
   * layers — Layer 1 (icon-only clip) and Layer 2 (text-only clip) — each
   * with its own translateX. During Phase A both layers' visible content is
   * stacked at scene center (icon visible, text invisible). During Phase B
   * the icon slides LEFT to its natural position while the text slides
   * RIGHT and fades in from where the icon used to be. */
  const ICON_CENTER_PCT     = 20;
  const ICON_REGION_PCT     = 36;
  const TEXT_CENTER_PCT     = 68;
  const ICON_CLIP_RIGHT_PCT = 100 - ICON_REGION_PCT;       // 64 — hide right 64% to show icon only
  const TEXT_CLIP_LEFT_PCT  = ICON_REGION_PCT;             // 36 — hide left 36% to show text only
  const ICON_TRANSLATE_PCT  = 50 - ICON_CENTER_PCT;        // +30 — push icon to scene center during Phase A
  const TEXT_TRANSLATE_PCT  = 50 - TEXT_CENTER_PCT;        // -18 — pull text back to scene center during Phase A (overlapping icon)

  const textRevealEase  = [0.16, 1, 0.3, 1] as const;
  const textRevealTransition = {
    duration: textRevealDuration,
    ease: textRevealEase,
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {/* Outer bloom — large, soft. Anchors at icon during Phase A, slides
       * to wordmark center on the same delayed transition as the wordmark. */}
      <motion.div
        initial={false}
        animate={{
          opacity: !showBloom ? 0 : dissolving ? glowIntensity * 1.4 : glowIntensity * 0.65,
          scale: !showBloom ? 0.75 : dissolving ? 2.0 : 1,
          left: hasRevealed ? "50%" : `${ICON_CENTER_PCT}%`,
        }}
        transition={{
          duration: dissolving ? 0.6 : enterDuration * 1.15,
          ease: dissolving ? [0.4, 0, 0.6, 1] : [0.22, 1, 0.36, 1],
          left: textRevealTransition,
        }}
        style={{
          position: "absolute",
          width: height * 5.5,
          height: height * 5.5,
          left: `${ICON_CENTER_PCT}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
          filter: "blur(40px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Inner bright core flash — same anchor logic as outer bloom. */}
      <motion.div
        initial={false}
        animate={{
          opacity: !visible ? 0 : dissolving ? 0.9 : 0.4,
          scale: !visible ? 0.7 : dissolving ? 1.5 : 1,
          left: hasRevealed ? "50%" : `${ICON_CENTER_PCT}%`,
        }}
        transition={{
          duration: dissolving ? 0.45 : enterDuration * 0.95,
          ease: dissolving ? [0.4, 0, 0.6, 1] : [0.22, 1, 0.36, 1],
          left: textRevealTransition,
        }}
        style={{
          position: "absolute",
          width: height * 2.8,
          height: height * 2.8,
          left: `${ICON_CENTER_PCT}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 55%)`,
          filter: "blur(22px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Anamorphic horizontal streak — same anchor logic. */}
      <motion.div
        initial={false}
        animate={{
          opacity: !visible ? 0 : dissolving ? 0.8 : 0.30,
          scaleX: !visible ? 0.55 : 1,
          left: hasRevealed ? "50%" : `${ICON_CENTER_PCT}%`,
        }}
        transition={{
          duration: dissolving ? 0.5 : enterDuration * 1.05,
          ease: [0.22, 1, 0.36, 1],
          left: textRevealTransition,
        }}
        style={{
          position: "absolute",
          width: height * 6,
          height: height * 0.16,
          left: `${ICON_CENTER_PCT}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(90deg, transparent 0%, ${glowColor}88 40%, ${glowColor}DD 50%, ${glowColor}88 60%, transparent 100%)`,
          filter: "blur(10px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* SHIMMER — diagonal light sweep across the icon during the icon-hold
       * phase (between entrance completion and the text reveal). Plays once.
       * Container is centered on scene where the icon sits during Phase A;
       * mix-blend-mode "screen" makes the gradient visibly brighten only
       * where it crosses the dark icon glyph. */}
      {showShimmer && visible && !dissolving && (
        <div
          style={{
            position: "absolute",
            width: height * 1.20,
            height: height * 1.05,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          <motion.div
            initial={{ x: "-115%", opacity: 0 }}
            animate={{ x: "115%", opacity: 1 }}
            transition={{
              x: {
                duration: iconHoldDuration + 0.45,
                delay: enterDuration - 0.05,
                ease: [0.42, 0.00, 0.58, 1.00],
              },
              opacity: {
                duration: 0.25,
                delay: enterDuration - 0.05,
                ease: "linear",
              },
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.92) 50%, transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      )}

      {/* Logo — entrance scale/blur/y on the outer wrapper. Smooth ease-out
       * curves throughout; no overshoot. Small initial scale gap so the icon
       * settles in rather than punching in. */}
      <motion.div
        initial={false}
        animate={{
          opacity: !visible ? 0 : dissolving ? 0 : 1,
          scale: !visible ? 0.92 : dissolving ? 1.18 : 1,
          y: !visible ? 6 : 0,
          filter: !visible ? "blur(6px)" : dissolving ? "blur(4px)" : "blur(0px)",
        }}
        transition={{
          opacity: { duration: dissolving ? 0.55 : enterDuration * 0.85, ease: [0.22, 1, 0.36, 1] },
          scale:   { duration: dissolving ? 0.6 : enterDuration * 1.1,  ease: dissolving ? [0.4, 0, 0.6, 1] : [0.22, 1, 0.36, 1] },
          y:       { duration: enterDuration * 1.1, ease: [0.22, 1, 0.36, 1] },
          filter:  { duration: dissolving ? 0.45 : enterDuration * 0.85, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{
          position: "relative",
          zIndex: 5,
          filter: dropShadow,
        }}
      >
        {/* Sustained breathing glow — kicks in after the full reveal. */}
        <motion.div
          animate={
            showLogo
              ? { opacity: [0.85, 1, 0.85], scale: [1, 1.02, 1] }
              : { opacity: 1, scale: 1 }
          }
          transition={
            showLogo
              ? { duration: 4, repeat: Infinity, ease: "easeInOut", delay: enterDuration + iconHoldDuration + textRevealDuration }
              : { duration: 0 }
          }
        >
          {/* Two-layer wordmark stack so the text can appear to emerge FROM
           * the icon during Phase B. Both layers render the same wordmark
           * image with disjoint clip-paths; their translateX animations
           * split the icon (left) and text (right) apart from a shared
           * scene-center origin. */}
          <div style={{ position: "relative", display: "block" }}>
            {/* Layer 1: Icon — clipped to icon region, slides leftward
             * during Phase B from scene-center to natural left position.
             * Driven by `hasRevealed` so it stays at the natural position
             * once revealed (no collapse-back during outer fade out). */}
            <motion.div
              initial={false}
              animate={{
                x: hasRevealed ? "0%" : `${ICON_TRANSLATE_PCT}%`,
              }}
              transition={{ x: textRevealTransition }}
              style={{
                display: "block",
                clipPath: `inset(0% ${ICON_CLIP_RIGHT_PCT}% 0% 0%)`,
              }}
            >
              <BrandWordmark variant={variant} height={height} />
            </motion.div>

            {/* Layer 2: Text — clipped to text region, overlays Layer 1.
             * During Phase A: opacity 0, translated -18% so text sits at
             * scene-center (overlapping the icon). During Phase B: fades in
             * while sliding RIGHT to natural position with a slight
             * scale-up — reads as text being born from the icon.
             * Driven by `hasRevealed` so once Phase B is reached it stays
             * there; only the outer wrapper's opacity handles fade-out. */}
            <motion.div
              initial={false}
              animate={{
                opacity: hasRevealed ? 1 : 0,
                x: hasRevealed ? "0%" : `${TEXT_TRANSLATE_PCT}%`,
                scale: hasRevealed ? 1 : 0.94,
              }}
              transition={{
                opacity: textRevealTransition,
                x:       textRevealTransition,
                scale:   textRevealTransition,
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "block",
                clipPath: `inset(0% 0% 0% ${TEXT_CLIP_LEFT_PCT}%)`,
                transformOrigin: `${TEXT_CENTER_PCT}% 50%`,
              }}
            >
              <BrandWordmark variant={variant} height={height} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
