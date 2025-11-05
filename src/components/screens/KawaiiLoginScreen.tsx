import React, { useState } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { HeartIcon, StarIcon, PawIcon } from '../KawaiiIcons';
import { PapiCharacter } from '../PapiCharacter';
import { LegalModal } from '../LegalModal';
import { toast } from 'sonner@2.0.3';
import loginPapiImage from 'figma:asset/64e144ca4415b9300610c83d81e66e98ba9724b0.png';

interface KawaiiLoginScreenProps {
  onGoogleLogin: () => void;
  onCreateAccount: () => void;
}

// Google Fit Permission Modal Component
interface GoogleFitPermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  onCancel: () => void;
}

function GoogleFitPermissionModal({ isOpen, onAllow, onCancel }: GoogleFitPermissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in duration-300">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center shadow-lg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-['Nunito'] font-bold text-[22px] text-[#333] text-center mb-4">
          Connect to Google Fit
        </h3>

        {/* Permission Message */}
        <p className="font-['Nunito'] text-[16px] text-[#666] text-center leading-relaxed mb-4">
          Papi Steps would like to read your step count from Google Fit to track your daily progress.
        </p>

        {/* Privacy Note */}
        <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-[20px] p-4 mb-6">
          <p className="font-['Nunito'] text-[13px] text-[#0369a1] text-center leading-relaxed">
            🔒 Your data is used only for tracking your step goals and never shared with others.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          {/* Allow Access Button */}
          <button
            onClick={onAllow}
            className="w-full h-[52px] bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-['Nunito'] font-semibold text-[16px] rounded-full shadow-[0_6px_24px_rgba(66,133,244,0.35)] hover:shadow-[0_8px_32px_rgba(66,133,244,0.45)] active:scale-[0.98] transition-all duration-200 text-center"
          >
            Allow access
          </button>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="w-full h-[52px] bg-white border-2 border-[#E5E7EB] text-[#666] font-['Nunito'] font-semibold text-[16px] rounded-full hover:bg-[#F9FAFB] active:scale-[0.98] transition-all duration-200 text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function KawaiiLoginScreen({ onGoogleLogin, onCreateAccount }: KawaiiLoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const handleGoogleButtonClick = () => {
    setShowPermissionModal(true);
  };

  const handleAllowAccess = async () => {
    setShowPermissionModal(false);
    setIsLoading(true);
    
    // Simulate Google authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Connected to Google!', {
      description: 'Your step data is now synced 🎉',
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
        border: 'none',
        color: '#fff',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        borderRadius: '20px',
        padding: '16px',
        boxShadow: '0 8px 32px rgba(66, 133, 244, 0.3)'
      }
    });
    
    onGoogleLogin();
    setIsLoading(false);
  };

  const handleCancelPermission = () => {
    setShowPermissionModal(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFD6E8] via-[#E8D6FF] to-[#D6E8FF] overflow-hidden flex flex-col relative">
      {/* Glowing Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-[#FFB7C5] rounded-full opacity-60 blur-sm animate-pulse" />
        <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-[#C8B8FF] rounded-full opacity-50 blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[40%] left-[10%] w-2 h-2 bg-[#B8E3FF] rounded-full opacity-70 blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] right-[15%] w-2.5 h-2.5 bg-[#FFD66C] rounded-full opacity-60 blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[20%] left-[25%] w-2 h-2 bg-[#FFB7C5] rounded-full opacity-50 blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-16 right-12 float opacity-70" style={{ animationDelay: '0s' }}>
        <HeartIcon size={20} className="text-[#FFB7C5]" />
      </div>
      <div className="absolute top-24 left-16 float opacity-60" style={{ animationDelay: '0.5s' }}>
        <StarIcon size={18} className="text-[#FFD66C]" />
      </div>
      <div className="absolute top-32 right-24 float opacity-50" style={{ animationDelay: '1s' }}>
        <PawIcon size={16} className="text-[#C8B8FF]" />
      </div>
      <div className="absolute top-[45%] left-8 float opacity-60" style={{ animationDelay: '1.5s' }}>
        <HeartIcon size={22} className="text-[#B8E3FF]" />
      </div>
      <div className="absolute top-[55%] right-10 float opacity-70" style={{ animationDelay: '2s' }}>
        <StarIcon size={16} className="text-[#FFB7C5]" />
      </div>
      <div className="absolute bottom-32 left-12 float opacity-60" style={{ animationDelay: '2.5s' }}>
        <PawIcon size={18} className="text-[#FFD66C]" />
      </div>
      <div className="absolute bottom-40 right-16 float opacity-50" style={{ animationDelay: '3s' }}>
        <HeartIcon size={14} className="text-[#C8B8FF]" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative z-10 max-w-md mx-auto w-full">
        {/* Logo/Character Section */}
        <div className="text-center mb-12 mt-8">
          {/* Papi Character - Larger with Bounce Animation */}
          <div className="w-[180px] h-[180px] mx-auto mb-6 flex items-center justify-center bounce-cute">
            <img 
              src={loginPapiImage} 
              alt="Papi" 
              className="w-full h-full object-contain drop-shadow-[0_12px_40px_rgba(255,183,197,0.3)]"
            />
          </div>
          
          <h1 className="font-['Nunito'] font-bold text-[32px] leading-tight text-[#333] mb-3 px-4">
            Welcome to Papi Steps!
          </h1>
          <p className="font-['Nunito'] text-[17px] text-[#666] px-6 leading-relaxed">
            Start your wellness journey with your cute companion 🐾
          </p>
        </div>

        {/* Google Login Button */}
        <div className="w-full mb-8">
          <button
            onClick={handleGoogleButtonClick}
            disabled={isLoading}
            className="w-full h-[60px] px-6 bg-white border-2 border-[#E5E7EB] text-[#3C4043] font-['Nunito'] font-semibold text-[17px] rounded-full shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(66,133,244,0.2)] hover:border-[#4285F4] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-4 relative overflow-hidden group"
          >
            {/* Google Logo */}
            {!isLoading && (
              <svg width="24" height="24" viewBox="0 0 24 24" className="flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span className="flex-1 text-center">
              {isLoading ? 'Connecting...' : 'Continue with Google'}
            </span>
            
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/0 via-[#4285F4]/5 to-[#34A853]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>

        {/* Motivational Phrase */}
        <div className="text-center mb-8">
          <p className="font-['Nunito'] text-[15px] italic text-[#FFB7C5] font-medium">
            Your steps make Papi happy! 💛
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-8 relative z-10">
        {/* Terms - More Readable */}
        <div className="text-center">
          <p className="font-['Nunito'] text-[#666] text-[12px] leading-relaxed">
            By continuing, you agree to our{' '}
            <button 
              onClick={() => setShowLegalModal('terms')}
              className="text-[#FF91A4] underline font-medium hover:text-[#FF6B8A] transition-colors"
            >
              Terms of Service
            </button>
            {' '}and{' '}
            <button 
              onClick={() => setShowLegalModal('privacy')}
              className="text-[#FF91A4] underline font-medium hover:text-[#FF6B8A] transition-colors"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-8 flex flex-col items-center gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" className="animate-spin text-white">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25"/>
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8V2z" opacity="1"/>
              </svg>
            </div>
            <p className="font-['Nunito'] font-semibold text-[17px] text-[#333]">
              Connecting to Google...
            </p>
          </div>
        </div>
      )}

      {/* Google Fit Permission Modal */}
      <GoogleFitPermissionModal
        isOpen={showPermissionModal}
        onAllow={handleAllowAccess}
        onCancel={handleCancelPermission}
      />

      {/* Legal Modal */}
      {showLegalModal && (
        <LegalModal
          isOpen={true}
          onClose={() => setShowLegalModal(null)}
          type={showLegalModal}
        />
      )}
    </div>
  );
}
