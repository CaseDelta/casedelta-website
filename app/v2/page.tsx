"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HeroV2 } from "@/components/HeroV2";
import { NavbarV2 } from "@/components/NavbarV2";
import { HeroDeco } from "@/components/HeroDecorations";

export default function V2Page() {
  const [navVisible, setNavVisible] = useState(false);

  const handleReveal = useCallback(() => {
    setNavVisible(true);
  }, []);

  const deco = <HeroDeco />;

  return (
    <main style={{ backgroundColor: "#FFFFFF" }}>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={navVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: navVisible ? "auto" : "none" }}
      >
        <NavbarV2 />
      </motion.div>
      <HeroV2 onReveal={handleReveal} deco={deco} />
    </main>
  );
}
