/**
 * Time and date logic. Components read the result; they never compute it
 * themselves — a `getHours()` call inside a component is untestable and tends
 * to get copy-pasted.
 *
 * Content dates are Malaysian wall-clock strings ('2026-08-01',
 * '2026-08-16T20:30:00+08:00'). Everything here reads them through `wallClock`,
 * never through `Date` getters: those answer in the *device's* zone, so a phone
 * in New York would show a 1 Aug festival as starting 31 Jul and an 8:30 PM show
 * as 8:30 AM. A festival pass shows venue time, wherever the visitor's phone is.
 */
import type { WhenFilter } from '@/types';

export type GreetingKey = 'morning' | 'afternoon' | 'evening';

/** Just the part of `t` we need — avoids a lib → i18n import. */
type Translate = (key: string, params?: Record<string, string | number>) => string;

/**
 * Which of the three greetings the design shows for a given time of day.
 *
 * Deliberately the device's clock: "Good morning" follows the user, not the venue.
 * `now` is injectable so the boundaries can be checked without mocking the
 * clock. Cutoffs are midnight / 12:00 / 18:00.
 */
export function greetingKey(now: Date = new Date()): GreetingKey {
  const hour = now.getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

/**
 * The wall-clock parts of '2026-08-16' or '2026-08-16T20:30:00+08:00', exactly
 * as written. The offset is ignored on purpose: content is venue-local time.
 */
export function wallClock(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso);
  if (!m) throw new Error(`Not an ISO date: ${iso}`);
  const [, y, mo, d, h = '0', mi = '0'] = m;
  const year = Number(y);
  const month = Number(mo);
  const day = Number(d);
  // Weekday from a UTC date built from the same digits, so no zone can move it.
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { year, month, day, hour: Number(h), minute: Number(mi), weekday };
}

/**
 * A wall-clock time as the design writes it: '8:30 PM', '11:00 AM'.
 *
 * Hour and minute are safe to derive arithmetically — unlike names, they carry
 * no language. The 12-hour clock is what all 42 screens use.
 */
export function formatClock(hour: number, minute: number): string {
  const suffix = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
}

/** '8:30 PM' from an ISO timestamp, in venue time. */
export function formatTime(iso: string): string {
  const w = wallClock(iso);
  return formatClock(w.hour, w.minute);
}

/** '8:00 PM' from 'HH:mm' — schedule items and doorsOpenAt. */
export function formatHHmm(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  return formatClock(h, m);
}

/**
 * The abbreviated weekday for a list's date column — 'Sat', 'Sun'.
 *
 * Like the month names, these come from the dictionaries rather than
 * `toLocaleDateString`: the device locale is not the app locale (a user can
 * read the app in Bahasa Melayu on an English phone), so asking the platform
 * would produce a row that ignores the language the user chose.
 */
export function formatWeekday(iso: string, t: Translate): string {
  return t(`date.weekday.${wallClock(iso).weekday}`);
}

/** The day number in a date column. */
export function formatDayOfMonth(iso: string): string {
  return String(wallClock(iso).day);
}

/**
 * The design's date range: '1–31 Ogos', '12–14 Sep'. Note the en-dash (–), not
 * a hyphen. A range crossing a month names both: '28 Ogos – 3 Sep'.
 * With `withYear`: '1–31 Aug 2026', '28 Dec 2026 – 3 Jan 2027'. It defaults to
 * false so Home keeps its short form.
 *
 * Month names come from the dictionaries via `t`, so they translate with
 * everything else rather than hiding in a table down here.
 */
export function formatDateRange(
  startISO: string,
  endISO: string,
  t: Translate,
  opts: { withYear?: boolean } = {},
): string {
  const s = wallClock(startISO);
  const e = wallClock(endISO);
  const mon = (m: number) => t(`date.month.${m}`);
  const yr = (y: number) => (opts.withYear ? ` ${y}` : '');

  if (s.year !== e.year) return `${s.day} ${mon(s.month)}${yr(s.year)} – ${e.day} ${mon(e.month)}${yr(e.year)}`;
  if (s.month !== e.month) return `${s.day} ${mon(s.month)} – ${e.day} ${mon(e.month)}${yr(e.year)}`;
  return `${s.day}–${e.day} ${mon(e.month)}${yr(e.year)}`;
}

/** 'Sun 16 Aug, 8:30 PM' — screens 13, 42, 18 and 24. */
export function formatEventWhen(iso: string, t: Translate): string {
  const w = wallClock(iso);
  return t('date.eventWhen', {
    weekday: t(`date.weekday.${w.weekday}`),
    day: w.day,
    month: t(`date.month.${w.month}`),
    time: formatClock(w.hour, w.minute),
  });
}

/** '90 min' · '1 hour' · '2 hours'. The singular/plural choice is made by `t()`'s `count`. */
export function formatDuration(minutes: number, t: Translate): string {
  return minutes >= 60 && minutes % 60 === 0
    ? t('date.durationHours', { count: minutes / 60 })
    : t('date.durationMinutes', { count: minutes });
}

const MYT_OFFSET_MS = 8 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const ymd = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Does the festival [start, end] overlap the "When" window? 'week' is today
 * plus six days; 'month' is today to the end of this calendar month. "Today"
 * is today in Malaysia. 'YYYY-MM-DD' strings compare correctly as text.
 */
export function overlapsWindow(
  startISO: string,
  endISO: string,
  when: WhenFilter,
  now: Date = new Date(),
): boolean {
  if (when === 'any') return true;
  const myt = new Date(now.getTime() + MYT_OFFSET_MS); // its UTC fields now read as MYT
  const windowStart = ymd(myt);
  const windowEnd = when === 'week'
    ? ymd(new Date(myt.getTime() + 6 * DAY_MS))
    : ymd(new Date(Date.UTC(myt.getUTCFullYear(), myt.getUTCMonth() + 1, 0))); // day 0 = last of month
  return startISO.slice(0, 10) <= windowEnd && endISO.slice(0, 10) >= windowStart;
}
