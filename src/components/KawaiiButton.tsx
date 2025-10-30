import React from 'react';

export type KawaiiButtonVariant = 'primary' | 'secondary' | 'mint' | 'lavender';
export type KawaiiButtonSize = 'sm' | 'md' | 'lg';

interface KawaiiButtonProps {
  children: React.ReactNode;
  variant?: KawaiiButtonVariant;
  size?: KawaiiButtonSize;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function KawaiiButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  onClick, 
  disabled = false,
  className = ''
}: KawaiiButtonProps) {
  const baseClasses = `
    kawaii-button
    font-['Nunito']
    font-semibold
    text-center
    whitespace-nowrap
    border-0
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-br from-[#FFB7C5] to-[#FF9FB7] 
      text-white
    `,
    secondary: `
      bg-gradient-to-br from-[#B8E3FF] to-[#A0D5F5] 
      text-[#333]
    `,
    mint: `
      bg-gradient-to-br from-[#B8E3FF] to-[#9DD7F2] 
      text-[#333]
    `,
    lavender: `
      bg-gradient-to-br from-[#C8B8FF] to-[#B8A6F3] 
      text-[#333]
    `
  };

  const sizeClasses = {
    sm: 'min-h-[40px] text-sm',
    md: 'min-h-[48px] text-base',
    lg: 'min-h-[52px] text-lg'
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
      {icon && (
        <span className="flex items-center justify-center" style={{ color: 'inherit' }}>
          {icon}
        </span>
      )}
      {children && (
        <span className="flex items-center justify-center leading-tight text-[rgb(0,0,0)]">
          {children}
        </span>
      )}
    </button>
  );
}