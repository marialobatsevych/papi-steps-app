import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner@2.0.3';
import { KawaiiHomeScreen } from './components/screens/KawaiiHomeScreen';
import { KawaiiShopScreen, type ShopItem } from './components/screens/KawaiiShopScreen';
import { KawaiiFriendsScreen } from './components/screens/KawaiiFriendsScreen';
import { KawaiiNearestPeopleScreen } from './components/screens/KawaiiNearestPeopleScreen';
import { KawaiiMessagesScreen } from './components/screens/KawaiiMessagesScreen';
import { KawaiiDailyRewardScreen } from './components/screens/KawaiiDailyRewardScreen';
import { KawaiiMenuScreen } from './components/screens/KawaiiMenuScreen';
import { KawaiiProfileScreen } from './components/screens/KawaiiProfileScreen';
import { KawaiiLoginScreen } from './components/screens/KawaiiLoginScreen';
import { KawaiiResetPasswordScreen } from './components/screens/KawaiiResetPasswordScreen';
import { KawaiiSettingsScreen } from './components/screens/KawaiiSettingsScreen';
import { KawaiiNotificationsScreen } from './components/screens/KawaiiNotificationsScreen';
import { KawaiiHelpScreen } from './components/screens/KawaiiHelpScreen';
import { KawaiiPermissionsScreen } from './components/screens/KawaiiPermissionsScreen';
import { NotificationPopup } from './components/NotificationPopup';
import { WelcomePopup } from './components/WelcomePopup';
import { 
  calculateCurrentStats, 
  resetStatTimestamp, 
  initializeStatsSystem,
  type GameStats 
} from './utils/statsTimerSystem';
import {
  type Notification,
  checkStatAlerts,
  createDailyGoalNotification,
  createLevelUpNotification,
  createFriendRequestNotification,
  createFriendActivityNotification,
  createMessageNotification,
  createEvolutionNotification,
  getUnreadCount
} from './utils/notificationSystem';
import { calculateLevel, getLevelProgress } from './utils/levelSystem';
import { healthKitService } from './utils/healthKit';
import { geolocationService } from './utils/geolocation';
import { shouldReceiveDailyBonus, claimDailyBonus, type DailyBonusItem } from './utils/dailyBonusSystem';

type Screen = 'login' | 'resetPassword' | 'home' | 'shop' | 'friends' | 'nearestPeople' | 'messages' | 'dailyReward' | 'menu' | 'profile' | 'settings' | 'notifications' | 'help' | 'permissions';

interface InventoryItem {
  id: string;
  name: string;
  emoji: string;
  category: 'food' | 'toys';
  imageUrl?: string;
  effectiveness?: number; // Stat increase amount from shop item
}

