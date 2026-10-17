/**
 * The seam. Screens and features read content ONLY through these — never from
 * `data/content/` directly. In Phase 2 the bodies of these repositories switch
 * to reading a synced local cache; nothing above this file changes.
 */
export { festivalRepository } from './festivalRepository';
export { eventRepository } from './eventRepository';
export { artFormRepository } from './artFormRepository';
export { artistRepository } from './artistRepository';
export { venueRepository } from './venueRepository';
export { lessonRepository } from './lessonRepository';
export { tipRepository } from './tipRepository';

// v2 entities. These carry `list`/`getById` plus the obvious relations only —
// the filtered and searched queries (festival filters, storyOfTheWeek, venue
// proximity) arrive with the screens that define them, in docs 10–14.
export { articleRepository } from './articleRepository';
export { galleryRepository } from './galleryRepository';
export { workshopRepository } from './workshopRepository';
export { challengeRepository } from './challengeRepository';
export { badgeRepository } from './badgeRepository';
export { notificationRepository } from './notificationRepository';
export { helpRepository } from './helpRepository';

export type { LessonProgress } from './lessonRepository';