import React, { useState } from 'react';
import { PixelCard } from '../PixelCard';
import { BackArrowIcon } from '../PixelIcons';

interface ShopItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  owned?: boolean;
  featured?: boolean;
  description?: string;
}

interface ShopScreenProps {
  onBack: () => void;
  onItemSelect: (item: ShopItem) => void;
  coins: number;
}

export function ShopScreen({ onBack, onItemSelect, coins }: ShopScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredItems: ShopItem[] = [
    {
      id: 'seasonal1',
      name: 'Winter Tree',
      price: 500,
      featured: true,
      description: 'A cozy winter tree with snow-covered branches'
    },
    {
      id: 'seasonal2', 
      name: 'Hot Cocoa',
      price: 300,
      featured: true,
      description: 'Warm cocoa to keep your character cozy'
    }
  ];
  
  const shopItems: ShopItem[] = [
    {
      id: 'plant1',
      name: 'Pixel Plant',
      price: 150,
      description: 'A cute pixelated plant for your room'
    },
    {
      id: 'lamp1',
      name: 'Cozy Lamp',
      price: 200,
      description: 'Ambient lighting for evening vibes'
    },
    {
      id: 'rug1',
      name: 'Kawaii Rug',
      price: 350,
      owned: true,
      description: 'A soft rug with cute patterns'
    },
    {
      id: 'book1',
      name: 'Story Book',
      price: 100,
      description: 'A collection of cozy bedtime stories'
    },
    {
      id: 'cushion1',
      name: 'Heart Cushion',
      price: 250,
      description: 'A heart-shaped cushion for extra comfort'
    },
    {
      id: 'picture1',
      name: 'Pet Picture',
      price: 180,
      description: 'A framed picture of your favorite pet'
    }
  ];
  
  const filteredItems = shopItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="w-full h-screen bg-[#FFF6EA] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b-2 border-[#2B2B2B]">
        <button onClick={onBack} className="p-2">
          <BackArrowIcon size={24} color="#2B2B2B" />
        </button>
        
        <h1 className="font-['Press_Start_2P'] text-[16px] text-[#2B2B2B] flex-1">
          SHOP
        </h1>
      </div>
      
      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 bg-[#FFF6EA] border-2 border-[#2B2B2B] font-['Press_Start_2P'] text-[10px] text-[#2B2B2B] placeholder-[#A0A0A0]"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-[#FFD166] border border-[#2B2B2B]" />
              <h2 className="font-['Press_Start_2P'] text-[12px] text-[#2B2B2B]">
                FEATURED
              </h2>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {featuredItems.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-48">
                  <PixelCard
                    title={item.name}
                    price={item.price}
                    image={item.image}
                    featured={item.featured}
                    owned={item.owned}
                    onPreview={() => onItemSelect(item)}
                    onBuy={() => onItemSelect(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Regular Items Grid */}
        <div className="p-4">
          <h2 className="font-['Press_Start_2P'] text-[12px] text-[#2B2B2B] mb-4">
            ALL ITEMS
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <PixelCard
                key={item.id}
                title={item.name}
                price={item.price}
                image={item.image}
                owned={item.owned}
                onPreview={() => onItemSelect(item)}
                onBuy={() => onItemSelect(item)}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <p className="font-['Press_Start_2P'] text-[10px] text-[#A0A0A0]">
                No items found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}