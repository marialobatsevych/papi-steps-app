/**
 * Daily Bonus System
 * 
 * Provides daily random item rewards (1 food + 1 toy) from shop
 * Checks once every 24 hours on app launch
 */

// Import images from shop
import fishImage from 'figma:asset/b60b2e31bd60711f29bea10086f8dd02a48259a1.png';
import boneImage from 'figma:asset/dd0188f73a98e7ff1b89a8d28c8f4e8067ef6087.png';
import steakImage from 'figma:asset/49aa32a632cbfbb5ecb305c904e64cd226120ab4.png';
import riceImage from 'figma:asset/471f42b173f51b4645103730154f13594c8c1f54.png';
import carrotImage from 'figma:asset/f9ac01b66750b1ec56dfd4802b27f8dfc01f1a49.png';
import cookieImage from 'figma:asset/191f333a23e13988d7a63f612dbb87ec70ca18a0.png';
import bananaImage from 'figma:asset/fec3636561aab138cdf8ef21fa3723bf68e6e5ad.png';
import cupcakeImage from 'figma:asset/a570dacb003dd95b058a4fafe3f88dd15d29030b.png';
import chickenImage from 'figma:asset/20e3e583e3934f7a97d8d92e661d1f0affb3659e.png';
import rubikCubeImage from 'figma:asset/9ed396baa4d1da3b52e4da6ff1a9ecef210b7818.png';
import tennisBallImage from 'figma:asset/0fbcf65fdb22df5315c24ccf7250c69b68e0ea20.png';
import rocketImage from 'figma:asset/ba663e83bdecb45aedc773cb2bbe75bcb37e8bcc.png';
import yarnBallImage from 'figma:asset/e26581ee10278338e5e5152b9de723de1ecbbd81.png';
import teddyBearImage from 'figma:asset/96d3c868d840d7b1b0d98d02ce8bf4678b96c3a1.png';
import puzzleImage from 'figma:asset/b4eeb55fb03964ff4fa0d1448c3082b7b42903c3.png';

export interface DailyBonusItem {
  id: string;
  name: string;
  emoji: string;
  category: 'food' | 'toys';
  imageUrl?: string;
  effectiveness?: number;
}

interface DailyBonusState {
  lastBonusTimestamp: number;
  todaysBonusItems?: DailyBonusItem[];
}

const STORAGE_KEY = 'papiDailyBonusState';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// All available shop items (food and toys only)
const SHOP_FOOD_ITEMS: DailyBonusItem[] = [
  { id: 'food5', name: 'Fresh Carrot', emoji: '🥕', category: 'food', imageUrl: carrotImage, effectiveness: 15 },
  { id: 'food4', name: 'Rice Bowl', emoji: '🍚', category: 'food', imageUrl: riceImage, effectiveness: 20 },
  { id: 'food2', name: 'Fish Snacks', emoji: '🐟', category: 'food', imageUrl: fishImage, effectiveness: 25 },
  { id: 'food6', name: 'Star Cookie', emoji: '🍪', category: 'food', imageUrl: cookieImage, effectiveness: 30 },
  { id: 'food1', name: 'Premium Bone', emoji: '🦴', category: 'food', imageUrl: boneImage, effectiveness: 35 },
  { id: 'food7', name: 'Cool Banana', emoji: '🍌', category: 'food', imageUrl: bananaImage, effectiveness: 40 },
  { id: 'food8', name: 'Love Cupcake', emoji: '🧁', category: 'food', imageUrl: cupcakeImage, effectiveness: 45 },
  { id: 'food9', name: 'Chicken Leg', emoji: '🍗', category: 'food', imageUrl: chickenImage, effectiveness: 50 },
  { id: 'food3', name: 'Meat Feast', emoji: '🥩', category: 'food', imageUrl: steakImage, effectiveness: 55 },
];

const SHOP_TOY_ITEMS: DailyBonusItem[] = [
  { id: 'toy1', name: 'Tennis Ball', emoji: '🎾', category: 'toys', imageUrl: tennisBallImage, effectiveness: 20 },
  { id: 'toy4', name: 'Yarn Ball', emoji: '🧶', category: 'toys', imageUrl: yarnBallImage, effectiveness: 28 },
  { id: 'toy6', name: 'Puzzle Buddy', emoji: '🧩', category: 'toys', imageUrl: puzzleImage, effectiveness: 33 },
  { id: 'toy2', name: 'Rainbow Cube', emoji: '🎲', category: 'toys', imageUrl: rubikCubeImage, effectiveness: 38 },
  { id: 'toy5', name: 'Cuddle Bear', emoji: '🧸', category: 'toys', imageUrl: teddyBearImage, effectiveness: 43 },
  { id: 'toy3', name: 'Space Rocket', emoji: '🚀', category: 'toys', imageUrl: rocketImage, effectiveness: 55 },
];

/**
 * Get random item from array
 */
function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Load daily bonus state from localStorage
 */
function loadBonusState(): DailyBonusState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      lastBonusTimestamp: 0,
    };
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return {
      lastBonusTimestamp: 0,
    };
  }
}

/**
 * Save daily bonus state to localStorage
 */
function saveBonusState(state: DailyBonusState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Check if 24 hours have passed since last bonus
 */
export function shouldReceiveDailyBonus(): boolean {
  const state = loadBonusState();
  const now = Date.now();
  const timeSinceLastBonus = now - state.lastBonusTimestamp;
  
  return timeSinceLastBonus >= TWENTY_FOUR_HOURS;
}

/**
 * Generate today's random bonus items (1 food + 1 toy)
 * Returns the items and marks bonus as claimed
 */
export function claimDailyBonus(): DailyBonusItem[] {
  const randomFood = getRandomItem(SHOP_FOOD_ITEMS);
  const randomToy = getRandomItem(SHOP_TOY_ITEMS);
  
  const bonusItems = [randomFood, randomToy];
  
  // Save state with current timestamp
  const state: DailyBonusState = {
    lastBonusTimestamp: Date.now(),
    todaysBonusItems: bonusItems,
  };
  
  saveBonusState(state);
  
  return bonusItems;
}

/**
 * Get today's bonus items without claiming (if already claimed today)
 */
export function getTodaysBonusItems(): DailyBonusItem[] | null {
  const state = loadBonusState();
  return state.todaysBonusItems || null;
}

/**
 * Reset bonus system (for testing)
 */
export function resetDailyBonusSystem(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get time until next bonus is available
 */
export function getTimeUntilNextBonus(): number {
  const state = loadBonusState();
  const now = Date.now();
  const nextBonusTime = state.lastBonusTimestamp + TWENTY_FOUR_HOURS;
  const timeRemaining = Math.max(0, nextBonusTime - now);
  
  return timeRemaining;
}

/**
 * Format time until next bonus as human-readable string
 */
export function formatTimeUntilBonus(): string {
  const ms = getTimeUntilNextBonus();
  
  if (ms === 0) {
    return 'Available now!';
  }
  
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
}
