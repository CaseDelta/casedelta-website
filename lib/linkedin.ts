/**
 * LinkedIn Insight Tag typing and a user-data helper.
 *
 * NOTHING IMPORTS THIS FILE, and it is still load-bearing. The `declare global` block
 * below is an ambient declaration: TypeScript picks it up from anywhere in the project,
 * and it is what types `window.lintrk` for the call sites that use it directly
 * (app/demo/DemoClient.tsx). Delete the file and those stop type-checking.
 */
type LinTrk = (action: string, data: Record<string, unknown>) => void;

declare global {
  interface Window {
    lintrk?: LinTrk;
  }
}

export function setLinkedInUserData(email: string) {
  if (typeof window === "undefined") return;
  if (typeof window.lintrk !== "function") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;
  window.lintrk("setUserData", { email: normalized });
}
