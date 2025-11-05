# Android Studio Setup Guide for Papi Steps

## Prerequisites

- [x] Android Studio 2023.2.1 or later
- [x] JDK 17 or later
- [x] Android SDK Platform 34 (Android 14.0)
- [x] Android SDK Build-Tools 34.0.0
- [x] Android SDK Command-line Tools
- [x] Android SDK Platform-Tools
- [x] Android Emulator (optional, for testing without physical device)

## Required Environment Variables

1. **JAVA_HOME**
   - Points to JDK 17+ installation
   - Example: `C:\Program Files\Java\jdk-17`

2. **ANDROID_HOME**
   - Points to Android SDK installation
   - Example: `%LOCALAPPDATA%\Android\Sdk`

## Android Studio Setup Steps

1. **Open Project**
   ```powershell
   # From project root
   npx cap open android
   ```

2. **Sync Project with Gradle Files**
   - Wait for initial Gradle sync to complete
   - If sync fails, click "Try Again" after fixing any reported issues

3. **Install Missing SDK Components**
   - If prompted, install any missing Android SDK components
   - Accept all licenses when prompted

4. **Configure SDK Location**
   - File → Project Structure
   - SDK Location: Verify or set Android SDK path
   - Click Apply and OK

5. **Update Gradle Version**
   - If prompted to update Gradle version, accept the update
   - Wait for Gradle sync to complete

## Build and Run

1. **Build Project**
   ```powershell
   # From project root
   cd android
   ./gradlew build
   ```

2. **Run on Device**
   - Connect Android device via USB
   - Enable USB debugging on device
   - Select device in Android Studio
   - Click Run (▶️) button

3. **Run on Emulator**
   - Tools → Device Manager
   - Create Virtual Device
   - Select Pixel 7 or similar
   - Download system image (API 34)
   - Start emulator and run app

## Verification Steps

1. **Check Package Name**
   - In `android/app/build.gradle`:
     ```gradle
     android {
         defaultConfig {
             applicationId "com.marialobatsevych.papi"
         }
     }
     ```

2. **Verify Google Fit Integration**
   - Confirm Google Fit API enabled in Google Cloud Console
   - Check `google-services.json` is present in `android/app/`
   - Verify OAuth 2.0 client ID configured with correct package name
   - Test Google Fit permission dialog appears on first run

3. **Verify Permissions**
   - In `AndroidManifest.xml`:
     ```xml
     <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
     <uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />
     <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
     ```

## Common Issues and Solutions

### Gradle Sync Failed
```powershell
cd android
./gradlew clean
./gradlew build --stacktrace
```

### Missing Dependencies
```powershell
cd android
./gradlew --refresh-dependencies
```

### Build Errors
1. Invalid SDK location
   - Set ANDROID_HOME environment variable
   - Restart Android Studio

2. Missing Google Play Services
   - Open SDK Manager
   - Install Google Play Services
   - Install Google Repository

3. Incompatible Gradle version
   - Update `android/build.gradle`
   - Use compatible Gradle version

## Testing Checklist

- [ ] App builds successfully
- [ ] App launches on device/emulator
- [ ] Google Fit permission dialog appears
- [ ] Location permission dialog appears
- [ ] Step count updates after walking
- [ ] No red error messages in Logcat
- [ ] App stays running in background
- [ ] All animations smooth
- [ ] No memory leaks (check Android Profiler)

## Next Steps

1. Run through all features with Logcat open
2. Test background step counting
3. Verify notifications work
4. Test data persistence
5. Check battery usage
6. Profile app performance
7. Run UI tests if available

## Resources

- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Android Studio User Guide](https://developer.android.com/studio/intro)
- [Google Fit API Guide](https://developers.google.com/fit)
- [Debugging Android Apps](https://developer.android.com/studio/debug)