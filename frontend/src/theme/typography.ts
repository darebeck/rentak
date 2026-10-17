import { TextStyle } from 'react-native';

export const fontWeights = {
  regular: '400',
  medium:  '500',
  semi:    '600',   // the design's SF Pro `590` — RN only accepts hundreds
  bold:    '600',   // the design never goes above 600
} as const;

export const fontSizes = {
  xs2: 10, xs: 11, sm2: 12, sm: 13, base: 14, md: 15, lg: 16, lg2: 17,
  xl: 19, xl2: 20, xl3: 21, xl4: 24, xl5: 28, xl6: 32, xl7: 34, display: 42,
} as const;

/**
 * Named roles, straight from the design.
 * letterSpacing is converted from `em` to points: em × fontSize.
 * lineHeight is converted from a multiplier to points: multiplier × fontSize.
 */
export const typography = {
  // 01 Splash
  displayXL:    { fontSize: 42, fontWeight: '600', letterSpacing: -0.84 },
  splashTagline:{ fontSize: 14, letterSpacing: 2.24, textTransform: 'uppercase' },

  // Screen titles.
  // v2's in-frame type does go above 30 — 42 on the splash, 34 on 12/14, 32 on 11/06.
  // MIGRATION §3 claims 30 is the ceiling; it read a frequency table as a maximum.
  // The design wins, so these keep their v1 values.
  screenTitle:  { fontSize: 34, fontWeight: '600', letterSpacing: -0.68 },  // 12 Festivals, 14 Heritage
  greetingName: { fontSize: 32, fontWeight: '600', letterSpacing: -0.64, lineHeight: 35 },  // 11 Home, 06 Sign in
  pageTitle:    { fontSize: 30, fontWeight: '600', letterSpacing: -0.6, lineHeight: 36 },   // 02–10, 17, 19, 41
  pageTitleSm:  { fontSize: 28, fontWeight: '600', letterSpacing: -0.56, lineHeight: 32 },  // 13, 16, 20–23, 27
  cardTitleXl:  { fontSize: 26, fontWeight: '600', letterSpacing: -0.52 },                  // 26, 28–31, 42

  // Cards & rows
  cardTitleLg:  { fontSize: 20, fontWeight: '600', letterSpacing: -0.2 },
  cardTitle:    { fontSize: 19, fontWeight: '600' },
  statValue:    { fontSize: 24, fontWeight: '600' },   // 16's Performances / Stamps / Badges triple
  rowTitle:     { fontSize: 16, fontWeight: '600' },
  rowTitleSm:   { fontSize: 15, fontWeight: '600' },

  // Body & meta
  body:         { fontSize: 16, lineHeight: 26 },   // 1.62 × 16
  bodyTip:      { fontSize: 16, lineHeight: 24 },   // 1.5 × 16
  meta:         { fontSize: 13 },
  metaLg:       { fontSize: 14 },
  greeting:     { fontSize: 15 },

  // The repeating section label — appears 7× on Home alone
  eyebrow:      { fontSize: 13, letterSpacing: 1.56, textTransform: 'uppercase' },
  eyebrowSm:    { fontSize: 12, fontWeight: '600', letterSpacing: 1.44, textTransform: 'uppercase' },

  /** The "Happening now" overlay pill and the quick-action tile labels — both 12/590. */
  pillLabel:    { fontSize: 12, fontWeight: '600' },

  link:         { fontSize: 14, fontWeight: '600' },
  tabLabel:     { fontSize: 10, fontWeight: '600' },
  dateWeekday:  { fontSize: 11, fontWeight: '600', letterSpacing: 0.88, textTransform: 'uppercase' },
  dateDay:      { fontSize: 20, fontWeight: '600' },
} as const satisfies Record<string, TextStyle>;