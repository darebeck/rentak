import challengesJson from '../content/challenges.json';
import type { Challenge } from '@/types';

const challenges = challengesJson as Challenge[];

/**
 * Challenge *definitions* only. How far a user has got is user state and lives
 * in `data/store/` — 15, 16, 19 and 31 all render the same progress, and they
 * can only agree if there is one source for it.
 */
export const challengeRepository = {
  list(): Challenge[] {
    return [...challenges];
  },

  getById(id: string): Challenge | undefined {
    return challenges.find((c) => c.id === id);
  },
};
