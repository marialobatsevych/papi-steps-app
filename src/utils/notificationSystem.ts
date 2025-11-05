// Notification System for Papi Steps
// Manages all types of notifications and their state

import { 
  canShowPapiStatusNotification, 
  canShowDailyReminderNotification 
} from './notificationSettings';

export type NotificationType = 
  | 'hunger_alert'
  | 'energy_alert'
  | 'fun_alert'
  | 'daily_goal'
  | 'friend_request'
  | 'friend_activity'
  | 'message'
  | 'evolution'
  | 'shop_update'
  | 'daily_reward'
  | 'level_up';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  icon: string; // emoji
  actionText?: string;
  actionData?: any;
}

const STORAGE_KEY = 'papiNotifications';
const MAX_NOTIFICATIONS = 50;

// Get all notifications from localStorage
export const getNotifications = (): Notification[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
};

// Save notifications to localStorage
const saveNotifications = (notifications: Notification[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

// Add a new notification
export const addNotification = (
  type: NotificationType,
  title: string,
  message: string,
  icon: string = '🔔',
  actionText?: string,
  actionData?: any
): Notification => {
  const notification: Notification = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    title,
    message,
    timestamp: Date.now(),
    read: false,
    icon,
    actionText,
    actionData
  };

  const notifications = getNotifications();
  notifications.unshift(notification); // Add to beginning
  
  // Keep only MAX_NOTIFICATIONS
  const trimmed = notifications.slice(0, MAX_NOTIFICATIONS);
  saveNotifications(trimmed);
  
  return notification;
};

// Mark notification as read
export const markAsRead = (id: string): void => {
  const notifications = getNotifications();
  const updated = notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  );
  saveNotifications(updated);
};

// Mark all notifications as read
export const markAllAsRead = (): void => {
  const notifications = getNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  saveNotifications(updated);
};

// Delete a notification
export const deleteNotification = (id: string): void => {
  const notifications = getNotifications();
  const filtered = notifications.filter(n => n.id !== id);
  saveNotifications(filtered);
};

// Clear all notifications
export const clearAllNotifications = (): void => {
  saveNotifications([]);
};

// Get unread count
export const getUnreadCount = (): number => {
  const notifications = getNotifications();
  return notifications.filter(n => !n.read).length;
};

// Preset notification creators
export const createHungerAlert = (): Notification | null => {
  if (!canShowPapiStatusNotification()) {
    return null;
  }
  return addNotification(
    'hunger_alert',
    'Papi is Hungry! 🍖',
    'Your Papi needs food! Feed them to keep them happy and healthy.',
    '🍖',
    'Feed Now'
  );
};

export const createEnergyAlert = (): Notification | null => {
  if (!canShowPapiStatusNotification()) {
    return null;
  }
  return addNotification(
    'energy_alert',
    'Papi is Tired! 😴',
    'Your Papi is running low on energy. Let them sleep to recharge!',
    '😴',
    'Sleep Now'
  );
};

export const createFunAlert = (): Notification | null => {
  if (!canShowPapiStatusNotification()) {
    return null;
  }
  return addNotification(
    'fun_alert',
    'Papi Needs Fun! 🎾',
    'Your Papi is getting bored! Play with them to boost their mood.',
    '🎾',
    'Play Now'
  );
};

export const createDailyGoalNotification = (steps: number): Notification => {
  return addNotification(
    'daily_goal',
    'Daily Goal Achieved! 🎉',
    `Congratulations! You reached ${steps.toLocaleString()} steps and earned 300 coins!`,
    '🎉'
  );
};

export const createFriendRequestNotification = (friendName: string): Notification | null => {
  // Friend Messages notifications are disabled
  return null;
};

export const createFriendActivityNotification = (friendName: string, activity: string): Notification | null => {
  // Friend Messages notifications are disabled
  return null;
};

export const createMessageNotification = (from: string, preview: string): Notification | null => {
  // Friend Messages notifications are disabled
  return null;
};

export const createEvolutionNotification = (stage: string): Notification => {
  return addNotification(
    'evolution',
    'Papi Evolved! ✨',
    `Congratulations! Papi reached the ${stage} stage!`,
    '✨'
  );
};

export const createLevelUpNotification = (level: number): Notification => {
  return addNotification(
    'level_up',
    'Level Up! 🎊',
    `Amazing! You reached level ${level}!`,
    '🎊'
  );
};

export const createShopUpdateNotification = (itemName: string): Notification => {
  return addNotification(
    'shop_update',
    'New Item in Shop! 🛍️',
    `${itemName} is now available in the shop!`,
    '🛍️',
    'Visit Shop'
  );
};

export const createDailyRewardNotification = (): Notification | null => {
  if (!canShowDailyReminderNotification()) {
    return null;
  }
  return addNotification(
    'daily_reward',
    'Daily Reward Ready! 🎁',
    'Your daily reward is waiting for you! Log in to claim it.',
    '🎁',
    'Claim Now'
  );
};

// Check and create stat alerts (called periodically)
export const checkStatAlerts = (hunger: number, energy: number, fun: number): void => {
  const ALERT_THRESHOLD = 30;
  const notifications = getNotifications();
  const recentAlerts = notifications.filter(n => 
    Date.now() - n.timestamp < 3600000 // 1 hour
  );

  // Only create alert if no recent similar alert exists
  if (hunger < ALERT_THRESHOLD && !recentAlerts.some(n => n.type === 'hunger_alert')) {
    createHungerAlert();
  }
  
  if (energy < ALERT_THRESHOLD && !recentAlerts.some(n => n.type === 'energy_alert')) {
    createEnergyAlert();
  }
  
  if (fun < ALERT_THRESHOLD && !recentAlerts.some(n => n.type === 'fun_alert')) {
    createFunAlert();
  }
};
