"use client";

/**
 * Shared marketing design-system kit.
 *
 * Single source of truth for the below-the-fold + subpage look (Legora / Harvey
 * / Filevine synthesis): Newsreader serif display + Hanken Grotesk body, ink on
 * white with one blue accent and two dark bands. HomeSections.tsx and every
 * subpage import from here so the whole site reads as one system.
 *
 * Honesty rules (POSITIONING.md): teammate not tool, anchor to a salary, sell
 * leverage not layoff. Never claim "no third-party LLM" or "data never leaves our
 * infrastructure" (false: prod runs on enterprise OpenAI under zero-retention/BAA
 * terms). Delta is gender-neutral (never she/her). No em dashes anywhere.
 */
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";

export const MAXW = 1320;
export const PAGE_PAD = "clamp(24px, 4vw, 48px)";
export const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";
export const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* Ink / accent palette. */
export const BF = {
  ink: "#14171f",
  muted: "#54565f",
  faint: "#8a8c95",
  hairline: "rgba(20, 23, 31, 0.09)",
  hairlineStrong: "rgba(20, 23, 31, 0.12)",
  accent: "#2f6fe0",
  accentSoft: "rgba(47, 111, 224, 0.08)",
  accentBorderHover: "rgba(47, 111, 224, 0.40)",
  card: "#ffffff",
  pillBg: "#1f3a5f",
  pillBgHover: "#284b78",
};

/* Surfaces: white + one off-white for light sections, two dark bands. */
export const BG = {
  white: "#ffffff",
  offWhite: "#f5f7fb",
  statBand: "#0e1420",
  ctaBand: "#1f3a5f",
};

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ---- motion ---- */
export function useRise() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition: { duration: 0.6, delay, ease: EASE },
        };
}

/* ---- layout primitives ---- */
export function Container({ children, narrow = false, center = false }: { children: React.ReactNode; narrow?: boolean; center?: boolean }) {
  return (
    <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `0 ${PAGE_PAD}` }}>
      {/* center: horizontally center the (usually narrow) column, for testimonial + CTA sections */}
      <div style={{ maxWidth: narrow ? 820 : "100%", margin: center ? "0 auto" : undefined }}>{children}</div>
    </div>
  );
}

export function Section({ children, bg, id, tight = false }: { children: React.ReactNode; bg: string; id?: string; tight?: boolean }) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: tight ? "clamp(64px, 8vw, 104px) 0" : "clamp(92px, 11.5vw, 152px) 0",
        borderTop: `1px solid ${BF.hairline}`,
      }}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        fontFamily: SANS,
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: "1.4px",
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,0.55)" : BF.accent,
        marginBottom: 22,
      }}
    >
      {children}
    </div>
  );
}

export function H({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(33px, 4.6vw, 50px)", lineHeight: 1.06, letterSpacing: "-1.2px", color: light ? "#fff" : BF.ink, margin: 0 }}>
      {children}
    </h2>
  );
}

/* Accent fragment for two-tone headings: <H>Plain <Accent>emphasis.</Accent></H> */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: BF.accent, fontStyle: "italic" }}>{children}</span>;
}

export function Sub({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{ fontFamily: SANS, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.5, letterSpacing: "-0.2px", color: light ? "rgba(255,255,255,0.7)" : BF.muted, marginTop: 20, maxWidth: 640 }}>
      {children}
    </p>
  );
}

export function PillLink({ href, children, location, onDark = false }: { href: string; children: React.ReactNode; location: string; onDark?: boolean }) {
  const bg = onDark ? "#ffffff" : BF.pillBg;
  const fg = onDark ? "#1f3a5f" : "#ffffff";
  const dot = onDark ? "#1f3a5f" : "#ffffff";
  const arrow = onDark ? "#ffffff" : "#1f3a5f";
  return (
    <a
      href={href}
      onClick={() => trackEvent("cta_click", { location })}
      className={onDark ? "cd-pill-d" : "cd-pill2"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, background: bg, color: fg,
        borderRadius: 48, padding: "12px 12px 12px 26px", fontFamily: SANS, fontSize: 15.5, fontWeight: 600,
        letterSpacing: "-0.2px", lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
      }}
    >
      {children}
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: dot, display: "grid", placeItems: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={arrow} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </span>
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="cd-tlink" style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: BF.accent, letterSpacing: "-0.2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, marginTop: 24 }}>
      {children}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
    </Link>
  );
}

/* A subtle inline check icon, used for lists across the site. */
export function Check({ color }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color ?? BF.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: 1 }}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/*
 * PageHero: the standard subpage header. Clears the fixed global navbar with top
 * padding, then an eyebrow + serif H1 + one-sentence sub, optionally a pill CTA.
 * Subpages open with this, then stack <Section> blocks, then <FooterV2/>.
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  ctaHref,
  ctaLabel,
  bg = BG.white,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  bg?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const rise = reduce
    ? {}
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE } };
  return (
    <section style={{ background: bg, padding: "clamp(130px, 16vw, 190px) 0 clamp(56px, 7vw, 96px)" }}>
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: `0 ${PAGE_PAD}` }}>
        <motion.div {...rise} style={{ maxWidth: 880 }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.02, letterSpacing: "-1.8px", color: BF.ink, margin: 0 }}>
            {title}
          </h1>
          {sub && (
            <p style={{ fontFamily: SANS, fontSize: "clamp(18px, 2.1vw, 22px)", lineHeight: 1.5, letterSpacing: "-0.2px", color: BF.muted, marginTop: 26, maxWidth: 680 }}>
              {sub}
            </p>
          )}
          {ctaHref && (
            <div style={{ marginTop: 36 }}>
              <PillLink href={ctaHref} location="page_hero">{ctaLabel ?? "Book a demo"}</PillLink>
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
