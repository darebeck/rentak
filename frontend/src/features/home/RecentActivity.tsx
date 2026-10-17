import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon, type IconName } from '@/components/ui';
import { SectionHeader } from '@/components/layout';
import { useUser } from '@/data/store';
import { useTranslation } from '@/i18n';
import { colors, layout, spacing, typography } from '@/theme';
import type { ActivityKind } from '@/types';

/** Icon and tint per activity kind, straight from the design. */
const KIND_STYLE: Record<ActivityKind, { icon: IconName; color: string }> = {
  stamp: { icon: 'seal-check', color: colors.goldText },
  registration: { icon: 'ticket', color: colors.brand },
};

/**
 * Home's "Recent activity" list — the only Home section reading user state
 * rather than content.
 *
 * The labels are chrome keys because these entries are seeded fixtures standing
 * in for activity the app will generate itself. When real check-ins produce
 * them the label becomes a chrome template with a content value dropped in, and
 * this component keeps its shape.
 */
export function RecentActivity() {
  const { t } = useTranslation();
  const { state } = useUser();
  const entries = state.recentActivity;

  if (entries.length === 0) return null;

  return (
    <View style={styles.section}>
      <SectionHeader title={t('home.section.recentActivity')} />

      <Card variant="shadow">
        {entries.map((entry, index) => {
          const { icon, color } = KIND_STYLE[entry.kind];

          return (
            <View
              key={entry.id}
              style={[styles.row, index < entries.length - 1 && styles.rowDivided]}
            >
              <Icon name={icon} size={20} color={color} />
              <Text style={styles.label}>{t(entry.labelKey)}</Text>
              <Text style={styles.age}>{t('home.activity.age', { n: entry.daysAgo })}</Text>
            </View>
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
    gap: spacing.md2,
    paddingVertical: 13,
    paddingHorizontal: spacing.lg3,
  },
  rowDivided: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.divider,
  },
  label: { ...typography.rowTitleSm, fontWeight: '400', flex: 1, color: colors.text.primary },
  age: { ...typography.meta, color: colors.text.faint },
});
