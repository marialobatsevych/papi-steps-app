# Capacitor Integration Guide - Papi Steps (Android)

This guide explains how to integrate Google Fit and Geolocation services for Android using Capacitor.

## Overview

The app now includes:
1. **Google Fit Integration** - Read daily step count from Google Fit
2. **Geolocation Services** - Find nearby Papi Steps users within 5km radius

---

## Services Created

### Services Created

#### 1. Google Fit Service (`/utils/googleFit.ts`)
- Requests permission to read step data from Google Fit
- Fetches today's step count on app startup
- Updates steps every 5 minutes
- Syncs total lifetime steps for character evolution

#### 2. Geolocation Service (`/utils/geolocation.ts`)
- Requests location permission
- Gets current user coordinates
- Finds nearby users within specified radius (5km)
- Updates location periodically

---

## Installation Steps

### 1. Install Capacitor Core
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

### 2. Health Plugin (for Google Fit)
```bash
npm install @capacitor-community/health
```

### 3. Geolocation Plugin
```bash
npm install @capacitor/geolocation
```

### 4. Add Android Platform
```bash
npm install @capacitor/android
npx cap add android
```

---

## Android Configuration

### 1. Update `android/app/src/main/AndroidManifest.xml`

Add permissions:

```xml
<!-- Google Fit / Health Data -->
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />

<!-- Location Services -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />

<!-- Internet -->
<uses-permission android:name="android.permission.INTERNET" />
```

### 2. Configure Google Fit API

In your `android/app/build.gradle`:

```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-fitness:21.1.0'
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
}
```

### 3. Setup OAuth 2.0 Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Fitness API**
4. Configure OAuth 2.0 consent screen
5. Add scopes:
   - `https://www.googleapis.com/auth/fitness.activity.read`
   - `https://www.googleapis.com/auth/fitness.location.read`
6. Create OAuth 2.0 credentials (Android client)
7. Add your app's **SHA-1 fingerprint**

Get SHA-1 fingerprint:
```bash
cd android
./gradlew signingReport
```

### 4. Add OAuth Client ID to strings.xml

In `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">Papi Steps</string>
    <string name="server_client_id">YOUR_OAUTH_CLIENT_ID.apps.googleusercontent.com</string>
</resources>
```

---

## How It Works

### App Flow

1. **User logs in** → `App.tsx` triggers service initialization
2. **Google Fit permission requested** → User sees Android system dialog
3. **Location permission requested** → User sees Android system dialog
4. **Initial data fetched**:
   - Today's steps from Google Fit
   - Current location coordinates
5. **Periodic updates**:
   - Steps update every 5 minutes
   - Location updates on user movement

### Architecture Diagram

```
┌─────────────────┐
│   Google Fit    │
│   (Android)     │
└────────┬────────┘
         │ Read Steps
         ▼
┌─────────────────┐      ┌──────────────────┐
│ googleFitService│─────▶│   App.tsx        │
└─────────────────┘      │  gameState.steps │
                         └──────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  HomeScreen      │
                         │  (Papi grows!)   │
                         └──────────────────┘

┌─────────────────┐
│ GPS / Network   │
└────────┬────────┘
         │ Get Location
         ▼
┌─────────────────┐      ┌──────────────────┐
│geolocationServ. │─────▶│  FriendsScreen   │
└─────────────────┘      │  (Nearby users)  │
                         └──────────────────┘
```

---

## Code Integration

### App.tsx - Service Initialization

```typescript
import { googleFitService } from './utils/googleFit';
import { geolocationService } from './utils/geolocation';

// On app start (after login)
useEffect(() => {
  if (!isLoggedIn) return;

  const initializeServices = async () => {
    console.log('Initializing Google Fit and Location services...');
    
    // Request Google Fit permission
    const healthPermission = await googleFitService.requestPermission();
    if (healthPermission.granted) {
      const todaySteps = await googleFitService.getTodaySteps();
      setGameState(prev => ({ ...prev, steps: todaySteps }));
    }

    // Request Location permission
    const locationPermission = await geolocationService.requestPermission();
    if (locationPermission.granted) {
      const position = await geolocationService.getCurrentPosition();
      console.log('Current location:', position);
    }
  };

  initializeServices();

  // Update steps every 5 minutes
  const interval = setInterval(async () => {
    const steps = await googleFitService.getTodaySteps();
    setGameState(prev => ({ ...prev, steps }));
  }, 5 * 60 * 1000);

  return () => clearInterval(interval);
}, [isLoggedIn]);
```

