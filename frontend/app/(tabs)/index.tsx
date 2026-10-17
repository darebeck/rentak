import { View } from 'react-native';
import { Screen } from '@/components/layout';
import { useTabBarInset } from '@/hooks/useTabBarInset';
import { layout } from '@/theme';
import {
  HomeHeader, FeaturedFestival, QuickActions, ContinueLearning,
  UpcomingEvents, RecommendedForYou, RecentActivity, CulturalTip,
} from '@/features/home';

export default function HomeScreen() {
  const tabBarInset = useTabBarInset();

  return (
    <Screen bottomInset={tabBarInset}>
      <View style={{ gap: layout.sectionGap }}>
        <HomeHeader />
        <FeaturedFestival />
        <QuickActions />
        <ContinueLearning />
        <UpcomingEvents />
        <RecommendedForYou />
        <RecentActivity />
        <CulturalTip />
      </View>
    </Screen>
  );
}
