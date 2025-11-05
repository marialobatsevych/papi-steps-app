import React from 'react';
import { PixelButton } from './PixelButton';
import { CoinIcon } from './PixelIcons';

interface PixelCardProps {
  title: string;
  price: number;
  image?: string;
  owned?: boolean;
  featured?: boolean;
  onPreview?: () => void;
  onBuy?: () => void;
  className?: string;
}

export function PixelCard({ 
  title, 
  price, 
  image, 
  owned = false, 
  featured = false,
  onPreview,
  onBuy,
  className = ''
}: PixelCardProps) {
  return (
    <div className={`
      bg-[#FFF6EA] 
      border-2 
      border-[#2B2B2B] 
      p-4 
      ${featured ? 'shadow-[4px_4px_0px_#FFD166]' : 'shadow-[2px_2px_0px_#2B2B2B]'}
      ${className}
    `}>
      {featured && (
        <div className="mb-2">
          <span className="bg-[#FFD166] border border-[#2B2B2B] px-2 py-1 font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">
            FEATURED
          </span>
        </div>
      )}
      
      {/* Item Preview */}
      <div className="aspect-square bg-[#EAD7FF] border border-[#2B2B2B] mb-3 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-16 h-16 pixelated" />
        ) : (
          <div className="w-16 h-16 bg-[#C3F0D9] border border-[#2B2B2B] flex items-center justify-center">
            <span className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">ITEM</span>
          </div>
        )}
      </div>
      
      {/* Title */}
      <h3 className="font-['Press_Start_2P'] text-[10px] text-[#2B2B2B] mb-2 leading-tight">
        {title}
      </h3>
      
      {/* Price */}
      <div className="flex items-center gap-1 mb-3">
        <CoinIcon size={16} />
        <span className="font-['Press_Start_2P'] text-[10px] text-[#2B2B2B]">
          {price.toLocaleString()}
        </span>
      </div>
      
      {/* Actions */}
      <div className="space-y-2">
        {onPreview && (
          <PixelButton 
            variant="ghost" 
            size="sm" 
            onClick={onPreview}
            className="w-full"
          >
            Preview
          </PixelButton>
        )}
        
        {onBuy && (
          <PixelButton 
            variant={owned ? "ghost" : "primary"} 
            size="sm" 
            onClick={onBuy}
            disabled={owned}
            className="w-full"
          >
            {owned ? "Owned" : "Buy"}
          </PixelButton>
        )}
      </div>
    </div>
  );
}

interface PixelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  description: string;
  image?: string;
  owned?: boolean;
  onPreview?: () => void;
  onBuy?: () => void;
}

export function PixelModal({ 
  isOpen, 
  onClose, 
  title, 
  price, 
  description, 
  image, 
  owned = false,
  onPreview,
  onBuy 
}: PixelModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFF6EA] border-4 border-[#2B2B2B] shadow-[4px_4px_0px_#2B2B2B] max-w-sm w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-['Press_Start_2P'] text-[12px] text-[#2B2B2B] leading-tight">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="font-['Press_Start_2P'] text-[12px] text-[#2B2B2B] hover:text-[#FFB3C6]"
          >
            ✕
          </button>
        </div>
        
        <div className="flex gap-4 mb-4">
          {/* Item Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-[#EAD7FF] border-2 border-[#2B2B2B] flex items-center justify-center">
              {image ? (
                <img src={image} alt={title} className="w-16 h-16 pixelated" />
              ) : (
                <span className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B]">ITEM</span>
              )}
            </div>
          </div>
          
          {/* Details */}
          <div className="flex-1">
            <p className="font-['Press_Start_2P'] text-[8px] text-[#2B2B2B] leading-relaxed mb-3">
              {description}
            </p>
            
            <div className="flex items-center gap-1 mb-3">
              <CoinIcon size={16} />
              <span className="font-['Press_Start_2P'] text-[10px] text-[#2B2B2B]">
                {price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="space-y-2">
          {onPreview && (
            <PixelButton 
              variant="secondary" 
              size="md" 
              onClick={onPreview}
              className="w-full"
            >
              Preview in Room
            </PixelButton>
          )}
          
          {onBuy && (
            <PixelButton 
              variant={owned ? "ghost" : "primary"} 
              size="md" 
              onClick={onBuy}
              disabled={owned}
              className="w-full"
            >
              {owned ? "Already Owned" : "Buy Now"}
            </PixelButton>
          )}
        </div>
      </div>
    </div>
  );
}