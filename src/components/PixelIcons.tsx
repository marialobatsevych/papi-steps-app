import React from 'react';

interface PixelIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BurgerIcon({ size = 24, color = '#2B2B2B', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="4" y="6" width="16" height="2" fill={color} />
        <rect x="4" y="11" width="16" height="2" fill={color} />
        <rect x="4" y="16" width="16" height="2" fill={color} />
      </svg>
    </div>
  );
}

export function MusicIcon({ size = 24, color = '#2B2B2B', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="6" y="4" width="2" height="14" fill={color} />
        <rect x="8" y="6" width="8" height="2" fill={color} />
        <rect x="4" y="16" width="6" height="4" fill={color} />
        <rect x="14" y="8" width="6" height="4" fill={color} />
      </svg>
    </div>
  );
}

export function CoinIcon({ size = 24, color = '#FFD166', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="6" y="4" width="12" height="2" fill={color} />
        <rect x="4" y="6" width="16" height="12" fill={color} />
        <rect x="6" y="18" width="12" height="2" fill={color} />
        <rect x="8" y="8" width="8" height="2" fill="#2B2B2B" />
        <rect x="10" y="10" width="4" height="2" fill="#2B2B2B" />
        <rect x="8" y="12" width="8" height="2" fill="#2B2B2B" />
      </svg>
    </div>
  );
}

export function ShopIcon({ size = 24, color = '#2B2B2B', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="4" y="4" width="16" height="2" fill={color} />
        <rect x="3" y="6" width="18" height="2" fill={color} />
        <rect x="6" y="8" width="12" height="10" fill={color} />
        <rect x="8" y="10" width="8" height="2" fill="#FFF6EA" />
        <rect x="10" y="12" width="4" height="4" fill="#FFF6EA" />
      </svg>
    </div>
  );
}

export function HeartIcon({ size = 24, color = '#FFB3C6', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="6" y="4" width="4" height="2" fill={color} />
        <rect x="14" y="4" width="4" height="2" fill={color} />
        <rect x="4" y="6" width="8" height="2" fill={color} />
        <rect x="12" y="6" width="8" height="2" fill={color} />
        <rect x="4" y="8" width="16" height="2" fill={color} />
        <rect x="6" y="10" width="12" height="2" fill={color} />
        <rect x="8" y="12" width="8" height="2" fill={color} />
        <rect x="10" y="14" width="4" height="2" fill={color} />
      </svg>
    </div>
  );
}

export function BackArrowIcon({ size = 24, color = '#2B2B2B', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="8" y="10" width="2" height="4" fill={color} />
        <rect x="6" y="8" width="2" height="2" fill={color} />
        <rect x="6" y="14" width="2" height="2" fill={color} />
        <rect x="4" y="6" width="2" height="2" fill={color} />
        <rect x="4" y="16" width="2" height="2" fill={color} />
        <rect x="10" y="11" width="10" height="2" fill={color} />
      </svg>
    </div>
  );
}

export function GiftIcon({ size = 24, color = '#2B2B2B', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="6" y="8" width="12" height="2" fill={color} />
        <rect x="4" y="10" width="16" height="8" fill={color} />
        <rect x="6" y="12" width="12" height="2" fill="#FFF6EA" />
        <rect x="11" y="10" width="2" height="8" fill="#FFB3C6" />
        <rect x="8" y="4" width="8" height="4" fill="#FFB3C6" />
      </svg>
    </div>
  );
}

export function HouseIcon({ size = 24, color = '#2B2B2B', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="10" y="4" width="4" height="2" fill={color} />
        <rect x="8" y="6" width="8" height="2" fill={color} />
        <rect x="6" y="8" width="12" height="2" fill={color} />
        <rect x="6" y="10" width="12" height="8" fill={color} />
        <rect x="8" y="12" width="8" height="2" fill="#FFF6EA" />
        <rect x="10" y="14" width="4" height="4" fill="#FFB3C6" />
      </svg>
    </div>
  );
}

export function PawIcon({ size = 24, color = '#2B2B2B', className = '' }: PixelIconProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="pixelated">
        <rect x="6" y="6" width="3" height="4" fill={color} />
        <rect x="15" y="6" width="3" height="4" fill={color} />
        <rect x="10" y="4" width="4" height="3" fill={color} />
        <rect x="8" y="12" width="8" height="6" fill={color} />
        <rect x="10" y="14" width="4" height="2" fill="#FFF6EA" />
      </svg>
    </div>
  );
}