# Система Сна - Papi Steps v2.9.1 🌙😴

## Обзор

Когда Papi устал, он может отправиться спать! Ночная комната с луной, звёздами и анимация дыхания создают уютную атмосферу.

**Обновление v2.9.1:** Новое изображение ночной комнаты с улучшенной детализацией и атмосферой!

---

## Как Это Работает

### 1️⃣ Отправить Papi Спать

**Простой способ:**
1. Нажмите на иконку Energy (🌙)
2. Papi мгновенно засыпает
3. Комната меняется на ночную
4. Начинается анимация дыхания

**Что происходит:**
```
Day Room → Night Room (1s transition)
Normal Papi → Sleeping Papi (fade in)
White gradient → Dark gradient (1s)
Stars appear (fade in)
```

### 2️⃣ Процесс Сна

**Длительность:** 8 секунд

**Фазы:**
```
0s   - Засыпание (переход ко сну)
0-2s - Sleeping Frame 1 (закрытые глазки)
2-4s - Sleeping Frame 2 (открытый ротик)
4-6s - Sleeping Frame 1 (обратно)
6-8s - Sleeping Frame 2
8s   - Пробуждение (возврат в день)
```

### 3️⃣ Пробуждение

**Автоматически через 8 секунд:**
- Фон меняется обратно на дневную комнату
- Papi возвращается в нормальное состояние
- Energy восстановлена до 100%
- Hunger снизился на 10%

---

## Анимация Спящего Papi

### Два Кадра

**Frame 1 (Sleeping - Closed Mouth):**
```
🐕 Закрытые глазки в виде ^_^
   Рот закрыт (спокойное дыхание)
   Лапки сложены
   Сидячая поза с округлой формой
   Размер: соответствует основному персонажу
```

**Frame 2 (Sleeping - Open Mouth):**
```
🐕 Закрытые глазки в виде ^_^
   Открытый ротик (зевает/дышит глубоко)
   Лапки сложены
   Та же сидячая поза
   Размер: идентичен Frame 1 для плавности
```

### Переключение

**Механизм:**
- Каждые 2 секунды меняется кадр
- Плавный fade эффект (1000ms)
- Один кадр исчезает, другой появляется
- Создает эффект дыхания

**Код:**
```tsx
const [sleepingFrame, setSleepingFrame] = useState<1 | 2>(1);

useEffect(() => {
  if (!isSleeping) return;
  
  const interval = setInterval(() => {
    setSleepingFrame(prev => prev === 1 ? 2 : 1);
  }, 2000);
  
  return () => clearInterval(interval);
}, [isSleeping]);
```

### CSS Transition

```tsx
<img 
  src={sleepingPapi1}
  style={{ opacity: sleepingFrame === 1 ? 1 : 0 }}
  className="transition-opacity duration-1000 ease-in-out"
/>
```

**Эффект:**
- Плавное появление (0 → 1 opacity)
- Плавное исчезновение (1 → 0 opacity)
- 1 секунда на переход
- Smooth easing

---

## Ночная Комната

### Новое Изображение (v2.9.1)

**Asset:** `figma:asset/ed35cba746f7e53f66b0b29dc489c65d4f07e8e8.png`

**Визуальные Элементы:**

**Окно со звездами:**
- 🌙 Полумесяц (кремового цвета)
- ⭐ Множество звёздочек разных размеров
- 🌃 Тёмное ночное небо
- 💡 Гирлянды с огоньками вокруг окна

**Освещение:**
- Приглушённое ночное освещение
- Мягкие тени от лунного света
- Уютная спокойная атмосфера
- Гирлянды создают тёплое свечение

**Мебель:**
- Та же комната, что и днём
- 🌿 Растения в горшках (те же позиции)
- 🛋️ Розовый диван справа
- 📚 Полки с декором слева
- Всё в приглушённых ночных тонах

### Цветовая Палитра (v2.9.1)

```css
Ночное небо: #0F1426 (очень тёмный синий)
Стены: #1A1F3A (тёмно-синий)
Пол: #2A2E45 (тёмно-серый)
Луна: #FFFACD (кремовый)
Звёзды: #FFFFFF (белый)
Огоньки гирлянд: #FFD6A5 (тёплый жёлтый)
Акценты: Приглушённый розовый, фиолетовый
```

---

## Звезды

### 6 Анимированных Звезд

**Позиции:**
```tsx
top: 20 left: 16   - ⭐ opacity: 60%  delay: 0s
top: 32 right: 20  - ✨ opacity: 80%  delay: 0.5s
top: 48 left: 24   - 🌟 opacity: 50%  delay: 1s
top: 60 right: 32  - 💫 opacity: 70%  delay: 1.5s
top: 30% left: 20% - ✨ opacity: 40%  delay: 2s
top: 40% right:15% - ⭐ opacity: 60%  delay: 2.5s
```

### Sparkle Анимация

**CSS:**
```css
@keyframes sparkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.sparkle {
  animation: sparkle 2s ease-in-out infinite;
}
```

