import React, { useState } from 'react';
import { X } from 'lucide-react';
import { EmailIcon } from './KawaiiIcons';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export function ForgotPasswordModal({ isOpen, onClose, onSubmit }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(email);
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-300 pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-['Nunito'] font-bold text-xl text-[#2C2C2E]">
              Reset Password
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] active:scale-95 transition-all"
            >
              <X size={18} className="text-[#8E8E93]" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="font-['Nunito'] text-[#8E8E93] text-sm leading-relaxed mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <EmailIcon size={20} className="text-[#999]" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full h-[52px] pl-12 pr-4 font-['Nunito'] text-[15px] text-[#333] bg-[#F5F5F5] rounded-[16px] border-0 outline-none placeholder-[#999] disabled:opacity-50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,145,164,0.15)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-[52px] px-6 bg-white/90 backdrop-blur-sm text-[#2C2C2E] font-['Nunito'] font-semibold rounded-full hover:bg-white active:scale-[0.98] disabled:opacity-50 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !email.trim()}
              className="flex-1 h-[52px] px-6 bg-gradient-to-r from-[#FFB7C5] via-[#FF9FB7] to-[#FFB7C5] text-white font-['Nunito'] font-semibold rounded-full shadow-[0_4px_20px_rgba(255,159,183,0.35)] hover:shadow-[0_6px_24px_rgba(255,159,183,0.45)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              {isSubmitting ? 'Sending...' : 'Send Link'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
