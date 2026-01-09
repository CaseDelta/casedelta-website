"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StatProps {
  value: string;
  description: string;
}

function Stat({ value, description }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="flex-1 text-center px-8"
    >
      <div
        className="mb-4"
        style={{
          fontSize: "clamp(3rem, 8vw, 5rem)",
          lineHeight: "1",
          fontWeight: "var(--font-weight-regular)",
          color: "#ffffff",
          letterSpacing: "var(--letter-spacing-tight)",
        }}
      >
        {value}
      </div>
      <p
        style={{
          fontSize: "var(--font-size-base)",
          lineHeight: "var(--line-height-relaxed)",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export function QuantifiableImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="section"
      style={{
        backgroundColor: "#000000",
        padding: "12rem 0",
      }}
    >
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-16"
          style={{
            fontSize: "var(--font-size-h2)",
            lineHeight: "var(--line-height-tight)",
            fontWeight: "var(--font-weight-regular)",
            color: "#ffffff",
            letterSpacing: "var(--letter-spacing-tight)",
          }}
        >
          Quantifiable Impact
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <Stat value="70%" description="Reduction in document collection time" />
          <Stat value="$836" description="Value created per case (from hourly rate*)" />
          <Stat value="4 hours" description="Average time saved per case" />
        </div>
      </div>
    </section>
  );
}
