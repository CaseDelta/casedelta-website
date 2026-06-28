/**
 * Variant system public surface.
 *
 * Two independent axes (design + copy), three faithful design themes, a thin
 * SSR-safe resolver, and the PostHog flag contract. See the individual modules
 * for detail; import from "@/lib/variants" everywhere.
 */
export * from "./types";
export * from "./constants";
export * from "./themes";
export * from "./copy";
export * from "./resolve";
