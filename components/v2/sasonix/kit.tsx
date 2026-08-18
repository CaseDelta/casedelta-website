"use client";

/**
 * Shared primitives for the Sasonix clone, matching the live site's measured values.
 *   Container: max-width 1360, 40px gutters (content 1280, x=80 at 1440).
 *   Eyebrow: JetBrains Mono label in a cream pill with a left orange rule.
 *   SectionHead: centered eyebrow + Archivo 48px heading + Geist sub.
 */
import { SX } from "./tokens";

export function Container({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 40px", ...style }}>{children}</div>;
}

/* Mono eyebrow pill: cream bg + 3px orange left rule + JetBrains Mono, per the live. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", background: SX.cream2, borderLeft: `3px solid ${SX.orange}`, padding: "10px 20px", fontFamily: SX.mono, fontSize: 16, letterSpacing: "-1px", lineHeight: "25.6px", color: SX.ink }}>
      {children}
    </span>
  );
}

/* Centered section header: eyebrow -> Archivo 500 48px / -1px / lh55.2 heading -> Geist sub. */
export function SectionHead({ eyebrow, title, sub, titleMaxW = 640, subMaxW = 560 }: { eyebrow: string; title: React.ReactNode; sub?: React.ReactNode; titleMaxW?: number; subMaxW?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: "24px 0 0", maxWidth: titleMaxW }}>
        {title}
      </h2>
      {sub && (
        <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "18px 0 0", maxWidth: subMaxW }}>
          {sub}
        </p>
      )}
    </div>
  );
}
