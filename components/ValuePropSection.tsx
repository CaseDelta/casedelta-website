"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ValuePropSectionProps {
  title: string;
  description: string;
  features: string[];
  imagePath?: string;
  imagePlaceholder?: string;
  reverse?: boolean;
  backgroundColor?: string;
}

export function ValuePropSection({
  title,
  description,
  features,
  imagePath,
  imagePlaceholder = "Feature Illustration",
  reverse = false,
  backgroundColor,
}: ValuePropSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section"
      style={{
        backgroundColor: backgroundColor || "var(--color-background)",
      }}
    >
      <div className="container">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className={reverse ? "lg:col-start-2" : ""}
          >
            <h3
              className="mb-6 text-3xl sm:text-4xl lg:text-[3.5rem]"
              style={{
                lineHeight: "var(--line-height-tight)",
                fontWeight: "400",
                color: "var(--color-text-high-contrast)",
              }}
            >
              {title}
            </h3>

            <p
              className="max-w-lg"
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
            className={`relative ${
              reverse ? "lg:col-start-1 lg:row-start-1" : ""
            }`}
            style={{
              aspectRatio: "16 / 10",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            {imagePath ? (
              <Image
                src={imagePath}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {imagePlaceholder}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
