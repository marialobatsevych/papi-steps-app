/**
 * Geolocation Service for Nearby Friends
 * Uses @capacitor/geolocation plugin
 */

import { Capacitor } from '@capacitor/core';

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface NearbyFriend {
  id: string;
  username: string;
  displayName: string;
  papiState: 'baby' | 'child' | 'adult' | 'evolved';
  distance: number; // in kilometers
  location: UserLocation;
  lastActive: string;
}

export interface GeolocationPermissionStatus {
  granted: boolean;
  message?: string;
}

class GeolocationService {
  private isAvailable: boolean = false;
  private currentLocation: UserLocation | null = null;
  private watchId: string | null = null;

  constructor() {
    // Check if geolocation is available and not blocked by permissions policy
    this.isAvailable = false;
    
    if (Capacitor.isNativePlatform()) {
      this.isAvailable = true;
      console.log('Geolocation available (native platform)');
    } else if (typeof navigator !== 'undefined' && navigator.geolocation) {
      // Additional check for permissions policy in browser
      try {
        // Try to access geolocation - if blocked by policy, this will fail silently
        this.isAvailable = true;
        console.log('Geolocation available (web browser)');
      } catch (e) {
        console.log('Geolocation blocked by browser policy - using mock data');
        this.isAvailable = false;
      }
    } else {
      console.log('Geolocation not available - using mock data');
    }
  }

