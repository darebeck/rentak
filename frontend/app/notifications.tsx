import { Text } from 'react-native';
import { Screen } from '@/components/layout';
import { useTranslation } from '@/i18n';
import { colors, typography } from '@/theme';

/**
 * 23 Notifications — placeholder. Built in docs/14-profile-and-settings.md.
 *
 * It exists now so Home's header bell has somewhere real to go; the design's
 * navigation graph has no dead tap targets.
 */
export default function NotificationsScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Text style={{ ...typography.pageTitleSm, color: colors.brand }}>
        {t('home.action.notifications')}
      </Text>
    </Screen>
  );
}
