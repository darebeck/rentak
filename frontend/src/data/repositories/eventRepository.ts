import eventsJson from '../content/events.json';
import type { Event } from '@/types';

const events = eventsJson as Event[];

/**
 * Chronological order, ties broken by id.
 *
 * Compares timestamps rather than the raw `startsAt` strings: two events can be
 * written with different UTC offsets ('...+08:00' vs '...Z') and still be the
 * same instant, which a plain string compare would get wrong. The id tiebreak
 * keeps the order stable for events that start at the same moment — without it,
 * the two 11:00 workshops could swap places between runs.
 */
function byStartThenId(a: Event, b: Event): number {
  const delta = new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
  return delta !== 0 ? delta : a.id.localeCompare(b.id);
}

export const eventRepository = {
  /** Every event, soonest first. */
  list(): Event[] {
    return [...events].sort(byStartThenId);
  },

  getById(id: string): Event | undefined {
    return events.find((e) => e.id === id);
  },

  /** Every event belonging to one festival, soonest first. */
  listByFestival(festivalId: string): Event[] {
    return events.filter((e) => e.festivalId === festivalId).sort(byStartThenId);
  },

  /**
   * The next `limit` events that have not started yet.
   *
   * `now` is a parameter rather than a bare `new Date()` call so tests can pin
   * the clock. Callers pass nothing and get the real current time.
   */
  getUpcoming(limit: number, now: Date = new Date()): Event[] {
    const cutoff = now.getTime();
    return events
      .filter((e) => new Date(e.startsAt).getTime() >= cutoff)
      .sort(byStartThenId)
      .slice(0, limit);
  },
};