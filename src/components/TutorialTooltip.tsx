import React from 'react';
import { X } from 'lucide-react';

interface TutorialTooltipProps {
  isVisible: boolean;
  onClose: () => void;
}

export function TutorialTooltip({ isVisible, onClose }: TutorialTooltipProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Tooltip */}
      <div className="relative kawaii-card p-6 max-w-sm animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] active:scale-95 transition-all"
        >
          <X size={16} className="text-[#8E8E93]" />
        </button>
        
        <div className="text-center">
          <div className="text-5xl mb-4">👋</div>
          <h3 className="font-['Nunito'] font-bold text-xl text-[#2C2C2E] mb-3">
            Welcome to Papi Steps!
          </h3>
          
          <div className="space-y-3 text-left mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏠</span>
              <div>
                <p className="font-['Nunito'] font-bold text-sm text-[#2C2C2E]">Cozy Room</p>
                <p className="font-['Nunito'] text-xs text-[#8E8E93]">
                  This is your free background! Buy new ones in the shop
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🍖</span>
              <div>
                <p className="font-['Nunito'] font-bold text-sm text-[#2C2C2E]">Feed Papi</p>
                <p className="font-['Nunito'] text-xs text-[#8E8E93]">
                  Tap the food icon at the bottom of the screen
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎾</span>
              <div>
                <p className="font-['Nunito'] font-bold text-sm text-[#2C2C2E]">Play with Papi</p>
                <p className="font-['Nunito'] text-xs text-[#8E8E93]">
                  Tap the toy icon at the bottom of the screen
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-[#FFB3C6] to-[#FF9DB3] rounded-full text-white text-xs font-bold shadow-md">
                3
              </div>
              <div>
                <p className="font-['Nunito'] font-bold text-sm text-[#2C2C2E]">Inventory Badges</p>
                <p className="font-['Nunito'] text-xs text-[#8E8E93]">
                  Show the number of available items
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="kawaii-button bg-gradient-to-r from-[#C3F0D9] to-[#FFB3C6] text-[#2C2C2E] w-full shadow-lg"
          >
            Got it! 🎉
          </button>
        </div>
      </div>
    </div>
  );
}
