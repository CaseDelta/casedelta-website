"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { CTA, CTA_URLS } from "@/lib/constants/cta";

interface HeroProps {
  variant?: "side" | "bottom";
}

export function Hero({ variant = "side" }: HeroProps) {
  const isSideLayout = variant === "side";
  const videoRef = useRef(null);

  // Track scroll position for video growth animation (only for bottom variant)
  // Starts when video enters viewport, completes when video reaches center of screen
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "center center"]
  });

  // Transform scroll progress to scale value (1 to 1.15) - only for bottom variant
  const scale = useTransform(scrollYProgress, [0, 1], [1, isSideLayout ? 1 : 1.15]);

  return (
    <section className="section" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="container">
        <div
          className={`${
            isSideLayout
              ? "grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-12 items-center"
              : "flex flex-col items-center text-center max-w-4xl mx-auto"
          }`}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className={isSideLayout ? "" : "mb-12"}
          >
            <h1
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--color-text-high-contrast)",
              }}
            >
              Get documents from clients{" "}
              <span style={{ color: "var(--color-text-secondary)" }}>
                without the follow-up headache
              </span>
            </h1>

            <p
              className={`mb-10 max-w-2xl ${isSideLayout ? "" : "mx-auto"}`}
              style={{
                fontSize: "var(--font-size-large)",
                lineHeight: "var(--line-height-relaxed)",
                color: "var(--color-text-secondary)",
              }}
            >
              CaseDelta uses AI to automatically remind clients, verify
              documents, and ensure you get exactly what you need—faster and
              with zero manual follow-up.
            </p>
          </motion.div>

          {/* Demo Video - with scroll-triggered growth animation */}
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="relative overflow-hidden"
            style={{
              scale,
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-md)",
              aspectRatio: "4 / 3",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              {/* TODO: Replace with actual product demo video */}
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
