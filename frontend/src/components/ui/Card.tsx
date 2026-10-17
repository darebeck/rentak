import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radii, shadows } from '@/theme';

type CardVariant = 'shadow' | 'outlined' | 'brand';

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  radius?: keyof typeof radii;
  /** Use `shadows.card` instead of `shadows.hairline` — hero cards only. */
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * The surface every grouped block on every screen sits on.
 *
 * All three variants appear on Home alone: `shadow` for the hero card and list
 * groups, `outlined` for the quick-action tiles, `brand` for the cultural tip.
 *
 * Rendered as two nested Views on purpose. On Android, `overflow: 'hidden'`
 * and `elevation` fight each other — a card that clips a rounded image loses
 * its shadow. Splitting the roles fixes it: the outer view carries the
 * background and the shadow, the inner view does the clipping.
 */
export function Card({
  children,
  variant = 'shadow',
  radius = '2xl',
  elevated = false,
  style,
}: CardProps) {
  const borderRadius = radii[radius];

  const variants: Record<CardVariant, ViewStyle> = {
    shadow: {
      backgroundColor: colors.surface,
      ...(elevated ? shadows.card : shadows.hairline),
    },
    outlined: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border.default,
    },
    brand: {
      backgroundColor: colors.brand,
    },
  };

  return (
    <View style={[{ borderRadius }, variants[variant], style]}>
      <View style={{ borderRadius, overflow: 'hidden' }}>{children}</View>
    </View>
  );
}
