import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { getNewRandomPhrase, PapiPhrase, getMoodCategory, calculateAverageState } from '../utils/papiPhrases';

interface PapiSpeechBubbleProps {
  isVisible: boolean;
  onClose: () => void;
  hunger: number;
  fun: number;
  energy: number;
}

export function PapiSpeechBubble({ isVisible, onClose, hunger, fun, energy }: PapiSpeechBubbleProps) {
  const [currentPhrase, setCurrentPhrase] = useState<PapiPhrase>({ title: "I'm waiting for your care 💛", subtitle: "Tap an icon to feed or play!" });
  const previousMoodRef = useRef<string>('');
  const wasVisibleRef = useRef(false);

  // Генерируем новую фразу только когда бабл открывается или меняется настроение
  useEffect(() => {
    if (isVisible) {
      const averageState = calculateAverageState(hunger, fun, energy);
      const currentMood = getMoodCategory(averageState);
      
      // Обновляем фразу если:
      // 1. Бабл только что открылся
      // 2. Или изменилась категория настроения
      if (!wasVisibleRef.current || currentMood !== previousMoodRef.current) {
        const newPhrase = getNewRandomPhrase(hunger, fun, energy, currentPhrase.title);
        setCurrentPhrase(newPhrase);
        previousMoodRef.current = currentMood;
      }
      
      wasVisibleRef.current = true;
    } else {
      wasVisibleRef.current = false;
    }
  }, [isVisible, hunger, fun, energy]);

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
            <p className="font-['Nunito'] font-bold text-[15px] text-[#333] leading-snug mb-[6px] p-[0px] mt-[10px] mr-[0px] ml-[0px]">
              {currentPhrase.title}
            </p>
            {currentPhrase.subtitle && (
              <p className="font-['Nunito'] text-[11px] text-[#666] leading-relaxed">
                {currentPhrase.subtitle}
              </p>
            )}
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
