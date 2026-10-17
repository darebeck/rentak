import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, ImageSlot } from '@/components/ui';
import { SectionHeader } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { festivalRepository } from '@/data/repositories';
import { formatDateRange } from '@/lib/dates';
import { colors, layout, spacing, typography } from '@/theme';

/**
 * Home's "Recommended for you" card.
 *
 * The reason line ("Because you saved Sape' music") is chrome for now — Phase 1
 * has a fixed pick, so there is nothing to interpolate. Once real interests
 * drive the choice it becomes a template with the art form dropped into it.
 */
export function RecommendedForYou() {
  const { t, tx } = useTranslation();   // t for chrome, tx for content
  const router = useRouter();
  const festival = festivalRepository.getRecommended();

  if (!festival) return null;

  return (
    <View style={styles.section}>
      <SectionHeader title={t('home.section.recommended')} />

      <Pressable
        onPress={() => router.push(`/festival/${festival.id}`)}
        accessibilityRole="button"
      >
        <Card variant="shadow">
          <View style={styles.row}>
            <ImageSlot
              imageKey={festival.imageKey}
              width={76}
              height={76}
              radius="lg"
              label={tx(festival.location)}
            />

            <View style={styles.body}>
              <Text style={styles.reason}>{t('home.recommended.reason')}</Text>
              <Text numberOfLines={2} style={styles.name}>
                {tx(festival.name)}
              </Text>
              <Text numberOfLines={1} style={styles.meta}>
                {t('home.recommended.locationAndDates', {
                  location: tx(festival.location),
                  dates: formatDateRange(festival.startDate, festival.endDate, t),
                })}
              </Text>
            </View>
          </View>
        </Card>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: layout.headerGap },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  body: { flex: 1, gap: spacing.sm3 },
  reason: { ...typography.pillLabel, color: colors.terracottaText },
  name: { ...typography.rowTitle, color: colors.text.primary },
  meta: { ...typography.meta, color: colors.text.muted },
});
