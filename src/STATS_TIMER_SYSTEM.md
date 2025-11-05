# Stats Timer System

## Overview

The Stats Timer System manages Papi's three core stats (Hunger, Fun, Energy) using a time-based degradation model. All stats decrease from 100 to 0 over exactly 24 real-world hours, and the timer continues running even when the app is closed.

## Core Mechanics

### Decrease Rate

Each stat decreases at the same rate:
- **Total Time:** 24 hours (from 100 to 0)
- **Points per Hour:** 4.16 points/hour
- **Points per Minute:** ~0.069 points/minute
- **Time per Point:** ~14.4 minutes

### Formula

```typescript
current_value = max(0, 100 - ((elapsed_time_in_hours / 24) * 100))
```

Where:
- `elapsed_time_in_hours` = time passed since the last reset (in hours)
- `current_value` = the stat's current value (0-100)

### Minimum Value

Each stat stops at 0 and cannot go negative.

## Stats and Triggers

### 1. Hunger 🍖
- **Decreases:** Over 24 hours naturally
- **Increases:** When Papi is fed with food items (+30 points per food item)
- **Special:** Decreases by 10 when Papi sleeps

**Emotional State Triggers:**
- **Hungry Papi:** Hunger < 30
- **Full Papi:** Hunger = 100

### 2. Fun 🎾
- **Decreases:** Over 24 hours naturally
- **Increases:** When playing with toys (+30 points per toy)

**Emotional State Triggers:**
- **Sad Papi:** Fun < 30
- **Excited Papi:** Fun = 100

### 3. Energy ⚡
- **Decreases:** Over 24 hours naturally
- **Increases:** When Papi goes to sleep (instantly restores to 100)

**Emotional State Triggers:**
- **Sleepy Papi:** Energy < 30

## Technical Implementation

### File Structure

```
/utils/statsTimerSystem.ts - Core time calculation logic
/App.tsx - Stats state management and update loop
/components/screens/KawaiiHomeScreen.tsx - UI display and user interactions
```

### Key Functions

#### `calculateStatValue(lastResetTimestamp: number): number`
Calculates current stat value based on time elapsed since last reset.

```typescript
const now = Date.now();
const elapsedMilliseconds = now - lastResetTimestamp;
const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);
const currentValue = Math.max(0, 100 - ((elapsedHours / 24) * 100));
return Math.round(currentValue);
```

#### `calculateCurrentStats(): GameStats`
Returns all three current stats based on stored timestamps.

```typescript
const timestamps = getStatsTimestamps();
return {
  hunger: calculateStatValue(timestamps.hungerLastReset),
  fun: calculateStatValue(timestamps.funLastReset),
  energy: calculateStatValue(timestamps.energyLastReset)
};
```

#### `resetStatTimestamp(statName, newValue): void`
Updates a stat's timestamp to reflect a new value (e.g., after feeding).

```typescript
// Calculate how much time offset needed to achieve target value
const targetElapsedHours = (100 - newValue) * 24 / 100;
const targetElapsedMilliseconds = targetElapsedHours * 60 * 60 * 1000;
const newTimestamp = Date.now() - targetElapsedMilliseconds;
```

### Data Storage

Stats timestamps are stored in `localStorage` under the key `papiStatsTimestamps`:

```typescript
interface StatsTimestamps {
  hungerLastReset: number;  // Unix timestamp (milliseconds)
  funLastReset: number;     // Unix timestamp (milliseconds)
  energyLastReset: number;  // Unix timestamp (milliseconds)
}
```

### Update Loop

Stats are recalculated every minute in App.tsx:

```typescript
useEffect(() => {
  const updateStats = () => {
    const updatedStats = calculateCurrentStats();
    setGameStats(updatedStats);
  };

  updateStats(); // Immediate update on mount
  const interval = setInterval(updateStats, 60 * 1000); // Every 60 seconds

  return () => clearInterval(interval);
}, []);
```

## User Interactions

### Feeding Papi 🍖

1. User selects food from inventory
2. Hunger increases by +30 points (capped at 100)
3. Timestamp is updated to reflect new value
4. Food item is removed from inventory
5. Toast notification shows increase

```typescript
const increaseAmount = 30;
const newHunger = Math.min(100, currentHunger + increaseAmount);
resetStatTimestamp('hunger', newHunger);
```

