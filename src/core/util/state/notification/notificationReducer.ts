import { NotificationState, UserNotification } from './NotificationContext';

export type NotificationAction =
  | { type: 'ADD'; notification: UserNotification }
  | { type: 'REMOVE'; id: string };

export function notificationReducer(
  state: NotificationState,
  action: NotificationAction
): NotificationState {
  switch (action.type) {
    case 'ADD':
      return [...state, action.notification];
    case 'REMOVE':
      return state.filter(n => n.id !== action.id);
    default:
      return state;
  }
}
