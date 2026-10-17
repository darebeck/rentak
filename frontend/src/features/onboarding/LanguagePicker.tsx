import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button, Icon } from "@/components/ui";
import { useUser } from "@/data/store";
import { useTranslation } from "@/i18n";
import { colors, radii, spacing, typography } from "@/theme";
import type { Locale } from "@/types";

type Row = { locale: Locale | null; nativeLabel: string; gloss: string; disabled: boolean };

// The two disabled rows are NOT locales — keep them typed `locale: null`.
// Do not create zh.json / ta.json for them (root CLAUDE.md's "the trap").
const ROWS: Row[] = [
  { locale: 'en', nativeLabel: 'English', gloss: 'English', disabled: false },
  { locale: 'ms', nativeLabel: 'Bahasa Melayu', gloss: 'Bahasa Malaysia', disabled: false },
  { locale: null, nativeLabel: '中文', gloss: 'Chinese · coming soon', disabled: true },
  { locale: null, nativeLabel: 'தமிழ்', gloss: 'Tamil · coming soon', disabled: true },
];

export function LanguagePicker() {
  const { t, setLocale } = useTranslation();
  const { state, update } = useUser();
  const router = useRouter();
  const [selected, setSelected] = useState<Locale | null>(null);

  const selectedRow = ROWS.find((r) => r.locale === selected);

  function handleContinue() {
    if (!selected) return;
    setLocale(selected);
    update({
      settings: { ...state.settings, locale: selected },
      onboarding: { ...state.onboarding, languageChosen: true },
    });
    router.replace('/onboarding');
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <Text style={styles.body}>{t('onboarding.language.body')}</Text>

      <View style={{ gap: spacing.md2 }}>
        {ROWS.map((row) => {
          const isSelected = row.locale !== null && row.locale === selected;
          return (
            <Pressable
              key={row.nativeLabel}
              disabled={row.disabled}
              onPress={() => setSelected(row.locale)}
              accessibilityRole="button"
              accessibilityState={{ disabled: row.disabled, selected: isSelected}}
              style={[styles.row, isSelected && styles.rowSelected, row.disabled && styles.rowDisabled]}
            >
              <View>
                <Text style={styles.native}>{row.nativeLabel}</Text>
                <Text style={styles.gloss}>{row.gloss}</Text>
              </View>
              {isSelected ? <Icon name="seal-check" color={colors.brand} /> : null}
            </Pressable>
          );
        })}
      </View>

      {selectedRow ? (
        <Text style={styles.selectedLine}>
          {t('onboarding.language.selected', { name: selectedRow.nativeLabel })}
        </Text>
      ) : null}

      <Button label={t('onboarding.language.continue')} onPress={handleContinue} disabled={!selected} fullWidth />
    </View>
  );
}

const styles = StyleSheet.create({
  body: { ...typography.body, color: colors.text.body },
  row: {
    minHeight: 64,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSelected: { borderColor: colors.brand },
  rowDisabled: { opacity: 0.45 },
  native: { ...typography.rowTitle, color: colors.text.primary },
  gloss: { ...typography.meta, color: colors.text.muted },
  selectedLine: { ...typography.metaLg, color: colors.text.subtle },
});