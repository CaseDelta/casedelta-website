"use client";

import { useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HeroV2 } from "@/components/HeroV2";
import { NavbarV2 } from "@/components/NavbarV2";
import { HeroDeco } from "@/components/HeroDecorations";
import { BelowFold } from "@/components/BelowFold";
import { FooterV2 } from "@/components/FooterV2";

export default function V2Page() {
  const [navVisible, setNavVisible] = useState(false);

  const handleReveal = useCallback(() => {
    setNavVisible(true);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const deco = <HeroDeco />;

  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      {/* Scroll progress bar — always visible */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: "#2563EB",
          transformOrigin: "0%",
          scaleX: smoothProgress,
          zIndex: 200,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={navVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: navVisible ? "auto" : "none" }}
      >
        <NavbarV2 />
      </motion.div>
      <HeroV2 onReveal={handleReveal} deco={deco} />
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
