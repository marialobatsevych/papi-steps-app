import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface FlyEventProps {
  onCatch: () => void;
  onExpire: () => void;
  duration: number; // seconds
}

export function FlyEvent({ onCatch, onExpire, duration }: FlyEventProps) {
  const [position, setPosition] = useState({ x: 50, y: 30 });
  
  useEffect(() => {
    // Expire after duration
    const expireTimer = setTimeout(() => {
      onExpire();
    }, duration * 1000);
    
    // Move butterfly in random patterns
    const moveInterval = setInterval(() => {
      setPosition({
        x: 20 + Math.random() * 60, // 20-80% of screen width
        y: 20 + Math.random() * 40, // 20-60% of screen height (top area)
      });
    }, 1500);
    
    return () => {
      clearTimeout(expireTimer);
      clearInterval(moveInterval);
    };
  }, [duration, onExpire]);

  const handleTap = () => {
    onCatch();
  };

  return (
    <motion.div
      className="fixed z-50 cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        x: [0, 8, -8, 0],
        y: [0, -5, 5, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onClick={handleTap}
      whileTap={{ scale: 1.2 }}
    >
      {/* Butterfly with hitbox */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Hitbox (invisible but larger for easier tapping) */}
        <div className="absolute inset-0 rounded-full" />
        
        {/* Butterfly visual */}
        <div className="text-4xl animate-pulse filter drop-shadow-lg">
          🦋
        </div>
        
        {/* Hint bubble (appears briefly) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <div className="bg-white/90 px-3 py-1 rounded-full shadow-lg">
            <span className="font-['Nunito'] text-xs text-[#2C2C2E]">
              Tap! +50
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
