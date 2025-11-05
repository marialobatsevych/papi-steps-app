# 🚀 Deployment Guide - Papi Steps

Complete guide for deploying Papi Steps to iOS and Android using CodeMagic CI/CD.

---

## 📋 Prerequisites

### General
- ✅ GitHub account with repository access
- ✅ CodeMagic account (free or paid)
- ✅ Project configured with Capacitor

### iOS Deployment
- ✅ Apple Developer Account ($99/year)
- ✅ App ID created in Apple Developer Portal
- ✅ Signing certificates and provisioning profiles
- ✅ App Store Connect app created

### Android Deployment
- ✅ Google Play Console account ($25 one-time)
- ✅ App created in Google Play Console
- ✅ Keystore file for signing

---

## 🔗 Step 1: Connect Repository to CodeMagic

### 1.1 Sign Up / Sign In to CodeMagic
1. Go to [https://codemagic.io](https://codemagic.io)
2. Sign in with GitHub account
3. Authorize CodeMagic to access your repositories

### 1.2 Add Repository
1. Click **"Add application"**
2. Select **"Connect repository from GitHub"**
3. Choose **`papi-steps-app`** repository
4. Click **"Finish: Add application"**

---

## ⚙️ Step 2: Configure Build Settings

### 2.1 Create codemagic.yaml

Create `codemagic.yaml` in the root of your repository:

```yaml
workflows:
  # iOS Workflow
  ios-workflow:
    name: iOS Production Build
    instance_type: mac_mini_m1
    max_build_duration: 60
    
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: com.marialobatsevych.papi
      
      vars:
        XCODE_WORKSPACE: "ios/App/App.xcworkspace"
        XCODE_SCHEME: "App"
        APP_STORE_CONNECT_ISSUER_ID: your_issuer_id
        APP_STORE_CONNECT_KEY_IDENTIFIER: your_key_id
        APP_STORE_CONNECT_PRIVATE_KEY: |
          -----BEGIN PRIVATE KEY-----
          your_private_key_here
          -----END PRIVATE KEY-----
      
      node: 18.0.0
      xcode: 15.0
      cocoapods: default
    
    scripts:
      - name: Install npm dependencies
        script: |
          npm install
      
      - name: Build web app
        script: |
          npm run build
      
      - name: Sync Capacitor
        script: |
          npx cap sync ios
      
      - name: Install CocoaPods dependencies
        script: |
          cd ios/App
          pod install
      
      - name: Set up code signing settings on Xcode project
        script: xcode-project use-profiles
      
      - name: Build iOS
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    
    publishing:
      email:
        recipients:
          - your-email@example.com
        notify:
          success: true
          failure: true
      
      app_store_connect:
        api_key: $APP_STORE_CONNECT_PRIVATE_KEY
        key_id: $APP_STORE_CONNECT_KEY_IDENTIFIER
        issuer_id: $APP_STORE_CONNECT_ISSUER_ID
        submit_to_testflight: true
        submit_to_app_store: false

  # Android Workflow
  android-workflow:
    name: Android Production Build
    instance_type: linux_x2
    max_build_duration: 60
    
    environment:
      android_signing:
        - keystore_reference
      
      groups:
        - google_play
      
      vars:
        PACKAGE_NAME: "com.marialobatsevych.papi"
      
      node: 18.0.0
      java: 17
    
    scripts:
      - name: Install npm dependencies
        script: |
          npm install
      
      - name: Build web app
        script: |
          npm run build
      
      - name: Sync Capacitor
        script: |
          npx cap sync android
      
      - name: Set Android version
        script: |
          VERSION_NAME="2.9.1"
          VERSION_CODE=$(($(google-play get-latest-build-number \
            --package-name "$PACKAGE_NAME" \
            --tracks=alpha,beta,production) + 1))
          
          cd android
          ./gradlew bundleRelease \
            -PversionName=$VERSION_NAME \
            -PversionCode=$VERSION_CODE
    
    artifacts:
      - android/app/build/outputs/**/*.aab
      - android/app/build/outputs/**/*.apk
    
    publishing:
      email:
        recipients:
          - your-email@example.com
        notify:
          success: true
          failure: true
      
      google_play:
        credentials: $GCLOUD_SERVICE_ACCOUNT_CREDENTIALS
        track: internal
        submit_as_draft: true
```

### 2.2 Commit and Push codemagic.yaml

```bash
git add codemagic.yaml
git commit -m "Add CodeMagic CI/CD configuration"
git push origin main
```

---

## 🍎 Step 3: iOS Setup

### 3.1 Apple Developer Portal Configuration

1. **Create App ID**
   - Go to [developer.apple.com](https://developer.apple.com)
   - Navigate to **Certificates, Identifiers & Profiles**
   - Click **Identifiers** → **+**
   - Select **App IDs** → **Continue**
   - Description: `Papi Steps`
   - Bundle ID: `com.marialobatsevych.papi` (Explicit)
   - Capabilities: Enable required capabilities:
     - ✅ HealthKit
     - ✅ Push Notifications
     - ✅ Location Services

2. **Create Certificates**
   - Development Certificate (for testing)
   - Distribution Certificate (for App Store)

3. **Create Provisioning Profiles**
   - Development profile
   - App Store profile

### 3.2 App Store Connect Setup

1. **Create App**
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Click **My Apps** → **+** → **New App**
   - Platform: **iOS**
   - Name: **Papi Steps**
   - Primary Language: **English**
   - Bundle ID: **com.marialobatsevych.papi**
   - SKU: **papi-steps-001**

2. **App Information**
   - Category: **Health & Fitness**
   - Subcategory: **Fitness**
   - Content Rights: Select appropriate option

3. **Pricing and Availability**
   - Price: **Free**
   - Availability: **All countries**

### 3.3 CodeMagic iOS Configuration

1. **Add Signing Certificates**
   - In CodeMagic, go to your app
   - Click **App settings** → **Code signing**
   - Upload:
     - Distribution certificate (.p12)
     - Provisioning profile

2. **Add App Store Connect API Key**
   - Go to App Store Connect
   - Users and Access → Keys → App Store Connect API
   - Create new key with **Developer** role
   - Download .p8 file
   - Copy:
     - Issuer ID
     - Key ID
     - Private Key content
   - Add to CodeMagic environment variables

---

## 🤖 Step 4: Android Setup

### 4.1 Google Play Console Setup

1. **Create App**
   - Go to [play.google.com/console](https://play.google.com/console)
   - Click **Create app**
   - App name: **Papi Steps**
   - Default language: **English (United States)**
   - App or game: **App**
   - Free or paid: **Free**
   - Accept declarations

2. **Set Up App**
   - Complete store listing
   - Upload screenshots
   - Add app icon
   - Feature graphic
   - Description

3. **Content Rating**
   - Complete questionnaire
   - Submit for rating

4. **Target Audience**
   - Select age groups
   - Complete required fields

### 4.2 Create Keystore

```bash
keytool -genkey -v \
  -keystore papi-steps-release.keystore \
  -alias papi-steps \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Important**: Save keystore file and credentials securely!

### 4.3 CodeMagic Android Configuration

1. **Upload Keystore**
   - In CodeMagic, go to **App settings** → **Code signing**
   - Upload keystore file
   - Enter:
     - Keystore password
     - Key alias
     - Key password

2. **Add Google Play Service Account**
   - In Google Play Console:
     - Setup → API access
     - Create new service account
     - Grant permissions
     - Download JSON key file
   - In CodeMagic:
     - Add JSON content to environment variable `GCLOUD_SERVICE_ACCOUNT_CREDENTIALS`

---

## 🔐 Step 5: Environment Variables

### 5.1 iOS Variables

In CodeMagic → App settings → Environment variables:

```
APP_STORE_CONNECT_ISSUER_ID=your_issuer_id
APP_STORE_CONNECT_KEY_IDENTIFIER=your_key_id
APP_STORE_CONNECT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
CERTIFICATE_PRIVATE_KEY=your_cert_password
```

### 5.2 Android Variables

```
GCLOUD_SERVICE_ACCOUNT_CREDENTIALS={"type":"service_account",...}
KEYSTORE_PASSWORD=your_keystore_password
KEY_ALIAS=papi-steps
KEY_PASSWORD=your_key_password
```

---

## 🚀 Step 6: Trigger Build

### 6.1 Manual Build

1. In CodeMagic, go to your app
2. Select workflow (iOS or Android)
3. Click **Start new build**
4. Select branch (usually `main`)
5. Click **Start build**

### 6.2 Automatic Builds

Builds trigger automatically on:
- ✅ Push to `main` branch
- ✅ Pull request creation
- ✅ Tag creation (for releases)

Configure in `codemagic.yaml`:

```yaml
triggering:
  events:
    - push
    - pull_request
    - tag
  branch_patterns:
    - pattern: 'main'
      include: true
  tag_patterns:
    - pattern: 'v*'
      include: true
```

---

## 📦 Step 7: Version Management

### 7.1 Update Version

In `package.json`:
```json
{
  "version": "2.9.1"
}
```

In `capacitor.config.ts`:
```typescript
{
  // Version is read from package.json
}
```

### 7.2 iOS Version

In `ios/App/App/Info.plist`:
```xml
<key>CFBundleShortVersionString</key>
<string>2.9.1</string>
<key>CFBundleVersion</key>
<string>1</string>
```

### 7.3 Android Version

In `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        versionCode 1
        versionName "2.9.1"
    }
}
```

---

## 📱 Step 8: Testing

### 8.1 TestFlight (iOS)

1. Build completes successfully
2. App uploads to TestFlight automatically
3. Add internal testers in App Store Connect
4. Distribute build to testers

### 8.2 Internal Testing (Android)

1. Build uploads to Google Play Console
2. Create internal testing track
3. Add testers
4. Share testing link

---

## 🎯 Step 9: Production Release

### 9.1 iOS App Store

1. **Prepare for Submission**
   - Complete App Store listing
   - Upload screenshots (required sizes)
   - Add privacy policy URL
   - Complete age rating

2. **Submit Build**
   - Select build from TestFlight
   - Answer export compliance questions
   - Submit for review

3. **Review Process**
   - Average 1-3 days
   - Respond to any questions
   - Once approved, manually release or auto-release

### 9.2 Android Google Play

1. **Prepare Release**
   - Complete store listing
   - Upload screenshots
   - Add privacy policy

2. **Production Release**
   - Promote from internal/closed testing
   - Set rollout percentage (start with 10-20%)
   - Submit for review

3. **Review Process**
   - Usually faster than iOS (hours to 1 day)
   - Monitor crash reports
   - Gradually increase rollout

---

## 🔍 Step 10: Monitoring

### 10.1 Build Monitoring

- Check CodeMagic dashboard for build status
- Enable email notifications
- Set up Slack integration (optional)

### 10.2 Crash Reporting

Configure crash reporting services:
- **iOS**: Xcode Organizer, Crashlytics
- **Android**: Google Play Console, Crashlytics

### 10.3 Analytics

Add analytics (optional):
- Google Analytics
- Firebase Analytics
- Mixpanel

---

## 🛠️ Troubleshooting

### iOS Build Fails

**Certificate Issues:**
```bash
# Verify certificate
security find-identity -v -p codesigning
```

**CocoaPods Issues:**
```bash
cd ios/App
pod deintegrate
pod install --repo-update
```

### Android Build Fails

**Gradle Issues:**
```bash
cd android
./gradlew clean
./gradlew build --stacktrace
```

**Keystore Issues:**
- Verify keystore file is uploaded correctly
- Check keystore password is correct
- Verify key alias matches

---

## 📊 Build Status Badges

Add to README.md:

```markdown
[![CodeMagic iOS](https://api.codemagic.io/apps/YOUR_APP_ID/status_badge.svg?branch=main)](https://codemagic.io/apps/YOUR_APP_ID/builds)
```

---

## 🎓 Resources

- [CodeMagic Documentation](https://docs.codemagic.io)
- [Capacitor iOS Guide](https://capacitorjs.com/docs/ios)
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://play.google.com/about/developer-content-policy/)

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] Version numbers updated
- [ ] CHANGELOG.md updated
- [ ] Documentation updated

### iOS Deployment
- [ ] Certificates configured
- [ ] Provisioning profiles valid
- [ ] App Store Connect configured
- [ ] Screenshots uploaded
- [ ] Privacy policy added

### Android Deployment
- [ ] Keystore created and secured
- [ ] Google Play Console configured
- [ ] Store listing complete
- [ ] Screenshots uploaded
- [ ] Privacy policy added

### Post-Deployment
- [ ] Monitor crash reports
- [ ] Check user reviews
- [ ] Monitor analytics
- [ ] Prepare next release

---

## 🎉 Success!

Your app is now deployed! 🚀

**Next Steps:**
1. Monitor user feedback
2. Plan next features
3. Iterate and improve

---

**Made with 💖 by Papi Steps Team**