---

## Development Mode

### Browser/Web Development

When running in browser, services automatically:
- ✅ Return **mock step data** (simulates realistic daily progression)
- ✅ Return **mock location** (simulates user in San Francisco)
- ✅ **No error messages** shown to user
- ✅ Console logs clearly indicate "development mode"

### Logs Example:

```javascript
// Google Fit logs
console.log('Google Fit available:', isAvailable);
console.log('Requesting Google Fit permission...');
console.log('Steps data loaded:', steps);

// Location logs
console.log('Geolocation available:', isAvailable);
console.log('Requesting location permission (web)...');
console.log('Current position:', { lat, lng });
```

---

## Testing Checklist

### Pre-Build
- [ ] All Capacitor packages installed
- [ ] AndroidManifest.xml configured with permissions
- [ ] Google Cloud Console project created
- [ ] Fitness API enabled
- [ ] OAuth 2.0 credentials configured
- [ ] SHA-1 fingerprint added

### Build & Deploy
- [ ] Run `npx cap sync` to sync web assets
- [ ] Open Android Studio: `npx cap open android`
- [ ] Test on emulator
- [ ] Test on real Android device
- [ ] Verify Google Fit permission dialog appears
- [ ] Verify location permission dialog appears
- [ ] Verify steps sync correctly
- [ ] Verify nearby users feature works

### Production
- [ ] Sign app with release keychain
- [ ] Update OAuth client with release SHA-1
- [ ] Test on multiple Android versions (8.0+)
- [ ] Verify background step updates work
- [ ] Test with users who have/haven't installed Google Fit

---

## Common Issues & Solutions

### Issue 1: "SIGN_IN_REQUIRED" Error
**Solution:** Make sure OAuth 2.0 client ID is correctly configured in Google Cloud Console and `strings.xml`.

### Issue 2: No Steps Data
**Solution:** 
- User must have Google Fit app installed
- User must grant "Physical Activity" permission
- Verify Fitness API is enabled in Google Cloud Console

### Issue 3: Permission Denied
**Solution:** 
- Check AndroidManifest.xml has correct permissions
- For Android 10+, request `ACCESS_BACKGROUND_LOCATION` separately
- Verify user granted permissions in Settings

### Issue 4: Location Not Working
**Solution:**
- Enable Location Services on device
- Grant Location permission in app settings
- Check if GPS is available (not just network)

---

## Additional Resources

### Documentation
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Google Fit REST API](https://developers.google.com/fit/rest)
- [@capacitor-community/health](https://github.com/capacitor-community/health)
- [Capacitor Geolocation Plugin](https://capacitorjs.com/docs/apis/geolocation)

### Google Fit Setup
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Fitness API Scopes](https://developers.google.com/fit/android/authorization)

---

## Next Steps

1. ✅ **Implemented:** Google Fit service wrapper
2. ✅ **Implemented:** Geolocation service wrapper
3. ✅ **Implemented:** Development mode with mock data
4. 🔜 **TODO:** Test on real Android device
5. 🔜 **TODO:** Configure production OAuth credentials
6. 🔜 **TODO:** Implement background sync
7. 🔜 **TODO:** Add step goal notifications
8. 🔜 **TODO:** Publish to Google Play Store

---

## File Structure

```
/utils/
  ├── googleFit.ts        ← Google Fit integration (Android)
  ├── geolocation.ts      ← Location services
  ├── levelSystem.ts      ← Evolution based on total steps
  ├── statsTimerSystem.ts ← Hunger/Fun/Energy decay
  └── notificationSystem.ts ← Push notifications

/components/
  ├── EvolutionPapiCharacter.tsx ← Character evolution stages
  └── screens/
      ├── KawaiiHomeScreen.tsx       ← Main screen (shows steps)
      ├── KawaiiFriendsScreen.tsx    ← Friends list
      ├── KawaiiNearestPeopleScreen.tsx ← Nearby users (uses location)
      └── KawaiiPermissionsScreen.tsx ← Request permissions
```

---

**Last Updated:** November 3, 2025  
**Version:** 2.8.1 (Android)  
**Platform:** Android (Google Fit + Geolocation)  
**Status:** ✅ Ready for Android development
