"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { AppFrame, Cursor } from "@/components/video/primitives/AppFrame";
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
  AMBER,
  AMBER_DEEP,
  SOFT_EASE,
} from "@/components/video/primitives/tokens";

export const DEMO_DURATION_MS = 13000;
export const DEMO_BACKGROUND = "#F4D58D";

/* ATMOSPHERICS — temporary kill-switch (see VSL_HANDOFF.md). */
const ATMOSPHERICS = false;

const PROMPT_TEXT = "Build the medical chronology for Garcia v. Northwest Hospital.";
const FIRM_NAME = "Kirschbaum & Nowotny LLP";
const FIRM_INITIAL = "K";

/* DEMO scene — 0:23–0:35 of the VSL.
 *
 * Mirrors the actual CaseDelta UI (full chrome variant): wide sidebar with
 * workspace switcher + section labels, top bar with search + actions,
 * History button in the page header, chat conversation in the main area,
 * message input at bottom with formatting toolbar.
 *
 * The conversation shows a discovery file attachment, a user query, and
 * Delta's structured response — chronology table, gaps flagged, email
 * drafted, time logged. Each beat lines up with a VO line:
 *   "Hand Delta thousands of pages of discovery."  → attachment chip
 *   "Tell Delta what to do."                       → user query bubble
 *   "Delta builds the chronology, flags the gaps,
 *    emails opposing counsel, and logs your time." → 4 response sections
 *   "Many tools. Hours of work. Done all in one go." → final hold
 *
 * Internal timeline:
 *   0.4s  – AppFrame fades in with the conversation
 *   0.7s  – Discovery attachment chip appears (VO: "Hand Delta…")
 *   1.7s  – User query bubble appears (VO: "Tell Delta what to do")
 *   1.9s  – Delta typing indicator appears
 *   2.5s  – Response Section 1: chronology PDF preview card (cover + fanned
 *           pages) inline in chat, mirroring the actual CaseDelta chronology
 *   4.5s  – Section 2: "Gaps flagged" bullet list
 *   6.5s  – Section 3: "Email drafted" note
 *   8.0s  – Section 4: "Time logged" note (full response now visible)
 *   8.5s  – Cursor enters from off-screen-right
 *   9.3s  – Cursor reaches PDF card, hovers (pulse begins)
 *   9.5s  – Cursor click on PDF
 *   9.5–10.2s – Zoom transition: AppFrame fades + blurs, the detailed PDF
 *           view (cover + landscape table page side-by-side) assembles at
 *           viewport center
 *  10.2–12.6s – Detailed PDF view holds; viewer reads cover + table while
 *           VO closes ("Many tools. Hours of work. Done all in one go.")
 *  12.6–13.0s – fade out
 */

const CURSOR_ENTER_T    = 8.5;
const CURSOR_OVER_T     = 9.3;
const CURSOR_CLICK_T    = 9.5;
const ZOOM_START_T      = 9.5;
const ZOOM_END_T        = 10.2;
const DETAIL_FADE_OUT_S = 12.6;
const DETAIL_FADE_OUT_E = 13.0;

/* Approximate center of the PDF card in viewport (1920×1080). The card sits
 * at the left of the conversation content area (sidebar 268, chat content
 * starts ~268, conversation content centered with maxWidth 920 → left edge
 * around x=634). With a 460px-wide card, center sits around x=864. Card top
 * is below the brief response text, around y=320; with ~110px height the
 * center is around y=375. */
const PDF_TARGET_X = 864;
const PDF_TARGET_Y = 375;

function smoothStep(x: number): number {
  const k = Math.max(0, Math.min(1, x));
  return k * k * (3 - 2 * k);
}

