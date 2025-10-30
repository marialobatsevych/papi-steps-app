# Daily Goal System Documentation

## Overview
The Daily Goal System is activated when Papi reaches the **Adult stage** (30,000+ total steps). Instead of showing evolution progress, the UI switches to displaying daily step goals.

## Features

### 1. Daily Goal Progress Bar
- **Before Adult Stage**: Shows evolution progress (Birth → Baby → Teenager → Adult)
- **After Adult Stage (30,000+ steps)**: Shows daily goal progress
  - Header changes from "Adult Papi" to "Daily Goal"
  - Progress shows current daily steps vs. daily goal (e.g., "8,500 / 10,000")
  - Progress bar uses gold gradient, changing to rainbow when goal is reached

### 2. Evolved Papi State
- **Trigger**: When Adult Papi reaches the daily goal
- **Character**: Switches from Adult Papi to Evolved Papi (brighter, happier version)
- **Animation**: Eyes blink periodically (alternates between open and closed images)
- **Duration**: Stays in Evolved state until the next day

### 3. Settings Integration
Located in **Menu → Settings**:
- **"Change Daily Goal" button**: Opens slider interface
- **Slider range**: 3,000 - 30,000 steps (increments of 1,000)
- **Current value**: Displayed above slider in large numbers
- **Actions**: Save or Cancel buttons

### 4. Motivational Messages
Displayed below the progress bar:
- **Before reaching goal**: "Reach your daily goal"
- **After reaching goal**: "🎉 Goal reached!"

### 5. Daily Reset (Future Implementation)
Currently, daily steps are manually set. When integrated with Apple Health:
- Daily steps reset to 0 at midnight
- `dailyGoalReached` flag resets to false
- Total steps continue accumulating (for evolution)
- Steps sync from Apple Health throughout the day

## Component Architecture

### Key Components
1. **EvolutionPapiCharacter** (`/components/EvolutionPapiCharacter.tsx`)
   - Handles character display based on evolution stage
   - Shows Evolved Papi when `dailyGoalReached = true` and stage is Adult
   - Blinking animation for Evolved state

2. **EvolutionProgress** (`/components/EvolutionProgress.tsx`)
   - Shows evolution progress for stages before Adult
   - Shows daily goal progress for Adult stage
   - Changes color gradient based on state

3. **KawaiiSettingsScreen** (`/components/screens/KawaiiSettingsScreen.tsx`)
   - Settings interface with daily goal slider
   - Range: 3,000 - 30,000 steps
   - Saves new goal and updates UI immediately

### State Management (App.tsx)
```typescript
const [gameState, setGameState] = useState({
  steps: 8500,              // Daily steps (will sync from Apple Health)
  totalSteps: 35000,        // Lifetime total for evolution
  dailyGoal: 10000,         // Configurable in Settings (3K-30K)
  dailyGoalReached: false   // Auto-updates when steps >= dailyGoal
});
```

## Visual Design

### Colors
- **Evolution stages**:
  - Birth: Pink gradient
  - Baby: Lavender gradient
  - Teenager: Mint gradient
  - Adult/Daily Goal: Gold gradient
  - Goal Reached: Rainbow gradient

### Character States
- **Adult Papi**: Normal happy puppy (goal not reached)
- **Evolved Papi**: Brighter, more vibrant version with blinking animation

### Progress Bar
- Track: Semi-transparent white with glassmorphism
- Fill: Gradient based on stage/state
- Sparkle indicator at progress end
- Shimmer animation effect

## User Flow

1. **New User**:
   - Start with Birth Papi (0 steps)
   - Progress through evolution stages as they walk

2. **Reaching Adult (30,000 steps)**:
   - Evolution animation plays
   - Progress bar switches to daily goal mode
   - Message changes to "Reach your daily goal"

3. **Daily Goal Achievement**:
   - Character transforms to Evolved Papi
   - Progress bar fills with rainbow gradient
   - Message shows "🎉 Goal reached!"
   - State persists until next day

4. **Changing Daily Goal**:
   - Open Menu → Settings
   - Tap "Change Daily Goal"
   - Adjust slider (3K-30K steps)
   - Tap "Save" to apply

## Future Enhancements

### Apple Health Integration
- [ ] Sync daily steps from Apple Health
- [ ] Auto-reset at midnight
- [ ] Background sync throughout the day
- [ ] Request HealthKit permissions on first launch

### Additional Features
- [ ] Weekly goal streak tracking
- [ ] Monthly achievement badges
- [ ] Custom celebration animations
- [ ] Goal history and statistics
- [ ] Friends leaderboard for daily goals

## Testing Notes

For testing purposes:
- `totalSteps` is set to 35,000 (Adult stage) in App.tsx
- `steps` is set to 8,500 (below goal of 10,000)
- Use the "+" button in development to add steps and test goal completion
- Adjust `dailyGoal` in Settings to test different thresholds

## Files Modified/Created

### New Files
- `/components/screens/KawaiiSettingsScreen.tsx`
- `/DAILY_GOAL_SYSTEM.md` (this file)

### Modified Files
- `/App.tsx` - Added daily goal state and Settings screen
- `/components/EvolutionPapiCharacter.tsx` - Added Evolved state and blinking
- `/components/EvolutionProgress.tsx` - Added daily goal display mode
- `/components/screens/KawaiiHomeScreen.tsx` - Pass daily goal props
- `/components/screens/KawaiiMenuScreen.tsx` - Settings navigation
