import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SpiderEventProps {
  onTap: (success: boolean) => void;
  duration: number; // seconds until spider reaches pet
}

export function SpiderEvent({ onTap, duration }: SpiderEventProps) {
  const [spiderY, setSpiderY] = useState(0);
  const [isDescending, setIsDescending] = useState(true);
  
  useEffect(() => {
    // Start descending animation
    const descendTimer = setTimeout(() => {
      setIsDescending(false);
      // If player didn't tap in time, trigger failure
      onTap(false);
    }, duration * 1000);
    
    return () => clearTimeout(descendTimer);
  }, [duration, onTap]);

  const handleSpiderTap = () => {
    if (isDescending) {
      onTap(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Spider descending from top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        {/* Thread/String */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isDescending ? '300px' : '300px' }}
          transition={{ duration: duration, ease: 'linear' }}
          className="w-0.5 bg-gray-400/50 mx-auto"
        />
        
        {/* Spider */}
        <motion.div
          initial={{ y: -40 }}
          animate={{ y: isDescending ? 260 : 260 }}
          transition={{ duration: duration, ease: 'linear' }}
          className="relative cursor-pointer"
          onClick={handleSpiderTap}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <div className="text-4xl filter drop-shadow-lg">
              🕷️
            </div>
          </div>
          
          {/* Warning/Hint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 30 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="absolute top-1/2 left-full transform -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-red-400/90 px-3 py-2 rounded-2xl shadow-lg">
              <div className="font-['Nunito'] text-sm text-white">
                ⚡ Tap now!
              </div>
              <div className="font-['Nunito'] text-xs text-white/80 mt-0.5">
                +75 🪙 or penalty
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Countdown indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration, ease: 'linear' }}
            className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
