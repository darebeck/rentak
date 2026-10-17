import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Header } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { layout } from '@/theme';
import { InterestsScreen } from '@/features/onboarding';

export default function InterestsRoute() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Screen>
      <View style={{ gap: layout.sectionGap }}>
        <Header title={t('onboarding.interests.title')} step={t('onboarding.interests.step')} onBack={() => router.back()} backAccessibilityLabel={t('common.back')} />
        <InterestsScreen />
      </View>
    </Screen>
  );
}