# Emotional States System for Papi

## Overview
Papi now displays different emotional states based on three core stats: **Hunger**, **Energy**, and **Fun**. The system includes both positive emotional states (when stats are at maximum) and negative emotional states (when stats drop below 30).

## Emotional States

### Positive States ✨

#### 1. 🎉 Excited Papi
- **Trigger Condition:** Fun level reaches 100
- **Visual:** Displays the Excited Papi image with stars in eyes and sparkles around
- **Animation:** Bouncing animation (bounce-cute) with floating sparkles
- **Revert Condition:** Fun level drops below 99 → returns to normal or other state

#### 2. 💚 Full Papi
- **Trigger Condition:** Hunger level reaches 100
- **Visual:** Displays the Full Papi image (satisfied and content with full belly)
- **Revert Condition:** Hunger level drops below 99 → returns to normal or other state

### Negative States 😢

#### 3. 🍖 Hungry Papi
- **Trigger Condition:** Hunger level drops below 30
- **Visual:** Displays the Hungry Papi image (with empty food bowl)
- **Revert Condition:** Hunger level rises above 30 → returns to normal Papi

#### 4. 💤 Sleepy Papi
- **Trigger Condition:** Energy level drops below 30
- **Visual:** Displays the Sleepy Papi image (with sleeping cap)
- **Revert Condition:** Energy level rises above 30 → returns to normal Papi

#### 5. 🥺 Sad Papi
- **Trigger Condition:** Fun level drops below 30
- **Visual:** Displays the Sad Papi image (with big teary eyes)
- **Revert Condition:** Fun level rises above 30 → returns to normal Papi

## Priority System

The system follows a clear priority order, with positive states having precedence over negative states:

**Excited → Full → Hungry → Sleepy → Sad → Normal**

### Examples:
- If Fun = 100, display **Excited Papi** (highest priority, with bouncing animation)
- If Hunger = 100 and Fun = 50, display **Full Papi** 
- If Hunger = 20 and Fun = 25, display **Hungry Papi** (hunger has priority over sadness)
- If Energy = 25 and Fun = 20, display **Sleepy Papi** (sleepy has priority over sad)
- If Hunger = 50, Energy = 50, and Fun = 20, display **Sad Papi** (only fun is low)
- If Fun = 100 and Hunger = 20, display **Excited Papi** (positive states override negative)

## Technical Implementation

### Component: `EvolutionPapiCharacter`

The emotional state system is integrated into the `EvolutionPapiCharacter` component.

**Props:**
```typescript
interface EvolutionPapiCharacterProps {
  totalSteps: number;
  dailyGoalReached?: boolean;
  hunger?: number;      // 0-100, default 100
  energy?: number;      // 0-100, default 100
  fun?: number;         // 0-100, default 100
  className?: string;
}
```

**Emotional State Logic:**
```typescript
const getEmotionalState = (hungerLevel: number, energyLevel: number, funLevel: number): EmotionalState => {
  // Positive states (highest priority)
  // Priority 1: Excited (Fun = 100)
  if (funLevel >= 100) return 'excited';
  // Priority 2: Full (Hunger = 100)
  if (hungerLevel >= 100) return 'full';
  
  // Negative states
  // Priority 3: Hungry (Hunger < 30)
  if (hungerLevel < 30) return 'hungry';
  // Priority 4: Sleepy (Energy < 30)
  if (energyLevel < 30) return 'sleepy';
  // Priority 5: Sad (Fun < 30)
  if (funLevel < 30) return 'sad';
  
  // Default: Normal
  return 'normal';
};
```

### Images Used
**Positive States:**
- **Excited Papi:** `figma:asset/090affff1fc9e909d46ecba5a4dce008332c8cf4.png`
- **Full Papi:** `figma:asset/3a3c1406f0b2dfc07ce77bfa9750f393b9fb06e7.png`

**Negative States:**
- **Hungry Papi:** `figma:asset/71cc61fcf8b843854579ea9ed70325b8bbe88627.png`
- **Sleepy Papi:** `figma:asset/64dd9bca11606ed801312c3d774a0ddf4c122059.png`
- **Sad Papi:** `figma:asset/84d4f0cccdc9b1d58efc62847d7d271a388a9657.png`

### Animations

**Smooth Transitions:**
- All emotional state changes use a **0.4s ease-in-out fade transition**
- The transition is applied to both the container and the image for smooth visual feedback
- This ensures a gentle, kawaii-style transition between states

**Special Animations:**

1. **Excited Papi Animation:**
   - Uses the `bounce-cute` animation class for continuous bouncing
   - Sparkles float around Papi with the `sparkle` animation
   - Creates a joyful, energetic feeling
   
2. **Normal Float Animation:**
   - All other states use the gentle `float` animation
   - Subtle up-and-down movement for a calm, kawaii effect

**CSS Implementation:**
```css
/* Smooth fade transition */
transition: opacity 0.4s ease-in-out;

/* Bounce animation for Excited state */
@keyframes bounce-cute {
  0%, 100% { 
    transform: translateY(0) scale(1); 
  }
  10% { 
    transform: translateY(0) scale(1.05, 0.95); 
  }
  30% { 
    transform: translateY(-20px) scale(1.02, 1); 
  }
  50% { 
    transform: translateY(-30px) scale(1, 1.02); 
  }
  70% { 
    transform: translateY(-10px) scale(0.98, 1.02); 
  }
  85% { 
    transform: translateY(0) scale(1.02, 0.98); 
  }
}

/* Sparkle animation */
@keyframes sparkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
```

## Special Cases

### Evolved State Priority
- When Papi reaches the **Evolved state** (Adult stage + daily goal reached), the evolved form takes priority over emotional states
- Emotional states only override normal evolution stages (birth, baby, teenager, adult)
- Evolved Papi will always display as evolved, regardless of stats

### Sleeping Mode
- When Papi is in sleeping mode (manually put to sleep), the sleeping animation overrides all emotional states
- Once Papi wakes up, the emotional state system resumes normally

## User Experience

The emotional states system creates a more engaging and responsive pet experience:

1. **Visual Feedback:** Players can instantly see when Papi needs care or is happy
2. **Positive Reinforcement:** Excited and Full states reward players for taking good care of Papi
3. **Priority Clarity:** The priority system prevents confusion when multiple needs are at extremes
4. **Smooth Transitions:** Gentle animations maintain the kawaii aesthetic
5. **Emotional Connection:** Different expressions help players bond with Papi
6. **Dynamic Animations:** Excited state bounces joyfully, creating a more lively experience

## Gameplay Tips

**Achieving Positive States:**
- **Excited Papi:** Play with Papi using toys until Fun reaches 100
- **Full Papi:** Feed Papi until Hunger reaches 100

**Note:** Positive states disappear when the stat drops below 99, encouraging players to maintain high stat levels for continuous happiness!

## Future Enhancements

Potential additions to the emotional states system:
- Voice/sound effects for each emotional state
- Particle effects for positive states
- Combo bonuses for maintaining multiple max stats
- Temporary emotional states based on recent actions
- Emotional state history tracking
- Special rewards for keeping Papi in positive states
