# 📱 Preparation for Installation - Papi Steps

This document describes the initial state of the app ready for production deployment.

## ✅ Initial State Checklist

All data has been reset to the initial state for new users:

### 📊 Game State (Fresh Start)
- **Daily Steps**: `0` (will be synced from Google Fit)
- **Total Steps**: `0` (Papi starts at Birth stage)
- **Coins**: `0` (earned through daily goals and gameplay)
- **Level**: `1` (increases with total steps)
- **Daily Goal**: `10,000 steps` (configurable in Settings)

### 🐾 Papi Character
- **Evolution Stage**: Birth (0 steps)
- **Stats**: All start at 100/100
  - Hunger: 100
  - Fun: 100  
  - Energy: 100
- **Emotional State**: Neutral
- Stats decrease over 24 real hours (continues even when app is closed)

### 🎒 Inventory
- **Starting Inventory**: Empty
- Users receive items through:
  - Daily Bonus (1 food + 1 toy, once per 24 hours)
  - Shop purchases (not implemented yet)

### 🎁 Daily Bonus System
- **Status**: Ready to claim
- New users will receive their first daily bonus on first login
- Bonus includes:
  - 1 random food item (from 9 available)
  - 1 random toy item (from 6 available)

### 👤 User Profile
- **Username**: "Papi Friend" (default, user can change)
- **Avatar**: Paw icon (default, user can select from 7 icons)
- **Country**: Not set (will be asked on first login)

### 🔔 Notifications
- **Settings**: All enabled by default
  - All Notifications: ON
  - Papi Status: ON
  - Daily Reminders: ON
- **Notification History**: Empty

### 🎨 Customization
- **Wallpapers**: None owned yet
- **Active Wallpaper**: Default gradient background

## 🔄 How to Reset Data (Development Only)

If you need to reset the app to initial state during development:

### Method 1: Using Console
```javascript
// Open browser console and run:
resetApp()
```

### Method 2: Manual Reset
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Clear all items for your domain
4. Reload the page

### Method 3: Clear Browser Data
1. Open browser settings
2. Clear browsing data
3. Select "Cookies and site data"
4. Reload the app

## 📋 First User Experience Flow

1. **Welcome Screen** → Login/Create Account
2. **Country Selection** → Choose country (flag picker)
3. **Welcome Popup** → Introduction to Papi Steps
4. **Home Screen** → Meet Papi (Birth stage)
5. **Daily Bonus** → Receive first daily reward
6. **Google Fit Permission** → Request health data access
7. **Location Permission** → Request for friends feature
8. **Start Walking** → Begin earning steps!

## 🎯 Evolution Milestones

| Stage | Steps Required | Description |
|-------|---------------|-------------|
| 🥚 Birth | 0 - 10,000 | Cute baby Papi |
| 👶 Baby | 10,001 - 20,000 | Growing Papi |
| 🧒 Teenager | 20,001 - 30,000 | Active Papi |
| 🐕 Adult | 30,001+ | Fully grown Papi |

After reaching Adult stage (30,000 steps), the system switches to daily goals (3,000-30,000 steps).

## 💰 Coin System

### Earning Coins
- **Daily Goal**: 300 coins per day (when reaching daily step goal)
- **Future Features**: Shop purchases, achievements, mini-games

### Spending Coins (Not Yet Implemented)
- Shop items
- Wallpapers
- Accessories

## 🔧 Technical Details

### LocalStorage Keys
The app uses the following localStorage keys:
- `papiStatsTimestamps` - Stats decay timestamps
- `papiDailyBonusState` - Daily bonus claim status
- `notificationSettings` - User notification preferences
- `papiNotifications` - Notification history
- `userCountry` - Selected country code
- `countryOnboardingComplete` - Onboarding completion flag
- `welcomeShown` - Welcome popup shown flag
- `username` - User's display name
- `userAvatar` - Selected avatar icon
- `dailyGoal` - Daily step goal (3000-30000)

### Initial Values in App.tsx
```typescript
const [gameState, setGameState] = useState(() => ({
  steps: 0,                    // Daily steps
  totalSteps: 0,               // Lifetime steps
  coins: 0,                    // Currency
  level: 1,                    // User level
  dailyGoal: 10000,            // Step goal
  dailyGoalReached: false,     // Today's goal status
  dailyGoalRewardClaimed: false // Reward claim status
}));
```

## 📱 Platform Integration

### Google Fit (Android)
- **Permission**: Requested on first login
- **Sync Frequency**: Every 5 minutes when app is open
- **Data**: Daily step count, total steps

### Location Services
- **Permission**: Requested on first login
- **Usage**: Friends nearby feature (not implemented yet)
- **Privacy**: Only used when user opts in

## 🎨 Design System

- **Color Palette**: Kawaii pastels
  - Pink: #FFB7C5
  - Lavender: #C8B8FF
  - Mint: #B8E3FF
  - Yellow: #FFD66C
- **Font**: Nunito (Google Fonts)
- **Border Radius**: 16-24px
- **Shadows**: Soft, multi-layered

## 🚀 Ready for Deployment

The app is now in a clean state ready for:
- ✅ First-time user testing
- ✅ Production deployment
- ✅ App store submission
- ✅ Beta testing program

All user data will be created fresh on each device/browser when users first launch the app.

---

**Last Updated**: November 2024  
**Status**: Ready for Installation ✨
