import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import birthPapi1 from 'figma:asset/3b8ec6415ed3f88e9a683a632b7bdd8dfcd3cace.png';
import birthPapi2 from 'figma:asset/d4b72096be78851076ac44d6a70d96c26845b4cf.png';
import babyPapi from 'figma:asset/baa29a410da495f5510ef69f5d3bf30c5b04516a.png';
import teenagerPapi from 'figma:asset/3e842d4d2e392f62e911fe64e3b628f7b76b7d64.png';
import adultPapi from 'figma:asset/d2b0014470bb9801b54f9b85e7d5bf9357aa8c58.png';
import evolvedPapiOpen from 'figma:asset/2b378d6551bf4204a9226d711931e7eb7b8c8492.png';
import evolvedPapiClosed from 'figma:asset/3431c7bfe5d709541b149f326e8c28c6a4c56e06.png';
// Emotional states images - Negative states
import sleepyPapi from 'figma:asset/64dd9bca11606ed801312c3d774a0ddf4c122059.png';
import sadPapi from 'figma:asset/84d4f0cccdc9b1d58efc62847d7d271a388a9657.png';
import hungryPapi from 'figma:asset/71cc61fcf8b843854579ea9ed70325b8bbe88627.png';
// Emotional states images - Positive states
import fullPapi from 'figma:asset/3a3c1406f0b2dfc07ce77bfa9750f393b9fb06e7.png';
import excitedPapi from 'figma:asset/090affff1fc9e909d46ecba5a4dce008332c8cf4.png';

export type EvolutionStage = 'birth' | 'baby' | 'teenager' | 'adult' | 'evolved';
export type EmotionalState = 'normal' | 'hungry' | 'sleepy' | 'sad' | 'full' | 'excited';

interface TapParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export interface EvolutionPapiCharacterProps {
  totalSteps: number;
  dailyGoalReached?: boolean;
  hunger?: number;
  energy?: number;
  fun?: number;
  className?: string;
}

// Evolution thresholds
const EVOLUTION_STAGES = {
  birth: { min: 0, max: 10000 },
  baby: { min: 10001, max: 20000 },
  teenager: { min: 20001, max: 30000 },
  adult: { min: 30001, max: Infinity }
};

