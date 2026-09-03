"use client";

/**
 * The page-level sticky nav: fixed to the top, transparent with white text over
 * the hero, flipping to a solid bar with dark text once the hero has scrolled
 * past. Geometry measured from the reference: content 80..1360 in a 1360 max
 * width with 40px gutters, 32px link gaps.
 *
 * THE DROPDOWNS open on hover AND on focus, and close on Escape or on leaving
 * the whole header. Hover alone is a mouse-only menu; a keyboard user tabbing
 * into "Product" would get nothing. The trigger is a <button> with
 * aria-expanded rather than a link, because it opens a menu rather than going
 * somewhere, and a screen reader should be told which.
 *
 * The panel is positioned under the bar and sized to its content, not stretched
 * to full width. A full-bleed mega-menu is right when there are forty
 * destinations; with seven it is mostly empty panel. The columns are data
 * (navConfig.ts), so it grows into one without a rewrite.
 *
 * THE THREE RIGHT-HAND ACTIONS are deliberately three different weights, in
 * ascending commitment: "Log in" as plain text, "Book a demo" as the ink pill,
 * "Get started" as the accent pill. Two pills of the same weight would make the
 * reader choose between them; the weights say which one we think they want.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { SX } from "./tokens";
import { LOGO, logoWidth } from "./brand";
import { scrollToSection } from "./scrollToSection";
import { NAV, NAV_ACTIONS, type NavEntry, type NavLink } from "./navConfig";

/**
 * Logo height in the nav. The header is 67px and stays 67px: its height is set
 * by the 42px "Book a demo" button, not by the logo, so anything up to 42 is
 * free. 36 puts the wordmark's glyph extent at ~23px, which reads as a peer of
 * the 15px nav links rather than as something tucked in beside them.
 */
const LOGO_H = 36;

