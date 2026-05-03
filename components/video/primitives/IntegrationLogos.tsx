"use client";

/* Brand marks for the integrations shown on the Solution scene.
 *
 * All logos render at 40×40 by default. They are stylized renditions —
 * recognizable from across the room but designed to sit cleanly on a cream
 * + blue canvas, not pixel-perfect copies of the real brand assets.
 */

export type IntegrationKey =
  | "clio"
  | "outlook"
  | "google"
  | "quickbooks"
  | "word"
  | "dropbox"
  | "docusign"
  | "adobe"
  | "onedrive"
  | "excel"
  | "slack"
  | "campLegal"
  | "microsoft"
  | "gohighlevel"
  | "mycase";

export const INTEGRATION_NAMES: Record<IntegrationKey, string> = {
  clio: "Clio",
  outlook: "Outlook",
  google: "Google",
  quickbooks: "QuickBooks",
  word: "Microsoft Word",
  dropbox: "Dropbox",
  docusign: "DocuSign",
  adobe: "Adobe Acrobat",
  onedrive: "OneDrive",
  excel: "Microsoft Excel",
  slack: "Slack",
  campLegal: "Camp Legal",
  microsoft: "Microsoft 365",
  gohighlevel: "GoHighLevel",
  mycase: "MyCase",
};

export const INTEGRATION_DESCRIPTIONS: Record<IntegrationKey, string> = {
  clio: "Practice management — cases, contacts, time entries.",
  outlook: "Email, calendar, and contacts.",
  google: "Gmail, Drive, and Calendar.",
  quickbooks: "Accounting, invoices, and expense tracking.",
  word: "Document drafting and editing.",
  dropbox: "Cloud file storage and sharing.",
  docusign: "Electronic signatures and agreements.",
  adobe: "PDF editing, comments, and form filling.",
  onedrive: "Microsoft cloud file storage.",
  excel: "Spreadsheets and case-cost calculations.",
  slack: "Team messaging and channel notifications.",
  campLegal: "Practice management for plaintiff firms.",
  microsoft: "Microsoft 365 — Outlook, OneDrive, Office.",
  gohighlevel: "Contacts, opportunities, and pipeline data.",
  mycase: "Practice management — cases, contacts, events.",
};

export function IntegrationLogo({
  brand,
  size = 40,
}: {
  brand: IntegrationKey;
  size?: number;
}) {
  switch (brand) {
    case "clio":        return <ClioLogo size={size} />;
    case "outlook":     return <OutlookLogo size={size} />;
    case "google":      return <GoogleDriveLogo size={size} />;
    case "quickbooks":  return <QuickBooksLogo size={size} />;
    case "word":        return <WordLogo size={size} />;
    case "dropbox":     return <DropboxLogo size={size} />;
    case "docusign":    return <DocuSignLogo size={size} />;
    case "adobe":       return <AdobeLogo size={size} />;
    case "onedrive":    return <OneDriveLogo size={size} />;
    case "excel":       return <ExcelLogo size={size} />;
    case "slack":       return <SlackLogo size={size} />;
    case "campLegal":   return <CampLegalLogo size={size} />;
    case "microsoft":   return <MicrosoftLogo size={size} />;
    case "gohighlevel": return <GoHighLevelLogo size={size} />;
    case "mycase":      return <MyCaseLogo size={size} />;
  }
}

/* ─── Google Drive triangle ─── */
function GoogleDriveLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <g transform="translate(4 6)">
        {/* Right blue triangle */}
        <path d="M22 0 L32 17.3 L22 17.3 L12 0 Z" fill="#1A73E8" />
        {/* Bottom green trapezoid */}
        <path d="M5 26 L11 15.6 L26 15.6 L20 26 Z" fill="#0F9D58" />
        {/* Left yellow triangle */}
        <path d="M11 15.6 L0 15.6 L8 1.6 L19 1.6 Z" fill="#FBBC04" />
      </g>
    </svg>
  );
}

/* ─── Camp Legal — black ∆ delta mark ─── */
function CampLegalLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#0F1729" />
      <path d="M20 9 L30 28 L10 28 Z" fill="#FFFFFF" />
      <path d="M20 14 L26.5 26 L13.5 26 Z" fill="#0F1729" />
    </svg>
  );
}

/* ─── Microsoft 365 — 4-square ─── */
function MicrosoftLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="5"  y="5"  width="14.5" height="14.5" fill="#F25022" />
      <rect x="20.5" y="5"  width="14.5" height="14.5" fill="#7FBA00" />
      <rect x="5"  y="20.5" width="14.5" height="14.5" fill="#00A4EF" />
      <rect x="20.5" y="20.5" width="14.5" height="14.5" fill="#FFB900" />
    </svg>
  );
}

