"use client";

/**
 * Shared hero primitives, ported verbatim from the eclipse-variants mockups.
 * Themed via the active Theme so one set of primitives renders all three looks.
 */
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/posthog";
import type { Theme } from "@/lib/variants";
import { LOGOS, LOGO_CAP } from "@/lib/variants";

/** The mockup hero wrap (harvey-light), used for header + hero + logo wall. */
export const HERO_MAXW = 1240;
export const HERO_PAD = 36;

export function ArrowIcon({ size = 13, stroke }: { size?: number; stroke: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function Pill({
  theme,
  href,
  label,
  size = "md",
  location,
}: {
  theme: Theme;
  href: string;
  label: string;
  size?: "sm" | "md";
  location: string;
}) {
  const sm = size === "sm";
  const shadow =
    theme.mode === "light"
      ? "0 10px 26px rgba(31, 58, 95, 0.26)"
      : "0 8px 28px rgba(58, 120, 224, 0.36)";
  return (
    <a
      href={href}
      onClick={() => trackEvent("cta_click", { location, design: theme.name })}
      className="cd-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: sm ? 9 : 11,
        background: theme.pillBg,
        color: theme.pillText,
        borderRadius: 48,
        padding: sm ? "6px 7px 6px 18px" : "7px 8px 7px 21px",
        fontFamily: theme.sans,
        fontSize: sm ? 14 : 15,
        fontWeight: 600,
        letterSpacing: "-0.2px",
        lineHeight: 1,
        textDecoration: "none",
        whiteSpace: "nowrap",
        border: "none",
        cursor: "pointer",
        transition: "background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
        // consumed by the hover rules in HeroStyles
        "--cd-pill-hover": theme.pillBgHover,
        "--cd-pill-shadow": shadow,
      } as React.CSSProperties}
    >
      {label}
      <span
        className="cd-pill-dot"
        style={{
          width: sm ? 22 : 25,
          height: sm ? 22 : 25,
          borderRadius: "50%",
          background: "#fff",
          display: "grid",
          placeItems: "center",
          transition: "transform 0.28s ease",
          flex: "0 0 auto",
        }}
      >
        <ArrowIcon stroke={theme.pillDotStroke} />
      </span>
    </a>
  );
}

export function HeroLogoWall({
  theme,
  variant,
  capAlign,
}: {
  theme: Theme;
  variant: "pinned" | "strip";
  capAlign: "center" | "left";
}) {
  const isStrip = variant === "strip";
  return (
    <div
      style={
        isStrip
          ? { borderBottom: `1px solid ${theme.hairline}`, background: theme.canvas }
          : { position: "relative", zIndex: 10 }
      }
    >
      <div style={{ maxWidth: HERO_MAXW, margin: "0 auto", padding: `0 ${HERO_PAD}px` }}>
        <div
          style={
            isStrip
              ? { padding: "24px 0 26px" }
              : { borderTop: `1px solid ${theme.hairline}`, padding: "26px 0 34px" }
          }
        >
          <div
            style={{
              fontFamily: theme.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              color: theme.faint,
              marginBottom: isStrip ? 18 : 20,
              textAlign: capAlign,
            }}
          >
            {LOGO_CAP}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {LOGOS.map((logo) => (
              <span
                key={logo.name}
                className="cd-logo"
                style={{
                  color: theme.faint,
                  fontFamily: logo.style === "serif" ? theme.serif : theme.sans,
                  fontWeight: logo.style === "serif" ? 500 : logo.style === "wide" ? 700 : 600,
                  fontSize: logo.style === "serif" ? 19 : logo.style === "wide" ? 14 : 17,
                  letterSpacing:
                    logo.style === "serif" ? "0" : logo.style === "wide" ? "1.8px" : "0.2px",
                  whiteSpace: "nowrap",
                  transition: "color 0.25s ease",
                  "--cd-logo-hover": theme.ink,
                } as React.CSSProperties}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Honest hero trust mark. Replaces the old fabricated star rating (no real reviews exist
 * yet). A security credential is true today (see /security: isolated data, no training on
 * client data, BAA available) and reinforces a core differentiator instead of inventing one.
 */
export function HeroTrustMark({
  theme,
  align = "left",
  onLight = false,
}: {
  theme: Theme;
  align?: "left" | "center";
  onLight?: boolean;
}) {
  const fg = onLight ? "rgba(255, 255, 255, 0.92)" : theme.ink;
  const stroke = onLight ? "rgba(255, 255, 255, 0.92)" : theme.accent;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        alignSelf: align === "center" ? "center" : "flex-start",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9.5 12l1.8 1.8L15 10" />
      </svg>
      <span style={{ fontFamily: theme.sans, fontSize: 15, fontWeight: 600, letterSpacing: "-0.2px", color: fg }}>
        Enterprise security
      </span>
    </div>
  );
}

/** Animated "Scroll" cue pinned to the bottom of the full-height hero. */
export function ScrollCue({ theme }: { theme: Theme }) {
  const color = theme.mode === "dark" ? "rgba(255, 255, 255, 0.72)" : theme.muted;
  return (
    <button
      className="cd-scroll-cue"
      aria-label="Scroll to content"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: Math.round(window.innerHeight * 0.92), behavior: "smooth" });
        }
      }}
      style={{
        position: "absolute",
        bottom: 22,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        color,
        padding: 6,
      }}
    >
      <span style={{ fontFamily: theme.sans, fontSize: 11, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase" }}>Scroll</span>
      <svg className="cd-scroll-chevron" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

/**
 * Theme-dependent hover + responsive CSS. Rendered once per active hero.
 * Hover bg/shadow ride on CSS custom properties set inline above.
 */
export function HeroStyles({ theme }: { theme: Theme }) {
  return (
    <style>{`
      .cd-pill:hover { background: var(--cd-pill-hover); box-shadow: var(--cd-pill-shadow); transform: translateY(-1px); }
      .cd-pill:hover .cd-pill-dot { transform: rotate(45deg); }
      .cd-logo:hover { color: var(--cd-logo-hover); }
      .cd-hero-secondary:hover { gap: 11px; }
      .cd-navcta:hover { transform: translateY(-1px); box-shadow: 0 8px 22px -8px rgba(0,0,0,0.35); }
      .cd-scroll-cue { transition: color 0.2s ease; }
      .cd-scroll-cue:hover { color: ${theme.ink}; }
      .cd-scroll-chevron { animation: cd-bounce 2.2s ease-in-out infinite; }
      @keyframes cd-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
      @media (prefers-reduced-motion: reduce) { .cd-scroll-chevron { animation: none; } }
      @media (max-width: 960px) {
        .cd-hero-nav, .cd-hero-login, .cd-hero-header-pill { display: none !important; }
        .cd-hero-burger { display: grid !important; }
      }
    `}</style>
  );
}
