import React from 'react';

interface StatusIndicatorsProps {
  hunger: number; // 0-100
  fun: number; // 0-100
  energy: number; // 0-100
  onHungerClick?: () => void;
  onFunClick?: () => void;
  onEnergyClick?: () => void;
  foodCount?: number;
  toyCount?: number;
}

export function StatusIndicators({ 
  hunger, 
  fun, 
  energy,
  onHungerClick,
  onFunClick,
  onEnergyClick,
  foodCount = 0,
  toyCount = 0
}: StatusIndicatorsProps) {
  const StatusMeter = ({ 
    value, 
    emoji, 
    color, 
    label,
    onClick,
    badge 
  }: { 
    value: number; 
    emoji: string; 
    color: string; 
    label: string;
    onClick?: () => void;
    badge?: number;
  }) => {
    const percentage = Math.max(0, Math.min(100, value));
    
    return (
      <div className="flex flex-col items-center gap-1.5">
        {/* Emoji indicator - Compact 44x44px */}
        <button
          onClick={onClick}
          className="relative w-[44px] h-[44px] kawaii-card flex items-center justify-center text-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.15)]"
          style={{
            borderRadius: '16px'
          }}
        >
          {emoji}
          {badge !== undefined && badge > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-[#FFB7C5] to-[#FF9DB3] rounded-full flex items-center justify-center shadow-lg border-2 border-white sparkle">
              <span className="text-[10px] font-['Nunito'] font-extrabold text-white">{badge}</span>
            </div>
          )}
        </button>
        
        {/* Progress circle - More compact */}
        <div className="relative w-9 h-9">
          <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
              className="opacity-30"
            />
            
            {/* Progress circle */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 87.96} 87.96`}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-['Nunito'] font-semibold text-[#333] leading-none">
              {Math.round(percentage)}
            </span>
          </div>
        </div>
        
        {/* Label */}
        <span className="text-[11px] font-['Nunito'] font-semibold text-[#333] leading-none">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-8 px-4">
      <StatusMeter
        value={hunger}
        emoji="🍖"
        color="#FFB7C5"
        label="Hunger"
        onClick={onHungerClick}
        badge={foodCount}
      />
      
      <StatusMeter
        value={fun}
        emoji="🎾"
        color="#C8B8FF"
        label="Fun"
        onClick={onFunClick}
        badge={toyCount}
      />
      
      <StatusMeter
        value={energy}
        emoji="🌙"
        color="#FFD66C"
        label="Energy"
        onClick={onEnergyClick}
      />
    </div>
  );
}