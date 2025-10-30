# Capacitor Integration Guide - Papi Steps

This guide explains how to integrate Apple Health (HealthKit) and Geolocation services for iOS using Capacitor.

## Overview

The app now includes:
1. **Apple Health Integration** - Read daily step count from HealthKit
2. **Geolocation Services** - Find nearby Papi Steps users within 5km radius

## Architecture

### Services Created

#### 1. HealthKit Service (`/utils/healthKit.ts`)
- Requests permission to read step data from Apple Health
- Fetches today's step count on app startup
- Updates steps every 5 minutes
- Provides mock data for development/testing

#### 2. Geolocation Service (`/utils/geolocation.ts`)
- Requests location permission
- Gets current user coordinates
- Finds nearby friends within specified radius (default 5km)
- Calculates distance using Haversine formula
- Provides mock nearby friends for development/testing

## Required Capacitor Plugins

To make the app work on iOS, you need to install these Capacitor plugins:

### 1. Core Capacitor Packages
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
```

### 2. Health Plugin (for Apple Health)
```bash
npm install @capacitor-community/health
```

### 3. Geolocation Plugin
```bash
npm install @capacitor/geolocation
```

## iOS Configuration

### 1. Initialize Capacitor Project

```bash
npx cap init "Papi Steps" "com.papisteps.app"
npx cap add ios
```

### 2. Configure Info.plist

Add these keys to your iOS `Info.plist` file:

```xml
<!-- HealthKit -->
<key>NSHealthShareUsageDescription</key>
<string>Papi Steps needs access to your step count to help Papi grow with your daily walking activity.</string>

<key>NSHealthUpdateUsageDescription</key>
<string>Papi Steps needs to update your health data.</string>

<!-- Location -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Papi Steps needs your location to find nearby friends and connect with other walkers.</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Papi Steps needs your location to find nearby friends and connect with other walkers.</string>

<!-- Background Modes (optional, for background step counting) -->
<key>UIBackgroundModes</key>
<array>
    <string>fetch</string>
    <string>processing</string>
</array>
```

### 3. Enable HealthKit Capability

In Xcode:
1. Open your iOS project: `npx cap open ios`
2. Select your app target
3. Go to "Signing & Capabilities"
4. Click "+ Capability"
5. Add "HealthKit"

### 4. Configure Entitlements

Your `App.entitlements` should include:

```xml
<key>com.apple.developer.healthkit</key>
<true/>
<key>com.apple.developer.healthkit.access</key>
<array>
    <string>health-records</string>
</array>
```

## Implementation Details

### App Initialization Flow

1. **User logs in** → `App.tsx` triggers service initialization
2. **HealthKit permission requested** → User sees iOS system dialog
3. **Location permission requested** → User sees iOS system dialog
4. **Initial data fetched**:
   - Today's steps from HealthKit
   - Current location coordinates
5. **Periodic updates**:
   - Steps update every 5 minutes
   - Location can be refreshed manually

### Data Flow

```
┌─────────────────┐
│  Apple Health   │
│   (HealthKit)   │
└────────┬────────┘
         │ Read Steps
         ▼
┌─────────────────┐      ┌──────────────────┐
│ healthKitService│─────▶│   App.tsx        │
└─────────────────┘      │  gameState.steps │
                         └──────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ KawaiiHomeScreen │
                         │  Daily Progress  │
                         └──────────────────┘
```

```
┌─────────────────┐
│  iOS Location   │
│    Services     │
└────────┬────────┘
         │ Get Coordinates
         ▼
┌─────────────────────┐    ┌──────────────────────┐
│ geolocationService  │───▶│ KawaiiNearestPeople  │
│ findNearbyFriends() │    │      Screen          │
└─────────────────────┘    └──────────────────────┘
```

## Development Mode

Both services include mock data for development:

### Mock Steps Data
- Returns realistic step counts based on time of day
- Morning (0-12h): 0-1000 steps
- Afternoon (12-18h): 1000-5000 steps
- Evening (18-24h): 5000-12000 steps

### Mock Nearby Friends
- Generates 3-6 random nearby users
- Random distances within 5km radius
- Random Papi evolution states (baby, child, adult, evolved)
- Different usernames and display names

## Console Logs for Debugging

The services include comprehensive logging:

```javascript
// HealthKit logs
console.log('HealthKit available:', isAvailable);
console.log('Requesting HealthKit permission...');
console.log('Steps data loaded:', steps);

