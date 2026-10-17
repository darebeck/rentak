import React, { createContext, useContext, useMemo, useState } from 'react';
import ms from './locales/ms.json';
import en from './locales/en.json';

// Locale and LocalizedText are declared in types/index.ts (Section 3.2) —
// the domain model owns them, not the i18n layer.
import type { Locale, LocalizedText } from '@/types';

const dictionaries = { ms, en } as const;

/** Walks a dotted key path: 'home.section.featured' → dict.home.section.featured */
function lookup(dict: unknown, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>(
    (acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined),
    dict,
  );
  return typeof value === 'string' ? value : undefined;
}

/** Replaces {{name}} placeholders. */
function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => String(params[k] ?? `{{${k}}}`));
}

/**
 * Plural category for `count`. English has one/other; Bahasa Melayu doesn't inflect
 * the noun, so it is always 'other'. Hand-rolled because Hermes' Intl.PluralRules
 * coverage varies, and two locales don't justify it.
 */
function pluralCategory(locale: Locale, n: number): 'one' | 'other' {
  return locale === 'en' && n === 1 ? 'one' : 'other';
}

/**
 * The lookup behind `t()`, pure so tests can call it without a provider. A numeric
 * `count` param tries `key.one` / `key.other` before `key`; a miss falls back to English.
 */
export function translate(locale: Locale, key: string, params?: Record<string, string | number>): string | undefined {
  const n = params?.count;
  const keys = typeof n === 'number' ? [`${key}.${pluralCategory(locale, n)}`, key] : [key];
  for (const dict of [dictionaries[locale], dictionaries.en]) {
    for (const k of keys) {
      const hit = lookup(dict, k);
      if (hit !== undefined) return interpolate(hit, params);
    }
  }
  return undefined;
}

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** UI chrome, by key. */
  t: (key: string, params?: Record<string, string | number>) => string;
  /** Content text, already carried per-locale on the record. */
  tx: (text: LocalizedText | undefined) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Bahasa Melayu is the fallback until screen 02 asks (MIGRATION §9). Screen 02
  // persists the answer in data/store/; this layer stays source-agnostic.
  const [locale, setLocale] = useState<Locale>('en');

  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale,
    t: (key, params) => {
      const hit = translate(locale, key, params);
      if (hit === undefined) {
        if (__DEV__) console.warn(`[i18n] missing key: ${key}`);
        return key;
      }
      return hit;
    },
    tx: (text) => {
      if (!text) return '';
      return text[locale] || text.en || '';
    },
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used inside <I18nProvider>');
  return ctx;
}