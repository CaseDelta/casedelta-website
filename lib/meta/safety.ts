/**
 * Safety rails for Meta API mutations.
 * Protected entities require --force to mutate. Budget changes have built-in floors/ceilings.
 */

/** Ad sets that should NOT be paused/edited without --force. Currently live, with real spend. */
export const PROTECTED_ADSETS: Record<string, string> = {
  '52531549521005': 'PI_Partners - Copy (live ad set, real spend)',
};

/** Ads inside protected ad sets — pausing one is fine, but flag the action. */
export const LIVE_ADS: Record<string, string> = {
  '52531549521805': 'Partners_Pain-BriefPrepMarathons- Copy 2',
  '52531549521405': 'Partners_Pain-EndlessDiscovery',
  '52531549521605': 'Partners_Pain-BuriedCaseFacts- Copy',
  '52531549520805': 'Partners_Pain-ManualCaseTimelines- Copy 3',
  '52531549521205': 'Partners_Pain-DrowningInRecords-2',
};

export interface BudgetGuardArgs {
  /** Existing daily budget in cents. */
  currentCents: number;
  /** Proposed daily budget in cents. */
  newCents: number;
  /** When true, skip soft checks (still enforces hard floor). */
  force?: boolean;
}

/** Returns null if the change is allowed, or an error message if blocked. */
export function checkBudgetChange(args: BudgetGuardArgs): string | null {
  const { currentCents, newCents, force } = args;

  // Hard floor: refuse anything below $1/day. Always enforced.
  if (newCents < 100) {
    return `Refusing to set daily budget below $1.00 (would effectively pause delivery). Use 'meta:pause' to pause instead.`;
  }

  if (force) return null;

  // Soft ceiling: refuse >10x current without --force
  if (newCents > currentCents * 10) {
    return `New budget ($${(newCents / 100).toFixed(2)}/day) is more than 10× the current budget ($${(currentCents / 100).toFixed(2)}/day). Pass --force if intended.`;
  }

  // Soft warning: warn (don't block) >20% increase per call — Meta recommends max 20%/day to preserve learning phase
  // We don't block this since users may legitimately want larger jumps; just print a notice.
  return null;
}

/** Returns null if pausing is allowed, or an error message. */
export function checkPauseAdSet(adsetId: string, force?: boolean): string | null {
  if (force) return null;
  const label = PROTECTED_ADSETS[adsetId];
  if (label) {
    return `Refusing to pause protected ad set ${adsetId} (${label}) without --force.`;
  }
  return null;
}

/** Format cents to a $X.XX string. */
export function formatDollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
