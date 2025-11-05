import React from 'react';

interface PixelProgressProps {
  current: number;
  max: number;
  segments?: number[];
  className?: string;
  showLabels?: boolean;
}

export function PixelProgress({ 
  current, 
  max, 
  segments = [1000, 10000, 35000, 50000],
  className = '',
  showLabels = true 
}: PixelProgressProps) {
  const percentage = Math.min((current / max) * 100, 100);
  
  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <span className="font-['Press_Start_2P'] text-[10px] text-[#2B2B2B]">
            Steps: {current.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      )}
      
      <div className="relative">
        {/* Main progress bar */}
        <div className="w-full h-6 bg-[#FFF6EA] border-2 border-[#2B2B2B] relative overflow-hidden">
          <div 
            className="h-full bg-[#FFD166] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Segment markers */}
          {segments.map((segment, index) => {
            const segmentPercentage = (segment / max) * 100;
            if (segmentPercentage <= 100) {
              return (
                <div
                  key={segment}
                  className="absolute top-0 bottom-0 w-[2px] bg-[#2B2B2B]"
                  style={{ left: `${segmentPercentage}%` }}
                />
              );
            }
            return null;
          })}
        </div>
        
        {/* Segment labels */}
        <div className="flex justify-between mt-1">
          {segments.map((segment, index) => {
            const segmentPercentage = (segment / max) * 100;
            if (segmentPercentage <= 100) {
              return (
                <span
                  key={segment}
                  className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]"
                  style={{ marginLeft: index === 0 ? '0' : '-20px' }}
                >
                  {segment >= 1000 ? `${segment / 1000}k` : segment}
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

interface PixelLevelBadgeProps {
  level: number;
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PixelLevelBadge({ 
  level, 
  progress, 
  size = 'md',
  className = '' 
}: PixelLevelBadgeProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-[10px]',
    md: 'w-20 h-20 text-[12px]',
    lg: 'w-24 h-24 text-[14px]'
  };
  
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Circular progress ring */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 68 68">
        {/* Background ring */}
        <circle
          cx="34"
          cy="34"
          r="30"
          stroke="#FFF6EA"
          strokeWidth="4"
          fill="none"
        />
        {/* Progress ring */}
        <circle
          cx="34"
          cy="34"
          r="30"
          stroke="#FFB3C6"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="square"
          className="transition-all duration-500"
        />
      </svg>
      
      {/* Level number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#FFF6EA] border-2 border-[#2B2B2B] rounded-none px-2 py-1">
          <span className="font-['Press_Start_2P'] text-[#2B2B2B]">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
}