export function DemoScene({ t }: { t: number }) {
  const appVisible        = t > 0.2;
  const attachmentVisible = t > 0.7;
  const userMsgVisible    = t > 1.7;
  const typingVisible     = t > 1.9 && t < 2.6;
  const sectionVisible    = [
    t > 2.5,  // chronology
    t > 4.5,  // gaps
    t > 6.5,  // email
    t > 8.0,  // time logged
  ];
  const focalPulse        = t > 1.0 && t < 2.6;

  /* Cursor entrance + click. Cursor enters off-screen-right at 8.5s, glides
   * to the PDF card center by 9.3s, hovers, then clicks at 9.5s. Stays in
   * frame briefly during the zoom for visual continuity, then fades. */
  const cursorVisible = t > CURSOR_ENTER_T && t < ZOOM_END_T - 0.1;
  const cursorPulsing = t > CURSOR_OVER_T && t < CURSOR_CLICK_T + 0.4;
  let cursorX = 2050;
  let cursorY = PDF_TARGET_Y;
  if (t >= CURSOR_OVER_T) {
    cursorX = PDF_TARGET_X;
    cursorY = PDF_TARGET_Y;
  } else if (t > CURSOR_ENTER_T) {
    const k = smoothStep((t - CURSOR_ENTER_T) / (CURSOR_OVER_T - CURSOR_ENTER_T));
    cursorX = 2050 + (PDF_TARGET_X - 2050) * k;
    cursorY = PDF_TARGET_Y;
  }

  /* Zoom progress: 0 = chat normal, 1 = chat fully zoomed-out (blurred + dim),
   * detailed PDF fully visible. */
  let zoomK = 0;
  if (t >= ZOOM_END_T) zoomK = 1;
  else if (t > ZOOM_START_T) zoomK = smoothStep((t - ZOOM_START_T) / (ZOOM_END_T - ZOOM_START_T));

  /* Detailed-view opacity — fades in alongside the zoom (not after). The
   * scale + translate animation drives the visual continuity; opacity just
   * brings the content in smoothly. */
  let detailOpacity = 0;
  if (t > ZOOM_START_T && t < DETAIL_FADE_OUT_S) {
    detailOpacity = smoothStep((t - ZOOM_START_T) / 0.5);
  } else if (t >= DETAIL_FADE_OUT_S && t < DETAIL_FADE_OUT_E) {
    detailOpacity = 1 - smoothStep((t - DETAIL_FADE_OUT_S) / (DETAIL_FADE_OUT_E - DETAIL_FADE_OUT_S));
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: ATMOSPHERICS ? DEMO_BACKGROUND : "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {ATMOSPHERICS && (
        <>
          <GoldenFieldLandscape />
          <FocalBloom
            color="#FFF6DC"
            size="55%"
            baseIntensity={0.14}
            pulse={focalPulse}
            pulseDuration={1.4}
            blendMode="screen"
          />
          <DepthVignette tint="#3F2A12" intensity={0.45} innerStop={28} outerStop={100} />
        </>
      )}

      <motion.div
        initial={false}
        animate={{
          opacity: appVisible ? (1 - zoomK * 0.78) : 0,
          scale: appVisible ? (1 - zoomK * 0.04) : 0.94,
          y: appVisible ? 0 : 18,
          filter: appVisible
            ? `blur(${zoomK * 14}px)`
            : "blur(10px)",
        }}
        transition={{ duration: 0.65, ease: SOFT_EASE }}
        style={{ position: "absolute", inset: 0 }}
      >
        <AppFrame
          chrome="full"
          selected="delta"
          firmName={FIRM_NAME}
          firmInitial={FIRM_INITIAL}
          style={{
            boxShadow: productShadow({ tint: AMBER_DEEP, intensity: 1.05, size: "lg" }),
            border: `1px solid ${AMBER}26`,
          }}
        >
          <DeltaChatPage
            attachmentVisible={attachmentVisible}
            userMsgVisible={userMsgVisible}
            typingVisible={typingVisible}
            sectionVisible={sectionVisible}
          />
        </AppFrame>
      </motion.div>

      {/* Cursor — overlays the AppFrame, glides in and clicks the PDF card */}
      <Cursor
        x={cursorX}
        y={cursorY}
        visible={cursorVisible}
        pulsing={cursorPulsing}
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Detailed PDF view — grows out of the card position into viewport
       * center as the chat blurs/dims behind. */}
      {detailOpacity > 0 && (
        <ChronologyDetailedView opacity={detailOpacity} zoomK={zoomK} />
      )}
    </div>
  );
}

/* ───────── Landscape: golden aurora ───────── */

const GoldenFieldLandscape = memo(function GoldenFieldLandscape() {
  return (
    <>
      <SkyGradient
        stops={[
          { offset: 0,    color: "#FFF6DC" },
          { offset: 0.32, color: "#FCE5A8" },
          { offset: 0.62, color: "#F4D58D" },
          { offset: 1,    color: "#E5D2A0" },
        ]}
      />

      <LightSource
        origin="top-right"
        color="#FFF4D6"
        size="85%"
        intensity={0.58}
        blendMode="screen"
      />

      <LightShafts
        origin="top-right"
        color="#FFE3B8"
        count={6}
        intensity={0.18}
        spread={80}
        length={140}
        rotateDeg={3.5}
        pulseDuration={6}
      />

      <BloomFlare cx="92%" cy="12%" color="#FFF4D6" intensity={0.55} size={620} pulseDuration={6.5} />

      <AtmosphericRays
        origin="top-right"
        color="#FEF3C7"
        rayCount={6}
        intensity={0.13}
        spread={75}
        length={130}
      />

      {/* Drifting gold + sage color masses — varied depths for parallax-like flow */}
      <DriftAuras
        auras={[
          /* Deep background — softest, slowest */
          { size: 1340, top: -380, left: -280, color: "#F59E0B", opacity: 0.36, blur: 120,
            drift: { x: 110, y: -50, scale: 1.10, duration: 22 } },
          { size: 1280, top: -340, right: -300, color: "#FBBF24", opacity: 0.40, blur: 120,
            drift: { x: -85, y: 60, scale: 0.92, duration: 24 } },

          /* Midground warm + sage masses */
          { size: 1100, top: "10%", right: -180, color: "#FCE5A8", opacity: 0.50, blur: 80,
            drift: { x: -75, y: 45, scale: 0.94, duration: 18 } },
          { size: 980,  top: -180, left: "26%", color: "#FEF3C7", opacity: 0.55, blur: 70,
            drift: { x: 40, y: 25, duration: 20 } },
          { size: 820,  top: "20%", left: -120, color: "#F4D58D", opacity: 0.42, blur: 75,
            drift: { x: 60, y: 35, scale: 1.05, duration: 22 } },

          /* Foreground sage / amber — sharper, lower */
          { size: 1080, bottom: -260, left: 60,  color: "#84CC16", opacity: 0.28, blur: 80,
            drift: { x: 65, y: -55, scale: 1.07, duration: 17 } },
          { size: 1180, bottom: -300, right: 40, color: "#65A30D", opacity: 0.26, blur: 80,
            drift: { x: -60, y: 50, scale: 1.05, duration: 19 } },
          { size: 760,  bottom: "16%", left: "44%", color: "#FCD34D", opacity: 0.36, blur: 60,
            drift: { x: 30, y: -20, duration: 20 } },
          { size: 640,  bottom: "8%", left: "70%", color: "#FDE68A", opacity: 0.38, blur: 55,
            drift: { x: -35, y: -25, scale: 1.06, duration: 16 } },
        ]}
      />

      {/* Aurora streamers — golden flowing light bands */}
      <AuroraBands
        bands={[
          { y: "20%", color: "#FFE3B8", height: 220, rotate: -3, intensity: 0.30, duration: 30, driftX: 140 },
          { y: "46%", color: "#FCD34D", height: 180, rotate: 4,  intensity: 0.26, duration: 36, driftX: 160 },
          { y: "74%", color: "#FBBF24", height: 240, rotate: -2, intensity: 0.20, duration: 28, driftX: 120 },
        ]}
      />

      {/* Bokeh — soft out-of-focus highlights */}
      <BokehField
        dots={[
          { size: 320, top: "14%", left: "10%", color: "#FEF3C7", opacity: 0.32, duration: 22, driftX: 40, driftY: 24 },
          { size: 260, top: "30%", left: "80%", color: "#FFF4D6", opacity: 0.30, duration: 18, driftX: 30, driftY: 20 },
          { size: 380, top: "62%", left: "30%", color: "#FCD34D", opacity: 0.22, duration: 26, driftX: 35, driftY: 22 },
          { size: 220, top: "78%", left: "82%", color: "#FDE68A", opacity: 0.30, duration: 16, driftX: 28, driftY: 18 },
          { size: 300, top: "52%", left: "56%", color: "#FFE3B8", opacity: 0.20, duration: 24, driftX: 32, driftY: 22 },
        ]}
      />

      <AtmosphericHaze color="#F59E0B" opacity={0.06} blendMode="multiply" />

      {/* Sun glints — bright pulsing points */}
      <TwinkleField
        count={14}
        color="#FFF4D6"
        minSize={1.4}
        maxSize={2.6}
        intensity={0.65}
        yMin={10}
        yMax={50}
        durationRange={[2.0, 4.0]}
        seed={117}
      />

      <ParticleField
        count={28}
        color="#FCD34D"
        minSize={1.5}
        maxSize={4.5}
        intensity={0.55}
        driftDistance={70}
        durationRange={[20, 36]}
        seed={11}
      />

      <TextureGrain opacity={0.022} />
    </>
  );
});

