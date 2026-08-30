"use client";

/**
 * Page-level sticky nav (matches the live Sasonix behavior): fixed to the top,
 * transparent with white text over the hero, transitioning to white-bg / dark-text
 * once scrolled past the hero. Geometry measured from the live site: flex
 * space-between row, content 80..1360 (max-width 1360, 40px gutter), 32px link gaps.
 *
 * Copy is CaseDelta; the visual identity (orange, logo mark) is still the Sasonix
 * placeholder and flips on the tokens.ts rebrand.
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import { SX } from "./tokens";
import { LOGO, logoWidth } from "./brand";
import { scrollToSection } from "./scrollToSection";

/**
 * `id` smooth-scrolls to a section on this page; `href` is a plain navigation to a
 * real route. The nav carries the homepage anchors plus Blog; the footer carries the
 * full site map.
 *
 * "Contact" used to sit here pointing at #contact. No element with that id has ever
 * existed on the page, so scrollToSection fell through to its /#contact fallback and
 * the link did nothing. Contact is the demo booking, and the button to its right
 * already is that, so the item is gone rather than repointed.
 */
const LINKS: { label: string; id?: string; href?: string }[] = [
  { label: "What it does", id: "features" },
  // A page, not an anchor: UseCases left the homepage on 2026-08-28 and #jobs no
  // longer exists. An id that matches nothing scrolls nowhere and reports nothing.
  { label: "The work", href: "/use-cases" },
  { label: "Pricing", id: "pricing" },
  { label: "Security", id: "security" },
  { label: "Blog", href: "/blog" },
];

/**
 * Logo height in the nav. The header is 67px and stays 67px: its height is set by
 * the 42px "Book a demo" button, not by the logo, so anything up to 42 is free.
 * 36 puts the wordmark's glyph extent at ~23px, which reads as a peer of the 15px
 * nav links rather than as something tucked in beside them. 28 measured correct
 * and looked undersized on the page, which is the usual gap between the two.
 */
const LOGO_H = 36;

export function Nav({ solid = false }: { solid?: boolean } = {}) {
  // `solid` forces the scrolled (white-bg, dark-text) treatment from the top, for
  // pages that have no dark hero behind the nav (e.g. /v2/demo).
  const [scrolled, setScrolled] = useState(solid);
  useEffect(() => {
    if (solid) { setScrolled(true); return; }
    // Flip once the hero has essentially left the screen. Measured from the hero
    // itself, since it is now viewport-height rather than a fixed value.
    const threshold = () => {
      const hero = document.querySelector(".sx-hero") as HTMLElement | null;
      return (hero?.offsetHeight ?? window.innerHeight) - 90;
    };
    const onScroll = () => setScrolled(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const fg = scrolled ? SX.ink : SX.onMedia;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "color-mix(in srgb, var(--sx-bg) 92%, transparent)" : "transparent",
        backdropFilter: scrolled ? "saturate(1.3) blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(1.3) blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? SX.hairline : "transparent"}`,
        boxShadow: scrolled ? "0 10px 30px -12px rgba(var(--sx-shadow-rgb), 0.16)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <style>{`
        @media (max-width: 760px) {
          .sx-nav-inner {
            padding: 12px 20px !important;
            gap: 16px;
          }

          .sx-nav-links,
          .sx-nav-login {
            display: none !important;
          }

          .sx-nav-demo {
            padding: 9px 14px !important;
            font-size: 14px !important;
          }
        }

        @media (max-width: 380px) {
          .sx-nav-demo {
            display: none !important;
          }
        }
      `}</style>
      <div className="sx-nav-inner" style={{ maxWidth: 1360, margin: "0 auto", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* logo */}
        {/* The real lockup, both cuts stacked and crossfaded on the same 0.3s ease as
            the nav's colour flip, so the logo changes ink WITH the bar rather than
            after it. Both files are identical geometry, so nothing moves. */}
        <a
          href="/"
          className="sx-logo"
          aria-label="CaseDelta home"
          style={{ position: "relative", display: "block", flex: "0 0 auto", width: logoWidth(LOGO_H), height: LOGO_H, textDecoration: "none" }}
        >
          {[
            { src: LOGO.onDark, shown: !scrolled },
            { src: LOGO.onLight, shown: scrolled },
          ].map(({ src, shown }) => (
            <Image
              key={src}
              src={src}
              alt=""
              aria-hidden
              width={LOGO.width}
              height={LOGO.height}
              priority
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: shown ? 1 : 0, transition: "opacity 0.3s ease" }}
            />
          ))}
        </a>
        {/* links */}
        <div className="sx-nav-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href ?? `/#${l.id}`}
              onClick={l.id ? (e) => { e.preventDefault(); scrollToSection(l.id as string); } : undefined}
              className="sx-navlink"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SX.body, fontSize: 15, fontWeight: 400, color: fg, textDecoration: "none", transition: "color 0.3s ease" }}
            >
              {l.label}
            </a>
          ))}
        </div>
        {/* actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="https://app.casedelta.com" className="sx-navlink sx-nav-login" style={{ fontFamily: SX.body, fontSize: 15, fontWeight: 400, color: fg, textDecoration: "none", transition: "color 0.3s ease" }}>Log in</a>
          <a href="/demo" className="sx-btn sx-nav-demo" style={{ fontFamily: SX.body, fontSize: 15, fontWeight: 500, color: SX.onInk, background: SX.ink, borderRadius: 10, padding: "9px 16px", textDecoration: "none", whiteSpace: "nowrap" }}>Book a demo</a>
        </div>
      </div>
    </header>
  );
}
