# 🧪 Testing Daily Bonus System

## Quick Test Guide

### ✅ Test 1: First Login (Clean Start)

**Цель:** Проверить, что пользователь получает бонус при первом входе

**Шаги:**
1. Открыть DevTools (F12) → Console
2. Выполнить команду:
   ```javascript
   localStorage.clear();
   ```
3. Перезагрузить страницу (F5)
4. Войти в приложение (Login Screen)

**Ожидаемый результат:**
- ✅ После входа автоматически показывается Daily Reward экран
- ✅ Заголовок: "Daily Reward! ✨"
- ✅ Блок с монетами: "💰 +100 coins"
- ✅ Блок с едой: "[emoji] [Food Name]" (например "🦴 Premium Bone")
- ✅ Блок с игрушкой: "[emoji] [Toy Name]" (например "🧶 Yarn Ball")
- ✅ Кнопка "✨ Collect Reward" активна
- ✅ Кнопка "Continue to room" доступна
- ✅ Toast уведомление: "Daily Bonus! 🎁"
- ✅ Описание в toast: "You received [Food Name] and [Toy Name]!"
- ✅ После нажатия "Collect Reward" → переход на Home Screen
- ✅ В инвентаре есть 2 предмета (1 еда + 1 игрушка)
- ✅ Предметы случайные из списка

---

### ✅ Test 2: Immediate Re-login (Within 24h)

**Цель:** Проверить, что бонус НЕ выдается повторно сразу

**Шаги:**
1. После получения первого бонуса
2. Выйти из аккаунта (Logout)
3. Войти снова

**Ожидаемый результат:**
- ❌ Daily Reward экран НЕ показывается
- ❌ Toast уведомление НЕ появляется
- ✅ Переход сразу на Home Screen
- ✅ Инвентарь остается прежним (те же 2 предмета)
- ✅ Новые предметы НЕ добавляются

---

### ✅ Test 3: After 24 Hours (Simulate)

**Цель:** Проверить, что бонус выдается через 24 часа

**Шаги:**
1. Открыть DevTools → Console
2. Выполнить команду для симуляции 25 часов:
   ```javascript
   const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
   state.lastBonusTimestamp = Date.now() - (25 * 60 * 60 * 1000);
   localStorage.setItem('papiDailyBonusState', JSON.stringify(state));
   ```
3. Перезагрузить страницу (F5)
4. Войти в приложение

**Ожидаемый результат:**
- ✅ Toast уведомление: "Daily Bonus! 🎁"
- ✅ Новые 2 предмета добавлены в инвентарь
- ✅ Теперь в инвентаре 4 предмета (2 старых + 2 новых)
- ✅ Новые предметы могут отличаться от предыдущих

---

### ✅ Test 4: Check Daily Reward Screen

**Цель:** Проверить визуальное отображение бонусных предметов

**Шаги:**
1. Получить ежедневный бонус (см. Test 1 или Test 3)
2. Открыть Daily Reward экран (если он автоматически показывается при входе)

**Ожидаемый результат:**
- ✅ Заголовок: "Daily Reward! ✨"
- ✅ Блок с coins (если есть): "💰 +100 coins"
- ✅ Блок с едой: "[emoji] [Food Name]" (например "🦴 Premium Bone")
- ✅ Блок с игрушкой: "[emoji] [Toy Name]" (например "🧶 Yarn Ball")
- ✅ Emoji соответствуют полученным предметам
- ✅ Названия правильные и читаемые
- ✅ Кнопка "Collect Reward" активна
- ✅ Кнопка "Continue to room" доступна

---

### ✅ Test 5: Check Inventory

**Цель:** Проверить, что предметы правильно отображаются с изображениями

**Шаги:**
1. После получения бонуса
2. Перейти в Home Screen
3. Нажать на иконку Hunger (еда) или Fun (игрушки)

**Ожидаемый результат:**
- ✅ Модальное окно показывает доступные предметы
- ✅ Предметы отображаются с ИЗОБРАЖЕНИЯМИ (не emoji символами)
- ✅ Изображения такие же, как в магазине (64x64px в rounded контейнере)
- ✅ Под изображением показывается название предмета
- ✅ Effectiveness работает корректно
- ✅ Можно нажать на предмет и использовать его

