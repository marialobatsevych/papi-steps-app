/**
 * Stats Timer System
 * 
 * All stats (Hunger, Fun, Energy) decrease from 100 to 0 over 24 real hours.
 * The timer continues even when the app is closed (based on system time).
 * 
 * Decrease rate: 100 points / 24 hours = 4.16 points per hour ≈ 1 point every 14.4 minutes
 */

export interface StatsTimestamps {
  hungerLastReset: number;
  funLastReset: number;
  energyLastReset: number;
}

export interface GameStats {
  hunger: number;
  fun: number;
  energy: number;
}

const STORAGE_KEY = 'papiStatsTimestamps';
const HOURS_TO_ZERO = 24;

/**
 * Calculate current stat value based on time elapsed since last reset
 */
export function calculateStatValue(lastResetTimestamp: number): number {
  const now = Date.now();
  const elapsedMilliseconds = now - lastResetTimestamp;
  const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);
  
  // Formula: current_value = max(0, 100 - ((elapsed_time_in_hours / 24) * 100))
  const currentValue = Math.max(0, 100 - ((elapsedHours / HOURS_TO_ZERO) * 100));
  
  return Math.round(currentValue);
}

/**
 * Get timestamps from localStorage, or initialize with current time
 */
export function getStatsTimestamps(): StatsTimestamps {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading stats timestamps:', error);
  }
  
  // Initialize with current time if not found
  const now = Date.now();
  const initial: StatsTimestamps = {
    hungerLastReset: now,
    funLastReset: now,
    energyLastReset: now
  };
  
  saveStatsTimestamps(initial);
  return initial;
}

/**
 * Save timestamps to localStorage
 */
export function saveStatsTimestamps(timestamps: StatsTimestamps): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
  } catch (error) {
    console.error('Error saving stats timestamps:', error);
  }
}

/**
 * Calculate all current stats based on stored timestamps
 */
export function calculateCurrentStats(): GameStats {
  const timestamps = getStatsTimestamps();
  
  return {
    hunger: calculateStatValue(timestamps.hungerLastReset),
    fun: calculateStatValue(timestamps.funLastReset),
    energy: calculateStatValue(timestamps.energyLastReset)
  };
}

/**
 * Increase a stat by a certain amount (e.g., when feeding or playing)
 * Returns the new value (capped at 100)
 */
export function increaseStat(
  currentValue: number, 
  increaseAmount: number
): number {
  return Math.min(100, currentValue + increaseAmount);
}

/**
 * Reset a specific stat to a given value and update its timestamp
 */
export function resetStatTimestamp(
  statName: 'hunger' | 'fun' | 'energy',
  newValue: number
): void {
  const timestamps = getStatsTimestamps();
  const now = Date.now();
  
  // Calculate how much time offset we need to achieve the target value
  // newValue = 100 - ((elapsedHours / 24) * 100)
  // elapsedHours = (100 - newValue) * 24 / 100
  const targetElapsedHours = (100 - newValue) * HOURS_TO_ZERO / 100;
  const targetElapsedMilliseconds = targetElapsedHours * 60 * 60 * 1000;
  const newTimestamp = now - targetElapsedMilliseconds;
  
  const updatedTimestamps: StatsTimestamps = {
    ...timestamps,
    [`${statName}LastReset`]: newTimestamp
  };
  
  saveStatsTimestamps(updatedTimestamps);
}

/**
 * Initialize stats system for a new user or reset
 */
export function initializeStatsSystem(): void {
  const now = Date.now();
  const timestamps: StatsTimestamps = {
    hungerLastReset: now,
    funLastReset: now,
    energyLastReset: now
  };
  
  saveStatsTimestamps(timestamps);
}

/**
 * Reset all stats to 100 (e.g., after daily goal is reached)
 */
export function resetAllStatsToFull(): void {
  const now = Date.now();
  const timestamps: StatsTimestamps = {
    hungerLastReset: now,
    funLastReset: now,
    energyLastReset: now
  };
  
  saveStatsTimestamps(timestamps);
}
