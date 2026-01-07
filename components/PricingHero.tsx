"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pb-16 pt-40 md:pb-20 md:pt-48 bg-progressive-2">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-8 font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.15] tracking-tight"
        >
          <span className="text-text-high-contrast">Simple, Transparent </span>
          <span className="text-text-secondary">Pricing</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          className="mx-auto max-w-[600px] text-lg leading-[1.7] text-text-secondary"
        >
          Flat monthly pricing for law firms. No per-seat fees, no hidden costs, no surprises.
        </motion.p>
      </div>
    </section>
  );
}