/* ─── Dropbox — twin-rhombus ─── */
function DropboxLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M10 7 L20 14 L10 21 L0 14 Z" fill="#0061FF" transform="translate(5 6)" />
      <path d="M30 7 L40 14 L30 21 L20 14 Z" fill="#0061FF" transform="translate(-5 6)" />
      <path d="M10 21 L20 28 L30 21 L20 14 Z" fill="#1B72FE" transform="translate(0 6)" />
    </svg>
  );
}

/* ─── Clio — circular check ─── */
function ClioLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="16" fill="#1B5E9F" />
      <path
        d="M14 20.5 L18 24.5 L26.5 16"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── GoHighLevel — gradient up arrows ─── */
function GoHighLevelLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ghl-grad-1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFB347" />
          <stop offset="1" stopColor="#FCD34D" />
        </linearGradient>
        <linearGradient id="ghl-grad-2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1F8B5C" />
          <stop offset="1" stopColor="#5AD395" />
        </linearGradient>
      </defs>
      <path d="M14 32 L20 6 L26 32 L21.5 32 L20 18 L18.5 32 Z" fill="url(#ghl-grad-1)" />
      <path d="M22 32 L28 12 L34 32 L29.5 32 L28 22 L26.5 32 Z" fill="url(#ghl-grad-2)" />
    </svg>
  );
}

/* ─── MyCase — orange "8am" stylized ─── */
function MyCaseLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <text
        x="6"
        y="28"
        fontFamily='"Brush Script MT", "Comic Sans MS", cursive'
        fontWeight="700"
        fontSize="22"
        fill="#F97316"
        letterSpacing="-0.04em"
      >
        8am
      </text>
    </svg>
  );
}

/* All glyph-bearing logos below use system-ui as the SVG font to ensure
 * deterministic rendering during capture (Chrome at 1920x1080). */
const MONOGRAM_FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';

/* ─── Outlook — Microsoft Outlook icon: blue gradient with white "O" + envelope flap ─── */
function OutlookLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="outlook-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A8DDB" />
          <stop offset="1" stopColor="#0364B8" />
        </linearGradient>
      </defs>
      {/* Left: stylized blue "O" panel */}
      <rect x="2" y="6" width="22" height="28" rx="3" fill="url(#outlook-bg)" />
      <ellipse cx="13" cy="20" rx="5.6" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="2.6" />
      <ellipse cx="13" cy="20" rx="2.0" ry="3.4" fill="#FFFFFF" />
      {/* Right: envelope panel (lighter blue) */}
      <rect x="22" y="13" width="15" height="14" rx="1" fill="#0078D4" />
      <path d="M22 14 L29.5 20.5 L37 14" stroke="#28A8EA" strokeWidth="1" fill="none" strokeLinejoin="round" />
      <rect x="22" y="13" width="15" height="14" rx="1" fill="none" stroke="#28A8EA" strokeWidth="0.8" />
    </svg>
  );
}

/* ─── QuickBooks — green circle with white "qb" in distinctive Intuit style ─── */
function QuickBooksLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="qb-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2CA01C" />
          <stop offset="1" stopColor="#1F8B16" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="16" fill="url(#qb-bg)" />
      {/* Stylized "qb" — overlapping rounded forms in white */}
      <circle cx="15.5" cy="20" r="5.2" fill="none" stroke="#FFFFFF" strokeWidth="2.4" />
      <line x1="18.0" y1="14.5" x2="18.0" y2="27" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="24.5" cy="20" r="5.2" fill="none" stroke="#FFFFFF" strokeWidth="2.4" />
      <line x1="22.0" y1="13" x2="22.0" y2="25.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Microsoft Word — blue gradient with document detail + white "W" ─── */
function WordLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="word-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B7CD3" />
          <stop offset="1" stopColor="#185ABD" />
        </linearGradient>
      </defs>
      {/* Document body (white) with a notched corner */}
      <path
        d="M9 4 L26 4 L33 11 L33 36 L9 36 Z"
        fill="#FFFFFF"
        stroke="#185ABD"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path d="M26 4 L26 11 L33 11" fill="none" stroke="#185ABD" strokeWidth="0.8" strokeLinejoin="round" />
      {/* Document text lines (faint) */}
      <line x1="13" y1="16" x2="29" y2="16" stroke="#185ABD" strokeWidth="0.6" opacity="0.35" />
      <line x1="13" y1="19" x2="29" y2="19" stroke="#185ABD" strokeWidth="0.6" opacity="0.35" />
      <line x1="13" y1="22" x2="22" y2="22" stroke="#185ABD" strokeWidth="0.6" opacity="0.35" />
      {/* Blue W badge overlay (lower-right) */}
      <rect x="17" y="20" width="20" height="14" rx="2" fill="url(#word-bg)" />
      <text
        x="27"
        y="31"
        textAnchor="middle"
        fontFamily={MONOGRAM_FONT}
        fontWeight="700"
        fontSize="11"
        fill="#FFFFFF"
        letterSpacing="-0.05em"
      >
        W
      </text>
    </svg>
  );
}

