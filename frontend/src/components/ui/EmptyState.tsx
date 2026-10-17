import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { Button } from './Button';
import { Icon, type IconName } from './Icon';

type EmptyStateProps = {
  icon: IconName;
  /** Already translated by the caller — primitives never touch i18n. */
  title: string;
  body?: string;
  action?: { label: string; onPress: () => void };
};

/**
 * What a list shows before the user has done anything yet — no saved events, no
 * stamps, no registrations.
 *
 * These states carry real weight in a guest-first app: a signed-out user meets
 * them constantly, so they offer the action that fills the list rather than
 * explaining that it is empty.
 */
export function EmptyState({ icon, title, body, action }: EmptyStateProps) {
  return (
    <View style={styles.wrapper}>
      <Icon name={icon} size={32} color={colors.icon.locked} />
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {action ? <Button label={action.label} onPress={action.onPress} variant="outline" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: spacing.md2,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: { ...typography.rowTitle, color: colors.text.primary, textAlign: 'center' },
  body: { ...typography.meta, color: colors.text.muted, textAlign: 'center' },
});
