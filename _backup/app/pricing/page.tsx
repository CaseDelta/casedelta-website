"use client";

import { motion } from "framer-motion";
import PricingHero from "@/components/PricingHero";
import { CTA_URLS } from "@/lib/constants/cta";

const ease = [0.33, 1, 0.68, 1] as const;

const salesLedTiers = [
  {
    name: "Practice",
    price: "$799",
    target: "5-10 attorneys",
    included: "~500 analyses + 200 queries/mo",
  },
  {
    name: "Firm",
    price: "$1,499",
    target: "10-25 attorneys",
    included: "~1,200 analyses + 500 queries/mo",
  },
  {
    name: "Enterprise",
    price: "$2,499",
    target: "25-50 attorneys",
    included: "~2,500 analyses + 1,000 queries/mo",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <PricingHero />

      {/* Self-Serve Track */}
      <section className="bg-progressive-3 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-[900px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p
              className="mb-3 font-medium uppercase tracking-wider text-center"
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-tertiary)",
              }}
            >
              Self-Serve
            </p>
            <h2
              className="font-serif mb-4 text-center"
              style={{
                fontSize: "var(--font-size-h2)",
                color: "var(--color-text-high-contrast)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              Start free. Pay as Delta works.
            </h2>
            <p
              className="mb-10 text-center mx-auto max-w-[600px]"
              style={{
                fontSize: "var(--font-size-large)",
                color: "var(--color-text-secondary)",
                lineHeight: "var(--line-height-relaxed)",
              }}
            >
              Sign up and get $50 in free credits. No credit card required. Delta starts learning your jurisdiction immediately.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Document Analysis",
                price: "$1-3",
                unit: "per document",
                description:
                  "AI classification, anomaly detection, completeness tracking, and cross-document analysis.",
              },
              {
                name: "Case Query",
                price: "$0.50",
                unit: "per query",
                description: "Ask Delta anything about your cases — with source citations from your documents.",
              },
              {
                name: "Case Briefing",
                price: "$5",
                unit: "per briefing",
                description:
                  "Full case summary with findings, flags, and recommended next steps.",
              },
            ].map((unit, index) => (
              <motion.div
                key={unit.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease,
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

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
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
              Start Free — $50 Credit
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sales-Led Tiers */}
      <section className="bg-progressive-2 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-[900px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p
              className="mb-3 font-medium uppercase tracking-wider text-center"
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-tertiary)",
              }}
            >
              For Growing Firms
            </p>
            <h2
              className="font-serif mb-4 text-center"
              style={{
                fontSize: "var(--font-size-h2)",
                color: "var(--color-text-high-contrast)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              Flat firm pricing. Your whole team gets access.
            </h2>
            <p
              className="mb-10 text-center mx-auto max-w-[600px]"
              style={{
                fontSize: "var(--font-size-large)",
                color: "var(--color-text-secondary)",
                lineHeight: "var(--line-height-relaxed)",
              }}
            >
              Every other legal AI charges per seat. Delta charges per firm. The more your team uses it, the more Delta learns.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {salesLedTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease,
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
                    {tier.name}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {tier.target} &middot; {tier.included}
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
                    {tier.price}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    /month flat
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
            A paralegal costs $50-70K/year fully loaded — and takes everything when they leave. Delta costs a fraction of that, and everything it learns stays permanently.
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
            transition={{ duration: 0.6, ease }}
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
                  "Persistent institutional memory — Delta learns and remembers",
                  "Morning briefings across all active cases",
                  "Clio, Google Drive, and email integrations",
                  "Full audit trail — every action logged for bar compliance",
                  "Jurisdiction intelligence for your courts and practice area",
                  "Secure client portal for document uploads",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease,
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
