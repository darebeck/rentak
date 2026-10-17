import { Text } from 'react-native';
import { Screen } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { colors, typography } from '@/theme';

/**
 * 17 Profile — placeholder. Built in docs/14-profile-and-settings.md.
 *
 * Not a tab in v2: it is a stack screen pushed from Home's header avatar.
 */
export default function ProfileScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Text style={{ ...typography.pageTitle, color: colors.brand }}>
        {t('home.action.profile')}
      </Text>
    </Screen>
  );
}