// Geolocation logs
console.log('Geolocation available:', isAvailable);
console.log('User location:', coords);
console.log('Finding nearby friends within 5km...');
console.log('Found X nearby friends:', friends);
```

## Testing Checklist

### Before iOS Export

- [ ] All Capacitor packages installed
- [ ] Info.plist configured with permission descriptions
- [ ] HealthKit capability enabled in Xcode
- [ ] App.entitlements configured

### After iOS Build

- [ ] Permission dialogs appear on first launch
- [ ] Steps count updates from Apple Health
- [ ] Location permission requested
- [ ] Nearby friends display with distances
- [ ] Console logs show data flow
- [ ] Permission denied alerts work correctly

## Error Handling

### HealthKit Permission Denied
```
"Please enable Apple Health access in Settings to track your steps."
```
- Shows toast notification
- Logs error to console
- Steps remain at 0 or previous value

### Location Permission Denied
```
"Please enable location access to find nearby friends."
```
- Shows toast notification
- Nearby friends list remains empty
- Can retry from Permissions screen

## Production Deployment

### Environment Detection
The services automatically detect the platform:
- `Capacitor.isNativePlatform()` → Real iOS device
- Otherwise → Web/development mode with mock data

### Real Implementation Notes

In `healthKit.ts` and `geolocation.ts`, replace mock implementations with real plugin calls:

```typescript
// Example: Real HealthKit implementation
import { Health } from '@capacitor-community/health';

const result = await Health.queryHKitSampleType({
  sampleName: 'HKQuantityTypeIdentifierStepCount',
  startDate: today.toISOString(),
  endDate: tomorrow.toISOString(),
  limit: 1000
});
```

```typescript
// Example: Real Geolocation implementation
import { Geolocation } from '@capacitor/geolocation';

const position = await Geolocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
});
```

## Build and Export

### 1. Build Web Assets
```bash
npm run build
```

### 2. Sync with iOS
```bash
npx cap sync ios
```

### 3. Open in Xcode
```bash
npx cap open ios
```

### 4. Test on Device
- Connect your iPhone
- Select your device in Xcode
- Click Run (⌘R)
- Accept permission dialogs
- Check Health app for step data
- Check Settings > Privacy for permissions

## Troubleshooting

### Steps Not Updating
1. Check HealthKit permission in Settings > Privacy > Health
2. Ensure Health app has step data
3. Check Xcode console for error logs
4. Verify Info.plist has correct keys

### Location Not Working
1. Check Location permission in Settings > Privacy > Location Services
2. Ensure location services enabled on device
3. Check network connectivity
4. Verify Info.plist has correct keys

### Build Errors
1. Clean build folder: Product > Clean Build Folder
2. Delete DerivedData: `rm -rf ~/Library/Developer/Xcode/DerivedData`
3. Reinstall pods: `cd ios/App && pod install`
4. Sync Capacitor: `npx cap sync ios`

## Future Enhancements

### Planned Features
- [ ] Background step counting
- [ ] Push notifications for daily goals
- [ ] Weekly step history graph
- [ ] Friend challenges based on location
- [ ] Activity sharing
- [ ] Apple Watch integration

### Backend Integration (Future)
- Store user locations in database
- Real-time nearby user updates
- Privacy controls for location sharing
- Friend matching algorithm
- Activity leaderboards

## Security & Privacy

### Data Handling
- **Steps data**: Read-only, never written back to Health
- **Location data**: Only used for nearby friend feature
- **No data sharing**: All data stays on device unless user explicitly shares
- **Privacy first**: Users can deny permissions and app still works (with limited features)

### GDPR Compliance
- Clear permission descriptions
- Data minimization (only request what's needed)
- User control (can revoke permissions anytime)
- Transparent data usage

## Support

For issues or questions:
1. Check console logs for error messages
2. Verify all configuration steps completed
3. Test on real iOS device (not simulator for HealthKit)
4. Check Capacitor documentation: https://capacitorjs.com/docs

---

**Last Updated**: December 2024
**Capacitor Version**: 6.x
**iOS Target**: 13.0+
