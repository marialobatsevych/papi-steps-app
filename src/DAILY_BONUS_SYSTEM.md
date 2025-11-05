# 🎁 Daily Bonus System

## Обзор

Система ежедневных бонусов предоставляет игрокам случайные предметы (1 еда + 1 игрушка) каждые 24 часа при входе в приложение.

---

## ✨ Основные Функции

### Автоматическая Проверка
- ✅ Проверяется при каждом входе в приложение
- ✅ Бонус выдается автоматически, если прошло 24 часа (или при первом входе)
- ✅ При получении бонуса автоматически показывается Daily Reward экран
- ✅ Предметы добавляются в инвентарь
- ✅ Toast уведомление показывает полученные предметы

### Случайный Выбор
- 🎲 1 случайная еда из 9 доступных
- 🎲 1 случайная игрушка из 6 доступных
- 🎲 Каждый день разные предметы

### Чистый Старт
- 📦 Инвентарь начинается пустым
- 🎁 Первый бонус получается сразу при первом входе
- 🔄 Каждый игрок начинает одинаково

---

## 🎨 Визуальное Отображение

### Daily Reward Экран

При получении ежедневного бонуса, пользователь видит два отдельных блока с emoji и названиями:

**Блок 1 - Еда:**
```
┌─────────────────────────────────┐
│  🦴  Premium Bone               │
└─────────────────────────────────┘
```

**Блок 2 - Игрушка:**
```
┌─────────────────────────────────┐
│  🧶  Yarn Ball                  │
└─────────────────────────────────┘
```

### Структура Блока
- **Background:** `bg-white/40` (полупрозрачный белый)
- **Border radius:** `rounded-2xl` (16px)
- **Padding:** `p-4` (16px)
- **Layout:** Flexbox с emoji слева и названием справа
- **Emoji size:** `text-2xl`
- **Text style:** `font-['Nunito'] font-semibold text-base`
- **Text color:** `text-[#333] opacity-60`

### Пример Отображения

```
Daily Reward! ✨

┌─────────────────────────────────┐
│  💰  +100 coins                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  🍪  Star Cookie                │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  🎲  Rainbow Cube               │
└─────────────────────────────────┘

    [✨ Collect Reward]
    [Continue to room]
```

### Инвентарь (Модальное Окно)

В инвентаре предметы отображаются с **настоящими изображениями** (такими же как в магазине):

```
Feed Papi / Play with Papi

┌───────┐  ┌───────┐  ┌───────┐
│ [IMG] │  │ [IMG] │  │ [IMG] │
│  🦴   │  │  🍪   │  │  🍌   │
│Bone   │  │Cookie │  │Banana │
└───────┘  └───────┘  └───────┘
```

**Технические детали:**
- Если у предмета есть `imageUrl` → показывается изображение 64x64px
- Если нет `imageUrl` → показывается emoji в качестве fallback
- Изображения импортируются из `figma:asset/...`
- Те же самые изображения, что и в магазине

---

## 🎮 Доступные Предметы

### Еда (9 вариантов)
| Название | Эффект | Emoji |
|----------|--------|-------|
| Fresh Carrot | +15 Hunger | 🥕 |
| Rice Bowl | +20 Hunger | 🍚 |
| Fish Snacks | +25 Hunger | 🐟 |
| Star Cookie | +30 Hunger | 🍪 |
| Premium Bone | +35 Hunger | 🦴 |
| Cool Banana | +40 Hunger | 🍌 |
| Love Cupcake | +45 Hunger | 🧁 |
| Chicken Leg | +50 Hunger | 🍗 |
| Meat Feast | +55 Hunger | 🥩 |

### Игрушки (6 вариантов)
| Название | Эффект | Emoji |
|----------|--------|-------|
| Tennis Ball | +20 Fun | 🎾 |
| Yarn Ball | +28 Fun | 🧶 |
| Puzzle Buddy | +33 Fun | 🧩 |
| Rainbow Cube | +38 Fun | 🎲 |
| Cuddle Bear | +43 Fun | 🧸 |
| Space Rocket | +55 Fun | 🚀 |

