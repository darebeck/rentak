import articlesJson from '../content/articles.json';
import type { Article, ArticleKind } from '@/types';

const articles = articlesJson as Article[];

export const articleRepository = {
  list(): Article[] {
    return [...articles];
  },

  getById(id: string): Article | undefined {
    return articles.find((a) => a.id === id);
  },

  /** 14 Heritage splits its reading by kind: one story, several two-minute reads. */
  listByKind(kind: ArticleKind): Article[] {
    return articles.filter((a) => a.kind === kind);
  },

  listByArtForm(artFormId: string): Article[] {
    return articles.filter((a) => a.artFormIds.includes(artFormId));
  },
};
