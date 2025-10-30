import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut as LogoutIcon, X as CloseIcon } from 'lucide-react';
import { KawaiiButton } from './KawaiiButton';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmModal({ isOpen, onConfirm, onCancel }: LogoutConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[85%] max-w-[350px]"
          >
            <div className="kawaii-card bg-white overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] p-5 text-white relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center">
                    <LogoutIcon size={24} />
                  </div>
                  <h2 className="font-['Nunito'] text-xl flex-1">
                    Log Out?
                  </h2>
                  <button
                    onClick={onCancel}
                    className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/40 flex items-center justify-center transition-colors"
                  >
                    <CloseIcon size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🐾</div>
                  <p className="font-['Nunito'] text-[#2C2C2E] mb-2">
                    Are you sure you want to log out?
                  </p>
                  <p className="font-['Nunito'] text-sm text-[#8E8E93]">
                    Papi will miss you! Don't forget to come back soon! 💙
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <KawaiiButton
                    variant="secondary"
                    onClick={onCancel}
                    className="flex-1 h-[52px] px-6 rounded-full"
                  >
                    Cancel
                  </KawaiiButton>
                  <KawaiiButton
                    variant="primary"
                    onClick={onConfirm}
                    className="flex-1 h-[52px] px-6 rounded-full !bg-gradient-to-r !from-[#FFB3C6] !to-[#FF9FB7]"
                  >
                    Log Out
                  </KawaiiButton>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