---

## 🔧 Технические Детали

### Импорт Изображений

Все изображения предметов импортируются из Figma Assets в `/utils/dailyBonusSystem.ts`:

```typescript
import fishImage from 'figma:asset/b60b2e31bd60711f29bea10086f8dd02a48259a1.png';
import boneImage from 'figma:asset/dd0188f73a98e7ff1b89a8d28c8f4e8067ef6087.png';
import steakImage from 'figma:asset/49aa32a632cbfbb5ecb305c904e64cd226120ab4.png';
// ... и т.д. для всех 15 предметов
```

Эти изображения добавляются в массивы предметов:

```typescript
const SHOP_FOOD_ITEMS: DailyBonusItem[] = [
  { 
    id: 'food1', 
    name: 'Premium Bone', 
    emoji: '🦴', 
    category: 'food', 
    imageUrl: boneImage,  // ← Изображение для отображения в инвентаре
    effectiveness: 35 
  },
  // ...
];
```

**Важно:** Те же самые изображения используются в магазине (`KawaiiShopScreen.tsx`)

### Файл: `/utils/dailyBonusSystem.ts`

#### Основные Функции

```typescript
// Проверка, прошло ли 24 часа
shouldReceiveDailyBonus(): boolean

// Получить бонус (случайная еда + игрушка)
claimDailyBonus(): DailyBonusItem[]

// Получить предметы, выданные сегодня
getTodaysBonusItems(): DailyBonusItem[] | null

// Время до следующего бонуса (в миллисекундах)
getTimeUntilNextBonus(): number

// Форматированное время до следующего бонуса
formatTimeUntilBonus(): string

// Сброс системы (для тестирования)
resetDailyBonusSystem(): void
```

#### Структура Данных

```typescript
interface DailyBonusItem {
  id: string;
  name: string;
  emoji: string;
  category: 'food' | 'toys';
  imageUrl?: string;
  effectiveness?: number;
}

interface DailyBonusState {
  lastBonusTimestamp: number;
  todaysBonusItems?: DailyBonusItem[];
}
```

### Интеграция в App.tsx

```typescript
// State для хранения полученных бонусов
const [dailyBonusItems, setDailyBonusItems] = useState<DailyBonusItem[]>([]);

useEffect(() => {
  if (!isLoggedIn) return;

  // Проверка ежедневного бонуса
  if (shouldReceiveDailyBonus()) {
    const bonusItems = claimDailyBonus();
    
    // Сохранить для отображения в Daily Reward экране
    setDailyBonusItems(bonusItems);
    
    // Добавить в инвентарь
    const newInventoryItems = bonusItems.map((item, index) => ({
      id: `daily_bonus_${Date.now()}_${index}`,
      name: item.name,
      emoji: item.emoji,
      category: item.category,
      imageUrl: item.imageUrl,
      effectiveness: item.effectiveness,
    }));
    
    setInventory(prev => [...prev, ...newInventoryItems]);
    
    // Показать Daily Reward экран
    setShowDailyReward(true);
    setCurrentScreen('dailyReward');
    
    // Показать уведомление
    const foodItem = bonusItems.find(i => i.category === 'food');
    const toyItem = bonusItems.find(i => i.category === 'toys');
    
    toast.success('Daily Bonus! 🎁', {
      description: `You received ${foodItem?.name} and ${toyItem?.name}!`,
      duration: 5000,
    });
  }
}, [isLoggedIn]);

// В Daily Reward экране
const foodItem = dailyBonusItems.find(i => i.category === 'food');
const toyItem = dailyBonusItems.find(i => i.category === 'toys');

<KawaiiDailyRewardScreen
  reward={{
    foodItem: foodItem ? { name: foodItem.name, emoji: foodItem.emoji } : undefined,
    toyItem: toyItem ? { name: toyItem.name, emoji: toyItem.emoji } : undefined
  }}
/>
```

---

## 💾 Хранение Данных

### LocalStorage Key
`papiDailyBonusState`