/* ───────── Delta chat page ─────────
 *
 * The page that lives inside AppFrame's content area when chrome="full".
 * Mirrors the actual CaseDelta Delta chat UI:
 *   • Page header bar with "History" pill on the right
 *   • Conversation area: user query at top, Delta's structured response below
 *   • Message input at bottom with formatting toolbar + attachment + send
 */

function DeltaChatPage({
  attachmentVisible,
  userMsgVisible,
  typingVisible,
  sectionVisible,
}: {
  attachmentVisible: boolean;
  userMsgVisible: boolean;
  typingVisible: boolean;
  sectionVisible: boolean[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#FFFFFF",
        fontFamily: FONT,
      }}
    >
      <PageHeaderBar />
      <ConversationArea
        attachmentVisible={attachmentVisible}
        userMsgVisible={userMsgVisible}
        typingVisible={typingVisible}
        sectionVisible={sectionVisible}
      />
      <MessageInput />
    </div>
  );
}

/* ───────── Page header bar (with History) ───────── */

function PageHeaderBar() {
  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "16px 28px 0 28px",
        height: 44,
      }}
    >
      <HistoryPill />
    </div>
  );
}

function HistoryPill() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 14px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        color: TEXT_SECONDARY,
        background: "transparent",
      }}
    >
      <ClockIcon />
      History
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke={TEXT_SECONDARY} strokeWidth="1.3" fill="none" />
      <path d="M7 4 L7 7 L9.5 8.5" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ───────── Conversation area ───────── */

function ConversationArea({
  attachmentVisible,
  userMsgVisible,
  typingVisible,
  sectionVisible,
}: {
  attachmentVisible: boolean;
  userMsgVisible: boolean;
  typingVisible: boolean;
  sectionVisible: boolean[];
}) {
  return (
    <div
      style={{
        flex: 1,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        padding: "8px 0 0 0",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflow: "hidden",
        }}
      >
        <DiscoveryAttachment visible={attachmentVisible} />
        <UserMessage visible={userMsgVisible} />
        <DeltaResponse typingVisible={typingVisible} sectionVisible={sectionVisible} />
      </div>
    </div>
  );
}

function UserMessage({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.45, ease: SOFT_EASE }}
      style={{
        alignSelf: "flex-end",
        maxWidth: 640,
        padding: "12px 18px",
        borderRadius: 16,
        background: "#F4F5F8",
        fontSize: 14.5,
        color: TEXT_PRIMARY,
        letterSpacing: "-0.005em",
        lineHeight: 1.45,
      }}
    >
      {PROMPT_TEXT}
    </motion.div>
  );
}

/* Discovery file attachment chip — appears as a chat message before the user
 * query, synced to VO "Hand Delta thousands of pages of discovery." Visualizes
 * the lawyer handing off the discovery batch to Delta. */
