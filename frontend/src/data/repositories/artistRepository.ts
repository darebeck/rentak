import artistsJson from '../content/artists.json';
import type { Artist } from '@/types';

const artists = artistsJson as Artist[];

export const artistRepository = {
  list(): Artist[] {
    return [...artists];
  },

  getById(id: string): Artist | undefined {
    return artists.find((a) => a.id === id);
  },

  /** Artists linked to one art form — the Heritage screen's artist rows. */
  listByArtForm(artFormId: string): Artist[] {
    return artists.filter((a) => a.artFormIds.includes(artFormId));
  },
};