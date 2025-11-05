# 🧪 Как протестировать Daily Bonus System

## Быстрый старт

### Метод 1: Автоматический Тестовый Раннер (Рекомендуется)

1. **Откройте тестовый раннер:**
   ```
   Откройте файл: TEST_DAILY_BONUS_RUNNER.html
   ```
   
2. **Запустите все тесты по порядку:**
   - ✅ Test 1: First Login (Clean Start)
   - ✅ Test 2: Immediate Re-login (Within 24h)
   - ✅ Test 3: After 24 Hours (Simulated)
   - 🎲 Test 4: Item Randomness (10 trials)

3. **Проверьте текущее состояние:**
   - Нажмите "Check State" чтобы увидеть данные в localStorage
   - Нажмите "Reset System" чтобы начать тестирование заново

### Метод 2: Ручное тестирование в приложении

1. **Test 1: Первый вход**
   ```javascript
   // В DevTools Console (F12)
   localStorage.clear();
   location.reload();
   ```
   - Войдите в приложение
   - ✅ Должен показаться Daily Reward экран
   - ✅ Должно появиться toast уведомление
   - ✅ В инвентаре должно быть 2 предмета

2. **Test 2: Повторный вход**
   ```javascript
   // Выйдите и войдите снова
   ```
   - ❌ Daily Reward экран НЕ должен показаться
   - ❌ Toast уведомление НЕ должно появиться
   - ✅ Инвентарь остается прежним

3. **Test 3: Через 24 часа (симуляция)**
   ```javascript
   // В DevTools Console
   const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
   state.lastBonusTimestamp = Date.now() - (25 * 60 * 60 * 1000);
   localStorage.setItem('papiDailyBonusState', JSON.stringify(state));
   location.reload();
   ```
   - Войдите в приложение
   - ✅ Должен показаться Daily Reward экран
   - ✅ Новые 2 предмета в инвентаре (всего 4)

---

## Полезные команды

### Проверить текущее состояние

```javascript
// Посмотреть данные бонусной системы
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
console.log('Current State:', state);
console.log('Last Bonus:', new Date(state.lastBonusTimestamp));
console.log('Items:', state.todaysBonusItems);
```

### Рассчитать время до следующего бонуса

```javascript
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
const now = Date.now();
const nextBonus = state.lastBonusTimestamp + (24 * 60 * 60 * 1000);
const timeLeft = nextBonus - now;

const hours = Math.floor(timeLeft / (1000 * 60 * 60));
const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

console.log(`Next bonus in: ${hours}h ${minutes}m`);
```

### Полный сброс системы

```javascript
localStorage.removeItem('papiDailyBonusState');
location.reload();
```

---

## Что проверять

### ✅ Визуальная проверка Daily Reward Screen

- [ ] Заголовок: "Welcome back!" с градиентом
- [ ] Подзаголовок: "Papi missed you so much! 💕"
- [ ] Анимированная иконка подарка 🎁
- [ ] Блок "Daily Reward! ✨"
- [ ] Показывает 2 предмета с emoji и названиями
- [ ] Кнопка "✨ Collect Reward" (градиент розовый)
- [ ] Кнопка "Continue to room" (белая прозрачная)
- [ ] Плавающие сердечки и звездочки на фоне
- [ ] Блестящие частицы (sparkles)

### ✅ Функциональная проверка

- [ ] Toast появляется с правильными названиями предметов
- [ ] Предметы добавляются в инвентарь
- [ ] Можно использовать предметы (повышают stats)
- [ ] Предметы удаляются после использования
- [ ] Effectiveness работает корректно
- [ ] Изображения предметов отображаются (не emoji)

### ✅ Логическая проверка

- [ ] Бонус дается только раз в 24 часа
- [ ] Timestamp сохраняется в localStorage
- [ ] Предметы случайные (разные при каждом запуске)
- [ ] Всегда 1 еда + 1 игрушка
- [ ] Все свойства предметов заполнены (id, name, emoji, imageUrl, effectiveness)

---

## Ожидаемые результаты

### Test 1: First Login ✅
```
✅ shouldReceiveDailyBonus() = true
✅ claimDailyBonus() returns 2 items
✅ Food item: random from 9 types
✅ Toy item: random from 6 types
✅ Timestamp saved
✅ Items added to inventory
```

### Test 2: Immediate Re-login ❌
```
❌ shouldReceiveDailyBonus() = false
❌ No bonus given
❌ No inventory changes
✅ Time until next bonus: ~24h
```

### Test 3: After 24 Hours ✅
```
✅ shouldReceiveDailyBonus() = true (after timestamp manipulation)
✅ claimDailyBonus() returns 2 NEW items
✅ New items different from previous (may be same by chance)
✅ Inventory now has 4 items total
```

### Test 4: Randomness 🎲
```
✅ 10 trials produce variety
✅ At least 3-5 different foods
✅ At least 2-4 different toys
✅ Distribution is random
```

---

## Troubleshooting

### Проблема: Бонус не выдается при первом входе

**Решение:**
```javascript
// Полностью очистить localStorage
localStorage.clear();
location.reload();
```

### Проблема: Бонус выдается несколько раз подряд

**Проверка:**
```javascript
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
console.log('Timestamp:', state.lastBonusTimestamp);
// Должно быть валидное число (не 0)
```

### Проблема: Одни и те же предметы каждый раз

**Это нормально!** Рандомизация может давать одинаковые предметы. Запустите Test 4 чтобы проверить распределение на 10 попытках.

---

## Визуальное тестирование

### Откройте приложение и проверьте:

1. **Login Screen → Home Screen переход:**
   - После входа должен показаться Daily Reward экран (если прошло 24ч)
   - Или сразу Home Screen (если бонус уже получен)

2. **Daily Reward Screen дизайн:**
   - Kawaii пастельный градиент фона
   - Анимированный подарок
   - Плавающие декоративные элементы
   - Pill-shape кнопки

3. **Inventory проверка:**
   - Открыть модальное окно Hunger или Fun
   - Предметы показываются с ИЗОБРАЖЕНИЯМИ (64x64px)
   - Не emoji символами, а настоящими картинками
   - Клик по предмету → использование → увеличение stat

---

## Автоматическое тестирование

Используйте **TEST_DAILY_BONUS_RUNNER.html** для быстрого прохождения всех тестов без ручного вмешательства.

### Преимущества:
- ✅ Визуальный интерфейс
- ✅ Автоматическая проверка всех условий
- ✅ Детальные отчеты о результатах
- ✅ Сброс системы одной кнопкой
- ✅ Тест рандомизации (10 попыток)

---

**Дата создания:** 2 ноября 2025  
**Версия:** 1.0  
**Статус:** Готов к использованию