### Playing with Papi 🎾

1. User selects toy from inventory
2. Fun increases by +30 points (capped at 100)
3. Timestamp is updated to reflect new value
4. Toy item is removed from inventory
5. Toast notification shows increase

```typescript
const increaseAmount = 30;
const newFun = Math.min(100, currentFun + increaseAmount);
resetStatTimestamp('fun', newFun);
```

### Sleeping 💤

1. User clicks Energy indicator
2. Energy instantly restores to 100
3. Hunger decreases by 10 points
4. Background changes to night mode
5. Papi displays sleeping animation for 8 seconds
6. Background returns to day mode

```typescript
const newEnergy = 100;
const newHunger = Math.max(0, currentHunger - 10);
resetStatTimestamp('energy', newEnergy);
resetStatTimestamp('hunger', newHunger);
```

## Initialization

### First Launch

On first app launch, the system initializes with all stats at 100:

```typescript
const now = Date.now();
const timestamps = {
  hungerLastReset: now,
  funLastReset: now,
  energyLastReset: now
};
localStorage.setItem('papiStatsTimestamps', JSON.stringify(timestamps));
```

### Returning Users

When a user returns after closing the app:

1. Timestamps are loaded from localStorage
2. Elapsed time is calculated for each stat
3. Current values are computed based on elapsed time
4. Stats display reflects real-time passage

**Example:**
- User closes app at 12:00 PM (all stats at 100)
- User returns at 6:00 PM (6 hours later)
- Stats will show: 100 - (6/24 * 100) = 75

## Balance and Feel

### Design Goals

1. **Natural Rhythm:** 24-hour cycle matches daily routine
2. **Multiple Interactions:** Users should interact 2-4 times per day
3. **Not Overwhelming:** Stats don't drop too quickly
4. **Rewarding:** Positive emotional states at max values

### Typical Daily Flow

```
Morning (8 AM):
- All stats ~50-70% (dropped overnight)
- Feed Papi → Hunger 100 → Full Papi!
- Play with Papi → Fun 100 → Excited Papi!

Afternoon (2 PM):
- Stats ~80% (slow decrease)
- Check in, maybe feed/play if needed

Evening (8 PM):
- Stats ~60% 
- Feed and play before bed
- Put Papi to sleep → Energy 100

Night:
- Stats continue decreasing while app is closed
- By morning, ready for next cycle
```

## Future Enhancements

Potential improvements to the stats system:

1. **Customizable Decay Rates:** Allow advanced users to adjust 24-hour timer
2. **Stat History Tracking:** Show graphs of stat changes over time
3. **Smart Notifications:** Alert user when stats reach critical levels
4. **Streak Bonuses:** Reward consistent daily care
5. **Weather Effects:** Environmental factors that affect decay rates
6. **Item Variety:** Different foods/toys with varying restoration amounts
7. **Combo System:** Bonus when maintaining multiple stats at high levels

## Troubleshooting

### Stats Not Updating

**Issue:** Stats appear frozen or not changing
**Solution:** 
- Check localStorage for `papiStatsTimestamps`
- Verify interval is running in App.tsx
- Clear localStorage and refresh to reinitialize

### Stats Reset Unexpectedly

**Issue:** Stats return to 100 without user action
**Solution:**
- Check for localStorage clearing events
- Verify timestamp storage is working
- Check browser privacy/incognito mode settings

### Stats Drop Too Fast/Slow

**Issue:** Stats don't match 24-hour expectation
**Solution:**
- Verify formula: `100 - ((elapsedHours / 24) * 100)`
- Check system time is accurate
- Test with different time intervals

## Technical Notes

### Why Timestamps Instead of Intervals?

Using timestamps instead of active intervals has several advantages:

1. **App Closure:** Works even when app is closed
2. **Accuracy:** No drift from missed interval ticks
3. **Efficiency:** Only calculates when needed (every minute)
4. **Persistence:** State survives page refreshes
5. **Predictability:** Easy to calculate exact value at any time

### Performance Considerations

- Update interval: 60 seconds (not every frame)
- Calculations are lightweight (simple arithmetic)
- localStorage is only accessed on mount and when stats change
- No network calls required

---

**Last Updated:** October 28, 2025
**Version:** 1.0.0
