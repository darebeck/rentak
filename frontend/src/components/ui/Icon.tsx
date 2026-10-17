import type { Icon as PhosphorIcon } from 'phosphor-react-native';
import { colors } from '@/theme';
import {
  BellIcon,
  BookOpenIcon,
  BookmarkSimpleIcon,
  CalendarBlankIcon,
  CalendarCheckIcon,
  CalendarPlusIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
  HandHeartIcon,
  HouseIcon,
  LightbulbIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MapTrifoldIcon,
  MaskHappyIcon,
  QrCodeIcon,
  SealCheckIcon,
  ShareNetworkIcon,
  SlidersHorizontalIcon,
  TicketIcon,
  UserIcon,
  UsersIcon,
  WheelchairIcon,
  XIcon,
} from './phosphorIcons';

/**
 * Design icon name → Phosphor component.
 *
 * Keyed by the design's own Phosphor names minus the `ph-` prefix, so
 * cross-checking a screen against Rentak.dc.html is a direct string match.
 * Add entries as later screens need them.
 *
 * The glyphs come via ./phosphorIcons — read that file's header before changing
 * how they're imported; the obvious `import { X } from 'phosphor-react-native'`
 * triples the bundle.
 */
const ICONS = {
  'bell': BellIcon,
  'book-open': BookOpenIcon,
  'bookmark-simple': BookmarkSimpleIcon,
  'calendar-blank': CalendarBlankIcon,
  'calendar-check': CalendarCheckIcon,
  'calendar-plus': CalendarPlusIcon,
  'caret-left': CaretLeftIcon,
  'caret-right': CaretRightIcon,
  'check-circle': CheckCircleIcon,
  'clock': ClockIcon,
  'eye': EyeIcon,
  'eye-slash': EyeSlashIcon,
  'hand-heart': HandHeartIcon,
  'house': HouseIcon,
  'lightbulb': LightbulbIcon,
  'magnifying-glass': MagnifyingGlassIcon,
  'map-pin': MapPinIcon,
  'map-trifold': MapTrifoldIcon,
  'mask-happy': MaskHappyIcon,
  'qr-code': QrCodeIcon,
  'seal-check': SealCheckIcon,
  'share-network': ShareNetworkIcon,
  'sliders-horizontal': SlidersHorizontalIcon,
  'ticket': TicketIcon,
  'user': UserIcon,
  'users': UsersIcon,
  'wheelchair': WheelchairIcon,
  'x': XIcon,
} as const satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  /** The design's `ph-` vs `ph-fill-` distinction. The tab bar needs both. */
  weight?: 'regular' | 'fill';
};

/**
 * The only component that touches Phosphor. Centralising it keeps icon sizing
 * and colour defaults in one file, and makes `IconName` a union — so a mistyped
 * name is a compile error rather than a blank space at runtime.
 */
export function Icon({ name, size = 20, color = colors.brand, weight = 'regular' }: IconProps) {
  const Glyph = ICONS[name];
  return <Glyph size={size} color={color} weight={weight} />;
}
