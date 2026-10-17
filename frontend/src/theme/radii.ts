export const radii = {
  none: 0,    // media whose corners are already clipped by a parent Card
  sm: 12,     // stamp tiles
  md: 14,     // gallery thumbs, search field
  lg: 16,     // small image thumbs, action buttons
  xl: 18,     // quick-action tiles, small cards
  '2xl': 20,  // list groups, standard cards
  '3xl': 22,  // hero cards
  sheet: 26,  // the bottom sheet that overlaps a hero image
  splashMark: 28,  // the 96×96 brand tile on the splash
  pill: 999,  // tags, chips, badges
} as const;