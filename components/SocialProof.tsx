"use client";

import { motion } from "framer-motion";

export default function SocialProof() {
  // Fictional law firm names for visual demonstration
  const customers = [
    "Morrison & Chen",
    "Hartley Associates",
    "Sterling Legal Group",
    "Blackwood & Partners",
    "Riverside Law"
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--color-background)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "4rem 0",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="text-center"
        >
          <p
            className="mb-12"
            style={{
              fontSize: "var(--font-size-base)",
              fontWeight: "var(--font-weight-regular)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
            }}
          >
            Built for Legal Practices
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-8 max-w-5xl mx-auto">
            {customers.map((customer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="flex items-center justify-center"
                style={{
                  minWidth: "120px",
                  minHeight: "44px",
                }}
              >
                <span
                  className="cursor-default"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-tertiary)",
                    fontWeight: "var(--font-weight-medium)",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s ease-in-out",
                    opacity: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text-high-contrast)";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-tertiary)";
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  {customer}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
