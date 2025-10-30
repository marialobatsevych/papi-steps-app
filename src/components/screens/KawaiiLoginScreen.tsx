import React, { useState } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { HeartIcon, StarIcon, PawIcon, EmailIcon, FacebookIcon } from '../KawaiiIcons';
import { PapiCharacter } from '../PapiCharacter';
import { ForgotPasswordModal } from '../ForgotPasswordModal';
import { toast } from 'sonner@2.0.3';
import loginPapiImage from 'figma:asset/64e144ca4415b9300610c83d81e66e98ba9724b0.png';

interface KawaiiLoginScreenProps {
  onEmailLogin: (email: string, password: string) => void;
  onFacebookLogin: () => void;
  onCreateAccount: () => void;
  onForgotPassword?: () => void;
}

export function KawaiiLoginScreen({ onEmailLogin, onFacebookLogin, onCreateAccount, onForgotPassword }: KawaiiLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleEmailLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    onEmailLogin(email, password);
    setIsLoading(false);
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    onFacebookLogin();
    setIsLoading(false);
  };

  const handleForgotPasswordSubmit = (email: string) => {
    setShowForgotPasswordModal(false);
    
    // Show success message
    toast.success('Password reset link sent!', {
      description: `Check your email at ${email}`,
      duration: 5000,
      style: {
        background: 'linear-gradient(135deg, #B8E3FF 0%, #8ED4FF 100%)',
        border: 'none',
        color: '#2C2C2E',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        borderRadius: '20px',
        padding: '16px',
        boxShadow: '0 8px 32px rgba(142, 212, 255, 0.3)'
      }
    });
    
    // Navigate to reset password screen if callback provided
    if (onForgotPassword) {
      // Simulate link click after 2 seconds
      setTimeout(() => {
        onForgotPassword();
      }, 2000);
    }
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
      <div className="flex-1 flex flex-col justify-center px-6 py-12 relative z-10">
        {/* Logo/Character Section with Extra Top Margin */}
        <div className="text-center mb-8 mt-12">
          {/* Papi Character - Larger and Direct with Bounce Animation */}
          <div className="w-[160px] h-[160px] mx-auto mb-6 flex items-center justify-center bounce-cute">
            <img 
              src={loginPapiImage} 
              alt="Papi" 
              className="w-full h-full object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            />
          </div>
          
          <h1 className="font-['Nunito'] font-bold text-[28px] leading-tight text-[#333] mb-3 px-4">
            Welcome to Papi Steps!
          </h1>
          <p className="font-['Nunito'] text-[16px] text-[#666] px-6 leading-relaxed">
            Start your wellness journey with your cute companion 🐾
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-6 mb-6">
          {/* Email Input with Icon */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
              <EmailIcon size={20} className="text-[#999]" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full h-[56px] pl-14 pr-6 font-['Nunito'] text-[16px] text-[#333] bg-[#fff8f9] rounded-[20px] border-0 outline-none placeholder-[#999] disabled:opacity-50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] focus:shadow-[inset_0_2px_12px_rgba(255,145,164,0.15),0_0_0_3px_rgba(255,145,164,0.1)] transition-all duration-200"
            />
          </div>

          {/* Password Input with Icon */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#999]">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full h-[56px] pl-14 pr-6 font-['Nunito'] text-[16px] text-[#333] bg-[#fff8f9] rounded-[20px] border-0 outline-none placeholder-[#999] disabled:opacity-50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] focus:shadow-[inset_0_2px_12px_rgba(255,145,164,0.15),0_0_0_3px_rgba(255,145,164,0.1)] transition-all duration-200"
            />
          </div>

          {/* Email Login Button - Brighter Pink Gradient */}
          <button
            onClick={handleEmailLogin}
            disabled={isLoading || !email.trim() || !password.trim()}
            className="w-full h-[52px] px-6 bg-gradient-to-r from-[#FF91A4] to-[#FF6B8A] text-white font-['Nunito'] font-semibold text-[16px] rounded-full shadow-[0_6px_24px_rgba(255,107,138,0.35)] hover:shadow-[0_8px_32px_rgba(255,107,138,0.45)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[0_4px_16px_rgba(255,107,138,0.2)] transition-all duration-200 flex items-center justify-center gap-3"
          >
            {!isLoading && <EmailIcon size={20} className="text-white" />}
            {isLoading ? 'Logging in...' : 'Continue with Email'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#999] to-transparent opacity-30" />
          <span className="font-['Nunito'] text-[#666] text-[14px] font-medium">or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#999] to-transparent opacity-30" />
        </div>

        {/* Social Login - Lilac-Blue Gradient */}
        <div className="mb-6">
          <button
            onClick={handleFacebookLogin}
            disabled={isLoading}
            className="w-full h-[52px] px-6 bg-gradient-to-r from-[#A88BFF] to-[#6D9EFF] text-white font-['Nunito'] font-semibold text-[16px] rounded-full shadow-[0_6px_24px_rgba(109,158,255,0.35)] hover:shadow-[0_8px_32px_rgba(109,158,255,0.45)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-[0_4px_16px_rgba(109,158,255,0.2)] transition-all duration-200 flex items-center justify-center gap-3"
          >
            {!isLoading && <FacebookIcon size={20} className="text-white" />}
            Continue with Facebook
          </button>
        </div>

        {/* Motivational Phrase */}
        <div className="text-center mb-6">
          <p className="font-['Nunito'] text-[14px] italic text-[#FFB7C5] font-medium">
            Your steps make Papi happy! 💛
          </p>
        </div>

        {/* Forgot Password */}
        <div className="text-center mb-4">
          <button 
            onClick={() => setShowForgotPasswordModal(true)}
            className="font-['Nunito'] text-[#666] text-[15px] underline hover:text-[#333] disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            Forgot your password?
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-8 relative z-10">
        {/* Create Account */}
        <div className="text-center mb-6">
          <span className="font-['Nunito'] text-[#666] text-[15px]">
            Don't have an account? 
          </span>
          <button 
            onClick={onCreateAccount}
            disabled={isLoading}
            className="font-['Nunito'] font-semibold text-[#FF91A4] text-[15px] ml-1 hover:text-[#FF6B8A] disabled:opacity-50 transition-colors"
          >
            Sign up here!
          </button>
        </div>

        {/* Terms - More Readable */}
        <div className="text-center">
          <p className="font-['Nunito'] text-[#666] text-[13px] leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="text-[#FF91A4] underline font-medium">Terms of Service</span>
            {' '}and{' '}
            <span className="text-[#FF91A4] underline font-medium">Privacy Policy</span>
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-[24px] p-8 flex flex-col items-center gap-4 shadow-[0_12px_48px_rgba(0,0,0,0.15)]">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFB7C5] to-[#FF91A4] rounded-full flex items-center justify-center shadow-lg">
              <div className="transform scale-[1.8] animate-bounce">
                <PapiCharacter state="happy" />
              </div>
            </div>
            <p className="font-['Nunito'] font-semibold text-[16px] text-[#333]">
              Getting everything ready...
            </p>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        onSubmit={handleForgotPasswordSubmit}
      />
    </div>
  );
}
