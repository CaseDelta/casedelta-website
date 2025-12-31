"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section"
      style={{
        backgroundColor: "var(--color-background)",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            className="mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{
              lineHeight: "var(--line-height-tight)",
              fontWeight: "var(--font-weight-regular)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-text-high-contrast)",
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="max-w-2xl mx-auto"
              style={{
                fontSize: "var(--font-size-large)",
                lineHeight: "var(--line-height-relaxed)",
                color: "var(--color-text-secondary)",
              }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