### Сохраняемые Данные
```json
{
  "lastBonusTimestamp": 1730210400000,
  "todaysBonusItems": [
    {
      "id": "food1",
      "name": "Premium Bone",
      "emoji": "🦴",
      "category": "food",
      "effectiveness": 35
    },
    {
      "id": "toy4",
      "name": "Yarn Ball",
      "emoji": "🧶",
      "category": "toys",
      "effectiveness": 28
    }
  ]
}
```

---

## ⏰ Временная Логика

### 24-часовой Интервал
```typescript
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 86,400,000 ms
```

### Проверка Времени
```typescript
const timeSinceLastBonus = Date.now() - lastBonusTimestamp;
const shouldReceive = timeSinceLastBonus >= TWENTY_FOUR_HOURS;
```

### Форматирование
```typescript
// Пример: "5h 30m" или "45m"
formatTimeUntilBonus() → "5h 30m"
```

---

## 🎯 Примеры Использования

### Проверка Доступности Бонуса
```typescript
import { shouldReceiveDailyBonus, formatTimeUntilBonus } from './utils/dailyBonusSystem';

if (shouldReceiveDailyBonus()) {
  console.log('Bonus available!');
} else {
  console.log(`Next bonus in: ${formatTimeUntilBonus()}`);
}
```

### Получение Бонуса
```typescript
import { claimDailyBonus } from './utils/dailyBonusSystem';

const items = claimDailyBonus();
console.log('Received:', items);
// Received: [{ name: 'Premium Bone', ... }, { name: 'Yarn Ball', ... }]
```

### Сброс Для Тестирования
```typescript
import { resetDailyBonusSystem } from './utils/dailyBonusSystem';

// Сбросить систему, чтобы получить бонус снова
resetDailyBonusSystem();
```

---

## 🐛 Тестирование

### Ручное Тестирование

1. **Первый вход:**
   ```
   1. Очистить localStorage
   2. Войти в приложение
   3. Проверить, что получен бонус
   4. Проверить инвентарь (должно быть 2 предмета)
   ```

2. **Повторный вход (до 24ч):**
   ```
   1. Выйти и войти снова
   2. Бонус НЕ должен выдаться
   3. Инвентарь остается прежним
   ```

3. **После 24 часов:**
   ```
   1. Изменить lastBonusTimestamp на вчера
   2. Войти в приложение
   3. Должен получить новый бонус
   4. Инвентарь увеличится на 2 предмета
   ```

### Изменение Timestamp Вручную
```javascript
// В консоли браузера
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
state.lastBonusTimestamp = Date.now() - (25 * 60 * 60 * 1000); // 25 часов назад
localStorage.setItem('papiDailyBonusState', JSON.stringify(state));
// Перезагрузить страницу
```

---

## 🔄 Будущие Улучшения

### Возможные Расширения
- 📊 Статистика полученных предметов
- 🎁 Специальные бонусы по выходным
- ⭐ Редкие предметы с низкой вероятностью
- 📅 Календарь бонусов с прогрессом
- 🏆 Streak система (бонусы за последовательные дни)

### UI Улучшения
- 🎨 Экран с превью сегодняшних бонусов
- ⏰ Таймер до следующего бонуса
- 📜 История полученных бонусов
- 🎊 Анимация получения бонуса

---

## 📝 Примечания

### Важные Моменты
1. ✅ Инвентарь начинается пустым (без предустановленных предметов)
2. ✅ Первый бонус выдается сразу при первом входе
3. ✅ Каждый предмет получает уникальный ID с timestamp
4. ✅ Effectiveness предмета сохраняется для использования
5. ✅ Toast уведомление показывает названия полученных предметов

### Совместимость
- ✅ Работает с существующей системой инвентаря
- ✅ Не конфликтует с покупками в магазине
- ✅ Независим от системы daily rewards
- ✅ Готов к Capacitor iOS экспорту

---

**Версия:** 2.7  
**Дата:** October 29, 2025  
**Статус:** ✅ Полностью реализовано
