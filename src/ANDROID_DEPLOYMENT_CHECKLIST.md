# ✅ Android Deployment Checklist - Papi Steps

**Version:** 2.9.2  
**Platform:** Android  
**Target:** Google Play Store  
**Date:** November 3, 2025

---

## 📋 Pre-Development

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] Android Studio installed (latest version)
- [ ] Java JDK 11+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

### Project Setup
- [x] ✅ Project initialized
- [x] ✅ Dependencies installed
- [x] ✅ Google Fit service created
- [x] ✅ Development mode tested
- [ ] Capacitor Android added (`npx cap add android`)

---

## 🔧 Google Cloud Console Setup

### Create Project
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new project: "Papi Steps"
- [ ] Note down Project ID: `_______________`
- [ ] Enable billing (can start with free tier)

### Enable APIs
- [ ] Enable **Fitness API**
- [ ] Enable **Android Device Verification API** (optional)
- [ ] Enable **Maps SDK for Android** (for location features)

### OAuth 2.0 Setup
- [ ] Go to "APIs & Services" → "Credentials"
- [ ] Click "Configure Consent Screen"
- [ ] Choose "External" user type
- [ ] Fill app information:
  - App name: `Papi Steps`
  - User support email: `your.email@example.com`
  - Developer contact: `your.email@example.com`
- [ ] Add scopes:
  - [ ] `https://www.googleapis.com/auth/fitness.activity.read`
  - [ ] `https://www.googleapis.com/auth/fitness.location.read` (optional)
- [ ] Add test users (for development):
  - [ ] `your.email@example.com`
  - [ ] Add more test accounts as needed
- [ ] Save and continue

### Create OAuth Client
- [ ] Go to "Credentials" tab
- [ ] Click "Create Credentials" → "OAuth client ID"
- [ ] Choose "Android"
- [ ] Name: `Papi Steps Android`
- [ ] Package name: `com.marialobatsevych.papi`
- [ ] Get SHA-1 fingerprint (see below)
- [ ] Add SHA-1 to client
- [ ] Create
- [ ] Copy Client ID: `_______________`

---

## 🔑 SHA-1 Fingerprint

### Debug Keystore (Development)

```bash
# Navigate to Android folder
cd android

# Run signing report
./gradlew signingReport

# Look for SHA-1 under "Variant: debug"
# Example: SHA1: A1:B2:C3:D4:E5:F6:...
```

- [ ] Debug SHA-1 obtained: `_______________`
- [ ] Debug SHA-1 added to OAuth client

### Release Keystore (Production)

**Create release keystore:**
```bash
keytool -genkey -v -keystore papi-steps-release.keystore -alias papi-steps -keyalg RSA -keysize 2048 -validity 10000

# Answer questions:
# Password: [SAVE THIS!] _______________
# First and Last name: Papi Steps
# Organization: Your Company
# City, State, Country: ...
```

- [ ] Release keystore created
- [ ] Keystore password saved securely
- [ ] Keystore backed up to secure location

**Get release SHA-1:**
```bash
keytool -list -v -keystore papi-steps-release.keystore -alias papi-steps
```

- [ ] Release SHA-1 obtained: `_______________`
- [ ] Release SHA-1 added to OAuth client

---

## 📱 Android Project Configuration

### AndroidManifest.xml

**Location:** `android/app/src/main/AndroidManifest.xml`

Add permissions before `<application>`:

```xml
<!-- Google Fit / Health Data -->
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />

<!-- Location Services -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Internet (required for Google Fit) -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

- [ ] Permissions added to AndroidManifest.xml

### build.gradle

**Location:** `android/app/build.gradle`

Add dependencies:

```gradle
dependencies {
    // Google Fit
    implementation 'com.google.android.gms:play-services-fitness:21.1.0'
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
    
    // Existing Capacitor dependencies...
}
```

- [ ] Dependencies added to build.gradle

### strings.xml

**Location:** `android/app/src/main/res/values/strings.xml`

Add OAuth client ID:

```xml
<resources>
    <string name="app_name">Papi Steps</string>
    <string name="server_client_id">YOUR_OAUTH_CLIENT_ID_HERE.apps.googleusercontent.com</string>
