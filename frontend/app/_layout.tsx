import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from '@/i18n';
import { UserProvider } from '@/data/store';

// Module scope, not awaited — inside a component this can run after the native
// splash has already auto-hidden, and then it does nothing.
SplashScreen.preventAutoHideAsync();

/**
 * Hides the native splash once the providers above it have hydrated.
 *
 * UserProvider renders null until loadUserState() resolves, so this component
 * mounting *is* the readiness signal — no second `ready` flag to keep in sync,
 * and no blank frame between the native splash and the first real screen.
 */
function SplashGate() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return null;
}

export default function RootLayout() {
  return (
    // SafeAreaProvider must sit above anything calling useSafeAreaInsets() —
    // which `Screen` does, so every screen depends on it.
    <SafeAreaProvider>
      <I18nProvider>
        <UserProvider>
          <SplashGate />
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="festival/[id]" />
            {/* Profile left the tab bar in v2 — it is pushed from Home's avatar. */}
            <Stack.Screen name="profile/index" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="auth/sign-out" options={{ presentation: 'modal' }} />
          </Stack>
        </UserProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
