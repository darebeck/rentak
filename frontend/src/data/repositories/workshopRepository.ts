import workshopsJson from '../content/workshops.json';
import type { Workshop } from '@/types';

const workshops = workshopsJson as Workshop[];

export const workshopRepository = {
  list(): Workshop[] {
    return [...workshops].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  },

  getById(id: string): Workshop | undefined {
    return workshops.find((w) => w.id === id);
  },

  byFestival(festivalId: string): Workshop[] {
    return workshops
      .filter((w) => w.festivalId === festivalId)
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  },
};