export function Nav({ solid = false }: { solid?: boolean } = {}) {
  // `solid` forces the scrolled treatment from the top, for pages with no dark
  // hero behind the bar.
  const [scrolled, setScrolled] = useState(solid);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (solid) { setScrolled(true); return; }
    // Flip once the hero has essentially left the screen. Measured from the
    // hero itself, since it is viewport-height rather than a fixed value.
    const threshold = () => {
      const hero = document.querySelector(".sx-hero") as HTMLElement | null;
      return (hero?.offsetHeight ?? window.innerHeight) - 90;
    };
    const onScroll = () => setScrolled(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // Escape closes the menu wherever focus happens to be.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMenu(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  // A short close delay so the pointer can cross the gap between the trigger
  // and the panel without the menu snapping shut underneath it.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  // The bar goes solid while a panel is open even at the top of the page, or
  // the panel's own light surface would hang off a transparent bar.
  const barSolid = scrolled || openMenu !== null;
  const fg = barSolid ? SX.ink : SX.onMedia;

  return (
    <header
      onMouseLeave={scheduleClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: barSolid ? "color-mix(in srgb, var(--sx-bg) 92%, transparent)" : "transparent",
        backdropFilter: barSolid ? "saturate(1.3) blur(10px)" : "none",
        WebkitBackdropFilter: barSolid ? "saturate(1.3) blur(10px)" : "none",
        borderBottom: `1px solid ${barSolid ? SX.hairline : "transparent"}`,
        boxShadow: barSolid ? "0 10px 30px -12px rgba(var(--sx-shadow-rgb), 0.16)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <NavStyles />
      <div className="sx-nav-inner" style={{ maxWidth: 1360, margin: "0 auto", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* The real lockup, both cuts stacked and crossfaded on the same 0.3s
            ease as the bar's colour flip, so the logo changes ink WITH the bar
            rather than after it. Both files are identical geometry, so nothing
            moves. */}
        <a
          href="/"
          className="sx-logo"
          aria-label="CaseDelta home"
          style={{ position: "relative", display: "block", flex: "0 0 auto", width: logoWidth(LOGO_H), height: LOGO_H, textDecoration: "none" }}
        >
          {[
            { src: LOGO.onDark, shown: !barSolid },
            { src: LOGO.onLight, shown: barSolid },
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

        <nav className="sx-nav-links" aria-label="Main" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {NAV.map((entry) => (
            <NavEntryView
              key={entry.label}
              entry={entry}
              fg={fg}
              open={openMenu === entry.label}
              onOpen={() => { cancelClose(); setOpenMenu(entry.panels ? entry.label : null); }}
              onScheduleClose={scheduleClose}
              onClose={() => setOpenMenu(null)}
            />
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href={NAV_ACTIONS.login.href} className="sx-navlink sx-nav-login" style={{ fontFamily: SX.body, fontSize: 15, fontWeight: 400, color: fg, textDecoration: "none", transition: "color 0.3s ease" }}>
            {NAV_ACTIONS.login.label}
          </a>
          <a href={NAV_ACTIONS.demo.href} className="sx-btn sx-nav-demo" style={{ fontFamily: SX.body, fontSize: 15, fontWeight: 500, color: SX.onInk, background: SX.ink, borderRadius: 10, padding: "9px 16px", textDecoration: "none", whiteSpace: "nowrap" }}>
            {NAV_ACTIONS.demo.label}
          </a>
          {/* The self-serve door. Accent fill, so it reads as the primary of the
              three without a second dark pill competing with the demo button. */}
          <a href={NAV_ACTIONS.start.href} className="sx-btn sx-nav-start" style={{ fontFamily: SX.body, fontSize: 15, fontWeight: 500, color: SX.onAccent, background: SX.accentDeep, borderRadius: 10, padding: "9px 16px", textDecoration: "none", whiteSpace: "nowrap" }}>
            {NAV_ACTIONS.start.label}
          </a>
        </div>
      </div>
    </header>
  );
}

function NavEntryView({
  entry,
  fg,
  open,
  onOpen,
  onScheduleClose,
  onClose,
}: {
  entry: NavEntry;
  fg: string;
  open: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
}) {
  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontFamily: SX.body,
    fontSize: 15,
    fontWeight: 400,
    color: fg,
    textDecoration: "none",
    background: "none",
    border: 0,
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    transition: "color 0.3s ease, opacity 0.2s ease",
  };

  if (!entry.panels) {
    return (
      <a
        href={entry.href ?? `/#${entry.id}`}
        onClick={entry.id ? (e) => { e.preventDefault(); onClose(); scrollToSection(entry.id as string); } : undefined}
        onMouseEnter={onOpen}
        className="sx-navlink"
        style={linkStyle}
      >
        {entry.label}
      </a>
    );
  }

  return (
    <div style={{ position: "relative" }} onMouseEnter={onOpen} onMouseLeave={onScheduleClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={onOpen}
        onClick={() => (open ? onClose() : onOpen())}
        className="sx-navlink"
        style={linkStyle}
      >
        {entry.label}
        <ChevronDown
          size={15}
          strokeWidth={2}
          aria-hidden
          style={{ transition: "transform 0.22s ease", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && <Panel entry={entry} onNavigate={onClose} />}
    </div>
  );
}

function Panel({ entry, onNavigate }: { entry: NavEntry; onNavigate: () => void }) {
  const hasFeature = Boolean(entry.feature);
  return (
    <div
      className="sx-nav-panel"
      style={{
        position: "absolute",
        top: "calc(100% + 14px)",
        left: 0,
        display: "grid",
        gridTemplateColumns: hasFeature ? "minmax(280px, auto) 260px" : "minmax(280px, auto)",
        gap: 28,
        padding: 24,
        background: SX.surface,
        border: `1px solid ${SX.hairline}`,
        borderRadius: 18,
        boxShadow: "0 30px 70px -30px rgba(var(--sx-shadow-rgb), 0.30)",
      }}
    >
      {entry.panels?.map((panel) => (
        <div key={panel.head}>
          <div style={{ fontFamily: SX.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: SX.ink3, marginBottom: 14 }}>
            {panel.head}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {panel.links.map((l) => (
              <PanelLink key={l.label} link={l} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      ))}
      {entry.feature && (
        <a
          href={entry.feature.href}
          className="sx-nav-feature"
          style={{
            display: "block",
            // Start-aligned, or the grid stretches the card to the height of the
            // link column and it reads as an empty panel with text at the top.
            alignSelf: "start",
            padding: 20,
            borderRadius: 14,
            background: SX.bgAlt,
            border: `1px solid ${SX.hairline}`,
            textDecoration: "none",
          }}
        >
          <div style={{ fontFamily: SX.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: SX.accentText, marginBottom: 10 }}>
            {entry.feature.eyebrow}
          </div>
          <div style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 19, lineHeight: 1.25, letterSpacing: "-0.3px", color: SX.ink }}>
            {entry.feature.title}
          </div>
          <p style={{ fontFamily: SX.body, fontSize: 14, lineHeight: "21px", color: SX.ink2, margin: "8px 0 0" }}>
            {entry.feature.body}
          </p>
        </a>
      )}
    </div>
  );
}

function PanelLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <a
      href={link.href ?? `/#${link.id}`}
      onClick={link.id ? (e) => { e.preventDefault(); onNavigate(); scrollToSection(link.id as string); } : onNavigate}
      className="sx-nav-item"
      style={{ display: "block", padding: "9px 12px", borderRadius: 10, textDecoration: "none" }}
    >
      <div style={{ fontFamily: SX.body, fontSize: 15, fontWeight: 500, color: SX.ink, lineHeight: 1.3 }}>{link.label}</div>
      {link.desc && (
        <div style={{ fontFamily: SX.body, fontSize: 13, lineHeight: "19px", color: SX.ink3, marginTop: 2 }}>{link.desc}</div>
      )}
    </a>
  );
}

function NavStyles() {
  return (
    <style>{`
      .sx-nav-item { transition: background 0.18s ease; }
      .sx-nav-item:hover { background: ${SX.bgAlt}; }
      .sx-nav-feature { transition: border-color 0.2s ease, transform 0.2s ease; }
      .sx-nav-feature:hover { border-color: ${SX.accent}; transform: translateY(-1px); }
      .sx-nav-panel { animation: sx-nav-in 0.16s cubic-bezier(0.22,1,0.36,1); }
      @keyframes sx-nav-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
      @media (prefers-reduced-motion: reduce) {
        .sx-nav-panel { animation: none; }
        .sx-nav-feature:hover { transform: none; }
      }

      @media (max-width: 1080px) {
        .sx-nav-inner { padding: 12px 20px !important; gap: 16px; }
        .sx-nav-links, .sx-nav-login { display: none !important; }
        .sx-nav-demo { padding: 9px 14px !important; font-size: 14px !important; }
      }
      @media (max-width: 520px) {
        .sx-nav-demo { display: none !important; }
      }
      @media (max-width: 380px) {
        .sx-nav-start { padding: 9px 14px !important; font-size: 14px !important; }
      }
    `}</style>
  );
}
