# 🎖️ Level Badge System

## Обзор

Level Badge System - это визуальная система отображения текущего уровня игрока на главном экране приложения Papi Steps. Бейдж показывает уровень игрока, рассчитанный на основе общего количества пройденных шагов.

**Дата создания:** 2 ноября 2025  
**Версия:** 1.0  
**Статус:** ✅ Реализовано

---

## 📍 Расположение

Level Badge отображается в **верхней панели главного экрана** в компоненте `EvolutionProgress`:

- **Для стадий эволюции** (birth, baby, teenager): рядом с названием стадии
- **Для взрослой стадии** (adult): рядом с текстом "Daily Goal"
- **Также показывается** около текста "Reach your daily goal" внизу прогресс-бара

---

## 🎨 Дизайн

### Внешний вид

- **Форма:** Круглый бейдж (rounded-full)
- **Размер:** 28x28px (по умолчанию)
- **Градиент:** Меняется в зависимости от уровня
- **Границы:** Белая рамка 2px с opacity 80%
- **Тень:** Мягкая тень 0_2px_8px_rgba(0,0,0,0.15)
- **Текст:** Белый, жирный, с тенью
- **Анимации:** Hover эффект (scale 1.1x), shimmer

### Цветовые градиенты по уровням

| Уровень | Градиент | Значение |
|---------|----------|----------|
| 1-4 | Light Pink | `from-[#FFD6E8] via-[#FFB7C5] to-[#FF9FB7]` |
| 5-9 | Pink | `from-[#FFB7C5] via-[#FF9FB7] to-[#FF87A9]` |
| 10-14 | Blue | `from-[#B8E3FF] via-[#8ED4FF] to-[#6EC5FF]` |
| 15-19 | Purple | `from-[#C8B8FF] via-[#B8A8FF] to-[#A99EFF]` |
| 20+ | Gold | `from-[#FFD66C] via-[#FFC94D] to-[#FFB830]` |

### Дополнительные эффекты

- **Уровень 10+:** Добавляется анимированная искорка ✨ в правом верхнем углу
- **Hover:** Shimmer эффект (блестящая полоса проходит по бейджу)
- **Cursor:** Pointer (кликабельный вид)

---

## 💻 Технические детали

### Файлы

**Основной компонент:**
- `/components/LevelBadge.tsx` - Компонент бейджа уровня

**Интеграция:**
- `/components/EvolutionProgress.tsx` - Использует LevelBadge
- `/utils/levelSystem.ts` - Рассчитывает уровень на основе шагов

### Props интерфейс

```typescript
interface LevelBadgeProps {
  level: number;           // Текущий уровень игрока
  size?: 'small' | 'medium' | 'large';  // Размер бейджа
  showLabel?: boolean;     // Показывать ли надпись "LVL"
}
```

### Размеры

```typescript
const sizeConfig = {
  small: {
    container: 'w-7 h-7',      // 28x28px
    text: 'text-[11px]',       // Размер номера уровня
    labelText: 'text-[9px]',   // Размер "LVL"
    iconPadding: 'p-1'
  },
  medium: {
    container: 'w-10 h-10',    // 40x40px
    text: 'text-sm',
    labelText: 'text-[10px]',
    iconPadding: 'p-1.5'
  },
  large: {
    container: 'w-12 h-12',    // 48x48px
    text: 'text-base',
    labelText: 'text-xs',
    iconPadding: 'p-2'
  }
};
```

---

## 🔧 Использование

### Базовое использование

```tsx
import { LevelBadge } from './components/LevelBadge';
import { calculateLevel } from './utils/levelSystem';

const currentLevel = calculateLevel(totalSteps);

<LevelBadge level={currentLevel} />
```

### С настройками

```tsx
// Большой размер с надписью "LVL"
<LevelBadge 
  level={15} 
  size="large" 
  showLabel={true} 
/>

// Маленький размер без надписи (используется в EvolutionProgress)
<LevelBadge 
  level={currentLevel} 
  size="small" 
  showLabel={false} 
/>
```

### В EvolutionProgress

```tsx
export function EvolutionProgress({ totalSteps, ... }: EvolutionProgressProps) {
  const currentLevel = calculateLevel(totalSteps);
  
  return (
    <div className="flex items-center gap-2">
      <LevelBadge level={currentLevel} size="small" showLabel={false} />
      <span>Daily Goal</span>
    </div>
  );
}
```

---

## 📊 Система уровней

### Расчет уровня

Уровень рассчитывается на основе **общего количества шагов** (totalSteps) с использованием геометрической прогрессии:

```typescript
// Level System Formula
Level 1:  1,000 steps
Level 2:  3,000 steps (cumulative)
Level 3:  7,000 steps (cumulative)
Level 4: 15,000 steps (cumulative)
// Each level requires 2x more steps than previous
```

### Функции levelSystem.ts

```typescript
calculateLevel(totalSteps: number): number
// Рассчитывает текущий уровень на основе шагов

getStepsForLevel(level: number): number
// Возвращает общее количество шагов для достижения уровня

getStepsForNextLevel(currentLevel: number): number
// Возвращает количество шагов для следующего уровня

getLevelProgress(totalSteps: number)
// Возвращает детальную информацию о прогрессе
```

---

## 🎯 Примеры уровней

### Milestone таблица

| Уровень | Общие шаги | Шагов для уровня | Градиент |
|---------|-----------|------------------|----------|
| 1 | 1,000 | 1,000 | Light Pink |
| 5 | 31,000 | 16,000 | Pink |
| 10 | 1,023,000 | 512,000 | Blue ✨ |
| 15 | 32,767,000 | 16,384,000 | Purple ✨ |
| 20 | 1,048,575,000 | 524,288,000 | Gold ✨ |

