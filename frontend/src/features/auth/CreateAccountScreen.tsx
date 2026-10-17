import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "@/i18n";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useUser } from "@/data/store";
import { Button, TextField, Icon } from "@/components/ui";
import { colors, radii, typography, spacing } from "@/theme";

export function CreateAccountScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { state, update } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const hasLength = password.length >= 8;
  const hasLetterAndNumber = /\d/.test(password) && /[a-zA-Z]/.test(password);
  const canContinue = Boolean(name && email && hasLength && hasLetterAndNumber && agreed);

  function handleContinue() {
    if (!canContinue) return;
    update({
      session: { kind: 'account', name, email },
      consents: [
        ...state.consents,
        { purpose: 'research', granted: true, decidedAt: new Date().toISOString() },
      ],
    });
    router.push('/auth/verify');
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <Text style={styles.body}>{t('auth.createAccount.body')}</Text>

      <TextField label={t('auth.createAccount.nameLabel')} value={name} onChangeText={setName} />
      <TextField
        label={t('auth.createAccount.emailLabel')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextField
        label={t('auth.createAccount.passwordLabel')}
        value={password}
        onChangeText={setPassword}
        secure
        revealAccessibilityLabel={t('auth.createAccount.revealPassword')}
      />

      <View style={{ gap: spacing.sm2 }}>
        <ChecklistRow met={hasLength} label={t('auth.createAccount.ruleLength')} />
        <ChecklistRow met={hasLetterAndNumber} label={t('auth.createAccount.ruleMix')} />
      </View>

      <Pressable
        onPress={() => setAgreed((a) => !a)}
        style={styles.consentRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agreed }}
      >
        <View style={[styles.checkBox, agreed && styles.checkBoxChecked]}>
          {agreed ? <Icon name="seal-check" size={14} color={colors.brandOnDark} /> : null }
        </View>
        <Text style={styles.consentText}>{t('auth.createAccount.consent')}</Text>
      </Pressable>

      <Button label={t('auth.createAccount.continue')} onPress={handleContinue} disabled={!canContinue} fullWidth />
    </View>
  );
}

function ChecklistRow({ met, label }: { met: boolean, label: string}) {
  return (
    <View style={styles.checkListRow}>
      <Icon name="seal-check" size={16} color={met ? colors.brand : colors.icon.chevron} />
      <Text style={[styles.checkListLabel, met && styles.checkListLabelMet]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { ...typography.body, color: colors.text.body },
  checkListRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm2 },
  checkListLabel: { ...typography.metaLg, color: colors.text.muted },
  checkListLabelMet: { color: colors.text.body },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md2 },
  checkBox: {
    width: 22, height: 22, borderRadius: radii.sm, borderWidth: 1,
    borderColor: colors.border.strong, alignItems: 'center', justifyContent: 'center',
  },
  checkBoxChecked: { backgroundColor: colors.brand, borderColor: colors.brand },
  consentText: { ...typography.metaLg, color: colors.text.body, flex: 1 },
});