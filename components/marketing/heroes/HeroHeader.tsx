"use client";

/**
 * Themed sticky header, ported from the mockup headers. Used only on the homepage
 * (the global NavbarV2 is suppressed on "/") so the cinematic video can rise behind
 * it exactly as in the mockups. Other pages keep the standard light navbar.
 */
import Link from "next/link";
import { useState } from "react";
import type { Theme } from "@/lib/variants";
import { HERO_NAV, LOGIN, PRIMARY_CTA } from "@/lib/variants";
import { trackEvent } from "@/lib/posthog";
import { HERO_MAXW, HERO_PAD, Pill, useScrolled } from "./shared";

export const HERO_HEADER_HEIGHT = 72;

export function HeroHeader({ theme }: { theme: Theme }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const headerBg = `rgba(${theme.canvasRgb}, ${scrolled ? (theme.mode === "light" ? 0.86 : 0.82) : theme.mode === "light" ? 0.62 : 0.55})`;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        height: HERO_HEADER_HEIGHT,
        background: headerBg,
        backdropFilter: "blur(14px) saturate(1.1)",
        WebkitBackdropFilter: "blur(14px) saturate(1.1)",
        borderBottom: `1px solid ${scrolled ? theme.hairline : "transparent"}`,
        transition: "border-color 0.3s ease, background 0.3s ease",
      }}
    >
      <div style={{ maxWidth: HERO_MAXW, margin: "0 auto", padding: `0 ${HERO_PAD}px`, height: "100%" }}>
        <div style={{ height: "100%", display: "flex", alignItems: "center", gap: 38 }}>
          <Link
            href="/"
            style={{
              fontFamily: theme.serif,
              fontWeight: 400,
              fontSize: 26,
              letterSpacing: "-0.3px",
              lineHeight: 1,
              color: theme.ink,
              textDecoration: "none",
            }}
          >
            Case<b style={{ color: theme.accent, fontWeight: 500 }}>Delta</b>
          </Link>

          <nav className="cd-hero-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {HERO_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="cd-hero-navlink"
                style={{
                  fontFamily: theme.sans,
                  fontSize: 14.5,
                  fontWeight: 500,
                  letterSpacing: "-0.2px",
                  color: theme.muted,
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 18 }}>
            <a
              href={LOGIN.href}
              className="cd-hero-login"
              style={{
                fontFamily: theme.sans,
                fontSize: 14.5,
                fontWeight: 500,
                color: theme.muted,
                letterSpacing: "-0.2px",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
            >
              {LOGIN.label}
            </a>
            <span className="cd-hero-header-pill">
              <Pill theme={theme} href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} size="sm" location="hero_header" />
            </span>
            <button
              className="cd-hero-burger"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              style={{
                display: "none",
                background: "none",
                border: 0,
                cursor: "pointer",
                color: theme.ink,
                width: 34,
                height: 34,
                placeItems: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6l-12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: HERO_HEADER_HEIGHT,
            left: 0,
            right: 0,
            background: `rgba(${theme.canvasRgb}, 0.98)`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: `1px solid ${theme.hairline}`,
            padding: `8px ${HERO_PAD}px 20px`,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {HERO_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: theme.sans,
                fontSize: 16,
                fontWeight: 500,
                color: theme.ink,
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: `1px solid ${theme.hairline}`,
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={LOGIN.href}
            style={{ fontFamily: theme.sans, fontSize: 16, fontWeight: 500, color: theme.muted, textDecoration: "none", padding: "14px 0" }}
          >
            {LOGIN.label}
          </a>
          <a
            href={PRIMARY_CTA.href}
            onClick={() => {
              trackEvent("cta_click", { location: "hero_mobile_menu", design: theme.name });
              setOpen(false);
            }}
            style={{
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: theme.pillBg,
              color: theme.pillText,
              borderRadius: 48,
              padding: "12px 18px",
              fontFamily: theme.sans,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {PRIMARY_CTA.label}
          </a>
        </div>
      )}
    </header>
  );
}
