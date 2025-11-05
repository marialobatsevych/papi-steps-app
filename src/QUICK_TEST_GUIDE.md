# ⚡ Quick Test Guide - Daily Bonus System

## 🎯 Быстрое тестирование за 2 минуты

### Вариант 1: Автоматический тест (Рекомендуется) 

1. **Откройте файл:**
   ```
   TEST_DAILY_BONUS_RUNNER.html
   ```

2. **Нажмите кнопки по порядку:**
   - `Run Test` для Test 1 ✅
   - `Run Test` для Test 2 ✅
   - `Run Test` для Test 3 ✅
   - `Run Test` для Test 4 ✅

3. **Проверьте результаты:**
   - Все тесты должны быть `Passed ✓`

**Готово!** Если все 4 теста зеленые - система работает корректно.

---

### Вариант 2: Ручной тест в приложении

#### Шаг 1: Первый вход
```javascript
// В браузере: нажмите F12 → Console
localStorage.clear();
location.reload();
```
- Войдите в приложение
- **Должен показаться** Daily Reward экран с подарком 🎁
- **Должен появиться** toast: "Daily Bonus! 🎁"

#### Шаг 2: Повторный вход (сразу)
- Выйдите и войдите снова
- **НЕ должен показаться** Daily Reward экран
- **НЕ должен появиться** toast

#### Шаг 3: Через 24 часа (симуляция)
```javascript
// F12 → Console
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
state.lastBonusTimestamp = Date.now() - (25 * 60 * 60 * 1000);
localStorage.setItem('papiDailyBonusState', JSON.stringify(state));
location.reload();
```
- Войдите в приложение
- **Должен показаться** Daily Reward экран снова
- **Новые предметы** в инвентаре (всего 4 штуки)

**Готово!** Если все сработало как ожидалось - система работает.

---

## 🔍 Что проверять визуально

### Daily Reward Screen:
- ✅ Пастельный градиент фона
- ✅ Анимированный подарок 🎁
- ✅ Название еды и игрушки
- ✅ Кнопка "Collect Reward"
- ✅ Плавающие сердечки и звездочки

### Inventory (Home Screen):
- ✅ Нажмите на иконку Hunger или Fun
- ✅ Предметы отображаются с **изображениями** (не emoji)
- ✅ Можно использовать предмет
- ✅ Stat увеличивается
- ✅ Предмет удаляется после использования

---

## 🐛 Если что-то не работает

### Проблема: Бонус не показывается

**Решение:**
```javascript
localStorage.clear();
location.reload();
```

### Проблема: Бонус показывается много раз

**Проверка:**
```javascript
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
console.log('Timestamp:', state.lastBonusTimestamp);
// Должно быть число (не 0)
```

### Проблема: Нет изображений в инвентаре

**Проверка:**
- Откройте модальное окно Hunger/Fun
- Предметы должны показываться с круглыми картинками 64x64px
- Если видны только emoji - проверьте imageUrl в коде

---

## 📊 Быстрая проверка состояния

```javascript
// F12 → Console
const state = JSON.parse(localStorage.getItem('papiDailyBonusState'));
console.log('Last Bonus:', new Date(state.lastBonusTimestamp));
console.log('Items:', state.todaysBonusItems);
```

---

## ✅ Быстрый чеклист

После тестирования убедитесь:

- [ ] ✅ Test 1 пройден (First Login)
- [ ] ✅ Test 2 пройден (Re-login)
- [ ] ✅ Test 3 пройден (After 24h)
- [ ] ✅ Daily Reward Screen выглядит правильно
- [ ] ✅ Предметы в инвентаре с изображениями
- [ ] ✅ Можно использовать предметы
- [ ] ✅ Toast уведомления работают

**Если все пункты отмечены** - система работает идеально! 🎉

---

**Время тестирования:** ~2 минуты  
**Сложность:** Легко  
**Требования:** Браузер с DevTools (F12)
