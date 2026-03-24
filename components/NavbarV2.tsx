"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ACCENT = "#2563EB";
const ACCENT_DEEP = "#1D4ED8";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/* ─── Spring configs ─── */
const springSnappy = { type: "spring" as const, stiffness: 500, damping: 30 };
const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

export function NavbarV2() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 80) {
        setIsVisible(true);
      } else if (y > lastScrollY + 5) {
        setIsVisible(false);
      } else if (y < lastScrollY - 5) {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Security", href: "/#security" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 100,
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {/* Arrow nudge on CTA hover — CSS since Framer can't target children */}
      <style>{`
        .cd-cta-arrow {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cd-btn-cta:hover .cd-cta-arrow {
          transform: translateX(3px);
        }
      `}</style>

      <nav
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
      >
        <div
          style={{
            position: "relative",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 clamp(24px, 4vw, 48px)",
          }}
        >
          {/* Background bounded by ruler lines */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "clamp(8px, calc(4vw - 16px), 32px)",
              right: "clamp(8px, calc(4vw - 16px), 32px)",
              backgroundColor: (scrolled || navHovered) ? "rgba(255, 255, 255, 0.95)" : "transparent",
              backdropFilter: (scrolled || navHovered) ? "blur(16px)" : "none",
              WebkitBackdropFilter: (scrolled || navHovered) ? "blur(16px)" : "none",
              borderLeft: (scrolled || navHovered) ? "1px solid #EDEDED" : "1px solid transparent",
              borderRight: (scrolled || navHovered) ? "1px solid #EDEDED" : "1px solid transparent",
              borderBottom: (scrolled || navHovered) ? "1px solid #EDEDED" : "1px solid transparent",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              boxShadow: (scrolled || navHovered) ? "0 2px 16px rgba(0, 0, 0, 0.06)" : "0 0 0 rgba(0, 0, 0, 0)",
              transition: "all 0.3s ease",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 80,
            }}
          >
          {/* Left: Logo + Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {/* Logo with subtle hover breathe */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/assets/branding/casedelta-logo-full.png"
                  alt="CaseDelta"
                  width={180}
                  height={42}
                  priority
                  style={{ height: 32, width: "auto" }}
                />
              </Link>
            </motion.div>

            <div
              className="hidden md:flex"
              style={{ alignItems: "center", gap: 2 }}
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <motion.span
                    style={{
                      display: "block",
                      fontFamily: FONT,
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#0A0A0A",
                      padding: "8px 14px",
                      borderRadius: 8,
                      letterSpacing: "-0.01em",
                      cursor: "pointer",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      scale: 0.97,
                    }}
                    transition={springSnappy}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Sign in + CTA */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 10 }}
          >
            {/* Sign in */}
            <Link href="https://app.casedelta.com" style={{ textDecoration: "none" }}>
              <motion.span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#0A0A0A",
                  height: 40,
                  padding: "0 18px",
                  borderRadius: 5,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                }}
                whileHover={{
                  y: -2,
                  borderColor: "#C8C8C8",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
                whileTap={{
                  y: 0,
                  scale: 0.97,
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
                }}
                transition={springBounce}
              >
                Sign in
              </motion.span>
            </Link>

            {/* CTA */}
            <motion.a
              href="https://app.casedelta.com/signup"
              className="cd-btn-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontFamily: FONT,
                height: 40,
                padding: "0 18px",
                backgroundColor: ACCENT,
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 500,
                borderRadius: 5,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: `0 1px 3px ${ACCENT}20`,
              }}
              whileHover={{
                y: -2,
                backgroundColor: ACCENT_DEEP,
                boxShadow: `0 6px 20px ${ACCENT}35`,
              }}
              whileTap={{
                y: 0,
                scale: 0.97,
                boxShadow: `0 2px 6px ${ACCENT}25`,
              }}
              transition={springBounce}
            >
              Get Started
              <svg className="cd-cta-arrow" width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1A1A1A",
              padding: 8,
              borderRadius: 8,
            }}
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.9 }}
            transition={springSnappy}
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#FFFFFF",
            zIndex: 9999,
            padding: "88px 28px 28px",
            overflowY: "auto",
          }}
        >
          <motion.button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              color: "#1A1A1A",
              cursor: "pointer",
              padding: 8,
              borderRadius: 8,
            }}
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.85 }}
            transition={springSnappy}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>

          <nav style={{ display: "flex", flexDirection: "column" }}>
            {navLinks.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ...springSnappy }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: FONT,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    textDecoration: "none",
                    padding: "16px 0",
                    borderBottom: "1px solid #F0F0F0",
                    letterSpacing: "-0.01em",
                    display: "block",
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...springSnappy }}
            style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}
          >
            <Link
              href="https://app.casedelta.com"
              style={{
                fontFamily: FONT,
                display: "block",
                textAlign: "center",
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 500,
                color: "#0A0A0A",
                border: "1px solid #E0E0E0",
                borderRadius: 5,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Sign in
            </Link>
            <a
              href="https://app.casedelta.com/signup"
              style={{
                fontFamily: FONT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 500,
                backgroundColor: ACCENT,
                color: "#FFFFFF",
                borderRadius: 5,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      )}
    </div>
  );
}
