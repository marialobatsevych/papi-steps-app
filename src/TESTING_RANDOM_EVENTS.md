# 🧪 Testing Random Events System

## Quick Test Guide

### ✅ Test 1: Force Spawn Butterfly Event

**Цель:** Проверить, что бабочка появляется и ее можно поймать

**Шаги:**
1. Открыть DevTools (F12) → Console
2. Выполнить команду:
   ```javascript
   localStorage.setItem('papiRandomEventsState', JSON.stringify({
     lastSpawn: { fly: 0, poop: 0, spider: 0 },
     todayCounts: { fly: 0, poop: 0, spider: 0 },
     lastResetDate: new Date().toDateString(),
     neglectTimer: 0
   }));
   ```
3. Перезагрузить страницу (F5)
4. Подождать ~30-120 секунд (событие появится с небольшой вероятностью)
5. Если не появилось - повторить шаги 2-4

**Ожидаемый результат:**
- ✅ На экране появляется бабочка (🦋 emoji)
- ✅ Муха летает в верхней части экрана
- ✅ Показывается подсказка "Tap! +50 🪙"
- ✅ При тапе по мухе:
  - Муха исчезает
  - Toast уведомление: "🪰 Fly caught!"
  - Добавляется +50 монет
- ✅ Если не тапнуть за 10 секунд - муха исчезает

---

### ✅ Test 2: Force Spawn Poop Event

**Цель:** Проверить появление какашки

**Шаги:**
1. Открыть DevTools (F12) → Console
2. Установить низкие stats и neglect timer:
   ```javascript
   // Сначала сбросить cooldown
   localStorage.setItem('papiRandomEventsState', JSON.stringify({
     lastSpawn: { fly: 0, poop: 0, spider: 0 },
     todayCounts: { fly: 0, poop: 0, spider: 0 },
     lastResetDate: new Date().toDateString(),
     neglectTimer: Date.now() - (13 * 60 * 60 * 1000) // 13 hours ago
   }));
   ```
3. Перезагрузить страницу
4. Подождать ~60-120 секунд

**Ожидаемый результат:**
- ✅ Под питомцем появляется 💩 emoji
- ✅ Через 5 секунд появляется облако 💨
- ✅ Показывается подсказка "🧹 Tap to clean +20 🪙"
- ✅ При тапе по какашке:
  - Какашка исчезает
  - Toast: "🧹 All clean!"
  - Добавляется +20 монет и +5% Fun

---

### ✅ Test 3: Force Spawn Spider Event

**Цель:** Проверить появление паука и механику риска

**Шаги:**
1. Открыть DevTools (F12) → Console
2. Сбросить cooldown паука:
   ```javascript
   localStorage.setItem('papiRandomEventsState', JSON.stringify({
     lastSpawn: { fly: 0, poop: 0, spider: 0 },
     todayCounts: { fly: 0, poop: 0, spider: 0 },
     lastResetDate: new Date().toDateString(),
     neglectTimer: 0
   }));
   ```
3. Перезагрузить страницу
4. Подождать 1-5 минут (паук очень редкий)
5. Можно выполнить несколько раз, пока не появится

**Ожидаемый результат (Успех):**
- ✅ Паук появляется сверху экрана
- ✅ Паук спускается на паутинке к питомцу
- ✅ Показывается countdown таймер и подсказка "⚡ Tap now!"
- ✅ При тапе по пауку ДО касания питомца:
  - Паук исчезает
  - Toast: "🕷️ Spider defeated!"
  - Добавляется +75 монет

**Ожидаемый результат (Провал):**
- ✅ Если НЕ тапнуть за 4 секунды:
  - Паук касается питомца
  - Toast: "🕷️ Spider bite!"
  - Отнимается -15% Fun и -10% Energy

---

### ✅ Test 4: Check Daily Limits

**Цель:** Проверить, что события не спавнятся после превышения лимита

**Шаги:**
1. Поймать 2 мухи (выполнить Test 1 дважды)
2. Проверить localStorage:
   ```javascript
   JSON.parse(localStorage.getItem('papiRandomEventsState'))
   ```
3. Проверить, что `todayCounts.fly === 2`
4. Попробовать спавнить третью муху (сбросить cooldown, но не todayCounts)

