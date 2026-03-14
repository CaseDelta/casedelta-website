"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navigationData } from "./navigation/navigationData";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const anchor = href.substring(1);
      if (pathname === "/") {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 100,
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <nav
        style={{
          backgroundColor: scrolled
            ? "rgba(15, 14, 13, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "background-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            height: 92,
            padding: "0 clamp(24px, 4vw, 48px)",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          {/* Logo — left */}
          <div style={{ justifySelf: "start" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/assets/branding/trimmed-logo-white.png"
                alt="CaseDelta"
                width={180}
                height={42}
                priority
                style={{ height: 36, width: "auto" }}
              />
            </Link>
          </div>

          {/* Desktop Nav — dead center */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: "center",
              gap: 4,
            }}
          >
            {navigationData.map((item) => (
              <Link
                key={item.id}
                href={item.href || "/"}
                onClick={(e) => handleNav(e, item.href || "/")}
                style={{
                  fontFamily:
                    '"CaseDelta Sans", -apple-system, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#FAFAF9",
                  textDecoration: "none",
                  padding: "8px 16px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.65")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: Login + CTA */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 4, justifySelf: "end" }}
          >
            <Link
              href="https://app.casedelta.com"
              style={{
                fontFamily:
                  '"CaseDelta Sans", -apple-system, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                color: "#FAFAF9",
                textDecoration: "none",
                padding: "8px 28px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.65")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              Login
            </Link>
            <Link
              href="/#get-started"
              onClick={(e) => handleNav(e, "/#get-started")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 36,
                padding: "0 14px",
                backgroundColor: "transparent",
                color: "#FAFAF9",
                fontFamily:
                  '"CaseDelta Sans", -apple-system, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 4,
                border: "1px solid rgba(250,250,249,0.35)",
                textDecoration: "none",
                transition: "background-color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(250,250,249,0.08)";
                e.currentTarget.style.borderColor = "rgba(250,250,249,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(250,250,249,0.35)";
              }}
            >
              Request a Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#FAFAF9",
              padding: 8,
            }}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#0F0E0D",
            zIndex: 9999,
            padding: "100px 32px 32px",
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: 32,
              right: 32,
              background: "none",
              border: "none",
              color: "#FAFAF9",
              fontSize: 24,
              cursor: "pointer",
            }}
            aria-label="Close menu"
          >
            ✕
          </button>

          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navigationData.map((item) => (
              <Link
                key={item.id}
                href={item.href || "/"}
                onClick={(e) => handleNav(e, item.href || "/")}
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#FAFAF9",
                  textDecoration: "none",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="https://app.casedelta.com"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 24px",
                fontSize: 16,
                fontWeight: 500,
                color: "#FAFAF9",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
            <Link
              href="/#get-started"
              onClick={(e) => handleNav(e, "/#get-started")}
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 24px",
                fontSize: 16,
                fontWeight: 500,
                backgroundColor: "#FAFAF9",
                color: "#0F0E0D",
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              Request a Demo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
