import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Initialize and configure Capacitor plugins
 */
export async function registerCapacitorPlugins() {
  // Only run on native platforms
  if (!Capacitor.isNativePlatform()) {
    console.log('Running in browser mode - Capacitor plugins disabled');
    return;
  }

  try {
    // Configure Status Bar
    if (Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android') {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#FFB7C5' });
    }

    // Hide splash screen after app is ready
    await SplashScreen.hide();

    console.log('Capacitor plugins initialized successfully');
  } catch (error) {
    console.error('Error initializing Capacitor plugins:', error);
  }
}

/**
 * Check if running on native platform
 */
export function isNative(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Get current platform
 */
export function getPlatform(): 'ios' | 'android' | 'web' {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
}
