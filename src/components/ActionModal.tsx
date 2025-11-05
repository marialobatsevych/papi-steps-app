import React from 'react';
import { X } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  emoji: string;
  category: 'food' | 'toys';
  imageUrl?: string;
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'feed' | 'play' | 'sleep';
  items: InventoryItem[];
  onItemSelect: (item: InventoryItem) => void;
  onShopClick: () => void;
}

export function ActionModal({ 
  isOpen, 
  onClose, 
  action, 
  items, 
  onItemSelect,
  onShopClick 
}: ActionModalProps) {
  if (!isOpen) return null;

  const getTitle = () => {
    switch (action) {
      case 'feed':
        return '🍖 Feed Papi';
      case 'play':
        return '🎾 Play with Papi';
      case 'sleep':
        return '🌙 Put Papi to Sleep';
      default:
        return '';
    }
  };

  const getEmptyMessage = () => {
    switch (action) {
      case 'feed':
        return 'No food in your inventory';
      case 'play':
        return 'No toys in your inventory';
      case 'sleep':
        return 'Put Papi to Sleep';
      default:
        return '';
    }
  };
  
  const getEmptyDescription = () => {
    switch (action) {
      case 'feed':
        return 'Buy food in the shop to feed Papi and increase hunger level';
      case 'play':
        return 'Buy toys in the shop to play with Papi and increase fun level';
      default:
        return '';
    }
  };

  const handleAction = (item?: InventoryItem) => {
    if (action === 'sleep') {
      onItemSelect({ id: 'sleep', name: 'Sleep', emoji: '🌙', category: 'toys' });
      onClose();
    } else if (item) {
      onItemSelect(item);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-300 px-4">
        <div className="bg-white rounded-t-[32px] shadow-2xl max-h-[70vh] overflow-hidden mx-auto max-w-[430px]">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-['Nunito'] font-bold text-lg text-[#2C2C2E]">
              {getTitle()}
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] active:scale-95 transition-all"
            >
              <X size={18} className="text-[#8E8E93]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto max-h-[calc(70vh-88px)]">
            {action === 'sleep' ? (
              <div className="text-center py-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#D7C4F3] to-[#C3F0D9] rounded-full flex items-center justify-center text-5xl shadow-lg">
                  🌙
                </div>
                <p className="font-['Nunito'] text-[#8E8E93] mb-6 px-4">
                  Papi will go to sleep and fully restore energy
                </p>
                <button
                  onClick={() => handleAction()}
                  className="kawaii-button bg-gradient-to-r from-[#D7C4F3] to-[#C3F0D9] text-[#2C2C2E] w-full shadow-lg h-[52px] px-6 rounded-full"
                >
                  💤 Put to Sleep
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-5xl opacity-50">
                  {action === 'feed' ? '🍖' : '🎾'}
                </div>
                <h4 className="font-['Nunito'] font-bold text-[#2C2C2E] mb-2">
                  {getEmptyMessage()}
                </h4>
                <p className="font-['Nunito'] text-sm text-[#8E8E93] mb-6 px-4">
                  {getEmptyDescription()}
                </p>
                <button
                  onClick={() => {
                    onShopClick();
                    onClose();
                  }}
                  className="kawaii-button bg-gradient-to-r from-[#C3F0D9] to-[#FFD166] text-[#2C2C2E] w-full shadow-lg h-[52px] px-6 rounded-full"
                >
                  🛍️ Go to Shop
                </button>
              </div>
            ) : (
              <>
                <p className="font-['Nunito'] text-sm text-[#8E8E93] mb-4 text-center">
                  Choose {action === 'feed' ? 'food' : 'a toy'}
                </p>
                <div className="grid grid-cols-3 gap-3 pb-2">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAction(item)}
                      className="kawaii-card p-4 flex flex-col items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-md"
                    >
                      {item.imageUrl ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <span className="text-4xl">{item.emoji}</span>
                      )}
                      <span className="font-['Nunito'] text-xs text-center text-[#2C2C2E] line-clamp-2">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
