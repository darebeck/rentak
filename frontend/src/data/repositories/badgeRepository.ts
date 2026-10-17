import badgesJson from '../content/badges.json';
import type { Badge } from '@/types';

const badges = badgesJson as Badge[];

/** Badge definitions. Whether one is earned is user state, not content. */
export const badgeRepository = {
  list(): Badge[] {
    return [...badges];
  },

  getById(id: string): Badge | undefined {
    return badges.find((b) => b.id === id);
  },
};
