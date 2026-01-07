"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative bg-background py-20 md:py-24">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-8 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-tight tracking-tight text-text-high-contrast"
        >
          Building the future of legal document automation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          className="mx-auto max-w-[700px] text-lg leading-relaxed text-text-secondary"
        >
          CaseDelta was founded on a simple belief: lawyers should spend time
          practicing law, not chasing documents. We're building AI-powered tools
          to eliminate the busywork that holds legal professionals back.
        </motion.p>
      </div>
    </section>
  );
}
