# Notification Settings System

## Overview
Система управления уведомлениями в приложении Papi Steps позволяет пользователям контролировать, какие типы уведомлений они хотят получать.

## Features

### Settings Screen (Menu → Settings → Notifications)

Секция Notifications в экране настроек позволяет включать/выключать следующие типы уведомлений:

#### 🔔 All Notifications
- **Master toggle** - управляет всеми уведомлениями сразу
- При выключении "All Notifications" все остальные переключатели становятся неактивными
- При включении всех индивидуальных настроек, "All Notifications" автоматически включается

#### 💌 Friend Messages
- Уведомления о сообщениях от друзей
- Уведомления о запросах дружбы
- Уведомления об активности друзей
- **Градиент:** Розовый (#FFB7C5 → #F9B4C9)

#### 🎾 Papi Status
- Уведомления о голоде Papi (Hunger Alert)
- Уведомления об усталости Papi (Energy Alert)
- Уведомления о скуке Papi (Fun Alert)
- **Градиент:** Лавандовый (#C8B8FF → #BDB2FF)

#### ⏰ Daily Reminders
- Ежедневные напоминания о входе в приложение
- Уведомления о доступности Daily Reward
- **Градиент:** Жёлтый (#FFD66C → #FFF2B2)

## Technical Implementation

### Files

1. **`/components/screens/KawaiiSettingsScreen.tsx`**
   - UI компонент для управления настройками
   - Раскрывающаяся секция с переключателями
   - Сохранение настроек в localStorage

2. **`/utils/notificationSettings.ts`**
   - Утилиты для работы с настройками уведомлений
   - Функции проверки разрешений для каждого типа уведомлений
   - LocalStorage управление

3. **`/utils/notificationSystem.ts`**
   - Интеграция с системой уведомлений
   - Проверка разрешений перед созданием уведомлений
   - Все notification creators теперь возвращают `Notification | null`

### Storage

Настройки сохраняются в `localStorage` под ключом `'notificationSettings'`:

```typescript
interface NotificationSettings {
  all: boolean;
  friendMessages: boolean;
  papiStatus: boolean;
  dailyReminders: boolean;
}
```

### API Functions

```typescript
// Get current settings
getNotificationSettings(): NotificationSettings

// Save settings
saveNotificationSettings(settings: NotificationSettings): void

// Check if specific type is enabled
isNotificationEnabled(type: keyof NotificationSettings): boolean

// Helper functions
canShowFriendMessageNotification(): boolean
canShowPapiStatusNotification(): boolean
canShowDailyReminderNotification(): boolean
```

## UI/UX Features

### Visual Design
- **Раскрывающаяся секция** с chevron иконкой (↓/↑)
- **Цветные градиенты** на Switch компонентах для каждого типа
- **Disabled состояние** для индивидуальных настроек когда "All" выключен
- **Info block** с напоминанием о настройках iOS

### Behavior
- Клик на заголовок секции раскрывает/сворачивает настройки
- Master toggle выключает все уведомления одновременно
- Включение всех индивидуальных настроек активирует master toggle
- Настройки сохраняются мгновенно при изменении

## Usage Example

```typescript
import { 
  canShowPapiStatusNotification,
  canShowFriendMessageNotification 
} from './utils/notificationSettings';

// Before creating a notification
if (canShowPapiStatusNotification()) {
  createHungerAlert();
}

if (canShowFriendMessageNotification()) {
  createMessageNotification(friendName, message);
}
```

## Integration with iOS

Приложение напоминает пользователям о необходимости включить разрешения на уведомления в настройках iOS:

> 💡 **Note:** Notification permissions are managed through your device settings. Make sure to enable notifications for Papi Steps in your iOS Settings.

Эти настройки работают **в дополнение** к системным разрешениям iOS, позволяя более детальный контроль над типами уведомлений внутри приложения.
