import type { ReactNode } from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, layout } from '@/theme';

type ScreenProps = {
  children: ReactNode;
  /** Set false for screens that manage their own scrolling (the map, the splash). */
  scroll?: boolean;
  /** Which safe-area edges to pad. Top only by default. */
  edges?: { top?: boolean; bottom?: boolean };
  /**
   * Extra bottom padding, in points. Tab screens pass the measured tab-bar
   * height here so the last section clears the bar.
   */
  bottomInset?: number;
  /** Suppress the standard 20pt gutter — full-bleed hero screens need this. */
  fullBleed?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * The screen container. Owns the safe area so no screen ever hardcodes the
 * design's `padding-top: 64px` — that number was the Claude Design canvas
 * standing in for a status bar, and a real device reports its own inset.
 *
 * Requires <SafeAreaProvider> above it; it's mounted in app/_layout.tsx.
 */
export function Screen({
  children,
  scroll = true,
  edges = { top: true },
  bottomInset = 0,
  fullBleed = false,
  style,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const frame: ViewStyle = {
    flex: 1,
    backgroundColor: colors.bg.canvas,
    paddingHorizontal: fullBleed ? 0 : layout.screenGutter,
    paddingTop: edges.top ? insets.top : 0,
  };

  if (!scroll) {
    return (
      <View
        style={[frame, { paddingBottom: (edges.bottom ? insets.bottom : 0) + bottomInset }, style]}
      >
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={[frame, style]}
      // Vertical padding belongs on the content container, not on `style` —
      // on `style` it pads the viewport and won't scroll with the content.
      contentContainerStyle={{
        paddingBottom: (edges.bottom ? insets.bottom : 0) + bottomInset + layout.sectionGap,
      }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
