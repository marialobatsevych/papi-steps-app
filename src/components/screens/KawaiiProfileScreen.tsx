import React, { useState } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, HeartIcon, StarIcon, CheckIcon } from '../KawaiiIcons';
import { toast } from 'sonner@2.0.3';

interface KawaiiProfileScreenProps {
  onBack: () => void;
  username: string;
  totalSteps: number;
  currentAvatar: string;
  onAvatarChange: (avatar: string) => void;
  onUsernameChange: (username: string) => void;
}

// Evolution stages based on total steps
const getEvolutionStage = (totalSteps: number): string => {
  if (totalSteps < 100) return 'Birth';
  if (totalSteps < 10000) return 'Baby';
  if (totalSteps < 30000) return 'Teen';
  return 'Adult';
};

// Avatar options using emojis only
const avatarOptions = [
  { id: 'paw', emoji: '🐾', name: 'Paw Print' },
  { id: 'heart', emoji: '💖', name: 'Heart' },
  { id: 'star', emoji: '⭐', name: 'Star' },
  { id: 'cookie', emoji: '🍪', name: 'Cookie' },
  { id: 'donut', emoji: '🍩', name: 'Donut' },
  { id: 'ball', emoji: '⚽', name: 'Ball' },
  { id: 'tennis', emoji: '🎾', name: 'Tennis Ball' },
  { id: 'toy', emoji: '🧸', name: 'Teddy Bear' },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow' },
  { id: 'sparkles', emoji: '✨', name: 'Sparkles' }
];

export function KawaiiProfileScreen({ 
  onBack, 
  username, 
  totalSteps, 
  currentAvatar,
  onAvatarChange,
  onUsernameChange
}: KawaiiProfileScreenProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [editedUsername, setEditedUsername] = useState(username);
  const [isEditingName, setIsEditingName] = useState(false);
  const evolutionStage = getEvolutionStage(totalSteps);

  const handleSaveChanges = () => {
    const avatarChanged = selectedAvatar !== currentAvatar;
    const trimmedUsername = editedUsername.trim();
    
    // Validate username
    if (trimmedUsername.length === 0) {
      toast.error('Name cannot be empty! 🙈', {
        description: 'Please enter a valid name',
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #FFD6E8 0%, #F9A8D4 100%)',
          border: 'none',
          color: '#2C2C2E',
          fontFamily: 'Nunito',
          fontWeight: 'bold',
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(255, 107, 138, 0.3)'
        }
      });
      setEditedUsername(username); // Reset to original
      return;
    }
    
    const usernameChanged = trimmedUsername !== username;
    
    if (avatarChanged) {
      onAvatarChange(selectedAvatar);
    }
    if (usernameChanged) {
      onUsernameChange(trimmedUsername);
    }
    setIsEditingName(false);
    
    // Show different messages based on what was changed
    let description = '';
    if (avatarChanged && usernameChanged) {
      description = 'Avatar and name updated!';
    } else if (avatarChanged) {
      description = 'Avatar changed successfully!';
    } else if (usernameChanged) {
      description = 'Name updated successfully!';
    } else {
      description = 'No changes made';
    }
    
    if (avatarChanged || usernameChanged) {
      toast.success('Profile Updated! ✨', {
        description,
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #FFD6E8 0%, #F9A8D4 100%)',
          border: 'none',
          color: '#2C2C2E',
          fontFamily: 'Nunito',
          fontWeight: 'bold',
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(255, 107, 138, 0.3)'
        }
      });
    }
  };

  // Get current avatar display
  const getCurrentAvatarDisplay = (avatarId: string) => {
    const avatar = avatarOptions.find(a => a.id === avatarId);
    return avatar || avatarOptions[0]; // Default to first if not found
  };

  const currentAvatarDisplay = getCurrentAvatarDisplay(selectedAvatar);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFF6E8] via-[#D7C4F3] to-[#C3F0D9] overflow-hidden flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#FFB3C6] opacity-60">
        <HeartIcon size={16} />
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#FFB3C6] opacity-70">
        <StarIcon size={12} />
      </div>
      <div className="absolute top-40 right-32 w-3 h-3 text-[#D7C4F3] opacity-50">
        <HeartIcon size={12} />
      </div>
      <div className="absolute bottom-32 left-16 w-4 h-4 text-[#C3F0D9] opacity-60">
        <StarIcon size={16} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <KawaiiButton 
            variant="mint" 
            size="sm" 
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <h1 className="font-['Nunito'] text-2xl text-[#2C2C2E]">Profile</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* User Info Card */}
        <div className="kawaii-card p-6 mb-6">
          <div className="flex flex-col items-center gap-4">
            {/* Avatar Display */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-4xl">{currentAvatarDisplay.emoji}</span>
              </div>
              {/* Evolution badge */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 kawaii-card px-3 py-1 bg-gradient-to-r from-[#FFD166] to-[#FFB347] border-2 border-white">
                <span className="font-['Nunito'] text-xs text-white">
                  {evolutionStage}
                </span>
              </div>
            </div>
            
            {/* Username */}
            <div className="text-center w-full">
              {isEditingName ? (
                <div className="mb-1">
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsEditingName(false);
                      }
                    }}
                    maxLength={20}
                    autoFocus
                    className="font-['Nunito'] text-2xl text-[#2C2C2E] text-center bg-transparent border-b-2 border-[#FFB3C6] outline-none px-2 py-1 w-full max-w-[200px]"
                  />
                  <p className="font-['Nunito'] text-xs text-[#8E8E93] mt-1">
                    Press Enter to save ✨
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="font-['Nunito'] text-2xl text-[#2C2C2E]">
                    {username}
                  </h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                  >
                    <span className="text-white text-xs">✏️</span>
                  </button>
                </div>
              )}
              <p className="font-['Nunito'] text-sm text-[#8E8E93]">
                {totalSteps.toLocaleString()} total steps 🐾
              </p>
            </div>

            {/* Evolution Stage Info */}
            <div className="w-full mt-2 p-4 rounded-2xl bg-gradient-to-r from-[#F8F9FA] to-[#F1F3F4]">
              <div className="flex items-center justify-between">
                <span className="font-['Nunito'] text-sm text-[#8E8E93]">
                  Evolution Stage
                </span>
                <span className="font-['Nunito'] text-[#2C2C2E]">
                  {evolutionStage}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Selection */}
        <div className="kawaii-card p-6 mb-6">
          <h3 className="font-['Nunito'] text-lg text-[#2C2C2E] mb-4">
            Choose Avatar
          </h3>
          
          {/* Avatar Grid */}
          <div className="grid grid-cols-5 gap-3">
            {avatarOptions.map((avatar) => {
              const isSelected = selectedAvatar === avatar.id;
              
              return (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`
                    relative aspect-square rounded-2xl flex items-center justify-center transition-all duration-200
                    ${isSelected 
                      ? 'bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] scale-105 shadow-lg border-3 border-white' 
                      : 'bg-gradient-to-br from-[#F8F9FA] to-[#F1F3F4] hover:scale-105 active:scale-95'
                    }
                  `}
                >
                  <span className={isSelected ? 'text-2xl' : 'text-xl'}>
                    {avatar.emoji}
                  </span>
                  
                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                      <CheckIcon size={12} className="text-[#FF9FB7]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full py-4 px-6 rounded-3xl bg-gradient-to-r from-[#FF6B9D] to-[#FFA5C3] text-white font-['Nunito'] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
