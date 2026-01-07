"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const variants = [
  {
    id: "light-side",
    path: "/light/side",
    name: "Light - Side",
    description: "Light theme with video beside text",
    theme: "light",
  },
  {
    id: "light-bottom",
    path: "/light/bottom",
    name: "Light - Bottom",
    description: "Light theme with video below text",
    theme: "light",
  },
  {
    id: "light-fullscreen",
    path: "/light/fullscreen",
    name: "Light - Fullscreen",
    description: "Light theme with fullscreen video",
    theme: "light",
  },
  {
    id: "dark-side",
    path: "/dark/side",
    name: "Dark - Side",
    description: "Dark theme with video beside text",
    theme: "dark",
  },
  {
    id: "dark-bottom",
    path: "/dark/bottom",
    name: "Dark - Bottom",
    description: "Dark theme with video below text",
    theme: "dark",
  },
];

export default function VariantsPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#FAFAFA",
        padding: "var(--spacing-12)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/"
            style={{
              fontSize: "var(--font-size-small)",
              color: "#666666",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "var(--spacing-8)",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#000000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#666666";
            }}
          >
            ← Back to Home
          </Link>

          <h1
            style={{
              fontSize: "48px",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "#000000",
              marginBottom: "var(--spacing-4)",
            }}
          >
            CaseDelta Variants
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#666666",
              lineHeight: "1.6",
            }}
          >
            Explore different visual approaches for the landing page
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "var(--spacing-6)",
          }}
        >
          {variants.map((variant, index) => (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={variant.path}
                style={{
                  display: "block",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                  padding: "var(--spacing-6)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#000000";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E5E5";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    backgroundColor:
                      variant.theme === "dark" ? "#000000" : "#F5F5F5",
                    borderRadius: "4px",
                    marginBottom: "var(--spacing-4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-small)",
                    color: variant.theme === "dark" ? "#666666" : "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Preview
                </div>

                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "#000000",
                    marginBottom: "var(--spacing-2)",
                  }}
                >
                  {variant.name}
                </h3>

                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "#666666",
                    lineHeight: "1.5",
                  }}
                >
                  {variant.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
