import galleriesJson from '../content/galleries.json';
import imagesJson from '../content/galleryImages.json';
import type { Gallery, GalleryCategory, GalleryImage } from '@/types';

const galleries = galleriesJson as Gallery[];
const images = imagesJson as GalleryImage[];

export const galleryRepository = {
  list(): Gallery[] {
    return [...galleries];
  },

  getById(id: string): Gallery | undefined {
    return galleries.find((g) => g.id === id);
  },

  /** Every image belongs to an article, so this is the usual way in. */
  byArticle(articleId: string): Gallery | undefined {
    return galleries.find((g) => g.articleId === articleId);
  },

  listImages(galleryId: string): GalleryImage[] {
    return images.filter((i) => i.galleryId === galleryId);
  },

  /** 29's filter tabs. Omit the category for the "All" tab. */
  listImagesByCategory(galleryId: string, category?: GalleryCategory): GalleryImage[] {
    return images.filter(
      (i) => i.galleryId === galleryId && (category === undefined || i.category === category),
    );
  },
};
