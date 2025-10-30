import React, { useState } from 'react';
import { X, Heart, Zap, Smile } from 'lucide-react';
import { PapiCharacter } from './PapiCharacter';

interface WelcomePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export function WelcomePopup({ isVisible, onClose }: WelcomePopupProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isVisible) return null;

  const steps = [
    {
      emoji: '👋',
      title: 'Welcome to Papi Steps!',
      description: 'Meet Papi, your adorable wellness companion who grows with every step you take!',
      color: 'from-[#FFB7C5] to-[#FF9FB7]',
    },
    {
      emoji: '🚶',
      title: 'Walk to Help Papi Grow',
      description: 'Your daily steps help Papi evolve! The more you walk, the faster Papi grows from a baby to an adult.',
      color: 'from-[#C8B8FF] to-[#B8A8FF]',
    },
    {
      emoji: '🐾',
      title: 'Earn Paw Coins',
      description: 'Complete daily goals to earn paw coins! Use them to buy food, toys, and beautiful room backgrounds.',
      color: 'from-[#FFD66C] to-[#FFC94C]',
    },
    {
      emoji: '❤️',
      title: 'Keep Papi Happy',
      description: 'Feed Papi, play together, and make sure they get enough rest. Watch their hunger, fun, and energy levels!',
      color: 'from-[#B8E3FF] to-[#98D3FF]',
      icons: [
        { icon: Heart, label: 'Hunger', color: 'text-[#FFB7C5]' },
        { icon: Smile, label: 'Fun', color: 'text-[#C8B8FF]' },
        { icon: Zap, label: 'Energy', color: 'text-[#FFD66C]' },
      ],
    },
    {
      emoji: '🌟',
      title: 'Daily Goals & Evolution',
      description: 'After 30,000 steps, Papi reaches adulthood! Then set daily goals (3,000-30,000 steps) and watch Papi temporarily evolve when you hit them!',
      color: 'from-[#FFB7C5] via-[#C8B8FF] to-[#B8E3FF]',
    },
    {
      emoji: '🎉',
      title: 'Ready to Start!',
      description: 'Connect your Apple Health to track steps automatically. Your wellness journey with Papi begins now!',
      color: 'from-[#C3F0D9] to-[#FFB3C6]',
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-60 animate-in fade-in duration-300" />

      {/* Main Popup */}
      <div className="relative w-full max-w-md animate-in zoom-in duration-300">
        <div className="bg-gradient-to-br from-white via-white to-[#FFF8FB] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white active:scale-95 transition-all shadow-lg"
          >
            <X size={18} className="text-[#8E8E93]" />
          </button>

          {/* Content Container */}
          <div className="p-8 pt-12">
            {/* Character or Emoji */}
            <div className="flex justify-center mb-6">
              {currentStep === 0 ? (
                <div className="w-24 h-24 flex items-center justify-center animate-bounce-slow">
                  <div className="scale-[0.83]">
                    <PapiCharacter state="happy" />
                  </div>
                </div>
              ) : (
                <div className={`w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br ${currentStepData.color} shadow-lg text-5xl`}>
                  {currentStepData.emoji}
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="font-['Nunito'] font-bold text-2xl text-[#2C2C2E] mb-4 text-center px-2">
              {currentStepData.title}
            </h2>

            {/* Description */}
            <p className="font-['Nunito'] text-[15px] text-[#666] leading-relaxed mb-6 text-center px-2">
              {currentStepData.description}
            </p>

            {/* Stats Icons (only on step 3) */}
            {currentStepData.icons && (
              <div className="flex justify-center gap-6 mb-6">
                {currentStepData.icons.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-white rounded-[16px] shadow-md flex items-center justify-center">
                      <item.icon size={24} className={item.color} />
                    </div>
                    <span className="font-['Nunito'] text-xs text-[#8E8E93]">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-gradient-to-r from-[#FFB7C5] to-[#FF9FB7]'
                      : index < currentStep
                      ? 'w-2 bg-[#FFB7C5]'
                      : 'w-2 bg-[#E0E0E0]'
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 h-[52px] px-6 bg-white border-2 border-[#F0F0F0] text-[#666] font-['Nunito'] font-semibold rounded-full hover:bg-[#F8F8F8] active:scale-[0.98] transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className={`h-[52px] px-6 font-['Nunito'] font-semibold text-white rounded-full shadow-lg hover:shadow-xl active:scale-[0.98] transition-all ${
                  currentStep === 0 ? 'w-full' : 'flex-1'
                } bg-gradient-to-r ${currentStepData.color}`}
              >
                {currentStep === steps.length - 1 ? "Let's Go! 🎉" : 'Next'}
              </button>
            </div>

            {/* Skip button */}
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="w-full mt-3 h-12 font-['Nunito'] text-[#999] hover:text-[#666] transition-colors text-center"
              >
                Skip tutorial
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
