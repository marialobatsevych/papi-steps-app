# 🔧 Papi Phrases API - Usage Examples

Примеры использования системы динамических фраз для разработчиков.

---

## 📦 Импорт

```typescript
import { 
  getRandomPhrase, 
  getNewRandomPhrase,
  calculateAverageState,
  getMoodCategory,
  PapiPhrase 
} from '../utils/papiPhrases';
```

---

## 🎯 Базовое Использование

### Пример 1: Получить случайную фразу

```typescript
import { getRandomPhrase } from '../utils/papiPhrases';

// Текущее состояние питомца
const hunger = 85;
const fun = 90;
const energy = 80;

// Получить фразу
const phrase = getRandomPhrase(hunger, fun, energy);

console.log(phrase.title);    // "I'm so happy to see you! ☀️"
console.log(phrase.subtitle); // undefined (опциональное поле)
```

---

### Пример 2: Получить новую фразу (без повторений)

```typescript
import { getNewRandomPhrase } from '../utils/papiPhrases';

const hunger = 45;
const fun = 55;
const energy = 50;

const currentPhrase = "Hey, I'm getting a little hungry 🍽️";

// Получить новую фразу, отличающуюся от текущей
const newPhrase = getNewRandomPhrase(hunger, fun, energy, currentPhrase);

console.log(newPhrase.title); // Любая фраза, кроме "Hey, I'm getting a little hungry 🍽️"
```

---

### Пример 3: Вычислить среднее состояние

```typescript
import { calculateAverageState } from '../utils/papiPhrases';

const hunger = 60;
const fun = 70;
const energy = 80;

const average = calculateAverageState(hunger, fun, energy);
console.log(average); // 70
```

---

### Пример 4: Определить категорию настроения

```typescript
import { getMoodCategory, calculateAverageState } from '../utils/papiPhrases';

const hunger = 30;
const fun = 25;
const energy = 20;

const average = calculateAverageState(hunger, fun, energy);
const mood = getMoodCategory(average);

console.log(mood); // "sad"
```

---

## 🎨 Продвинутые Примеры

### Пример 5: Использование в React компоненте

```typescript
import React, { useState, useEffect } from 'react';
import { getNewRandomPhrase, PapiPhrase } from '../utils/papiPhrases';

interface MyComponentProps {
  hunger: number;
  fun: number;
  energy: number;
}

function MyComponent({ hunger, fun, energy }: MyComponentProps) {
  const [phrase, setPhrase] = useState<PapiPhrase>({ 
    title: "Loading..." 
  });

  useEffect(() => {
    const newPhrase = getNewRandomPhrase(hunger, fun, energy);
    setPhrase(newPhrase);
  }, [hunger, fun, energy]);

  return (
    <div>
      <h2>{phrase.title}</h2>
      {phrase.subtitle && <p>{phrase.subtitle}</p>}
    </div>
  );
}
```

---

### Пример 6: Обновление фразы при клике

```typescript
import React, { useState } from 'react';
import { getNewRandomPhrase, PapiPhrase } from '../utils/papiPhrases';

function PhraseRefresher() {
  const [phrase, setPhrase] = useState<PapiPhrase>({ 
    title: "Click to refresh!" 
  });
  
  const hunger = 75;
  const fun = 80;
  const energy = 70;

  const refreshPhrase = () => {
    const newPhrase = getNewRandomPhrase(
      hunger, 
      fun, 
      energy, 
      phrase.title // Исключаем текущую фразу
    );
    setPhrase(newPhrase);
  };

  return (
    <div onClick={refreshPhrase}>
      <p>{phrase.title}</p>
    </div>
  );
}
```

---

### Пример 7: Показать фразу в зависимости от настроения

```typescript
import { getMoodCategory, calculateAverageState } from '../utils/papiPhrases';

function showMoodBasedUI(hunger: number, fun: number, energy: number) {
  const average = calculateAverageState(hunger, fun, energy);
  const mood = getMoodCategory(average);

  switch (mood) {
    case 'happy':
      return <HappyUI />;
    case 'neutral':
      return <NeutralUI />;
    case 'sad':
      return <SadUI />;
  }
}
```

---

### Пример 8: Фраза с условной анимацией

```typescript
import { getMoodCategory, calculateAverageState, getRandomPhrase } from '../utils/papiPhrases';
import { motion } from 'motion/react';

function AnimatedPhrase({ hunger, fun, energy }: Props) {
  const phrase = getRandomPhrase(hunger, fun, energy);
  const average = calculateAverageState(hunger, fun, energy);
  const mood = getMoodCategory(average);

  // Разные анимации для разных настроений
  const animations = {
    happy: { scale: [1, 1.1, 1], transition: { duration: 0.5 } },
    neutral: { opacity: [0.8, 1], transition: { duration: 0.3 } },
    sad: { y: [0, -5, 0], transition: { duration: 0.6 } },
  };

  return (
    <motion.div animate={animations[mood]}>
      <p>{phrase.title}</p>
    </motion.div>
  );
}
```

