"use client";

import { motion } from "framer-motion";
import type { DropdownItem } from "./navigationData";

interface DropdownSectionProps {
  items: DropdownItem[];
  index: number;
}

export function DropdownSection({ items, index }: DropdownSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item, itemIndex) => (
        <motion.a
          key={item.title}
          href={item.href}
          className="group p-3 rounded-lg transition-colors"
          style={{
            color: "var(--color-text-secondary)",
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.05 + itemIndex * 0.02,
            ease: [0.33, 1, 0.68, 1],
          }}
          whileHover={{
            backgroundColor: "var(--color-surface-hover)",
            scale: 1.01,
          }}
          whileTap={{ scale: 0.99 }}
        >
          <div
            className="font-medium mb-0.5"
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-high-contrast)",
              transition: "color 150ms ease",
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-tertiary)",
              lineHeight: "var(--line-height-relaxed)",
            }}
          >
            {item.description}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
