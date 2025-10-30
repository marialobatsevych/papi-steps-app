/**
 * Notification Settings Utility
 * Manages notification preferences for Papi Steps app
 */

export interface NotificationSettings {
  all: boolean;
  friendMessages: boolean;
  papiStatus: boolean;
  dailyReminders: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  all: true,
  friendMessages: true,
  papiStatus: true,
  dailyReminders: true,
};

const STORAGE_KEY = 'notificationSettings';

/**
 * Get notification settings from localStorage
 */
export function getNotificationSettings(): NotificationSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading notification settings:', error);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Save notification settings to localStorage
 */
export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving notification settings:', error);
  }
}

/**
 * Check if a specific notification type is enabled
 * Each type is now independent - no master toggle override
 */
export function isNotificationEnabled(type: keyof NotificationSettings): boolean {
  const settings = getNotificationSettings();
  return settings[type];
}

/**
 * Check if friend message notifications are enabled
 */
export function canShowFriendMessageNotification(): boolean {
  const settings = getNotificationSettings();
  return settings.friendMessages;
}

/**
 * Check if Papi status notifications are enabled
 */
export function canShowPapiStatusNotification(): boolean {
  const settings = getNotificationSettings();
  return settings.papiStatus;
}

/**
 * Check if daily reminder notifications are enabled
 */
export function canShowDailyReminderNotification(): boolean {
  const settings = getNotificationSettings();
  return settings.dailyReminders;
}