</resources>
```

- [ ] OAuth client ID added to strings.xml

### Update App Information

**Location:** `android/app/build.gradle`

```gradle
android {
    namespace "com.marialobatsevych.papi"
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.marialobatsevych.papi"
        minSdkVersion 26  // Android 8.0+
        targetSdkVersion 34
        versionCode 1
        versionName "2.9.2"
    }
}
```

- [ ] Application ID matches: `com.marialobatsevych.papi`
- [ ] Version code set: `1`
- [ ] Version name set: `2.9.2`
- [ ] Min SDK: `26` (Android 8.0+)
- [ ] Target SDK: `34`

---

## 🎨 App Assets

### App Icon

**Sizes needed:**
- [ ] 48x48 (mdpi)
- [ ] 72x72 (hdpi)
- [ ] 96x96 (xhdpi)
- [ ] 144x144 (xxhdpi)
- [ ] 192x192 (xxxhdpi)

**Location:** `android/app/src/main/res/mipmap-*/`

- [ ] App icons generated
- [ ] Icons placed in correct folders
- [ ] Icons use PNG format
- [ ] Icons follow Material Design guidelines

### Splash Screen

- [ ] Splash screen image created (1280x1920)
- [ ] Splash screen configured in `res/drawable/splash.png`
- [ ] Splash background color set
- [ ] Splash duration configured

### Feature Graphic

For Google Play Store:
- [ ] Feature graphic created (1024x500)
- [ ] Shows Papi character
- [ ] Includes app name
- [ ] Kawaii style maintained

---

## 🧪 Testing

### Development Testing

**In Browser:**
```bash
npm run dev
```

- [x] ✅ App loads without errors
- [x] ✅ Mock steps data works
- [x] ✅ All screens accessible
- [x] ✅ Character evolution works
- [x] ✅ No console errors

**On Android Emulator:**
```bash
npm run build
npx cap sync android
npx cap open android
```

- [ ] App launches successfully
- [ ] No crash on startup
- [ ] Google Fit permission requested
- [ ] Mock data displayed (emulator)
- [ ] Location permission requested
- [ ] UI looks correct on different screen sizes

**On Real Android Device:**
```bash
# Connect device via USB (enable USB debugging)
# Run from Android Studio
```

- [ ] App installs successfully
- [ ] Google Fit permission dialog appears
- [ ] Can authenticate with Google account
- [ ] Steps data syncs from Google Fit
- [ ] Real location works
- [ ] Character evolves based on steps
- [ ] Daily goals work
- [ ] Notifications work
- [ ] No crashes or freezes

### Test Scenarios

- [ ] **New user flow:**
  - Fresh install
  - Google authentication
  - Permission grants
  - Tutorial/welcome screen
  - First steps sync

- [ ] **Existing user flow:**
  - App remembers login
  - Steps continue syncing
  - Progress maintained
  - No data loss

- [ ] **Edge cases:**
  - No internet connection
  - Google Fit not installed
  - Permission denied
  - Battery saver mode
  - App killed in background
  - Device restart

---

## 🏗️ Build for Production

### Debug Build (Testing)

```bash
cd android
./gradlew assembleDebug
```

- [ ] Debug APK built successfully
- [ ] APK location: `android/app/build/outputs/apk/debug/`
- [ ] Debug APK tested on devices

### Release Build (Production)

**Configure signing:**

Edit `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file('../papi-steps-release.keystore')
            storePassword 'YOUR_KEYSTORE_PASSWORD'
            keyAlias 'papi-steps'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

- [ ] Signing config added
- [ ] Keystore path correct
- [ ] Passwords set (use environment variables in production)

**Build release:**

```bash
cd android
./gradlew bundleRelease  # For AAB (recommended)
# OR
./gradlew assembleRelease  # For APK
```

- [ ] Release AAB built successfully
- [ ] AAB location: `android/app/build/outputs/bundle/release/`
- [ ] File size: `~_____ MB` (should be < 50MB)

---

## 🎮 Google Play Console Setup

### Create Application

