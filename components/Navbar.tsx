"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Get initial theme
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" || "light";
    setTheme(currentTheme);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" || "light";
      setTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const logoSrc = theme === "dark"
    ? "/assets/branding/trimmed-logo-white.png"
    : "/assets/branding/trimmed-logo.png";

  const navBgColor = theme === "dark"
    ? "rgba(13, 13, 13, 0.95)"
    : "rgba(255, 255, 255, 0.95)";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: navBgColor,
        borderColor: "var(--color-border)",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-2"
            >
              <Image
                src={logoSrc}
                alt="CaseDelta"
                width={240}
                height={56}
                priority
                className="h-14 w-auto"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="transition-colors hover:opacity-80"
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:opacity-80"
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="transition-colors hover:opacity-80"
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              className="hidden sm:block px-5 py-2.5 rounded-lg transition-all hover:opacity-80"
              style={{
                fontSize: "var(--font-size-body)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--color-text-secondary)",
              }}
            >
              Sign In
            </button>
            <button
              className="px-6 py-2.5 rounded-lg transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--color-button-primary)",
                color: "var(--color-button-primary-text)",
                fontSize: "var(--font-size-body)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