interface Friend {
  id: string;
  name: string;
  level: number;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface NearbyPerson {
  id: string;
  name: string;
  level: number;
  avatar: string;
  distance: string;
  location: string;
  bio?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [showDailyReward, setShowDailyReward] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Welcome popup state - show on first launch
  const [showWelcomePopup, setShowWelcomePopup] = useState(() => {
    return !localStorage.getItem('welcomeShown');
  });
  
  // Notification state
  const [currentPopupNotification, setCurrentPopupNotification] = useState<Notification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([]);
  
  // Game state
  // Note: In production, 'steps' will be synced from Apple Health
  const [gameState, setGameState] = useState(() => ({
    steps: 8500, // Daily steps (will be synced from Apple Health)
    maxSteps: 10000, // Deprecated - will be replaced by dailyGoal
    totalSteps: 35000, // Total lifetime steps for evolution (set to adult stage for testing)
    coins: 1580,
    level: 12,
    username: localStorage.getItem('username') || "Papi Friend",
    dailyGoal: 10000, // Configurable from 3000 to 30000 in Settings
    dailyGoalReached: false, // Auto-updates when steps >= dailyGoal
    dailyGoalRewardClaimed: false // Tracks if daily goal reward (300 coins) has been claimed today
  }));

  // Stats state - managed by time-based system
  const [gameStats, setGameStats] = useState<GameStats>(() => {
    // Initialize stats system if first time
    const hasInitialized = localStorage.getItem('papiStatsTimestamps');
    if (!hasInitialized) {
      initializeStatsSystem();
    }
    return calculateCurrentStats();
  });

  // Avatar state
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('userAvatar') || 'paw';
  });
  
  // Inventory state - Starts empty, items received through daily bonuses
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  
  // Daily bonus items state - stores the items received today
  const [dailyBonusItems, setDailyBonusItems] = useState<DailyBonusItem[]>([]);
  
  // Wallpaper state
  const [ownedWallpapers, setOwnedWallpapers] = useState<string[]>([]);
  const [activeWallpaper, setActiveWallpaper] = useState<string | null>(null);

  // Update stats every minute based on elapsed time
  useEffect(() => {
    const updateStats = () => {
      const updatedStats = calculateCurrentStats();
      setGameStats(updatedStats);
    };

    // Update immediately on mount
    updateStats();

    // Update every minute (60 seconds)
    const interval = setInterval(updateStats, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Initialize health and location services on login
  useEffect(() => {
    if (!isLoggedIn) return;

    const initializeServices = async () => {
      console.log('Initializing Apple Health and Location services...');
      
      // Request HealthKit permission and get initial steps
      try {
        const healthPermission = await healthKitService.requestPermission();
        if (healthPermission.granted) {
          const todaySteps = await healthKitService.getTodaySteps();
          console.log('Steps data loaded:', todaySteps);
          
          // Update steps in game state
          setGameState(prev => ({
            ...prev,
            steps: todaySteps
          }));
        } else {
          // Only show error toast on actual iOS device, not in development
          console.warn('HealthKit permission denied:', healthPermission.message);
          if (healthPermission.message && !healthPermission.message.includes('development')) {
            toast.error('Apple Health Access', {
              description: healthPermission.message,
              duration: 5000
            });
          }
        }
      } catch (error) {
        console.error('Error initializing HealthKit:', error);
      }

      // Request location permission and get current location
      try {
        const locationPermission = await geolocationService.requestPermission();
        if (locationPermission.granted) {
          const location = await geolocationService.getCurrentLocation();
          console.log('User location:', location);
        } else {
          // Only show error toast if there's a real error message
          if (locationPermission.message) {
            console.warn('Location permission denied:', locationPermission.message);
          }
        }
      } catch (error) {
        console.error('Error initializing location:', error);
      }
    };

    initializeServices();

    // Update steps from HealthKit every 5 minutes
    const healthInterval = setInterval(async () => {
      try {
        const todaySteps = await healthKitService.getTodaySteps();
        console.log('Steps updated:', todaySteps);
        setGameState(prev => ({
          ...prev,
          steps: todaySteps
        }));
      } catch (error) {
        console.error('Error updating steps:', error);
      }
    }, 300000); // 5 minutes

    return () => {
      clearInterval(healthInterval);
    };
  }, [isLoggedIn]);

  // Check for daily bonus on login
  useEffect(() => {
    if (!isLoggedIn) return;

    // Check if user should receive daily bonus
    if (shouldReceiveDailyBonus()) {
      const bonusItems = claimDailyBonus();
      
      // Store bonus items for display in Daily Reward screen
      setDailyBonusItems(bonusItems);
      
      // Add bonus items to inventory
      const newInventoryItems: InventoryItem[] = bonusItems.map((item, index) => ({
        id: `daily_bonus_${Date.now()}_${index}`,
        name: item.name,
        emoji: item.emoji,
        category: item.category,
        imageUrl: item.imageUrl,
        effectiveness: item.effectiveness,
      }));
      
      setInventory(prev => [...prev, ...newInventoryItems]);
      
      // Show Daily Reward screen
      setShowDailyReward(true);
      setCurrentScreen('dailyReward');
      
      // Show notification
      const foodItem = bonusItems.find(i => i.category === 'food');
      const toyItem = bonusItems.find(i => i.category === 'toys');
      
      toast.success('Daily Bonus! 🎁', {
        description: `You received ${foodItem?.name} and ${toyItem?.name}!`,
        duration: 5000,
      });
    }
  }, [isLoggedIn]);

  // Check stats and create notifications periodically
  useEffect(() => {
    if (!isLoggedIn) return;

    const checkInterval = setInterval(() => {
      // Check for stat alerts every 5 minutes
      checkStatAlerts(gameStats.hunger, gameStats.energy, gameStats.fun);
    }, 300000); // 5 minutes

    // Check immediately on mount
    checkStatAlerts(gameStats.hunger, gameStats.energy, gameStats.fun);

    return () => clearInterval(checkInterval);
  }, [gameStats.hunger, gameStats.energy, gameStats.fun, isLoggedIn]);

  // Handle notification popup queue
  useEffect(() => {
    if (currentPopupNotification || notificationQueue.length === 0) return;

    // Show next notification from queue
    const nextNotification = notificationQueue[0];
    setCurrentPopupNotification(nextNotification);
    setNotificationQueue(prev => prev.slice(1));
  }, [currentPopupNotification, notificationQueue]);

  // Function to show popup notification
  const showPopupNotification = (notification: Notification) => {
    if (currentPopupNotification) {
      // Queue it if there's already a notification showing
      setNotificationQueue(prev => [...prev, notification]);
    } else {
      setCurrentPopupNotification(notification);
    }
  };
  
  const handleItemPurchase = (item: ShopItem) => {
    if (gameState.coins >= item.price && !item.owned) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - item.price
      }));
      
      // Add to inventory if it's food or toy
      if (item.category === 'food' || item.category === 'toys') {
        setInventory(prev => [...prev, {
          id: `${item.id}_${Date.now()}_${Math.random()}`, // Generate unique ID for each instance
          name: item.name,
          emoji: item.emoji,
          category: item.category,
          imageUrl: item.imageUrl,
          effectiveness: item.effectiveness // Store effectiveness for later use
        }]);
      }
      
      // Add to owned wallpapers if it's a wallpaper
      if (item.category === 'wallpapers') {
        setOwnedWallpapers(prev => [...prev, item.id]);
      }
      
      console.log('Purchased:', item.name);
    }
  };
  
  const handleWallpaperSet = (wallpaperId: string) => {
    setActiveWallpaper(wallpaperId);
    console.log('Set active wallpaper:', wallpaperId);
  };
  
  const handleItemUse = (item: InventoryItem, action: 'feed' | 'play' | 'sleep') => {
    console.log('Using item:', item.name, 'for action:', action);
    
    // Increase stats based on action
    if (action === 'feed' && item.category === 'food') {
      // Food increases Hunger based on item effectiveness (price-based system)
      // More expensive items = higher effectiveness = more stat increase
      const increaseAmount = item.effectiveness || 30; // Default to 30 if no effectiveness set
      const newHunger = Math.min(100, gameStats.hunger + increaseAmount);
      resetStatTimestamp('hunger', newHunger);
      
      // Update state immediately
      setGameStats(prev => ({ ...prev, hunger: newHunger }));
      
      toast.success(`Fed Papi with ${item.name}!`, {
        description: `Hunger +${increaseAmount} 🍖`,
        duration: 3000
      });
    } else if (action === 'play' && item.category === 'toys') {
      // Toys increase Fun based on item effectiveness (price-based system)
      // More expensive toys = higher effectiveness = more fun increase
      const increaseAmount = item.effectiveness || 30; // Default to 30 if no effectiveness set
      const newFun = Math.min(100, gameStats.fun + increaseAmount);
      resetStatTimestamp('fun', newFun);
      
      // Update state immediately
      setGameStats(prev => ({ ...prev, fun: newFun }));
      
      toast.success(`Played with ${item.name}!`, {
        description: `Fun +${increaseAmount} 🎾`,
        duration: 3000
      });
    }
    
    // Remove item from inventory after use (consumable)
    setInventory(prev => {
      const index = prev.findIndex(i => i.id === item.id);
      if (index !== -1) {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
      return prev;
    });
  };
  
  const handleSendFriendRequest = (person: NearbyPerson) => {
    console.log('Sending friend request to:', person.name);
    // In a real app, this would send a friend request
    
    // Demo: Simulate receiving a friend request after 3 seconds
    setTimeout(() => {
      const notification = createFriendRequestNotification(person.name);
      showPopupNotification(notification);
    }, 3000);
  };
  
  const handleDailyRewardCollect = () => {
    const reward = {
      coins: 100,
      item: "Tennis Ball"
    };
    
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + (reward.coins || 0)
    }));
    
    setShowDailyReward(false);
    setCurrentScreen('home');
  };

  const handleSleep = () => {
    // Restore Energy to 100 when Papi sleeps
    const newEnergy = 100;
    resetStatTimestamp('energy', newEnergy);
    
    // Decrease Hunger slightly while sleeping
    const newHunger = Math.max(0, gameStats.hunger - 10);
    resetStatTimestamp('hunger', newHunger);
    
    // Update state immediately
    setGameStats({
      ...gameStats,
      energy: newEnergy,
      hunger: newHunger
    });
    
    toast.success('Papi is sleeping! 💤', {
      description: 'Energy restored to 100!',
      duration: 3000
    });
  };

  const handleAvatarChange = (newAvatar: string) => {
    setUserAvatar(newAvatar);
    localStorage.setItem('userAvatar', newAvatar);
  };

  const handleUsernameChange = (newUsername: string) => {
    setGameState(prev => ({
      ...prev,
      username: newUsername
    }));
    localStorage.setItem('username', newUsername);
  };
  
  // Demo function to add steps for testing evolution
  const handleAddSteps = (amount: number) => {
    setGameState(prev => {
      const newSteps = Math.min(prev.steps + amount, prev.maxSteps);
      const newTotalSteps = prev.totalSteps + amount;
      const newDailyGoalReached = newSteps >= prev.dailyGoal;
      const wasGoalReached = prev.dailyGoalReached;
      
      // Check for level up
      const oldLevel = calculateLevel(prev.totalSteps);
      const newLevel = calculateLevel(newTotalSteps);
      const leveledUp = newLevel > oldLevel;
      
      // Check if goal was just reached and reward hasn't been claimed yet
      const justReachedGoal = !wasGoalReached && newDailyGoalReached && !prev.dailyGoalRewardClaimed;
      
      if (justReachedGoal) {
        // Award 300 coins for reaching daily goal
        toast.success('🎉 Daily Goal Achieved!', {
          description: '+300 coins reward! 💰',
          duration: 5000,
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

        // Create notification and show popup
        const notification = createDailyGoalNotification(newSteps);
        showPopupNotification(notification);
      }
      
      // Check for level up and notify
      if (leveledUp) {
        toast.success(`🎉 Level Up! Level ${newLevel}!`, {
          description: `New items unlocked in the shop! 🎁`,
          duration: 5000,
          style: {
            background: 'linear-gradient(135deg, #C8B8FF 0%, #B8A5FF 100%)',
            border: 'none',
            color: 'white',
            fontFamily: 'Nunito',
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 8px 32px rgba(200, 184, 255, 0.4)'
          }
        });
        
        // Create level up notification
        const levelUpNotification = createLevelUpNotification(newLevel);
        showPopupNotification(levelUpNotification);
      }
      
      return {
        ...prev,
        totalSteps: newTotalSteps,
        steps: newSteps,
        dailyGoalReached: newDailyGoalReached,
        dailyGoalRewardClaimed: justReachedGoal ? true : prev.dailyGoalRewardClaimed,
        coins: justReachedGoal ? prev.coins + 300 : prev.coins
      };
    });
  };

  // Function to update daily goal
  const handleDailyGoalChange = (newGoal: number) => {
    setGameState(prev => ({
      ...prev,
      dailyGoal: newGoal,
      dailyGoalReached: prev.steps >= newGoal
    }));
  };

  // TODO: Add daily reset functionality
  // When integrated with Apple Health:
  // - Reset 'steps' to 0 at start of new day
  // - Reset 'dailyGoalReached' to false
  // - Reset 'dailyGoalRewardClaimed' to false
  // - Keep 'totalSteps' accumulating
  // - Sync 'steps' from Apple Health throughout the day
  
  const handleMenuClick = () => {
    setCurrentScreen('menu');
  };
  
  const handleLogout = () => {
    handleRealLogout();
  };
  
  const handleMenuNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };
  
  const handleEmailLogin = (email: string, password: string) => {
    console.log('Email login:', email);
    setIsLoggedIn(true);
    
    // Show welcome popup if first time, otherwise daily reward
    if (showWelcomePopup) {
      setCurrentScreen('home'); // Set to home but overlay welcome popup
    } else {
      setCurrentScreen('dailyReward');
      setShowDailyReward(true);
    }

    // Demo: Create some sample notifications after login
    setTimeout(() => {
      createFriendActivityNotification('Emma', 'reached their daily goal! 🎉');
      createMessageNotification('Sarah', 'Hey! Want to walk together today? 🚶‍♀️');
    }, 2000);
  };
  
  const handleFacebookLogin = () => {
    console.log('Facebook login');
    setIsLoggedIn(true);
    
    // Show welcome popup if first time, otherwise daily reward
    if (showWelcomePopup) {
      setCurrentScreen('home'); // Set to home but overlay welcome popup
    } else {
      setCurrentScreen('dailyReward');
      setShowDailyReward(true);
    }
  };
  
  const handleCreateAccount = () => {
    console.log('Create account clicked');
    // In a real app, this would navigate to signup screen
  };
  
  const handleRealLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    setShowDailyReward(true);
  };

  const handleResetPasswordComplete = (newPassword: string) => {
    console.log('Password reset complete');
    toast.success('Password changed successfully!', {
      description: 'You can now login with your new password',
      duration: 4000,
      style: {
        background: 'linear-gradient(135deg, #B8E3FF 0%, #8ED4FF 100%)',
        border: 'none',
        color: '#2C2C2E',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        borderRadius: '20px',
        padding: '16px',
        boxShadow: '0 8px 32px rgba(142, 212, 255, 0.3)'
      }
    });
    // Navigate back to login
    setTimeout(() => {
      setCurrentScreen('login');
    }, 1500);
  };
  
  const renderCurrentScreen = () => {
    if (!isLoggedIn) {
      if (currentScreen === 'resetPassword') {
        return (
          <KawaiiResetPasswordScreen
            onResetComplete={handleResetPasswordComplete}
            onBackToLogin={() => setCurrentScreen('login')}
          />
        );
      }
      
      return (
        <KawaiiLoginScreen
          onEmailLogin={handleEmailLogin}
          onFacebookLogin={handleFacebookLogin}
          onCreateAccount={handleCreateAccount}
          onForgotPassword={() => setCurrentScreen('resetPassword')}
        />
      );
    }
    
    if (showDailyReward && currentScreen === 'dailyReward') {
      const foodItem = dailyBonusItems.find(i => i.category === 'food');
      const toyItem = dailyBonusItems.find(i => i.category === 'toys');
      
      return (
        <KawaiiDailyRewardScreen
          onCollect={handleDailyRewardCollect}
          onClose={() => {
            setShowDailyReward(false);
            setCurrentScreen('home');
          }}
          reward={{
            coins: 100,
            foodItem: foodItem ? { name: foodItem.name, emoji: foodItem.emoji } : undefined,
            toyItem: toyItem ? { name: toyItem.name, emoji: toyItem.emoji } : undefined
          }}
        />
      );
    }
    
    switch (currentScreen) {
      case 'home':
        return (
          <KawaiiHomeScreen
            steps={gameState.steps}
            maxSteps={gameState.maxSteps}
            totalSteps={gameState.totalSteps}
            level={calculateLevel(gameState.totalSteps)}
            coins={gameState.coins}
            inventory={inventory}
            activeWallpaper={activeWallpaper}
            dailyGoal={gameState.dailyGoal}
            dailyGoalReached={gameState.dailyGoalReached}
            gameStats={gameStats}
            setGameStats={setGameStats}
            onShopClick={() => setCurrentScreen('shop')}
            onFriendsClick={() => setCurrentScreen('friends')}
            onMessagesClick={() => setCurrentScreen('messages')}
            onMenuClick={handleMenuClick}
            onItemUse={handleItemUse}
            onSleep={handleSleep}
            onAddSteps={handleAddSteps}
            onEventReward={(coins, statBonus) => {
              setGameState(prev => ({ ...prev, coins: prev.coins + coins }));
              if (statBonus) {
                setGameStats(prev => ({
                  ...prev,
                  [statBonus.type]: Math.min(100, prev[statBonus.type] + statBonus.amount)
                }));
              }
            }}
            onEventPenalty={(fun, energy) => {
              setGameStats(prev => ({
                ...prev,
                fun: Math.max(0, prev.fun - fun),
                energy: Math.max(0, prev.energy - energy)
              }));
            }}
          />
        );
        
      case 'shop':
        return (
          <KawaiiShopScreen
            onBack={() => setCurrentScreen('home')}
            coins={gameState.coins}
            onItemPurchase={handleItemPurchase}
            ownedWallpapers={ownedWallpapers}
            activeWallpaper={activeWallpaper}
            onWallpaperSet={handleWallpaperSet}
            currentLevel={calculateLevel(gameState.totalSteps)}
          />
        );
        
      case 'friends':
        return (
          <KawaiiFriendsScreen
            onBack={() => setCurrentScreen('home')}
            onSearchFriends={() => setCurrentScreen('nearestPeople')}
          />
        );
        
      case 'nearestPeople':
        return (
          <KawaiiNearestPeopleScreen
            onBack={() => setCurrentScreen('friends')}
            onSendFriendRequest={handleSendFriendRequest}
          />
        );
        
      case 'messages':
        return (
          <KawaiiMessagesScreen
            onBack={() => setCurrentScreen('home')}
          />
        );
        
      case 'menu':
        return (
          <KawaiiMenuScreen
            onBack={() => setCurrentScreen('home')}
            onNavigate={handleMenuNavigate}
            onLogout={handleLogout}
            username={gameState.username}
            userAvatar={userAvatar}
            dailyGoal={gameState.dailyGoal}
            onDailyGoalChange={handleDailyGoalChange}
          />
        );

      case 'profile':
        return (
          <KawaiiProfileScreen
            onBack={() => setCurrentScreen('menu')}
            username={gameState.username}
            totalSteps={gameState.totalSteps}
            currentAvatar={userAvatar}
            onAvatarChange={handleAvatarChange}
            onUsernameChange={handleUsernameChange}
          />
        );
        
      case 'settings':
        return (
          <KawaiiSettingsScreen
            onBack={() => setCurrentScreen('menu')}
            dailyGoal={gameState.dailyGoal}
            onDailyGoalChange={handleDailyGoalChange}
          />
        );

      case 'notifications':
        return (
          <KawaiiNotificationsScreen
            onBack={() => setCurrentScreen('home')}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
          />
        );

      case 'help':
        return (
          <KawaiiHelpScreen
            onBack={() => setCurrentScreen('menu')}
          />
        );

      case 'permissions':
        return (
          <KawaiiPermissionsScreen
            onBack={() => setCurrentScreen('menu')}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <Toaster position="top-center" />
      <div className="w-full h-screen max-w-[430px] mx-auto relative bg-[#FFF6E8] overflow-hidden">
        {/* Mobile frame simulation */}
        <div className="w-full h-full">
          {renderCurrentScreen()}
        </div>
        
        {/* Notification Popup */}
        <NotificationPopup
          notification={currentPopupNotification}
          onClose={() => setCurrentPopupNotification(null)}
          onAction={() => {
            // Handle action based on notification type
            if (currentPopupNotification) {
              switch (currentPopupNotification.type) {
                case 'hunger_alert':
                case 'energy_alert':
                case 'fun_alert':
                  setCurrentScreen('home');
                  break;
                case 'friend_request':
                case 'friend_activity':
                  setCurrentScreen('friends');
                  break;
                case 'message':
                  setCurrentScreen('messages');
                  break;
                case 'shop_update':
                  setCurrentScreen('shop');
                  break;
                case 'daily_reward':
                  setCurrentScreen('dailyReward');
                  break;
                default:
                  break;
              }
            }
          }}
          autoHideDuration={5000}
        />
        
        {/* Welcome Popup - Show on first launch */}
        {showWelcomePopup && isLoggedIn && (
          <WelcomePopup
            isVisible={showWelcomePopup}
            onClose={() => {
              setShowWelcomePopup(false);
              localStorage.setItem('welcomeShown', 'true');
              // After welcome, show daily reward if it's enabled
              if (showDailyReward) {
                setCurrentScreen('dailyReward');
              }
            }}
          />
        )}
      </div>
    </>
  );
}