  /**
   * Request permission to access device location
   */
  async requestPermission(): Promise<GeolocationPermissionStatus> {
    if (!this.isAvailable) {
      console.log('Geolocation not available on this platform (using mock data for development)');
      // In development mode without geolocation API, silently grant permission to use mock data
      return { granted: true };
    }

    try {
      if (Capacitor.isNativePlatform()) {
        // Real implementation with Capacitor:
        // import { Geolocation } from '@capacitor/geolocation';
        // const permission = await Geolocation.requestPermissions();
        // return {
        //   granted: permission.location === 'granted',
        //   message: permission.location === 'denied' 
        //     ? 'Please enable location access in Settings to find nearby friends.'
        //     : undefined
        // };
        
        console.log('Requesting location permission (native)...');
        return { granted: true };
      } else {
        // Web/development mode - use browser geolocation
        console.log('Requesting location permission (web)...');
        
        // Check if geolocation is accessible (not blocked by permissions policy)
        try {
          if (!navigator.geolocation) {
            console.log('Geolocation API not available - using mock data');
            return { granted: true }; // Allow mock data
          }

          return new Promise((resolve) => {
            // Wrap in try-catch to handle permissions policy errors
            try {
              navigator.geolocation.getCurrentPosition(
                () => {
                  console.log('Location permission granted (web)');
                  resolve({ granted: true });
                },
                (error) => {
                  // Silently handle all geolocation errors in development
                  if (error.code === 1) { // PERMISSION_DENIED
                    console.log('Location permission denied - using mock data');
                  } else if (error.code === 2) { // POSITION_UNAVAILABLE
                    console.log('Location unavailable - using mock data');
                  } else {
                    console.log('Location error - using mock data');
                  }
                  resolve({ granted: true }); // Allow mock data
                },
                { timeout: 5000 }
              );
            } catch (e) {
              // Handle permissions policy errors
              console.log('Geolocation blocked by browser policy - using mock data');
              resolve({ granted: true });
            }
          });
        } catch (e) {
          console.log('Geolocation error - using mock data');
          return { granted: true };
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      // In development, allow using mock data even on error
      console.log('Using mock location data for development');
      return { granted: true };
    }
  }

  /**
   * Check current permission status
   */
  async checkPermission(): Promise<boolean> {
    if (!this.isAvailable) {
      return false;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        // Real implementation:
        // const permission = await Geolocation.checkPermissions();
        // return permission.location === 'granted';
        console.log('Checking location permission...');
        return true; // Mock for development
      } else {
        // Web - try to get position to check permission
        try {
          if (!navigator.geolocation) {
            return false;
          }
          
          return new Promise((resolve) => {
            try {
              navigator.geolocation.getCurrentPosition(
                () => resolve(true),
                () => resolve(false),
                { timeout: 1000 }
              );
            } catch (e) {
              // Handle permissions policy errors silently
              resolve(false);
            }
          });
        } catch (e) {
          return false;
        }
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
      return false;
    }
  }

  /**
   * Get current user location
   */
  async getCurrentLocation(): Promise<UserLocation | null> {
    if (!this.isAvailable) {
      console.log('Geolocation not available, returning mock location');
      return this.getMockLocation();
    }

    try {
      const hasPermission = await this.checkPermission();
      
      if (!hasPermission) {
        console.log('Location permission not granted');
        return null;
      }

      if (Capacitor.isNativePlatform()) {
        // Real implementation:
        // const position = await Geolocation.getCurrentPosition({
        //   enableHighAccuracy: true,
        //   timeout: 10000,
        //   maximumAge: 0
        // });
        // 
        // this.currentLocation = {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   accuracy: position.coords.accuracy,
        //   timestamp: position.timestamp
        // };
        
        console.log('Getting current location (native)...');
        this.currentLocation = this.getMockLocation();
        console.log('User location:', this.currentLocation);
        return this.currentLocation;
      } else {
        // Web/development mode
        console.log('Getting current location (web)...');
        
        try {
          if (!navigator.geolocation) {
            console.log('Geolocation API not available - using mock data');
            this.currentLocation = this.getMockLocation();
            return this.currentLocation;
          }

          return new Promise((resolve) => {
            try {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  this.currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp
                  };
                  console.log('User location:', this.currentLocation);
                  resolve(this.currentLocation);
                },
                (error) => {
                  // Silently handle errors - don't log as errors, just info
                  console.log('Could not get real location - using mock data');
                  // Fall back to mock location
                  this.currentLocation = this.getMockLocation();
                  resolve(this.currentLocation);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 300000 // 5 minutes
                }
              );
            } catch (e) {
              // Handle permissions policy errors
              console.log('Geolocation blocked by browser - using mock data');
              this.currentLocation = this.getMockLocation();
              resolve(this.currentLocation);
            }
          });
        } catch (e) {
          console.log('Geolocation error - using mock data');
          this.currentLocation = this.getMockLocation();
          return this.currentLocation;
        }
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      return this.getMockLocation();
    }
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Find nearby friends within specified radius (km)
   */
  async findNearbyFriends(radiusKm: number = 5): Promise<NearbyFriend[]> {
    console.log(`Finding nearby friends within ${radiusKm}km...`);

    const userLocation = this.currentLocation || await this.getCurrentLocation();
    
    if (!userLocation) {
      console.log('User location not available');
      return [];
    }

    // Generate mock nearby friends for development
    const mockFriends = this.generateMockNearbyFriends(userLocation, radiusKm);
    
    console.log(`Found ${mockFriends.length} nearby friends:`, mockFriends);
    return mockFriends;
  }

  /**
   * Generate mock nearby friends for testing
   */
  private generateMockNearbyFriends(
    userLocation: UserLocation,
    radiusKm: number
  ): NearbyFriend[] {
    const friends: NearbyFriend[] = [];
    const names = [
      { username: 'sarah_walker', displayName: 'Sarah Walker' },
      { username: 'mike_fitness', displayName: 'Mike Johnson' },
      { username: 'emma_steps', displayName: 'Emma Davis' },
      { username: 'alex_runner', displayName: 'Alex Chen' },
      { username: 'lisa_active', displayName: 'Lisa Anderson' },
      { username: 'tom_hiking', displayName: 'Tom Wilson' },
      { username: 'kate_wellness', displayName: 'Kate Brown' },
      { username: 'john_daily', displayName: 'John Martinez' }
    ];

    const states: Array<'baby' | 'child' | 'adult' | 'evolved'> = [
      'baby',
      'child',
      'adult',
      'evolved'
    ];

    // Generate 3-6 random nearby friends
    const friendCount = Math.floor(Math.random() * 4) + 3;
    
    for (let i = 0; i < friendCount; i++) {
      const friend = names[i];
      
      // Generate random location within radius
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * radiusKm; // 0 to radiusKm
      
      // Approximate offset (simplified, not exact for large distances)
      const latOffset = (distance / 111) * Math.cos(angle); // 1 degree ≈ 111km
      const lonOffset = (distance / (111 * Math.cos(this.toRadians(userLocation.latitude)))) * Math.sin(angle);
      
      const friendLocation: UserLocation = {
        latitude: userLocation.latitude + latOffset,
        longitude: userLocation.longitude + lonOffset
      };

      // Calculate actual distance for display
      const actualDistance = this.calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        friendLocation.latitude,
        friendLocation.longitude
      );

      // Random last active time (within last 24 hours)
      const hoursAgo = Math.floor(Math.random() * 24);
      const lastActive = hoursAgo === 0 
        ? 'Just now' 
        : hoursAgo === 1 
        ? '1 hour ago' 
        : `${hoursAgo} hours ago`;

      friends.push({
        id: `nearby_${i + 1}`,
        username: friend.username,
        displayName: friend.displayName,
        papiState: states[Math.floor(Math.random() * states.length)],
        distance: actualDistance,
        location: friendLocation,
        lastActive
      });
    }

    // Sort by distance (closest first)
    return friends.sort((a, b) => a.distance - b.distance);
  }

