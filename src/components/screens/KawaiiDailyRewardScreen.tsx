import React from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { GiftIcon, PawIcon, StarIcon, HeartIcon } from '../KawaiiIcons';

interface KawaiiDailyRewardScreenProps {
  onCollect: () => void;
  onClose: () => void;
  reward: {
    coins?: number;
    foodItem?: {
      name: string;
      emoji: string;
    };
    toyItem?: {
      name: string;
      emoji: string;
    };
  };
}

export function KawaiiDailyRewardScreen({ onCollect, onClose, reward }: KawaiiDailyRewardScreenProps) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFE8F0] via-[#F5E8FF] to-[#E8F5FF] relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating hearts */}
        <div className="absolute top-20 left-16 w-4 h-4 text-[#FFB7C5] opacity-40 float" style={{ animationDelay: '0s' }}>
          <HeartIcon size={16} />
        </div>
        <div className="absolute top-32 right-20 w-5 h-5 text-[#C8B8FF] opacity-50 float" style={{ animationDelay: '1s' }}>
          <StarIcon size={20} />
        </div>
        <div className="absolute bottom-32 left-20 w-3 h-3 text-[#FFD66C] opacity-30 float" style={{ animationDelay: '2s' }}>
          <HeartIcon size={12} />
        </div>
        <div className="absolute top-40 left-1/2 w-4 h-4 text-[#B8E3FF] opacity-45 float" style={{ animationDelay: '0.5s' }}>
          <StarIcon size={16} />
        </div>
        <div className="absolute bottom-40 right-16 w-3 h-3 text-[#FFB7C5] opacity-35 float" style={{ animationDelay: '1.5s' }}>
          <HeartIcon size={12} />
        </div>
        
        {/* Sparkles */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full sparkle opacity-50"
            style={{
              background: i % 4 === 0 ? '#FFB7C5' : i % 4 === 1 ? '#C8B8FF' : i % 4 === 2 ? '#B8E3FF' : '#FFD66C',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-sm">
        {/* Welcome Back Text */}
        <h1 className="font-['Nunito'] font-extrabold text-4xl bg-gradient-to-br from-[#FFB7C5] via-[#C8B8FF] to-[#B8E3FF] bg-clip-text text-transparent mb-2 drop-shadow-sm">
          Welcome back!
        </h1>
        
        <p className="font-['Nunito'] font-semibold text-[#333] text-lg mb-8 opacity-70">
          Papi missed you so much! 💕
        </p>
        
        {/* Gift Icon Container */}
        <div className="relative mb-8">
          {/* Gift box - simple without circle */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            <div className="text-8xl animate-bounce">
              🎁
            </div>
          </div>
        </div>
        
        {/* Reward Details */}
        <div className="mb-8">
          <h2 className="font-['Nunito'] font-bold text-xl text-[#333] mb-5 opacity-60">
            Daily Reward! ✨
          </h2>
          
          <div className="space-y-3">
            {/* Bonus coins */}
            {reward.coins && (
              <div className="flex items-center justify-center gap-3 bg-white/40 rounded-2xl p-4">
                <div className="text-2xl opacity-70">💰</div>
                <span className="font-['Nunito'] font-semibold text-base text-[#333] opacity-60">
                  +{reward.coins} coins
                </span>
              </div>
            )}
            
            {/* Bonus food item */}
            {reward.foodItem && (
              <div className="flex items-center justify-center gap-3 bg-white/40 rounded-2xl p-4">
                <div className="text-2xl opacity-70">{reward.foodItem.emoji}</div>
                <span className="font-['Nunito'] font-semibold text-base text-[#333] opacity-60">
                  {reward.foodItem.name}
                </span>
              </div>
            )}
            
            {/* Bonus toy item */}
            {reward.toyItem && (
              <div className="flex items-center justify-center gap-3 bg-white/40 rounded-2xl p-4">
                <div className="text-2xl opacity-70">{reward.toyItem.emoji}</div>
                <span className="font-['Nunito'] font-semibold text-base text-[#333] opacity-60">
                  {reward.toyItem.name}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Main Collect Button with gradient border */}
          <button
            onClick={onCollect}
            className="relative w-full h-[52px] px-6 group"
          >
            {/* Gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB7C5] via-[#C8B8FF] to-[#B8E3FF] rounded-full p-[2px] shadow-[0_8px_32px_rgba(255,183,197,0.4)] group-hover:shadow-[0_12px_40px_rgba(255,183,197,0.5)] transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-[#FFB7C5] to-[#FF9FB7] rounded-full flex items-center justify-center gap-2 group-hover:from-[#FFB7C5] group-hover:to-[#FFB7C5] transition-all duration-300 group-active:scale-[0.98]">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">✨</span>
                <span className="font-['Nunito'] font-extrabold text-lg text-white">
                  Collect Reward
                </span>
              </div>
            </div>
          </button>
          
          {/* Secondary Button */}
          <button
            onClick={onClose}
            className="relative w-full h-[44px] px-6 group"
          >
            {/* Subtle gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B8E3FF]/40 via-[#C8B8FF]/40 to-[#FFB7C5]/40 rounded-full p-[2px]">
              <div className="w-full h-full bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-white/80 transition-all duration-300 group-active:scale-[0.98]">
                <span className="font-['Nunito'] font-semibold text-[#333] opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                  Continue to room
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}