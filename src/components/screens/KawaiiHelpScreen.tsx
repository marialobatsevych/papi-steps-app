import React, { useState } from 'react';
import { ArrowLeft as BackIcon, HelpCircle as HelpIcon, Mail as MailIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { KawaiiButton } from '../KawaiiButton';
import { toast } from 'sonner@2.0.3';

interface FAQItem {
  question: string;
  answer: string;
  emoji: string;
}

interface KawaiiHelpScreenProps {
  onBack: () => void;
}

const faqItems: FAQItem[] = [
  {
    question: 'How to earn coins?',
    answer: 'You can earn coins by reaching your daily step goal (300 coins), collecting daily rewards, and leveling up! Keep walking with Papi to earn more rewards! 🚶‍♀️',
    emoji: '💰'
  },
  {
    question: 'How to evolve Papi?',
    answer: 'Papi evolves as you accumulate total steps! At 30,000 steps, Papi reaches Adult stage and unlocks Evolved form. When you reach your daily goal, Papi temporarily transforms with a special animation! ✨',
    emoji: '🌟'
  },
  {
    question: 'How to connect Apple Health?',
    answer: 'Go to Settings → Permissions and enable Apple Health. This allows Papi Steps to track your daily walking activity automatically. Make sure to allow the necessary permissions in your iPhone settings! 📱',
    emoji: '❤️'
  },
  {
    question: 'How do stats work?',
    answer: 'Papi has three stats: Hunger 🍖, Fun 🎾, and Energy 😴. These decrease over time based on real minutes. Keep them above 30 to maintain Papi\'s happiness! Feed, play, and let Papi sleep to restore them.',
    emoji: '📊'
  },
  {
    question: 'What are wallpapers?',
    answer: 'Wallpapers change Papi\'s room background! You can buy them in the Shop using coins. Choose from Garden, Bathroom, Autumn Park, City Street, Beach Terrace, and Cafe scenes! 🏠',
    emoji: '🎨'
  },
  {
    question: 'How do friends work?',
    answer: 'Add friends to see their progress, send messages, and get motivated together! You can find nearby friends using the Nearest People feature (requires location permission). 👋',
    emoji: '👥'
  }
];

export function KawaiiHelpScreen({ onBack }: KawaiiHelpScreenProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleContactSupport = () => {
    const email = 'marialobatsevych@gmail.com';
    const subject = 'Papi Steps Support Request';
    const body = 'Hello! I need help with...\n\n';
    
    // Try to open email client
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast.success('Opening email...', {
      description: 'We\'ll get back to you soon! 💌',
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #FFD6E8 0%, #F9A8D4 100%)',
        border: 'none',
        color: '#2C2C2E',
        fontFamily: 'Nunito',
        borderRadius: '20px',
        padding: '16px'
      }
    });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFF6E8] via-[#D7C4F3] to-[#C3F0D9] overflow-hidden flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#FFB3C6] opacity-60">
        <HelpIcon size={16} />
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#FFD166] opacity-70 animate-pulse">
        ❓
      </div>
      <div className="absolute bottom-32 right-20 w-3 h-3 text-[#C8B8FF] opacity-50">
        💡
      </div>

      {/* Header */}
      <div className="flex-shrink-0 pt-12 pb-6 px-6 bg-white/40 backdrop-blur-md border-b border-white/60">
        <div className="flex items-center justify-between mb-4">
          <KawaiiButton
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <h1 className="flex-1 text-center font-['Nunito'] text-2xl text-[#2C2C2E]">
            Help & Support
          </h1>
          <div className="w-12" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* FAQ Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">📚</span>
            <h2 className="font-['Nunito'] text-xl text-[#2C2C2E]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="kawaii-card overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/30 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="font-['Nunito'] text-[#2C2C2E]">
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedIndex === index ? (
                      <ChevronUp size={20} className="text-[#8E8E93]" />
                    ) : (
                      <ChevronDown size={20} className="text-[#8E8E93]" />
                    )}
                  </div>
                </button>

                {expandedIndex === index && (
                  <div className="px-4 pb-4 pt-2 border-t border-white/40">
                    <p className="font-['Nunito'] text-sm text-[#8E8E93] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="kawaii-card p-6 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] text-white mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center">
              <MailIcon size={24} />
            </div>
            <div>
              <h2 className="font-['Nunito'] text-xl">Need More Help?</h2>
              <p className="font-['Nunito'] text-sm opacity-90">
                We're here to help you!
              </p>
            </div>
          </div>

          <p className="font-['Nunito'] text-sm mb-4 opacity-90">
            Can't find what you're looking for? Contact our support team and we'll get back to you as soon as possible!
          </p>

          <KawaiiButton
            variant="secondary"
            icon={<MailIcon size={18} />}
            onClick={handleContactSupport}
            className="w-full !bg-white !text-[#FFB3C6] hover:!bg-white/90"
          >
            Contact Support
          </KawaiiButton>

          <p className="font-['Nunito'] text-xs text-center mt-3 opacity-75">
            marialobatsevych@gmail.com
          </p>
        </div>

        {/* Tips Section */}
        <div className="kawaii-card p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="font-['Nunito'] text-lg text-[#2C2C2E]">
              Quick Tips
            </h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">🎯</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                Set a realistic daily goal in Settings to stay motivated!
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">⏰</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                Check on Papi regularly to keep their stats high and earn bonuses!
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">👥</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                Add friends to make walking more fun and competitive!
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">🎁</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                Don't forget to collect your daily reward every day!
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
