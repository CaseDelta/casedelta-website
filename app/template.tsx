"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const OWN_MOTION = new Set(["/", "/privacy", "/terms"]);

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  // The homepage and the legal pages (the redesign promoted from /concept on
  // 2026-09-12) supply their own motion and must keep fixed navigation outside a
  // transformed page wrapper. This also avoids the legacy reduced-motion branch
  // rendering different server and client trees on them.
  if (OWN_MOTION.has(pathname)) return <>{children}</>;

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
