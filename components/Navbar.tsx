"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { navigationData } from "./navigation/navigationData";
import { CTA, CTA_URLS } from "@/lib/constants/cta";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasReachedWorkflow, setHasReachedWorkflow] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [lastIndicatorPosition, setLastIndicatorPosition] = useState({
    left: 0,
    width: 0,
  });
  const [dropdownContentKey, setDropdownContentKey] = useState<string>("");
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState<string | null>(null);
  const navbarInnerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Watch for when the workflow section comes into view
  useEffect(() => {
    const setupObserver = () => {
      const workflowSection = document.getElementById("workflow-section");
      if (!workflowSection) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Once the section is reached, keep it true (don't set back to false)
          if (entry.isIntersecting) {
            setHasReachedWorkflow(true);
          }
        },
        { threshold: 0, rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(workflowSection);
      return observer;
    };

    // Try immediately
    let observer = setupObserver();

    // If element not found, retry after a short delay
    if (!observer) {
      const timeout = setTimeout(() => {
        observer = setupObserver();
      }, 100);

      return () => {
        clearTimeout(timeout);
        observer?.disconnect();
      };
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar when near the top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Only hide navbar if we've reached the workflow section
      if (!hasReachedWorkflow) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // After reaching workflow section, hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hasReachedWorkflow]);

  // Update dropdown content with animation key
  useEffect(() => {
    if (openDropdownId) {
      // Delay to allow smooth fade-out before content swap
      const timer = setTimeout(() => {
        setDropdownContentKey(openDropdownId);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // Clear content after dropdown closes
      const timer = setTimeout(() => {
        setDropdownContentKey("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [openDropdownId]);

  // Animated underline indicator
  useEffect(() => {
    if (!hoveredItem || !navbarInnerRef.current) {
      // Keep the last position, just fade out opacity
      setIndicatorStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));
      return;
    }

    const itemElement = itemRefs.current.get(hoveredItem);
    if (!itemElement) return;

    const navbarRect = navbarInnerRef.current.getBoundingClientRect();
    const itemRect = itemElement.getBoundingClientRect();

    const newPosition = {
      left: itemRect.left - navbarRect.left,
      width: itemRect.width,
    };

    // Save the last position for smooth transitions
    setLastIndicatorPosition(newPosition);

    setIndicatorStyle({
      ...newPosition,
      opacity: 1,
    });
  }, [hoveredItem]);

  // Handle scrolling to anchor on page load
  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const scrollToElement = () => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    // Try immediately first
    if (scrollToElement()) return;

    // If not found, wait for it to appear in DOM
    const observer = new MutationObserver(() => {
      if (scrollToElement()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup after 5 seconds max
    const timeout = setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname]);

  // Handle cross-page anchor navigation
  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpenDropdownId(null);

    // Check if the link is an anchor link (starts with /#)
    if (href.startsWith("/#")) {
      const anchor = href.substring(1); // Get the hash part (e.g., #ai-reminders)

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
        // Navigate to homepage with hash, the useEffect above will handle scrolling
        router.push(href);
      }
    } else {
      // Regular navigation
      router.push(href);
    }
  };

  const logoSrc = theme === "dark"
    ? "/assets/branding/trimmed-logo-white.png"
    : "/assets/branding/trimmed-logo.png";

  const navBgColor = theme === "dark"
    ? "rgba(13, 13, 13, 0.95)"
    : "rgba(255, 255, 255, 0.95)";

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <nav
        className="border-b backdrop-blur-md"
        style={{
          backgroundColor: navBgColor,
          borderColor: "var(--color-border)",
        }}
      >
        <div className="container">
          <div ref={navbarInnerRef} className="flex items-center justify-between h-24 relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link
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
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navigationData.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setHoveredItem(item.id);
                  if (item.dropdown) {
                    setOpenDropdownId(item.id);
                  } else {
                    setOpenDropdownId(null);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                }}
              >
                {item.dropdown ? (
                  <button
                    className="flex items-center gap-1 py-2 px-1"
                    style={{
                      fontSize: "var(--font-size-base)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--color-text-secondary)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 0.2s ease-in-out",
                      opacity: 1,
                    }}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.id, el);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-text-high-contrast)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="transition-transform"
                      style={{
                        transform: openDropdownId === item.id ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="py-2 px-1"
                    style={{
                      fontSize: "var(--font-size-base)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease-in-out",
                      opacity: 1,
                    }}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.id, el);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-text-high-contrast)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Animated underline indicator - positioned at navbar bottom edge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
          >
            <div
              style={{
                position: "absolute",
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                height: "100%",
                backgroundColor: "var(--color-text-high-contrast)",
                opacity: indicatorStyle.opacity,
                transition: "left 0.5s cubic-bezier(0.33, 1, 0.68, 1), width 0.5s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.3s ease-in-out",
                willChange: "transform, opacity",
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
            }}
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={CTA_URLS.SIGN_IN}
              className="hidden sm:block px-5 py-2.5 rounded-lg"
              style={{
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s ease-in-out",
                opacity: 1,
              }}
              ref={(el) => {
                if (el) itemRefs.current.set("sign-in", el);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text-high-contrast)";
                e.currentTarget.style.opacity = "1";
                setHoveredItem("sign-in");
                setOpenDropdownId(null);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.opacity = "1";
                setHoveredItem(null);
              }}
            >
              {CTA.SIGN_IN}
            </Link>
            <button
              onClick={(e) => handleAnchorClick(e, `/${CTA_URLS.GET_STARTED}`)}
              className="px-6 py-2.5 rounded-lg cursor-pointer border-none"
              style={{
                backgroundColor: "var(--color-button-primary)",
                color: "var(--color-button-primary-text)",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-medium)",
                opacity: 1,
                transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                setOpenDropdownId(null);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {CTA.GET_STARTED}
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Dropdown Section - Appears BELOW navbar (Desktop only) */}
      <div
        className="hidden md:block border-t border-b"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          paddingTop: openDropdownId ? "32px" : "0px",
          paddingBottom: openDropdownId ? "32px" : "0px",
          opacity: openDropdownId ? 1 : 0,
          maxHeight: openDropdownId ? "600px" : "0px",
          overflow: "hidden",
          transition: "padding-top 0.5s cubic-bezier(0.4, 0, 0.2, 1), padding-bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-out, max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: openDropdownId ? "auto" : "none",
        }}
        onMouseEnter={() => openDropdownId && setOpenDropdownId(openDropdownId)}
        onMouseLeave={() => setOpenDropdownId(null)}
      >
        <div className="container">
          <div
            key={dropdownContentKey}
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              maxWidth: "1200px",
              margin: "0 auto",
              opacity: dropdownContentKey ? 1 : 0,
              transform: dropdownContentKey ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {dropdownContentKey && navigationData
              .find((item) => item.id === dropdownContentKey)
              ?.dropdown?.flatMap((section) => section.items)
              .map((dropdownItem, index) => {
                const isHovered = hoveredDropdownItem === dropdownItem.title;
                const hasHoveredItem = hoveredDropdownItem !== null;
                const isDimmed = hasHoveredItem && !isHovered;

                return (
                  <Link
                    key={dropdownItem.title}
                    href={dropdownItem.href}
                    className="block p-4 rounded-lg transition-all"
                    style={{
                      textDecoration: "none",
                      animation: `dropdownItemFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.04}s both`,
                      opacity: isDimmed ? 0.35 : 1,
                      transition: "opacity 0.2s ease-in-out",
                    }}
                    onClick={(e) => handleAnchorClick(e, dropdownItem.href)}
                    onMouseEnter={() => setHoveredDropdownItem(dropdownItem.title)}
                    onMouseLeave={() => setHoveredDropdownItem(null)}
                  >
                    <div
                      className="font-semibold mb-1 flex items-center gap-2"
                      style={{
                        fontSize: "var(--font-size-base)",
                        color: "var(--color-text-high-contrast)",
                        lineHeight: "1.4",
                      }}
                    >
                      <span>{dropdownItem.title}</span>
                      <span
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateX(0)" : "translateX(-4px)",
                          transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                        }}
                      >
                        →
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "var(--font-size-small)",
                        color: "var(--color-text-secondary)",
                        lineHeight: "var(--line-height-relaxed)",
                      }}
                    >
                      {dropdownItem.description}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="fixed md:hidden"
            style={{
              top: "96px", // Start below navbar
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "var(--color-background)",
              zIndex: 40, // Below navbar (z-50)
            }}
          >
            <div className="h-full overflow-y-auto px-6 py-8">
              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationData.map((item) => (
                  <div key={item.id}>
                    {item.dropdown ? (
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className="w-full flex items-center justify-between py-4 px-4 rounded-lg"
                              style={{
                                backgroundColor: open ? "var(--color-surface)" : "transparent",
                                fontSize: "var(--font-size-large)",
                                fontWeight: "var(--font-weight-medium)",
                                color: "var(--color-text-high-contrast)",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <span>{item.label}</span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="transition-transform duration-200"
                                style={{
                                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                              >
                                <path
                                  d="M3 4.5L6 7.5L9 4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel
                              className="mt-2 rounded-lg overflow-hidden"
                              style={{
                                backgroundColor: "var(--color-surface)",
                              }}
                            >
                              {item.dropdown.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="p-3 space-y-2">
                                  {section.items?.map((dropdownItem, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      href={dropdownItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block py-5 px-4 rounded-lg transition-colors"
                                      style={{
                                        fontSize: "var(--font-size-base)",
                                        textDecoration: "none",
                                        backgroundColor: "var(--color-background)",
                                        minHeight: "88px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontWeight: "var(--font-weight-semibold)",
                                          color: "var(--color-text-high-contrast)",
                                          marginBottom: "6px",
                                          fontSize: "var(--font-size-large)",
                                        }}
                                      >
                                        {dropdownItem.title}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "var(--font-size-small)",
                                          color: "var(--color-text-secondary)",
                                          lineHeight: "1.5",
                                        }}
                                      >
                                        {dropdownItem.description}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <Link
                        href={item.href || "/"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-4 px-4 rounded-lg"
                        style={{
                          fontSize: "var(--font-size-large)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--color-text-high-contrast)",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA Buttons */}
              <div className="mt-8 pt-8 border-t space-y-3" style={{ borderColor: "var(--color-border)" }}>
                <Link
                  href={CTA_URLS.SIGN_IN}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 px-6 rounded-lg"
                  style={{
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-high-contrast)",
                    backgroundColor: "var(--color-surface)",
                    textDecoration: "none",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {CTA.SIGN_IN}
                </Link>
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleAnchorClick(e, `/${CTA_URLS.GET_STARTED}`);
                  }}
                  className="block w-full text-center py-3 px-6 rounded-lg"
                  style={{
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-button-primary-text)",
                    backgroundColor: "var(--color-button-primary)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {CTA.GET_STARTED}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
