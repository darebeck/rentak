import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '@/theme';

type TagTone = 'gold' | 'neutral' | 'terracotta' | 'brand';
type TagSize = 'sm' | 'md';

type TagProps = {
  /** Already translated by the caller — Tag never touches i18n. */
  label: string;
  tone?: TagTone;
  size?: TagSize;
};

/** Background/text pairs, straight from the design's inline styles. */
const TONES: Record<TagTone, { backgroundColor: string; color: string }> = {
  gold: { backgroundColor: colors.goldTint, color: colors.goldText },
  neutral: { backgroundColor: colors.neutralTint, color: colors.text.muted },
  terracotta: { backgroundColor: colors.terracottaTint, color: colors.terracottaText },
  brand: { backgroundColor: colors.brand, color: colors.brandOnDark },
};

/**
 * The pill used for art-form categories, "Free entry", filter chips and
 * profile interests. `sm` is the on-card category tag, `md` the standalone chip.
 */
export function Tag({ label, tone = 'neutral', size = 'sm' }: TagProps) {
  const { backgroundColor, color } = TONES[tone];

  return (
    <View style={[styles.base, styles[size], { backgroundColor }]}>
      <Text style={[styles.labelBase, styles[`${size}Label`], { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md3 },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  labelBase: { fontWeight: '600' },
  smLabel: typography.pillLabel,
  mdLabel: typography.link,
});