function DiscoveryAttachment({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.45, ease: SOFT_EASE }}
      style={{
        alignSelf: "flex-end",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 14,
        background: "#F4F5F8",
        border: "1px solid #EEF0F3",
        maxWidth: 380,
      }}
    >
      <DocStackIcon />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: TEXT_PRIMARY, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          Garcia v. Northwest — Discovery
        </div>
        <div style={{ fontSize: 12, color: TEXT_SECONDARY }}>
          1,247 pages · 84 MB
        </div>
      </div>
    </motion.div>
  );
}

function DocStackIcon() {
  return (
    <svg width="28" height="30" viewBox="0 0 28 30" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      {/* Back paper (offset right + down) */}
      <rect x="9" y="3" width="16" height="20" rx="2" fill="#FFFFFF" stroke={TEXT_TERTIARY} strokeWidth="1.2" />
      {/* Middle paper */}
      <rect x="6" y="5" width="16" height="20" rx="2" fill="#FFFFFF" stroke={TEXT_TERTIARY} strokeWidth="1.2" />
      {/* Front paper with dog-eared corner */}
      <path
        d="M3 7 L13 7 L18 12 L18 27 L3 27 Z"
        fill="#FFFFFF"
        stroke={TEXT_SECONDARY}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M13 7 L13 12 L18 12" stroke={TEXT_SECONDARY} strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      {/* Lines on front paper */}
      <line x1="6" y1="17" x2="15" y2="17" stroke={TEXT_TERTIARY} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="6" y1="20.5" x2="15" y2="20.5" stroke={TEXT_TERTIARY} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="6" y1="24" x2="11" y2="24" stroke={TEXT_TERTIARY} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/* ───────── Delta response with progressive sections ───────── */

function DeltaResponse({
  typingVisible,
  sectionVisible,
}: {
  typingVisible: boolean;
  sectionVisible: boolean[];
}) {
  const anySectionVisible = sectionVisible.some(Boolean);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontSize: 13.5,
        lineHeight: 1.55,
        color: TEXT_PRIMARY,
        letterSpacing: "-0.003em",
      }}
    >
      {typingVisible && !anySectionVisible && <TypingIndicator />}

      {/* Section 1: Chronology PDF preview card (cover + fanned pages) */}
      <RevealSection visible={sectionVisible[0]}>
        <div style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.5 }}>
          Built medical chronology from 1,247 pages of discovery. 23-page PDF
          with 47 events identified across 18 months.
        </div>
        <ChronologyPDFPreview />
      </RevealSection>

      {/* Section 2: Gaps flagged */}
      <RevealSection visible={sectionVisible[1]}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Gaps flagged:</div>
        <BulletList
          items={[
            "No cardiac stress test ordered between Mar 21 and Apr 02 despite EKG findings.",
            "Dr. Patel's notes from Mar 14 ER visit not in record (request submitted).",
            "2 days unaccounted for between Apr 02 admission and Apr 04 surgery.",
          ]}
        />
      </RevealSection>

      {/* Section 3: Email drafted */}
      <RevealSection visible={sectionVisible[2]}>
        <div>
          <span style={{ fontWeight: 700 }}>Email drafted</span> to opposing counsel
          requesting Dr. Patel notes and Apr 02–04 records. Saved to your{" "}
          <span style={{ fontWeight: 600 }}>Outlook</span> drafts.
        </div>
      </RevealSection>

      {/* Section 4: Time logged */}
      <RevealSection visible={sectionVisible[3]}>
        <div>
          <span style={{ fontWeight: 700 }}>Time logged:</span> 2.4 hours to{" "}
          <span style={{ fontWeight: 600 }}>Garcia v. Northwest Hospital</span> matter in{" "}
          <span style={{ fontWeight: 600 }}>Clio</span>.
        </div>
      </RevealSection>
    </div>
  );
}

function RevealSection({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.55, ease: SOFT_EASE }}
    >
      {children}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 6, padding: "8px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: 999,
            background: TEXT_TERTIARY,
          }}
        />
      ))}
    </div>
  );
}

/* ───────── Chronology PDF preview ─────────
 * Product-style file card in the chat — modeled after how real chat AI products
 * (Claude.ai, ChatGPT, etc.) display generated artifacts. A small cover-page
 * thumbnail on the left + filename + metadata + open affordance on the right.
 *
 * The cursor clicks this card around 9.5s, triggering a zoom transition where
 * the ChronologyDetailedView grows out of the card position into viewport
 * center. */

