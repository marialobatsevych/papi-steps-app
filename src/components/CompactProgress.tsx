import React from 'react';

interface CompactProgressProps {
  current: number;
  max: number;
  className?: string;
}

export function CompactProgress({ current, max, className = '' }: CompactProgressProps) {
  const percentage = Math.min(((current || 0) / (max || 1)) * 100, 100);
  
  return (
    <div className={`relative w-full ${className}`}>
      {/* Progress bar */}
      <div className="w-full h-2.5 bg-white bg-opacity-40 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-[#FFB7C5] via-[#FF9FB7] to-[#FFB7C5] rounded-full transition-all duration-500 ease-out relative shadow-sm"
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40" 
               style={{
                 animation: 'shimmer 2s infinite',
                 backgroundSize: '200% 100%'
               }} 
          />
          
          {/* Sparkle at the end */}
          {percentage > 5 && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90 sparkle" />
            </div>
          )}
        </div>
      </div>
      
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
