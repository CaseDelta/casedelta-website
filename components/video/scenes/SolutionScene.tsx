"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { AppFrame, Cursor } from "@/components/video/primitives/AppFrame";
import { BrandLogoReveal, DeltaIcon } from "@/components/video/primitives/BrandLogo";
import {
  IntegrationLogo,
  IntegrationKey,
  INTEGRATION_NAMES,
} from "@/components/video/primitives/IntegrationLogos";
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
  LightShafts,
  BloomFlare,
  TwinkleField,
  AuroraBands,
  BokehField,
  productShadow,
} from "@/components/video/primitives/Landscape";
import {
  FONT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  BLUE,
  BLUE_DEEP,
  BORDER,
  SUCCESS_GREEN,
  SUCCESS_GREEN_TINT,
  SUCCESS_GREEN_BORDER,
  SOFT_EASE,
} from "@/components/video/primitives/tokens";

export const SOLUTION_DURATION_MS = 13300;
export const SOLUTION_BACKGROUND = "#0B1F3A";

/* ATMOSPHERICS — temporary kill-switch (see VSL_HANDOFF.md). */
const ATMOSPHERICS = false;

/* SOLUTION scene — 0:12–0:23 of the VSL.
 *
 * Landscape: OCEAN-SKY AURORA.
 *   Deep navy → cobalt → cyan → soft turquoise → deep teal as drifting color
 *   masses. No literal horizon line, no water ripples. Light shafts from
 *   above-center, mist particles throughout, sun glints high in the sky.
 *
 * Logo uses the REAL CaseDelta wordmark asset (trimmed-logo-white.png).
 *
 * Internal timeline:
 *   0.4s  – CaseDelta wordmark scales in at center
 *   2.0s  – tagline wipes in below
 *   4.2s  – logo + tagline fade out
 *   4.3s  – focal bloom pulses (beat change)
 *   4.7s  – AppFrame materializes
 *   5.0s  – integration card grid begins cascading in (3-col, 9 cards,
 *           all visible in viewport — no scrolling). 0.13s gap between
 *           rows + 0.55s per-card entry, so cards arrive deliberately.
 *           ALL cards show "Connect" — none pre-connected. Top row (the
 *           three click targets): Clio, Outlook, Word.
 *   6.1s  – cascade complete; full grid visible
 *   6.8s  – non-target cards blur out (depth-of-field push) while the
 *           three top-row targets stay sharp with a subtle blue border +
 *           lifted shadow
 *   7.3s  – cursor enters from off-screen-left at button row height
 *   7.8s  – cursor at Clio Connect → press pulse → "Connecting…" → Connected
 *   8.8s  – cursor at Outlook Connect → press pulse → "Connecting…" → Connected
 *   9.8s  – cursor at Word Connect → press pulse → "Connecting…" → Connected
 *  10.15s – all 3 cards Connected; viewer holds on the result (~1.1s)
 *  11.3s  – cursor fades out (in place on Word) + chat bar zoom takes over
 *  11.3s  – chat bar zooms in centered + scales up large; AppFrame fades
 *           and blurs behind it. Sample query types out with context chips
 *           Clio · Word · Outlook — visualizes "from one spot, with a
 *           single sentence"
 *  13.3s  – scene end
 */
export function SolutionScene({ t }: { t: number }) {
  const logoVisible    = t > 0.4 && t < 4.2;
  const beatBloom1     = t > 4.3 && t < 5.5;
  const beatBloom2     = t > 8.4 && t < 9.6;
  const appFrameVisible = t > 4.7;
  const tileT           = t - 5.0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: ATMOSPHERICS ? SOLUTION_BACKGROUND : "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {ATMOSPHERICS && (
        <>
          <OceanHorizonLandscape />
          <FocalBloom
            color="#E0F7FF"
            size="55%"
            baseIntensity={0.16}
            pulse={beatBloom1 || beatBloom2}
            pulseDuration={1.4}
            blendMode="screen"
          />
          <DepthVignette tint="#040D1F" intensity={0.55} innerStop={32} outerStop={100} />
        </>
      )}

      <LogoLockup visible={logoVisible} />

      <AppStage
        visible={appFrameVisible}
        tileT={tileT}
      />
    </div>
  );
}

