import React from 'react';

interface KawaiiProgressProps {
  current?: number;
  max?: number;
  level?: number;
  className?: string;
  showNumbers?: boolean;
}

export function KawaiiProgress({ 
  current = 0, 
  max = 100, 
  level,
  className = '',
  showNumbers = true 
}: KawaiiProgressProps) {
  const percentage = Math.min(((current || 0) / (max || 1)) * 100, 100);
  
  return (
    <div className={`kawaii-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        {level && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#D7C4F3] to-[#C9B3E8] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{level}</span>
            </div>
            <span className="font-['Nunito'] font-semibold text-[#2C2C2E]">Level {level}</span>
          </div>
        )}
        
        {showNumbers && (
          <span className="font-['Nunito'] font-medium text-[#8E8E93] text-sm">
            {(current || 0).toLocaleString()} / {(max || 0).toLocaleString()}
          </span>
        )}
      </div>
      
      <div className="relative">
        <div className="w-full h-3 bg-[#FFF6E8] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            {/* Sparkle effect */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-80 sparkle" />
            </div>
          </div>
        </div>
        
        {/* Progress markers */}
        <div className="flex justify-between mt-1">
          {[25, 50, 75, 100].map((marker, index) => {
            const markerPercentage = (marker / 100) * 100;
            return (
              <div
                key={marker}
                className={`w-1 h-2 rounded-full ${
                  percentage >= markerPercentage ? 'bg-[#FFB3C6]' : 'bg-[#E5E5EA]'
                }`}
                style={{ marginLeft: index === 0 ? '0' : '-2px' }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface KawaiiLevelBadgeProps {
  level: number;
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KawaiiLevelBadge({ 
  level, 
  progress, 
  size = 'md',
  className = '' 
}: KawaiiLevelBadgeProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };
  
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
        {/* Background circle */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#FFF6E8"
          strokeWidth="6"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="url(#gradient)"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB3C6" />
            <stop offset="100%" stopColor="#FF9FB7" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Level number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
          <span className="font-['Nunito'] font-bold text-[#2C2C2E] text-lg">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
}