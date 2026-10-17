import { colors } from './colors';
import { radii } from './radii';
import { shadows } from './shadows';
import { spacing, layout } from './spacing';
import { typography } from './typography';

export { colors } from './colors';
export { typography, fontSizes, fontWeights } from './typography';
export { spacing, layout } from './spacing';
export { radii } from './radii';
export { shadows } from './shadows';

export const theme = { colors, typography, spacing, layout, radii, shadows } as const;
export type Theme = typeof theme;