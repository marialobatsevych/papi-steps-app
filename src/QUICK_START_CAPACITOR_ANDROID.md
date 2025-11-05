# Quick Start - Android Export with Google Fit & Geolocation

## Prerequisites
- Node.js installed
- Android Studio installed
- Android device for testing (Emulator works but real device recommended)

## Step 1: Install Dependencies

```bash
# Core Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Plugins
npm install @capacitor-community/health
npm install @capacitor/geolocation
```

## Step 2: Initialize Capacitor

```bash
# Initialize project
npx cap init "Papi Steps" "com.marialobatsevych.papi"

# Add Android platform
npx cap add android
```

## Step 3: Configure Android Project

### Edit `android/app/src/main/AndroidManifest.xml` and add:

```xml
<!-- Google Fit / Health Data -->
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />

<!-- Location Services -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Internet -->
<uses-permission android:name="android.permission.INTERNET" />
```

### Edit `android/app/build.gradle` and add dependencies:

```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-fitness:21.1.0'
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
}
```

## Step 4: Setup Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Fitness API**
4. Configure OAuth 2.0 consent screen
5. Add scopes:
   - `https://www.googleapis.com/auth/fitness.activity.read`
6. Create OAuth 2.0 credentials (Android client)
7. Add your app's SHA-1 fingerprint:

```bash
cd android
./gradlew signingReport
```

8. Copy the SHA-1 and add it to your OAuth client

### Add OAuth Client ID

Create/edit `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">Papi Steps</string>
    <string name="server_client_id">YOUR_OAUTH_CLIENT_ID.apps.googleusercontent.com</string>
</resources>
```

## Step 5: Build and Sync

```bash
# Build web assets
npm run build

# Sync to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

## Step 6: Run on Device

1. Connect your Android device via USB (enable USB debugging)
   OR use Android Emulator
2. In Android Studio, click Run (▶️)
3. Select your device
4. App will launch and request permissions

## Features Ready to Test

### ✅ Google Fit Integration
- Daily step count syncs automatically
- Updates every 5 minutes
- Shows in progress bar on home screen
- Works with any fitness tracker that syncs to Google Fit

### ✅ Nearby Friends
- Uses device location (GPS/Network)
- Finds friends within 5km
- Shows distance and user info
- Refresh button to update

### ✅ Character Evolution
- Birth Papi (0-10,000 steps)
- Baby Papi (10,001-20,000 steps)
- Teenager Papi (20,001-30,000 steps)
- Adult Papi (30,001+ steps)

### ✅ Daily Goals
- Set custom goals (3,000-30,000 steps)
- Get 300 coins when reaching goal
- Daily rewards and bonuses

## Common Issues

### Issue 1: Google Fit Permission Denied
**Solution:** 
- Make sure OAuth 2.0 is configured correctly
- Verify SHA-1 fingerprint is added to Google Cloud Console
- Check that Fitness API is enabled

### Issue 2: No Steps Data
**Solution:**
- Install Google Fit app on device
- Grant "Physical Activity" permission
- Walk a few steps and wait for sync

### Issue 3: Build Errors
**Solution:**
```bash
# Clean build
cd android
./gradlew clean

# Rebuild
cd ..
npx cap sync android
```

## Development Mode

When testing in browser:
```bash
npm run dev
```

- Mock step data will be used
- Mock location data will be used
- No errors displayed to user
- Full app functionality available

## Next Steps

1. ✅ Test on real Android device
2. ✅ Verify Google Fit syncs correctly
3. ✅ Test location features
4. 🔜 Configure production signing key
5. 🔜 Build release APK/AAB
6. 🔜 Submit to Google Play Store

## Useful Commands

```bash
# Sync changes
npx cap sync

# Copy web assets only
npx cap copy

# Update Capacitor
npx cap update

# Check for issues
npx cap doctor

# Run on Android
npx cap run android

# Open Android Studio
npx cap open android

# Check logs
adb logcat | grep Capacitor
```

## File Structure

```
/utils/
  ├── googleFit.ts        ← Google Fit integration (NEW)
  ├── geolocation.ts      ← Location services
  ├── levelSystem.ts      ← Evolution based on total steps
  └── statsTimerSystem.ts ← Hunger/Fun/Energy decay

/components/
  ├── EvolutionPapiCharacter.tsx ← Character evolution
  └── screens/
      ├── KawaiiHomeScreen.tsx           ← Main screen
      ├── KawaiiFriendsScreen.tsx        ← Friends list
      └── KawaiiNearestPeopleScreen.tsx  ← Nearby users
```

## Resources

- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Google Fit REST API](https://developers.google.com/fit/rest)
- [OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
- [@capacitor-community/health](https://github.com/capacitor-community/health)

---

**Platform:** Android  
**Version:** 2.9.1  
**Last Updated:** November 3, 2025  
**Status:** ✅ Ready for Android development