/* ─── Microsoft Excel — green gradient with grid + white "X" badge ─── */
function ExcelLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="excel-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#21A366" />
          <stop offset="1" stopColor="#107C41" />
        </linearGradient>
      </defs>
      {/* Spreadsheet body (white) with notched corner */}
      <path
        d="M9 4 L26 4 L33 11 L33 36 L9 36 Z"
        fill="#FFFFFF"
        stroke="#107C41"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path d="M26 4 L26 11 L33 11" fill="none" stroke="#107C41" strokeWidth="0.8" strokeLinejoin="round" />
      {/* Grid lines */}
      <line x1="9"  y1="17" x2="33" y2="17" stroke="#107C41" strokeWidth="0.4" opacity="0.4" />
      <line x1="9"  y1="22" x2="33" y2="22" stroke="#107C41" strokeWidth="0.4" opacity="0.4" />
      <line x1="9"  y1="27" x2="33" y2="27" stroke="#107C41" strokeWidth="0.4" opacity="0.4" />
      <line x1="17" y1="13" x2="17" y2="36" stroke="#107C41" strokeWidth="0.4" opacity="0.4" />
      <line x1="25" y1="13" x2="25" y2="36" stroke="#107C41" strokeWidth="0.4" opacity="0.4" />
      {/* Green X badge overlay (lower-right) */}
      <rect x="17" y="20" width="20" height="14" rx="2" fill="url(#excel-bg)" />
      <text
        x="27"
        y="31"
        textAnchor="middle"
        fontFamily={MONOGRAM_FONT}
        fontWeight="700"
        fontSize="12"
        fill="#FFFFFF"
        letterSpacing="-0.05em"
      >
        X
      </text>
    </svg>
  );
}

/* ─── DocuSign — yellow rounded square with stylized "ds" + signature stroke ─── */
function DocuSignLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="docusign-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFCC22" />
          <stop offset="1" stopColor="#F2B800" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="34" height="28" rx="4" fill="url(#docusign-bg)" />
      {/* Stylized signature swoop */}
      <path
        d="M9 26 C13 14, 18 14, 22 22 C25 28, 29 22, 32 18"
        stroke="#1A1A1A"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Signature underline */}
      <line x1="9" y1="29" x2="32" y2="29" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Adobe Acrobat — red, stylized "A" ─── */
function AdobeLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="4" y="6" width="32" height="28" rx="3" fill="#FA0F00" />
      <text
        x="20"
        y="29"
        textAnchor="middle"
        fontFamily={MONOGRAM_FONT}
        fontWeight="700"
        fontSize="20"
        fill="#FFFFFF"
        letterSpacing="-0.06em"
      >
        A
      </text>
    </svg>
  );
}

/* ─── OneDrive — blue cloud ─── */
function OneDriveLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M11 28
           C7.5 28 5 25.5 5 22.5
           C5 19.7 7.2 17.4 9.9 17.2
           C10.4 13.6 13.5 11 17.2 11
           C19.8 11 22.1 12.4 23.4 14.5
           C24.4 13.7 25.7 13.2 27.1 13.2
           C30.4 13.2 33 15.8 33 19.1
           C33 19.4 33 19.7 32.95 20
           C34.7 20.4 36 22 36 23.9
           C36 26.2 34.2 28 31.9 28
           Z"
        fill="#0364B8"
      />
      <path
        d="M11 28
           C7.5 28 5 25.5 5 22.5
           C5 19.7 7.2 17.4 9.9 17.2
           C10.4 13.6 13.5 11 17.2 11
           C19.8 11 22.1 12.4 23.4 14.5"
        stroke="#FFFFFF"
        strokeWidth="0.6"
        fill="none"
        opacity="0"
      />
    </svg>
  );
}

/* ─── Slack — 4-color hash ─── */
function SlackLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="6"  y="14" width="28" height="4"  rx="2" fill="#36C5F0" />
      <rect x="6"  y="22" width="28" height="4"  rx="2" fill="#2EB67D" />
      <rect x="14" y="6"  width="4"  height="28" rx="2" fill="#ECB22E" />
      <rect x="22" y="6"  width="4"  height="28" rx="2" fill="#E01E5A" />
    </svg>
  );
}

