import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { View } from 'react-native';
import { colors, radii, shadows } from '@/theme';

type ListGroupProps = {
  children: ReactNode;
};

/**
 * The rounded surface that holds `ListRow`s, with a divider between them.
 *
 * The group owns the dividers rather than each row, because the rule the design
 * follows is positional: every row has a bottom border *except the last*. Making
 * a row decide that for itself means every caller re-derives "am I last", and
 * the off-by-one shows up as a stray line above the card's bottom edge.
 *
 * Same two-view split as `Card` — outer view carries the shadow, inner view does
 * the clipping — because Android's `elevation` and `overflow: 'hidden'` conflict.
 */
export function ListGroup({ children }: ListGroupProps) {
  const rows = Children.toArray(children).filter(Boolean);

  return (
    <View style={[{ borderRadius: radii['2xl'], backgroundColor: colors.surface }, shadows.hairline]}>
      <View style={{ borderRadius: radii['2xl'], overflow: 'hidden' }}>
        {rows.map((row, index) =>
          isValidElement<{ divider?: boolean }>(row)
            ? cloneElement(row, { divider: index < rows.length - 1 })
            : row,
        )}
      </View>
    </View>
  );
}
