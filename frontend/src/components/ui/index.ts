/**
 * Primitives. Every visual value in here comes from `@/theme` — a raw hex,
 * font size or padding number below this folder is a bug.
 *
 * None of these components touch i18n: callers pass text already resolved
 * through `t()` or `tx()`, which keeps the primitives reusable and their
 * previews trivial.
 */
export { Card } from './Card';
export { Tag } from './Tag';
export { Button } from './Button';
export { ProgressBar } from './ProgressBar';
export { Icon, type IconName } from './Icon';
export { ImageSlot } from './ImageSlot';

// v2 additions — each used on four or more of the forty-two screens.
export { ListRow } from './ListRow';
export { ListGroup } from './ListGroup';
export { Avatar } from './Avatar';
export { TextField } from './TextField';
export { Switch } from './Switch';
export { Sheet } from './Sheet';
export { SegmentedControl } from './SegmentedControl';
export { StatTile } from './StatTile';
export { EmptyState } from './EmptyState';
