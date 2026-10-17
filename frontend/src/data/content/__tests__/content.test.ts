import type {
  ArtForm, Artist, Event, Festival, Lesson, MalaysianState, Venue, Workshop,
} from '@/types';
import artFormsJson from '../artForms.json';
import artistsJson from '../artists.json';
import eventsJson from '../events.json';
import festivalsJson from '../festivals.json';
import lessonsJson from '../lessons.json';
import statesJson from '../states.json';
import venuesJson from '../venues.json';
import workshopsJson from '../workshops.json';

// Same casts as the repositories. This file checks at runtime what those casts only claim.
const festivals = festivalsJson as Festival[];
const events = eventsJson as Event[];
const workshops = workshopsJson as Workshop[];
const venues = venuesJson as Venue[];
const states = statesJson as MalaysianState[];
const artForms = artFormsJson as ArtForm[];
const artists = artistsJson as Artist[];
const lessons = lessonsJson as Lesson[];

const byId = <T extends { id: string }>(xs: T[]) => new Map(xs.map((x) => [x.id, x]));
const festivalById = byId(festivals);
const eventById = byId(events);
const venueById = byId(venues);
const stateIds = new Set(states.map((s) => s.id));
const artFormIds = new Set(artForms.map((a) => a.id));
const artistIds = new Set(artists.map((a) => a.id));
const lessonIds = new Set(lessons.map((l) => l.id));

/** Every object with an `ms` or `en` key is a LocalizedText and needs both, non-empty. */
function missingLocales(value: unknown, path: string, out: string[]): string[] {
  if (Array.isArray(value)) {
    value.forEach((v, i) => missingLocales(v, `${path}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    if ('ms' in o || 'en' in o) {
      for (const locale of ['ms', 'en'] as const) {
        const s = o[locale];
        if (typeof s !== 'string' || s.trim() === '') out.push(`${path}.${locale}`);
      }
    } else {
      for (const [k, v] of Object.entries(o)) missingLocales(v, `${path}.${k}`, out);
    }
  }
  return out;
}

describe('content integrity', () => {
  it('ids are unique within each file', () => {
    const files = { festivals, events, workshops, venues, states, artForms, artists, lessons };
    const dupes = Object.entries(files).flatMap(([name, xs]) =>
      xs.map((x) => x.id).filter((id, i, all) => all.indexOf(id) !== i).map((id) => `${name}:${id}`));
    expect(dupes).toEqual([]);
  });

  it('every festival has a state, real art forms and a headline event of its own', () => {
    const problems: string[] = [];
    for (const f of festivals) {
      if (!stateIds.has(f.stateId)) problems.push(`${f.id}: unknown state ${f.stateId}`);
      for (const a of f.artFormIds) if (!artFormIds.has(a)) problems.push(`${f.id}: unknown art form ${a}`);
      if (eventById.get(f.headlineEventId)?.festivalId !== f.id)
        problems.push(`${f.id}: headline ${f.headlineEventId} missing or belongs to another festival`);
    }
    expect(problems).toEqual([]);
  });

  it('every venue has a state and states its accessibility', () => {
    const problems: string[] = [];
    for (const v of venues) {
      if (!stateIds.has(v.stateId)) problems.push(`${v.id}: unknown state ${v.stateId}`);
      const a = v.accessibility;
      if (typeof a?.stepFree !== 'boolean' || typeof a.accessibleToilet !== 'boolean' || typeof a.hearingLoop !== 'boolean')
        problems.push(`${v.id}: accessibility incomplete`);
    }
    expect(problems).toEqual([]);
  });

  it("events and workshops sit in a real festival, at a venue in that festival's state", () => {
    const problems: string[] = [];
    for (const e of [...events, ...workshops]) {
      const festival = festivalById.get(e.festivalId);
      const venue = venueById.get(e.venueId);
      if (!festival) problems.push(`${e.id}: unknown festival ${e.festivalId}`);
      if (!venue) problems.push(`${e.id}: unknown venue ${e.venueId}`);
      if (festival && venue && venue.stateId !== festival.stateId)
        problems.push(`${e.id}: venue in ${venue.stateId}, festival in ${festival.stateId}`);
      // 'YYYY-MM-DD' strings compare lexically, so no Date and no timezone.
      const day = e.startsAt.slice(0, 10);
      if (festival && (day < festival.startDate || day > festival.endDate))
        problems.push(`${e.id}: ${day} outside ${festival.startDate}–${festival.endDate}`);
    }
    expect(problems).toEqual([]);
  });

  it('workshops point at real artists and lessons, with sane places', () => {
    const problems: string[] = [];
    for (const w of workshops) {
      if (!artistIds.has(w.ledByArtistId)) problems.push(`${w.id}: unknown artist ${w.ledByArtistId}`);
      if (w.preparatoryLessonId && !lessonIds.has(w.preparatoryLessonId))
        problems.push(`${w.id}: unknown lesson ${w.preparatoryLessonId}`);
      if (w.placesLeft < 0 || w.placesLeft > w.capacity)
        problems.push(`${w.id}: placesLeft ${w.placesLeft} of ${w.capacity}`);
    }
    expect(problems).toEqual([]);
  });

  it('lesson courses are complete and art forms link to real courses', () => {
    const problems: string[] = [];
    const courses = new Map<string, Lesson[]>();
    for (const l of lessons) courses.set(l.courseId, [...(courses.get(l.courseId) ?? []), l]);
    for (const [courseId, ls] of courses) {
      const orders = ls.map((l) => l.order).sort((a, b) => a - b);
      if (orders.some((o, i) => o !== i + 1)) problems.push(`${courseId}: orders ${orders.join(',')}`);
      for (const l of ls) if (l.totalInCourse !== ls.length)
        problems.push(`${l.id}: totalInCourse ${l.totalInCourse}, course has ${ls.length}`);
    }
    for (const a of artForms) if (a.lessonCourseId && !courses.has(a.lessonCourseId))
      problems.push(`${a.id}: unknown course ${a.lessonCourseId}`);
    expect(problems).toEqual([]);
  });

  it('every LocalizedText has both locales', () => {
    const files = { festivals, events, workshops, venues, states, artForms, artists, lessons };
    const missing = Object.entries(files).flatMap(([name, xs]) => missingLocales(xs, name, []));
    expect(missing).toEqual([]);
  });
});
