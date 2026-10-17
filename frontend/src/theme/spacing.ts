export const spacing = {
  xs3: 2, xs2: 3, xs: 4, sm3: 5, sm2: 6, sm: 8,
  md3: 10, md2: 12, md: 14, lg3: 16, lg2: 18, lg: 20,
  xl3: 22, xl2: 24, xl: 26, xxl: 64,
} as const;

/** Layout constants read directly off the design's Home screen. */
export const layout = {
  screenGutter: 20,   // horizontal padding on every screen
  sectionGap: 26,     // vertical gap between Home's sections
  headerGap: 12,      // gap between a section header and its content
  tabBarHeight: 88,   // design value; the real bar uses safe-area insets
} as const;