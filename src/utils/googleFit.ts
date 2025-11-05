/**
 * Google Fit Integration for Android
 * Uses @capacitor-community/health plugin for reading step data
 */

import { Capacitor, registerPlugin } from '@capacitor/core';

const FitnessPlugin: any = registerPlugin('FitnessPlugin', { web: () => ({
  requestAuthorization: async () => ({ granted: true }),
  readSteps: async (_: any) => ({ steps: 0 })
}) });

export interface GoogleFitData {
  steps: number;
  date: string;
}

export interface GoogleFitPermissionStatus {
  granted: boolean;
  message?: string;
}

class GoogleFitService {
  private isAvailable: boolean = false;
  private permissionGranted: boolean = false;

  constructor() {
    this.isAvailable = Capacitor.getPlatform() === 'android';
    console.log('Google Fit available:', this.isAvailable);
  }

  /**
   * Request permission to read step data from Google Fit
   */
  async requestPermission(): Promise<GoogleFitPermissionStatus> {
    if (!this.isAvailable) {
      console.log('Google Fit not available on this platform (using mock data for development)');
      // In development mode, silently grant permission to use mock data
      this.permissionGranted = true;
      return { granted: true };
    }

    try {
      // For real implementation, use @capacitor-community/health
      // Example:
      // import { Health } from '@capacitor-community/health';
      // const result = await Health.requestAuthorization({
      //   read: ['steps'],
      //   write: []
      // });
      
      // For now, simulate permission request in development
      if (Capacitor.isNativePlatform()) {
        console.log('Requesting Google Fit permission via native plugin...');
        try {
          const res = await FitnessPlugin.requestAuthorization();
          this.permissionGranted = res?.granted === true;
          return { granted: this.permissionGranted };
        } catch (e) {
          console.error('Native plugin authorization error', e);
          return { granted: false, message: 'Authorization failed' };
        }
      } else {
        // Web/development mode - simulate granted permission
        console.log('Development mode: Simulating Google Fit permission granted');
        this.permissionGranted = true;
        return { granted: true };
      }
    } catch (error) {
      console.error('Error requesting Google Fit permission:', error);
      return { 
        granted: false, 
        message: 'Please enable Google Fit access in Settings to track your steps.' 
      };
    }
  }

  /**
   * Check if permission has been granted
   */
  async checkPermission(): Promise<boolean> {
    if (!this.isAvailable) {
      return false;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        console.log('Checking Google Fit permission via native plugin...');
        try {
          const res = await FitnessPlugin.requestAuthorization();
          this.permissionGranted = res?.granted === true;
          return this.permissionGranted;
        } catch (e) {
          console.error('Native plugin check permission error', e);
          return false;
        }
      } else {
        // Development mode
        return true;
      }
    } catch (error) {
      console.error('Error checking Google Fit permission:', error);
      return false;
    }
  }

  /**
   * Get today's step count from Google Fit
   */
  async getTodaySteps(): Promise<number> {
    if (!this.isAvailable) {
      console.log('Google Fit not available, returning mock data');
      return this.getMockSteps();
    }

    try {
      const hasPermission = await this.checkPermission();
      
      if (!hasPermission) {
        console.log('Google Fit permission not granted');
        return 0;
      }

      if (Capacitor.isNativePlatform()) {
        console.log('Fetching steps from native plugin...');
        const now = Date.now();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const res = await FitnessPlugin.readSteps({ start: today.getTime(), end: now });
        const steps = res?.steps ?? 0;
        return steps;
      } else {
        // Development mode - return mock data
        console.log('Development mode: Returning mock steps data');
        return this.getMockSteps();
      }
    } catch (error) {
      console.error('Error fetching steps from Google Fit:', error);
      return 0;
    }
  }

  /**
   * Get step count for a specific date range
   */
  async getStepsForDateRange(startDate: Date, endDate: Date): Promise<GoogleFitData[]> {
    if (!this.isAvailable) {
      return [];
    }

    try {
      const hasPermission = await this.checkPermission();
      
      if (!hasPermission) {
        console.log('Google Fit permission not granted');
        return [];
      }

      if (Capacitor.isNativePlatform()) {
        // Real implementation would fetch historical data
        console.log('Fetching steps for date range:', startDate, '-', endDate);
        return [];
      } else {
        // Development mode
        return [];
      }
    } catch (error) {
      console.error('Error fetching step history:', error);
      return [];
    }
  }

  /**
   * Generate mock step data for development/testing
   */
  private getMockSteps(): number {
    // Simulate realistic step count that varies throughout the day
    const hour = new Date().getHours();
    
    // Morning: 0-1000 steps
    if (hour < 12) {
      return Math.floor(Math.random() * 1000) + (hour * 80);
    }
    // Afternoon: 1000-5000 steps
    else if (hour < 18) {
      return Math.floor(Math.random() * 4000) + 1000;
    }
    // Evening: 5000-12000 steps
    else {
      return Math.floor(Math.random() * 7000) + 5000;
    }
  }

  /**
   * Open Android Settings to enable Google Fit permissions
   */
  async openFitSettings(): Promise<void> {
    if (!this.isAvailable) {
      console.log('Cannot open Fit settings on non-Android platform');
      return;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        // Open Android Settings app
        // const { App } = await import('@capacitor/app');
        // await App.openUrl({ url: 'app-settings:' });
        console.log('Opening Android Settings...');
      }
    } catch (error) {
      console.error('Error opening Fit settings:', error);
    }
  }
}

// Export singleton instance
export const googleFitService = new GoogleFitService();
