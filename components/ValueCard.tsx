"use client";

import { motion } from "framer-motion";

interface ValueCardProps {
  title: string;
  description: string;
  delay?: number;
}

export default function ValueCard({
  title,
  description,
  delay = 0,
}: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      className="flex min-h-[280px] flex-col rounded-xl border border-border bg-surface p-8"
    >
      <h3 className="mb-3 font-serif text-2xl text-text-high-contrast">
        {title}
      </h3>
      <p className="leading-relaxed text-text-secondary">{description}</p>
    </motion.div>
  );
}
