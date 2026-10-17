import { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useTranslation } from "@/i18n";
import { useRouter } from "expo-router";
import { useUser } from "@/data/store";
import { Button, Icon } from "@/components/ui";
import { Screen } from "@/components/layout";
import { colors, radii, spacing, typography } from "@/theme";

export default function SignOutModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const { update } = useUser();
  const [clearDownloads, setClearDownloads] = useState(false);

  function handleSignOut() {
    update({ session: { kind: 'guest' }, ...(clearDownloads ? { downloads: [] } : {}) });
    router.replace('auth/signed-out');
  }

  return (
    <Screen>
      <View style={{ gap: spacing.lg }}>
        <Text style={styles.title}>{t('auth.signOut.title')}</Text>
        <Text style={styles.body}>{t('auth.signOut.consequence')}</Text>

        <Pressable
          onPress={() => setClearDownloads((c) => !c)}
          style={styles.consentRow}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: clearDownloads }}
        >
          <View style={[styles.checkbox, clearDownloads && styles.checkboxChecked]}>
            {clearDownloads ? <Icon name="seal-check" size={14} color={colors.brandOnDark} /> : null}
          </View>
          <Text style={styles.consentText}>{t('auth.signOut.clearDownloads')}</Text>
        </Pressable>

        <Button label={t('auth.signOut.cancel')} onPress={() => router.back()} fullWidth />
        <Button 
          label={t('auth.signOut.confirm')} 
          onPress={handleSignOut} 
          variant="outline"
          tint={colors.terracottaText}
          style={{ borderColor: colors.terracottaText}}
          fullWidth 
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: { ...typography.pageTitle, color: colors.text.primary },
  body: { ...typography.body, color: colors.text.body },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md2 },
  checkbox: {
    width: 22, height: 22, borderRadius: radii.sm, borderWidth: 1,
    borderColor: colors.border.strong, alignItems: 'center', justifyContent: 'center'
  },
  checkboxChecked: { backgroundColor: colors.brand, borderColor: colors.brand },
  consentText: { ...typography.metaLg, color: colors.text.body, flex: 1 },
});