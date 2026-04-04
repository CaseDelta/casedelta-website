"use client";

import Link from "next/link";
import Image from "next/image";

const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function FooterV2() {
  return (
    <footer
      style={{
        fontFamily: FONT,
        borderTop: `1px solid ${BORDER}`,
        padding: "clamp(40px, 6vw, 64px) 0",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Top row: Logo + Nav links */}
        <div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          style={{ gap: 32 }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "inline-block" }}>
            <Image
              src="/assets/branding/casedelta-logo-full.png"
              alt="CaseDelta"
              width={120}
              height={28}
              style={{ height: 22, width: "auto", opacity: 0.5 }}
            />
          </Link>

          {/* Nav links — 2-column grid on mobile, inline on desktop */}
          <div
            className="grid grid-cols-2 gap-x-12 gap-y-2 lg:flex lg:gap-8"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 13,
                  color: "#888",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#333"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: BORDER, margin: "clamp(24px, 3vw, 32px) 0" }} />

        {/* Bottom row: Copyright + Legal */}
        <div
          className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between lg:items-center"
        >
          <span style={{ fontSize: 12, color: "#BBB" }}>
            © {new Date().getFullYear()} CaseDelta. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 12,
                  color: "#AAA",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#555"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#AAA"; }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.casedelta.com"
              style={{
                fontSize: 12,
                color: "#AAA",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#555"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#AAA"; }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
