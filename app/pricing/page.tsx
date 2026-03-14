"use client";

import { motion } from "framer-motion";
import PricingHero from "@/components/PricingHero";
import { CTA_URLS } from "@/lib/constants/cta";

const unitPricing = [
  {
    name: "Case Analysis",
    price: "$2",
    unit: "per analysis",
    description:
      "Document review, anomaly detection, and completeness tracking.",
  },
  {
    name: "Query",
    price: "$0.50",
    unit: "per query",
    description: "Ask Delta anything about your cases — with source citations.",
  },
  {
    name: "Case Briefing",
    price: "$5",
    unit: "per briefing",
    description:
      "Full case summary with findings and recommended next steps.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <PricingHero />

      {/* Unit Pricing */}
      <section className="bg-progressive-3 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-[1000px] px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {unitPricing.map((unit, index) => (
              <motion.div
                key={unit.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="flex flex-col rounded-2xl border p-8"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <p
                  className="mb-4 font-medium uppercase tracking-wider"
                  style={{
                    fontSize: "var(--font-size-body)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {unit.name}
                </p>
                <div className="mb-4">
                  <span
                    className="font-serif leading-none tracking-tight"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 3rem)",
                      color: "var(--color-text-high-contrast)",
                    }}
                  >
                    {unit.price}
                  </span>
                  <span
                    className="ml-2"
                    style={{
                      fontSize: "var(--font-size-base)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {unit.unit}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "var(--font-size-body)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "var(--line-height-relaxed)",
                  }}
                >
                  {unit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="mt-12 text-center"
          >
            <a
              href={CTA_URLS.GET_STARTED}
              className="inline-block rounded-lg px-8 py-3"
              style={{
                backgroundColor: "var(--color-button-primary)",
                color: "var(--color-button-primary-text)",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-medium)",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Create Account — $25 Free Credit
            </a>
          </motion.div>
        </div>
      </section>

      {/* What Firms Typically Spend */}
      <section className="bg-progressive-2 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-[900px] px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="font-serif mb-10 text-center"
            style={{
              fontSize: "var(--font-size-h2)",
              color: "var(--color-text-high-contrast)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            What firms like yours typically spend
          </motion.h2>

          <div className="flex flex-col gap-4">
            {[
              {
                label: "Solo / Small Firm",
                size: "1–3 attorneys",
                range: "$75 – 200",
              },
              {
                label: "Growing Firm",
                size: "5–15 attorneys",
                range: "$500 – 2,000",
              },
              {
                label: "Established Firm",
                size: "15–50 attorneys",
                range: "$2,000 – 6,000",
              },
            ].map((firm, index) => (
              <motion.div
                key={firm.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="flex items-center justify-between rounded-2xl border p-6 md:p-8"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <div>
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "var(--font-size-h3)",
                      color: "var(--color-text-high-contrast)",
                    }}
                  >
                    {firm.label}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {firm.size}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "var(--font-size-h3)",
                      color: "var(--color-text-high-contrast)",
                    }}
                  >
                    {firm.range}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    /month typical
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
            style={{
              fontSize: "var(--font-size-large)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--line-height-relaxed)",
            }}
          >
            A paralegal costs $4,000–6,000/month fully loaded. Most firms spend
            less than that with Delta.
          </motion.p>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-progressive-3 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-[900px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <h3
              className="mb-8 text-center font-serif"
              style={{
                fontSize: "var(--font-size-h3)",
                color: "var(--color-text-high-contrast)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              Included with every account
            </h3>

            <div style={{ textAlign: "center" }}>
              <div
                className="flex flex-col gap-6"
                style={{ display: "inline-block", textAlign: "left" }}
              >
                {[
                  "Unlimited cases, clients, and documents",
                  "Secure client portal for document uploads",
                  "Full audit trail — every action logged",
                  "Clio, MyCase, and Google Drive integrations",
                  "SOC 2 & HIPAA compliant",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="flex items-start gap-3"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        color: "var(--color-text-high-contrast)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span
                      style={{
                        fontSize: "var(--font-size-large)",
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.7",
                      }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
