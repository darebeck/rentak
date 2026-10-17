/**
 * Key-parity check for the locale files (BUILD_GUIDE §4.5).
 *
 * A key present in one locale and missing from the other is a bug the user sees:
 * `t()` silently falls back to English, so a missing `ms` key ships as English copy.
 * Run it whenever copy is added — `npm run check:i18n`.
 *
 * Plain JavaScript on purpose: this is a Node script, not app code, and the project
 * has no `@types/node`. Same reasoning as `components/ui/phosphorIcons.js`.
 *
 * Phase 2 note: once translations come from the API, this check moves to comparing
 * the synced overlay against the bundled seed.
 */
const en = require('../locales/en.json');
const ms = require('../locales/ms.json');

/** 'home.section.featured' for every string leaf, depth-first. */
function flatten(value, prefix) {
  if (typeof value === 'string') return [prefix];
  if (!value || typeof value !== 'object') return [];

  return Object.entries(value).flatMap(([key, child]) =>
    flatten(child, prefix ? `${prefix}.${key}` : key),
  );
}

const enKeys = new Set(flatten(en, ''));
const msKeys = new Set(flatten(ms, ''));

const missingInMs = [...enKeys].filter((k) => !msKeys.has(k)).sort();
const missingInEn = [...msKeys].filter((k) => !enKeys.has(k)).sort();

if (missingInMs.length === 0 && missingInEn.length === 0) {
  console.log(`[i18n] parity OK — ${enKeys.size} keys in both locales.`);
} else {
  for (const key of missingInMs) console.error(`[i18n] missing in ms.json: ${key}`);
  for (const key of missingInEn) console.error(`[i18n] missing in en.json: ${key}`);
  process.exitCode = 1;
}
