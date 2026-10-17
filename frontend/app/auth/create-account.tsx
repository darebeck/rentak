import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Header } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { layout } from '@/theme';
import { CreateAccountScreen } from '@/features/auth';

export default function CreateAccountRoute() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Screen>
      <View style={{ gap: layout.sectionGap }}>
        <Header
          title={t('auth.createAccount.title')}
          step={t('auth.createAccount.step')}
          onBack={() => router.back()}
          backAccessibilityLabel={t('common.back')}
        />
        <CreateAccountScreen />
      </View>
    </Screen>
  );
}