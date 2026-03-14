"use client";

import { motion } from "framer-motion";
import { CTA_URLS } from "@/lib/constants/cta";

interface SolutionPoint {
  heading: string;
  body: string;
}

interface SolutionPageProps {
  headline: string;
  headlineAccent: string;
  subtitle: string;
  problem: string;
  points: SolutionPoint[];
  closingLine: string;
}

const ease = [0.33, 1, 0.68, 1] as const;

export default function SolutionPage({
  headline,
  headlineAccent,
  subtitle,
  problem,
  points,
  closingLine,
}: SolutionPageProps) {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pb-16 pt-32 md:pb-24 md:pt-40 lg:pt-48 bg-progressive-2">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.15] tracking-tight"
          >
            <span className="text-text-high-contrast">{headline} </span>
            <span className="text-text-secondary">{headlineAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mx-auto max-w-[600px]"
            style={{
              fontSize: "var(--font-size-large)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--line-height-relaxed)",
            }}
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-progressive-3 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-[800px] px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center"
            style={{
              fontSize: "var(--font-size-large)",
              color: "var(--color-text-primary)",
              lineHeight: "var(--line-height-relaxed)",
            }}
          >
            {problem}
          </motion.p>
        </div>
      </section>

      {/* Solution Points */}
      <section className="bg-progressive-2 pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-[900px] px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="font-serif mb-10 text-center"
            style={{
              fontSize: "var(--font-size-h2)",
              color: "var(--color-text-high-contrast)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            What Delta does for you
          </motion.h2>

          <div className="flex flex-col gap-6">
            {points.map((point, index) => (
              <motion.div
                key={point.heading}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease,
                }}
                className="rounded-2xl border p-8"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <h3
                  className="font-serif mb-3"
                  style={{
                    fontSize: "var(--font-size-h3)",
                    color: "var(--color-text-high-contrast)",
                  }}
                >
                  {point.heading}
                </h3>
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-secondary)",
                    lineHeight: "var(--line-height-relaxed)",
                  }}
                >
                  {point.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-progressive-3 pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-[700px] px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-10"
            style={{
              fontSize: "var(--font-size-large)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--line-height-relaxed)",
            }}
          >
            {closingLine}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
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
    </main>
  );
}
