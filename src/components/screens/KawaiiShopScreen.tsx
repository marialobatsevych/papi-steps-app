import React, { useState } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, PawIcon } from '../KawaiiIcons';
import gardenWallpaper from 'figma:asset/3160b6f7f4bbb7d6313e1f704605265d32dbb943.png';
import bathroomWallpaper from 'figma:asset/093cf73e36eda935fb9ccaae880f48807d062283.png';
import autumnWallpaper from 'figma:asset/e66d81490411fc7973201a06072883dfb1bb7c8b.png';
import fishImage from 'figma:asset/b60b2e31bd60711f29bea10086f8dd02a48259a1.png';
import boneImage from 'figma:asset/dd0188f73a98e7ff1b89a8d28c8f4e8067ef6087.png';
import steakImage from 'figma:asset/49aa32a632cbfbb5ecb305c904e64cd226120ab4.png';
import riceImage from 'figma:asset/471f42b173f51b4645103730154f13594c8c1f54.png';
import carrotImage from 'figma:asset/f9ac01b66750b1ec56dfd4802b27f8dfc01f1a49.png';
import cookieImage from 'figma:asset/191f333a23e13988d7a63f612dbb87ec70ca18a0.png';
import bananaImage from 'figma:asset/fec3636561aab138cdf8ef21fa3723bf68e6e5ad.png';
import cupcakeImage from 'figma:asset/a570dacb003dd95b058a4fafe3f88dd15d29030b.png';
import chickenImage from 'figma:asset/20e3e583e3934f7a97d8d92e661d1f0affb3659e.png';
import rubikCubeImage from 'figma:asset/9ed396baa4d1da3b52e4da6ff1a9ecef210b7818.png';
import tennisBallImage from 'figma:asset/0fbcf65fdb22df5315c24ccf7250c69b68e0ea20.png';
import rocketImage from 'figma:asset/ba663e83bdecb45aedc773cb2bbe75bcb37e8bcc.png';
import yarnBallImage from 'figma:asset/e26581ee10278338e5e5152b9de723de1ecbbd81.png';
import teddyBearImage from 'figma:asset/96d3c868d840d7b1b0d98d02ce8bf4678b96c3a1.png';
import puzzleImage from 'figma:asset/b4eeb55fb03964ff4fa0d1448c3082b7b42903c3.png';
import cityStreetWallpaper from 'figma:asset/48885d6b2ff61da364a47d6222a269d7066c5785.png';
import beachTerraceWallpaper from 'figma:asset/10efe042560ee4f7a8796a4b6497eeb94ae41f5f.png';
import cafeWallpaper from 'figma:asset/afcd8cc6a21154579d475a00b317d0c6f5990606.png';

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: 'food' | 'toys' | 'wallpapers';
  emoji: string;
  description: string;
  owned?: boolean;
  imageUrl?: string;
  effectiveness?: number; // Amount of stat increase: higher price = higher effectiveness
  requiredLevel?: number; // Level required to unlock this item
}

interface KawaiiShopScreenProps {
  onBack: () => void;
  coins: number;
  onItemPurchase: (item: ShopItem) => void;
  ownedWallpapers: string[];
  activeWallpaper: string | null;
  onWallpaperSet: (wallpaperId: string) => void;
  currentLevel: number;
}