**Эффект:**
- Звезды мерцают
- Увеличиваются и уменьшаются
- Разные задержки создают живость

---

## Адаптивный Градиент

### День (Белый)

```css
background: linear-gradient(to top,
  white 0%,
  rgba(255,255,255,0.8) 50%,
  transparent 100%
);
```

### Ночь (Темный)

```css
background: linear-gradient(to top,
  #1a1625 0%,
  rgba(26,22,37,0.8) 50%,
  transparent 100%
);
```

### Плавный Переход

```tsx
className="transition-all duration-1000 ease-in-out"
```

**Результат:**
- 1 секунда на смену градиента
- Плавный переход цветов
- Нет резких скачков

---

## Статистика Сна

### До Сна

```
Energy: любое значение (обычно низкое)
Hunger: текущее значение
Fun: не меняется
```

### После Сна

```
Energy: 100% (полностью восстановлено)
Hunger: -10% от текущего
Fun: не меняется
```

### Формула

```typescript
setGameStats(prev => ({
  ...prev,
  energy: 100,
  hunger: Math.max(0, prev.hunger - 10)
}));
```

---

## Технические Детали

### State Management

```tsx
const [isSleeping, setIsSleeping] = useState(false);
const [sleepingFrame, setSleepingFrame] = useState<1 | 2>(1);
const [background, setBackground] = useState<'day' | 'night'>('day');
```

### Sleep Function

```tsx
const goToSleep = () => {
  if (isSleeping) return; // Уже спит
  
  setGameStats(prev => ({
    ...prev,
    energy: 100,
    hunger: Math.max(0, prev.hunger - 10)
  }));
  
  setIsSleeping(true);
  setBackground('night');
  
  setTimeout(() => {
    setIsSleeping(false);
    setBackground('day');
    setPapiState('normal');
  }, 8000); // 8 секунд
};
```

### Image Rendering

```tsx
{isSleeping ? (
  <>
    <img 
      src={sleepingPapi1}
      className="absolute inset-0 w-full h-full object-contain 
                 transition-opacity duration-1000 ease-in-out"
      style={{ opacity: sleepingFrame === 1 ? 1 : 0 }}
    />
    <img 
      src={sleepingPapi2}
      className="absolute inset-0 w-full h-full object-contain 
                 transition-opacity duration-1000 ease-in-out"
      style={{ opacity: sleepingFrame === 2 ? 1 : 0 }}
    />
  </>
) : (
  <PapiCharacter state={papiState} />
)}
```

---

## Оптимизация

### Performance

**✅ Хорошо:**
- Только 2 изображения в памяти
- Простой setInterval для анимации
- CSS transitions (GPU accelerated)

**Метрики:**
- FPS: 60 (плавная анимация)
- Memory: +2 изображения (~100KB)
- CPU: минимальное использование

### Cleanup

```tsx
useEffect(() => {
  if (!isSleeping) return;
  
  const interval = setInterval(/* ... */);
  
  return () => clearInterval(interval); // Важно!
}, [isSleeping]);
```

---

## Будущие Улучшения

### v2.5 (Планируется)

**Больше анимации:**
- 3-4 кадра вместо 2
- Более сложная анимация дыхания
- Подергивание ушек/хвостика

**Звуки:**
- Легкий храп
- Звук засыпания
- Звук пробуждения

**Сны:**
- Облачко с иконкой сна
- Случайные сны (еда, игры)
- Влияние снов на настроение

### v3.0 (Далекое будущее)

**Расписание сна:**
- Автоматический сон в определенное время
- Будильник
- Статистика сна

**Кровать:**
- Покупка разных кроватей
- Улучшение качества сна
- Бонусы от премиум кроватей

---

## Troubleshooting

### Papi не засыпает

**Проблема:** Клик на Energy не работает  
**Решение:** Проверьте что isSleeping = false

### Анимация не плавная

**Проблема:** Резкое переключение кадров  
**Решение:** Проверьте transition-opacity duration-1000

### Фон не меняется

**Проблема:** Остается дневная комната  
**Решение:** Проверьте что background = 'night'

### Звезды не видны

**Проблема:** Нет sparkle эффекта  
**Решение:** Проверьте z-index и isSleeping условие

---

## FAQ

**Q: Можно ли отменить сон досрочно?**  
A: Сейчас нет, но в будущей версии добавим.

**Q: Почему именно 8 секунд?**  
A: Достаточно чтобы насладиться анимацией, но не слишком долго.

**Q: Можно ли изменить скорость анимации?**  
A: Да, измените интервал в setInterval (сейчас 2000ms).

**Q: Будут ли другие позы сна?**  
A: Да! В v2.5 планируется больше кадров.

**Q: Можно ли спать бесконечно?**  
A: Нет, всегда 8 секунд. Но можно снова нажать Energy.

---

**Версия:** 2.9.1  
**Дата:** 29 октября 2025  
**Обновление:** 🌙 Новое изображение ночной комнаты  
**Статус:** ✅ Полностью функционально  
**Автор:** Papi Steps Team 🐕💤
