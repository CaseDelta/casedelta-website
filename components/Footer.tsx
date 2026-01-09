"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getFooterCategories } from "@/lib/navigation/footerLinks";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const categories = getFooterCategories();

  // Handle cross-page anchor navigation
  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    // Only handle anchor links that start with /#
    if (!href.startsWith("/#")) return;

    e.preventDefault();
    const anchor = href.substring(1); // Get the hash part (e.g., #security)

    // Check if we're on a page that has the anchor (homepage or variant pages)
    const isVariantPath = pathname.startsWith('/dark/') || pathname.startsWith('/light/');
    const isHomepage = pathname === "/";

    // If we're on the homepage or a variant page, just scroll
    if (isHomepage || isVariantPath) {
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to homepage with hash (for pages like /privacy, /terms, etc.)
      router.push(href);
    }
  };

  return (
    <footer
      className="py-16 border-t"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {categories.map((category) => {
            // Skip empty categories
            if (category.links.length === 0) {
              return null;
            }

            return (
              <div key={category.title}>
                <h3
                  className="mb-4 uppercase tracking-wider"
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-text-tertiary)",
                    fontWeight: "var(--font-weight-medium)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          style={{
                            fontSize: "var(--font-size-base)",
                            color: "var(--color-text-primary)",
                            textDecoration: "none",
                            transition: "color 0.2s ease-in-out",
                            opacity: 1,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--color-text-high-contrast)";
                            e.currentTarget.style.opacity = "1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--color-text-primary)";
                            e.currentTarget.style.opacity = "1";
                          }}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          scroll={link.href.startsWith("/#") ? false : undefined}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          style={{
                            fontSize: "var(--font-size-base)",
                            color: "var(--color-text-primary)",
                            textDecoration: "none",
                            transition: "color 0.2s ease-in-out",
                            opacity: 1,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--color-text-high-contrast)";
                            e.currentTarget.style.opacity = "1";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--color-text-primary)";
                            e.currentTarget.style.opacity = "1";
                          }}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="pt-8 border-t text-center"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-tertiary)",
            }}
          >
            © 2026 CaseDelta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