export function KawaiiShopScreen({ onBack, coins, onItemPurchase, ownedWallpapers, activeWallpaper, onWallpaperSet, currentLevel }: KawaiiShopScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const shopItems: ShopItem[] = [
    // FOOD ITEMS - sorted by price (effectiveness)
    {
      id: 'food5',
      name: 'Fresh Carrot',
      price: 40,
      category: 'food',
      emoji: '🥕',
      description: 'Crunchy healthy vegetable',
      imageUrl: carrotImage,
      effectiveness: 15, // +15 Hunger
      requiredLevel: 0 // Available from start
    },
    {
      id: 'food4',
      name: 'Rice Bowl',
      price: 50,
      category: 'food',
      emoji: '🍚',
      description: 'Warm and fluffy rice bowl',
      imageUrl: riceImage,
      effectiveness: 20, // +20 Hunger
      requiredLevel: 0
    },
    {
      id: 'food2',
      name: 'Fish Snacks',
      price: 60,
      category: 'food',
      emoji: '🐟',
      description: 'Healthy fish treats for energy',
      imageUrl: fishImage,
      effectiveness: 25, // +25 Hunger
      requiredLevel: 2 // Unlocks at level 2
    },
    {
      id: 'food6',
      name: 'Star Cookie',
      price: 70,
      category: 'food',
      emoji: '🍪',
      description: 'Sweet chocolate chip cookie',
      imageUrl: cookieImage,
      effectiveness: 30, // +30 Hunger
      requiredLevel: 3
    },
    {
      id: 'food1',
      name: 'Premium Bone',
      price: 80,
      category: 'food',
      emoji: '🦴',
      description: 'Delicious bone-shaped treats',
      imageUrl: boneImage,
      effectiveness: 35, // +35 Hunger
      requiredLevel: 4
    },
    {
      id: 'food7',
      name: 'Cool Banana',
      price: 90,
      category: 'food',
      emoji: '🍌',
      description: 'Energetic banana with attitude',
      imageUrl: bananaImage,
      effectiveness: 40, // +40 Hunger
      requiredLevel: 5
    },
    {
      id: 'food8',
      name: 'Love Cupcake',
      price: 100,
      category: 'food',
      emoji: '🧁',
      description: 'Sweet pink cupcake with love',
      imageUrl: cupcakeImage,
      effectiveness: 45, // +45 Hunger
      requiredLevel: 6
    },
    {
      id: 'food9',
      name: 'Chicken Leg',
      price: 110,
      category: 'food',
      emoji: '🍗',
      description: 'Juicy and delicious chicken',
      imageUrl: chickenImage,
      effectiveness: 50, // +50 Hunger
      requiredLevel: 7
    },
    {
      id: 'food3',
      name: 'Meat Feast',
      price: 120,
      category: 'food',
      emoji: '🥩',
      description: 'High-quality meat meal',
      imageUrl: steakImage,
      effectiveness: 55, // +55 Hunger (Premium!)
      requiredLevel: 8
    },
    // TOYS - sorted by price (effectiveness)
    {
      id: 'toy1',
      name: 'Tennis Ball',
      price: 50,
      category: 'toys',
      emoji: '🎾',
      description: 'Classic bouncy tennis ball',
      imageUrl: tennisBallImage,
      effectiveness: 20, // +20 Fun
      requiredLevel: 0
    },
    {
      id: 'toy4',
      name: 'Yarn Ball',
      price: 65,
      category: 'toys',
      emoji: '🧶',
      description: 'Soft pink yarn ball for cozy play',
      imageUrl: yarnBallImage,
      effectiveness: 28, // +28 Fun
      requiredLevel: 2
    },
    {
      id: 'toy6',
      name: 'Puzzle Buddy',
      price: 75,
      category: 'toys',
      emoji: '🧩',
      description: 'Kawaii puzzle pieces with smiles',
      imageUrl: puzzleImage,
      effectiveness: 33, // +33 Fun
      requiredLevel: 3
    },
    {
      id: 'toy2',
      name: 'Rainbow Cube',
      price: 85,
      category: 'toys',
      emoji: '🎲',
      description: 'Colorful puzzle cube with smile',
      imageUrl: rubikCubeImage,
      effectiveness: 38, // +38 Fun
      requiredLevel: 4
    },
    {
      id: 'toy5',
      name: 'Cuddle Bear',
      price: 95,
      category: 'toys',
      emoji: '🧸',
      description: 'Adorable teddy with mint bow',
      imageUrl: teddyBearImage,
      effectiveness: 43, // +43 Fun
      requiredLevel: 5
    },
    {
      id: 'toy3',
      name: 'Space Rocket',
      price: 130,
      category: 'toys',
      emoji: '🚀',
      description: 'Cute pastel rocket for adventures',
      imageUrl: rocketImage,
      effectiveness: 55, // +55 Fun (Premium!)
      requiredLevel: 6
    },
    // WALLPAPERS
    {
      id: 'wallpaper_garden',
      name: 'Garden',
      price: 1000,
      category: 'wallpapers',
      emoji: '🌸',
      description: 'Beautiful garden with butterflies',
      imageUrl: gardenWallpaper,
      requiredLevel: 3
    },
    {
      id: 'wallpaper_bathroom',
      name: 'Bathroom',
      price: 1000,
      category: 'wallpapers',
      emoji: '🛁',
      description: 'Relaxing bubble bath scene',
      imageUrl: bathroomWallpaper,
      requiredLevel: 4
    },
    {
      id: 'wallpaper_autumn',
      name: 'Autumn Park',
      price: 1000,
      category: 'wallpapers',
      emoji: '🍂',
      description: 'Warm autumn forest path',
      imageUrl: autumnWallpaper,
      requiredLevel: 5
    },
    {
      id: 'wallpaper_city_street',
      name: 'City Street',
      price: 1000,
      category: 'wallpapers',
      emoji: '🌃',
      description: 'Cozy pixel night street with neon',
      imageUrl: cityStreetWallpaper,
      requiredLevel: 6
    },
    {
      id: 'wallpaper_beach_terrace',
      name: 'Beach Terrace',
      price: 1000,
      category: 'wallpapers',
      emoji: '🏖️',
      description: 'Peaceful ocean view paradise',
      imageUrl: beachTerraceWallpaper,
      requiredLevel: 7
    },
    {
      id: 'wallpaper_cafe',
      name: 'Sweet Cafe',
      price: 1000,
      category: 'wallpapers',
      emoji: '☕',
      description: 'Kawaii bakery with pastries',
      imageUrl: cafeWallpaper,
      requiredLevel: 8
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All', emoji: '✨' },
    { id: 'food', name: 'Food', emoji: '🍖' },
    { id: 'toys', name: 'Toys', emoji: '🧸' },
    { id: 'wallpapers', name: 'Wallpapers', emoji: '🌈' }
  ];
  
  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);
  
  return (
    <div className="w-full h-screen bg-[#FFF6E8] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-4">
          <KawaiiButton 
            variant="mint" 
            size="sm" 
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <h1 className="font-['Nunito'] font-bold text-2xl text-[#2C2C2E]">Shop</h1>
        </div>
        
        <div className="flex items-center gap-2 kawaii-card px-4 py-2">
          <PawIcon size={16} className="text-[#FFB3C6]" />
          <span className="font-['Nunito'] font-bold text-[#2C2C2E]">
            {coins.toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-2xl font-['Nunito'] font-medium text-sm transition-all whitespace-nowrap
                ${selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] text-white shadow-lg' 
                  : 'bg-white text-[#8E8E93] hover:bg-[#F5F5F5]'
                }
              `}
            >
              <span className="text-base text-[13px]">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="grid grid-cols-2 gap-4 pb-6">
          {filteredItems.map((item) => {
            const isWallpaper = item.category === 'wallpapers';
            const isOwned = isWallpaper ? ownedWallpapers.includes(item.id) : item.owned;
            const isActive = isWallpaper && activeWallpaper === item.id;
            const isLocked = (item.requiredLevel ?? 0) > currentLevel;
            
            return (
              <div key={item.id} className={`kawaii-card p-4 relative ${isWallpaper ? 'col-span-1' : ''} ${isLocked ? 'opacity-90' : ''}`}>
                {isActive && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] text-white text-xs font-['Nunito'] font-bold px-2 py-1 rounded-full shadow-lg z-10">
                    In Use
                  </div>
                )}
                
                {/* Item Image/Emoji */}
                <div className="relative">
                  {item.imageUrl ? (
                    <div className={`w-full rounded-2xl overflow-hidden mb-3 border-2 border-[#E5E5EA] shadow-sm ${isWallpaper ? '' : 'aspect-square'}`} style={isWallpaper ? { aspectRatio: '5/8' } : undefined}>
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className={`w-full h-full object-cover ${isLocked ? 'blur-sm' : ''}`}
                      />
                    </div>
                  ) : (
                    <div className={`w-full aspect-square bg-gradient-to-br from-[#FFF6E8] to-[#F0F0F0] rounded-2xl flex items-center justify-center mb-3 border-2 border-[#E5E5EA] ${isLocked ? 'blur-sm' : ''}`}>
                      <span className="text-4xl">{item.emoji}</span>
                    </div>
                  )}
                  
                  {/* Lock Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 rounded-2xl">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg text-center">
                        <div className="text-3xl mb-1">🔒</div>
                        <div className="font-['Nunito'] font-bold text-[#2C2C2E] text-xs">
                          Level {item.requiredLevel}
                        </div>
                        <div className="font-['Nunito'] text-[#8E8E93] text-[10px]">
                          Required
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Item Info */}
                <h3 className="font-['Nunito'] font-bold text-[#2C2C2E] text-sm mb-1 leading-tight">
                  {item.name}
                </h3>
                
                <p className="font-['Nunito'] text-[#8E8E93] text-xs mb-2 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Effectiveness Badge */}
                {item.effectiveness && (
                  <div className="mb-3">
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#B8E3FF]/30 to-[#8ED4FF]/30 px-2 py-1 rounded-full">
                      <span className="text-xs">
                        {item.category === 'food' ? '🍖' : '🎾'}
                      </span>
                      <span className="font-['Nunito'] font-bold text-[#2C2C2E] text-xs">
                        +{item.effectiveness}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Price and Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <PawIcon size={14} className="text-[#FFB3C6]" />
                    <span className="font-['Nunito'] font-bold text-[#2C2C2E] text-sm">
                      {item.price}
                    </span>
                  </div>
                  
                  {isLocked ? (
                    <button
                      disabled
                      className="px-3 py-2 rounded-[25px] font-['Nunito'] font-semibold text-xs text-white bg-gradient-to-r from-[#8E8E93] to-[#6E6E73] opacity-60 min-w-[60px] flex-1 cursor-not-allowed"
                    >
                      🔒 Locked
                    </button>
                  ) : isWallpaper ? (
                    <>
                      {!isOwned ? (
                        <KawaiiButton
                          variant="primary"
                          size="sm"
                          onClick={() => onItemPurchase(item)}
                          disabled={coins < item.price}
                          className="text-xs min-w-[70px] flex-1"
                        >
                          Buy
                        </KawaiiButton>
                      ) : isActive ? (
                        <button
                          disabled
                          className="px-3 py-2 rounded-2xl font-['Nunito'] font-semibold text-xs text-white bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] opacity-60 min-w-[70px] flex-1"
                        >
                          In Use
                        </button>
                      ) : (
                        <button
                          onClick={() => onWallpaperSet(item.id)}
                          className="px-3 py-2 rounded-[30px] font-['Nunito'] font-semibold text-xs text-white bg-gradient-to-r from-[#B8E3FF] to-[#8ED4FF] hover:shadow-lg active:scale-95 transition-all min-w-[70px] flex-1 rounded-[-72px]"
                        >
                          Set
                        </button>
                      )}
                    </>
                  ) : (
                    <KawaiiButton
                      variant={isOwned ? "mint" : "primary"}
                      size="sm"
                      onClick={() => !isOwned && onItemPurchase(item)}
                      disabled={isOwned || coins < item.price}
                      className="text-xs min-w-[60px]"
                    >
                      {isOwned ? "Owned" : "Buy"}
                    </KawaiiButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
