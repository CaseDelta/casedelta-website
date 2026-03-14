"use client";

import { motion } from "framer-motion";
import { CTA_URLS } from "@/lib/constants/cta";

export default function PricingHero() {
  return (
    <section className="relative pb-16 pt-32 md:pb-24 md:pt-40 lg:pt-48 bg-progressive-2">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-6 font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.15] tracking-tight"
        >
          <span className="text-text-high-contrast">Pay for what </span>
          <span className="text-text-secondary">Delta does</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          className="mx-auto max-w-[500px] text-lg leading-[1.7] text-text-secondary"
        >
          No per-seat fees. No contracts. Start with $25 in free credits.
        </motion.p>
      </div>
    </section>
  );
}