const PDF_BLUE = "#2B4C7E";
const PDF_FILENAME = "Garcia v. Northwest Hospital — Medical Chronology.pdf";
const SAMPLE_CHRONOLOGY_ROWS: { date: string; provider: string; type: string; event: string; tag: "L" | "C" | "D" | "" }[] = [
  { date: "03/14/2024", provider: "Northwest ER",   type: "ED Visit",  event: "Pt presents to ED at 14:47 c/o substernal chest pain x 3 hrs, rated 7/10, radiating to L arm and jaw, w/ associated diaphoresis. Vitals: BP 158/98, HR 112, RR 22, SpO2 96% RA, T 98.4°F. Triaged ESI Level 2. No prior cardiac hx documented.", tag: "L" },
  { date: "03/14/2024", provider: "Dr. Patel",      type: "EKG",       event: "12-lead EKG performed at 15:22, interpreted by Dr. Patel: 'Sinus tachycardia at 108. Non-specific T-wave abnormalities in inferior leads (II, III, aVF). Cannot exclude ischemia.' Clinical note documents only 'EKG non-specific.'", tag: "L" },
  { date: "03/14/2024", provider: "Northwest Lab",  type: "Labs",      event: "Initial troponin I 0.04 ng/mL (ref <0.04). Serial troponins NOT ordered. CBC: WBC 9.2, Hgb 14.1, Plt 234. CMP within normal limits. BNP, D-dimer, lipid panel not drawn at this encounter.",                                tag: ""  },
  { date: "03/14/2024", provider: "Dr. Patel",      type: "Disposition", event: "Per Dr. Patel's H&P: 'Low risk for ACS given single neg troponin and non-specific EKG. Pt likely musculoskeletal vs anxiety. D/c home, f/u with PCP in 1 week.' No stress test, echo, CTA, or cardiology consult ordered.",   tag: "L" },
  { date: "03/14/2024", provider: "Northwest ER",   type: "Discharge", event: "Discharged at 19:14. Rx: Atenolol 50mg PO daily. D/c instructions: 'Return to ED for worsening pain or new symptoms.' No specialist referral documented. Pt and spouse signed instructions.",                                  tag: ""  },
  { date: "03/15/2024", provider: "Patient",        type: "Phone",     event: "Pt's spouse called Dr. Patel's office at 09:22 reporting 'continued chest tightness overnight, brief episode of L-arm numbness ~04:30.' MA documented message; returned by Dr. Patel same day per phone log.",                   tag: ""  },
  { date: "03/18/2024", provider: "Dr. Patel",      type: "Phone",     event: "Phone consult by Dr. Patel: pt reports intermittent chest pressure, exertional SOB climbing stairs at home. Provider response: 'Continue current beta blocker, return PRN.' No additional workup ordered, no in-person visit.",  tag: "L" },
  { date: "03/21/2024", provider: "Dr. Patel",      type: "Office",    event: "F/u office visit. Pt c/o continued chest discomfort and dyspnea on exertion (1 flight stairs). Vitals: BP 152/94, HR 88. Dr. Patel attributes symptoms to anxiety; no repeat EKG, no referral. Note: 'Reassurance provided.'",   tag: "L" },
  { date: "03/21/2024", provider: "Dr. Patel",      type: "Rx",        event: "Atenolol increased to 100mg PO daily. Lorazepam 0.5mg PRN added 'for situational anxiety.' Plan documents: 'No further cardiac workup indicated at this time.' No echocardiogram, stress test, or referral.",                  tag: "L" },
  { date: "03/28/2024", provider: "Patient",        type: "Note",      event: "Family report (per 04/02 ED intake history): pt c/o progressively worsening chest pain throughout preceding week, decreased appetite, orthopnea (sleeping in recliner x 4 nights), bilateral lower extremity swelling.",         tag: ""  },
  { date: "04/02/2024", provider: "Northwest ER",   type: "ED Visit",  event: "Pt arrives via EMS at 06:42 in acute distress. C/o crushing chest pain, diaphoresis, severe SOB. Vitals: BP 96/58, HR 138, RR 28, SpO2 89% RA. EKG: ST-elevation >3mm in leads II, III, aVF. Cath lab activated.",            tag: "C" },
  { date: "04/02/2024", provider: "Northwest Lab",  type: "Labs",      event: "Initial troponin I 8.2 ng/mL (ref <0.04). Peak troponin 14.6 ng/mL at 04hr. CK-MB 124 ng/mL. BNP 982 pg/mL. Lactate 3.8 mmol/L. Hgb 12.2 (down from 14.1 on 03/14). Diagnosis: acute STEMI, inferior wall.",                  tag: "C" },
  { date: "04/02/2024", provider: "Dr. Reyes",      type: "Cath",      event: "Left heart catheterization performed by Dr. Reyes (interventional cardiology) at 07:18. Findings: 95% occlusive lesion proximal LAD, 80% mid RCA, 75% proximal LCx. SYNTAX score 28. Three-vessel disease. CABG recommended.", tag: "C" },
  { date: "04/03/2024", provider: "Dr. Chen",       type: "Consult",   event: "CT surgery consult by Dr. Chen at 14:30. Note: 'Pt is candidate for urgent CABG x3 given proximal LAD lesion and 3VD. Risk-benefit reviewed with pt and spouse — including 1.8% perioperative mortality. Surgery 04/04.'",     tag: "C" },
  { date: "04/04/2024", provider: "Dr. Chen",       type: "Surgery",   event: "CABG x3 performed by Dr. Chen, 07:45–12:18. CPB time 138 min, X-clamp 78 min. Conduits: LIMA→LAD, SVG→PDA (RCA distribution), SVG→OM1. EBL 350cc. Pt extubated POD#1 without perioperative MI.",                                tag: "C" },
  { date: "04/04/2024", provider: "Northwest Path", type: "Pathology", event: "Surgical specimens (native LAD plaque endarterectomy): atherosclerotic plaque with >90% luminal narrowing, ulcerated cap morphology with overlying organizing thrombus consistent w/ recent rupture event.",                  tag: ""  },
  { date: "04/05/2024", provider: "Northwest ICU",  type: "Post-Op",   event: "POD#1. Hemodynamics stable, off all pressors. Extubated at 04:15 without complication. Chest tubes draining serous fluid, output 145cc/8hr. Pain controlled with PCA morphine. CXR clear, no pneumothorax.",                  tag: ""  },
  { date: "04/08/2024", provider: "Northwest CTU",  type: "Discharge", event: "Discharged POD#4 to home w/ visiting nurse + cardiac rehab referral. Discharge meds: ASA 81mg, clopidogrel 75mg, atorvastatin 80mg, metoprolol 25mg BID, lisinopril 5mg, furosemide 20mg PRN.",                                tag: ""  },
  { date: "04/15/2024", provider: "Dr. Chen",       type: "Office",    event: "1-wk post-op visit. Sternotomy clean and intact, no dehiscence. Pt c/o fatigue, mild dyspnea on exertion. Echo not performed at this visit. NYHA Class II. Continued current discharge regimen.",                              tag: ""  },
  { date: "04/22/2024", provider: "Dr. Chen",       type: "Office",    event: "2-wk post-op f/u. Pt unable to walk >1 city block w/o stopping due to dyspnea. Subjective fatigue 'much worse than pre-surgery.' Functional status declined to NYHA Class III. Recommended cardiology referral.",              tag: "D" },
  { date: "05/06/2024", provider: "Cardiac Rehab",  type: "Therapy",   event: "Initiated phase II cardiac rehab, 3x/week. Initial METs assessment: 4.2 (vs expected post-CABG 6–8). Pt requires multiple rest periods within 30-min sessions. Rehab nurse documents 'recovery slower than typical.'",         tag: "D" },
  { date: "06/12/2024", provider: "Dr. Chen",       type: "Office",    event: "8-wk f/u. Persistent exertional dyspnea. CXR: stable cardiomegaly. Pt unable to return to baseline activity (gardening, golf). Referred to cardiology (Dr. Williams) for evaluation of post-CABG functional decline.",          tag: "D" },
  { date: "09/04/2024", provider: "Dr. Williams",   type: "Consult",   event: "Cardiology new patient consult by Dr. Williams. C/c: 'persistent SOB and fatigue 5 mo post CABG.' Exam: bibasilar crackles, JVP 8cm, trace pedal edema. TTE ordered for assessment of LV function.",                            tag: "D" },
  { date: "09/12/2024", provider: "Dr. Williams",   type: "Imaging",   event: "TTE (technical adequacy: good): EF 35% (down from documented 55% on 03/14/2024 pre-event chart record). Moderate global hypokinesis. Mild-to-moderate MR (vena contracta 0.4cm). Findings consistent w/ ischemic cardiomyopathy.", tag: "D" },
  { date: "10/02/2024", provider: "Dr. Williams",   type: "Office",    event: "F/u with TTE results. Dr. Williams documents: 'Patient has developed ischemic cardiomyopathy as a likely consequence of delayed diagnosis and treatment of underlying coronary disease in March 2024.' Added carvedilol, spironolactone.", tag: "D" },
];

