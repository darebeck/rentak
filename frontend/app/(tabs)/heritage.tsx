import { Text } from 'react-native';
import { Screen } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { useTabBarInset } from '@/hooks/useTabBarInset';
import { colors, typography } from '@/theme';

export default function HeritageScreen() {
  const { t } = useTranslation();
  const tabBarInset = useTabBarInset();
  return (
    <Screen bottomInset={tabBarInset}>
      <Text style={{ ...typography.screenTitle, color: colors.brand }}>{t('tabs.heritage')}</Text>
    </Screen>
  );
}
