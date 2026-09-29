/**
 * Blog presentation helpers.
 *
 * A module of their own, with no "use client", because both a server component (the
 * post page, which needs the reading time before render) and a client component (the
 * cards) call them. A plain function exported from a "use client" module is not
 * callable from the server: React treats it as a client reference and throws
 * "Attempted to call readingTime() from the server".
 */

/**
 * The date, in the reader's locale.
 *
 * The noon timestamp is load-bearing. A bare "2026-08-14" parses as UTC midnight and
 * then renders in the reader's own zone, which shows the previous day to everyone west
 * of Greenwich. Noon is far enough from both edges that no zone crosses it.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Reading time in minutes, at 250 words a minute, floored at one. */
export function readingTime(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 250));
}
