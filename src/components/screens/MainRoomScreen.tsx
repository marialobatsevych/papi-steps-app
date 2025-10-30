import React from 'react';
import { PixelButton } from '../PixelButton';
import { PixelProgress } from '../PixelProgress';
import { BurgerIcon, MusicIcon, CoinIcon, ShopIcon } from '../PixelIcons';

interface MainRoomScreenProps {
  steps: number;
  maxSteps: number;
  coins: number;
  musicEnabled: boolean;
  onShopClick: () => void;
  onProfileClick: () => void;
  onToggleMusic: () => void;
  onMenuClick: () => void;
}

export function MainRoomScreen({ 
  steps, 
  maxSteps, 
  coins, 
  musicEnabled,
  onShopClick,
  onProfileClick,
  onToggleMusic,
  onMenuClick
}: MainRoomScreenProps) {
  return (
    <div className="w-full h-screen bg-[#FFF6EA] relative overflow-hidden">
      {/* Top UI */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        {/* Header Icons */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <button onClick={onMenuClick} className="p-2">
              <BurgerIcon size={24} color="#2B2B2B" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Coins */}
            <div className="flex items-center gap-1 bg-[#C3F0D9] border-2 border-[#2B2B2B] px-3 py-2">
              <CoinIcon size={16} />
              <span className="font-['Press_Start_2P'] text-[10px] text-[#2B2B2B]">
                {coins.toLocaleString()}
              </span>
            </div>
            
            <button onClick={onToggleMusic} className="p-2">
              <MusicIcon 
                size={24} 
                color={musicEnabled ? "#FFB3C6" : "#A0A0A0"} 
              />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <PixelProgress 
            current={steps} 
            max={maxSteps}
            segments={[1000, 10000, 35000, 50000]}
          />
        </div>
      </div>
      
      {/* Room Background Elements */}
      <div className="absolute inset-0">
        {/* Window with rain effect */}
        <div className="absolute top-20 right-8 w-24 h-32 bg-[#87CEEB] border-2 border-[#2B2B2B]">
          <div className="absolute inset-1 bg-gradient-to-b from-[#87CEEB] to-[#98D8E8]">
            {/* Rain drops */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[1px] h-2 bg-[#6BB6FF] animate-pulse"
                style={{
                  left: `${10 + (i * 10)}%`,
                  top: `${(i % 3) * 20 + 10}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
          {/* Window cross */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[2px] bg-[#2B2B2B]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[2px] h-full bg-[#2B2B2B]" />
          </div>
        </div>
        
        {/* Plant on windowsill */}
        <div className="absolute top-48 right-6 w-8 h-12">
          <div className="absolute bottom-0 w-8 h-4 bg-[#8B4513] border border-[#2B2B2B]" />
          <div className="absolute bottom-4 left-1 w-6 h-8 bg-[#228B22] border border-[#2B2B2B]">
            {/* Leaves */}
            <div className="absolute -top-2 left-1 w-2 h-3 bg-[#32CD32] border border-[#2B2B2B]" />
            <div className="absolute -top-1 left-3 w-2 h-3 bg-[#32CD32] border border-[#2B2B2B]" />
          </div>
        </div>
        
        {/* Lamp */}
        <div className="absolute top-32 left-8 w-6 h-20">
          <div className="absolute top-0 left-2 w-2 h-12 bg-[#8B4513] border border-[#2B2B2B]" />
          <div className="absolute top-0 left-0 w-6 h-6 bg-[#FFD700] border border-[#2B2B2B] rounded-full" />
        </div>
        
        {/* Candle (with flicker animation) */}
        <div className="absolute bottom-32 left-6 w-4 h-8">
          <div className="absolute bottom-0 w-4 h-6 bg-[#DC143C] border border-[#2B2B2B]" />
          <div className="absolute -top-1 left-1.5 w-1 h-3 bg-[#FF4500] animate-pulse" />
        </div>
      </div>
      
      {/* Bottom UI */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex justify-between items-center">
          {/* Profile Avatar */}
          <button 
            onClick={onProfileClick}
            className="w-12 h-12 bg-[#EAD7FF] border-2 border-[#2B2B2B] flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-[#FFB3C6] border border-[#2B2B2B] rounded-full flex items-center justify-center">
              <span className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">P</span>
            </div>
          </button>
          
          {/* Shop Button */}
          <PixelButton 
            variant="primary" 
            size="lg" 
            onClick={onShopClick}
            className="flex items-center gap-2"
          >
            <ShopIcon size={16} color="#2B2B2B" />
            Shop
          </PixelButton>
        </div>
      </div>
    </div>
  );
}