"use client";

import Link from "next/link";
import Image from "next/image";

const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export function FooterV2() {
  return (
    <footer
      style={{
        fontFamily: FONT,
        borderTop: `1px solid ${BORDER}`,
        padding: "48px 0",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 48px)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Left: Logo + copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Image
            src="/assets/branding/casedelta-logo-full.png"
            alt="CaseDelta"
            width={120}
            height={28}
            style={{ height: 22, width: "auto", opacity: 0.6 }}
          />
          <span style={{ fontSize: 12, color: "#BBB" }}>
            © {new Date().getFullYear()} CaseDelta
          </span>
        </div>

        {/* Right: Links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Sign in", href: "https://app.casedelta.com" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: 13,
                color: "#999",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#555"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#999"; }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
