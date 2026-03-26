"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { HeroV2, getHasPlayedIntro } from "@/components/HeroV2";
import { HeroDeco } from "@/components/HeroDecorations";
import { BelowFold } from "@/components/BelowFold";
import { FooterV2 } from "@/components/FooterV2";

export default function Home() {
  const [skipIntro, setSkipIntro] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skip = getHasPlayedIntro();
    if (skip) {
      setSkipIntro(true);
      setNavVisible(true);
    } else {
      window.dispatchEvent(new Event("cd:nav-hide"));
    }
    setMounted(true);
    return () => {
      window.dispatchEvent(new Event("cd:nav-show"));
    };
  }, []);

  // Manual scroll progress — only starts tracking after content is visible
  useEffect(() => {
    if (!navVisible) return;
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(window.scrollY / scrollable);
      }
    };
    // Wait a frame for the DOM to update with full height
    requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navVisible]);

  const handleReveal = useCallback(() => {
    setNavVisible(true);
    window.dispatchEvent(new Event("cd:nav-show"));
  }, []);

  const deco = <HeroDeco />;

  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: "#2563EB",
          transformOrigin: "0%",
          transform: `scaleX(${scrollProgress})`,
          opacity: (navVisible && scrollProgress > 0.001) ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 200,
          willChange: "transform",
        }}
      />
      <HeroV2 onReveal={handleReveal} deco={deco} skipIntro={mounted && skipIntro} />
      <div style={{
        height: navVisible ? "auto" : 0,
        overflow: navVisible ? "visible" : "hidden",
        opacity: navVisible ? 1 : 0,
        transition: "opacity 0.8s ease 0.3s",
        pointerEvents: navVisible ? "auto" : "none",
      }}>
        <BelowFold />
        <FooterV2 />
      </div>
    </main>
  );
}
