"use client";

import { useRoutePreloader } from "@/hooks/useRoutePreloader";

/**
 * RoutePreloader Component
 *
 * Invisible component that automatically preloads all application routes
 * for instant page transitions. Should be included in root layout.
 *
 * This component:
 * - Renders nothing (null)
 * - Runs on every page
 * - Prefetches all routes in the background
 * - Uses requestIdleCallback to avoid blocking main thread
 */
export function RoutePreloader() {
  useRoutePreloader();
  return null;
}
