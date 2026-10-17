import { Platform, ViewStyle } from 'react-native';
import { colors } from './colors';

/**
 * v2 tints every shadow with the ink, never with the brand green — all 42
 * screens use rgba(32,35,31,…) and nothing else. Taking it from the palette
 * rather than repeating the hex keeps `colors.ts` the only place a colour is
 * spelled out.
 */
const INK = colors.text.primary;

/** 0 1px 2px rgba(32,35,31,0.05) — list groups, small cards. 42 occurrences in v2. */
export const hairline: ViewStyle = Platform.select({
  ios: {
    shadowColor: INK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  android: { elevation: 1 },
  default: {},
})!;

/** hairline + 0 10px 28px rgba(32,35,31,0.06–0.07) — hero cards.
 *  RN supports one shadow per view, so we approximate the pair with the
 *  larger of the two, which is what actually reads at this scale. */
export const card: ViewStyle = Platform.select({
  ios: {
    shadowColor: INK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 28,
  },
  android: { elevation: 4 },
  default: {},
})!;

export const shadows = { hairline, card } as const;