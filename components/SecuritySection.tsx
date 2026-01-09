"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Award, Scale } from "lucide-react";
import Link from "next/link";

export function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = [
    { icon: ShieldCheck, label: "PII-Safe" },
    { icon: Award, label: "SOC 2 & HIPAA Certified" },
    { icon: Scale, label: "State Bar Approved" },
  ];

  // Cycle through features every 3 seconds
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, features.length]);

  return (
    <section
      id="security"
      ref={ref}
      className="section"
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        padding: "18rem 0",
      }}
    >
      <div className="flex items-center justify-center px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center max-w-6xl">
          {/* Left: Heading and Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-col items-start"
          >
            {/* Main Heading */}
            <h2
              className="mb-6"
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                color: "#FFFFFF",
              }}
            >
              Security & Confidentiality First.
            </h2>

            {/* Subheading */}
            <p
              className="mb-12"
              style={{
                fontSize: "var(--font-size-large)",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Your clients' data stays completely confidential. No third-party AI services, no data leaving our systems, no exceptions.
            </p>

            {/* Learn More Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/ai-policy"
                className="inline-flex items-center gap-2 group"
                style={{
                  fontSize: "var(--font-size-large)",
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s ease-in-out",
                  opacity: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <span>Our AI and security policy</span>
                <span className="group-hover:translate-x-1 transition-transform" style={{ fontSize: "1.25rem" }}>
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Cycling Feature Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
            className="relative h-96 flex items-center justify-center"
            style={{ marginTop: "-3rem" }}
          >
            <AnimatePresence mode="wait">
              {features.map((feature, index) => {
                if (index !== currentFeatureIndex) return null;
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <Icon
                      size={80}
                      className="mb-8"
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        strokeWidth: 1.5,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "clamp(20px, 3vw, 28px)",
                        color: "rgba(255, 255, 255, 0.95)",
                        fontWeight: 400,
                        lineHeight: 1.4,
                      }}
                    >
                      {feature.label}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className="h-1 w-8 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index === currentFeatureIndex
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(255, 255, 255, 0.2)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
