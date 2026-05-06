type PostHogLike = {
  capture: (event: string, props?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    posthog?: PostHogLike;
  }
}

export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.posthog?.capture(name, props);
}
