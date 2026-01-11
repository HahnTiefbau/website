import { ReactNode, useReducer, useCallback } from 'react';
import {
  NotificationContext,
  NotificationState,
  UserNotification,
} from './NotificationContext';
import { notificationReducer } from './notificationReducer';

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(
    notificationReducer,
    [] as NotificationState
  );

  const addNotification = useCallback((n: Omit<UserNotification, 'id'>) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD', notification: { id, ...n } });
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
