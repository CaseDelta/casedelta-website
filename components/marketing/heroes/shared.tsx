"use client";

/**
 * Shared hero primitives, ported verbatim from the eclipse-variants mockups.
 * Themed via the active Theme so one set of primitives renders all three looks.
 */
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/posthog";
import type { Theme } from "@/lib/variants";
import { LOGOS, LOGO_CAP, SOCIAL_PROOF } from "@/lib/variants";

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

function Stars({ size = 15 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#f5b400">
          <path d="M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.27 6.09 20.36l1.13-6.57L2.45 9.14l6.6-.96L12 2.2z" />
        </svg>
      ))}
    </span>
  );
}

/** Compact Google star-rating trust eyebrow, baked into the hero copy above the headline. */
export function GoogleRating({ theme, align = "left" }: { theme: Theme; align?: "left" | "center" }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        alignSelf: align === "center" ? "center" : "flex-start",
      }}
    >
      <Stars size={15} />
      <span style={{ fontFamily: theme.sans, fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.2px", color: theme.ink }}>
        {SOCIAL_PROOF.rating}
        <span style={{ color: theme.muted, fontWeight: 500 }}> on {SOCIAL_PROOF.source}</span>
      </span>
    </div>
  );
}

/**
 * Hero social proof, the slot the integration logo wall used to occupy.
 * Currently unused (the Google rating moved into the hero copy via GoogleRating);
 * kept for when the practice-area / proof band returns.
 * PLACEHOLDER content (see SOCIAL_PROOF) for design only. A 5-star Google rating
 * line over a row of (fictional) firm names, themed and laid out exactly like the
 * old logo wall so the hero rhythm is unchanged.
 */
export function HeroSocialProof({
  theme,
  variant,
  capAlign,
}: {
  theme: Theme;
  variant: "pinned" | "strip";
  capAlign: "center" | "left";
}) {
  const isStrip = variant === "strip";
  const center = capAlign === "center";
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
              ? { padding: "22px 0 24px" }
              : { borderTop: `1px solid ${theme.hairline}`, padding: "24px 0 32px" }
          }
        >
          {/* rating line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: center ? "center" : "flex-start",
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            <Stars />
            <span style={{ fontFamily: theme.sans, fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.2px", color: theme.ink }}>
              {SOCIAL_PROOF.rating}
              <span style={{ color: theme.muted, fontWeight: 500 }}> on {SOCIAL_PROOF.source}</span>
            </span>
          </div>

          {/* connective label, so the practice areas read as "who it's built for" */}
          <div
            style={{
              fontFamily: theme.sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              color: theme.faint,
              textAlign: capAlign,
              marginBottom: isStrip ? 14 : 18,
            }}
          >
            {SOCIAL_PROOF.practiceAreasLabel}
          </div>

          {/* practice areas, all in the serif display face */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px 20px", flexWrap: "wrap" }}>
            {SOCIAL_PROOF.practiceAreas.map((area) => (
              <span
                key={area}
                style={{
                  color: theme.faint,
                  fontFamily: theme.serif,
                  fontWeight: 500,
                  fontSize: 18,
                  letterSpacing: "0",
                  whiteSpace: "nowrap",
                }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
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
      .cd-hero-navlink { transition: color 0.2s ease; }
      .cd-hero-navlink:hover { color: ${theme.ink}; }
      .cd-hero-login:hover { color: ${theme.ink}; }
      .cd-hero-secondary:hover { gap: 11px; }
      @media (max-width: 960px) {
        .cd-hero-nav, .cd-hero-login, .cd-hero-header-pill { display: none !important; }
        .cd-hero-burger { display: grid !important; }
      }
    `}</style>
  );
}
