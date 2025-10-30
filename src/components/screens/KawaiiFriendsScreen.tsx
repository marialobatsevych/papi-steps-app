import React from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, HeartIcon, StarIcon, SearchIcon, WaveIcon } from '../KawaiiIcons';
import { toast } from 'sonner@2.0.3';

interface Friend {
  id: string;
  name: string;
  level: number;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface KawaiiFriendsScreenProps {
  onBack: () => void;
  onSearchFriends: () => void;
}

export function KawaiiFriendsScreen({ onBack, onSearchFriends }: KawaiiFriendsScreenProps) {
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Luna',
      level: 12,
      avatar: '🐱',
      isOnline: true
    },
    {
      id: '2', 
      name: 'Mochi',
      level: 8,
      avatar: '🐰',
      isOnline: true
    },
    {
      id: '3',
      name: 'Kiwi',
      level: 15,
      avatar: '🐻',
      isOnline: false,
      lastSeen: '2 hours ago'
    },
    {
      id: '4',
      name: 'Bubble',
      level: 6,
      avatar: '🐨',
      isOnline: true
    },
    {
      id: '5',
      name: 'Cherry',
      level: 20,
      avatar: '🦊',
      isOnline: false,
      lastSeen: '1 day ago'
    },
    {
      id: '6',
      name: 'Sage',
      level: 11,
      avatar: '🐸',
      isOnline: true
    }
  ];
  
  const onlineFriends = friends.filter(f => f.isOnline);
  const offlineFriends = friends.filter(f => !f.isOnline);
  
  const handleWave = (friend: Friend) => {
    toast.success(`👋 Waved at ${friend.name}!`, {
      description: `${friend.name} waved back with ${friend.avatar}`,
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #FFB7C5 0%, #FF9FB7 100%)',
        border: 'none',
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        borderRadius: '20px',
        padding: '16px',
        boxShadow: '0 8px 32px rgba(255, 159, 183, 0.3)'
      }
    });
  };
  
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFF6E8] via-[#C3F0D9] to-[#D7C4F3] overflow-hidden flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#FFB3C6] opacity-60">
        <HeartIcon size={16} />
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#D7C4F3] opacity-70">
        <StarIcon size={12} />
      </div>
      <div className="absolute top-40 right-32 w-3 h-3 text-[#C3F0D9] opacity-50">
        <HeartIcon size={12} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <KawaiiButton 
              variant="mint" 
              size="sm" 
              icon={<BackIcon size={18} />}
              onClick={onBack}
              className="w-12 h-12 !p-0"
            />
            <h1 className="font-['Nunito'] font-bold text-2xl text-[#2C2C2E]">Friends</h1>
          </div>
          
          <div className="flex items-center gap-1 kawaii-card px-3 py-2">
            <div className="w-2 h-2 bg-[#34C759] rounded-full" />
            <span className="font-['Nunito'] font-medium text-[#2C2C2E] text-sm">
              {onlineFriends.length} online
            </span>
          </div>
        </div>
        
        {/* Search Button */}
        <KawaiiButton 
          variant="primary" 
          size="md" 
          icon={<SearchIcon size={18} />}
          onClick={onSearchFriends}
          className="w-full"
        >
          Find New Friends Nearby
        </KawaiiButton>
      </div>
      
      {/* Friends List */}
      <div className="flex-1 overflow-y-auto px-6">
        {/* Online Friends */}
        {onlineFriends.length > 0 && (
          <div className="mb-6">
            <h2 className="font-['Nunito'] font-bold text-[#2C2C2E] mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#34C759] rounded-full" />
              Online ({onlineFriends.length})
            </h2>
            
            <div className="space-y-3">
              {onlineFriends.map((friend) => (
                <div key={friend.id} className="kawaii-card p-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-2xl flex items-center justify-center text-xl">
                        {friend.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#34C759] border-2 border-white rounded-full" />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-['Nunito'] font-bold text-[#2C2C2E]">
                        {friend.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-['Nunito'] text-[#8E8E93] text-sm">
                          Level {friend.level}
                        </span>
                        {friend.level >= 15 && (
                          <StarIcon size={12} className="text-[#FFD166]" />
                        )}
                      </div>
                    </div>
                    
                    {/* Wave Button */}
                    <button
                      onClick={() => handleWave(friend)}
                      className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#FFB7C5] via-[#FF9FB7] to-[#FFB7C5] rounded-[20px] shadow-[0_4px_16px_rgba(255,159,183,0.3)] hover:shadow-[0_6px_20px_rgba(255,159,183,0.4)] active:scale-95 transition-all"
                    >
                      <WaveIcon size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Offline Friends */}
        {offlineFriends.length > 0 && (
          <div className="mb-6">
            <h2 className="font-['Nunito'] font-bold text-[#2C2C2E] mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8E8E93] rounded-full" />
              Offline ({offlineFriends.length})
            </h2>
            
            <div className="space-y-3">
              {offlineFriends.map((friend) => (
                <div key={friend.id} className="kawaii-card p-4 opacity-75">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E5E5EA] to-[#D1D1D6] rounded-2xl flex items-center justify-center text-xl grayscale">
                        {friend.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#8E8E93] border-2 border-white rounded-full" />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-['Nunito'] font-bold text-[#2C2C2E]">
                        {friend.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-['Nunito'] text-[#8E8E93] text-sm">
                          Level {friend.level}
                        </span>
                        {friend.level >= 15 && (
                          <StarIcon size={12} className="text-[#D1D1D6]" />
                        )}
                      </div>
                      {friend.lastSeen && (
                        <p className="font-['Nunito'] text-[#8E8E93] text-xs">
                          Last seen {friend.lastSeen}
                        </p>
                      )}
                    </div>
                    
                    {/* Wave Button - Disabled for offline */}
                    <button
                      onClick={() => handleWave(friend)}
                      className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#E5E5EA] to-[#D1D1D6] rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <WaveIcon size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}