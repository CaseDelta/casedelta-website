/**
 * Get the last updated date for legal pages
 * Always returns the previous month from the current date
 *
 * Example: If today is January 15, 2026, returns "December 2025"
 */
export function getLastUpdatedDate(): string {
  const now = new Date();

  // Set to previous month
  now.setMonth(now.getMonth() - 1);

  return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
