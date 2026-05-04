"use client";

import { DemoBody } from "@/components/demo/DemoBody";
import { FooterV2 } from "@/components/FooterV2";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/**
 * /book-demo: organic, on-site booking page. Includes the global NavbarV2
 * (rendered by ClientLayout for non-/demo routes) and the standard FooterV2
 * for full site-chrome continuity. Top section padding clears the 80px
 * fixed navbar.
 */
export function BookDemoClient() {
  return (
    <main
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: FONT,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <section
        style={{
          flex: 1,
          position: "relative",
          padding: "clamp(112px, 12vw, 144px) 0 clamp(48px, 6vw, 72px)",
        }}
      >
        <DemoBody conversionSource="book_demo_page" />
      </section>

      <FooterV2 />
    </main>
  );
}
