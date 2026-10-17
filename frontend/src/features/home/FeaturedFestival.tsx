import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SectionHeader } from '@/components/layout';
import { Card, Icon, ImageSlot } from '@/components/ui';
import { festivalRepository } from '@/data/repositories';
import { useTranslation } from '@/i18n';
import { formatDateRange } from '@/lib/dates';
import { colors, layout, radii, spacing, typography } from '@/theme';

/**
 * Home's hero card.
 *
 * `Card` is a surface, not a layout — it brings a radius, a background, a
 * shadow and clipping, but no padding and no opinion about content. So this
 * hands it exactly two children: full-bleed media, then a padded body block.
 */
export function FeaturedFestival() {
  const { t, tx } = useTranslation();   // t for chrome, tx for content
  const router = useRouter();
  const festival = festivalRepository.getFeatured();

  if (!festival) return null;   // strict mode makes you handle this — good

  return (
    <View style={styles.section}>
      <SectionHeader
        title={t('home.section.featured')}
        actionLabel={t('home.action.seeAll')}
        onActionPress={() => router.push('/(tabs)/festivals')}
      />

      {/* The press target wraps the whole card, so the card keeps its layout. */}
      <Pressable onPress={() => router.push(`/festival/${festival.id}`)} accessibilityRole="button">
        <Card variant="shadow" radius="3xl" elevated>
          {/* Child 1 — media. radius="none" because the card already rounds the
              top corners; the slot's own radius would notch the bottom two. */}
          <View>
            <ImageSlot
              imageKey={festival.imageKey}
              height={196}
              radius="none"
              label={tx(festival.name)}
            />
            {festival.isHappeningNow ? (
              <View style={styles.pill}>
                <Text style={styles.pillText}>{t('home.badge.happeningNow')}</Text>
              </View>
            ) : null}
          </View>

          {/* Child 2 — the body brings its own padding. */}
          <View style={styles.body}>
            <Text style={styles.title}>{tx(festival.name)}</Text>

            <View style={styles.metaRow}>
              <View style={styles.meta}>
                <Icon name="calendar-blank" size={16} color={colors.text.muted} />
                <Text style={styles.metaText}>
                  {formatDateRange(festival.startDate, festival.endDate, t)}
                </Text>
              </View>
              <View style={styles.meta}>
                <Icon name="map-pin" size={16} color={colors.text.muted} />
                <Text style={styles.metaText}>{tx(festival.location)}</Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: layout.headerGap,
  },
  pill: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    paddingVertical: spacing.sm2,
    paddingHorizontal: spacing.md2,
    borderRadius: radii.pill,
    backgroundColor: colors.overlayPill,
  },
  pillText: {
    ...typography.pillLabel,
    color: colors.brand,
  },
  body: {
    paddingTop: spacing.lg3,
    paddingHorizontal: spacing.lg2,
    paddingBottom: spacing.lg2,
    gap: spacing.sm,
  },
  title: {
    ...typography.cardTitleLg,
    color: colors.text.primary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm3,
  },
  metaText: {
    ...typography.metaLg,
    color: colors.text.muted,
  },
});
