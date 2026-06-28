"use client";

import Link from "next/link";
import Image from "next/image";
import type { Theme } from "@/lib/variants";

const FONT = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Compare", href: "/compare" },
  { label: "Answers", href: "/answers" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Book a demo", href: "/demo" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * Footer. Defaults to the light styling used across the standard pages. When a
 * `theme` is passed (the homepage variants), it adopts that theme's tokens so it
 * reads correctly on the dark variants; on dark it shows the serif wordmark
 * instead of the dark-on-transparent logo image.
 */
export function FooterV2({ theme }: { theme?: Theme }) {
  const dark = theme?.mode === "dark";
  const border = theme?.hairline ?? "rgba(20, 23, 31, 0.10)";
  const linkColor = theme ? theme.faint : "#888";
  const linkHover = theme ? theme.ink : "#333";
  const copyColor = theme ? theme.faint : "#BBB";
  const legalColor = theme ? theme.faint : "#AAA";
  const legalHover = theme ? theme.ink : "#555";

  return (
    <footer
      style={{
        fontFamily: FONT,
        borderTop: `1px solid ${border}`,
        padding: "clamp(40px, 6vw, 64px) 0",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
        {/* Top row: Logo + Nav links */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between" style={{ gap: 32 }}>
          <Link href="/" style={{ display: "inline-block", textDecoration: "none" }}>
            {dark ? (
              <span style={{ fontFamily: theme!.serif, fontSize: 22, fontWeight: 400, letterSpacing: "-0.3px", color: theme!.ink }}>
                Case<b style={{ color: theme!.accent, fontWeight: 500 }}>Delta</b>
              </span>
            ) : (
              <Image
                src="/assets/branding/casedelta-logo-full.png"
                alt="CaseDelta"
                width={120}
                height={28}
                style={{ height: 22, width: "auto", opacity: 0.5 }}
              />
            )}
          </Link>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2 lg:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ fontSize: 13, color: linkColor, textDecoration: "none", transition: "color 0.2s ease", letterSpacing: "-0.01em" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = linkHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: border, margin: "clamp(24px, 3vw, 32px) 0" }} />

        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between lg:items-center">
          <span style={{ fontSize: 12, color: copyColor }}>
            © {new Date().getFullYear()} CaseDelta. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ fontSize: 12, color: legalColor, textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = legalHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = legalColor; }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://app.casedelta.com"
              style={{ fontSize: 12, color: legalColor, textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = legalHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = legalColor; }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
