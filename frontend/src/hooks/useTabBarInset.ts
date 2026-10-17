import { useContext } from 'react';
// Internal path on purpose. Expo Router 57 vendors React Navigation rather than
// depending on it, so `@react-navigation/bottom-tabs` — which BUILD_GUIDE §7.4
// tells you to import — does not resolve in this SDK. `expo-router/react-navigation`
// re-exports only `native` and `elements`, not `bottom-tabs`.
//
// This file is the single place that reaches into the build output, so if a
// later SDK moves it there is one import to fix rather than five screens. Same
// containment idea as `phosphorIcons.js`.
import { BottomTabBarHeightContext } from 'expo-router/build/react-navigation/bottom-tabs';

/**
 * How much bottom padding a tab screen needs so its last section clears the bar.
 *
 * The design's tab bar is translucent and content scrolls underneath it, so the
 * bar is positioned absolutely and cannot reserve its own layout space — the
 * screen has to pad for it.
 *
 * Returns 0 outside a tab navigator (the context is undefined there), which is
 * the right answer for a stack screen: it has no tab bar to clear.
 */
export function useTabBarInset(): number {
  return useContext(BottomTabBarHeightContext) ?? 0;
}
