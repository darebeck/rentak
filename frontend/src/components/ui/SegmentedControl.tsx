import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, shadows, spacing, typography } from '@/theme';

type Segment<T extends string> = {
  value: T;
  /** Already translated by the caller — primitives never touch i18n. */
  label: string;
};

type SegmentedControlProps<T extends string> = {
  segments: readonly Segment<T>[];
  value: T;
  onChange: (next: T) => void;
};

/**
 * The Map / Passport / Challenges switcher on 15, and the equivalents on 16 and 31.
 *
 * Generic over the value union so a caller's segment ids stay a compile-time
 * union rather than widening to `string` — a mistyped segment is then an error,
 * not a control that silently never selects.
 */
export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <View accessibilityRole="tablist" style={styles.track}>
      {segments.map((segment) => {
        const selected = segment.value === value;

        return (
          <Pressable
            key={segment.value}
            onPress={() => onChange(segment.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.segment, selected && styles.segmentSelected]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>{segment.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSunken,
    borderRadius: radii.md,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    minHeight: 36,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md2,
  },
  segmentSelected: {
    backgroundColor: colors.surface,
    ...shadows.hairline,
  },
  label: { ...typography.rowTitleSm, color: colors.text.muted },
  labelSelected: { color: colors.brand },
});
