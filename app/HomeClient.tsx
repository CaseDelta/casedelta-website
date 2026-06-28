"use client";

import { Hero } from "@/components/marketing/Hero";
import { HomeSections } from "@/components/marketing/HomeSections";
import { FooterV2 } from "@/components/FooterV2";
import { CANVAS } from "@/lib/theme";

export default function HomeClient() {
  return (
    <main style={{ backgroundColor: CANVAS }}>
      <Hero />
      <HomeSections />
      <FooterV2 />
    </main>
  );
}
