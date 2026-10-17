import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '@/theme';

type StatTileProps = {
  /** Already formatted and locale-aware — the tile does no number formatting. */
  value: string;
  /** Already translated by the caller. */
  label: string;
  onPress?: () => void;
};

/**
 * One of the 7 Performances / 6 Stamps / 3 Badges triple on 16.
 *
 * `value` is a string, not a number: counts are locale-formatted (and in other
 * places interpolated into a sentence), and formatting is logic that belongs in
 * `src/lib/`, not in a presentational tile.
 *
 * Each tile in the design is a link, so `onPress` makes it pressable — but the
 * tile still renders as plain content without one.
 */
export function StatTile({ value, label, onPress }: StatTileProps) {
  const content = (
    <>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </>
  );

  if (!onPress) return <View style={styles.tile}>{content}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    gap: spacing.xs,
  },
  pressed: { opacity: 0.85 },
  value: { ...typography.statValue, color: colors.brand },
  label: { ...typography.pillLabel, fontWeight: '400', color: colors.text.muted },
});
