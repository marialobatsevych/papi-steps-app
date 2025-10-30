import React, { useState, useEffect } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { CompactProgress } from '../CompactProgress';
import { EvolutionProgress } from '../EvolutionProgress';
import { PapiCharacter, PapiState } from '../PapiCharacter';
import { EvolutionPapiCharacter } from '../EvolutionPapiCharacter';
import { StatusIndicators } from '../StatusIndicators';
import { ActionModal } from '../ActionModal';
import { TutorialTooltip } from '../TutorialTooltip';
import { PapiSpeechBubble } from '../PapiSpeechBubble';
import { ShopIcon, FriendsIcon, MessageIcon, MenuIcon, PawIcon } from '../KawaiiIcons';
import { FlyEvent } from '../events/FlyEvent';
import { PoopEvent } from '../events/PoopEvent';
import { SpiderEvent } from '../events/SpiderEvent';
import { attemptEventSpawn, recordEventSpawn, createEvent, EVENTS_CONFIG, RandomEvent } from '../../utils/randomEventsSystem';
import { toast } from 'sonner@2.0.3';
import defaultRoomBackground from 'figma:asset/ac07d83922ffd5b6c2d62affefe76615b484d899.png';
import nightRoomBackground from 'figma:asset/56190699f2f0cea718dc6441a83903d48cd6e924.png';
import sleepingPapi1 from 'figma:asset/311f8d3e6791ac38c5192b8f1bde163eb5263780.png';
import sleepingPapi2 from 'figma:asset/ce2c98095ea9166be99571d36941ed66d5b01315.png';
import gardenWallpaper from 'figma:asset/3160b6f7f4bbb7d6313e1f704605265d32dbb943.png';
import bathroomWallpaper from 'figma:asset/093cf73e36eda935fb9ccaae880f48807d062283.png';
import autumnWallpaper from 'figma:asset/e66d81490411fc7973201a06072883dfb1bb7c8b.png';
import cityStreetWallpaper from 'figma:asset/48885d6b2ff61da364a47d6222a269d7066c5785.png';
import beachTerraceWallpaper from 'figma:asset/10efe042560ee4f7a8796a4b6497eeb94ae41f5f.png';
import cafeWallpaper from 'figma:asset/afcd8cc6a21154579d475a00b317d0c6f5990606.png';

interface InventoryItem {
  id: string;
  name: string;
  emoji: string;
  category: 'food' | 'toys';
  imageUrl?: string;
}

interface GameStats {
  hunger: number;
  fun: number;
  energy: number;
}

interface KawaiiHomeScreenProps {
  steps: number;
  maxSteps: number;
  totalSteps: number;
  level: number;
  coins: number;
  inventory: InventoryItem[];
  activeWallpaper: string | null;
  dailyGoal: number;
  dailyGoalReached: boolean;
  gameStats: GameStats;
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
  onShopClick: () => void;
  onFriendsClick: () => void;
  onMessagesClick: () => void;
  onMenuClick: () => void;
  onItemUse: (item: InventoryItem, action: 'feed' | 'play' | 'sleep') => void;
  onSleep: () => void;
  onAddSteps?: (amount: number) => void;
  onEventReward?: (coins: number, statBonus?: { type: 'hunger' | 'fun' | 'energy', amount: number }) => void;
  onEventPenalty?: (fun: number, energy: number) => void;
}

