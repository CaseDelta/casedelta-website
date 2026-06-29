"use client";

import { useEffect } from "react";
import { Hero } from "@/components/marketing/Hero";
import { HomeSections } from "@/components/marketing/HomeSections";
import { FooterV2 } from "@/components/FooterV2";
import { useTheme } from "@/components/VariantProvider";

export default function HomeClient() {
  const theme = useTheme();

  // Sync the page (html/body) background + color-scheme to the active HERO theme so the
  // top overscroll/rubber-band area matches the hero (globals.css otherwise paints a
  // light body). The below-the-fold is a fixed light design and carries its own
  // per-section backgrounds. Restored when navigating away from the homepage.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlBg: html.style.backgroundColor,
      bodyBg: body.style.backgroundColor,
      scheme: html.style.colorScheme,
    };
    html.style.backgroundColor = theme.canvas;
    body.style.backgroundColor = theme.canvas;
    html.style.colorScheme = theme.mode;
    return () => {
      html.style.backgroundColor = prev.htmlBg;
      body.style.backgroundColor = prev.bodyBg;
      html.style.colorScheme = prev.scheme;
    };
  }, [theme.canvas, theme.mode]);

  return (
    <main style={{ backgroundColor: theme.canvas, color: theme.ink }}>
      <Hero />
      <HomeSections />
      {/* Footer is part of the light below-the-fold; give it an explicit light surface
          since `main` is the (dark) hero color. */}
      <div style={{ background: "#ffffff", color: "#14171f" }}>
        <FooterV2 />
      </div>
    </main>
  );
}
