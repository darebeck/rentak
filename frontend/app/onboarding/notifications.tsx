import { View } from 'react-native';
import { Screen, Header } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { layout } from '@/theme';
import { NotificationsScreen } from '@/features/onboarding';

export default function NotificationsRoute() {
  const { t } = useTranslation();
  return (
    <Screen>
      <View style={{ gap: layout.sectionGap }}>
        <Header title={t('onboarding.notifications.title')} />
        <NotificationsScreen />
      </View>
    </Screen>
  );
}