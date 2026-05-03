"use client";

import { motion, Transition } from "framer-motion";
import { CSSProperties } from "react";
import {
  FONT,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  BLUE,
  BLUE_TINT,
  BORDER,
  BORDER_BLUE_FAINT,
  SOFT_EASE,
} from "./tokens";

/* ─── AppFrame — the cinematic CaseDelta app chrome.
 *
 * Two chrome variants:
 *   • "minimal" (default): 64px icon-only sidebar + empty 44px topbar.
 *     Used by Solution scene where viewer focus belongs on the content.
 *   • "full": 268px sidebar with workspace switcher + section labels +
 *     labeled nav items, 54px topbar with centered search + 3 action icons.
 *     Mirrors the actual CaseDelta UI; used by Demo scene.
 *
 * Renders as a floating device (rounded surface, blue-tinted shadow) sitting
 * on top of the scene's background. Sidebar + topbar are always visible;
 * children fill the content area.
 */

export type NavKey = "delta" | "workspaces" | "integrations" | "account";
export type ChromeVariant = "minimal" | "full";

const SIDEBAR_WIDTH_MINIMAL = 64;
const SIDEBAR_WIDTH_FULL    = 268;
const TOPBAR_HEIGHT_MINIMAL = 44;
const TOPBAR_HEIGHT_FULL    = 54;

export function AppFrame({
  chrome = "minimal",
  selected = "delta",
  firmName = "Schmidt & Associates",
  firmInitial = "S",
  pageTitle,
  children,
  width = 1340,
  height = 760,
  style,
}: {
  chrome?: ChromeVariant;
  selected?: NavKey;
  firmName?: string;
  firmInitial?: string;
  pageTitle?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width,
        height,
        borderRadius: 22,
        background: "#FFFFFF",
        border: `1px solid ${BORDER}`,
        boxShadow:
          "0 60px 140px rgba(37,99,235,0.18), 0 24px 60px rgba(15,23,41,0.12), 0 0 0 1px rgba(37,99,235,0.05)",
        overflow: "hidden",
        display: "flex",
        fontFamily: FONT,
        ...style,
      }}
    >
      {chrome === "full" ? (
        <SidebarFull selected={selected} firmName={firmName} firmInitial={firmInitial} />
      ) : (
        <Sidebar selected={selected} firmInitial={firmInitial} />
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {chrome === "full" ? <TopBarFull /> : <TopBar />}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {pageTitle && <PageHeader title={pageTitle} />}
          {children}
        </div>
      </div>
    </div>
  );
}

export function appFrameSidebarWidth(chrome: ChromeVariant = "minimal"): number {
  return chrome === "full" ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_MINIMAL;
}

export function appFrameTopBarHeight(chrome: ChromeVariant = "minimal"): number {
  return chrome === "full" ? TOPBAR_HEIGHT_FULL : TOPBAR_HEIGHT_MINIMAL;
}

/* ───────── Sidebar (minimal) ─────────
 *
 * Icon-only narrow rail — used when chrome="minimal". Keeps the "this is
 * an app" silhouette without dragging eyes off the main content area. */

