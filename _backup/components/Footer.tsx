"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { getFooterCategories } from "@/lib/navigation/footerLinks";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const categories = getFooterCategories();

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const anchor = href.substring(1);
    if (pathname === "/") {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#0F0E0D",
        padding: "64px 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top row: Logo + copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <Image
              src="/assets/branding/trimmed-logo-white.png"
              alt="CaseDelta"
              width={120}
              height={28}
              style={{ height: 24, width: "auto", opacity: 0.5, marginBottom: 12 }}
            />
            <p
              style={{
                fontFamily: '"CaseDelta Sans", sans-serif',
                fontSize: 13,
                color: "#8F8B85",
              }}
            >
              © {new Date().getFullYear()} CaseDelta. All rights reserved.
            </p>
          </div>
        </div>

        {/* Footer columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 16,
          }}
        >
          {categories.map((category) => (
            <div key={category.title}>
              <h3
                style={{
                  fontFamily: '"CaseDelta Sans", sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#8F8B85",
                  letterSpacing: "-0.14px",
                  marginBottom: 16,
                }}
              >
                {category.title}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {category.links.map((link, i) => (
                  <li key={`${category.title}-${i}`}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        style={{
                          fontFamily: '"CaseDelta Sans", sans-serif',
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#FAFAF9",
                          textDecoration: "none",
                          lineHeight: 1.3,
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                      >
                        {link.label}{" "}
                        <span style={{ color: "#8F8B85" }}>→</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        style={{
                          fontFamily: '"CaseDelta Sans", sans-serif',
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#FAFAF9",
                          textDecoration: "none",
                          lineHeight: 1.3,
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                      >
                        {link.label}{" "}
                        <span style={{ color: "#8F8B85" }}>→</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
