/**
 * App Reset Utility
 * 
 * This file provides a function to reset all app data to initial state.
 * Use this for testing or when preparing the app for production deployment.
 */

/**
 * Reset all app data to initial state
 * WARNING: This will delete all user progress!
 */
export function resetAppToInitialState(): void {
  console.log('🔄 Resetting app to initial state...');
  
  // List of all localStorage keys used by the app
  const keysToRemove = [
    'papiStatsTimestamps',      // Stats system (hunger, fun, energy)
    'papiDailyBonusState',      // Daily bonus system
    'notificationSettings',     // Notification preferences
    'papiNotifications',        // Notification history
    'userCountry',              // Selected country
    'countryOnboardingComplete', // Country onboarding status
    'welcomeShown',             // Welcome popup shown status
    'username',                 // User's name
    'userAvatar',               // User's avatar selection
    'dailyGoal',                // Daily step goal
  ];
  
  // Remove all app-specific data
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`   ✓ Removed: ${key}`);
  });
  
  console.log('✅ App reset complete! Reload the page to start fresh.');
}

/**
 * Development-only: Add reset button to console
 * Call this in development to easily reset the app
 */
export function enableDevReset(): void {
  if (typeof window !== 'undefined') {
    (window as any).resetApp = resetAppToInitialState;
    console.log('🛠️ Dev mode: Type "resetApp()" in console to reset all data');
  }
}
