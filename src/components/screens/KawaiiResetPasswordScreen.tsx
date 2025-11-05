import React, { useState } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { HeartIcon, StarIcon, PawIcon } from '../KawaiiIcons';
import loginPapiImage from 'figma:asset/64e144ca4415b9300610c83d81e66e98ba9724b0.png';

interface KawaiiResetPasswordScreenProps {
  onResetComplete: (newPassword: string) => void;
  onBackToLogin: () => void;
}

export function KawaiiResetPasswordScreen({ onResetComplete, onBackToLogin }: KawaiiResetPasswordScreenProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    setError('');
    
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1500));
    onResetComplete(newPassword);
    setIsLoading(false);
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
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 relative z-10">
        {/* Logo/Character Section */}
        <div className="text-center mb-8">
          <div className="w-[140px] h-[140px] mx-auto mb-6 flex items-center justify-center bounce-cute">
            <img 
              src={loginPapiImage} 
              alt="Papi" 
              className="w-full h-full object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            />
          </div>
          
          <h1 className="font-['Nunito'] font-bold text-[26px] leading-tight text-[#333] mb-3 px-4">
            Create New Password
          </h1>
          <p className="font-['Nunito'] text-[15px] text-[#666] px-6 leading-relaxed">
            Choose a strong password to protect your account
          </p>
        </div>

        {/* Reset Password Form */}
        <div className="space-y-5 mb-6">
          {/* New Password Input */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#999]">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              className="w-full h-[56px] pl-14 pr-6 font-['Nunito'] text-[16px] text-[#333] bg-[#fff8f9] rounded-[20px] border-0 outline-none placeholder-[#999] disabled:opacity-50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] focus:shadow-[inset_0_2px_12px_rgba(255,145,164,0.15),0_0_0_3px_rgba(255,145,164,0.1)] transition-all duration-200"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#999]">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              onKeyPress={(e) => e.key === 'Enter' && handleResetPassword()}
              className="w-full h-[56px] pl-14 pr-6 font-['Nunito'] text-[16px] text-[#333] bg-[#fff8f9] rounded-[20px] border-0 outline-none placeholder-[#999] disabled:opacity-50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] focus:shadow-[inset_0_2px_12px_rgba(255,145,164,0.15),0_0_0_3px_rgba(255,145,164,0.1)] transition-all duration-200"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[#FFE8EC] border border-[#FFB7C5] rounded-[16px] px-4 py-3">
              <p className="font-['Nunito'] text-[#FF6B8A] text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Password Requirements */}
          <div className="bg-white/70 backdrop-blur-sm rounded-[16px] px-4 py-3">
            <p className="font-['Nunito'] text-[#666] text-xs leading-relaxed">
              💡 Password must be at least 6 characters long
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetPassword}
            disabled={isLoading || !newPassword.trim() || !confirmPassword.trim()}
            className="w-full h-[52px] px-6 bg-gradient-to-r from-[#FF91A4] to-[#FF6B8A] text-white font-['Nunito'] font-semibold text-[16px] rounded-full shadow-[0_6px_24px_rgba(255,107,138,0.35)] hover:shadow-[0_8px_32px_rgba(255,107,138,0.45)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[0_4px_16px_rgba(255,107,138,0.2)] transition-all duration-200 text-center"
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button 
            onClick={onBackToLogin}
            disabled={isLoading}
            className="font-['Nunito'] text-[#666] text-[15px] underline hover:text-[#333] disabled:opacity-50 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