---

### Пример 9: Логирование смены настроения

```typescript
import { getMoodCategory, calculateAverageState } from '../utils/papiPhrases';

let previousMood: string | null = null;

function trackMoodChanges(hunger: number, fun: number, energy: number) {
  const average = calculateAverageState(hunger, fun, energy);
  const currentMood = getMoodCategory(average);

  if (previousMood && previousMood !== currentMood) {
    console.log(`Mood changed: ${previousMood} → ${currentMood}`);
    
    // Отправить аналитику
    analytics.track('mood_changed', {
      from: previousMood,
      to: currentMood,
      average: average,
    });
  }

  previousMood = currentMood;
}
```

---

### Пример 10: Кастомная логика выбора фраз

```typescript
import { calculateAverageState, getMoodCategory, PapiPhrase } from '../utils/papiPhrases';

// Собственный набор фраз для особых случаев
const SPECIAL_PHRASES: PapiPhrase[] = [
  { title: "It's your birthday! 🎂" },
  { title: "New year, new adventures! 🎉" },
  { title: "Happy Valentine's Day! 💖" },
];

function getContextualPhrase(
  hunger: number,
  fun: number,
  energy: number,
  isSpecialDay: boolean
): PapiPhrase {
  // Если особый день, показываем специальную фразу
  if (isSpecialDay) {
    return SPECIAL_PHRASES[Math.floor(Math.random() * SPECIAL_PHRASES.length)];
  }

  // Иначе используем стандартную логику
  const average = calculateAverageState(hunger, fun, energy);
  const mood = getMoodCategory(average);
  
  // Ваша дополнительная логика...
}
```

---

## 📊 Типы и Интерфейсы

### PapiPhrase Interface

```typescript
interface PapiPhrase {
  title: string;        // Основной текст фразы (обязательно)
  subtitle?: string;    // Дополнительный текст (опционально)
}
```

### Mood Categories

```typescript
type MoodCategory = 'happy' | 'neutral' | 'sad';
```

---

## 🎯 Best Practices

### ✅ Хорошо

```typescript
// ✅ Передавайте актуальные значения
const phrase = getRandomPhrase(hunger, fun, energy);

// ✅ Используйте getNewRandomPhrase для исключения повторов
const newPhrase = getNewRandomPhrase(hunger, fun, energy, currentPhrase.title);

// ✅ Проверяйте наличие subtitle
{phrase.subtitle && <p>{phrase.subtitle}</p>}

// ✅ Логируйте смены настроения для аналитики
useEffect(() => {
  const mood = getMoodCategory(calculateAverageState(hunger, fun, energy));
  console.log('Current mood:', mood);
}, [hunger, fun, energy]);
```

### ❌ Плохо

```typescript
// ❌ Не используйте устаревшие значения
const phrase = getRandomPhrase(oldHunger, oldFun, oldEnergy);

// ❌ Не вызывайте getRandomPhrase слишком часто
setInterval(() => {
  setPhrase(getRandomPhrase(hunger, fun, energy));
}, 100); // Слишком часто!

// ❌ Не игнорируйте subtitle
<p>{phrase.title}</p> // А если есть subtitle?

// ❌ Не создавайте собственные фразы вне системы
const myPhrase = "Hello!"; // Используйте PapiPhrase тип
```

---

## 🧪 Unit Test Examples

```typescript
import { calculateAverageState, getMoodCategory } from '../utils/papiPhrases';

describe('Papi Phrases System', () => {
  test('calculateAverageState returns correct average', () => {
    expect(calculateAverageState(60, 70, 80)).toBe(70);
    expect(calculateAverageState(100, 100, 100)).toBe(100);
    expect(calculateAverageState(0, 0, 0)).toBe(0);
  });

  test('getMoodCategory returns correct mood', () => {
    expect(getMoodCategory(80)).toBe('happy');
    expect(getMoodCategory(50)).toBe('neutral');
    expect(getMoodCategory(30)).toBe('sad');
  });

  test('mood boundaries are correct', () => {
    expect(getMoodCategory(71)).toBe('happy');
    expect(getMoodCategory(70)).toBe('neutral');
    expect(getMoodCategory(40)).toBe('neutral');
    expect(getMoodCategory(39)).toBe('sad');
  });
});
```

---

## 🔗 Связанные Документы

- **[PAPI_PHRASES_SYSTEM.md](./PAPI_PHRASES_SYSTEM.md)** - Полная документация
- **[QUICK_PHRASES_GUIDE.md](./QUICK_PHRASES_GUIDE.md)** - Быстрое руководство
- **[UPDATE_v3.1.md](./UPDATE_v3.1.md)** - Детали обновления

---

Made with 💛 by Papi Steps Team
