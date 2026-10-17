import venuesJson from '../content/venues.json';
import type { Venue } from '@/types';

const venues = venuesJson as Venue[];

export const venueRepository = {
  list(): Venue[] {
    return [...venues];
  },

  /**
   * Used wherever an Event needs to name its location. Returns `undefined` for
   * an unknown id rather than throwing — the caller decides whether a missing
   * venue is worth hiding the row over.
   */
  getById(id: string): Venue | undefined {
    return venues.find((v) => v.id === id);
  },
};