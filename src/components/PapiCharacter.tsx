import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import papiImage from 'figma:asset/26276152c43cf7a12310239da7cdc42a82994af2.png';

export type PapiState = 'normal' | 'fed' | 'happy' | 'sleeping' | 'super';

interface PapiCharacterProps {
  state?: PapiState;
  className?: string;
}

interface TapParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export function PapiCharacter({ state = 'normal', className = '' }: PapiCharacterProps) {
  const [tapParticles, setTapParticles] = useState<TapParticle[]>([]);
  const [isTapped, setIsTapped] = useState(false);
  const getStateOverlay = () => {
    switch (state) {
      case 'fed':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Full cheeks effect */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-[#FFB3C6] rounded-full opacity-60" />
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#FFB3C6] rounded-full opacity-60" />
            {/* Sparkles */}
            <div className="absolute top-4 left-8 text-yellow-400 sparkle">✨</div>
            <div className="absolute top-6 right-6 text-yellow-400 sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
            <div className="absolute bottom-8 left-6 text-yellow-400 sparkle" style={{ animationDelay: '1s' }}>💫</div>
          </div>
        );
        
      case 'happy':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Shiny eyes effect */}
            <div className="absolute top-8 left-10 w-2 h-2 bg-white rounded-full opacity-80" />
            <div className="absolute top-8 right-10 w-2 h-2 bg-white rounded-full opacity-80" />
            {/* Happy sparkles */}
            <div className="absolute top-2 left-4 text-pink-400 sparkle">💖</div>
            <div className="absolute top-4 right-4 text-pink-400 sparkle" style={{ animationDelay: '0.3s' }}>💝</div>
            <div className="absolute bottom-6 left-8 text-pink-400 sparkle" style={{ animationDelay: '0.7s' }}>💕</div>
            <div className="absolute bottom-4 right-8 text-pink-400 sparkle" style={{ animationDelay: '1.2s' }}>💓</div>
          </div>
        );
        
      case 'sleeping':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Sleep effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2C2C2E] opacity-20 rounded-full" />
            {/* Zzz effects */}
            <div className="absolute -top-4 right-6 text-[#8E8E93] text-lg opacity-70 float" style={{ animationDelay: '0s' }}>z</div>
            <div className="absolute -top-6 right-4 text-[#8E8E93] text-xl opacity-50 float" style={{ animationDelay: '0.5s' }}>z</div>
            <div className="absolute -top-8 right-2 text-[#8E8E93] text-2xl opacity-30 float" style={{ animationDelay: '1s' }}>Z</div>
          </div>
        );
        
      case 'super':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Glowing aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-transparent to-yellow-200 opacity-30 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 via-transparent to-yellow-300 opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            {/* Energy sparkles */}
            <div className="absolute top-0 left-4 text-yellow-400 sparkle-enhanced">⚡</div>
            <div className="absolute top-2 right-2 text-yellow-400 sparkle-enhanced" style={{ animationDelay: '0.2s' }}>✨</div>
            <div className="absolute top-6 left-2 text-yellow-400 sparkle-enhanced" style={{ animationDelay: '0.4s' }}>💫</div>
            <div className="absolute bottom-8 right-4 text-yellow-400 sparkle-enhanced" style={{ animationDelay: '0.6s' }}>⭐</div>
            <div className="absolute bottom-4 left-6 text-yellow-400 sparkle-enhanced" style={{ animationDelay: '0.8s' }}>🌟</div>
            <div className="absolute bottom-2 right-8 text-yellow-400 sparkle-enhanced" style={{ animationDelay: '1s' }}>✨</div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const getAnimation = () => {
    switch (state) {
      case 'fed':
        return 'animate-bounce';
      case 'happy':
        return 'float';
      case 'sleeping':
        return 'animate-pulse';
      case 'super':
        return 'float';
      default:
        return 'float';
    }
  };

  // Handle Papi tap
  const handlePapiTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't react if sleeping
    if (state === 'sleeping') return;

    // Trigger bounce animation
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 600);

    // Get tap position relative to the character
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Random emojis based on state
    const emojiOptions = state === 'super' 
      ? ['⭐', '✨', '💫', '🌟']
      : state === 'happy'
      ? ['💖', '💕', '💝', '💓']
      : state === 'fed'
      ? ['✨', '⭐', '🍖']
      : ['💛', '💙', '💜', '🧡', '💚'];

    const randomEmoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];

    // Create particle
    const newParticle: TapParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: randomEmoji,
    };

    setTapParticles(prev => [...prev, newParticle]);

    // Remove particle after animation
    setTimeout(() => {
      setTapParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Papi character */}
      <motion.div 
        className={`relative cursor-pointer ${getAnimation()}`} 
        style={{ width: '126px', height: '126px' }}
        onClick={handlePapiTap}
        animate={{
          scale: isTapped ? [1, 1.15, 0.95, 1.05, 1] : 1,
          rotate: isTapped ? [0, -5, 5, -3, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          src={papiImage} 
          alt="Papi the cute puppy" 
          className="w-full h-full object-contain drop-shadow-lg"
        />
        
        {/* State overlay effects */}
        {getStateOverlay()}
      </motion.div>

      {/* Tap particles */}
      <AnimatePresence>
        {tapParticles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none text-2xl"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            initial={{ opacity: 1, scale: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: [1, 1.5, 1.2],
              y: -60,
              x: (Math.random() - 0.5) * 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}