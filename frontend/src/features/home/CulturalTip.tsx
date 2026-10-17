import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { tipRepository } from '@/data/repositories';
import { colors, spacing, typography } from '@/theme';

/**
 * Home's closing card: the cultural tip of the day.
 *
 * The only inverted surface on the screen — brand green, a gold label, cream
 * body copy. It has no SectionHeader, because the gold label inside the card
 * *is* its heading.
 */
export function CulturalTip() {
  const { t, tx } = useTranslation();
  const tip = tipRepository.getTipOfTheDay();

  return (
    <Card variant="brand" style={styles.outer}>
      <View style={styles.inner}>
        <View style={styles.labelRow}>
          <Icon name="lightbulb" size={16} color={colors.gold} />
          <Text style={styles.label}>{t('home.tip.label')}</Text>
        </View>

        {/* The tip body is long-form content, so it lives on the record. */}
        <Text style={styles.body}>{tx(tip.body)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginBottom: spacing.xl
  },
  inner: {
    padding: spacing.lg2,
    gap: spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: { ...typography.eyebrowSm, color: colors.gold },
  body: { ...typography.bodyTip, color: colors.brandTipText },
});
