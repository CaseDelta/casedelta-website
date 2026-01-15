/**
 * PageWrapper - Simple wrapper component (no theme management)
 *
 * Theme is managed by the inline script in layout.tsx for reliability.
 * This component is now just a simple wrapper for consistency.
 */

import { ReactNode } from "react";

interface PageWrapperProps {
  theme?: "light" | "dark"; // Kept for API compatibility, but not used
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <>{children}</>;
}