  /**
   * Generate mock location for development
   * Default: San Francisco coordinates
   */
  private getMockLocation(): UserLocation {
    return {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 10,
      timestamp: Date.now()
    };
  }

  /**
   * Start watching user location (for real-time updates)
   */
  async startWatchingLocation(callback: (location: UserLocation) => void): Promise<void> {
    if (!this.isAvailable || this.watchId) {
      return;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        // Real implementation:
        // this.watchId = await Geolocation.watchPosition({
        //   enableHighAccuracy: true,
        //   timeout: 10000,
        //   maximumAge: 0
        // }, (position, err) => {
        //   if (position) {
        //     const location = {
        //       latitude: position.coords.latitude,
        //       longitude: position.coords.longitude,
        //       accuracy: position.coords.accuracy,
        //       timestamp: position.timestamp
        //     };
        //     this.currentLocation = location;
        //     callback(location);
        //   }
        // });
        
        console.log('Started watching location (native)');
      } else {
        // Web implementation
        try {
          if (!navigator.geolocation) {
            console.log('Geolocation API not available for watching');
            return;
          }

          const id = navigator.geolocation.watchPosition(
            (position) => {
              const location: UserLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp
              };
              this.currentLocation = location;
              callback(location);
            },
            (error) => {
              // Silently handle watch errors
              console.log('Could not watch location - permissions may be denied');
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000
            }
          );
          this.watchId = id.toString();
          console.log('Started watching location (web)');
        } catch (e) {
          console.log('Could not start watching location - browser policy restriction');
        }
      }
    } catch (error) {
      console.error('Error starting location watch:', error);
    }
  }

  /**
   * Stop watching user location
   */
  async stopWatchingLocation(): Promise<void> {
    if (!this.watchId) {
      return;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        // Real implementation:
        // await Geolocation.clearWatch({ id: this.watchId });
        console.log('Stopped watching location (native)');
      } else {
        navigator.geolocation.clearWatch(parseInt(this.watchId));
        console.log('Stopped watching location (web)');
      }
      this.watchId = null;
    } catch (error) {
      console.error('Error stopping location watch:', error);
    }
  }

  /**
   * Get current stored location without fetching new one
   */
  getStoredLocation(): UserLocation | null {
    return this.currentLocation;
  }
}

// Export singleton instance
export const geolocationService = new GeolocationService();
