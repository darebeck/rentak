import helpJson from '../content/helpArticles.json';
import type { HelpArticle } from '@/types';

const helpArticles = helpJson as HelpArticle[];

/**
 * Questions and the screens that answer them. There is no body to fetch — 38
 * deliberately opens the screen that resolves a question rather than prose
 * about it, which is why the type has no body field.
 */
export const helpRepository = {
  list(): HelpArticle[] {
    return [...helpArticles];
  },

  getById(id: string): HelpArticle | undefined {
    return helpArticles.find((h) => h.id === id);
  },
};