/* ───────── Landscape: ocean-sky aurora ───────── */

const OceanHorizonLandscape = memo(function OceanHorizonLandscape() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#0B1F3A" },
          { offset: 0.18, color: "#15356E" },
          { offset: 0.40, color: "#2B6CB0" },
          { offset: 0.50, color: "#7DD3FC" },
          { offset: 0.55, color: "#67E8F9" },
          { offset: 0.75, color: "#0E7490" },
          { offset: 1,    color: "#0A4861" },
        ]}
      />

      <LightSource origin="top" color="#FFFFFF" size="75%" intensity={0.42} blendMode="screen" />

      <LightShafts
        origin="top"
        color="#E0F7FF"
        count={5}
        intensity={0.16}
        spread={55}
        length={130}
        rotateDeg={2.5}
        pulseDuration={7}
      />

      <BloomFlare cx="50%" cy="32%" color="#FFF8E0" intensity={0.50} size={550} pulseDuration={6.5} />

      {/* Drifting color masses — varied depths for parallax-like flow */}
      <DriftAuras
        auras={[
          /* Deep background — softest, slowest */
          { size: 1320, top: -300, left: -320, color: "#15356E", opacity: 0.55, blur: 120,
            drift: { x: 70, y: 40, scale: 1.08, duration: 26 } },
          { size: 1240, top: -260, right: -300, color: "#0E7490", opacity: 0.50, blur: 120,
            drift: { x: -60, y: 50, scale: 0.94, duration: 28 } },

          /* Midground primary mood carriers */
          { size: 1100, top: -180, left: -100, color: "#E0F7FF", opacity: 0.42, blur: 90,
            drift: { x: 90, y: 30, scale: 1.06, duration: 18 } },
          { size: 940,  top: "8%", right: -180, color: "#A5F3FC", opacity: 0.40, blur: 80,
            drift: { x: -70, y: 40, scale: 0.96, duration: 20 } },
          { size: 760,  top: -100, left: "36%", color: "#FFFFFF", opacity: 0.34, blur: 70,
            drift: { x: 40, y: 22, duration: 22 } },

          /* Foreground turquoise-teal masses — sharper, faster */
          { size: 1080, bottom: -260, left: 80,  color: "#22D3EE", opacity: 0.34, blur: 80,
            drift: { x: 70, y: -30, scale: 1.05, duration: 16 } },
          { size: 1180, bottom: -300, right: 60, color: "#0891B2", opacity: 0.38, blur: 80,
            drift: { x: -55, y: -45, scale: 1.06, duration: 18 } },
          { size: 760,  bottom: "16%", left: "42%", color: "#7DD3FC", opacity: 0.30, blur: 60,
            drift: { x: 35, y: -22, duration: 20 } },
          { size: 640,  bottom: "6%", left: "72%", color: "#67E8F9", opacity: 0.26, blur: 55,
            drift: { x: -40, y: -25, scale: 1.05, duration: 17 } },
        ]}
      />

      {/* Aurora streamers — flowing curved light bands */}
      <AuroraBands
        bands={[
          { y: "20%", color: "#A5F3FC", height: 220, rotate: -3, intensity: 0.30, duration: 32, driftX: 140 },
          { y: "46%", color: "#7DD3FC", height: 180, rotate: 4,  intensity: 0.26, duration: 38, driftX: 160 },
          { y: "74%", color: "#67E8F9", height: 240, rotate: -2, intensity: 0.22, duration: 28, driftX: 120 },
        ]}
      />

      {/* Bokeh — soft out-of-focus highlights */}
      <BokehField
        dots={[
          { size: 320, top: "16%", left: "12%", color: "#E0F7FF", opacity: 0.30, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "30%", left: "78%", color: "#A5F3FC", opacity: 0.28, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#7DD3FC", opacity: 0.22, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "76%", left: "82%", color: "#67E8F9", opacity: 0.28, duration: 16, driftX: 28, driftY: 18 },
          { size: 300, top: "52%", left: "54%", color: "#FFFFFF", opacity: 0.18, duration: 24, driftX: 32, driftY: 22 },
        ]}
      />

      {/* Sun glints — bright pulsing points scattered through the sky */}
      <TwinkleField
        count={22}
        color="#FFFFFF"
        minSize={1.4}
        maxSize={3}
        intensity={0.80}
        yMin={12}
        yMax={70}
        durationRange={[1.8, 3.6]}
        seed={97}
      />

      <AtmosphericHaze color="#0E7490" opacity={0.06} blendMode="multiply" />

      <AtmosphericRays
        origin="top"
        color="#E0F7FF"
        rayCount={5}
        intensity={0.10}
        spread={55}
        length={120}
      />

      <ParticleField
        count={28}
        color="#E0F7FF"
        minSize={1.2}
        maxSize={3.4}
        intensity={0.50}
        driftDistance={60}
        durationRange={[22, 38]}
        seed={29}
      />

      <TextureGrain opacity={0.020} />
    </>
  );
});

