import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, ImageSlot } from "@/components/ui";
import { useUser } from "@/data/store";
import { useTranslation } from "@/i18n";
import { colors, radii, spacing, typography } from "@/theme";

const ARTS_FORMS = [
  { id: 'mak-yong', imageKey: 'rentak-int-1', labelKey: 'onboarding.interests.makYong' },
  { id: 'wayang-kulit', imageKey: 'rentak-int-2', labelKey: 'onboarding.interests.wayangKulit' },
  { id: 'sape', imageKey: 'rentak-int-3', labelKey: 'onboarding.interests.sape' },
  { id: 'dikit-barat', imageKey: 'rentak-int-4', labelKey: 'onboarding.interests.dikirBarat' },
  { id: 'randai', imageKey: 'rentak-int-5', labelKey: 'onboarding.interests.randai' },
  { id: 'gamelan', imageKey: 'rentak-int-6', labelKey: 'onboarding.interests.gamelan' },
] as const;

const MIN_SELECTED = 2;

export function InterestsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { state, update } = useUser();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isEdit = mode === 'edit';

  const [selectedIds, setSelectedIds] = useState<string[]>(state.interests);

  function toggle(id: string) {
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));
  }

  function persistAndGo() {
    update({ interests: selectedIds, onboarding: { ...state.onboarding, interestsSet: true } });
    if (isEdit) router.back();
    else router.replace('/onboarding/notifications');
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <Text style={styles.body}>{t('onboarding.interests.body')}</Text>

      <View style={styles.grid}>
        {ARTS_FORMS.map((form) => {
          const isSelected = selectedIds.includes(form.id);
          return (
            <Pressable key={form.id} style={styles.tile} onPress={() => toggle(form.id)}>
              <ImageSlot imageKey={form.imageKey} height={100} radius="xl" label={t(form.labelKey)} />
              <View style={[styles.checkDot, isSelected && styles.checkDotActive]} />
              <Text style={styles.tileLabel}>{t(form.labelKey)}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.count}>{t('onboarding.interests.count', { n: selectedIds.length })}</Text>

      <View style={{ gap: spacing.md2 }}>
        <Button label={t('onboarding.interests.continue')} onPress={persistAndGo} disabled={selectedIds.length < MIN_SELECTED} fullWidth  />
        {!isEdit ? <Button label={t('onboarding.interests.skip')} onPress={persistAndGo} variant="outline" fullWidth  /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { ...typography.body, color: colors.text.body },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md2 },
  tile: { width: '47%', gap: spacing.sm2 },
  tileLabel: { ...typography.rowTitleSm, color: colors.text.primary },
  checkDot: {
    position: 'absolute', top: spacing.sm2, right: spacing.sm2,
    width: 20, height: 20, borderRadius: radii.pill,
    borderWidth: 2, borderColor: colors.surface, backgroundColor: colors.border.strong,
  },
  checkDotActive: { backgroundColor: colors.brand },
  count: { ...typography.metaLg, color: colors.text.subtle },
});