- [ ] Go to [Google Play Console](https://play.google.com/console)
- [ ] Pay $25 one-time developer fee (if first app)
- [ ] Click "Create app"
- [ ] Fill details:
  - App name: `Papi Steps`
  - Default language: `English (United States)`
  - App type: `App`
  - Free or Paid: `Free`
  - Category: `Health & Fitness`
- [ ] Accept policies
- [ ] Create app

### Store Listing

**App details:**
- [ ] Short description (80 chars):
  ```
  A kawaii wellness game! Walk daily to grow your cute puppy Papi! 🐾✨
  ```

- [ ] Full description (4000 chars):
  ```
  🐾 Welcome to Papi Steps! 🐾

  Meet Papi, your adorable puppy companion who grows stronger with every step you take! 
  
  ✨ FEATURES:
  • 🚶 Walk & Grow - Your steps make Papi evolve!
  • 🎯 Daily Goals - Set targets from 3,000 to 30,000 steps
  • 🏆 Rewards - Earn coins and unlock cute items
  • 🍖 Care System - Feed, play, and keep Papi happy
  • 👥 Friends - Find nearby Papi walkers
  • 🎨 Kawaii Design - Soft colors, cute animations
  
  📊 EVOLUTION STAGES:
  • Birth Papi (0-10K steps)
  • Baby Papi (10K-20K steps)
  • Teenager Papi (20K-30K steps)
  • Adult Papi (30K+ steps)
  
  💖 Syncs with Google Fit and all connected fitness trackers!
  
  Start your wellness journey with Papi today! 🌟
  ```

- [ ] Short description written
- [ ] Full description written
- [ ] App icon uploaded (512x512)
- [ ] Feature graphic uploaded (1024x500)

**Screenshots:**

Minimum 2, maximum 8 per device type.

Phone screenshots (Required):
- [ ] Home screen with Papi
- [ ] Shop screen
- [ ] Friends screen
- [ ] Profile screen
- [ ] Evolution animation
- [ ] Daily rewards

Tablet screenshots (Optional but recommended):
- [ ] Same screens in tablet layout

- [ ] Phone screenshots uploaded (JPEG or PNG)
- [ ] Tablet screenshots uploaded (optional)

**Categorization:**
- [ ] App category: `Health & Fitness`
- [ ] Tags added:
  - [ ] Wellness
  - [ ] Fitness
  - [ ] Pedometer
  - [ ] Walking
  - [ ] Cute

**Contact details:**
- [ ] Email: `your.email@example.com`
- [ ] Phone: (optional)
- [ ] Website: (optional but recommended)
- [ ] Privacy policy URL: (REQUIRED)

### Content Rating

- [ ] Start questionnaire
- [ ] Answer questions:
  - [ ] Contains violence? No
  - [ ] Contains sexual content? No
  - [ ] Contains offensive language? No
  - [ ] Promotes gambling? No
  - [ ] Uses location? Yes (for nearby friends)
- [ ] Submit for rating
- [ ] Receive rating: `Everyone` (expected)

### App Content

**Privacy Policy (REQUIRED):**

Create a simple privacy policy:

```markdown
# Privacy Policy for Papi Steps

Last updated: November 3, 2025

## Data Collection
Papi Steps collects:
- Step count data from Google Fit
- Location data (with permission, for nearby friends feature)
- Game progress (saved locally)

## Data Usage
- Steps used to evolve your Papi character
- Location used to find nearby players
- No data sold to third parties
- No advertising

## Data Storage
- Game data stored on your device
- Google Fit data managed by Google
- Location not stored permanently

## Your Rights
- Revoke permissions anytime in Settings
- Delete app to remove all local data
- Contact us: your.email@example.com

## Changes
We may update this policy. Check this page periodically.
```

- [ ] Privacy policy created
- [ ] Privacy policy hosted (GitHub Pages, your website, etc.)
- [ ] Privacy policy URL added to Play Console

**Target audience:**
- [ ] Age: All ages (or 13+ if safer)
- [ ] Appeals to children? Yes / No
- [ ] Ads? No
- [ ] In-app purchases? No (currently)

**News apps:** N/A  
**COVID-19 contact tracing/status apps:** No  
**Data safety:**

- [ ] Fill data safety form:
  - [ ] Location collected? Yes (optional, for friends)
  - [ ] Personal info collected? No
  - [ ] Financial info collected? No
  - [ ] Health & fitness collected? Yes (steps only)
  - [ ] Data encrypted in transit? Yes
  - [ ] Can users request deletion? Yes
  - [ ] Data shared with third parties? No

### App Access

- [ ] All features are accessible without special access
- [ ] No login credentials needed for review
- [ ] Demo account (if applicable): N/A

---

## 📤 Upload to Play Console

### Production Track

**First Release:**

- [ ] Go to "Production" track
- [ ] Click "Create new release"
- [ ] Upload AAB file
- [ ] Release name: `2.9.2 - Initial Release`
- [ ] Release notes:
  ```
  🎉 Welcome to Papi Steps!
  
  • Meet Papi, your cute walking companion
  • Sync with Google Fit automatically
  • Evolve Papi by walking daily
  • Set custom daily goals
  • Find nearby Papi friends
  • Kawaii design and animations
  
  Let's start walking! 🐾
  ```

- [ ] Save release
- [ ] Review release
- [ ] Roll out to production

**Or use testing tracks first:**

### Internal Testing (Recommended)
- [ ] Upload AAB to internal testing
- [ ] Add internal testers (email addresses)
- [ ] Send test invitation
- [ ] Get feedback
- [ ] Fix issues

### Closed Testing (Optional)
- [ ] Create closed test group
- [ ] Invite testers
- [ ] Gather feedback
- [ ] Iterate

### Open Testing (Optional)
- [ ] Publish to open testing
- [ ] Anyone can join
- [ ] Collect reviews
- [ ] Final polish

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] All store listing complete
- [ ] Screenshots look professional
- [ ] Description is compelling
- [ ] Privacy policy published
- [ ] Content rating received
- [ ] Data safety form complete
- [ ] Release notes written

