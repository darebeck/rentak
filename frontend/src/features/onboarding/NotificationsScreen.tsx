import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@/data/store";
import { useTranslation } from "@/i18n";
import { requestNotificationPermission } from "@/lib/notifications";
import { Button, Icon, Switch } from "@/components/ui";
import { colors, spacing, typography, radii } from "@/theme";

type PrefsKey = 'eventReminders' | 'nearbyFestivals' | 'weeklyStory';

const ROWS: { key: PrefsKey; icon: 'calendar-check' | 'map-pin' | 'book-open'; titleKey: string; reasonKey: string }[] = [
  { key: 'eventReminders', icon: 'calendar-check', titleKey: 'onboarding.notifications.eventTitle', reasonKey: 'onboarding.notifications.eventReason' },
  { key: 'nearbyFestivals', icon: 'map-pin', titleKey: 'onboarding.notifications.nearbyTitle', reasonKey: 'onboarding.notifications.nearbyReason' },
  { key: 'weeklyStory', icon: 'book-open', titleKey: 'onboarding.notifications.storyTitle', reasonKey: 'onboarding.notifications.storyReason' },
];

export function NotificationsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { state, update } = useUser();
  const [prefs, setPrefs] = useState(state.settings.notificationPrefs);

  function toggle(key: PrefsKey) {
    setPrefs((p) => ({ ...p, [key]: !p[key]}));
  }

  function persist() {
    update({ settings: { ...state.settings, notificationPrefs: prefs} });
  }

  async function handleAllow() {
    await requestNotificationPermission();
    persist();
    router.replace('/(tabs)');
  }

  function handleNotNow() {
    persist();
    router.replace('/(tabs)');
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <Text style={styles.body}>{t('onboarding.notifications.body')}</Text>

      <View style={{ gap: spacing.md2 }}>
        {ROWS.map((row) => (
          <View key={row.key} style={styles.row}>
            <Icon name={row.icon} color={colors.brand} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{t(row.titleKey)}</Text>
              <Text style={styles.rowReason}>{t(row.reasonKey)}</Text>
            </View>
            <Switch value={prefs[row.key]} onValueChange={() => toggle(row.key)} />
          </View>
        ))}
      </View>

      <View style={{ gap: spacing.md2 }}>
        <Button label={t('onboarding.notifications.allow')} onPress={handleAllow} fullWidth />
        <Button label={t('onboarding.notifications.notNow')} onPress={handleNotNow} variant="outline" fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { ...typography.body, color: colors.text.body },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md2,
    padding: spacing.md2, borderRadius: radii.lg, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border.default,
  },
  rowTitle: { ...typography.rowTitle, color: colors.text.primary },
  rowReason: { ...typography.meta, color: colors.text.muted },
});