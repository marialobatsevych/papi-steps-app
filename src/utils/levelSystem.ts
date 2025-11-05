/**
 * Level System for Papi Steps
 * Each level requires 2x more steps than the previous level
 * 
 * Level 1: 1,000 steps
 * Level 2: 2,000 steps (cumulative: 3,000)
 * Level 3: 4,000 steps (cumulative: 7,000)
 * Level 4: 8,000 steps (cumulative: 15,000)
 * And so on...
 */

const BASE_STEPS = 1000; // Steps required for level 1

/**
 * Calculate the total steps required to reach a specific level
 */
export function getStepsForLevel(level: number): number {
  if (level <= 0) return 0;
  
  // Sum of geometric progression: a * (2^n - 1) / (2 - 1)
  // For level n: BASE_STEPS * (2^n - 1)
  return BASE_STEPS * (Math.pow(2, level) - 1);
}

/**
 * Calculate steps needed for the next level
 */
export function getStepsForNextLevel(currentLevel: number): number {
  return BASE_STEPS * Math.pow(2, currentLevel);
}

/**
 * Calculate current level based on total steps
 */
export function calculateLevel(totalSteps: number): number {
  if (totalSteps < BASE_STEPS) return 0;
  
  // Find the level using logarithm
  // level = floor(log2(totalSteps / BASE_STEPS + 1))
  const level = Math.floor(Math.log2(totalSteps / BASE_STEPS + 1));
  return level;
}

/**
 * Get progress to next level (0-100%)
 */
export function getLevelProgress(totalSteps: number): {
  currentLevel: number;
  nextLevel: number;
  currentLevelSteps: number;
  nextLevelSteps: number;
  stepsInCurrentLevel: number;
  stepsNeededForNext: number;
  progressPercentage: number;
} {
  const currentLevel = calculateLevel(totalSteps);
  const nextLevel = currentLevel + 1;
  
  const currentLevelSteps = getStepsForLevel(currentLevel);
  const nextLevelSteps = getStepsForLevel(nextLevel);
  
  const stepsInCurrentLevel = totalSteps - currentLevelSteps;
  const stepsNeededForNext = nextLevelSteps - currentLevelSteps;
  
  const progressPercentage = Math.min(100, (stepsInCurrentLevel / stepsNeededForNext) * 100);
  
  return {
    currentLevel,
    nextLevel,
    currentLevelSteps,
    nextLevelSteps,
    stepsInCurrentLevel,
    stepsNeededForNext,
    progressPercentage
  };
}

/**
 * Get level milestones for display
 */
export function getLevelMilestones(): Array<{ level: number; totalSteps: number; stepsForLevel: number }> {
  const milestones = [];
  
  for (let level = 1; level <= 20; level++) {
    milestones.push({
      level,
      totalSteps: getStepsForLevel(level),
      stepsForLevel: getStepsForNextLevel(level - 1)
    });
  }
  
  return milestones;
}

/**
 * Format steps number with commas
 */
export function formatSteps(steps: number): string {
  return steps.toLocaleString('en-US');
}
