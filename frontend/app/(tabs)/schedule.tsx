import { Text } from 'react-native';
import { Screen } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { useTabBarInset } from '@/hooks/useTabBarInset';
import { colors, typography } from '@/theme';

/** 16 My Schedule — placeholder. Built in docs/13-my-schedule.md. */
export default function ScheduleScreen() {
  const { t } = useTranslation();
  const tabBarInset = useTabBarInset();
  return (
    <Screen bottomInset={tabBarInset}>
      <Text style={{ ...typography.pageTitleSm, color: colors.brand }}>{t('tabs.schedule')}</Text>
    </Screen>
  );
}