---

### ✅ Test 6: Use Bonus Items

**Цель:** Проверить, что бонусные предметы работают

**Шаги:**
1. Открыть модальное окно Hunger или Fun
2. Нажать на полученный бонусный предмет
3. Подтвердить использование

**Ожидаемый результат:**
- ✅ Stat (Hunger/Fun) увеличивается
- ✅ Предмет удаляется из инвентаря
- ✅ Toast показывает изменение (+X Hunger/Fun)

---

## 🔍 Advanced Testing

### Check localStorage State

**Просмотр сохраненных данных:**
```javascript
// Проверить состояние бонусной системы
const bonusState = JSON.parse(localStorage.getItem('papiDailyBonusState'));
console.log('Bonus State:', bonusState);

// Вывести время последнего бонуса
console.log('Last Bonus:', new Date(bonusState.lastBonusTimestamp));

// Вывести полученные предметы
console.log('Today Items:', bonusState.todaysBonusItems);
```

### Calculate Time Until Next Bonus

```javascript
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
const now = Date.now();
const nextBonus = state.lastBonusTimestamp + (24 * 60 * 60 * 1000);
const timeLeft = nextBonus - now;

const hours = Math.floor(timeLeft / (1000 * 60 * 60));
const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

console.log(`Next bonus in: ${hours}h ${minutes}m`);
```

### Reset Daily Bonus System

```javascript
// Полный сброс (можно получить бонус снова)
localStorage.removeItem('papiDailyBonusState');
location.reload();
```

---

## 🎲 Random Item Verification

### Expected Items Distribution

**Еда (9 типов):**
- Fresh Carrot, Rice Bowl, Fish Snacks
- Star Cookie, Premium Bone, Cool Banana
- Love Cupcake, Chicken Leg, Meat Feast

**Игрушки (6 типов):**
- Tennis Ball, Yarn Ball, Puzzle Buddy
- Rainbow Cube, Cuddle Bear, Space Rocket

### Test Random Distribution (10 trials)

```javascript
// Сбросить и получить 10 бонусов для проверки распределения
const results = [];

for (let i = 0; i < 10; i++) {
  localStorage.removeItem('papiDailyBonusState');
  
  // Импортировать функцию
  const { claimDailyBonus } = await import('./utils/dailyBonusSystem');
  const items = claimDailyBonus();
  
  results.push({
    food: items[0].name,
    toy: items[1].name
  });
}

console.table(results);
```

---

## 📊 Expected Behavior Summary

| Scenario | Bonus Given? | Inventory Change | Toast Notification |
|----------|--------------|------------------|-------------------|
| First login (clean) | ✅ Yes | +2 items | ✅ Yes |
| Re-login (< 24h) | ❌ No | No change | ❌ No |
| After 24h | ✅ Yes | +2 items | ✅ Yes |
| Multiple logins same day | ❌ No | No change | ❌ No |

---

## 🐛 Common Issues & Solutions

### Issue: No bonus received on first login

**Solution:**
```javascript
// Clear all storage and try again
localStorage.clear();
location.reload();
```

### Issue: Bonus received multiple times

**Check:** 
```javascript
// Verify timestamp is being saved
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
console.log('Timestamp:', state.lastBonusTimestamp);
// Should be a valid number (not 0)
```

### Issue: Same items every time

**This is expected** - random selection happens on each claim, so you might get the same items by chance. Try multiple tests to verify randomness.

---

## ✅ Checklist

Before marking as complete:

- [ ] First login gives 2 items (1 food + 1 toy)
- [ ] Re-login within 24h gives nothing
- [ ] After 24h gives new 2 items
- [ ] Toast notification shows correct item names
- [ ] Items appear in inventory
- [ ] Items can be used to increase stats
- [ ] localStorage is properly updated
- [ ] Timestamp is saved correctly
- [ ] Random items vary across tests

---

**Testing Date:** October 29, 2025  
**Version:** 2.7  
**Status:** Ready for Testing
