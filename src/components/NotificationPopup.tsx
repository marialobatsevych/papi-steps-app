import React, { useState, useEffect } from 'react';
import { X as CloseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notification } from '../utils/notificationSystem';

interface NotificationPopupProps {
  notification: Notification | null;
  onClose: () => void;
  onAction?: () => void;
  autoHideDuration?: number; // in milliseconds, default 5000
}

export function NotificationPopup({ 
  notification, 
  onClose, 
  onAction,
  autoHideDuration = 5000 
}: NotificationPopupProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!notification) {
      setProgress(100);
      return;
    }

    // Auto-hide timer
    const timer = setTimeout(() => {
      onClose();
    }, autoHideDuration);

    // Progress animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / autoHideDuration) * 100);
      setProgress(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [notification, autoHideDuration, onClose]);

  const getNotificationColor = (type: string): string => {
    switch (type) {
      case 'hunger_alert':
        return 'from-[#FFB3C6] to-[#FF9FB7]';
      case 'energy_alert':
        return 'from-[#FFD166] to-[#FFB347]';
      case 'fun_alert':
        return 'from-[#C8B8FF] to-[#B8A8FF]';
      case 'daily_goal':
      case 'level_up':
        return 'from-[#B8E3FF] to-[#A8D3FF]';
      case 'friend_request':
      case 'friend_activity':
        return 'from-[#FFB3C6] to-[#FF9FB7]';
      case 'message':
        return 'from-[#C8B8FF] to-[#B8A8FF]';
      case 'evolution':
        return 'from-[#FFD166] to-[#FFB347]';
      case 'shop_update':
        return 'from-[#B8E3FF] to-[#A8D3FF]';
      case 'daily_reward':
        return 'from-[#FFD166] to-[#FFB347]';
      default:
        return 'from-[#F8F9FA] to-[#F1F3F4]';
    }
  };

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-[400px]"
        >
          <div className="kawaii-card bg-white/95 backdrop-blur-md border-2 border-white shadow-2xl overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-gray-200">
              <motion.div
                className={`h-full bg-gradient-to-r ${getNotificationColor(notification.type)}`}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${getNotificationColor(notification.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{notification.icon}</span>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Nunito'] text-[#2C2C2E] mb-1">
                    {notification.title}
                  </h3>
                  <p className="font-['Nunito'] text-sm text-[#8E8E93] line-clamp-2">
                    {notification.message}
                  </p>

                  {/* Action button */}
                  {notification.actionText && onAction && (
                    <button
                      onClick={handleAction}
                      className={`mt-3 px-6 h-[44px] rounded-full bg-gradient-to-r ${getNotificationColor(notification.type)} text-white font-['Nunito'] text-sm hover:scale-105 active:scale-95 transition-transform`}
                    >
                      {notification.actionText}
                    </button>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors"
                >
                  <CloseIcon size={16} className="text-[#8E8E93]" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
