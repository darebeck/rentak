import { Image, StyleSheet, Text, View, type DimensionValue } from 'react-native';
import { colors, radii } from '@/theme';

/**
 * imageKey → bundled asset. Keys not listed here fall through to the themed
 * placeholder, so this table can fill up one image at a time.
 *
 * The paths must be string literals: Metro resolves `require()` at build time,
 * so a computed path silently yields nothing.
 *
 * TEMPORARY: rice-cake.png is a stand-in while the real festival photography
 * is outstanding. Replace the value, not the key.
 */
const ASSETS: Record<string, number> = {
  'rentak-home-hero': require('../../../assets/temp/rice-cake.png'),
};

type ImageSlotProps = {
  /** The design's `<image-slot>` id, e.g. 'rentak-home-hero'. */
  imageKey: string;
  shape?: 'rect' | 'circle';
  width?: DimensionValue;
  height?: number;
  /** Optional caption, already translated by the caller. */
  label?: string;
  radius?: keyof typeof radii;
};

/**
 * Stands in for the design's `<image-slot>` placeholders.
 *
 * The Claude Design project ships no image assets — all fourteen images are
 * placeholders — so this renders a themed block instead of an <Image>.
 *
 * This is the single seam for imagery. When real assets arrive, resolve
 * `imageKey` to a require()d asset here and render <Image> when it hits,
 * falling back to the placeholder when it misses. No calling component
 * changes — the same idea as the repositories.
 */
export function ImageSlot({
  imageKey,
  shape = 'rect',
  width = '100%',
  height = 120,
  label,
  radius = 'md',
}: ImageSlotProps) {
  const isCircle = shape === 'circle';
  // A circle needs a concrete diameter; percentage widths can't produce one,
  // so fall back to the height, which is always a number.
  const diameter = typeof width === 'number' ? width : height;
  const asset = ASSETS[imageKey];

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label ?? imageKey}
      style={[
        styles.base,
        {
          width: isCircle ? diameter : width,
          height: isCircle ? diameter : height,
          borderRadius: isCircle ? diameter / 2 : radii[radius],
        },
      ]}
    >
      {asset !== undefined ? (
        // The parent View already carries the size and the rounding, so the
        // image just fills it. `cover` crops rather than distorting.
        <Image source={asset} resizeMode="cover" style={styles.image} />
      ) : label ? (
        <Text numberOfLines={2} style={styles.label}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 8,
    color: colors.text.faint,
  },
});