export function EvolutionPapiCharacter({ 
  totalSteps, 
  dailyGoalReached = false, 
  hunger = 100, 
  energy = 100, 
  fun = 100, 
  className = '' 
}: EvolutionPapiCharacterProps) {
  const [currentStage, setCurrentStage] = useState<EvolutionStage>('birth');
  const [previousStage, setPreviousStage] = useState<EvolutionStage | null>(null);
  const [isEvolving, setIsEvolving] = useState(false);
  const [birthFrame, setBirthFrame] = useState<1 | 2>(1);
  const [evolvedBlink, setEvolvedBlink] = useState(false);
  const [emotionalState, setEmotionalState] = useState<EmotionalState>('normal');
  const [previousEmotionalState, setPreviousEmotionalState] = useState<EmotionalState>('normal');
  const [tapParticles, setTapParticles] = useState<TapParticle[]>([]);
  const [isTapped, setIsTapped] = useState(false);

  // Determine current evolution stage based on total steps
  const getEvolutionStage = (steps: number): EvolutionStage => {
    if (steps >= EVOLUTION_STAGES.adult.min) return 'adult';
    if (steps >= EVOLUTION_STAGES.teenager.min) return 'teenager';
    if (steps >= EVOLUTION_STAGES.baby.min) return 'baby';
    return 'birth';
  };

  // Determine emotional state based on stats
  // Priority: Excited → Full → Hungry → Sleepy → Sad → Normal
  const getEmotionalState = (hungerLevel: number, energyLevel: number, funLevel: number): EmotionalState => {
    // Positive states (highest priority)
    // Priority 1: Excited (Fun = 100)
    if (funLevel >= 100) return 'excited';
    // Priority 2: Full (Hunger = 100)
    if (hungerLevel >= 100) return 'full';
    
    // Negative states
    // Priority 3: Hungry (Hunger < 30)
    if (hungerLevel < 30) return 'hungry';
    // Priority 4: Sleepy (Energy < 30)
    if (energyLevel < 30) return 'sleepy';
    // Priority 5: Sad (Fun < 30)
    if (funLevel < 30) return 'sad';
    
    // Default: Normal
    return 'normal';
  };

  // Check for evolution
  useEffect(() => {
    let newStage = getEvolutionStage(totalSteps);
    
    // If at adult stage and daily goal is reached, show evolved state
    if (newStage === 'adult' && dailyGoalReached) {
      newStage = 'evolved';
    }
    
    if (newStage !== currentStage) {
      setPreviousStage(currentStage);
      setIsEvolving(true);
      
      // Evolution animation duration
      setTimeout(() => {
        setCurrentStage(newStage);
        setTimeout(() => {
          setIsEvolving(false);
          setPreviousStage(null);
        }, 1000);
      }, 500);
    }
  }, [totalSteps, dailyGoalReached]);

  // Check for emotional state changes
  useEffect(() => {
    const newEmotionalState = getEmotionalState(hunger, energy, fun);
    
    if (newEmotionalState !== emotionalState) {
      setPreviousEmotionalState(emotionalState);
      setEmotionalState(newEmotionalState);
    }
  }, [hunger, energy, fun]);

  // Animate Birth Papi - alternate between two frames
  useEffect(() => {
    if (currentStage !== 'birth') return;
    
    const interval = setInterval(() => {
      setBirthFrame(prev => prev === 1 ? 2 : 1);
    }, 1500); // Blink every 1.5 seconds
    
    return () => clearInterval(interval);
  }, [currentStage]);

  // Animate Evolved Papi - blinking animation
  useEffect(() => {
    if (currentStage !== 'evolved') return;
    
    const blinkInterval = setInterval(() => {
      setEvolvedBlink(true);
      setTimeout(() => setEvolvedBlink(false), 200); // Blink duration
    }, 3000); // Blink every 3 seconds
    
    return () => clearInterval(blinkInterval);
  }, [currentStage]);

  // Handle Papi tap
  const handlePapiTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't react if sleeping
    if (emotionalState === 'sleepy') return;

    // Trigger bounce animation
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 600);

    // Get tap position relative to the character
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Random emojis based on emotional state and stage
    const getEmojiOptions = () => {
      if (emotionalState === 'excited') return ['⭐', '✨', '💫', '🌟'];
      if (emotionalState === 'full') return ['🍖', '✨', '⭐'];
      if (emotionalState === 'hungry') return ['🍕', '🍔', '🌭'];
      if (emotionalState === 'sad') return ['💙', '💜', '🧡'];
      if (currentStage === 'evolved') return ['⚡', '✨', '💫', '🌟'];
      return ['💛', '💙', '💜', '🧡', '💚', '💖'];
    };

    const emojiOptions = getEmojiOptions();
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

  // Get character image based on stage and emotional state
  const getCharacterImage = (stage: EvolutionStage, emotion: EmotionalState = 'normal') => {
    // Emotional states override normal stage images (except for evolved state)
    if (emotion !== 'normal' && stage !== 'evolved') {
      switch (emotion) {
        // Positive emotional states
        case 'excited':
          return excitedPapi;
        case 'full':
          return fullPapi;
        // Negative emotional states
        case 'hungry':
          return hungryPapi;
        case 'sleepy':
          return sleepyPapi;
        case 'sad':
          return sadPapi;
      }
    }

    // Normal stage images
    switch (stage) {
      case 'birth':
        return birthFrame === 1 ? birthPapi1 : birthPapi2;
      case 'baby':
        return babyPapi;
      case 'teenager':
        return teenagerPapi;
      case 'adult':
        return adultPapi;
      case 'evolved':
        return evolvedBlink ? evolvedPapiClosed : evolvedPapiOpen;
      default:
        return birthPapi1;
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Previous stage (fading out during evolution) */}
      {isEvolving && previousStage && (
        <div 
          className="absolute inset-0 flex items-center justify-center evolution-fade-out"
        >
          <img 
            src={getCharacterImage(previousStage, previousEmotionalState)} 
            alt="Papi evolving" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
      )}

      {/* Current stage with emotional state transition */}
      <motion.div 
        className={`relative w-full h-full cursor-pointer ${emotionalState === 'excited' ? 'bounce-cute' : 'float'} ${isEvolving ? 'evolution-fade-in' : ''}`}
        style={{
          transition: 'opacity 0.4s ease-in-out'
        }}
        onClick={handlePapiTap}
        animate={{
          scale: isTapped ? [1, 1.12, 0.95, 1.05, 1] : 1,
          rotate: isTapped ? [0, -4, 4, -2, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: emotionalState !== 'sleepy' ? 1.05 : 1 }}
        whileTap={{ scale: emotionalState !== 'sleepy' ? 0.95 : 1 }}
      >
        <img 
          src={getCharacterImage(currentStage, emotionalState)} 
          alt="Papi the cute puppy" 
          className="w-full h-full object-contain drop-shadow-lg"
          style={{
            transition: 'opacity 0.4s ease-in-out'
          }}
        />

        {/* Evolution sparkles and glow */}
        {isEvolving && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Glowing aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 opacity-40 rounded-full animate-pulse evolution-glow" />
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300 opacity-30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            
            {/* Sparkles */}
            <div className="absolute top-0 left-[15%] text-yellow-400 sparkle-enhanced text-2xl">✨</div>
            <div className="absolute top-[5%] right-[5%] text-pink-400 sparkle-enhanced text-xl" style={{ animationDelay: '0.2s' }}>💫</div>
            <div className="absolute top-[20%] left-[5%] text-blue-400 sparkle-enhanced text-lg" style={{ animationDelay: '0.4s' }}>⭐</div>
            <div className="absolute bottom-[30%] right-[15%] text-yellow-400 sparkle-enhanced text-2xl" style={{ animationDelay: '0.6s' }}>🌟</div>
            <div className="absolute bottom-[15%] left-[20%] text-pink-400 sparkle-enhanced text-xl" style={{ animationDelay: '0.8s' }}>✨</div>
            <div className="absolute bottom-[5%] right-[30%] text-blue-400 sparkle-enhanced text-lg" style={{ animationDelay: '1s' }}>💫</div>
          </div>
        )}

        {/* Excited state sparkles */}
        {emotionalState === 'excited' && !isEvolving && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-[10%] left-[20%] text-yellow-400 sparkle text-xl">⭐</div>
            <div className="absolute top-[15%] right-[15%] text-yellow-400 sparkle text-lg" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute bottom-[20%] left-[15%] text-yellow-400 sparkle text-xl" style={{ animationDelay: '1s' }}>⭐</div>
            <div className="absolute bottom-[25%] right-[20%] text-yellow-400 sparkle text-lg" style={{ animationDelay: '1.5s' }}>✨</div>
          </div>
        )}

        {/* Tap particles */}
        <AnimatePresence>
          {tapParticles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute pointer-events-none text-2xl z-50"
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
      </motion.div>
    </div>
  );
}

