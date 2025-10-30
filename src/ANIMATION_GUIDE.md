# Руководство по Анимациям - Papi Steps 🎬

## Анимация Спящего Papi

### Концепция

**Цель:** Создать живое, дышащее ощущение без тяжелых GIF/видео

**Метод:** Плавное переключение между двумя статичными изображениями

---

## Как Это Работает

### 1. Два Изображения

**Sleeping 1 (Закрытый рот):**
```
🐕 Полноразмерный спящий Papi
Глаза: ^_^ (закрытые счастливые глазки)
Рот: закрыт (улыбка)
Румянец: фиолетовый на щечках
Лапки: сложены перед собой
Поза: сидячая округлая форма
Размер: соответствует основному персонажу (280x280px area)
Состояние: спокойное дыхание
```

**Sleeping 2 (Открытый рот):**
```
🐕 Полноразмерный спящий Papi
Глаза: ^_^ (те же закрытые глазки)
Рот: открыт (зевает/дышит глубоко)
Румянец: тот же фиолетовый
Лапки: в той же позиции
Поза: идентичная (для плавности)
Размер: точно такой же как Frame 1
Состояние: глубокое дыхание (зевает)
```

**Ключевые характеристики:**
- Мятно-зеленая (#C3F0D9) мягкая шерсть
- Большие блестящие глаза (закрыты в виде ^_^)
- Фиолетовый румянец на щечках
- Белые пятнышки на голове
- Округлая kawaii форма
- Черный контур для четкости

### 2. Переключение

**Таймлайн:**
```
0s    - Frame 1 (opacity: 1)
      - Frame 2 (opacity: 0)
      
2s    - Переключение начинается
      - Frame 1 fade out (1s)
      - Frame 2 fade in (1s)
      
3s    - Frame 1 (opacity: 0)
      - Frame 2 (opacity: 1)
      
5s    - Переключение обратно
      - Frame 2 fade out (1s)
      - Frame 1 fade in (1s)
      
6s    - Цикл повторяется
```

### 3. CSS Transitions

**Ключевой класс:**
```css
transition-opacity duration-1000 ease-in-out
```

**Эффект:**
- 1000ms = 1 секунда на переход
- ease-in-out = плавное начало и конец
- opacity = прозрачность (GPU accelerated!)

---

## Код Реализации

### State

```tsx
const [isSleeping, setIsSleeping] = useState(false);
const [sleepingFrame, setSleepingFrame] = useState<1 | 2>(1);
```

### Effect для Переключения

```tsx
useEffect(() => {
  if (!isSleeping) return;
  
  const interval = setInterval(() => {
    setSleepingFrame(prev => prev === 1 ? 2 : 1);
  }, 2000); // Каждые 2 секунды
  
  return () => clearInterval(interval);
}, [isSleeping]);
```

### Rendering

```tsx
{isSleeping ? (
  <>
    {/* Frame 1 */}
    <img 
      src={sleepingPapi1}
      alt="Sleeping Papi 1"
      className="absolute inset-0 w-full h-full object-contain 
                 transition-opacity duration-1000 ease-in-out"
      style={{ opacity: sleepingFrame === 1 ? 1 : 0 }}
    />
    
    {/* Frame 2 */}
    <img 
      src={sleepingPapi2}
      alt="Sleeping Papi 2"
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

## Параметры Анимации

### Настраиваемые Значения

**Скорость переключения:**
```tsx
setInterval(() => {/* ... */}, 2000)
           //               ^^^^ миллисекунды
```

| Значение | Эффект |
|----------|--------|
| 1000ms | Быстрое дыхание |
| 2000ms | Нормальное дыхание (текущее) |
| 3000ms | Медленное дыхание |
| 5000ms | Очень спокойное |

**Скорость fade:**
```css
duration-1000
        ^^^^ миллисекунды
```

| Значение | Эффект |
|----------|--------|
| duration-500 | Резкое |
| duration-1000 | Плавное (текущее) |
| duration-2000 | Очень плавное |

**Easing функция:**
```css
ease-in-out
```

| Значение | Эффект |
|----------|--------|
| ease | Стандартное |
| ease-in-out | Плавное начало/конец (текущее) |
| linear | Равномерное |
| ease-out | Замедление в конце |

---

## Оптимизация

### GPU Acceleration

**Используем:**
- `opacity` (GPU accelerated ✅)
- `transform` (GPU accelerated ✅)

**Избегаем:**
- `width/height` (CPU only ❌)
- `margin/padding` (CPU only ❌)
- `background-color` (CPU only ❌)

### Производительность

**Метрики:**
```
FPS: 60 (плавно)
CPU: <5% (легко)
Memory: 2 изображения (~200KB)
GPU: opacity transitions (эффективно)
```

**Профилирование:**
```javascript
// Chrome DevTools > Performance
// Проверить "Rendering" tab
// FPS должен быть стабильно 60
```

---

## Альтернативные Подходы

### 1. Sprite Sheet (Не используется)

**Преимущества:**
- Один файл
- Классический подход

**Недостатки:**
- Больший размер файла
- Сложнее управление
- CSS animation менее гибкая

### 2. GIF Animation (Не используется)

**Преимущества:**
- Автоматическая анимация
- Не нужен JavaScript

**Недостатки:**
- Большой размер
- Низкое качество
- Нет контроля

### 3. Video (Не используется)

**Преимущества:**
- Высокое качество
- Сложные анимации

**Недостатки:**
- Огромный размер
- Overkill для простой анимации
- Проблемы с autoplay

### 4. Fade Between Images (✅ Используется!)

**Преимущества:**
- Легкий вес
- Полный контроль
- Плавная анимация
- GPU accelerated

**Недостатки:**
- Нужен JavaScript
- Только 2 кадра (можно больше)

---

## Расширение Анимации

### Добавить 3-й Кадр

```tsx
const [sleepingFrame, setSleepingFrame] = useState<1 | 2 | 3>(1);

useEffect(() => {
  const frames = [1, 2, 3] as const;
  let currentIndex = 0;
  
  const interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % frames.length;
    setSleepingFrame(frames[currentIndex]);
  }, 2000);
  
  return () => clearInterval(interval);
}, [isSleeping]);

