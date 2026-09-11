"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  // The isolated concept supplies its own motion and must keep fixed navigation
  // outside a transformed page wrapper. This also avoids the legacy reduced-motion
  // branch rendering different server and client trees on these preview routes.
  if (pathname === "/concept" || pathname.startsWith("/concept/")) return <>{children}</>;

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
