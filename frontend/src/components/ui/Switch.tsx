import { Switch as RNSwitch, Platform } from 'react-native';
import { colors } from '@/theme';

type SwitchProps = {
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
  /** Already translated by the caller. */
  accessibilityLabel?: string;
};

/**
 * The settings toggle for 10, 34, 35, 36 and 37.
 *
 * A thin wrapper over the platform control on purpose: this is the one place in
 * the design where matching the OS beats matching the artboard, because users
 * read a native switch faster than a custom one. All it adds is the brand tint,
 * so a toggle is never the stock iOS green on a heritage-palette screen.
 *
 * Note these toggles must actually gate something — per-purpose consent on 34
 * and the accessibility settings on 37 are features, not decoration.
 */
export function Switch({ value, onValueChange, disabled = false, accessibilityLabel }: SwitchProps) {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      // iOS tints the whole track; Android tints thumb and track separately.
      trackColor={{ false: colors.surfaceSunken, true: colors.brand }}
      thumbColor={Platform.OS === 'android' ? colors.surface : undefined}
      ios_backgroundColor={colors.surfaceSunken}
      style={{ opacity: disabled ? 0.45 : 1 }}
    />
  );
}
