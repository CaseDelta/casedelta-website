"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { AppFrame } from "@/components/video/primitives/AppFrame";
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

export const DEMO_DURATION_MS = 12000;
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
 *   2.5s  – Response Section 1: "Medical Chronology" heading + table rows
 *   4.5s  – Section 2: "Gaps flagged" bullet list
 *   6.5s  – Section 3: "Email drafted" note
 *   8.0s  – Section 4: "Time logged" note
 *   9.0–11.6s – full response visible; viewer reads while VO closes
 *  11.6s  – fade out
 */
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
          opacity: appVisible ? 1 : 0,
          scale: appVisible ? 1 : 0.94,
          y: appVisible ? 0 : 18,
          filter: appVisible ? "blur(0px)" : "blur(10px)",
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

      {/* Section 1: Chronology heading + table */}
      <RevealSection visible={sectionVisible[0]}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
          Medical Chronology — Garcia v. Northwest Hospital
        </div>
        <div style={{ color: TEXT_SECONDARY, marginBottom: 12, fontSize: 13 }}>
          Built from 1,247 pages of discovery. 47 events identified across 18 months.
        </div>
        <ChronologyTable />
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

/* ───────── Chronology table ─────────
 * Compact table with date / case ID-style code / event / provider columns.
 * Uses muted gray borders; no header row to keep the look clean. */

const CHRONOLOGY_ROWS = [
  { date: "Mar 14, 2024", event: "Initial ER visit, complaint of chest pain",   provider: "Northwest ER" },
  { date: "Mar 14, 2024", event: "EKG performed, results 'non-specific'",       provider: "Dr. Patel" },
  { date: "Mar 21, 2024", event: "Follow-up, no cardiac referral made",         provider: "Dr. Patel" },
  { date: "Apr 02, 2024", event: "Cardiac event, ER admission",                 provider: "Northwest ER" },
  { date: "Apr 04, 2024", event: "Cardiac infarction diagnosed, surgery",       provider: "Dr. Chen" },
];

function ChronologyTable() {
  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {CHRONOLOGY_ROWS.map((row, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 140px",
            gap: 16,
            padding: "10px 16px",
            borderTop: i === 0 ? "none" : "1px solid #EEF0F3",
            fontSize: 13,
            color: TEXT_PRIMARY,
            alignItems: "center",
          }}
        >
          <div style={{ color: TEXT_SECONDARY, fontWeight: 500 }}>{row.date}</div>
          <div>{row.event}</div>
          <div style={{ color: TEXT_SECONDARY, fontSize: 12.5 }}>{row.provider}</div>
        </div>
      ))}
    </div>
  );
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
