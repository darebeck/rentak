import { View } from 'react-native';
import { colors } from '@/theme';

type ProgressBarProps = {
  /** 0–1. Values outside the range are clamped rather than trusted. */
  value: number;
  /**
   * The fill colour. All three occur in the design: brand green for learning
   * progress, gold for the festival challenge, terracotta for a stalled badge.
   */
  color?: string;
  /** 3 on the splash indicator, 5 for the compact card row, 6 elsewhere. */
  height?: 3 | 5 | 6;
  /** Track colour. Defaults to `surfaceSunken`; the splash sits on a lighter one. */
  trackColor?: string;
};

export function ProgressBar({
  value,
  color = colors.brand,
  height = 5,
  trackColor = colors.surfaceSunken,
}: ProgressBarProps) {
  // Guard against NaN as well as out-of-range: `order / totalInCourse` is
  // divided at the call site, and a zero denominator would poison the width.
  const ratio = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(ratio * 100) }}
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: trackColor,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${ratio * 100}%`,
          height: '100%',
          borderRadius: height / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