export function KawaiiHomeScreen({ 
  steps, 
  maxSteps, 
  totalSteps,
  level,
  coins,
  inventory,
  activeWallpaper,
  dailyGoal,
  dailyGoalReached,
  gameStats: externalGameStats,
  setGameStats,
  onShopClick,
  onFriendsClick,
  onMessagesClick,
  onMenuClick,
  onItemUse,
  onSleep,
  onAddSteps,
  onEventReward,
  onEventPenalty
}: KawaiiHomeScreenProps) {
  const [papiState, setPapiState] = useState<PapiState>('normal');
  const [isSleeping, setIsSleeping] = useState(false);
  const [sleepingFrame, setSleepingFrame] = useState<1 | 2>(1);
  const [background, setBackground] = useState<'day' | 'night'>('day');
  // Use external gameStats from App.tsx (time-based system)
  const gameStats = externalGameStats;
  const [activeModal, setActiveModal] = useState<'feed' | 'play' | 'sleep' | null>(null);
  const [showTutorial, setShowTutorial] = useState(() => {
    // Show tutorial only on first visit
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    return !hasSeenTutorial;
  });
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  
  // Random Events state
  const [currentEvent, setCurrentEvent] = useState<RandomEvent | null>(null);

  // Show speech bubble every 10 seconds
  useEffect(() => {
    // Don't show if tutorial is visible or if modal is open
    if (showTutorial || activeModal) return;

    // Show immediately on first render
    const initialTimer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 2000);

    // Then show every 10 seconds
    const interval = setInterval(() => {
      setShowSpeechBubble(true);
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showTutorial, activeModal]);

  // Check if step goal is reached for Super Papi
  const isGoalReached = steps >= maxSteps;
  
  useEffect(() => {
    if (isGoalReached && papiState !== 'super') {
      setPapiState('super');
      // Reset to normal after celebration
      const timer = setTimeout(() => {
        setPapiState('normal');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isGoalReached, papiState]);

  // Animate sleeping Papi - switch between two frames
  useEffect(() => {
    if (!isSleeping) return;
    
    const interval = setInterval(() => {
      setSleepingFrame(prev => prev === 1 ? 2 : 1);
    }, 2000); // Switch every 2 seconds for gentle breathing animation
    
    return () => clearInterval(interval);
  }, [isSleeping]);

  // Random Events System - spawn events periodically
  useEffect(() => {
    // Don't spawn events if tutorial is showing or modal is open
    if (showTutorial || activeModal || isSleeping || currentEvent) return;

    // Check for event spawn every 60 seconds
    const checkInterval = setInterval(() => {
      const eventType = attemptEventSpawn(gameStats.hunger, gameStats.fun, gameStats.energy);
      
      if (eventType) {
        const event = createEvent(eventType);
        setCurrentEvent(event);
        recordEventSpawn(eventType);
        
        // Show onboarding hint for first-time events
        const hasSeenEvent = localStorage.getItem(`hasSeenEvent_${eventType}`);
        if (!hasSeenEvent) {
          localStorage.setItem(`hasSeenEvent_${eventType}`, 'true');
        }
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(checkInterval);
  }, [showTutorial, activeModal, isSleeping, currentEvent, gameStats]);

  // Event Handlers
  const handleFlycatch = () => {
    if (!currentEvent || currentEvent.type !== 'fly') return;
    
    const reward = EVENTS_CONFIG.fly.reward_coins;
    onEventReward?.(reward);
    toast.success('🪰 Fly caught!', {
      description: `+${reward} coins! Quick reflexes!`,
      duration: 3000,
    });
    setCurrentEvent(null);
  };

  const handlePoopClean = () => {
    if (!currentEvent || currentEvent.type !== 'poop') return;
    
    const reward = EVENTS_CONFIG.poop.reward_coins;
    const statBonus = EVENTS_CONFIG.poop.reward_stat_percent || 0;
    onEventReward?.(reward, { type: 'fun', amount: statBonus });
    toast.success('🧹 All clean!', {
      description: `+${reward} coins and +${statBonus}% Fun!`,
      duration: 3000,
    });
    setCurrentEvent(null);
  };

  const handleSpiderTap = (success: boolean) => {
    if (!currentEvent || currentEvent.type !== 'spider') return;
    
    if (success) {
      const reward = EVENTS_CONFIG.spider.reward_coins;
      onEventReward?.(reward);
      toast.success('🕷️ Spider defeated!', {
        description: `+${reward} coins! Great timing!`,
        duration: 3000,
      });
    } else {
      const funPenalty = EVENTS_CONFIG.spider.penalty_fun || 0;
      const energyPenalty = EVENTS_CONFIG.spider.penalty_energy || 0;
      onEventPenalty?.(funPenalty, energyPenalty);
      toast.error('🕷️ Spider bite!', {
        description: `Papi lost ${funPenalty}% Fun and ${energyPenalty}% Energy!`,
        duration: 3000,
      });
    }
    setCurrentEvent(null);
  };

  const handleEventExpire = () => {
    setCurrentEvent(null);
  };

  const handleItemSelect = (item: InventoryItem) => {
    if (activeModal === 'feed') {
      setGameStats(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 25)
      }));
      setPapiState('fed');
      onItemUse(item, 'feed');
      
      // Reset state after animation
      setTimeout(() => {
        setPapiState('normal');
      }, 3000);
    } else if (activeModal === 'play') {
      setGameStats(prev => ({
        ...prev,
        fun: Math.min(100, prev.fun + 30),
        energy: Math.max(0, prev.energy - 15)
      }));
      setPapiState('happy');
      onItemUse(item, 'play');
      
      // Reset state after animation
      setTimeout(() => {
        setPapiState('normal');
      }, 3000);
    } else if (activeModal === 'sleep') {
      setGameStats(prev => ({
        ...prev,
        energy: 100,
        hunger: Math.max(0, prev.hunger - 10)
      }));
      setIsSleeping(true);
      setBackground('night');
      onItemUse(item, 'sleep');
      
      // Wake up after 8 seconds
      setTimeout(() => {
        setIsSleeping(false);
        setBackground('day');
        setPapiState('normal');
      }, 8000);
    }
  };

  const getFoodItems = () => inventory.filter(item => item.category === 'food');
  const getToyItems = () => inventory.filter(item => item.category === 'toys');

  const handleCloseTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  // Background system with wallpaper support
  const getBackgroundImage = () => {
    // When sleeping, ALWAYS show night room (overrides any active wallpaper)
    if (background === 'night') {
      return nightRoomBackground;
    }
    
    // If user has active wallpaper, use it (during daytime only)
    if (activeWallpaper) {
      const wallpaperMap: Record<string, string> = {
        'wallpaper_garden': gardenWallpaper,
        'wallpaper_bathroom': bathroomWallpaper,
        'wallpaper_autumn': autumnWallpaper,
        'wallpaper_city_street': cityStreetWallpaper,
        'wallpaper_beach_terrace': beachTerraceWallpaper,
        'wallpaper_cafe': cafeWallpaper
      };
      return wallpaperMap[activeWallpaper] || defaultRoomBackground;
    }
    
    // Default room background
    return defaultRoomBackground;
  };
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 
        Room Background - Changes with purchased wallpapers
        Default: Cozy room
        Night: Cozy room at night with stars (when sleeping)
        Custom: User-purchased wallpapers from shop
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Top Header - Glassmorphism Panel with Enhanced Centering */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-6 px-5">
        <div className="flex items-center justify-center gap-3">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="flex-shrink-0 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-[20px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          >
            <MenuIcon size={20} className="text-[#333]" />
          </button>
          
          {/* Evolution Progress - Shows character evolution stage or daily goal for adult */}
          <div className="flex-1 bg-gradient-to-br from-[#FFB7C5]/30 via-[#C8B8FF]/20 to-[#B8E3FF]/30 backdrop-blur-xl rounded-[20px] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-white/40">
            <EvolutionProgress 
              totalSteps={totalSteps}
              dailySteps={steps}
              dailyGoal={dailyGoal}
            />
          </div>
          
          {/* Coins Display - Larger Icon */}
          <div className="flex-shrink-0 flex items-center gap-2 bg-white/90 backdrop-blur-lg rounded-[20px] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <PawIcon size={20} className="text-[#FFD66C]" />
            <span className="font-['Nunito'] font-bold text-[15px] text-[#333]">{coins}</span>
          </div>
        </div>
      </div>

      {/* Night stars overlay - only visible when sleeping */}
      {isSleeping && (
        <div className="absolute inset-0 pointer-events-none z-[4] animate-in fade-in duration-1000">
          <div className="absolute top-20 left-16 text-white opacity-60 sparkle">⭐</div>
          <div className="absolute top-32 right-20 text-white opacity-80 sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute top-48 left-24 text-white opacity-50 sparkle" style={{ animationDelay: '1s' }}>🌟</div>
          <div className="absolute top-60 right-32 text-white opacity-70 sparkle" style={{ animationDelay: '1.5s' }}>💫</div>
          <div className="absolute top-[30%] left-[20%] text-white opacity-40 sparkle" style={{ animationDelay: '2s' }}>✨</div>
          <div className="absolute top-[40%] right-[15%] text-white opacity-60 sparkle" style={{ animationDelay: '2.5s' }}>⭐</div>
        </div>
      )}

      {/* Bottom Gradient Overlay for readability - adapts to day/night */}
      <div className={`absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none z-[5] transition-all duration-1000 ease-in-out ${
        background === 'night' 
          ? 'bg-gradient-to-t from-[#1a1625] via-[#1a1625]/80 to-transparent' 
          : 'bg-gradient-to-t from-white via-white/80 to-transparent'
      }`} />

      {/* Character Area - 80% width, centered, positioned from top like in Figma */}
      <div className="absolute left-0 right-0 top-[313px] z-10 flex items-center justify-center">
        <div className="w-[80%] aspect-square max-w-[400px] flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center" style={{
            filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12))'
          }}>
            {isSleeping ? (
              /* Sleeping Papi Animation */
              <>
                <img 
                  src={sleepingPapi1}
                  alt="Sleeping Papi 1"
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out"
                  style={{
                    opacity: sleepingFrame === 1 ? 1 : 0
                  }}
                />
                <img 
                  src={sleepingPapi2}
                  alt="Sleeping Papi 2"
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out"
                  style={{
                    opacity: sleepingFrame === 2 ? 1 : 0
                  }}
                />
              </>
            ) : (
              /* Evolution Papi Character - Changes based on total steps, daily goal and emotional state */
              <EvolutionPapiCharacter 
                totalSteps={totalSteps}
                dailyGoalReached={dailyGoalReached}
                hunger={gameStats.hunger}
                energy={gameStats.energy}
                fun={gameStats.fun}
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Controls with Enhanced Spacing */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 px-5">
        
        {/* Status Indicators - Compact and well-spaced from buttons */}
        <div className="flex justify-center mb-4">
          <StatusIndicators 
            hunger={gameStats.hunger}
            fun={gameStats.fun}
            energy={gameStats.energy}
            onHungerClick={() => setActiveModal('feed')}
            onFunClick={() => setActiveModal('play')}
            onEnergyClick={() => {
              // Send Papi to sleep directly when clicking Energy
              if (!isSleeping) {
                // Call parent sleep handler
                onSleep();
                
                setIsSleeping(true);
                setBackground('night');
                
                // Wake up after 8 seconds
                setTimeout(() => {
                  setIsSleeping(false);
                  setBackground('day');
                  setPapiState('normal');
                }, 8000);
              }
            }}
            foodCount={getFoodItems().length}
            toyCount={getToyItems().length}
          />
        </div>

        {/* Navigation Buttons - Same Height, Centered, with Hover Animation */}
        <div className="flex items-center justify-center gap-3 px-2">
          <KawaiiButton 
            variant="mint" 
            size="sm" 
            icon={<ShopIcon size={18} />}
            onClick={onShopClick}
            className="flex-1 max-w-[110px] !h-[48px] !min-h-[48px] !text-[14px] !font-semibold hover:scale-[1.03] active:scale-95 transition-all duration-200"
          >
            Shop
          </KawaiiButton>
          
          <KawaiiButton 
            variant="primary" 
            size="sm" 
            icon={<FriendsIcon size={18} />}
            onClick={onFriendsClick}
            className="flex-1 max-w-[110px] !h-[48px] !min-h-[48px] !text-[14px] !font-semibold hover:scale-[1.03] active:scale-95 transition-all duration-200"
          >
            Friends
          </KawaiiButton>
          
          <KawaiiButton 
            variant="lavender" 
            size="sm" 
            icon={<MessageIcon size={18} />}
            onClick={onMessagesClick}
            className="flex-1 max-w-[110px] !h-[48px] !min-h-[48px] !text-[14px] !font-semibold hover:scale-[1.03] active:scale-95 transition-all duration-200"
          >
            Messages
          </KawaiiButton>
        </div>
      </div>

      {/* Action Modals */}
      <ActionModal
        isOpen={activeModal === 'feed'}
        onClose={() => setActiveModal(null)}
        action="feed"
        items={getFoodItems()}
        onItemSelect={handleItemSelect}
        onShopClick={onShopClick}
      />
      
      <ActionModal
        isOpen={activeModal === 'play'}
        onClose={() => setActiveModal(null)}
        action="play"
        items={getToyItems()}
        onItemSelect={handleItemSelect}
        onShopClick={onShopClick}
      />
      
      <ActionModal
        isOpen={activeModal === 'sleep'}
        onClose={() => setActiveModal(null)}
        action="sleep"
        items={[]}
        onItemSelect={handleItemSelect}
        onShopClick={onShopClick}
      />
      
      {/* Papi Speech Bubble */}
      <PapiSpeechBubble 
        isVisible={showSpeechBubble && !showTutorial && !activeModal}
        onClose={() => setShowSpeechBubble(false)}
      />

      {/* Tutorial Tooltip */}
      <TutorialTooltip
        isVisible={showTutorial}
        onClose={handleCloseTutorial}
      />

      {/* Random Events */}
      {currentEvent && currentEvent.type === 'fly' && (
        <FlyEvent
          onCatch={handleFlycatch}
          onExpire={handleEventExpire}
          duration={currentEvent.duration}
        />
      )}

      {currentEvent && currentEvent.type === 'poop' && (
        <PoopEvent
          onClean={handlePoopClean}
        />
      )}

      {currentEvent && currentEvent.type === 'spider' && (
        <SpiderEvent
          onTap={handleSpiderTap}
          duration={currentEvent.duration}
        />
      )}

    </div>
  );
}