function Sidebar({
  selected,
  firmInitial,
}: {
  selected: NavKey;
  firmInitial: string;
}) {
  return (
    <div
      style={{
        width: SIDEBAR_WIDTH_MINIMAL,
        flexShrink: 0,
        background: "linear-gradient(180deg, #FCFCFD 0%, #F7F8FB 100%)",
        borderRight: `1px solid ${BORDER}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 0",
        gap: 4,
      }}
    >
      <FirmBadge firmInitial={firmInitial} />
      <div style={{ height: 12 }} />
      <IconNavButton icon={<ChatIcon />}   selected={selected === "delta"} />
      <IconNavButton icon={<FolderIcon />} selected={selected === "workspaces"} />
      <IconNavButton icon={<GridIcon />}   selected={selected === "integrations"} />
      <IconNavButton icon={<GearIcon />}   selected={selected === "account"} />
    </div>
  );
}

/* ───────── Sidebar (full) ─────────
 *
 * Mirrors the actual CaseDelta UI: workspace switcher at top with the firm
 * name + chevron, then 3 sections (ASSOCIATE / WORKSPACES / SETTINGS) each
 * with labeled nav items. Used when chrome="full". */

function SidebarFull({
  selected,
  firmName,
  firmInitial,
}: {
  selected: NavKey;
  firmName: string;
  firmInitial: string;
}) {
  return (
    <div
      style={{
        width: SIDEBAR_WIDTH_FULL,
        flexShrink: 0,
        background: "linear-gradient(180deg, #FCFCFD 0%, #F7F8FB 100%)",
        borderRight: `1px solid ${BORDER}`,
        display: "flex",
        flexDirection: "column",
        padding: "20px 14px",
      }}
    >
      <WorkspaceSwitcher firmName={firmName} firmInitial={firmInitial} />

      <NavSection label="ASSOCIATE">
        <NavItem icon={<ChatIcon />} label="Delta" selected={selected === "delta"} />
      </NavSection>

      <NavSection label="WORKSPACES">
        <NavItem icon={<FolderIcon />} label="All workspaces" selected={selected === "workspaces"} />
      </NavSection>

      <NavSection label="SETTINGS">
        <NavItem icon={<GridIcon />} label="Integrations" selected={selected === "integrations"} />
        <NavItem icon={<GearIcon />} label="Account" selected={selected === "account"} />
      </NavSection>
    </div>
  );
}

function WorkspaceSwitcher({ firmName, firmInitial }: { firmName: string; firmInitial: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 10px",
        marginBottom: 22,
        borderRadius: 10,
        background: "rgba(255,255,255,0.9)",
        border: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 999,
          background: "linear-gradient(135deg, #1F2937 0%, #0F1729 100%)",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "-0.005em",
        }}
      >
        {firmInitial}
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          fontSize: 13,
          fontWeight: 600,
          color: TEXT_PRIMARY,
          letterSpacing: "-0.005em",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {firmName}
      </div>
      <ChevronUpDownIcon />
    </div>
  );
}

function NavSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: TEXT_TERTIARY,
          letterSpacing: "0.12em",
          padding: "0 10px",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{children}</div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  selected,
}: {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        borderRadius: 8,
        fontSize: 13.5,
        fontWeight: selected ? 600 : 500,
        color: selected ? TEXT_PRIMARY : TEXT_SECONDARY,
        background: selected ? BLUE_TINT : "transparent",
        border: selected ? `1px solid ${BORDER_BLUE_FAINT}` : "1px solid transparent",
        letterSpacing: "-0.005em",
      }}
    >
      <span style={{ display: "inline-flex", color: selected ? BLUE : TEXT_SECONDARY }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
    </div>
  );
}

function ChevronUpDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M4 5.5 L7 2.5 L10 5.5" stroke={TEXT_TERTIARY} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8.5 L7 11.5 L10 8.5" stroke={TEXT_TERTIARY} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FirmBadge({ firmInitial }: { firmInitial: string }) {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 8,
        background: "linear-gradient(135deg, #1F2937 0%, #0F1729 100%)",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "-0.005em",
      }}
    >
      {firmInitial}
    </div>
  );
}

function IconNavButton({
  icon,
  selected,
}: {
  icon: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: selected ? BLUE_TINT : "transparent",
        border: selected ? `1px solid ${BORDER_BLUE_FAINT}` : "1px solid transparent",
        color: selected ? BLUE : TEXT_SECONDARY,
      }}
    >
      {icon}
    </div>
  );
}

/* ───────── Top bar (minimal) ─────────
 * Empty chrome strip — used when chrome="minimal". The search field +
 * action icons in real product UI read as visual noise at scene tempo. */

function TopBar() {
  return (
    <div
      style={{
        height: TOPBAR_HEIGHT_MINIMAL,
        flexShrink: 0,
        borderBottom: `1px solid ${BORDER}`,
        background: "#FFFFFF",
      }}
    />
  );
}

/* ───────── Top bar (full) ─────────
 * Search field centered + 3 action icons on the right, mirroring the
 * actual CaseDelta UI. Used when chrome="full". */

function TopBarFull() {
  return (
    <div
      style={{
        height: TOPBAR_HEIGHT_FULL,
        flexShrink: 0,
        borderBottom: `1px solid ${BORDER}`,
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        padding: "0 22px",
        gap: 16,
      }}
    >
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <SearchField />
      </div>
      <TopBarActions />
    </div>
  );
}

function SearchField() {
  return (
    <div
      style={{
        width: 480,
        height: 34,
        borderRadius: 8,
        background: "#F5F6F8",
        border: `1px solid ${BORDER}`,
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        gap: 8,
      }}
    >
      <SearchIcon />
      <span style={{ flex: 1, fontSize: 13, color: TEXT_TERTIARY }}>Search</span>
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: TEXT_TERTIARY,
          letterSpacing: "0.04em",
          padding: "2px 6px",
          borderRadius: 4,
          border: `1px solid ${BORDER}`,
          background: "#FFFFFF",
        }}
      >
        ⌘K
      </span>
    </div>
  );
}

function TopBarActions() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <TopBarIconButton icon={<HelpIcon />} />
      <TopBarIconButton icon={<SunIcon />} />
      <TopBarIconButton icon={<GearIcon />} />
    </div>
  );
}

function TopBarIconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: TEXT_SECONDARY,
      }}
    >
      {icon}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="4.2" stroke={TEXT_TERTIARY} strokeWidth="1.5" fill="none" />
      <path d="M9.2 9.2 L12 12" stroke={TEXT_TERTIARY} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.6" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M7.2 7.2 C7.2 6.2 8 5.5 9 5.5 C10 5.5 10.8 6.2 10.8 7.1 C10.8 8 10 8.4 9 9.1 V10.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="9" cy="12.6" r="0.8" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path
        d="M9 1.5 V3.5 M9 14.5 V16.5 M16.5 9 H14.5 M3.5 9 H1.5 M14.3 3.7 L12.9 5.1 M5.1 12.9 L3.7 14.3 M14.3 14.3 L12.9 12.9 M5.1 5.1 L3.7 3.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ───────── Page header ───────── */

function PageHeader({ title }: { title: string }) {
  return (
    <div style={{ padding: "26px 32px 18px 32px", borderBottom: `1px solid ${BORDER}` }}>
      <h2
        style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 600,
          color: TEXT_PRIMARY,
          letterSpacing: "-0.018em",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ───────── Cursor — animated, used by Solution & Demo for click cues ───────── */

export function Cursor({
  x,
  y,
  visible = true,
  pulsing = false,
  transition,
}: {
  x: number;
  y: number;
  visible?: boolean;
  pulsing?: boolean;
  transition?: Transition;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        x,
        y,
        opacity: visible ? 1 : 0,
      }}
      transition={transition ?? { duration: 0.5, ease: SOFT_EASE }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 60,
        filter: "drop-shadow(0 4px 10px rgba(15,23,41,0.30))",
      }}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden>
        <path
          d="M2 2 L2 21 L7 16 L10 23 L13 22 L10 15 L17 15 Z"
          fill="#0F1729"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      {pulsing && (
        <motion.div
          animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            width: 14,
            height: 14,
            borderRadius: 999,
            background: BLUE,
            mixBlendMode: "multiply",
          }}
        />
      )}
    </motion.div>
  );
}

/* ───────── Icons ───────── */
/* All sized 18×18 unless inlined; outlined, 1.5px stroke. */

function ChatIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 4.5 C3 3.67 3.67 3 4.5 3 H13.5 C14.33 3 15 3.67 15 4.5 V11 C15 11.83 14.33 12.5 13.5 12.5 H7 L4 15 V12.5 H4.5 C3.67 12.5 3 11.83 3 11 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M2.5 5 C2.5 4.45 2.95 4 3.5 4 H7 L8.5 5.5 H14.5 C15.05 5.5 15.5 5.95 15.5 6.5 V13 C15.5 13.55 15.05 14 14.5 14 H3.5 C2.95 14 2.5 13.55 2.5 13 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <rect x="9.5" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <rect x="3" y="9.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path
        d="M9 1.8 V3.6 M9 14.4 V16.2 M16.2 9 H14.4 M3.6 9 H1.8 M14.1 3.9 L12.85 5.15 M5.15 12.85 L3.9 14.1 M14.1 14.1 L12.85 12.85 M5.15 5.15 L3.9 3.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ───────── exports for sizing knowledge in scenes ─────────
 * Legacy aliases — point at the minimal-variant dimensions for back compat.
 * Prefer the appFrameSidebarWidth / appFrameTopBarHeight helpers above. */
export const APP_FRAME_SIDEBAR_WIDTH = SIDEBAR_WIDTH_MINIMAL;
export const APP_FRAME_TOPBAR_HEIGHT = TOPBAR_HEIGHT_MINIMAL;
