"use client";

/**
 * Floating frosted-glass navbar pill (Filevine-style): detached from the top with a
 * gap, centered with side margins, rounded, translucent + backdrop blur, and sticky.
 *
 * Scroll behavior: it starts DARK-frosted over the (dark) hero video, then transitions
 * to LIGHT-frosted once you scroll into the light below-the-fold. On the light hero
 * (harvey-light) it is light throughout. Used only on the homepage; other pages keep
 * the standard navbar.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Theme } from "@/lib/variants";
import { HERO_NAV, LOGIN, PRIMARY_CTA } from "@/lib/variants";
import { trackEvent } from "@/lib/posthog";
import { HERO_MAXW, ArrowIcon } from "./shared";

export const HERO_HEADER_HEIGHT = 80; // 16px top gap + 64px pill

const PILL_MAXW = Math.min(HERO_MAXW, 1180);

export function HeroHeader({ theme }: { theme: Theme }) {
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // The pill sits over the below-the-fold once the (full-height) hero has scrolled
      // up past it. innerHeight - 90 ~ the hero bottom reaching the pill.
      setPastHero(window.scrollY > window.innerHeight - 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = theme.mode === "light" || pastHero;

  const c = light
    ? {
        bg: "rgba(255, 255, 255, 0.85)",
        border: "rgba(20, 23, 31, 0.08)",
        shadow: "0 12px 36px -16px rgba(20, 23, 31, 0.22)",
        ink: "#14171f",
        muted: "#54565f",
        accent: "#2f6fe0",
        ctaBg: "#1f3a5f",
        ctaArrow: "#1f3a5f",
        menuBg: "rgba(255, 255, 255, 0.96)",
      }
    : {
        bg: "rgba(16, 20, 28, 0.5)",
        border: "rgba(255, 255, 255, 0.13)",
        shadow: "0 12px 34px -18px rgba(0, 0, 0, 0.55)",
        ink: "#ffffff",
        muted: "rgba(255, 255, 255, 0.72)",
        accent: theme.accent,
        ctaBg: theme.pillBg,
        ctaArrow: theme.pillBg,
        menuBg: "rgba(16, 20, 28, 0.94)",
      };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, paddingTop: 16 }}>
      <div style={{ maxWidth: PILL_MAXW, margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px)" }}>
        <div
          className="cd-nav-pill"
          style={{
            position: "relative",
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 32,
            padding: "0 14px 0 22px",
            borderRadius: 18,
            background: c.bg,
            backdropFilter: "saturate(1.4) blur(16px)",
            WebkitBackdropFilter: "saturate(1.4) blur(16px)",
            border: `1px solid ${c.border}`,
            boxShadow: c.shadow,
            transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease",
          }}
        >
          <Link href="/" style={{ fontFamily: theme.serif, fontWeight: 400, fontSize: 24, letterSpacing: "-0.3px", lineHeight: 1, color: c.ink, textDecoration: "none", transition: "color 0.35s ease" }}>
            Case<b style={{ color: c.accent, fontWeight: 500, transition: "color 0.35s ease" }}>Delta</b>
          </Link>

          <nav className="cd-hero-nav" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            {HERO_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="cd-hero-navlink"
                style={{ fontFamily: theme.sans, fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.2px", color: c.muted, textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = c.ink; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = c.muted; }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href={LOGIN.href}
              className="cd-hero-login"
              style={{ fontFamily: theme.sans, fontSize: 14.5, fontWeight: 500, color: c.muted, letterSpacing: "-0.2px", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = c.ink; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = c.muted; }}
            >
              {LOGIN.label}
            </a>
            <a
              href={PRIMARY_CTA.href}
              onClick={() => trackEvent("cta_click", { location: "hero_header", design: theme.name })}
              className="cd-hero-header-pill cd-navcta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 9, background: c.ctaBg, color: "#fff",
                borderRadius: 40, padding: "8px 8px 8px 18px", fontFamily: theme.sans, fontSize: 14, fontWeight: 600,
                letterSpacing: "-0.2px", lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap",
                transition: "background 0.35s ease, transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {PRIMARY_CTA.label}
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
                <ArrowIcon stroke={c.ctaArrow} />
              </span>
            </a>
            <button
              className="cd-hero-burger"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              style={{ display: "none", background: "none", border: 0, cursor: "pointer", color: c.ink, width: 34, height: 34, placeItems: "center" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6l-12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>

          {open && (
            <div
              style={{
                position: "absolute",
                top: 72,
                left: 0,
                right: 0,
                background: c.menuBg,
                backdropFilter: "saturate(1.4) blur(16px)",
                WebkitBackdropFilter: "saturate(1.4) blur(16px)",
                border: `1px solid ${c.border}`,
                borderRadius: 18,
                padding: "10px 18px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                boxShadow: c.shadow,
              }}
            >
              {HERO_NAV.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setOpen(false)} style={{ fontFamily: theme.sans, fontSize: 16, fontWeight: 500, color: c.ink, textDecoration: "none", padding: "13px 0", borderBottom: `1px solid ${c.border}` }}>
                  {item.label}
                </Link>
              ))}
              <a href={LOGIN.href} style={{ fontFamily: theme.sans, fontSize: 16, fontWeight: 500, color: c.muted, textDecoration: "none", padding: "13px 0" }}>
                {LOGIN.label}
              </a>
              <a
                href={PRIMARY_CTA.href}
                onClick={() => { trackEvent("cta_click", { location: "hero_mobile_menu", design: theme.name }); setOpen(false); }}
                style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: c.ctaBg, color: "#fff", borderRadius: 40, padding: "12px 18px", fontFamily: theme.sans, fontSize: 15, fontWeight: 600, textDecoration: "none" }}
              >
                {PRIMARY_CTA.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
