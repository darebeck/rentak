import { View } from "react-native";
import { Screen, Header } from "@/components/layout";
import { useTranslation } from "@/i18n";
import { layout } from "@/theme";
import { LanguagePicker } from "@/features/onboarding";

export default function LanguageScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <View style={{ gap: layout.sectionGap }}>
        <Header title={t('onboarding.language.title')}/>
        <LanguagePicker />
      </View>
    </Screen>
  );
}