function ChronologyPDFPreview() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        gap: 14,
        width: 460,
        padding: 12,
        borderRadius: 12,
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        fontFamily: FONT,
      }}
    >
      {/* Cover-page thumbnail (left) */}
      <CoverThumbnail />

      {/* Filename + metadata (right) */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          paddingTop: 2,
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: TEXT_PRIMARY,
            lineHeight: 1.35,
            letterSpacing: "-0.005em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {PDF_FILENAME}
        </div>
        <div
          style={{
            fontSize: 12,
            color: TEXT_SECONDARY,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <PdfFileTypeBadge />
          <span>23 pages · 2.4 MB · just now</span>
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 500,
            color: PDF_BLUE,
          }}
        >
          Open
          <ArrowOpenIcon />
        </div>
      </div>
    </div>
  );
}

/* Small cover-page thumbnail rendered as a stylized mini-page so the viewer
 * recognizes "this is the chronology PDF" at a glance. ~80×100 box. */
function CoverThumbnail() {
  return (
    <div
      style={{
        width: 80,
        height: 100,
        borderRadius: 4,
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        padding: "8px 6px 6px 6px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 5.5,
          fontWeight: 700,
          color: PDF_BLUE,
          textAlign: "center",
          letterSpacing: 0.3,
          marginTop: 4,
        }}
      >
        MEDICAL
      </div>
      <div
        style={{
          fontSize: 5.5,
          fontWeight: 700,
          color: PDF_BLUE,
          textAlign: "center",
          letterSpacing: 0.3,
          marginBottom: 4,
        }}
      >
        CHRONOLOGY
      </div>
      <div
        style={{
          fontSize: 4,
          fontWeight: 600,
          color: PDF_BLUE,
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        Garcia v. Northwest
      </div>
      {/* Faint content lines suggesting page body */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <div style={{ height: 2, background: "#E5E7EB", borderRadius: 0.5 }} />
        <div style={{ height: 2, background: "#E5E7EB", borderRadius: 0.5, width: "80%" }} />
        <div style={{ height: 2, background: "#E5E7EB", borderRadius: 0.5 }} />
        <div style={{ height: 2, background: "#E5E7EB", borderRadius: 0.5, width: "60%" }} />
      </div>
      <div style={{ flex: 1 }} />
      <div
        style={{
          fontSize: 3.5,
          color: "#BBB",
          textAlign: "center",
          borderTop: "0.5px solid #EEE",
          paddingTop: 2,
        }}
      >
        Page 1 of 23
      </div>
    </div>
  );
}

function PdfFileTypeBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 16,
        padding: "0 5px",
        borderRadius: 3,
        background: PDF_BLUE,
        color: "#FFFFFF",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: 0.4,
      }}
    >
      PDF
    </span>
  );
}

function ArrowOpenIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M4 8 L8 4 M5 4 L8 4 L8 7"
        stroke={PDF_BLUE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ───────── Detailed PDF view (post-zoom) ─────────
 *
 * After the cursor click + zoom transition, the chat dims and blurs and this
 * detailed view fills viewport-center: a full-size cover page on the left,
 * a landscape Fact Chronology table page on the right with realistic entries.
 * The viewer reads BOTH the branding/cover (proof of identity) AND content
 * depth (proof of substance) at scale.
 *
 * Sized to fit comfortably within 1920×1080 with breathing room. */

function ChronologyDetailedView({ opacity, zoomK }: { opacity: number; zoomK: number }) {
  /* Smooth growth from the card position (PDF_TARGET_X, PDF_TARGET_Y) into
   * viewport center (960, 540) as zoomK animates 0 → 1. The view starts at
   * scale 0.18 anchored on the card, then translates and scales up to fill
   * its natural size at viewport center. Eliminates the abrupt "popup" feel. */
  const centerX = 960;
  const centerY = 540;
  const x = PDF_TARGET_X + (centerX - PDF_TARGET_X) * zoomK;
  const y = PDF_TARGET_Y + (centerY - PDF_TARGET_Y) * zoomK;
  const scale = 0.18 + 0.82 * zoomK;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
        opacity,
        zIndex: 50,
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "stretch",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <DetailedCoverPage />
        <DetailedTablePage />
      </div>
    </div>
  );
}

function DetailedCoverPage() {
  return (
    <div
      style={{
        width: 540,
        height: 700,
        background: "#FFFFFF",
        border: "1px solid #D1D5DB",
        borderRadius: 6,
        boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.10)",
        padding: "44px 44px 28px 44px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: PDF_BLUE,
          textAlign: "center",
          marginTop: 36,
          letterSpacing: 1.0,
        }}
      >
        MEDICAL CHRONOLOGY
      </div>
      <div
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: PDF_BLUE,
          textAlign: "center",
          marginTop: 14,
        }}
      >
        Garcia v. Northwest Hospital
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#888",
          fontStyle: "italic",
          textAlign: "center",
          marginTop: 6,
          marginBottom: 30,
        }}
      >
        Generated by CaseDelta · May 2, 2026 · Confidential Work Product
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.8, color: "#222" }}>
        <div>
          <span style={{ fontWeight: 700, display: "inline-block", width: 130 }}>Patient:</span>
          Maria Garcia
        </div>
        <div>
          <span style={{ fontWeight: 700, display: "inline-block", width: 130 }}>Date of Birth:</span>
          06/14/1958
        </div>
        <div>
          <span style={{ fontWeight: 700, display: "inline-block", width: 130 }}>Date of Injury:</span>
          03/14/2024
        </div>
        <div>
          <span style={{ fontWeight: 700, display: "inline-block", width: 130 }}>Matter:</span>
          Garcia v. Northwest Hospital, Cir. Ct. 24-CV-1182
        </div>
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: PDF_BLUE,
          borderBottom: `2px solid ${PDF_BLUE}`,
          paddingBottom: 4,
          marginTop: 26,
          marginBottom: 12,
        }}
      >
        Case Overview
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.65, color: "#333" }}>
        Pt. presented to Northwest Hospital ER on 03/14/2024 with chest pain
        and tachycardia. EKG performed by Dr. Patel showed non-specific
        findings; results documented as 'non-specific' without further
        cardiac workup. No cardiac referral or stress test ordered.
        Pt. returned to Northwest ER on 04/02/2024 in acute cardiac distress
        with ST-elevation on EKG. CABG x3 performed by Dr. Chen on 04/04/2024.
        Recovery without complications. 2-day gap in records 04/02–04/04
        and missing notes from 03/14 ER visit (Dr. Patel) flagged.
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          fontSize: 10,
          color: "#999",
          textAlign: "center",
          borderTop: "1px solid #EEE",
          paddingTop: 8,
        }}
      >
        Page 1 of 23 · Confidential Work Product
      </div>
    </div>
  );
}