### Technical
- [ ] Release AAB uploaded
- [ ] App bundle verified
- [ ] Signing config correct
- [ ] Version codes incremental
- [ ] No critical bugs
- [ ] Tested on multiple devices
- [ ] Tested on different Android versions

### Legal
- [ ] Privacy policy compliant
- [ ] Terms of service (if needed)
- [ ] Copyright notices included
- [ ] Third-party licenses attributed
- [ ] No trademark violations

### Launch
- [ ] Submit for review
- [ ] Monitor review status
- [ ] Respond to any questions from Google
- [ ] Wait for approval (usually few hours to 1 day)
- [ ] App goes live! 🎉

---

## 📊 Post-Launch

### Monitoring

**First 24 hours:**
- [ ] Check for crash reports
- [ ] Monitor reviews (respond quickly)
- [ ] Watch install numbers
- [ ] Check user feedback

**First week:**
- [ ] Analyze crash-free rate (target: >99%)
- [ ] Read all reviews
- [ ] Fix critical bugs
- [ ] Plan updates

**First month:**
- [ ] Gather feature requests
- [ ] Analyze usage patterns
- [ ] Plan roadmap
- [ ] Consider marketing

### Marketing

- [ ] Share on social media
- [ ] Post on Reddit (r/androidapps, r/androidgaming)
- [ ] Submit to app review sites
- [ ] Create demo video
- [ ] Write blog post
- [ ] Email friends/family

### Updates

**Version 2.9.3 (Bug fixes):**
- [ ] Fix reported issues
- [ ] Improve performance
- [ ] Update within 1-2 weeks

**Version 3.0.0 (Major update):**
- [ ] New features
- [ ] UI improvements
- [ ] More items/content
- [ ] Within 1-2 months

---

## 🔄 CI/CD (Optional but Recommended)

### GitHub Actions

Create `.github/workflows/android.yml`:

```yaml
name: Android Build

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Sync Capacitor
      run: npx cap sync android
    
    - name: Build Android APK
      run: |
        cd android
        ./gradlew assembleDebug
```

- [ ] GitHub Actions configured
- [ ] Builds run automatically
- [ ] Notifications on failures

### CodeMagic (Alternative)

- [ ] Connect GitHub repo
- [ ] Configure build workflow
- [ ] Add environment variables
- [ ] Enable automatic builds
- [ ] Setup deployment to Play Store

---

## 📝 Documentation

### User-Facing

- [ ] In-app tutorial
- [ ] Help screen complete
- [ ] FAQ section
- [ ] Support email prominently displayed

### Developer

- [ ] README updated with Android instructions
- [ ] CHANGELOG maintained
- [ ] API documentation (if applicable)
- [ ] Contributing guidelines

---

## ✅ Final Verification

### Before Submission:
- [ ] App runs without crashes
- [ ] All features work as expected
- [ ] No debug code left
- [ ] No console.log in production
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Offline mode handled gracefully

### Play Store Compliance:
- [ ] No misleading content
- [ ] No copyrighted material (without permission)
- [ ] No spam or repetitive content
- [ ] Follows Google Play policies
- [ ] Age-appropriate content
- [ ] Proper data handling

### Performance:
- [ ] App size reasonable (< 50MB)
- [ ] Fast startup time (< 3 seconds)
- [ ] Smooth animations (60 FPS)
- [ ] Low battery drain
- [ ] Minimal memory usage

---

## 🎉 Success Metrics

### Week 1 Goals:
- [ ] 100+ downloads
- [ ] 4+ star rating
- [ ] < 1% crash rate
- [ ] Positive reviews

### Month 1 Goals:
- [ ] 1,000+ downloads
- [ ] 4.5+ star rating
- [ ] Feature on Play Store (wishlist)
- [ ] Active user retention >30%

### Year 1 Goals:
- [ ] 10,000+ downloads
- [ ] 4.7+ star rating
- [ ] Monetization strategy (IAP or ads)
- [ ] International expansion

---

## 📞 Support & Resources

### If Issues Arise:

**Google Play Console:**
- Policy violations → Respond quickly
- Technical issues → Check crash reports
- User complaints → Address in updates

**Community Help:**
- [Stack Overflow](https://stackoverflow.com/questions/tagged/android)
- [Reddit r/androiddev](https://reddit.com/r/androiddev)
- [Capacitor Forum](https://forum.ionicframework.com/)
- [Google Fit API Forum](https://developers.google.com/fit/support)

### Emergency Contacts:
- Google Play Support (from Console)
- Your OAuth client ID: `_______________`
- Your project ID: `_______________`
- Keystore backup location: `_______________`

---

**Checklist Version:** 1.0  
**Last Updated:** November 3, 2025  
**Status:** Ready for deployment  
**Platform:** Android (Google Play)

🚀 Good luck with your launch! 🐾✨
