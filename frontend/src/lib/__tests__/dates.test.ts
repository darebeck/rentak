import { translate } from '@/i18n';
import {
  formatClock, formatDateRange, formatDayOfMonth, formatDuration, formatEventWhen,
  formatHHmm, formatTime, formatWeekday, overlapsWindow,
} from '../dates';

// The real lookup, plurals included, against en.json.
const t = (key: string, params?: Record<string, string | number>) => translate('en', key, params) ?? key;

const DEWA_MUDA = '2026-08-16T20:30:00+08:00';

describe('test zone', () => {
  it('runs west of UTC, so the old device-zone bug would reproduce', () => {
    expect(new Date('2026-08-01').getDate()).toBe(31);
  });
});

describe('formatDateRange', () => {
  it('same month', () => {
    expect(formatDateRange('2026-08-01', '2026-08-31', t)).toBe('1–31 Aug');
    expect(formatDateRange('2026-08-01', '2026-08-31', t, { withYear: true })).toBe('1–31 Aug 2026');
  });
  it('crosses a month', () => {
    expect(formatDateRange('2026-10-31', '2026-11-02', t, { withYear: true })).toBe('31 Oct – 2 Nov 2026');
  });
  it('crosses a year', () => {
    expect(formatDateRange('2026-12-28', '2027-01-03', t, { withYear: true })).toBe('28 Dec 2026 – 3 Jan 2027');
  });
});

describe('event time, in venue time', () => {
  it('formatEventWhen', () => {
    // 16 Aug 2026 is a Sunday. The design's 'Sat 16 Aug' follows the 2025 calendar.
    expect(formatEventWhen(DEWA_MUDA, t)).toBe('Sun 16 Aug, 8:30 PM');
  });
  it('date column and time', () => {
    expect(formatTime(DEWA_MUDA)).toBe('8:30 PM');
    expect(formatWeekday(DEWA_MUDA, t)).toBe('Sun');
    expect(formatDayOfMonth(DEWA_MUDA)).toBe('16');
  });
  it('clock edges', () => {
    expect(formatHHmm('20:00')).toBe('8:00 PM');
    expect(formatClock(0, 5)).toBe('12:05 AM');
    expect(formatClock(12, 0)).toBe('12:00 PM');
  });
});

describe('formatDuration', () => {
  it('minutes, singular hour, plural hours', () => {
    expect(formatDuration(90, t)).toBe('90 min');
    expect(formatDuration(60, t)).toBe('1 hour');
    expect(formatDuration(120, t)).toBe('2 hours');
  });
});

describe('overlapsWindow', () => {
  const now = new Date('2026-10-01T00:00:00+08:00');

  it('week', () => {
    expect(overlapsWindow('2026-10-03', '2026-10-06', 'week', now)).toBe(true);  // Wayang Kelantan
    expect(overlapsWindow('2026-10-10', '2026-10-12', 'week', now)).toBe(false); // Dikir Pantai
  });
  it('month', () => {
    expect(overlapsWindow('2026-10-10', '2026-10-12', 'month', now)).toBe(true);
    expect(overlapsWindow('2026-10-31', '2026-11-02', 'month', now)).toBe(true); // Malam Randai
    expect(overlapsWindow('2026-11-13', '2026-11-15', 'month', now)).toBe(false);
  });
  it('any', () => {
    expect(overlapsWindow('2027-03-12', '2027-03-14', 'any', now)).toBe(true);
  });
  it('"today" is the Malaysian date, not the UTC one', () => {
    const justAfterMidnightMyt = new Date('2026-09-30T16:30:00Z'); // 1 Oct 00:30 in KL
    expect(overlapsWindow('2026-09-30', '2026-09-30', 'week', justAfterMidnightMyt)).toBe(false);
    expect(overlapsWindow('2026-10-07', '2026-10-07', 'week', justAfterMidnightMyt)).toBe(true);
  });
});
