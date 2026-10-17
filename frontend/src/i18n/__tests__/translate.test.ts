import { translate } from '@/i18n';

describe('translate', () => {
  it('picks en one/other by count', () => {
    expect(translate('en', 'festivals.count', { count: 1 })).toBe('1 festival · sorted by date');
    expect(translate('en', 'festivals.count', { count: 9 })).toBe('9 festivals · sorted by date');
  });
  it('ms never inflects', () => {
    expect(translate('ms', 'filters.apply', { count: 1 })).toBe('Tunjuk 1 festival');
    expect(translate('ms', 'filters.apply', { count: 9 })).toBe('Tunjuk 9 festival');
  });
  it('a count on a plain string key still works', () => {
    expect(translate('en', 'date.eventWhen', { count: 2, weekday: 'Sun', day: 16, month: 'Aug', time: '8:30 PM' }))
      .toBe('Sun 16 Aug, 8:30 PM');
  });
  it('content placeholders that are absent stay visible, not blank', () => {
    expect(translate('en', 'workshop.lessonRef', { n: 3 })).toBe('Lesson 3: {{title}}');
  });
  it('unknown key returns undefined, so t() can warn', () => {
    expect(translate('en', 'nope.nothing')).toBeUndefined();
  });
});
