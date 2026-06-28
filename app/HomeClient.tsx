"use client";

import { Hero } from "@/components/marketing/Hero";
import { HomeSections } from "@/components/marketing/HomeSections";
import { FooterV2 } from "@/components/FooterV2";
import { useTheme } from "@/components/VariantProvider";

export default function HomeClient() {
  const theme = useTheme();
  return (
    <main style={{ backgroundColor: theme.canvas, color: theme.ink }}>
      <Hero />
      <HomeSections />
      <FooterV2 theme={theme} />
    </main>
  );
}
