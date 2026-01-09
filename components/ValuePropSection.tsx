"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ValuePropSectionProps {
  id?: string;
  title: string;
  description: string;
  imagePath?: string;
  imagePlaceholder?: string;
  reverse?: boolean;
  backgroundColor?: string;
}

// Standardized container styles for consistency across all value prop sections
const IMAGE_CONTAINER_STYLES = {
  aspectRatio: "8 / 5",
  borderRadius: "8px",
  overflow: "hidden" as const,
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08)",
};

const VIDEO_PLACEHOLDER_WRAPPER_STYLES = {
  padding: "1.5rem",
};

const VIDEO_PLACEHOLDER_STYLES = {
  width: "88%",
  height: "82%",
  backgroundColor: "#ffffff",
  border: "3px solid rgba(58, 58, 58, 0.5)",
  borderRadius: "4px",
  display: "flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
};

export function ValuePropSection({
  id,
  title,
  description,
  imagePath,
  imagePlaceholder = "Feature Illustration",
  reverse = false,
  backgroundColor,
}: ValuePropSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className="section"
      style={{
        backgroundColor: backgroundColor || "var(--color-background)",
        paddingTop: "3.5rem",
        paddingBottom: "12rem",
        scrollMarginTop: "100px",
      }}
    >
      <div className="container">
        <div
          className={`grid grid-cols-1 gap-20 items-center ${
            reverse ? "lg:grid-cols-[1fr_460px]" : "lg:grid-cols-[460px_1fr]"
          }`}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className={reverse ? "lg:order-2" : "lg:order-1"}
          >
            <h3
              className="mb-6 text-3xl sm:text-4xl lg:text-5xl"
              style={{
                lineHeight: "var(--line-height-tight)",
                fontWeight: "400",
                color: "#ffffff",
              }}
            >
              {title}
            </h3>

            <p
              className="max-w-md"
              style={{
                fontSize: "var(--font-size-large)",
                lineHeight: "var(--line-height-relaxed)",
                color: "var(--color-text-secondary)",
              }}
            >
              {description}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className={reverse ? "relative lg:order-1" : "relative lg:order-2"}
            style={IMAGE_CONTAINER_STYLES}
          >
            {/* Background image */}
            {imagePath && (
              <Image
                src={imagePath}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}

            {/* White placeholder box with border (video placeholder) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={VIDEO_PLACEHOLDER_WRAPPER_STYLES}
            >
              <div style={VIDEO_PLACEHOLDER_STYLES}>
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "#6b6b6b",
                  }}
                >
                  Video Placeholder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
