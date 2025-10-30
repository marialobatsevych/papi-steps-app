import React, { useState } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { LogoutConfirmModal } from '../LogoutConfirmModal';
import { 
  BackIcon, 
  HomeIcon, 
  FriendsIcon, 
  MessageIcon, 
  NotificationIcon, 
  ProfileIcon, 
  SettingsIcon, 
  HelpIcon, 
  LogoutIcon,
  HeartIcon,
  StarIcon
} from '../KawaiiIcons';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  danger?: boolean;
}

interface KawaiiMenuScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  username: string;
  userAvatar?: string;
  dailyGoal?: number;
  onDailyGoalChange?: (newGoal: number) => void;
}

export function KawaiiMenuScreen({ onBack, onNavigate, onLogout, username, userAvatar = 'paw', dailyGoal, onDailyGoalChange }: KawaiiMenuScreenProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Avatar options mapping (emojis only)
  const avatarOptions: Record<string, string> = {
    paw: '🐾',
    heart: '💖',
    star: '⭐',
    cookie: '🍪',
    donut: '🍩',
    ball: '⚽',
    tennis: '🎾',
    toy: '🧸',
    rainbow: '🌈',
    sparkles: '✨'
  };

  const currentAvatarEmoji = avatarOptions[userAvatar] || avatarOptions.paw;

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon size={20} />,
      action: () => onNavigate('home')
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: <FriendsIcon size={20} />,
      action: () => onNavigate('friends')
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageIcon size={20} />,
      action: () => onNavigate('messages')
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <NotificationIcon size={20} />,
      action: () => onNavigate('notifications')
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <ProfileIcon size={20} />,
      action: () => onNavigate('profile')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon size={20} />,
      action: () => onNavigate('settings')
    },
    {
      id: 'help',
      label: 'Help / Support',
      icon: <HelpIcon size={20} />,
      action: () => onNavigate('help')
    },
    {
      id: 'permissions',
      label: 'Permissions',
      icon: <SettingsIcon size={20} />,
      action: () => onNavigate('permissions')
    },
    {
      id: 'logout',
      label: 'Log out',
      icon: <LogoutIcon size={20} />,
      action: () => setShowLogoutModal(true),
      danger: true
    }
  ];

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
      <div className="relative z-10 p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <KawaiiButton 
            variant="mint" 
            size="sm" 
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <h1 className="font-['Nunito'] font-bold text-2xl text-[#2C2C2E]">Menu</h1>
        </div>
        
        {/* User Info Card */}
        <div className="kawaii-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-full flex items-center justify-center border-4 border-white">
              <span className="text-2xl">{currentAvatarEmoji}</span>
            </div>
            <div className="flex-1">
              <h2 className="font-['Nunito'] font-bold text-xl text-[#2C2C2E] mb-1">
                Hello, {username}! 👋
              </h2>
              <p className="font-['Nunito'] text-[#8E8E93] text-sm">
                Keep walking with Papi! 🐾
              </p>
            </div>
            <div className="flex items-center gap-1 kawaii-card px-3 py-2 bg-gradient-to-r from-[#C3F0D9] to-[#B8E6CF]">
              <div className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
              <span className="font-['Nunito'] font-medium text-[#2C2C2E] text-sm">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-2 pb-6">
          {menuItems.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Separator before logout */}
              {item.danger && (
                <div className="my-4 border-t border-[#8E8E93] opacity-20" />
              )}
              
              <button
                onClick={item.action}
                className={`
                  w-full kawaii-card p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                  ${item.danger 
                    ? 'hover:bg-gradient-to-r hover:from-[#FFE5E5] hover:to-[#FFF0F0]' 
                    : 'hover:bg-gradient-to-r hover:from-[#F8F9FA] hover:to-[#F1F3F4]'
                  }
                `}
              >
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center
                  ${item.danger 
                    ? 'bg-gradient-to-br from-[#FFE5E5] to-[#FFD0D0] text-[#FF6B6B]' 
                    : 'bg-gradient-to-br from-[#C3F0D9] to-[#B8E6CF] text-[#2C2C2E]'
                  }
                `}>
                  {item.icon}
                </div>
                
                {/* Label */}
                <div className="flex-1 text-left">
                  <span className={`
                    font-['Nunito'] font-semibold text-lg
                    ${item.danger ? 'text-[#FF6B6B]' : 'text-[#2C2C2E]'}
                  `}>
                    {item.label}
                  </span>
                </div>
                
                {/* Arrow */}
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  ${item.danger ? 'text-[#FF6B6B]' : 'text-[#8E8E93]'}
                `}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              
              {/* Fun number badges for some items */}
              {item.id === 'messages' && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center">
                  <span className="font-['Nunito'] font-bold text-white text-xs">3</span>
                </div>
              )}
              
              {item.id === 'notifications' && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#FFD166] rounded-full flex items-center justify-center">
                  <span className="font-['Nunito'] font-bold text-white text-xs">7</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative area */}
      <div className="px-6 pb-6">
        <div className="kawaii-card p-4 bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] border-0">
          <div className="flex items-center justify-center gap-2">
            <span className="font-['Nunito'] font-medium text-white text-sm">
              Made with 
            </span>
            <HeartIcon size={16} className="text-white" />
            <span className="font-['Nunito'] font-medium text-white text-sm">
              for Papi Steps
            </span>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onConfirm={() => {
          setShowLogoutModal(false);
          onLogout();
        }}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}