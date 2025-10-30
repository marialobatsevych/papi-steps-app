/**
 * Random Events System for Papi Steps
 * 
 * Three event types:
 * 1. Fly - Quick tap to catch for +50 coins
 * 2. Poop - Clean up for +20 coins and +5% Fun
 * 3. Spider - Risky event: tap before it touches pet for +75 coins or lose stats
 */

export type EventType = 'fly' | 'poop' | 'spider';

export interface RandomEvent {
  id: string;
  type: EventType;
  timestamp: number;
  duration: number; // How long the event lasts (in seconds)
}

export interface EventConfig {
  reward_coins: number;
  reward_stat_percent?: number;
  cooldown_seconds: number;
  daily_max: number;
  spawn_chance_per_tick: number;
  duration_seconds: number;
  penalty_fun?: number;
  penalty_energy?: number;
  rare_item_chance?: number;
}

export interface EventsConfig {
  fly: EventConfig;
  poop: EventConfig;
  spider: EventConfig;
}

// Event Configuration (as per specification)
export const EVENTS_CONFIG: EventsConfig = {
  fly: {
    reward_coins: 50,
    cooldown_seconds: 7200, // 2 hours
    daily_max: 2,
    spawn_chance_per_tick: 0.0008, // ~3-6% per session
    duration_seconds: 10,
  },
  poop: {
    reward_coins: 20,
    reward_stat_percent: 5,
    cooldown_seconds: 28800, // 8 hours
    daily_max: 2,
    spawn_chance_per_tick: 0.0005,
    duration_seconds: 0, // Stays until cleaned
  },
  spider: {
    reward_coins: 75,
    penalty_fun: 15,
    penalty_energy: 10,
    rare_item_chance: 0.10,
    cooldown_seconds: 86400, // 24 hours
    daily_max: 1,
    spawn_chance_per_tick: 0.00015, // Very rare
    duration_seconds: 4, // Time to tap before it reaches pet
  },
};

interface EventState {
  lastSpawn: Record<EventType, number>;
  todayCounts: Record<EventType, number>;
  lastResetDate: string;
  neglectTimer: number; // For poop spawn based on neglect
}

const STORAGE_KEY = 'papiRandomEventsState';
const TICK_INTERVAL = 60000; // 60 seconds

/**
 * Load event state from localStorage
 */
function loadEventState(): EventState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      lastSpawn: { fly: 0, poop: 0, spider: 0 },
      todayCounts: { fly: 0, poop: 0, spider: 0 },
      lastResetDate: new Date().toDateString(),
      neglectTimer: 0,
    };
  }

  try {
    const state = JSON.parse(stored);
    // Reset daily counts if it's a new day
    const today = new Date().toDateString();
    if (state.lastResetDate !== today) {
      state.todayCounts = { fly: 0, poop: 0, spider: 0 };
      state.lastResetDate = today;
    }
    return state;
  } catch {
    return {
      lastSpawn: { fly: 0, poop: 0, spider: 0 },
      todayCounts: { fly: 0, poop: 0, spider: 0 },
      lastResetDate: new Date().toDateString(),
      neglectTimer: 0,
    };
  }
}

/**
 * Save event state to localStorage
 */
function saveEventState(state: EventState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Check if an event can spawn based on cooldown and daily limit
 */
export function canSpawn(eventType: EventType): boolean {
  const state = loadEventState();
  const now = Date.now();
  const config = EVENTS_CONFIG[eventType];

  const lastSpawnTime = state.lastSpawn[eventType] || 0;
  const cooldownMs = config.cooldown_seconds * 1000;
  const todayCount = state.todayCounts[eventType] || 0;

  return (now - lastSpawnTime > cooldownMs) && (todayCount < config.daily_max);
}

/**
 * Check if poop should spawn based on neglect
 */
export function shouldSpawnPoopFromNeglect(
  hunger: number,
  fun: number,
  energy: number
): boolean {
  const state = loadEventState();
  const now = Date.now();
  
  // If any stat is below 30%, start neglect timer
  const isNeglected = hunger < 30 || fun < 30 || energy < 30;
  
  if (isNeglected) {
    if (state.neglectTimer === 0) {
      state.neglectTimer = now;
      saveEventState(state);
    }
    
    // If neglected for 12 hours, allow poop spawn
    const neglectDuration = now - state.neglectTimer;
    const TWELVE_HOURS = 12 * 60 * 60 * 1000;
    
    return neglectDuration > TWELVE_HOURS && canSpawn('poop');
  } else {
    // Reset neglect timer if pet is well cared for
    state.neglectTimer = 0;
    saveEventState(state);
    return false;
  }
}

/**
 * Attempt to spawn a random event
 * Returns event type if spawned, null otherwise
 */
export function attemptEventSpawn(
  hunger: number,
  fun: number,
  energy: number
): EventType | null {
  // Check poop from neglect first
  if (shouldSpawnPoopFromNeglect(hunger, fun, energy)) {
    return 'poop';
  }

  // Random spawns for fly and spider
  const events: EventType[] = ['fly', 'spider', 'poop'];
  
  for (const eventType of events) {
    if (!canSpawn(eventType)) continue;
    
    const config = EVENTS_CONFIG[eventType];
    const random = Math.random();
    
    if (random < config.spawn_chance_per_tick) {
      return eventType;
    }
  }
  
  return null;
}

/**
 * Record that an event has spawned
 */
export function recordEventSpawn(eventType: EventType): void {
  const state = loadEventState();
  const now = Date.now();
  
  state.lastSpawn[eventType] = now;
  state.todayCounts[eventType] = (state.todayCounts[eventType] || 0) + 1;
  
  saveEventState(state);
}

/**
 * Create a new event instance
 */
export function createEvent(eventType: EventType): RandomEvent {
  const config = EVENTS_CONFIG[eventType];
  
  return {
    id: `${eventType}_${Date.now()}_${Math.random()}`,
    type: eventType,
    timestamp: Date.now(),
    duration: config.duration_seconds,
  };
}

/**
 * Get event statistics for today
 */
export function getTodayEventStats(): Record<EventType, number> {
  const state = loadEventState();
  return { ...state.todayCounts };
}

/**
 * Reset event system (for testing)
 */
export function resetEventSystem(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Format time until next event can spawn
 */
export function getTimeUntilNextSpawn(eventType: EventType): string {
  const state = loadEventState();
  const config = EVENTS_CONFIG[eventType];
  const lastSpawnTime = state.lastSpawn[eventType] || 0;
  const cooldownMs = config.cooldown_seconds * 1000;
  const now = Date.now();
  const nextSpawnTime = lastSpawnTime + cooldownMs;
  const timeRemaining = Math.max(0, nextSpawnTime - now);
  
  if (timeRemaining === 0) {
    return 'Available now!';
  }
  
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
}
