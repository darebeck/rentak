import { Pressable, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/i18n";
import { useUser } from "@/data/store";
import { festivalRepository } from "@/data/repositories";
import { Button } from "@/components/ui";
import { Screen } from "@/components/layout";
import { colors, typography, spacing } from "@/theme";

const PLACEHOLDER_STATE = 'Kelantan';

export default function SignedOutRoute() {
  const { t, tx } = useTranslation();
  const router = useRouter();
  const { state, update } = useUser();

  const nextFestival = festivalRepository.getNextInState(PLACEHOLDER_STATE);

  function handleGuest() {
    update({ session: { kind: 'guest' } });
    router.replace('/(tabs)/festivals');
  }

  return (
    <Screen>
      <View style={{ gap: spacing.lg }}>
        <Text style={styles.title}>{t('auth.signedOut.title', { name: state.name })}</Text>
        <Text style={styles.body}>{t('auth.signedOut.body', { count: state.stamps.length })}</Text>

        {nextFestival ? (
          <Text style={styles.nextUp}>
            {t('auth.signedOut.nextUp', { name: tx(nextFestival.name), date: nextFestival.startDate })}
          </Text>
        ) : null}

        <Button label={t('auth.signedOut.signInAgain')} onPress={() => router.replace('/auth/sign-in')} fullWidth />
        <Button label={t('auth.signedOut.guest')} onPress={handleGuest} variant="outline" fullWidth />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.pageTitle, color: colors.text.primary },
  body: { ...typography.body, color: colors.text.body },
  nextUp: { ...typography.metaLg, color: colors.text.subtle },
});