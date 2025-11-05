import React, { useEffect } from 'react';
import { HouseIcon, PawIcon } from '../PixelIcons';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#FFF6EA] to-[#EAD7FF] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Animated pixel sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD166] animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Logo */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <HouseIcon size={48} color="#FFB3C6" />
          <div className="absolute -bottom-2 -right-2">
            <PawIcon size={24} color="#2B2B2B" />
          </div>
        </div>
      </div>
      
      {/* App Title */}
      <h1 className="font-['Press_Start_2P'] text-[32px] text-[#2B2B2B] mb-4 text-center leading-tight">
        PAPI
        <br />
        STEPS
      </h1>
      
      {/* Tagline */}
      <p className="font-['Press_Start_2P'] text-[12px] text-[#2B2B2B] text-center leading-relaxed max-w-xs">
        Your cozy companion for daily adventures
      </p>
      
      {/* Loading indicator */}
      <div className="mt-12 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-[#FFB3C6] animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}