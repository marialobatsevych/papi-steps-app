import React from 'react';

export type PixelButtonVariant = 'primary' | 'secondary' | 'ghost';
export type PixelButtonSize = 'sm' | 'md' | 'lg';

interface PixelButtonProps {
  children: React.ReactNode;
  variant?: PixelButtonVariant;
  size?: PixelButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function PixelButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = ''
}: PixelButtonProps) {
  const baseClasses = `
    font-['Press_Start_2P'] 
    border-2 
    border-[#2B2B2B] 
    transition-all 
    duration-100 
    cursor-pointer
    select-none
    active:translate-x-[1px] 
    active:translate-y-[1px]
    active:shadow-none
    disabled:opacity-50 
    disabled:cursor-not-allowed
    disabled:translate-x-0
    disabled:translate-y-0
  `;

  const variantClasses = {
    primary: `
      bg-[#FFB3C6] 
      text-[#2B2B2B] 
      shadow-[2px_2px_0px_#2B2B2B]
      hover:bg-[#FF9FB7]
    `,
    secondary: `
      bg-[#C3F0D9] 
      text-[#2B2B2B] 
      shadow-[2px_2px_0px_#2B2B2B]
      hover:bg-[#B3E8CD]
    `,
    ghost: `
      bg-transparent 
      text-[#2B2B2B] 
      shadow-[2px_2px_0px_#2B2B2B]
      hover:bg-[#FFF6EA]
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-[10px] min-h-[32px]',
    md: 'px-4 py-3 text-[12px] min-h-[40px]',
    lg: 'px-6 py-4 text-[14px] min-h-[48px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}