/* ───────── Logo lockup ───────── */

function LogoLockup({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
        zIndex: 5,
      }}
    >
      <BrandLogoReveal
        visible={visible}
        variant={ATMOSPHERICS ? "white" : "dark"}
        height={130}
        glowColor="#A5F3FC"
        glowIntensity={ATMOSPHERICS ? 0.60 : 0}
        enterDuration={1.1}
        dropShadow={
          ATMOSPHERICS
            ? "drop-shadow(0 0 38px rgba(125, 211, 252, 0.60)) drop-shadow(0 0 100px rgba(125, 211, 252, 0.30)) drop-shadow(0 8px 24px rgba(11, 31, 58, 0.60))"
            : "drop-shadow(0 2px 6px rgba(15, 23, 41, 0.08))"
        }
      />
    </div>
  );
}

/* ───────── App stage ─────────
 *
 * Two layered surfaces:
 *   • AppFrame + IntegrationsBody — the integration list with cursor click
 *     interaction. Fades + blurs out once the chat-bar zoom takes over.
 *   • ChatBarPunchline — emerges centered + large after all clicks land,
 *     becomes the focal element with the sample query.
 */

const CHAT_ZOOM_T = 6.3; // tileT — chat bar takes over after the celebration pause (t = 11.3s)

function AppStage({
  visible,
  tileT,
}: {
  visible: boolean;
  tileT: number;
}) {
  const chatActive = tileT > CHAT_ZOOM_T;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.94,
        y: visible ? 0 : 18,
        filter: visible ? "blur(0px)" : "blur(10px)",
      }}
      transition={{ duration: 0.65, ease: SOFT_EASE }}
      style={{ position: "absolute", inset: 0, zIndex: 6 }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: chatActive ? 0.28 : 1,
          filter: chatActive ? "blur(5px)" : "blur(0px)",
          scale: chatActive ? 0.97 : 1,
        }}
        transition={{ duration: 0.7, ease: SOFT_EASE }}
        style={{ position: "absolute", inset: 0 }}
      >
        <AppFrame
          selected="integrations"
          firmName="Schmidt & Associates"
          firmInitial="S"
          style={{
            boxShadow: productShadow({ tint: "#0E2954", intensity: 1.4, size: "lg" }),
            border: `1px solid rgba(125, 211, 252, 0.20)`,
          }}
        >
          <IntegrationsBody tileT={tileT} />
        </AppFrame>
      </motion.div>
      <ChatBarPunchline visible={chatActive} />
    </motion.div>
  );
}

/* ───────── Integrations body ─────────
 *
 * A long vertical list of integrations. ALL items start as "Connect"
 * (none pre-connected). Three target items (Clio, Outlook, Microsoft Word)
 * are then clicked by an animated cursor — these are the integrations
 * needed to draft "the demand letter for Smith v. Allstate" (case data,
 * correspondence, drafting). Non-target rows blur out during the click
 * phase to push focus onto the targets. */

