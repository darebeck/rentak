import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

export type NotificationPermission = 'granted' | 'denied' | 'undetermined' | 'unavailable';

// Android Expo Go (SDK 53+) no longer ships expo-notifications; importing it throws.
// Always go through this module — never import expo-notifications at the top of a file.
const unsupported =
  Platform.OS === 'android' &&
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (unsupported) return 'unavailable';
  try {
    const Notifications = await import('expo-notifications');
    const { status } = await Notifications.requestPermissionsAsync();
    return status;
  } catch {
    return 'unavailable';
  }
}
