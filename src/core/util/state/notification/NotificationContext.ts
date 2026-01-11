import { createContext } from 'react';

export type UserNotification = {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  showTimeInMs?: number;
};

export type NotificationState = UserNotification[];

export type NotificationContextValue = {
  notifications: NotificationState;
  addNotification: (n: Omit<UserNotification, 'id'>) => string;
  removeNotification: (id: string) => void;
};

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);