/* 9 integrations, 3 rows of 3. Top row are the click targets (Clio,
 * Outlook, Word) — the tools needed to fulfill the chronology PDF
 * workflow. Rows 1-2 are well-known law-firm tools to ground the
 * ecosystem. All visible in the viewport at once — no scrolling. */
const INTEGRATION_LIST: IntegrationKey[] = [
  // Row 0 — click targets
  "clio",
  "outlook",
  "word",
  // Row 1 — core productivity
  "google",
  "quickbooks",
  "dropbox",
  // Row 2 — Microsoft suite + signing + comms
  "microsoft",
  "docusign",
  "slack",
];

const CLICK_TARGETS_ORDERED: IntegrationKey[] = ["clio", "outlook", "word"];

/* Per-target click time (tileT). Each click flips the card via a brief
 * "Connecting…" state to "Connected", aligned with the cursor pulse. */
const CLICK_TIMES_T   = [2.8, 3.8, 4.8]; // t = 7.8, 8.8, 9.8
const CONNECTING_DUR  = 0.35;            // s — "Connecting…" state duration before flipping to Connected

const CASCADE_START_T = 0.0;
const CASCADE_GAP_T   = 0.13;  // slow row-by-row cascade — cards arrive deliberately, not in a flurry
const CARD_ENTRY_DUR  = 0.55;  // s — per-card opacity/y/scale animation duration
const BLUR_START_T    = 1.8;   // 0.7s dwell on the full grid (cascade settles by ~1.1s, hold, then blur)
const BLUR_RAMP       = 0.4;
const CURSOR_ENTER_T  = 2.3;   // cursor enters after blur completes
const CURSOR_EXIT_T   = 6.3;   // cursor exits after a ~1.1s celebration pause showing all 3 connected

/* ─── Grid geometry ───
 * AppFrame: 1340w × 760h. Sidebar 64w (icon-only rail). Topbar 44h.
 * Body content = 1276 × 716. Body padding 28px top, 32px sides → inner
 * 1212 × 688. 3-col grid with 16px gap → card width = (1212 - 32) / 3 = 393.33.
 *
 * Cards are now name + Connect button only (no description), so they sit
 * shorter. The page header is BIG ("Integrations" at 38px) so it dominates
 * the top of the page and the cards feel secondary to the brand of the
 * action.
 */
const GRID_COLS       = 3;
const GRID_GAP        = 16;
const BODY_INNER_W    = 1212;
const CARD_WIDTH      = (BODY_INNER_W - (GRID_COLS - 1) * GRID_GAP) / GRID_COLS;
const CARD_HEIGHT     = 184;
const CARD_PAD        = 24;
const BODY_PAD_LEFT   = 32;
const LIST_TOP_OFFSET = 28 + 70 + 14; // body padding-top + big page header + marginTop
const BUTTON_HALF_W   = 48;
const BUTTON_BOTTOM_OFFSET = 24 + 16; // card padding-bottom + button half-height

const TARGET_INDICES = CLICK_TARGETS_ORDERED.map((b) => INTEGRATION_LIST.indexOf(b));

function cardCol(idx: number): number {
  return idx % GRID_COLS;
}
function cardRow(idx: number): number {
  return Math.floor(idx / GRID_COLS);
}
function cardLeftInBody(col: number): number {
  return BODY_PAD_LEFT + col * (CARD_WIDTH + GRID_GAP);
}
function cardTopInBody(row: number): number {
  return LIST_TOP_OFFSET + row * (CARD_HEIGHT + GRID_GAP);
}
function buttonCenterInBody(idx: number): { x: number; y: number } {
  return {
    x: cardLeftInBody(cardCol(idx)) + CARD_PAD + BUTTON_HALF_W,
    y: cardTopInBody(cardRow(idx)) + CARD_HEIGHT - BUTTON_BOTTOM_OFFSET,
  };
}

type ConnectState = "available" | "connecting" | "connected";

