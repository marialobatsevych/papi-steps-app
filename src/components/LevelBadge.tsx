import React from 'react';

interface LevelBadgeProps {
  level: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export function LevelBadge({ level, size = 'small', showLabel = true }: LevelBadgeProps) {
  // Size configuration
  const sizeConfig = {
    small: {
      container: 'w-7 h-7',
      text: 'text-[11px]',
      labelText: 'text-[9px]',
      iconPadding: 'p-1'
    },
    medium: {
      container: 'w-10 h-10',
      text: 'text-sm',
      labelText: 'text-[10px]',
      iconPadding: 'p-1.5'
    },
    large: {
      container: 'w-12 h-12',
      text: 'text-base',
      labelText: 'text-xs',
      iconPadding: 'p-2'
    }
  };

  const config = sizeConfig[size];

  // Gradient colors based on level milestones
  const getGradientColor = () => {
    if (level >= 20) return 'from-[#FFD66C] via-[#FFC94D] to-[#FFB830]'; // Gold for high levels
    if (level >= 15) return 'from-[#C8B8FF] via-[#B8A8FF] to-[#A99EFF]'; // Purple
    if (level >= 10) return 'from-[#B8E3FF] via-[#8ED4FF] to-[#6EC5FF]'; // Blue
    if (level >= 5) return 'from-[#FFB7C5] via-[#FF9FB7] to-[#FF87A9]';  // Pink
    return 'from-[#FFD6E8] via-[#FFB7C5] to-[#FF9FB7]'; // Light pink for beginners
  };

  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Level Badge Icon */}
      <div className={`
        ${config.container}
        ${config.iconPadding}
        bg-gradient-to-br ${getGradientColor()}
        rounded-full
        flex items-center justify-center
        shadow-[0_2px_8px_rgba(0,0,0,0.15)]
        border-2 border-white/80
        relative
        group
        transition-all duration-300
        hover:scale-110
        cursor-pointer
      `}>
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{
               animation: 'shimmer-badge 2s infinite',
               backgroundSize: '200% 100%'
             }} 
        />
        
        {/* Level number */}
        <span className={`
          font-['Nunito']
          ${config.text}
          font-extrabold
          text-white
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]
          relative z-10
        `}>
          {level}
        </span>

        {/* Sparkle decoration for high levels */}
        {level >= 10 && (
          <div className="absolute -top-0.5 -right-0.5 text-[8px] animate-pulse">
            ✨
          </div>
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span className={`
          font-['Nunito']
          ${config.labelText}
          font-semibold
          text-white
          drop-shadow-md
          opacity-90
        `}>
          LVL
        </span>
      )}

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer-badge {
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