// Rendering
<img style={{ opacity: sleepingFrame === 1 ? 1 : 0 }} />
<img style={{ opacity: sleepingFrame === 2 ? 1 : 0 }} />
<img style={{ opacity: sleepingFrame === 3 ? 1 : 0 }} />
```

### Случайный Порядок

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    const random = Math.random() > 0.5 ? 1 : 2;
    setSleepingFrame(random);
  }, 2000);
  
  return () => clearInterval(interval);
}, [isSleeping]);
```

### Разная Длительность Кадров

```tsx
useEffect(() => {
  const switchFrame = () => {
    setSleepingFrame(prev => {
      const next = prev === 1 ? 2 : 1;
      
      // Frame 1 показывается 3s, Frame 2 - 1s
      const delay = next === 1 ? 3000 : 1000;
      
      setTimeout(switchFrame, delay);
      return next;
    });
  };
  
  switchFrame();
}, [isSleeping]);
```

---

## Другие Анимации в Приложении

### 1. Sparkle (Звезды)

**CSS:**
```css
@keyframes sparkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(0.8); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2); 
  }
}

.sparkle {
  animation: sparkle 2s ease-in-out infinite;
}
```

**Применение:**
```tsx
<div className="sparkle">⭐</div>
```

### 2. Float (Плавание)

**CSS:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

**Применение:**
```tsx
<div className="float">🎈</div>
```

### 3. Breathe (Дыхание)

**CSS:**
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.breathe {
  animation: breathe 3s ease-in-out infinite;
}
```

**Применение:**
```tsx
<img className="breathe" src={papi} />
```

### 4. Fade In

**CSS:**
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fade-in 0.2s ease-in;
}
```

**Tailwind:**
```tsx
<div className="animate-in fade-in">Content</div>
```

---

## Лучшие Практики

### ✅ Делать

1. **Использовать GPU properties**
   - opacity, transform
   
2. **Cleanup intervals**
   ```tsx
   return () => clearInterval(interval);
   ```

3. **Условные анимации**
   ```tsx
   if (!isSleeping) return;
   ```

4. **Easing functions**
   - ease-in-out для плавности

5. **Разумная длительность**
   - 1-3s для большинства анимаций

### ❌ Не Делать

1. **Анимировать CPU properties**
   - width, height, margin, padding

2. **Забывать cleanup**
   - Memory leaks!

3. **Слишком быстро**
   - < 500ms = резко

4. **Слишком медленно**
   - > 5s = скучно

5. **Много одновременных анимаций**
   - FPS падает

---

## Debugging

### Chrome DevTools

**Performance Tab:**
```
1. Record
2. Trigger animation
3. Stop
4. Check FPS (should be 60)
5. Look for "Rendering" bottlenecks
```

**Console Logging:**
```tsx
useEffect(() => {
  console.log('Frame switched to:', sleepingFrame);
}, [sleepingFrame]);
```

**React DevTools:**
```
Components > KawaiiHomeScreen
Props > isSleeping, sleepingFrame
```

---

## FAQ

**Q: Почему не использовать CSS animation?**
A: Нужен контроль через JavaScript для старт/стоп.

**Q: Можно ли сделать бесконечную анимацию?**
A: Да, она уже бесконечная пока isSleeping=true.

**Q: Как добавить звук?**
A: Использовать Web Audio API или HTML5 Audio.

**Q: Почему opacity, а не display?**
A: Opacity поддерживает плавные transitions.

**Q: Можно ли ускорить?**
A: Да, уменьшите интервал и duration.

---

**Версия:** 1.0  
**Дата:** 13 октября 2025  
**Тип:** Fade Animation  
**Кадры:** 2  
**FPS:** 60 ✅
