import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "@/components/ui";
import { useUser } from "@/data/store";
import { useTranslation } from "@/i18n";
import { colors, spacing, typography } from "@/theme";
import { OtpInput } from "./OtpInput";

const RESEND_SECONDS = 24;

export function VerifyScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { state, update } = useUser();
  const { purpose = 'verify-signup' } = useLocalSearchParams<{ purpose?: string }>();

  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const code = digits.join('');
  const canVerify = code.length === 6;

  function handleVerify() {
    if (!canVerify) return;
    update({ session: { ...state.session, verifiedAt: new Date().toISOString() } });
    router.replace(purpose === 'reset-password' ? '/auth/sign-in' : '/onboarding/interests');
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <Text style={styles.body}>
        {t(purpose === 'reset-password' ? 'auth.verify.bodyReset' : 'auth.verify.body', {
          email: state.session.email ?? '',
        })}
      </Text>

      <OtpInput value={digits} onChange={setDigits} />

      {secondsLeft > 0 ? (
        <Text style={styles.timer}>{t('auth.verify.resendIn', { seconds: secondsLeft })}</Text>
      ) : (
        <Pressable onPress={() => setSecondsLeft(RESEND_SECONDS)}>
          <Text style={styles.resendLink}>{t('auth.verify.resendNow')}</Text>
        </Pressable>
      )}

      <Button label={t('auth.verify.submit')} onPress={handleVerify} disabled={!canVerify} fullWidth />

      <Text style={styles.helper}>
        {t('auth.verify.noCode')}{' '}
        <Text style={styles.link} onPress={() => router.back()}>
          {t('auth.verify.changeEmail')}
        </Text>
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  body: { ...typography.body, color: colors.text.body },
  timer: { ...typography.metaLg, color: colors.text.muted },
  resendLink: { ...typography.link, color: colors.brand },
  helper: { ...typography.meta, color: colors.text.muted },
  link: { color: colors.brand, fontWeight: '600' },
});