function smoothStep(x: number): number {
  const k = Math.max(0, Math.min(1, x));
  return k * k * (3 - 2 * k);
}

function cardConnectStateAtT(brand: IntegrationKey, tileT: number): ConnectState {
  const idx = CLICK_TARGETS_ORDERED.indexOf(brand);
  if (idx < 0) return "available";
  const clickT = CLICK_TIMES_T[idx];
  if (tileT < clickT) return "available";
  if (tileT < clickT + CONNECTING_DUR) return "connecting";
  return "connected";
}

/* Press effect — card briefly squishes (scale 1 → 0.96 → 1) at click. */
function cardPressScaleAtT(brand: IntegrationKey, tileT: number): number {
  const idx = CLICK_TARGETS_ORDERED.indexOf(brand);
  if (idx < 0) return 1;
  const clickT = CLICK_TIMES_T[idx];
  const dt = tileT - clickT;
  if (dt < -0.05 || dt > 0.30) return 1;
  // V-shape: 1 → 0.96 over 0.10s, → 1 over 0.20s
  if (dt < 0.10) return 1 - 0.04 * smoothStep(dt / 0.10);
  return 0.96 + 0.04 * smoothStep((dt - 0.10) / 0.20);
}

function cardBlurAtT(brand: IntegrationKey, tileT: number): number {
  if (CLICK_TARGETS_ORDERED.includes(brand)) return 0;
  if (tileT < BLUR_START_T) return 0;
  return smoothStep((tileT - BLUR_START_T) / BLUR_RAMP);
}

function cardFocusAtT(brand: IntegrationKey, tileT: number): number {
  if (!CLICK_TARGETS_ORDERED.includes(brand)) return 0;
  if (tileT < BLUR_START_T) return 0;
  return smoothStep((tileT - BLUR_START_T) / BLUR_RAMP);
}

