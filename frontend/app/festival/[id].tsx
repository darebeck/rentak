import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout';
import { colors, typography } from '@/theme';

// Placeholder. Rendering the id proves the dynamic segment reaches the screen.
export default function FestivalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <Text style={{ ...typography.screenTitle, color: colors.brand }}>{id}</Text>
    </Screen>
  );
}
