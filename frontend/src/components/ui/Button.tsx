import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radii, spacing } from '@/theme';
import { Icon, type IconName } from './Icon';

/**
 * The design has exactly three button shapes, and each carries its own
 * geometry — there is no separate size axis to vary:
 *
 *   primary  the full-width "Register — Free" bar (52 high, radius 16, 17/600)
 *   outline  the "Join" pill (1px brand border, transparent, 14/600)
 *   pill     the gold "Scan" pill (gold fill, dark ink, 14/600)
 */
type ButtonVariant = 'primary' | 'outline' | 'pill';

type ButtonProps = {
  /** Already translated by the caller. */
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  /** Stretch to fill the row — the persistent register bar does this. */
  fullWidth?: boolean;
  icon?: IconName;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  tint?: string;
};

const INK: Record<ButtonVariant, string> = {
  primary: colors.brandOnDark,
  outline: colors.brand,
  pill: colors.onGold,
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  fullWidth = false,
  icon,
  disabled = false,
  style,
  tint
}: ButtonProps) {
  const ink = tint ?? INK[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        // Press feedback and the disabled state are themed rather than left to
        // platform defaults, which differ between iOS and Android.
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon ? <Icon name={icon} size={variant === 'primary' ? 22 : 16} color={ink} /> : null}
        <Text style={[styles.labelBase, styles[`${variant}Label`], { color: ink }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start', justifyContent: 'center' },
  fullWidth: { alignSelf: 'stretch' },

  primary: {
    height: 52,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.lg,
  },
  outline: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.brand,
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  pill: {
    borderRadius: radii.pill,
    backgroundColor: colors.gold,
    paddingVertical: 9,
    paddingHorizontal: spacing.md,
  },

  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.45 },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  labelBase: { fontWeight: '600' },
  primaryLabel: { fontSize: 17 },
  outlineLabel: { fontSize: 14 },
  pillLabel: { fontSize: 14 },
});
