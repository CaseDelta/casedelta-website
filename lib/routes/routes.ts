/**
 * Centralized Routes Configuration
 *
 * This file defines all routes in the application for:
 * - Type-safe navigation
 * - Automatic route preloading
 * - Consistent URL structure
 */

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PRICING: "/pricing",
  AI_POLICY: "/ai-policy",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  SMS_OPT_IN: "/sms-opt-in",
} as const;

// Extract route values for type safety
export type RouteValue = typeof ROUTES[keyof typeof ROUTES];

/**
 * Get all route paths as an array
 * Used for bulk operations like preloading
 */
export function getAllRoutes(): RouteValue[] {
  return Object.values(ROUTES);
}

/**
 * Get routes that should be preloaded on initial page load
 * Excludes homepage since user is already there
 */
export function getPreloadableRoutes(currentPath: string = "/"): RouteValue[] {
  return getAllRoutes().filter(route => route !== currentPath);
}
