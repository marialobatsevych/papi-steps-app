import React from 'react';
import { getEvolutionProgress } from './EvolutionPapiCharacter';

interface EvolutionProgressProps {
  totalSteps: number;
  dailySteps?: number;
  dailyGoal?: number;
  className?: string;
}

export function EvolutionProgress({ totalSteps, dailySteps = 0, dailyGoal = 10000, className = '' }: EvolutionProgressProps) {
  const evolutionInfo = getEvolutionProgress(totalSteps);
  
  // If at adult stage, show daily goal instead of evolution progress
  const isAdultStage = evolutionInfo.currentStage === 'adult';
  
  // Calculate daily goal progress
  const dailyGoalPercentage = isAdultStage ? Math.min((dailySteps / dailyGoal) * 100, 100) : 0;
  
  // Stage colors
  const getStageColor = () => {
    if (isAdultStage) {
      // Rainbow gradient for evolved state when daily goal is reached
      if (dailyGoalPercentage >= 100) {
        return 'from-[#FFB7C5] via-[#C8B8FF] via-[#B8E3FF] to-[#FFD66C]';
      }
      // Gold gradient for adult/daily goal
      return 'from-[#FFD66C] via-[#FFC94D] to-[#FFD66C]';
    }
    
    switch (evolutionInfo.currentStage) {
      case 'birth':
        return 'from-[#FFD6E8] via-[#FFB7C5] to-[#FFD6E8]';
      case 'baby':
        return 'from-[#C8B8FF] via-[#A99EFF] to-[#C8B8FF]';
      case 'teenager':
        return 'from-[#B8E3FF] via-[#8ED4FF] to-[#B8E3FF]';
      default:
        return 'from-[#FFB7C5] via-[#FF9FB7] to-[#FFB7C5]';
    }
  };

  // Stage name formatting
  const getStageName = () => {
    return evolutionInfo.currentStage.charAt(0).toUpperCase() + evolutionInfo.currentStage.slice(1);
  };
  
  return (
    <div className={`relative w-full ${className}`}>
      {/* Stage label and steps info */}
      <div className="flex items-center justify-between mb-1.5 px-1">
        {!isAdultStage ? (
          <>
            <div className="flex items-center gap-2">
              <span className="font-['Nunito'] text-white text-xs font-semibold drop-shadow-md">
                {getStageName()} Papi
              </span>
              {evolutionInfo.nextStage && (
                <span className="font-['Nunito'] text-white text-[10px] opacity-90 drop-shadow-md">
                  → {evolutionInfo.nextStage}
                </span>
              )}
            </div>
            <span className="font-['Nunito'] text-white text-xs font-medium drop-shadow-md">
              {totalSteps.toLocaleString()} steps
            </span>
          </>
        ) : (
          <>
            <span className="font-['Nunito'] text-white text-xs font-semibold drop-shadow-md">
              Daily Goal
            </span>
            <span className="font-['Nunito'] text-white text-xs font-medium drop-shadow-md">
              {dailySteps.toLocaleString()} / {dailyGoal.toLocaleString()}
            </span>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-white bg-opacity-40 rounded-full overflow-hidden shadow-inner backdrop-blur-sm">
        <div 
          className={`h-full bg-gradient-to-r ${getStageColor()} rounded-full transition-all duration-700 ease-out relative shadow-sm`}
          style={{ width: `${isAdultStage ? dailyGoalPercentage : evolutionInfo.percentageInStage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" 
               style={{
                 animation: 'shimmer 2s infinite',
                 backgroundSize: '200% 100%'
               }} 
          />
          
          {/* Sparkle at the end */}
          {((isAdultStage && dailyGoalPercentage > 5) || (!isAdultStage && evolutionInfo.percentageInStage > 5)) && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-90 sparkle shadow-md" />
            </div>
          )}
        </div>
      </div>

      {/* Steps to next evolution or daily goal message */}
      {!isAdultStage && evolutionInfo.stepsToNextStage > 0 && (
        <div className="flex justify-end mt-1 px-1">
          <span className="font-['Nunito'] text-white text-[10px] opacity-80 drop-shadow-md">
            {evolutionInfo.stepsToNextStage.toLocaleString()} steps to evolve
          </span>
        </div>
      )}

      {/* Daily goal message for adult stage */}
      {isAdultStage && (
        <div className="flex justify-center mt-1">
          <span className="font-['Nunito'] text-white text-[10px] opacity-90 drop-shadow-md">
            {dailyGoalPercentage >= 100 ? '🎉 Goal reached!' : 'Reach your daily goal'}
          </span>
        </div>
      )}
      
      {/* Add shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
