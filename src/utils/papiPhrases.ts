// Papi Speech Phrases System
// Рандомные фразы для создания ощущения общения

export interface PapiPhrase {
  title: string;
  subtitle?: string;
}

// 🟢 Обычные фразы (при хорошем настроении / выше 70%)
const HAPPY_PHRASES: PapiPhrase[] = [
  { title: "I'm so happy to see you! ☀️" },
  { title: "You're my favorite human 💕" },
  { title: "I missed you! Where were you?" },
  { title: "What a lovely day, isn't it? 🌸" },
  { title: "You make every day special 💛" },
  { title: "Can we play today? 🎮" },
  { title: "I like spending time with you 🥰" },
  { title: "Everything feels better when you're here 💫" },
  { title: "Did you know you have the best smile? 😄" },
  { title: "You're my best friend ever! 🧸" },
  { title: "I had a great dream about us last night 🌙" },
  { title: "Let's have fun together today! 🎉" },
  { title: "I feel great! Do you? 🌈" },
  { title: "You're amazing — don't forget that 💛" },
];

// 🟡 Нейтральные фразы (средние индикаторы / 40–70%)
const NEUTRAL_PHRASES: PapiPhrase[] = [
  { title: "Hey, I'm getting a little hungry 🍽️" },
  { title: "Wanna hang out for a bit?" },
  { title: "It's been a while since we played! 🐾" },
  { title: "Can you check on me soon?" },
  { title: "I think I could use some food or love 💛" },
  { title: "I'm okay, but I'd feel better with you 💭" },
  { title: "Just thinking about you 😊" },
  { title: "A small snack would make me super happy 🍏" },
];

// 🔴 Грустные / просящие внимания фразы (ниже 40%)
const SAD_PHRASES: PapiPhrase[] = [
  { title: "I'm feeling a bit lonely… 🥺" },
  { title: "Where are you? I miss you 💔" },
  { 
    title: "I'm waiting for your care 💛", 
    subtitle: "Tap an icon to feed or play!" 
  },
  { title: "I think I need a hug 😢" },
  { title: "Don't forget about me… 🌧️" },
  { title: "I'm not feeling so great today 💭" },
  { title: "Can you come play with me soon? 🐾" },
  { title: "It's been a while since you took care of me 💛" },
];

/**
 * Вычисляет средний уровень состояния питомца (0-100)
 */
export function calculateAverageState(hunger: number, fun: number, energy: number): number {
  return Math.round((hunger + fun + energy) / 3);
}

/**
 * Определяет категорию настроения на основе состояния
 */
export function getMoodCategory(averageState: number): 'happy' | 'neutral' | 'sad' {
  if (averageState > 70) return 'happy';
  if (averageState >= 40) return 'neutral';
  return 'sad';
}

/**
 * Возвращает случайную фразу из соответствующей категории
 */
export function getRandomPhrase(hunger: number, fun: number, energy: number): PapiPhrase {
  const averageState = calculateAverageState(hunger, fun, energy);
  const mood = getMoodCategory(averageState);
  
  let phrases: PapiPhrase[];
  
  switch (mood) {
    case 'happy':
      phrases = HAPPY_PHRASES;
      break;
    case 'neutral':
      phrases = NEUTRAL_PHRASES;
      break;
    case 'sad':
      phrases = SAD_PHRASES;
      break;
  }
  
  // Выбираем случайную фразу
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

/**
 * Получает новую случайную фразу (гарантирует, что фраза отличается от предыдущей)
 */
export function getNewRandomPhrase(
  hunger: number, 
  fun: number, 
  energy: number, 
  previousTitle?: string
): PapiPhrase {
  const averageState = calculateAverageState(hunger, fun, energy);
  const mood = getMoodCategory(averageState);
  
  let phrases: PapiPhrase[];
  
  switch (mood) {
    case 'happy':
      phrases = HAPPY_PHRASES;
      break;
    case 'neutral':
      phrases = NEUTRAL_PHRASES;
      break;
    case 'sad':
      phrases = SAD_PHRASES;
      break;
  }
  
  // Если есть предыдущая фраза и в категории больше одной фразы, исключаем её
  if (previousTitle && phrases.length > 1) {
    phrases = phrases.filter(p => p.title !== previousTitle);
  }
  
  // Выбираем случайную фразу
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}
