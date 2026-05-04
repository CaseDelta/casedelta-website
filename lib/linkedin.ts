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
