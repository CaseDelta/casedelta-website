import Link from "next/link";
import { getFooterCategories } from "@/lib/navigation/footerLinks";

export function Footer() {
  const categories = getFooterCategories();

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
                          }}
                          className="hover:opacity-70 transition-opacity"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          scroll={link.href.startsWith("/#") ? false : undefined}
                          style={{
                            fontSize: "var(--font-size-base)",
                            color: "var(--color-text-primary)",
                            textDecoration: "none",
                          }}
                          className="hover:opacity-70 transition-opacity"
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
