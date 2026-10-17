import { View } from "react-native";
import { useRouter } from "expo-router";
import { Screen, Header } from "@/components/layout";
import { useTranslation } from "@/i18n";
import { layout } from "@/theme";
import { VerifyScreen } from "@/features/auth";

export default function VerifyRoute() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen>
      <View style={{ gap: layout.sectionGap }}>
        <Header title={t('auth.verify.title')} step={t('auth.verify.step')} onBack={() => router.back()} backAccessibilityLabel={t('common.back')} />
        <VerifyScreen />
      </View>
    </Screen>
  );
}