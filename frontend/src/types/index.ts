/**
 * The shared domain model from ../../CLAUDE.md.
 *
 * Two kinds of user-facing string live in this app, and they are modelled
 * differently on purpose:
 *
 *   - UI chrome ("Featured festival", "See all") is global and named, so it is
 *     a key resolved through `t()` from the i18n layer.
 *   - Content text (a festival's name, a venue's area) belongs to a record, so
 *     it travels with the record as a `LocalizedText` and is resolved with
 *     `tx()`.
 *
 * The rule: if the design fixes the set of possible values it is chrome and
 * stays a key; if a content author types it, it is content and is localized.
 * In Phase 2 the Admin Portal edits content text on the record's own form and
 * chrome on a translations screen — these shapes are already what the API will
 * return.
 */

export type Locale = 'ms' | 'en';

/** Text a content author supplies in every supported locale. */
export type LocalizedText = Record<Locale, string>;

export type ArtFormCategory = 'theatre' | 'music' | 'dance' | 'puppetry';

export type MalaysianState = {
  id: string;
  name: LocalizedText;
};

export type Festival = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  artFormIds: string[];
  category: ArtFormCategory;       // fixed union → chrome, stays a key
  secondaryTag?: LocalizedText;    // "Multi-arts", "Sape'", "Wayang Kulit"
  startDate: string;               // ISO 8601, e.g. '2026-08-01'
  endDate: string;
  location: LocalizedText;         // Pulau Pinang / Penang
  imageKey: string;                // names an asset, not text — stays a key
  isFeatured?: boolean;
  isHappeningNow?: boolean;
  stateId: string;
  headlineEventId: string;
  isFreeEntry?: boolean;
};

export type EventType = 'performance' | 'workshop' | 'talk';

export type ScheduleItem = {
  time: string;
  label: LocalizedText;
};

export type Event = {
  id: string;
  festivalId: string;
  title: LocalizedText;
  startsAt: string;                // ISO 8601 with time
  durationMinutes: number;
  venueId: string;
  type: EventType;
  isFree?: boolean;
  imageKey?: string;
  schedule?: ScheduleItem[];
  description?: LocalizedText;
  doorsOpenAt?: string;
};

export type ArtForm = {
  id: string;
  name: LocalizedText;
  origin: LocalizedText;           // "Kelantan · dance drama"
  description: LocalizedText;
  category: ArtFormCategory;
  imageKey: string;
  lessonCourseId?: string;
};

export type WhenFilter = 'week' | 'month' | 'any';

export type Artist = {
  id: string;
  name: string;                    // a proper noun — the same in both locales
  role: LocalizedText;             // "Mak Yong principal, 34 years on stage"
  /**
   * Optional, and deliberately absent from the seed data: these are real living
   * artists, so a bio is a factual claim about a real person. Fill it only from
   * a source, never from invention.
   */
  bio?: LocalizedText;
  artFormIds: string[];
  imageKey: string;
};

export type VenueAccessibility = {
  stepFree: boolean;
  accessibleToilet: boolean;
  hearingLoop: boolean;
  notes?: LocalizedText;
};

export type Venue = {
  id: string;
  name: LocalizedText;
  area: LocalizedText;
  latitude: number;
  longitude: number;
  accessibility: VenueAccessibility;
  stateId: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  courseName: LocalizedText;
  title: LocalizedText;
  order: number;
  totalInCourse: number;
  imageKey: string;
};

export type CulturalTip = {
  id: string;
  body: LocalizedText;
};

export type ActivityKind = 'stamp' | 'registration';

export type ActivityEntry = {
  id: string;
  kind: ActivityKind;
  /**
   * Chrome, not content. These entries are seeded fixtures standing in for
   * activity the app will eventually generate itself; once real check-ins
   * produce them, the label will be composed from a chrome key plus a content
   * value.
   */
  labelKey: string;
  daysAgo: number;
};

