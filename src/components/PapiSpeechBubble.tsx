import React from 'react';
import { X } from 'lucide-react';

interface PapiSpeechBubbleProps {
  isVisible: boolean;
  onClose: () => void;
}

export function PapiSpeechBubble({ isVisible, onClose }: PapiSpeechBubbleProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-[22%] left-1/2 -translate-x-1/2 z-20 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="relative">
        {/* Cloud-style Thought Bubble */}
        <div 
          className="relative px-6 py-4 min-w-[280px] max-w-[320px]"
          style={{
            background: 'linear-gradient(135deg, #FFF8FC 0%, #F7FAFF 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: '0 12px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
            border: '2px solid rgba(240, 231, 247, 0.6)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#F0E7F7] hover:bg-[#FFF8FC] active:scale-95 transition-all shadow-md"
          >
            <X size={13} className="text-[#8E8E93]" />
          </button>
          
          {/* Content */}
          <div className="text-center">
            <p className="font-['Nunito'] font-bold text-[15px] text-[#333] leading-snug mb-1.5 whitespace-nowrap">
              I'm Waiting for your Care 💛
            </p>
            <p className="font-['Nunito'] text-[11px] text-[#666] leading-relaxed">
              Tap an icon to feed or play!
            </p>
          </div>
        </div>
        
        {/* Small cloud puffs for extra cuteness */}
        <div 
          className="absolute -bottom-2 -left-3 w-5 h-5 bg-gradient-to-br from-[#FFF8FC] to-[#F7FAFF] rounded-full"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            border: '1px solid rgba(240, 231, 247, 0.4)'
          }}
        />
        <div 
          className="absolute -bottom-4 -left-1 w-3 h-3 bg-gradient-to-br from-[#FFF8FC] to-[#F7FAFF] rounded-full"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: '1px solid rgba(240, 231, 247, 0.4)'
          }}
        />
      </div>
    </div>
  );
}
