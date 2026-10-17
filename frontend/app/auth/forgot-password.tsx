import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/i18n";
import { Button, TextField } from "@/components/ui";
import { Screen, Header } from "@/components/layout";
import { spacing, layout } from "@/theme";
import { useState } from "react";

export default function ForgotPasswordRoute() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <Screen>
      <View style={{ gap: layout.sectionGap}}>
        <Header title={t('auth.forgotPassword.title')} onBack={() => router.back()} backAccessibilityLabel={t('common.back')} />
        <View style={{ gap: spacing.lg }}>
          <TextField
            label={t('auth.forgotPassword.emailLabel')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button
            label={t('auth.forgotPassword.submit')}
            onPress={() => router.push('/auth/verify?purpose=reset-password')}
            disabled={!email}
            fullWidth
          />
        </View>
      </View>
    </Screen>
  );
}