function IntegrationsBody({ tileT }: { tileT: number }) {
  return (
    <div
      style={{
        padding: "28px 32px 0 32px",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <PageHeader />

      <div
        style={{
          position: "relative",
          marginTop: 14,
          height: "calc(100% - 100px)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
            gap: GRID_GAP,
            alignContent: "start",
          }}
        >
          {INTEGRATION_LIST.map((brand, i) => (
            <IntegrationCard
              key={brand}
              brand={brand}
              visible={tileT > CASCADE_START_T + i * CASCADE_GAP_T}
              connectState={cardConnectStateAtT(brand, tileT)}
              blur={cardBlurAtT(brand, tileT)}
              focus={cardFocusAtT(brand, tileT)}
              pressScale={cardPressScaleAtT(brand, tileT)}
            />
          ))}
        </div>
      </div>

      <CursorOverlay tileT={tileT} />
    </div>
  );
}

/* ───────── Cursor overlay ─────────
 *
 * Coordinates are in IntegrationsBody coordinate space. Cursor enters from
 * off-screen left, visits the first three card Connect buttons in order,
 * then exits. The cursor SVG's tip sits roughly at SVG (3, 5), so each
 * stop subtracts that offset to land precisely on the button. */

type CursorStop = { atT: number; x: number; y: number };

const CURSOR_TIP_OFFSET_X = 3;
const CURSOR_TIP_OFFSET_Y = 5;

function buttonCursorStop(targetIdx: number, atT: number): CursorStop {
  const idx = TARGET_INDICES[targetIdx];
  const { x, y } = buttonCenterInBody(idx);
  return { atT, x: x - CURSOR_TIP_OFFSET_X, y: y - CURSOR_TIP_OFFSET_Y };
}

const CURSOR_STOPS: CursorStop[] = [
  { atT: CURSOR_ENTER_T, x: -40, y: 360 },
  buttonCursorStop(0, CLICK_TIMES_T[0]),
  buttonCursorStop(1, CLICK_TIMES_T[1]),
  buttonCursorStop(2, CLICK_TIMES_T[2]),
  /* No off-screen exit stop — cursor stays at the Word button after the
   * final click and fades out in place when visibility ends at CURSOR_EXIT_T. */
];

function cursorPosAtT(tileT: number): { x: number; y: number } {
  for (let i = 0; i < CURSOR_STOPS.length - 1; i++) {
    const a = CURSOR_STOPS[i];
    const b = CURSOR_STOPS[i + 1];
    if (tileT >= a.atT && tileT <= b.atT) {
      const k = smoothStep((tileT - a.atT) / (b.atT - a.atT));
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
    }
  }
  if (tileT < CURSOR_STOPS[0].atT) return CURSOR_STOPS[0];
  return CURSOR_STOPS[CURSOR_STOPS.length - 1];
}

function CursorOverlay({ tileT }: { tileT: number }) {
  const visible = tileT > CURSOR_ENTER_T - 0.05 && tileT < CURSOR_EXIT_T + 0.05;
  const { x, y } = cursorPosAtT(tileT);

  // Pulse for ~0.35s around each click time.
  const pulsing = CLICK_TIMES_T.some((ct) => tileT > ct - 0.10 && tileT < ct + 0.40);

  return (
    <Cursor
      x={x}
      y={y}
      visible={visible}
      pulsing={pulsing}
      transition={{ duration: 0.05, ease: "linear" }}
    />
  );
}

function PageHeader() {
  return (
    <h1
      style={{
        margin: 0,
        fontSize: 38,
        fontWeight: 700,
        color: TEXT_PRIMARY,
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
      }}
    >
      Integrations
    </h1>
  );
}

function IntegrationCard({
  brand,
  visible,
  connectState,
  blur,
  focus,
  pressScale,
}: {
  brand: IntegrationKey;
  visible: boolean;
  connectState: ConnectState;
  blur: number;       // 0–1
  focus: number;      // 0–1
  pressScale: number; // 0.96–1
}) {
  const name = INTEGRATION_NAMES[brand];

  /* Blurred (non-target) cards: fade + blur to push depth back.
   * Focused (target) cards: subtle blue border tint + lifted shadow. */
  const blurPx     = blur * 5;
  const dimOpacity = 1 - blur * 0.55;
  const focusedBorder = focus > 0.05
    ? `1px solid rgba(37, 99, 235, ${0.30 * focus})`
    : `1px solid ${BORDER}`;
  const focusedShadow = focus > 0.05
    ? `0 10px 30px rgba(37, 99, 235, ${0.10 * focus}), 0 2px 6px rgba(15, 23, 41, 0.05)`
    : "0 1px 2px rgba(15, 23, 41, 0.04)";

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? dimOpacity : 0,
        y: visible ? 0 : 12,
        scale: visible ? pressScale : 0.96,
        filter: `blur(${blurPx}px)`,
      }}
      transition={{ duration: CARD_ENTRY_DUR, ease: SOFT_EASE }}
      style={{
        position: "relative",
        height: CARD_HEIGHT,
        padding: CARD_PAD,
        borderRadius: 14,
        background: "#FFFFFF",
        border: focusedBorder,
        boxShadow: focusedShadow,
        display: "flex",
        flexDirection: "column",
        zIndex: focus > 0.05 ? 2 : 1,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <IntegrationLogo brand={brand} size={42} />
      </div>

      <div
        style={{
          flex: 1,
          fontSize: 18,
          fontWeight: 700,
          color: TEXT_PRIMARY,
          letterSpacing: "-0.012em",
        }}
      >
        {name}
      </div>

      <div>
        <ConnectActionButton state={connectState} />
      </div>
    </motion.div>
  );
}

function ConnectActionButton({ state }: { state: ConnectState }) {
  if (state === "connected") return <ConnectedPill />;
  if (state === "connecting") return <ConnectingButton />;
  return <ConnectButton />;
}

function ConnectButton() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 18px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        color: TEXT_PRIMARY,
        background: "#FFFFFF",
        border: `1px solid ${BORDER}`,
        letterSpacing: "-0.003em",
        minWidth: 96,
      }}
    >
      Connect
    </span>
  );
}

