import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@/theme';

type SectionHeaderProps = {
  /** Already translated by the caller. */
  title: string;
  /** Trailing link — "See all", "My journey", "View all". */
  actionLabel?: string;
  onActionPress?: () => void;
};

/**
 * The most repeated element in the design: an uppercase letter-spaced eyebrow
 * with an optional trailing link. Seven instances on Home alone.
 */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  const showAction = actionLabel !== undefined && onActionPress !== undefined;

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {showAction ? (
        <Pressable
          onPress={onActionPress}
          accessibilityRole="link"
          accessibilityLabel={actionLabel}
          // The label is small type, so widen the touch target rather than the
          // visible box — 44pt is the platform minimum for a comfortable tap.
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          {({ pressed }) => (
            <Text style={[styles.action, pressed && styles.actionPressed]}>{actionLabel}</Text>
          )}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.eyebrow,
    color: colors.text.subtle,
  },
  action: {
    ...typography.link,
    color: colors.brand,
  },
  actionPressed: { opacity: 0.6 },
});