/* ────────────────────────────────────────────────────────────────────────────
 * v2 content entities.
 *
 * Same two rules as everything above: author-written text is `LocalizedText` on
 * the record, and anything whose values the design fixes stays a chrome key.
 * Long-form text is always content — an article body under a translation key is
 * what makes the Phase 2 CMS unmanageable.
 * ──────────────────────────────────────────────────────────────────────────── */

/** 14 Heritage splits its reading into one long story and several short ones. */
export type ArticleKind = 'story' | 'two-minute';

export type Article = {
  id: string;
  kind: ArticleKind;
  title: LocalizedText;
  /** The opening paragraph, shown before the body on 26. */
  standfirst?: LocalizedText;
  body: LocalizedText;
  readingMinutes: number;
  /** Present when the article has a narration — "8 min listen, narrated by …". */
  audio?: {
    narratorName: string;          // a proper noun
    durationSeconds: number;
  };
  imageKey: string;
  galleryId?: string;
  artFormIds: string[];
  /** "Next: the puppet makers" — the series link at the foot of 26. */
  nextArticleId?: string;
};

/** 29's filter tabs. A fixed set the design owns, so it stays a chrome key. */
export type FestivalFilters = {
  categories: ArtFormCategory[];
  stateIds: string[];
  when: WhenFilter;
  freeOnly: boolean;
  wheelchairOnly: boolean;
};

export const emptyFilters : FestivalFilters = {
  categories: [],
  stateIds: [],
  when: 'any',
  freeOnly: false,
  wheelchairOnly: false,
}
export type GalleryCategory = 'puppets' | 'costume' | 'instruments';

export type Gallery = {
  id: string;
  title: LocalizedText;
  articleId: string;
};

export type GalleryImage = {
  id: string;
  imageKey: string;
  /**
   * Caption, credit and article are all required. The design's stated rule is
   * that no image is decorative — an image with no caption or no article to
   * belong to is a content bug, and the type is where that gets caught.
   */
  caption: LocalizedText;
  credit: LocalizedText;
  category: GalleryCategory;
  articleId: string;
  galleryId: string;
};

/**
 * Distinct from `Event`: a workshop is *joinable*, so it carries capacity and
 * the lesson that prepares you for it.
 */
export type Workshop = {
  id: string;
  festivalId: string;
  title: LocalizedText;
  description: LocalizedText;
  startsAt: string;                // ISO 8601 with time
  durationMinutes: number;
  venueId: string;
  capacity: number;
  placesLeft: number;
  ledByArtistId: string;
  preparatoryLessonId?: string;
  imageKey: string;
};

export type Challenge = {
  id: string;
  title: LocalizedText;
  criteria: LocalizedText;
  progressTarget: number;
  /**
   * Required, not optional. 31 links every challenge somewhere, and a challenge
   * with nowhere to go is exactly the dead end the design forbids — so the type
   * prevents it rather than a review catching it.
   *
   * Current progress is user state and lives in `data/store/`, not here.
   */
  advanceRoute: string;
};

export type Badge = {
  id: string;
  name: LocalizedText;
  criteria: LocalizedText;
  /** A Phosphor name minus the `ph-` prefix, as `Icon`'s map is keyed. */
  iconKey: string;
};

/** The four kinds map exactly onto screen 35's four toggles — one taxonomy. */
export type NotificationKind = 'event-reminder' | 'challenge' | 'story' | 'nearby';

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  title: LocalizedText;
  body: LocalizedText;
  at: string;                      // ISO 8601 with time
  /** Required — every row on 23 opens something. Same reasoning as `advanceRoute`. */
  route: string;
};

/**
 * A question and the screen that answers it. Deliberately has no body: 38 links
 * to the screen that *resolves* the question rather than to prose about it.
 */
export type HelpArticle = {
  id: string;
  question: LocalizedText;
  route: string;
};
