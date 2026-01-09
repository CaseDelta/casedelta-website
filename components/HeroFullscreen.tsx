"use client";

import { motion } from "framer-motion";
import { CTA, CTA_URLS } from "@/lib/constants/cta";
import { HERO_CONTENT } from "@/lib/constants/hero";

export function HeroFullscreen() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1
            className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{
              lineHeight: "1.1",
              letterSpacing: "var(--letter-spacing-tight)",
              fontWeight: "400",
              color: "#ffffff",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {HERO_CONTENT.heading}
          </h1>

          <p
            className="mb-10 max-w-2xl mx-auto text-xl sm:text-2xl"
            style={{
              lineHeight: "var(--line-height-relaxed)",
              color: "rgba(255, 255, 255, 0.9)",
              textShadow: "0 2px 15px rgba(0, 0, 0, 0.4)",
            }}
          >
            {HERO_CONTENT.subheading}
          </p>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ opacity: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
