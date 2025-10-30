# Papi Steps - UI Design Guide

## Текущая Версия 2.3 - Финальная Компоновка с Градиентом

### 🎨 Философия Дизайна

**Главный принцип:** Красивый фон комнаты - это главная фишка приложения. Все элементы интерфейса размещены внизу экрана, чтобы максимально показать уютный интерьер.

**Новый подход:**
- 🏠 Фон видно полностью (70% экрана)
- 📱 Все кнопки и контент внизу (эргономично)
- 🎨 Полупрозрачные элементы с backdrop-blur
- ✨ Персонаж Papi на переднем плане внизу

### 📐 Структура Экрана (v2.3 - Финальная)

```
┌────────────────────────────────────────┐
│ [☰] [━━━ Steps ━━━] [💰]              │ ← absolute top (50px)
├────────────────────────────────────────┤
│                                        │
│         🏠 УЮТНАЯ КОМНАТА 🏠          │
│                                        │
│    🪴 Окно с видом на природу 🌤️      │
│                                        │ ← 80% видно!
│       🛋️ Мебель и растения 🌿        │
│                                        │
│        📸 Картины на стенах           │
│                                        │
├────────────────────────────────────────┤
│  ╔══════ БЕЛЫЙ ГРАДИЕНТ ══════╗       │
│  ║                             ║       │
│  ║      🐕 Papi (280px)        ║       │
│  ║  🍖 [75] 🎾 [60] 🌙 [85]    ║       │ ← absolute bottom
│  ║   Нажмите на иконку ✨      ║       │
│  ║ [Shop][Friends][Messages]   ║       │ ← (500px градиент)
│  ╚═════════════════════════════╝       │
└────────────────────────────────────────┘
```

### 🎯 Ключевые Элементы

#### 1. Верхняя Панель (Полупрозрачная)
- **Высота:** 50px
- **Стиль:** `bg-white/80 backdrop-blur-md`
- **Элементы:**
  - Меню (☰) - 40x40px полупрозрачная кнопка
  - Прогресс шагов - растягивается, стеклянный эффект
  - Монеты (💰) - фиксированная ширина

**Полупрозрачность:**
```tsx
<div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
  <span>7,892 / 10,000</span>
  <CompactProgress current={steps} max={maxSteps} />
</div>
```

#### 2. Фоновая Область (70% экрана) 🏠
- **Тип:** Изображение комнаты
- **Размер:** `background-size: cover`
- **Позиция:** `background-position: center`
- **Оверлей:** `gradient-to-b from-transparent to-black/20`
- **Назначение:** 
  - Главная визуальная фишка приложения
  - Покупаемые фоны будут отображаться здесь
  - Создает атмосферу и настроение

**Код фона:**
```tsx
<div 
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${defaultRoomBackground})`
  }}
/>
```

#### 3. Белый Градиент (500px высота) 🤍
- **Тип:** `bg-gradient-to-t from-white via-white/80 to-transparent`
- **Z-index:** 5 (между фоном и UI)
- **Функция:** Улучшает читаемость на любом фоне
- **Pointer events:** none (не блокирует клики)

**Код градиента:**
```tsx
<div className="absolute bottom-0 left-0 right-0 h-[500px] 
                bg-gradient-to-t from-white via-white/80 to-transparent 
                pointer-events-none z-[5]" />
```

#### 4. Нижняя Секция (Absolute Bottom)
- **Позиция:** `absolute bottom-0` - зафиксирована
- **Персонаж Papi:** 280x280px, scale 3.2x
- **Статусные Индикаторы:** Под персонажем
- **Подсказка:** Серый текст `text-[#8E8E93]`
- **Навигация:** 3 кнопки по 100px

**Структура:**
```tsx
<div className="absolute bottom-0 left-0 right-0 z-10 pb-6 px-6 space-y-3">
  <PapiCharacter />
  <StatusIndicators />
  <HintText />
  <NavigationButtons />
</div>
```

### 🌈 Система Фонов

#### Текущие Фоны
1. **Дневной (по умолчанию):**
   ```css
   background: linear-gradient(180deg, #FFD6E0 0%, #FFF6E8 50%, #C6F0D3 100%)
   ```

2. **Ночной:**
   ```css
   background: linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 50%, #000000 100%)
   + Звезды overlay
   ```

3. **Super Mode:**
   ```css
   background: linear-gradient(180deg, #FFD166 0%, #FFF6E8 30%, #C3F0D9 100%)
   ```

#### Будущие Фоны (Планируется)
- 🏖️ Пляжные сцены
- 🌲 Лесные пейзажи
- 🌌 Космические темы
- 🎄 Праздничные/сезонные
- 🎨 Пользовательские (премиум)

### 📊 Компоненты

#### CompactProgress
**Файл:** `/components/CompactProgress.tsx`

**Особенности:**
- Высота: 8px (2 в Tailwind)
- Градиент: `from-[#FFB3C6] via-[#FF9FB7] to-[#FFB3C6]`
- Эффекты: 
  - Shimmer анимация
  - Sparkle на конце
  - Shadow для глубины

**Использование:**
```tsx
<CompactProgress 
  current={7892} 
  max={10000}
  className="ring-2 ring-yellow-400" // При достижении цели
/>
```

### 🎮 Интерактивность

#### Состояние Достижения Цели
Когда `steps >= maxSteps`:
- Прогресс-бар: `ring-2 ring-yellow-400 shadow-md`
- Карточка: `bg-gradient-to-r from-yellow-50 to-orange-50`
- Текст: `text-yellow-700 font-bold`
- Иконка: `🎉` с анимацией `sparkle-enhanced`

#### Статусные Иконки
- Hover: `scale-110`
- Active: `scale-95`
- Бейджи: Пульсируют (`animate-pulse`)
- Градиент: `from-[#FFB3C6] to-[#FF9DB3]`

### 📱 Адаптивность

**Целевое разрешение:** 430px × 932px (iPhone 14 Pro Max)

**Breakpoints:**
- Все элементы оптимизированы под одно разрешение
- Максимальная ширина: 430px
- Центрирование на больших экранах

### 🎨 Цветовая Палитра

#### Основные Цвета
```css
--kawaii-mint: #C3F0D9      /* Фон, кнопки */
--kawaii-pink: #FFB3C6      /* Акценты, прогресс */
--kawaii-lavender: #D7C4F3  /* Кнопки, детали */
--kawaii-beige: #FFF6E8     /* Фон карточек */
--kawaii-yellow: #FFD166    /* Super mode */
```

#### Градиенты
```css
/* Прогресс-бар */
from-[#FFB3C6] to-[#FF9FB7]

/* Достижение цели */
from-yellow-50 to-orange-50

/* Бейджи */
from-[#FFB3C6] to-[#FF9DB3]
```

### ✨ Анимации

#### Стандартные
- `sparkle` - 2s ease-in-out infinite
- `float` - 3s ease-in-out infinite
- `sparkle-enhanced` - 3s ease-in-out infinite

#### Shimmer (Новая)
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
/* Применяется к CompactProgress */
```

### 🔮 Будущие Улучшения

1. **Система Фонов**
   - Категория в магазине "Wallpapers"
   - Предпросмотр перед покупкой
   - Анимированные фоны
   - Интерактивные элементы фона

2. **Персонализация**
   - Выбор позиции Papi на экране
   - Настройка размера персонажа
   - Кастомизация цветов интерфейса

3. **Расширенная Статистика**
   - График шагов по дням
   - Достижения за фоны
   - Бонусы за цели

---

**Последнее обновление:** 13 октября 2025  
**Версия:** 2.1.0  
**Дизайнер:** Kawaii Wellness Team
