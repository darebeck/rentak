import artFormsJson from '../content/artForms.json';
import type { ArtForm } from '@/types';

const artForms = artFormsJson as ArtForm[];

export const artFormRepository = {
  list(): ArtForm[] {
    return [...artForms];
  },

  getById(id: string): ArtForm | undefined {
    return artForms.find((a) => a.id === id);
  },

  /**
   * Resolves a list of ids — what `Festival.artFormIds` and `Artist.artFormIds`
   * hold — into the art forms themselves, preserving the order given.
   * Ids with no match are dropped rather than yielding holes in the array.
   */
  listByIds(ids: string[]): ArtForm[] {
    return ids
      .map((id) => artForms.find((a) => a.id === id))
      .filter((a): a is ArtForm => a !== undefined);
  },
};