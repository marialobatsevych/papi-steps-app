# 🔄 Reset Guide - Papi Steps

Quick guide for resetting app data during development and testing.

---

## 🚀 Quick Reset Methods

### Method 1: Console Command (Easiest) ⭐
```javascript
// Open browser console (F12) and type:
resetApp()
```
This will clear all app data and log what was removed.

### Method 2: Manual localStorage Clear
```javascript
// Open browser console and run:
localStorage.clear()
location.reload()
```

### Method 3: DevTools UI
1. Open DevTools (F12)
2. Go to **Application** tab
3. Expand **Local Storage** in left sidebar
4. Right-click on your domain
5. Select **Clear**
6. Reload page (F5)

---

## 📋 What Gets Reset

When you reset the app, these items are cleared:

| Key | Description |
|-----|-------------|
| `papiStatsTimestamps` | Hunger/Fun/Energy timer data |
| `papiDailyBonusState` | Daily bonus claim status |
| `notificationSettings` | Notification preferences |
| `papiNotifications` | Notification history |
| `userCountry` | Selected country |
| `countryOnboardingComplete` | Onboarding completion flag |
| `welcomeShown` | Welcome popup shown status |
| `username` | User's name |
| `userAvatar` | Avatar selection |
| `dailyGoal` | Daily step goal |

---

## 🎯 After Reset

After resetting, you'll see:
- ✅ Login screen
- ✅ Country selection prompt
- ✅ Welcome popup
- ✅ Papi at Birth stage (0 steps)
- ✅ All stats at 100%
- ✅ Empty inventory
- ✅ 0 coins, Level 1

---

## 🧪 Testing Scenarios

### Test Fresh User Experience
```javascript
resetApp()
// Then go through onboarding as a new user
```

### Test Daily Bonus
```javascript
// Reset and login to get first bonus
resetApp()

// Or, to test 24-hour reset:
localStorage.setItem('papiDailyBonusState', 
  JSON.stringify({
    lastBonusTimestamp: Date.now() - (25 * 60 * 60 * 1000)
  })
);
location.reload();
```

### Test Evolution Stages
```javascript
// After login, open console:

// Birth stage (0 steps) - already default
// Baby stage (10,000 steps)
// Teenager stage (20,000 steps)
// Adult stage (30,000 steps)

// Note: Use the "Add Steps" buttons in development mode
```

### Test Stats Depletion
```javascript
// Set stats to nearly empty:
localStorage.setItem('papiStatsTimestamps', 
  JSON.stringify({
    hungerLastReset: Date.now() - (23 * 60 * 60 * 1000),  // 23 hours ago
    funLastReset: Date.now() - (23 * 60 * 60 * 1000),
    energyLastReset: Date.now() - (23 * 60 * 60 * 1000)
  })
);
location.reload();
```

---

## 🔍 Inspect Current State

### Check Current Values
```javascript
// See all app data:
Object.keys(localStorage)
  .filter(key => key.includes('papi') || key.includes('user') || key.includes('notification'))
  .forEach(key => {
    console.log(key, ':', JSON.parse(localStorage.getItem(key)));
  });

// Check game state:
// Look at the React DevTools Components tab
// Find App component → gameState
```

### View Stats Timestamps
```javascript
JSON.parse(localStorage.getItem('papiStatsTimestamps'))
```

### View Daily Bonus State
```javascript
JSON.parse(localStorage.getItem('papiDailyBonusState'))
```

---

## 🛠️ Development Tips

### Enable Dev Mode
The app automatically enables dev mode with `resetApp()` function in console.

### Selective Reset
If you want to reset only specific parts:

```javascript
// Reset only stats:
localStorage.removeItem('papiStatsTimestamps');

// Reset only daily bonus:
localStorage.removeItem('papiDailyBonusState');

// Reset only notifications:
localStorage.removeItem('papiNotifications');
localStorage.removeItem('notificationSettings');

// Then reload:
location.reload();
```

---

## ⚠️ Important Notes

1. **Production vs Development**
   - `resetApp()` is available in all builds
   - Use only for testing, not in production with real users

2. **After Reset**
   - All user progress is lost
   - Cannot be undone
   - User must go through onboarding again

3. **Testing Daily Features**
   - To test daily bonus reset, manually set timestamp to 25+ hours ago
   - Stats timer is real-time based, test by setting old timestamps

4. **State vs LocalStorage**
   - React state persists during session
   - localStorage persists across sessions
   - Reset localStorage to truly start fresh

---

## 🎓 Common Test Scenarios

### Scenario 1: New User Journey
```javascript
resetApp()
// 1. See login screen
// 2. Login
// 3. Select country
// 4. See welcome popup
// 5. Receive daily bonus
// 6. Start with Papi at Birth stage
```

### Scenario 2: Returning User (Same Day)
```javascript
// Just reload without reset
location.reload()
// Should NOT show:
// - Login screen (if logged in before)
// - Country selection
// - Welcome popup
// - Daily bonus
```

### Scenario 3: Returning User (Next Day)
```javascript
// Set last bonus to yesterday:
localStorage.setItem('papiDailyBonusState', 
  JSON.stringify({
    lastBonusTimestamp: Date.now() - (25 * 60 * 60 * 1000)
  })
);
location.reload();
// Should show daily bonus screen
```

---

## 📞 Quick Reference

| Goal | Command |
|------|---------|
| Full reset | `resetApp()` |
| Clear all | `localStorage.clear()` |
| View data | `Object.keys(localStorage)` |
| Reload page | `location.reload()` |
| Check state | React DevTools → Components → App |

---

**Happy Testing!** 🧪✨

Use `resetApp()` whenever you need a clean slate during development.
