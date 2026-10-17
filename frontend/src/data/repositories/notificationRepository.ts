import notificationsJson from '../content/notifications.json';
import type { AppNotification, NotificationKind } from '@/types';

const notifications = notificationsJson as AppNotification[];

const byNewestFirst = (a: AppNotification, b: AppNotification) => b.at.localeCompare(a.at);

export const notificationRepository = {
  list(): AppNotification[] {
    return [...notifications].sort(byNewestFirst);
  },

  getById(id: string): AppNotification | undefined {
    return notifications.find((n) => n.id === id);
  },

  /** The four kinds are also 35's four toggles, so this is how they get gated. */
  listByKind(kind: NotificationKind): AppNotification[] {
    return notifications.filter((n) => n.kind === kind).sort(byNewestFirst);
  },
};
