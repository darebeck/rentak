import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { useTranslation } from "@/i18n";
import { typography, colors, spacing } from "@/theme";
import { useUser } from "@/data/store";
import { useRouter } from "expo-router";
import { Button, TextField } from "@/components/ui";

const OAUTH_ENABLED = false;

const LANGUAGE_LABELS: Record<string, string> = { en: 'English', ms: 'Bahasa Melayu' };

export function SignInScreen() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { update } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    if (!email || !password) return;
    update({ session: { kind: 'account', email } });
    router.replace('/(tabs)');
  }

  function handleGuest() {
    update({session: { kind: 'guest' } });
    router.replace('/(tabs)');
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <View style={styles.topRow}>
        <View style={{ gap: spacing.sm2, flex: 1 }}>
          <Text style={styles.title}>{t('auth.signIn.title')}</Text>
          <Text style={styles.body}>{t('auth.signIn.body')}</Text>
        </View>
        <Pressable onPress={() => router.push('/onboarding/language')}>
          <Text style={styles.link}>{LANGUAGE_LABELS[locale]}</Text>
        </Pressable>
      </View>

      <TextField
        label={t('auth.signIn.emailLabel')}
        value={email}
        onChangeText={setEmail}
        placeholder={t('auth.signIn.emailPlaceholder')}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      

      <TextField
        label={t('auth.signIn.passwordLabel')}
        value={password}
        onChangeText={setPassword}
        secure
        revealAccessibilityLabel={t('auth.signIn.revealPassword')}
      />

      <Pressable onPress={() => router.push('/auth/forgot-password')}>
        <Text style={styles.link}>{t('auth.signIn.forgotPassword')}</Text>
      </Pressable>

      <Button label={t('auth.signIn.submit')} onPress={handleSignIn} disabled={!email || !password} fullWidth />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine}/>
        <Text style={styles.dividerLabel}>{t('auth.signIn.or')}</Text>
        <View style={styles.dividerLine}/>
      </View>

      {OAUTH_ENABLED ? (
        <View style={{ gap: spacing.md2}}>
          <Button label={t('auth.signIn.apple')} onPress={handleSignIn} variant="outline" fullWidth />
          <Button label={t('auth.signIn.google')} onPress={handleSignIn} variant="outline" fullWidth />
        </View>
      ) : null}

      <Button label={t('auth.signIn.guest')} onPress={handleGuest} variant="outline" fullWidth />

      <Pressable onPress={() => router.push('/auth/create-account')} style={styles.footer}>
        <Text style={styles.footerText}>{t('auth.signIn.createAccount')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md2 },
  title: { ...typography.greetingName, color: colors.brand },
  body: { ...typography.body, color: colors.text.body },
  link: { ...typography.link, color: colors.brand },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md2 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border.default },
  dividerLabel: { ...typography.meta, color: colors.text.muted },
  footer: { alignSelf: 'center', marginTop: spacing.md2 },
  footerText: { ...typography.metaLg, color: colors.text.body },
});