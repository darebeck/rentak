import type { ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { useTranslation } from '@/i18n';
import { colors, typography } from '@/theme';
import { Icon, type IconName } from '@/components/ui';

export default function TabsLayout() {
  const { t } = useTranslation();

  const tab = (name: IconName) =>
    // React Navigation types the tint as ColorValue, but the only values it can
    // hand back are the two theme strings set in screenOptions below.
    function TabBarIcon({ color, focused }: { color: ColorValue; focused: boolean }) {
      return (
        <Icon name={name} size={24} color={color as string} weight={focused ? 'fill' : 'regular'} />
      );
    };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        // The design's inactive tab items are #9B9E95 (text.faint). text.disabled
        // (#B3B6AD) is the chevron colour — a different role that reads too light here.
        tabBarInactiveTintColor: colors.text.faint,
        tabBarLabelStyle: typography.tabLabel,
        tabBarStyle: {
          // Absolute so content scrolls *under* the bar, which is what the
          // design's translucent 94%-opacity fill is for. Screens pay for it by
          // passing `useTabBarInset()` into Screen's `bottomInset`.
          position: 'absolute',
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border.default,
          borderTopWidth: 1,
        },
      }}
    >
      {/* Order follows these entries, not file order — keep it the design's. */}
      <Tabs.Screen name="index"     options={{ title: t('tabs.home'),      tabBarIcon: tab('house') }} />
      <Tabs.Screen name="festivals" options={{ title: t('tabs.festivals'), tabBarIcon: tab('ticket') }} />
      <Tabs.Screen name="heritage"   options={{ title: t('tabs.heritage'),   tabBarIcon: tab('book-open') }} />
      <Tabs.Screen name="activities" options={{ title: t('tabs.activities'), tabBarIcon: tab('hand-heart') }} />
      <Tabs.Screen name="schedule"   options={{ title: t('tabs.schedule'),   tabBarIcon: tab('calendar-check') }} />
    </Tabs>
  );
}