// Export helper function to get evolution progress info
export function getEvolutionProgress(totalSteps: number) {
  let currentStage: EvolutionStage;
  let stageMin: number;
  let stageMax: number;
  
  if (totalSteps >= EVOLUTION_STAGES.adult.min) {
    currentStage = 'adult';
    stageMin = EVOLUTION_STAGES.adult.min;
    stageMax = EVOLUTION_STAGES.adult.max;
  } else if (totalSteps >= EVOLUTION_STAGES.teenager.min) {
    currentStage = 'teenager';
    stageMin = EVOLUTION_STAGES.teenager.min;
    stageMax = EVOLUTION_STAGES.teenager.max;
  } else if (totalSteps >= EVOLUTION_STAGES.baby.min) {
    currentStage = 'baby';
    stageMin = EVOLUTION_STAGES.baby.min;
    stageMax = EVOLUTION_STAGES.baby.max;
  } else {
    currentStage = 'birth';
    stageMin = EVOLUTION_STAGES.birth.min;
    stageMax = EVOLUTION_STAGES.birth.max;
  }
  
  const stepsInCurrentStage = totalSteps - stageMin;
  const stepsNeededForStage = currentStage === 'adult' ? 1 : stageMax - stageMin;
  const percentageInStage = currentStage === 'adult' ? 100 : Math.min((stepsInCurrentStage / stepsNeededForStage) * 100, 100);
  
  return {
    currentStage,
    stepsInCurrentStage,
    stepsNeededForStage,
    percentageInStage,
    nextStage: currentStage === 'adult' ? null : 
               currentStage === 'teenager' ? 'adult' :
               currentStage === 'baby' ? 'teenager' : 'baby',
    stepsToNextStage: currentStage === 'adult' ? 0 : Math.max(0, stageMax - totalSteps)
  };
}
