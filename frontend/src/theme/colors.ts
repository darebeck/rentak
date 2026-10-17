export const colors = {
  bg: {
    canvas: '#F8F5EE',                      // every screen's ground
    page:   '#EFEAE0'                       // the design-canvas ground (splash outer)
  },
  surface:       '#FFFDF8',                 // cards, list groups
  surfaceSunken: '#E7E1D5',                 // progress track, segmented control ground

  brand:          '#123D32',                // deep green — headings, primary fill, active tab
  brandLight:     '#2E6B57',                // check-in success ground, accent fills
  brandOnDark:    '#F8F5EE',                // text sitting on a brand fill
  brandMutedText: '#A9BFB5',                // secondary text on a brand fill
  brandTipText:   '#F4F1E8',                // the cultural-tip body copy on 11's brand card

  gold:     '#E5A83A',                      // stamps, tip label, challenge progress
  goldRing:     'rgba(229,168,58,0.55)',    // the splash's outermost decorative circle
  goldRingSoft: 'rgba(229,168,58,0.4)',     // its middle circle
  inkRing:      'rgba(32,35,31,0.16)',      // its lowest circle
  inkTrack:     'rgba(32,35,31,0.10)',      // the splash progress track, on the cream ground
  goldTint: '#FBEFD8',                      // stamp tiles, category tag background
  goldText: '#A6741C',                      // text on goldTint
  goldTextStrong: '#8A6218',                // the higher-contrast gold label
  onGold:   '#20231F',                      // text on a solid gold fill (the "Scan" button)

  terracotta:     '#C9664C',                // weekday labels, "because you saved"
  terracottaTint: '#F7EAE4',                // "Free entry" tag background
  terracottaText: '#A6503A',                // text on terracottaTint

  neutralTint: '#F0EBE0',                   // secondary tag background

  text: {
    primary:  '#20231F',                    // card titles, row titles
    body:     '#3A3D37',                    // long-form body copy
    bodySoft: '#55584F',                    // secondary long-form copy
    muted:    '#74776F',                    // metadata, subtitles
    subtle:   '#8E9188',                    // section eyebrows, greeting
    faint:    '#9B9E95',                    // timestamps, trailing values
    disabled: '#B3B6AD'                     // inactive tab labels
  },

  icon: {
    chevron: '#B3B6AD',
    locked:  '#C6C9C0'
  },

  border: {
    default: '#EAE5DA',                     // card outlines, tab-bar top edge
    strong:  '#DED8CA',                     // filter chips
    divider: '#F0EBE0',                     // separators between rows inside a card
    dashed:  '#D2CCBC'                      // empty stamp slots
  },

  scrim:       'rgba(32,35,31,0.45)',        // behind a sheet or modal
  tabBar:      'rgba(255,253,248,0.94)',
  overlayPill: 'rgba(248,245,238,0.92)',    // "Happening now" badge
} as const;