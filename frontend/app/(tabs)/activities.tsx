import { Text } from 'react-native';
import { Screen } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { useTabBarInset } from '@/hooks/useTabBarInset';
import { colors, typography } from '@/theme';

/**
 * 15 Activities — placeholder. Built in docs/12-activities.md.
 *
 * In the design this screen has no title: it opens on a full-bleed site map with
 * a floating search field. The tab label stands in until then.
 */
export default function ActivitiesScreen() {
  const { t } = useTranslation();
  const tabBarInset = useTabBarInset();
  return (
    <Screen bottomInset={tabBarInset}>
      <Text style={{ ...typography.screenTitle, color: colors.brand }}>{t('tabs.activities')}</Text>
    </Screen>
  );
}