**Ожидаемый результат:**
- ✅ После 2-х мух в день новые мухи НЕ появляются
- ✅ `todayCounts.fly` остается 2
- ✅ На следующий день счетчик сбрасывается автоматически

---

### ✅ Test 5: Check Cooldown System

**Цель:** Проверить, что cooldown работает

**Шаги:**
1. Поймать муху (Test 1)
2. Сразу попробовать спавнить вторую муху без сброса cooldown
3. Проверить localStorage:
   ```javascript
   const state = JSON.parse(localStorage.getItem('papiRandomEventsState'));
   console.log('Last fly spawn:', new Date(state.lastSpawn.fly));
   console.log('Next spawn available in:', (state.lastSpawn.fly + 7200000 - Date.now()) / 60000, 'minutes');
   ```

**Ожидаемый результат:**
- ✅ Вторая муха НЕ появляется (cooldown 2 часа)
- ✅ `lastSpawn.fly` обновился после первого события
- ✅ Только через 2 часа может появиться новая муха

---

### ✅ Test 6: Multiple Events Don't Overlap

**Цель:** Проверить, что одновременно показывается только одно событие

**Шаги:**
1. Сбросить все cooldown
2. Спавнить муху
3. Пока муха активна, попробовать спавнить паука или какашку

**Ожидаемый результат:**
- ✅ Только одно событие отображается на экране
- ✅ Второе событие не появляется, пока первое активно
- ✅ После исчезновения первого события может появиться следующее

---

### ✅ Test 7: Events Don't Spawn During Sleep/Modal

**Цель:** Проверить, что события не мешают другим экранам

**Шаги:**
1. Открыть модальное окно Feed/Play/Sleep
2. Проверить, что события не появляются
3. Уложить Papi спать (нажать Sleep)
4. Проверить, что события не появляются во время сна

**Ожидаемый результат:**
- ✅ События НЕ спавнятся при открытой модалке
- ✅ События НЕ спавнятся во время сна
- ✅ После закрытия модалки/пробуждения события могут появиться

---

## 🔧 Utility Commands

### Reset All Events
```javascript
localStorage.removeItem('papiRandomEventsState');
```

### Check Event State
```javascript
console.log(JSON.parse(localStorage.getItem('papiRandomEventsState')));
```

### Force Specific Event (Manual)
```javascript
// В коде можно временно добавить:
setCurrentEvent({
  id: 'test_fly_1',
  type: 'fly',
  timestamp: Date.now(),
  duration: 10
});
```

### Set Low Stats for Poop
```javascript
// В браузере не можем напрямую, но можно через UI:
// 1. Не кормить и не играть с Papi
// 2. Подождать пока stats упадут ниже 30%
// 3. Подождать 12 часов
// 4. Poop должен появиться
```

---

## 📊 Expected Spawn Rates (Approximation)

**За 1 час активной игры (60 ticks):**
- Fly: ~4.8% шанс (1 муха каждые ~20 часов без cooldown)
- Poop: ~3% шанс (если neglect) или очень редко случайно
- Spider: ~0.9% шанс (1 паук каждые ~110 часов)

**Важно:** Эти цифры - теоретические. В реальности частота ограничена cooldown и daily limits.

---

## 🐛 Known Issues / Edge Cases

1. **Несинхронизированное время:** Если пользователь меняет системное время, cooldown может сбиться
2. **Быстрые переключения экранов:** События могут не появиться, если быстро переключаться между Home и другими экранами
3. **Низкая вероятность:** Spider очень редкий - может потребоваться много времени для тестирования

---

## ✅ Checklist для QA

- [ ] Fly появляется и ловится
- [ ] Fly исчезает через 10 секунд
- [ ] Poop появляется при neglect
- [ ] Poop дает монеты и Fun бонус
- [ ] Spider появляется (редко)
- [ ] Spider успех дает монеты
- [ ] Spider провал отнимает stats
- [ ] Cooldown работает для всех событий
- [ ] Daily limits работают
- [ ] События не спавнятся при модалке/сне
- [ ] Одновременно только одно событие
- [ ] Toast уведомления корректны
- [ ] Анимации плавные
- [ ] Hitbox удобный для тапов
- [ ] localStorage сохраняется корректно
