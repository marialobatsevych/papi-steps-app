import React, { useState } from 'react';
import { PixelButton } from '../PixelButton';
import { HouseIcon, PawIcon, HeartIcon, GiftIcon } from '../PixelIcons';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      icon: <HouseIcon size={48} color="#FFB3C6" />,
      title: "Cozy Home",
      description: "Create your perfect kawaii room with adorable decorations"
    },
    {
      icon: <PawIcon size={48} color="#C3F0D9" />,
      title: "Daily Steps",
      description: "Track your steps and watch your pet companion grow happy"
    },
    {
      icon: <GiftIcon size={48} color="#FFD166" />,
      title: "Earn Rewards",
      description: "Unlock cute items and decorations by staying active"
    }
  ];
  
  return (
    <div className="w-full h-screen bg-[#FFF6EA] flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-16 pb-8">
        <div className="flex items-center gap-2">
          <HouseIcon size={24} color="#FFB3C6" />
          <span className="font-['Press_Start_2P'] text-[14px] text-[#2B2B2B]">PAPI STEPS</span>
        </div>
      </div>
      
      {/* Carousel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="bg-[#EAD7FF] border-2 border-[#2B2B2B] p-8 max-w-sm w-full mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              {slides[currentSlide].icon}
            </div>
            
            <h2 className="font-['Press_Start_2P'] text-[16px] text-[#2B2B2B] mb-4 leading-tight">
              {slides[currentSlide].title}
            </h2>
            
            <p className="font-['Press_Start_2P'] text-[10px] text-[#2B2B2B] leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="flex gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 border-2 border-[#2B2B2B] ${
                index === currentSlide ? 'bg-[#FFB3C6]' : 'bg-[#FFF6EA]'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Permissions notice */}
      <div className="px-8 mb-6">
        <div className="bg-[#C3F0D9] border border-[#2B2B2B] p-3">
          <p className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B] leading-relaxed text-center">
            We'll ask for step tracking permission to count your daily adventures!
          </p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="px-8 pb-12 space-y-3">
        <PixelButton 
          variant="primary" 
          size="lg" 
          onClick={onComplete}
          className="w-full"
        >
          Get Started
        </PixelButton>
        
        <PixelButton 
          variant="ghost" 
          size="md" 
          onClick={onComplete}
          className="w-full"
        >
          Sign In
        </PixelButton>
      </div>
    </div>
  );
}