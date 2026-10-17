import festivalsJson from '../content/festivals.json';
import type { Festival } from '@/types';

const festivals = festivalsJson as Festival[];

export const festivalRepository = {
  list(): Festival[] {
    return [...festivals].sort((a, b) => a.startDate.localeCompare(b.startDate));
  },

  getById(id: string): Festival | undefined {
    return festivals.find((f) => f.id === id);
  },

  /** The one Home shows in its hero card. */
  getFeatured(): Festival | undefined {
    return festivals.find((f) => f.isFeatured);
  },

  /** Home's "Because you saved Sape' music" card.
   *  Phase 1: a fixed pick. Phase 2: driven by real user interests. */
  getRecommended(): Festival | undefined {
    return festivals.find((f) => f.id === 'rainforest-2026');
  },

  /**
   * 22's "Next up in your state" line. Phase 1 has no real user-location field
   * yet, so caller passes a fixed placeholder; Phase 2 reads it from the
   * user's profile instead. This function's shape doesn't change either way.
   */
  getNextInState(stateName: string): Festival | undefined {
    const today = new Date().toISOString().slice(0, 10);
    return [ ...festivals]
      .filter((f) => f.location.en.includes(stateName) && f.startDate >= today)
      .sort((a,b) => a.startDate.localeCompare(b.startDate))[0];
  },
};