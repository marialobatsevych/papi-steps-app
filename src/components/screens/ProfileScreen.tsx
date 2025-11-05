import React from 'react';
import { PixelButton } from '../PixelButton';
import { PixelLevelBadge } from '../PixelProgress';
import { BackArrowIcon, CoinIcon, HeartIcon, GiftIcon } from '../PixelIcons';

interface ProfileScreenProps {
  onBack: () => void;
  username: string;
  level: number;
  levelProgress: number;
  totalSteps: number;
  coins: number;
  streak: number;
  onDailyBonus: () => void;
  onSettings: () => void;
  onFriends: () => void;
}

export function ProfileScreen({ 
  onBack, 
  username, 
  level, 
  levelProgress, 
  totalSteps, 
  coins, 
  streak,
  onDailyBonus,
  onSettings,
  onFriends
}: ProfileScreenProps) {
  // Generate a simple calendar grid for streak visualization
  const getDailyBonusCalendar = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ day: '', checked: false, empty: true });
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const isChecked = day <= today.getDate() && day > (today.getDate() - streak);
      days.push({ day: day.toString(), checked: isChecked, empty: false });
    }
    
    return days;
  };
  
  const calendarDays = getDailyBonusCalendar();
  
  return (
    <div className="w-full h-screen bg-[#FFF6EA] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b-2 border-[#2B2B2B]">
        <button onClick={onBack} className="p-2">
          <BackArrowIcon size={24} color="#2B2B2B" />
        </button>
        
        <h1 className="font-['Press_Start_2P'] text-[16px] text-[#2B2B2B] flex-1">
          PROFILE
        </h1>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* User Info */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-[#EAD7FF] border-2 border-[#2B2B2B] flex items-center justify-center flex-shrink-0">
            <div className="w-12 h-12 bg-[#FFB3C6] border border-[#2B2B2B] rounded-full flex items-center justify-center">
              <span className="font-['Press_Start_2P'] text-[12px] text-[#2B2B2B]">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h2 className="font-['Press_Start_2P'] text-[14px] text-[#2B2B2B] mb-2">
              {username}
            </h2>
            
            <div className="flex items-center gap-4">
              <PixelLevelBadge level={level} progress={levelProgress} size="sm" />
              
              <div className="text-left">
                <p className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B] mb-1">
                  Level {level}
                </p>
                <p className="font-['Press_Start_2P'] text-[8px] text-[#A0A0A0]">
                  {levelProgress}% to next
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Steps */}
          <div className="bg-[#C3F0D9] border-2 border-[#2B2B2B] p-4">
            <div className="text-center">
              <div className="mb-2">
                <span className="font-['Press_Start_2P'] text-[16px] text-[#2B2B2B]">
                  {totalSteps.toLocaleString()}
                </span>
              </div>
              <p className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">
                Total Steps
              </p>
            </div>
          </div>
          
          {/* Current Coins */}
          <div className="bg-[#FFD166] border-2 border-[#2B2B2B] p-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <CoinIcon size={16} />
                <span className="font-['Press_Start_2P'] text-[16px] text-[#2B2B2B]">
                  {coins.toLocaleString()}
                </span>
              </div>
              <p className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">
                Current Coins
              </p>
            </div>
          </div>
        </div>
        
        {/* Daily Streak */}
        <div className="bg-[#EAD7FF] border-2 border-[#2B2B2B] p-4">
          <div className="flex items-center gap-2 mb-3">
            <HeartIcon size={16} />
            <h3 className="font-['Press_Start_2P'] text-[12px] text-[#2B2B2B]">
              Daily Streak: {streak} days
            </h3>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-center">
                <span className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">
                  {day}
                </span>
              </div>
            ))}
            
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-center
                  ${day.empty ? '' : 'border border-[#2B2B2B]'}
                  ${day.checked ? 'bg-[#FFB3C6]' : 'bg-[#FFF6EA]'}
                `}
              >
                {!day.empty && (
                  <span className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">
                    {day.day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <PixelButton 
            variant="primary" 
            size="lg" 
            onClick={onDailyBonus}
            className="w-full flex items-center justify-center gap-2"
          >
            <GiftIcon size={16} color="#2B2B2B" />
            Daily Bonus
          </PixelButton>
          
          <div className="grid grid-cols-2 gap-3">
            <PixelButton 
              variant="secondary" 
              size="md" 
              onClick={onFriends}
              className="w-full"
            >
              Friends
            </PixelButton>
            
            <PixelButton 
              variant="ghost" 
              size="md" 
              onClick={onSettings}
              className="w-full"
            >
              Settings
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}