"use client";

/**
 * Page-level sticky nav (matches the live Sasonix behavior): fixed to the top,
 * transparent with white text over the hero, transitioning to white-bg / dark-text
 * once scrolled past the hero. Geometry measured from the live site: flex
 * space-between row, content 80..1360 (max-width 1360, 40px gutter), 32px link gaps.
 */
import { useEffect, useState } from "react";
import { SX } from "./tokens";

const LINKS = ["All Pages", "Pricing", "Case Studies", "Contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 880);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fg = scrolled ? SX.ink : "#ffffff";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "saturate(1.3) blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(1.3) blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? SX.hairline : "transparent"}`,
        boxShadow: scrolled ? "0 10px 30px -12px rgba(26, 23, 18, 0.16)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* logo */}
        <a href="/v2" className="sx-logo" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span aria-hidden style={{ width: 34, height: 34, borderRadius: 9, background: SX.orange, display: "grid", placeItems: "center" }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 3l3.2 5.5H8.8L12 3zM6 10.5l3.2 5.5H2.8L6 10.5zm12 0l3.2 5.5h-6.4L18 10.5z" /></svg>
          </span>
          <span style={{ fontFamily: SX.body, fontWeight: 600, fontSize: 24, letterSpacing: "-0.4px", color: fg, transition: "color 0.3s ease" }}>Sasonix</span>
        </a>
        {/* links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {LINKS.map((l, i) => (
            <a key={l} href="#" className="sx-navlink" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SX.body, fontSize: 16, fontWeight: 400, color: fg, textDecoration: "none", transition: "color 0.3s ease" }}>
              {l}
              {i === 0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s ease" }}><path d="M6 9l6 6 6-6" /></svg>}
            </a>
          ))}
        </div>
        {/* actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <a href="#" className="sx-navlink" style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 400, color: fg, textDecoration: "none", transition: "color 0.3s ease" }}>Login</a>
          <a href="#" className="sx-btn" style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: "#fff", background: SX.ink, borderRadius: 12, padding: "13px 20px", textDecoration: "none", whiteSpace: "nowrap" }}>Create Free Account</a>
        </div>
      </div>
    </header>
  );
}
