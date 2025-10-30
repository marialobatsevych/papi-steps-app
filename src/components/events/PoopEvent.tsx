import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface PoopEventProps {
  onClean: () => void;
}

export function PoopEvent({ onClean }: PoopEventProps) {
  const [showStink, setShowStink] = useState(false);
  
  useEffect(() => {
    // Show stink cloud after 5 seconds
    const stinkTimer = setTimeout(() => {
      setShowStink(true);
    }, 5000);
    
    return () => clearTimeout(stinkTimer);
  }, []);

  const handleTap = () => {
    onClean();
  };

  return (
    <motion.div
      initial={{ scale: 0, y: -20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-40 cursor-pointer"
      onClick={handleTap}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        {/* Poop emoji */}
        <div className="text-5xl filter drop-shadow-lg">
          💩
        </div>
        
        {/* Stink cloud (appears after delay) */}
        {showStink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="text-3xl opacity-70">
              💨
            </div>
          </motion.div>
        )}
        
        {/* Clean prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg">
            <span className="font-['Nunito'] text-sm text-[#2C2C2E]">
              🧹 Tap to clean +20 🪙
            </span>
          </div>
        </motion.div>
        
        {/* Sparkle effect around poop */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-xl opacity-50">
            ✨
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