function DetailedTablePage() {
  /* Landscape orientation: wider than tall. Sized to display dense, realistic
   * chronology entries with thorough clinical descriptions matching the format
   * of a real medical records production. */
  return (
    <div
      style={{
        width: 880,
        height: 720,
        background: "#FFFFFF",
        border: "1px solid #D1D5DB",
        borderRadius: 6,
        boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.10)",
        padding: "24px 28px 20px 28px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: PDF_BLUE,
          borderBottom: `2px solid ${PDF_BLUE}`,
          paddingBottom: 4,
          marginBottom: 10,
        }}
      >
        Fact Chronology (47 Entries) — Page 4 of 12
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 7.5,
          lineHeight: 1.32,
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            <th style={{ ...thStyle, width: "8%" }}>Date</th>
            <th style={{ ...thStyle, width: "10%" }}>Provider</th>
            <th style={{ ...thStyle, width: "8%" }}>Type</th>
            <th style={{ ...thStyle, width: "63%", textAlign: "left" }}>Medical Events</th>
            <th style={{ ...thStyle, width: "4%" }}>Tag</th>
            <th style={{ ...thStyle, width: "7%" }}>Page Ref</th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_CHRONOLOGY_ROWS.map((row, i) => (
            <tr key={i} style={{ background: i % 2 ? "#FFFFFF" : "#F2F2F2" }}>
              <td style={tdStyle}>{row.date}</td>
              <td style={tdStyle}>{row.provider}</td>
              <td style={tdStyle}>{row.type}</td>
              <td style={{ ...tdStyle, textAlign: "left", whiteSpace: "normal" }}>{row.event}</td>
              <td style={{ ...tdStyle, textAlign: "center" }}>
                <span style={tagStyleFor(row.tag)}>{row.tag || "—"}</span>
              </td>
              <td style={tdStyle}>{`p.${(i + 4) * 47 + 12}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: "#999",
          borderTop: "1px solid #EEE",
          paddingTop: 6,
          marginTop: 10,
        }}
      >
        <span>
          <span style={{ color: "#c0392b", fontWeight: 700 }}>L</span> Liability ·{" "}
          <span style={{ color: "#e67e22", fontWeight: 700 }}>C</span> Causation ·{" "}
          <span style={{ color: "#2980b9", fontWeight: 700 }}>D</span> Damages
        </span>
        <span>Page 4 of 23 · Confidential Work Product</span>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  background: PDF_BLUE,
  color: "#FFFFFF",
  fontWeight: 700,
  textAlign: "center",
  padding: "4px 4px",
  border: `0.5px solid ${PDF_BLUE}`,
  fontSize: 8,
  letterSpacing: 0.3,
};

const tdStyle: React.CSSProperties = {
  padding: "3px 5px",
  border: "0.5px solid #ccc",
  verticalAlign: "top",
  textAlign: "center",
  color: "#222",
  wordBreak: "normal",
};

function tagStyleFor(tag: string): React.CSSProperties {
  if (tag === "L") return { color: "#c0392b", fontWeight: 700 };
  if (tag === "C") return { color: "#e67e22", fontWeight: 700 };
  if (tag === "D") return { color: "#2980b9", fontWeight: 700 };
  return { color: "#999" };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((item, i) => (
        <li key={i} style={{ paddingLeft: 4 }}>{item}</li>
      ))}
    </ul>
  );
}

/* ───────── Message input (bottom) ───────── */

function MessageInput() {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "12px 24px 22px 24px",
        borderTop: "1px solid #EEF0F3",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          background: "#FFFFFF",
          padding: "8px 12px 10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <FormatToolbar />
        <div
          style={{
            fontSize: 13.5,
            color: TEXT_TERTIARY,
            padding: "8px 4px 4px 4px",
            minHeight: 36,
          }}
        >
          Message Delta…
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 4,
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            <ToolbarIconButton><PaperclipIcon /></ToolbarIconButton>
            <ToolbarIconButton><MicIcon /></ToolbarIconButton>
          </div>
          <SendArrowButton />
        </div>
      </div>
    </div>
  );
}

function FormatToolbar() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      <ToolbarIconButton><span style={{ fontWeight: 700, fontSize: 13 }}>B</span></ToolbarIconButton>
      <ToolbarIconButton><span style={{ fontStyle: "italic", fontSize: 13 }}>I</span></ToolbarIconButton>
      <ToolbarIconButton><span style={{ textDecoration: "line-through", fontSize: 13 }}>S</span></ToolbarIconButton>
      <ToolbarIconButton><LinkIcon /></ToolbarIconButton>
      <ToolbarIconButton><OrderedListIcon /></ToolbarIconButton>
      <ToolbarIconButton><BulletListIcon /></ToolbarIconButton>
    </div>
  );
}

function ToolbarIconButton({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: TEXT_SECONDARY,
      }}
    >
      {children}
    </div>
  );
}

function PaperclipIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M11.5 7.5 L7 12 C5.5 13.5 3.5 13.5 2.5 12.5 C1.5 11.5 1.5 9.5 3 8 L9 2 C10 1 11.5 1 12.5 2 C13.5 3 13.5 4.5 12.5 5.5 L7 11 C6.5 11.5 5.7 11.5 5.2 11 C4.7 10.5 4.7 9.7 5.2 9.2 L9.5 5"
        stroke={TEXT_SECONDARY}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="6" y="2" width="4" height="8" rx="2" stroke={TEXT_SECONDARY} strokeWidth="1.3" fill="none" />
      <path d="M3.5 7.5 V8 C3.5 10.5 5.5 12.5 8 12.5 C10.5 12.5 12.5 10.5 12.5 8 V7.5" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <line x1="8" y1="12.5" x2="8" y2="14.5" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6.5 9.5 L9.5 6.5 M9 4 L11 2 C12 1 13.5 1 14.5 2 C15.5 3 15.5 4.5 14.5 5.5 L12.5 7.5 M3.5 8.5 L1.5 10.5 C0.5 11.5 0.5 13 1.5 14 C2.5 15 4 15 5 14 L7 12" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function OrderedListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <text x="1" y="6" fontSize="4.5" fontWeight="700" fill={TEXT_SECONDARY} fontFamily="system-ui, sans-serif">1</text>
      <text x="1" y="11.5" fontSize="4.5" fontWeight="700" fill={TEXT_SECONDARY} fontFamily="system-ui, sans-serif">2</text>
      <line x1="6" y1="4.5" x2="14" y2="4.5" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6" y1="10" x2="14" y2="10" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6" y1="13.5" x2="14" y2="13.5" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BulletListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="2.5" cy="4" r="1.1" fill={TEXT_SECONDARY} />
      <circle cx="2.5" cy="8" r="1.1" fill={TEXT_SECONDARY} />
      <circle cx="2.5" cy="12" r="1.1" fill={TEXT_SECONDARY} />
      <line x1="6" y1="4" x2="14" y2="4" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6" y1="8" x2="14" y2="8" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6" y1="12" x2="14" y2="12" stroke={TEXT_SECONDARY} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function SendArrowButton() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "#F4F5F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 13 L8 3 M4 7 L8 3 L12 7" stroke={TEXT_SECONDARY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
