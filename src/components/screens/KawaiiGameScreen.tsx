import React, { useState, useEffect, useRef } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, HeartIcon, StarIcon } from '../KawaiiIcons';
import { toast } from 'sonner@2.0.3';
import gameBackground from 'figma:asset/76d5de5718041362b9d99cdefea2554c6f0466c9.png';
import papiImage from 'figma:asset/26276152c43cf7a12310239da7cdc42a82994af2.png';

interface FallingItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  caught: boolean;
  type: 'fruit' | 'bad';
  badType?: 'poop' | 'ladybug' | 'spider';
  rotation?: number;
}

interface CoinPopup {
  id: number;
  x: number;
  y: number;
  value: number;
}

interface HappinessPopup {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

interface KawaiiGameScreenProps {
  onBack: () => void;
  onCoinsEarned?: (coins: number) => void;
}

// Daily coin limit tracking
const DAILY_COIN_LIMIT = 100;
const getDailyCoinsKey = () => {
  const today = new Date().toDateString();
  return `fruitGame_${today}_coins`;
};

const getTodayCoinsEarned = (): number => {
  return parseInt(localStorage.getItem(getDailyCoinsKey()) || '0');
};

const addTodayCoins = (amount: number): number => {
  const current = getTodayCoinsEarned();
  const newTotal = Math.min(current + amount, DAILY_COIN_LIMIT);
  localStorage.setItem(getDailyCoinsKey(), newTotal.toString());
  return newTotal - current; // Return actual coins added
};

export function KawaiiGameScreen({ onBack, onCoinsEarned }: KawaiiGameScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0); // This is now coins earned in current game
  const [happiness, setHappiness] = useState(50); // 0-100 scale
  const [coinsEarned, setCoinsEarned] = useState(0); // Final coins after daily limit
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('fruitGameHighScore') || '0');
  });
  const [timeLeft, setTimeLeft] = useState(30);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [papiPosition, setPapiPosition] = useState(50);
  const [papiEmotion, setPapiEmotion] = useState<'happy' | 'sad' | 'normal'>('normal');
  const [coinPopups, setCoinPopups] = useState<CoinPopup[]>([]);
  const [happinessPopups, setHappinessPopups] = useState<HappinessPopup[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const itemIdCounter = useRef(0);
  const coinPopupIdCounter = useRef(0);
  const happinessPopupIdCounter = useRef(0);
  const todayCoinsEarned = getTodayCoinsEarned();
  const canEarnCoins = todayCoinsEarned < DAILY_COIN_LIMIT;

  const fruitEmojis = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥝'];

  // Start game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setHappiness(50);
    setCoinsEarned(0);
    setTimeLeft(30);
    setItems([]);
    setPapiEmotion('normal');
    itemIdCounter.current = 0;
  };

  // Game timer
  useEffect(() => {
    if (!isPlaying) return;

    if (timeLeft <= 0) {
      endGame();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Spawn items (fruits and bad items)
  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      const isBadItem = Math.random() < 0.25; // 25% chance for bad item
      let emoji: string;
      let badType: 'poop' | 'ladybug' | 'spider' | undefined;
      
      if (isBadItem) {
        const badOptions = ['💩', '🐞', '🕷️'];
        const badIndex = Math.floor(Math.random() * badOptions.length);
        emoji = badOptions[badIndex];
        badType = badIndex === 0 ? 'poop' : badIndex === 1 ? 'ladybug' : 'spider';
      } else {
        emoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
      }
      
      // Different speeds for different items
      let speed = Math.random() * 1.5 + 2; // Base speed 2-3.5
      if (emoji === '🐞') speed *= 0.6; // Ladybug slower
      if (emoji === '💩' || emoji === '🕷️') speed *= 1.4; // Poop and spider faster

      const newItem: FallingItem = {
        id: itemIdCounter.current++,
        emoji,
        x: Math.random() * 85 + 5,
        y: -10,
        speed,
        caught: false,
        type: isBadItem ? 'bad' : 'fruit',
        badType,
        rotation: emoji === '🐞' ? 0 : undefined
      };
      
      setItems(prev => [...prev, newItem]);
    }, 900);

    return () => clearInterval(spawnInterval);
  }, [isPlaying]);

  // Move items down and rotate ladybug
  useEffect(() => {
    if (!isPlaying) return;

    const moveInterval = setInterval(() => {
      setItems(prev => {
        const updated = prev.map(item => {
          const newItem = {
            ...item,
            y: item.y + item.speed
          };
          
          // Rotate ladybug gently
          if (item.emoji === '🐞' && item.rotation !== undefined) {
            newItem.rotation = (item.rotation + 3) % 360;
          }
          
          return newItem;
        });

        // Check for catches/hits
        const gameArea = gameAreaRef.current;
        if (gameArea) {
          updated.forEach(item => {
            if (!item.caught && item.y >= 75 && item.y <= 85) {
              const distance = Math.abs(item.x - papiPosition);
              if (distance < 8) {
                item.caught = true;
                
                if (item.type === 'fruit') {
                  // Caught a fruit: +1 coin, +1 happiness
                  setScore(s => s + 1);
                  setHappiness(h => Math.min(100, h + 1));
                  setPapiEmotion('happy');
                  setTimeout(() => setPapiEmotion('normal'), 500);
                  
                  // Show coin popup
                  const coinPopupId = coinPopupIdCounter.current++;
                  setCoinPopups(prev => [...prev, { 
                    id: coinPopupId, 
                    x: item.x, 
                    y: 80,
                    value: 1
                  }]);
                  setTimeout(() => {
                    setCoinPopups(prev => prev.filter(p => p.id !== coinPopupId));
                  }, 1000);
                  
                  // Show happiness popup
                  const happinessPopupId = happinessPopupIdCounter.current++;
                  setHappinessPopups(prev => [...prev, {
                    id: happinessPopupId,
                    x: papiPosition,
                    y: 75,
                    emoji: '💛'
                  }]);
                  setTimeout(() => {
                    setHappinessPopups(prev => prev.filter(p => p.id !== happinessPopupId));
                  }, 1200);
                  
                } else {
                  // Hit a bad item
                  let coinPenalty = 0;
                  let itemName = '';
                  
                  if (item.badType === 'poop') {
                    coinPenalty = -1;
                    itemName = 'Poop';
                  } else if (item.badType === 'ladybug') {
                    coinPenalty = -3;
                    itemName = 'Ladybug';
                  } else if (item.badType === 'spider') {
                    coinPenalty = -7;
                    itemName = 'Spider';
                  }
                  
                  setScore(s => s + coinPenalty); // Adding negative value
                  setHappiness(h => Math.max(0, h - 1));
                  setPapiEmotion('sad');
                  setTimeout(() => setPapiEmotion('normal'), 800);
                  
                  // Show coin popup (negative)
                  const coinPopupId = coinPopupIdCounter.current++;
                  setCoinPopups(prev => [...prev, { 
                    id: coinPopupId, 
                    x: item.x, 
                    y: 80,
                    value: coinPenalty
                  }]);
                  setTimeout(() => {
                    setCoinPopups(prev => prev.filter(p => p.id !== coinPopupId));
                  }, 1000);
                  
                  // Show happiness popup (negative)
                  const happinessPopupId = happinessPopupIdCounter.current++;
                  setHappinessPopups(prev => [...prev, {
                    id: happinessPopupId,
                    x: papiPosition,
                    y: 75,
                    emoji: '💭'
                  }]);
                  setTimeout(() => {
                    setHappinessPopups(prev => prev.filter(p => p.id !== happinessPopupId));
                  }, 1200);
                  
                  toast.error(`Ouch! ${itemName} ${item.emoji}`, {
                    duration: 1500,
                    style: {
                      background: 'linear-gradient(135deg, #FFB7C5 0%, #FF9FB7 100%)',
                      border: 'none',
                      color: 'white',
                      fontFamily: 'Nunito',
                      fontWeight: 'bold',
                      borderRadius: '20px',
                      padding: '12px',
                    }
                  });
                }
              }
            }
          });
        }

        // Remove items that are off screen or caught
        return updated.filter(item => item.y < 100);
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isPlaying, papiPosition]);

  // Handle mouse/touch movement
  const handleMove = (clientX: number) => {
    if (!gameAreaRef.current || !isPlaying) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setPapiPosition(Math.max(5, Math.min(95, percentage)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // End game
  const endGame = () => {
    setIsPlaying(false);
    
    // Calculate final score with minimum +5 participation reward
    const finalScore = Math.max(5, score);
    
    // Calculate coins to award
    let actualCoinsAwarded = 0;
    
    if (canEarnCoins && finalScore > 0) {
      actualCoinsAwarded = addTodayCoins(finalScore);
      setCoinsEarned(actualCoinsAwarded);
      
      if (onCoinsEarned && actualCoinsAwarded > 0) {
        onCoinsEarned(actualCoinsAwarded);
      }
    }
    
    // Update high score
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('fruitGameHighScore', finalScore.toString());
    }
    
    // Set Papi emotion based on happiness
    if (happiness >= 60) {
      setPapiEmotion('happy');
    } else if (happiness <= 30) {
      setPapiEmotion('sad');
    } else {
      setPapiEmotion('normal');
    }
  };

  // Get happiness bar color based on happiness level
  const getHappinessColor = () => {
    if (happiness >= 70) return 'from-[#FFD66C] to-[#FFC700]';
    if (happiness >= 40) return 'from-[#C8B8FF] to-[#B8A8FF]';
    return 'from-[#FFB7C5] to-[#FF9FB7]';
  };

  return (
    <div 
      className="w-full h-screen overflow-hidden flex flex-col relative bg-cover bg-center"
      style={{ backgroundImage: `url(${gameBackground})` }}
    >

      {/* Header */}
      <div className="relative z-10 p-4 pb-2">
        {/* Back Button */}
        <KawaiiButton 
          variant="mint" 
          size="sm" 
          icon={<BackIcon size={18} />}
          onClick={onBack}
          className="w-12 h-12 !p-0"
        />
      </div>

      {/* Game Title */}
      <div className="text-center px-6 pb-2">
        <h1 className="font-['Nunito'] text-2xl text-[#2C2C2E]">Catch the Fruits 🍎</h1>
      </div>

      {/* Stats Bar */}
      {isPlaying && (
        <div className="px-6 pb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            {/* Timer/Progress */}
            <div className="flex-1 kawaii-card px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">⏱</span>
                <div className="flex-1 h-2 bg-white/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FFD66C] to-[#FFC700] transition-all duration-1000"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                  />
                </div>
                <span className="font-['Nunito'] text-[#2C2C2E] text-sm">
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="kawaii-card px-3 py-2">
              <div className="flex items-center gap-1">
                <span className="text-sm">💰</span>
                <span className="font-['Nunito'] text-[#2C2C2E]">
                  {score}
                </span>
              </div>
            </div>
          </div>

          {/* Happiness Bar */}
          <div className="kawaii-card px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {happiness >= 70 ? '😊' : happiness >= 40 ? '😐' : '😔'}
              </span>
              <div className="flex-1 h-2 bg-white/40 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getHappinessColor()} transition-all duration-300`}
                  style={{ width: `${happiness}%` }}
                />
              </div>
              <span className="font-['Nunito'] text-[#2C2C2E] text-xs">
                {happiness}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="flex-1 relative px-6 pb-6 flex flex-col">
        <div 
          ref={gameAreaRef}
          className="flex-1 relative rounded-[32px] border-4 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden bg-cover bg-center"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{ 
            touchAction: 'none',
            backgroundImage: `url(${gameBackground})`
          }}
        >
          {/* Falling Items */}
          {items.map(item => (
            <div
              key={item.id}
              className={`absolute transition-opacity duration-200 ${item.caught ? 'opacity-0 scale-150' : 'opacity-100'}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) ${item.rotation !== undefined ? `rotate(${item.rotation}deg)` : ''}`,
                fontSize: '32px',
                pointerEvents: 'none',
                filter: item.emoji === '🐞' ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'
              }}
            >
              {item.emoji}
            </div>
          ))}

          {/* Coin Popups */}
          {coinPopups.map(popup => (
            <div
              key={popup.id}
              className="absolute pointer-events-none"
              style={{
                left: `${popup.x}%`,
                top: `${popup.y}%`,
                transform: 'translate(-50%, -50%)',
                animation: 'coinPop 1s ease-out',
              }}
            >
              <span className={`font-['Nunito'] drop-shadow-lg text-xl ${popup.value > 0 ? 'text-[#FFD66C]' : 'text-[#FF6B8A]'}`}>
                {popup.value > 0 ? '+' : ''}{popup.value}
              </span>
            </div>
          ))}

          {/* Happiness Popups */}
          {happinessPopups.map(popup => (
            <div
              key={popup.id}
              className="absolute pointer-events-none"
              style={{
                left: `${popup.x}%`,
                top: `${popup.y}%`,
                transform: 'translate(-50%, -50%)',
                animation: 'happinessPop 1.2s ease-out',
              }}
            >
              <span className="text-2xl drop-shadow-lg">
                {popup.emoji}
              </span>
            </div>
          ))}

          {/* Papi Character */}
          {isPlaying && (
            <div
              className="absolute bottom-8 transition-all duration-100 ease-out"
              style={{
                left: `${papiPosition}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div 
                className={`${papiEmotion === 'happy' ? 'animate-bounce' : papiEmotion === 'sad' ? 'animate-shake' : ''}`}
                style={{ 
                  animationDuration: papiEmotion === 'happy' ? '0.5s' : '0.3s',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
                }}
              >
                <img 
                  src={papiImage} 
                  alt="Papi" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          )}

          {/* Start/Game Over Screen */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md">
              <div className="text-center px-8 max-w-sm">
                {score === 0 && happiness === 50 ? (
                  <>
                    {/* Start Screen */}
                    <div className="text-6xl mb-4 animate-bounce">🎮</div>
                    <h2 className="font-['Nunito'] text-2xl text-[#2C2C2E] mb-2">
                      Catch the Fruits!
                    </h2>
                    
                    <div className="kawaii-card inline-block px-6 py-4 mb-4 text-left">
                      <p className="font-['Nunito'] text-[#2C2C2E] text-sm mb-2">
                        🍎 Fruit = <span className="text-[#FFD66C]">+1 coin</span> & <span className="text-[#FFD66C]">+1 happiness</span>
                      </p>
                      <p className="font-['Nunito'] text-[#2C2C2E] text-sm mb-2">
                        💩 Poop = <span className="text-[#FF6B8A]">−1 coin</span> & <span className="text-[#FF6B8A]">−1 happiness</span>
                      </p>
                      <p className="font-['Nunito'] text-[#2C2C2E] text-sm mb-2">
                        🐞 Ladybug = <span className="text-[#FF6B8A]">−3 coins</span> & <span className="text-[#FF6B8A]">−1 happiness</span>
                      </p>
                      <p className="font-['Nunito'] text-[#2C2C2E] text-sm">
                        🕷️ Spider = <span className="text-[#FF6B8A]">−7 coins</span> & <span className="text-[#FF6B8A]">−1 happiness</span>
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="font-['Nunito'] text-[#8E8E93] text-xs">
                          🎮 Minimum reward: <span className="text-[#FFD66C]">+5 coins</span>
                        </p>
                      </div>
                    </div>

                    {!canEarnCoins && (
                      <div className="kawaii-card inline-block px-6 py-3 mb-4 bg-gradient-to-r from-[#FFD66C]/20 to-[#FFC700]/20">
                        <p className="font-['Nunito'] text-[#2C2C2E] text-sm">
                          Daily limit reached 💛
                        </p>
                        <p className="font-['Nunito'] text-[#8E8E93] text-xs">
                          Come back tomorrow!
                        </p>
                      </div>
                    )}

                    <div className="flex justify-center">
                      <KawaiiButton
                        variant="primary"
                        size="lg"
                        onClick={startGame}
                        className="!px-12 shadow-[0_8px_24px_rgba(255,183,197,0.4)] hover:shadow-[0_12px_32px_rgba(255,183,197,0.5)]"
                      >
                        Start Game
                      </KawaiiButton>
                    </div>

                    {/* Bottom note */}
                    <p className="font-['Nunito'] text-[#8E8E93] text-xs mt-6 opacity-70">
                      Earn up to {DAILY_COIN_LIMIT} coins per day by playing! 💛
                    </p>
                  </>
                ) : (
                  <>
                    {/* Game Over Screen */}
                    <div className="mb-4">
                      {papiEmotion === 'happy' ? (
                        <span className="text-6xl">😊</span>
                      ) : papiEmotion === 'sad' ? (
                        <span className="text-6xl">😢</span>
                      ) : (
                        <div className="animate-bounce">
                          <img 
                            src={papiImage} 
                            alt="Papi" 
                            className="w-24 h-24 object-contain mx-auto"
                          />
                        </div>
                      )}
                    </div>
                    
                    <h2 className="font-['Nunito'] text-3xl text-[#2C2C2E] mb-4">
                      Good Job!
                    </h2>

                    <div className="kawaii-card inline-block px-6 py-4 mb-4 min-w-[200px]">
                      <p className="font-['Nunito'] text-[#2C2C2E] mb-2">
                        You earned <span className="text-xl text-[#FFD66C]">{canEarnCoins ? coinsEarned : 0}</span> coins today 🍎
                      </p>
                      
                      {canEarnCoins && coinsEarned >= 50 && (
                        <p className="font-['Nunito'] text-[#FFD66C] text-sm">
                          Wow! You fed Papi so well today 💛
                        </p>
                      )}
                      
                      {!canEarnCoins && (
                        <p className="font-['Nunito'] text-[#8E8E93] text-sm">
                          Daily limit reached! Come back tomorrow 💛
                        </p>
                      )}
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="font-['Nunito'] text-[#8E8E93] text-sm mb-1">
                          Raw Score: <span className="text-[#2C2C2E]">{score}</span>
                        </p>
                        <p className="font-['Nunito'] text-[#8E8E93] text-sm mb-1">
                          Final Score: <span className="text-[#2C2C2E]">{Math.max(5, score)}</span>
                          {score < 5 && <span className="text-[#FFD66C] text-xs ml-1">(+5 min)</span>}
                        </p>
                        <p className="font-['Nunito'] text-[#8E8E93] text-sm">
                          Happiness: <span className={happiness >= 60 ? 'text-[#FFD66C]' : happiness >= 40 ? 'text-[#C8B8FF]' : 'text-[#FFB7C5]'}>{happiness}%</span>
                        </p>
                        {Math.max(5, score) > highScore && (
                          <p className="font-['Nunito'] text-[#FFD66C] text-xs mt-2">
                            🎉 New High Score!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <KawaiiButton
                        variant="primary"
                        size="lg"
                        onClick={startGame}
                        className="!px-8"
                      >
                        Play Again
                      </KawaiiButton>
                      
                      <KawaiiButton
                        variant="mint"
                        size="lg"
                        onClick={onBack}
                        className="!px-8"
                      >
                        Back Home
                      </KawaiiButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Instructions hint during play */}
          {isPlaying && timeLeft > 26 && (
            <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
              <p className="font-['Nunito'] text-[#8E8E93] text-sm animate-pulse">
                Drag or move to control Papi
              </p>
            </div>
          )}
        </div>

        {/* Daily Progress Indicator */}
        {!isPlaying && canEarnCoins && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-2 kawaii-card px-4 py-2">
              <span className="font-['Nunito'] text-[#8E8E93] text-xs">
                Today: {todayCoinsEarned}/{DAILY_COIN_LIMIT} 💰
              </span>
              <div className="w-20 h-1.5 bg-white/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFD66C] to-[#FFC700]"
                  style={{ width: `${(todayCoinsEarned / DAILY_COIN_LIMIT) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(-5deg); }
          75% { transform: translateX(-50%) rotate(5deg); }
        }
        
        @keyframes coinPop {
          0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) translateY(0) scale(1); 
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px) scale(1.3);
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) translateY(-40px) scale(0.8); 
          }
        }
        
        @keyframes happinessPop {
          0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) translateY(0) scale(0.5); 
          }
          30% {
            transform: translate(-50%, -50%) translateY(-10px) scale(1.2);
          }
          60% {
            transform: translate(-50%, -50%) translateY(-20px) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) translateY(-35px) scale(0.8); 
          }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
