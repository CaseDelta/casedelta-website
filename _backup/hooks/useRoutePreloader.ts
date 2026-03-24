"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPreloadableRoutes } from "@/lib/routes/routes";

/**
 * Custom hook to preload all application routes
 *
 * This hook automatically prefetches all routes in the application to:
 * - Eliminate navigation delays
 * - Improve perceived performance
 * - Create instant page transitions
 *
 * Preloading happens:
 * 1. On component mount (after initial render)
 * 2. With requestIdleCallback for non-blocking behavior
 * 3. Excludes current route (no need to preload what's already loaded)
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   useRoutePreloader();
 *   return <div>...</div>
 * }
 * ```
 */
export function useRoutePreloader() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Use requestIdleCallback to avoid blocking main thread
    // Falls back to setTimeout if not available (Safari)
    const schedulePreload = (callback: () => void) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(callback);
      } else {
        setTimeout(callback, 1);
      }
    };

    schedulePreload(() => {
      const routesToPreload = getPreloadableRoutes(pathname);

      routesToPreload.forEach((route, index) => {
        // Stagger prefetches slightly to avoid network congestion
        setTimeout(() => {
          router.prefetch(route);
        }, index * 50); // 50ms between each prefetch
      });
    });
  }, [router, pathname]);
}
