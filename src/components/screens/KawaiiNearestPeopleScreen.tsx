import React, { useState, useEffect } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, SearchIcon, AddIcon, StarIcon, HeartIcon } from '../KawaiiIcons';
import { geolocationService, type NearbyFriend } from '../../utils/geolocation';
import { toast } from 'sonner@2.0.3';

interface NearbyPerson {
  id: string;
  name: string;
  level: number;
  avatar: string;
  distance: string;
  location: string;
  bio?: string;
  isInvited?: boolean;
}

interface KawaiiNearestPeopleScreenProps {
  onBack: () => void;
  onSendFriendRequest: (person: NearbyPerson) => void;
}

export function KawaiiNearestPeopleScreen({ 
  onBack, 
  onSendFriendRequest
}: KawaiiNearestPeopleScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedUsers, setInvitedUsers] = useState<Set<string>>(new Set());
  const [nearbyFriends, setNearbyFriends] = useState<NearbyFriend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNearbyFriends();
  }, []);

  const loadNearbyFriends = async () => {
    setIsLoading(true);
    try {
      // Find friends within 5km radius
      const friends = await geolocationService.findNearbyFriends(5);
      setNearbyFriends(friends);
      console.log('Loaded nearby friends:', friends);
    } catch (error) {
      console.error('Error loading nearby friends:', error);
      toast.error('Location Error', {
        description: 'Could not load nearby friends. Please check location permissions.',
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Convert NearbyFriend to NearbyPerson format for compatibility
  const nearbyPeople: NearbyPerson[] = nearbyFriends.map(friend => ({
    id: friend.id,
    name: friend.displayName,
    level: friend.papiState === 'baby' ? 5 : friend.papiState === 'child' ? 10 : friend.papiState === 'adult' ? 15 : 20,
    avatar: friend.papiState === 'baby' ? '🐶' : friend.papiState === 'child' ? '🐕' : friend.papiState === 'adult' ? '🐕‍🦺' : '✨🐕✨',
    distance: friend.distance < 1 ? `${Math.round(friend.distance * 1000)}m` : `${friend.distance}km`,
    location: friend.lastActive,
    bio: `@${friend.username} • ${friend.papiState} Papi`
  }));

  const filteredPeople = nearbyPeople.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendRequest = (person: NearbyPerson) => {
    setInvitedUsers(prev => new Set([...prev, person.id]));
    onSendFriendRequest(person);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFF6E8] via-[#C3F0D9] to-[#FFB3C6] overflow-hidden flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#D7C4F3] opacity-60">
        <StarIcon size={16} />
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#FFB3C6] opacity-70">
        <HeartIcon size={12} />
      </div>
      <div className="absolute top-40 right-32 w-3 h-3 text-[#C3F0D9] opacity-50">
        <StarIcon size={12} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <KawaiiButton 
            variant="mint" 
            size="sm" 
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <div className="flex-1">
            <h1 className="font-['Nunito'] font-bold text-2xl text-[#2C2C2E]">Nearest People</h1>
            <p className="font-['Nunito'] text-[#8E8E93] text-sm">Find friends nearby and connect!</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="kawaii-card p-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93]">
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F2F2F7] rounded-2xl font-['Nunito'] text-[#2C2C2E] placeholder-[#8E8E93] border-0 focus:outline-none focus:ring-2 focus:ring-[#FFB3C6] focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>
      
      {/* Results Counter */}
      <div className="px-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
            <span className="font-['Nunito'] font-medium text-[#2C2C2E] text-sm">
              {filteredPeople.length} people found nearby
            </span>
          </div>
          <button
            onClick={loadNearbyFriends}
            disabled={isLoading}
            className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-['Nunito'] text-[#2C2C2E] hover:bg-white transition-colors disabled:opacity-50"
          >
            {isLoading ? '🔄 Searching...' : '🔄 Refresh'}
          </button>
        </div>
      </div>
      
      {/* People List */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-3 pb-6">
          {filteredPeople.map((person) => {
            const isInvited = invitedUsers.has(person.id);
            
            return (
              <div key={person.id} className="kawaii-card p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar with distance badge */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#D7C4F3] to-[#C9B3E8] rounded-2xl flex items-center justify-center text-2xl">
                      {person.avatar}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-[#34C759] text-white px-2 py-1 rounded-full text-xs font-['Nunito'] font-bold">
                      {person.distance}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-['Nunito'] font-bold text-[#2C2C2E] truncate">
                        {person.name}
                      </h3>
                      {person.level >= 20 && (
                        <StarIcon size={14} className="text-[#FFD166] flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-['Nunito'] text-[#8E8E93] text-sm">
                        Level {person.level}
                      </span>
                      <span className="text-[#8E8E93]">•</span>
                      <span className="font-['Nunito'] text-[#8E8E93] text-sm truncate">
                        📍 {person.location}
                      </span>
                    </div>
                    
                    {person.bio && (
                      <p className="font-['Nunito'] text-[#8E8E93] text-sm leading-tight">
                        {person.bio}
                      </p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <KawaiiButton
                      variant="primary"
                      size="sm"
                      icon={isInvited ? undefined : <AddIcon size={16} />}
                      onClick={() => handleSendRequest(person)}
                      disabled={isInvited}
                      className="min-w-[90px] text-xs"
                    >
                      {isInvited ? 'Invited ✓' : 'Add Friend'}
                    </KawaiiButton>
                    
                    <KawaiiButton
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        toast.success(`Visiting ${person.name}'s room`, {
                          description: 'This feature will be available soon!',
                          duration: 3000
                        });
                      }}
                      className="min-w-[90px] text-xs"
                    >
                      Visit Room
                    </KawaiiButton>
                  </div>
                </div>
              </div>
            );
          })}
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#B8E3FF] to-[#A8D3FF] rounded-full flex items-center justify-center text-2xl mb-4 animate-pulse">
              📍
            </div>
            <h3 className="font-['Nunito'] font-bold text-[#2C2C2E] mb-2">Finding nearby friends...</h3>
            <p className="font-['Nunito'] text-[#8E8E93] text-center text-sm">
              Using your location to find Papi Steps users nearby
            </p>
          </div>
        )}
        </div>
        
        {!isLoading && filteredPeople.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-full flex items-center justify-center text-2xl mb-4">
              🔍
            </div>
            <h3 className="font-['Nunito'] font-bold text-[#2C2C2E] mb-2">No results found</h3>
            <p className="font-['Nunito'] text-[#8E8E93] text-center text-sm px-8">
              Try adjusting your search or check back later for new people nearby!
            </p>
            <button
              onClick={loadNearbyFriends}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#B8E3FF] to-[#A8D3FF] text-[#2C2C2E] rounded-full font-['Nunito'] hover:shadow-lg transition-all"
            >
              🔄 Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}