---

## 🎨 Kawaii Guidelines

Level Badge следует всем kawaii guidelines:

✅ **Цвета:** Пастельные градиенты (розовый, фиолетовый, голубой, золотой)  
✅ **Формы:** Полностью скругленные (rounded-full)  
✅ **Тени:** Мягкие, 15% opacity  
✅ **Анимации:** Плавные, приятные (shimmer, scale)  
✅ **Типографика:** Nunito, жирный, белый с тенью  
✅ **Spacing:** Базовая единица 8px  
✅ **Интерактивность:** Hover эффекты, cursor pointer

---

## 🌟 Особенности

### 1. Динамический градиент
Цвет бейджа меняется в зависимости от достижений игрока, мотивируя продолжать ходить.

### 2. Искорка для высоких уровней
Начиная с уровня 10, добавляется анимированная искорка ✨, подчеркивающая достижение.

### 3. Shimmer эффект
При наведении появляется блестящая полоса, делая бейдж "живым" и интерактивным.

### 4. Адаптивные размеры
Три размера (small, medium, large) для разных контекстов использования.

### 5. Опциональная надпись
Можно показывать или скрывать надпись "LVL" под бейджем.

---

## 📱 Отображение на экранах

### Home Screen (KawaiiHomeScreen)

```
┌─────────────────────────────────────────┐
│  [Menu] [🎖️12 Daily Goal] [💰 1580]    │  ← Level Badge здесь
│                                         │
│  ═══════════════════════════ 85%        │  ← Progress bar
│                                         │
│  Reach your daily goal                  │  ← Текст рядом с бейджем
└─────────────────────────────────────────┘
```

### Evolution Stage (Baby/Teenager)

```
┌─────────────────────────────────────────┐
│  [Menu] [🎖️8 Baby Papi → teenager]     │  ← Level Badge
│         [35,000 steps]                  │
│                                         │
│  ═══════════════════════════ 45%        │
│                                         │
│  14,000 steps to evolve                 │
└─────────────────────────────────────────┘
```

---

## 🔄 Обновления уровня

### Когда уровень повышается

1. **Расчет:** Автоматически при увеличении totalSteps
2. **Анимация:** Градиент плавно меняется (transition-all duration-300)
3. **Уведомление:** Toast с поздравлением (реализовано в App.tsx)
4. **Искорка:** Добавляется при достижении уровня 10+

### Пример уведомления

```typescript
// В App.tsx
if (newLevel > oldLevel) {
  toast.success(`🎉 Level Up!`, {
    description: `You reached Level ${newLevel}! Keep walking!`,
    duration: 5000,
  });
}
```

---

## 🧪 Тестирование

### Тест разных уровней

```typescript
// В DevTools Console
import { calculateLevel } from './utils/levelSystem';

// Тест уровня 1
calculateLevel(1000);   // => 1

// Тест уровня 5
calculateLevel(31000);  // => 5

// Тест уровня 10 (с искоркой)
calculateLevel(1023000); // => 10

// Тест уровня 20 (золотой)
calculateLevel(1048575000); // => 20
```

### Визуальное тестирование

1. Откройте приложение
2. Найдите Level Badge в верхней панели
3. Проверьте:
   - ✅ Правильный номер уровня
   - ✅ Корректный цвет градиента
   - ✅ Искорка на уровне 10+
   - ✅ Hover эффект (shimmer)
   - ✅ Белая рамка
   - ✅ Мягкая тень

---

## 🚀 Будущие улучшения

### Возможные дополнения:

1. **Анимация Level Up**
   - Эффект "взрыва" при повышении уровня
   - Конфетти или sparkles

2. **Клик на бейдж**
   - Открывать модальное окно с детальной статистикой уровня
   - Показывать прогресс до следующего уровня

3. **Звуковые эффекты**
   - Приятный звук при повышении уровня
   - Звук при наведении

4. **Достижения**
   - Специальные значки за milestone уровни (10, 20, 50)
   - Уникальные градиенты для особых достижений

5. **Анимация перехода**
   - Плавная смена градиента при повышении уровня
   - Пульсация при достижении нового уровня

---

## 📝 Checklist

Перед деплоем убедитесь:

- [x] ✅ LevelBadge.tsx создан
- [x] ✅ Интегрирован в EvolutionProgress.tsx
- [x] ✅ Использует calculateLevel из levelSystem.ts
- [x] ✅ Правильные градиенты для всех уровней
- [x] ✅ Искорка добавляется на уровне 10+
- [x] ✅ Hover эффект работает
- [x] ✅ Адаптивные размеры (small, medium, large)
- [x] ✅ Следует kawaii guidelines
- [x] ✅ Документация создана

---

## 💡 Использование в других экранах

Level Badge можно использовать не только на главном экране:

### Profile Screen
```tsx
<LevelBadge level={currentLevel} size="large" showLabel={true} />
```

### Friends Screen (показать уровни друзей)
```tsx
{friends.map(friend => (
  <div className="flex items-center gap-2">
    <LevelBadge level={friend.level} size="small" />
    <span>{friend.name}</span>
  </div>
))}
```

### Leaderboard
```tsx
<LevelBadge level={player.level} size="medium" showLabel={false} />
```

---

**Автор:** AI Assistant  
**Дата:** 2 ноября 2025  
**Версия:** 1.0  
**Статус:** ✅ Production Ready
