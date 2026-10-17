import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Avatar, Icon } from '@/components/ui';
import { useUser } from '@/data/store';
import { useTranslation } from '@/i18n';
import { greetingKey } from '@/lib/dates';
import { colors, radii, spacing, typography } from '@/theme';

/**
 * Home's first section: a time-of-day greeting over the user's name, with the
 * notifications bell and the profile avatar right-aligned.
 *
 * These two are the whole of Home's outbound navigation beyond its cards — in
 * v2 Profile left the tab bar, so this avatar is the only way to reach it.
 */
export function HomeHeader() {
  const { t } = useTranslation();
  const { state } = useUser();
  const router = useRouter();

  return (
    <View style={styles.row}>
      <View style={styles.greetingBlock}>
        <Text style={styles.greeting}>{t(`home.greeting.${greetingKey()}`)}</Text>
        {/* The name is user data, not copy — it never goes through t(). */}
        <Text style={styles.name}>{state.name}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => router.push('/notifications')}
          accessibilityRole="button"
          accessibilityLabel={t('home.action.notifications')}
          style={({ pressed }) => [styles.bell, pressed && styles.bellPressed]}
        >
          <Icon name="bell" size={21} color={colors.brand} />
        </Pressable>

        <Avatar
          name={state.name}
          onPress={() => router.push('/profile')}
          accessibilityLabel={t('home.action.profile')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // The design aligns the buttons to the top of the greeting block, so a
    // two-line name grows downwards instead of shifting them.
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.lg3,
  },
  // flex so a long name wraps rather than pushing the buttons off the screen.
  greetingBlock: {
    flex: 1,
    gap: spacing.sm2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md3,
  },
  greeting: {
    ...typography.greeting,
    color: colors.text.subtle,
  },
  name: {
    ...typography.greetingName,
    color: colors.brand,
  },
  bell: {
    // 44 is already the platform minimum touch target, so no hitSlop needed —
    // unlike SectionHeader's action link, which is small type.
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellPressed: { opacity: 0.6 },
});
