import { Pressable, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Card, Icon, type IconName } from "@/components/ui";
import { SectionHeader } from "@/components/layout";
import { useTranslation } from '@/i18n';
import { colors, layout, spacing, typography } from '@/theme';

/**
 * The four tiles, as data. `satisfies` keeps the literal types — so a typo'd
 * icon name is a compile error — while `t()` still sees the exact key strings.
 */
const ACTIONS = [
  { key: 'checkIn', icon: 'qr-code', href: '/(tabs)/activities', },
  { key: 'map', icon: 'map-trifold', href: '/(tabs)/activities', },
  { key: 'passport', icon: 'seal-check', href: '/(tabs)/schedule', },
  { key: 'saved', icon: 'bookmark-simple', href: '/(tabs)/schedule', },
] as const satisfies readonly { key: string; icon: IconName; href: string }[];

export function QuickActions() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.section}>
      <SectionHeader title={t('home.section.quickActions')} />
      <View style={styles.grid}>
        {ACTIONS.map((action) => (
          <Pressable
            key={action.key}
            style={styles.tile}
            onPress={() => router.push(action.href)}
            accessibilityRole="button"
          >
            <Card variant="outlined" radius="xl">
              {/* minHeight and centring live here — Card's inner view takes no style. */}
              <View style={styles.tileInner}>
                <Icon name={action.icon} size={22} color={colors.brand} />
                <Text numberOfLines={2} style={styles.label}>
                  {t(`home.quickAction.${action.key}`)}
                </Text>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: layout.headerGap,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md3
  },
  tile: {
    flex: 1,
  },
  tileInner: {
    minHeight: 80,
    // alignItems, not alignContent — alignContent only does anything on a
    // wrapping container, so it would leave the icon and label left-aligned.
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    // Keeps a wrapped label off the tile's border at a quarter screen width.
    paddingHorizontal: spacing.sm2,
  },
  label: {
    ...typography.pillLabel,
    color: colors.brand,
    textAlign: 'center',
  },
});
