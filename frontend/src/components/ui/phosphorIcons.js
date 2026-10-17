/**
 * Per-icon re-exports from Phosphor. Plain JavaScript on purpose — the types
 * live in phosphorIcons.d.ts beside this file.
 *
 * Why this file exists at all
 * ──────────────────────────
 * Metro does not tree-shake, and Phosphor's root barrel re-exports all 1512
 * icons with `export *`. Importing from 'phosphor-react-native' therefore ships
 * every icon: measured at 8.4 MB / 4263 modules for the thirteen we use, versus
 * 2.5 MB / 1264 modules with the per-icon paths below.
 *
 * The per-icon path is Phosphor's own documented remedy and is declared in its
 * `exports` map under "./src/icons/*". But that path serves raw .tsx, so
 * importing it from TypeScript pulls the library's source into our program —
 * and `src/lib/icon-base.tsx` does not typecheck against react-native-svg
 * (it passes a `className` prop that SvgProps has never accepted). That is an
 * upstream bug, not a version mismatch: Phosphor develops against the exact
 * react-native-svg version installed here.
 *
 * Keeping the imports in a .js file with a hand-written .d.ts gets both halves:
 * Metro resolves the real modules and the bundle stays small, while TypeScript
 * reads only our declarations and never parses their source. `skipLibCheck`
 * cannot help here — it covers .d.ts files, not .tsx.
 *
 * To add an icon: add the export here and its declaration in the .d.ts, then
 * map it in Icon.tsx. Note the `*Icon` suffix — the bare aliases (`House`) are
 * deprecated upstream.
 */
export { BellIcon } from 'phosphor-react-native/src/icons/Bell';
export { BookOpenIcon } from 'phosphor-react-native/src/icons/BookOpen';
export { BookmarkSimpleIcon } from 'phosphor-react-native/src/icons/BookmarkSimple';
export { CalendarBlankIcon } from 'phosphor-react-native/src/icons/CalendarBlank';
export { CalendarCheckIcon } from 'phosphor-react-native/src/icons/CalendarCheck';
export { CalendarPlusIcon } from 'phosphor-react-native/src/icons/CalendarPlus';
export { CaretLeftIcon } from 'phosphor-react-native/src/icons/CaretLeft';
export { CaretRightIcon } from 'phosphor-react-native/src/icons/CaretRight';
export { CheckCircleIcon } from 'phosphor-react-native/src/icons/CheckCircle';
export { ClockIcon } from 'phosphor-react-native/src/icons/Clock';
export { EyeIcon } from 'phosphor-react-native/src/icons/Eye';
export { EyeSlashIcon } from 'phosphor-react-native/src/icons/EyeSlash';
export { HandHeartIcon } from 'phosphor-react-native/src/icons/HandHeart';
export { HouseIcon } from 'phosphor-react-native/src/icons/House';
export { LightbulbIcon } from 'phosphor-react-native/src/icons/Lightbulb';
export { MagnifyingGlassIcon } from 'phosphor-react-native/src/icons/MagnifyingGlass';
export { MapPinIcon } from 'phosphor-react-native/src/icons/MapPin';
export { MapTrifoldIcon } from 'phosphor-react-native/src/icons/MapTrifold';
export { MaskHappyIcon } from 'phosphor-react-native/src/icons/MaskHappy';
export { QrCodeIcon } from 'phosphor-react-native/src/icons/QrCode';
export { SealCheckIcon } from 'phosphor-react-native/src/icons/SealCheck';
export { ShareNetworkIcon } from 'phosphor-react-native/src/icons/ShareNetwork';
export { SlidersHorizontalIcon } from 'phosphor-react-native/src/icons/SlidersHorizontal';
export { TicketIcon } from 'phosphor-react-native/src/icons/Ticket';
export { UserIcon } from 'phosphor-react-native/src/icons/User';
export { UsersIcon } from 'phosphor-react-native/src/icons/Users';
export { WheelchairIcon } from 'phosphor-react-native/src/icons/Wheelchair';
export { XIcon } from 'phosphor-react-native/src/icons/X';
