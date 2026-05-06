type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

export function trackMetaLead(
  params: Record<string, unknown>,
  options?: { eventID?: string }
) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "Lead", params, options);
}

export function setMetaUserData(input: { email?: string; name?: string }) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  if (!META_PIXEL_ID) return;

  const userData: Record<string, string> = {};
  const email = input.email?.trim().toLowerCase();
  if (email) userData.em = email;

  if (input.name) {
    const parts = input.name.trim().split(/\s+/);
    if (parts[0]) userData.fn = parts[0].toLowerCase();
    if (parts.length > 1) userData.ln = parts[parts.length - 1].toLowerCase();
  }

  if (Object.keys(userData).length === 0) return;

  // Re-init to update advanced matching; fbq hashes raw values client-side.
  window.fbq("init", META_PIXEL_ID, userData);
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
