import tipsJson from '../content/tips.json';
import type { CulturalTip } from '@/types';

const tips = tipsJson as CulturalTip[];

/** Days elapsed since 1 January of `date`'s year. */
function dayOfYear(date: Date): number {
  const startOfYear = Date.UTC(date.getFullYear(), 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((today - startOfYear) / 86_400_000);
}

export const tipRepository = {
  list(): CulturalTip[] {
    return [...tips];
  },

  /**
   * One tip per calendar day, cycling through the list.
   *
   * Picking by day-of-year keeps the tip stable for the whole day and identical
   * across restarts, without persisting anything — which matters because a tip
   * that changed on every re-render would be distracting.
   */
  getTipOfTheDay(now: Date = new Date()): CulturalTip {
    return tips[dayOfYear(now) % tips.length];
  },
};