function ConnectingButton() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: "8px 16px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        color: BLUE_DEEP,
        background: "rgba(37, 99, 235, 0.08)",
        border: `1px solid rgba(37, 99, 235, 0.30)`,
        letterSpacing: "-0.003em",
        minWidth: 96,
      }}
    >
      <Spinner />
      Connecting…
    </span>
  );
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        width: 11,
        height: 11,
        borderRadius: 999,
        border: `1.7px solid rgba(37, 99, 235, 0.25)`,
        borderTopColor: BLUE,
      }}
    />
  );
}

function ConnectedPill() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 16px",
        borderRadius: 8,
        background: SUCCESS_GREEN_TINT,
        border: `1px solid ${SUCCESS_GREEN_BORDER}`,
        fontSize: 13,
        fontWeight: 600,
        color: "#047857",
        letterSpacing: "-0.003em",
        minWidth: 96,
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: SUCCESS_GREEN,
          boxShadow: `0 0 6px ${SUCCESS_GREEN}88`,
        }}
      />
      Connected
    </span>
  );
}

/* ───────── Chat bar punchline ─────────
 *
 * Centered + scaled-up zoom-in. Becomes the focal element after all three
 * targets have been clicked. Larger query font, context chips reflect the
 * three integrations the user just connected (Clio · Outlook · Word). */

function ChatBarPunchline({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 1240,
        fontFamily: FONT,
        zIndex: 10,
      }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 36,
          scale: visible ? 1 : 0.84,
        }}
        transition={{ duration: 0.75, ease: SOFT_EASE }}
      >
        <ChatBarBody visible={visible} />
      </motion.div>
    </div>
  );
}

function ChatBarBody({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(255,255,255,0.95) 100%)",
        border: `1px solid rgba(125, 211, 252, 0.45)`,
        borderRadius: 22,
        boxShadow: productShadow({ tint: "#0E2954", intensity: 2.0, size: "lg" }),
        padding: "28px 34px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <DeltaIcon size={48} />
        <div
          style={{
            flex: 1,
            fontSize: 22,
            fontWeight: 500,
            color: TEXT_PRIMARY,
            letterSpacing: "-0.012em",
          }}
        >
          <TypingLine visible={visible} text="Pull Clio production, build a chronology PDF, attach to Outlook draft." />
        </div>
        <SendButton glowing={visible} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginTop: 18,
          paddingTop: 16,
          borderTop: `1px solid rgba(125, 211, 252, 0.22)`,
        }}
      >
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: TEXT_TERTIARY,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            marginRight: 4,
          }}
        >
          Working with
        </span>
        <ContextChip label="Clio" />
        <ContextChip label="Word" />
        <ContextChip label="Outlook" />
      </div>
    </div>
  );
}

function TypingLine({ visible, text }: { visible: boolean; text: string }) {
  return (
    <motion.span
      initial={false}
      animate={{ clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
      transition={{ duration: 1.6, ease: [0.55, 0, 0.45, 1], delay: visible ? 0.25 : 0 }}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {text}
      <BlinkingCaret visible={visible} />
    </motion.span>
  );
}

function BlinkingCaret({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      style={{
        display: "inline-block",
        width: 2.5,
        height: 22,
        marginLeft: 4,
        background: BLUE,
        verticalAlign: "middle",
        borderRadius: 1.5,
      }}
    />
  );
}

function SendButton({ glowing }: { glowing: boolean }) {
  return (
    <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
      {glowing && (
        <motion.div
          animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: BLUE,
            zIndex: 0,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          width: 52,
          height: 52,
          borderRadius: 999,
          background: `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_DEEP} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 22px rgba(37,99,235,0.42)",
          zIndex: 1,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M9 14 L9 4 M5 8 L9 4 L13 8"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function ContextChip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 12px",
        borderRadius: 999,
        fontSize: 12.5,
        fontWeight: 500,
        color: BLUE_DEEP,
        background: "rgba(37,99,235,0.08)",
        border: "1px solid rgba(37,99,235,0.18)",
        letterSpacing: "-0.005em",
      }}
    >
      {label}
    </span>
  );
}

