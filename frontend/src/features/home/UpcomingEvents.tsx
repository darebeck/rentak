import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Icon } from '@/components/ui';
import { SectionHeader } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { eventRepository, venueRepository } from '@/data/repositories';
import { formatDayOfMonth, formatTime, formatWeekday } from '@/lib/dates';
import { colors, layout, spacing, typography } from '@/theme';

/** The design shows two rows; more would push the tip card below the fold. */
const ROW_COUNT = 2;

/**
 * Home's "Upcoming events" list — the next couple of things the user is going to.
 *
 * The rows are separated by a divider on every row *but the last*, which the
 * design does everywhere it groups rows. Deriving that from the index here is
 * what stops the stray line above the card's bottom edge.
 */
export function UpcomingEvents() {
  const { t, tx } = useTranslation();
  const router = useRouter();
  const upcoming = eventRepository.getUpcoming(ROW_COUNT);

  if (upcoming.length === 0) return null;

  return (
    <View style={styles.section}>
      <SectionHeader
        title={t('home.section.upcoming')}
        actionLabel={t('home.action.mySchedule')}
        onActionPress={() => router.push('/(tabs)/schedule')}
      />

      <Card variant="shadow">
        {upcoming.map((event, index) => {
          const venue = venueRepository.getById(event.venueId);
          return (
            <Pressable
              key={event.id}
              onPress={() => router.push(`/festival/${event.festivalId}`)}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.row,
                index < upcoming.length - 1 && styles.rowDivided,
                pressed && styles.rowPressed,
              ]}
            >
              <View style={styles.dateColumn}>
                <Text style={styles.weekday}>{formatWeekday(event.startsAt, t)}</Text>
                <Text style={styles.day}>{formatDayOfMonth(event.startsAt)}</Text>
              </View>

              <View style={styles.body}>
                <Text numberOfLines={1} style={styles.title}>
                  {tx(event.title)}
                </Text>
                <Text numberOfLines={1} style={styles.meta}>
                  {/* Chrome joins the two content values — never string concatenation
                      of translated fragments. */}
                  {t('home.upcoming.timeAndVenue', {
                    time: formatTime(event.startsAt),
                    venue: tx(venue?.name),
                  })}
                </Text>
              </View>

              <Icon name="caret-right" size={16} color={colors.icon.chevron} />
            </Pressable>
          );
        })}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: layout.headerGap },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg3,
    minHeight: 44,
  },
  rowDivided: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.divider,
  },
  rowPressed: { opacity: 0.85 },
  dateColumn: {
    width: 48,
    alignItems: 'center',
    gap: spacing.xs3,
  },
  weekday: { ...typography.dateWeekday, color: colors.terracottaText },
  day: { ...typography.dateDay, color: colors.brand },
  body: { flex: 1, gap: spacing.xs2 },
  title: { ...typography.rowTitle, color: colors.text.primary },
  meta: { ...typography.meta, color: colors.text.muted },
});
