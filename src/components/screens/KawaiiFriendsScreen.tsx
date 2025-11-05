import React, { useState, useMemo } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, HeartIcon, StarIcon } from '../KawaiiIcons';
import { getUserCountry, getCountryByCode } from '../../utils/countryUtils';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  stepsToday: number;
  rank: number;
  country?: string;
}

interface KawaiiFriendsScreenProps {
  onBack: () => void;
  onSearchFriends: () => void;
  onMessagesClick: () => void;
}

export function KawaiiFriendsScreen({ onBack }: KawaiiFriendsScreenProps) {
  const [activeTab, setActiveTab] = useState<'global' | 'country'>('global');
  const userCountry = getUserCountry();
  const userCountryInfo = getCountryByCode(userCountry);
  
  // Mock data - in real app this would come from API
  // All users globally
  const allGlobalUsers: LeaderboardUser[] = [
    { id: '1', name: 'Luna', avatar: '🐱', stepsToday: 12450, rank: 1, country: 'US' },
    { id: '2', name: 'Mochi', avatar: '🐰', stepsToday: 11230, rank: 2, country: 'JP' },
    { id: '3', name: 'Kiwi', avatar: '🐻', stepsToday: 10880, rank: 3, country: 'NZ' },
    { id: '4', name: 'Bella', avatar: '🦋', stepsToday: 9750, rank: 4, country: userCountry },
    { id: '5', name: 'Max', avatar: '🐕', stepsToday: 9200, rank: 5, country: 'GB' },
    { id: '6', name: 'Coco', avatar: '🐻‍❄️', stepsToday: 8880, rank: 6, country: userCountry },
    { id: '7', name: 'Lily', avatar: '🌸', stepsToday: 8450, rank: 7, country: 'FR' },
    { id: '8', name: 'Oliver', avatar: '🦁', stepsToday: 8120, rank: 8, country: userCountry },
    { id: '9', name: 'Sophie', avatar: '🦄', stepsToday: 7890, rank: 9, country: 'DE' },
    { id: '10', name: 'Leo', avatar: '🐯', stepsToday: 7650, rank: 10, country: userCountry },
    ...Array.from({ length: 30 }, (_, i) => ({
      id: `${11 + i}`,
      name: `User${11 + i}`,
      avatar: ['🐶', '🐱', '🐰', '🐨', '🦊', '🐸'][i % 6],
      stepsToday: 7500 - (i * 150),
      rank: 11 + i,
      country: i % 3 === 0 ? userCountry : ['US', 'GB', 'JP', 'FR', 'DE'][i % 5]
    })),
    { id: 'user', name: 'You', avatar: '🐾', stepsToday: 5420, rank: 36, country: userCountry },
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `${37 + i}`,
      name: `User${37 + i}`,
      avatar: ['🐨', '🐶', '🐱', '🐰', '🦊'][i % 5],
      stepsToday: 5400 - (i * 100),
      rank: 37 + i,
      country: i % 2 === 0 ? userCountry : 'US'
    }))
  ];
  
  // Filter users based on active tab
  const filteredUsers = useMemo(() => {
    if (activeTab === 'global') {
      return allGlobalUsers;
    } else {
      // Filter by user's country
      const countryUsers = allGlobalUsers.filter(u => u.country === userCountry);
      // Re-rank them for country leaderboard
      return countryUsers
        .sort((a, b) => b.stepsToday - a.stepsToday)
        .map((user, index) => ({ ...user, rank: index + 1 }));
    }
  }, [activeTab, userCountry]);
  
  const currentUser = filteredUsers.find(u => u.id === 'user');
  if (!currentUser) {
    // Fallback if user not found
    return null;
  }
  
  const topThree = filteredUsers.slice(0, 3);
  
  // Get users around current user's rank (2-3 above and below)
  const currentRankIndex = filteredUsers.findIndex(u => u.id === 'user');
  const startIndex = Math.max(0, currentRankIndex - 2);
  const endIndex = Math.min(filteredUsers.length, currentRankIndex + 3);
  const nearbyUsers = filteredUsers.slice(startIndex, endIndex);
  
  // Steps to reach next rank
  const nextRankUser = nearbyUsers.find(u => u.rank === currentUser.rank - 1);
  const stepsToNextRank = nextRankUser ? nextRankUser.stepsToday - currentUser.stepsToday : 0;
  
  const getCrownEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };
  
  const formatSteps = (steps: number) => {
    return steps.toLocaleString();
  };
  
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFE9EE] via-[#F5E9FF] to-[#D7F2F7] overflow-hidden flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#FFB3C6] opacity-60">
        <HeartIcon size={16} />
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#D7C4F3] opacity-70">
        <StarIcon size={12} />
      </div>
      <div className="absolute bottom-32 right-20 w-3 h-3 text-[#B8E3FF] opacity-50">
        <HeartIcon size={12} />
      </div>
      
      {/* Header */}
      <div className="flex-shrink-0 pt-12 pb-6 px-6 bg-white/40 backdrop-blur-md border-b border-white/60">
        <div className="flex items-center gap-4 mb-4">
          <KawaiiButton 
            variant="mint" 
            size="sm" 
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <div className="flex-1">
            <h1 className="font-['Nunito'] text-2xl text-[#2C2C2E] flex items-center gap-2">
              🏆 Today's Step Ranking
            </h1>
            <p className="font-['Nunito'] text-sm text-[#8E8E93] mt-1">
              See how you're doing compared to other Papi friends 💛
            </p>
          </div>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2 px-4 rounded-full font-['Nunito'] transition-all ${
              activeTab === 'global'
                ? 'bg-gradient-to-r from-[#FFB7C5] to-[#FF9FB7] text-white shadow-md'
                : 'bg-white/50 text-[#8E8E93] hover:bg-white/70'
            }`}
          >
            🌎 Global
          </button>
          <button
            onClick={() => setActiveTab('country')}
            className={`flex-1 py-2 px-4 rounded-full font-['Nunito'] transition-all ${
              activeTab === 'country'
                ? 'bg-gradient-to-r from-[#FFB7C5] to-[#FF9FB7] text-white shadow-md'
                : 'bg-white/50 text-[#8E8E93] hover:bg-white/70'
            }`}
          >
            {userCountryInfo?.flag || '🏡'} My Country
          </button>
        </div>
        
        {/* Country indicator when My Country is active */}
        {activeTab === 'country' && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="font-['Nunito'] text-sm text-[#8E8E93]">
              Showing rankings for
            </span>
            <div className="px-3 py-1 bg-white/60 rounded-full flex items-center gap-2">
              <span className="text-lg">{userCountryInfo?.flag}</span>
              <span className="font-['Nunito'] text-sm text-[#2C2C2E]">
                {userCountryInfo?.name}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Empty state for My Country if no users */}
        {activeTab === 'country' && filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-32 h-32 bg-white/50 backdrop-blur-sm rounded-[32px] flex items-center justify-center shadow-lg mb-6">
              <div className="text-7xl">🐾</div>
            </div>
            <h2 className="font-['Nunito'] text-xl text-[#2C2C2E] mb-3 text-center">
              No Papi friends from your country yet 💛
            </h2>
            <p className="font-['Nunito'] text-[#8E8E93] text-center max-w-sm mb-6">
              Be the first Step Star ⭐ from {userCountryInfo?.name}!
            </p>
            <button
              onClick={() => setActiveTab('global')}
              className="px-6 py-3 bg-gradient-to-r from-[#FFB7C5] to-[#FF9FB7] text-white rounded-full font-['Nunito'] shadow-md hover:shadow-lg transition-all"
            >
              🌎 View Global Rankings
            </button>
          </div>
        ) : (
          <>
            {/* Top 3 Users */}
            <div className="mb-6">
              <h2 className="font-['Nunito'] text-lg text-[#2C2C2E] mb-4 flex items-center gap-2">
                <span className="text-xl">👑</span>
                Top 3 Today
              </h2>
              
              <div className="space-y-3">
                {topThree.map((user, index) => (
              <div
                key={user.id}
                className={`kawaii-card p-5 ${
                  user.rank === 1 
                    ? 'bg-gradient-to-r from-[#FFF5E1] to-[#FFE9C5] shadow-[0_8px_24px_rgba(255,215,0,0.25)]' 
                    : 'bg-white/80'
                }`}
                style={user.rank === 1 ? {
                  boxShadow: '0 8px 24px rgba(255,215,0,0.25), 0 0 40px rgba(255,215,0,0.15)'
                } : undefined}
              >
                <div className="flex items-center gap-4">
                  {/* Crown */}
                  <div className={`flex-shrink-0 text-4xl ${user.rank === 1 ? 'animate-bounce' : ''}`}
                    style={user.rank === 1 ? { animationDuration: '2s' } : undefined}
                  >
                    {getCrownEmoji(user.rank)}
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                    user.rank === 1
                      ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500]'
                      : user.rank === 2
                      ? 'bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0]'
                      : 'bg-gradient-to-br from-[#CD7F32] to-[#A0522D]'
                  } shadow-md`}>
                    {user.avatar}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-['Nunito'] text-[#2C2C2E] flex items-center gap-2">
                      {user.name}
                    </h3>
                    <p className="font-['Nunito'] text-sm text-[#8E8E93]">
                      {formatSteps(user.stepsToday)} steps
                    </p>
                  </div>
                  
                  {/* Rank Badge */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    user.rank === 1
                      ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white'
                      : user.rank === 2
                      ? 'bg-gradient-to-br from-[#E8E8E8] to-[#C0C0C0] text-[#666]'
                      : 'bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white'
                  } shadow-md`}>
                    <span className="font-['Nunito']">#{user.rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Your Position */}
        <div className="kawaii-card p-5 bg-gradient-to-r from-[#E8F5FF] to-[#D0EFFF] mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌟</span>
            <h2 className="font-['Nunito'] text-lg text-[#2C2C2E]">
              Your Position
            </h2>
          </div>
          
          <div className="mb-3">
            <p className="font-['Nunito'] text-[#2C2C2E] mb-2">
              You are ranked <span className="font-bold">#{currentUser.rank}</span> today 🌟
            </p>
            <p className="font-['Nunito'] text-sm text-[#8E8E93]">
              {formatSteps(currentUser.stepsToday)} steps
            </p>
          </div>
          
          {stepsToNextRank > 0 && (
            <div>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] mb-2">
                {formatSteps(stepsToNextRank)} steps to reach next rank
              </p>
              
              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFB7C5] to-[#FF9FB7] rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(100, (currentUser.stepsToday / (currentUser.stepsToday + stepsToNextRank)) * 100)}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Leaderboard List */}
        <div className="mb-6">
          <h2 className="font-['Nunito'] text-lg text-[#2C2C2E] mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Around You
          </h2>
          
          <div className="space-y-2">
            {nearbyUsers.map((user) => (
              <div
                key={user.id}
                className={`kawaii-card p-4 transition-all ${
                  user.id === currentUser.id
                    ? 'bg-gradient-to-r from-[#FFE4F0] to-[#FFD6E8] border-2 border-[#FFB7C5]'
                    : 'bg-white/70 hover:bg-white/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className={`font-['Nunito'] ${
                      user.id === currentUser.id ? 'text-[#FF6B9D]' : 'text-[#8E8E93]'
                    }`}>
                      #{user.rank}
                    </span>
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    user.id === currentUser.id
                      ? 'bg-gradient-to-br from-[#FFB7C5] to-[#FF9FB7] shadow-md'
                      : 'bg-gradient-to-br from-[#F5F5F5] to-[#E8E8E8]'
                  }`}>
                    {user.avatar}
                  </div>
                  
                  {/* Name */}
                  <div className="flex-1">
                    <span className={`font-['Nunito'] ${
                      user.id === currentUser.id ? 'text-[#2C2C2E]' : 'text-[#2C2C2E]'
                    }`}>
                      {user.name}
                    </span>
                  </div>
                  
                  {/* Steps */}
                  <div className="flex-shrink-0">
                    <span className={`font-['Nunito'] text-sm ${
                      user.id === currentUser.id ? 'text-[#2C2C2E]' : 'text-[#8E8E93]'
                    }`}>
                      {formatSteps(user.stepsToday)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </div>
            
            {/* Footer */}
            <div className="py-6 border-t border-white/40">
              <p className="font-['Nunito'] text-sm text-center text-[#8E8E93]">
                Rankings update daily at midnight 🕛
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
