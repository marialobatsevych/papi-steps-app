# Quick Start - iOS Export with HealthKit & Geolocation

## Prerequisites
- Node.js installed
- Xcode installed (macOS only)
- iOS device for testing (HealthKit doesn't work in simulator)

## Step 1: Install Dependencies

```bash
# Core Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios

# Plugins
npm install @capacitor-community/health
npm install @capacitor/geolocation
```

## Step 2: Initialize Capacitor

```bash
# Initialize project
npx cap init "Papi Steps" "com.papisteps.app"

# Add iOS platform
npx cap add ios
```

## Step 3: Configure iOS Project

### Edit `ios/App/App/Info.plist` and add:

```xml
<key>NSHealthShareUsageDescription</key>
<string>Papi Steps needs access to your step count to help Papi grow with your daily walking activity.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Papi Steps needs your location to find nearby friends and connect with other walkers.</string>
```

## Step 4: Build and Sync

```bash
# Build web assets
npm run build

# Sync to iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

## Step 5: Enable HealthKit in Xcode

1. In Xcode, select your app target
2. Go to "Signing & Capabilities"
3. Click "+ Capability"
4. Add "HealthKit"

## Step 6: Run on Device

1. Connect your iPhone via USB
2. Select your device in Xcode
3. Click Run (⌘R)
4. App will launch and request permissions

## Features Ready to Test

### ✅ Apple Health Integration
- Daily step count syncs automatically
- Updates every 5 minutes
- Shows in progress bar on home screen

### ✅ Nearby Friends
- Uses device location
- Finds friends within 5km
- Shows distance and user info
- Refresh button to update

## Console Logs to Watch

Open Safari Developer Tools (for iOS device) or Xcode console:

```
HealthKit available: true
Requesting HealthKit permission...
Steps data loaded: 8547
User location: { latitude: 37.7749, longitude: -122.4194 }
Finding nearby friends within 5km...
Found 5 nearby friends: [...]
```

## Testing Without Real Health Data

The app includes mock data for development:
- Mock steps: Varies by time of day (morning: low, evening: high)
- Mock location: San Francisco coordinates
- Mock nearby friends: 3-6 random users generated

## Common Issues

### HealthKit Permission Not Appearing
- ✅ Check Info.plist has NSHealthShareUsageDescription
- ✅ HealthKit capability enabled in Xcode
- ✅ Testing on real device (not simulator)

### Location Not Working
- ✅ Check Info.plist has NSLocationWhenInUseUsageDescription
- ✅ Location services enabled on device
- ✅ App has location permission in Settings

### Build Fails
```bash
# Clean and rebuild
cd ios/App
pod install
cd ../..
npx cap sync ios
```

## Next Steps

1. ✅ Test permission flows
2. ✅ Verify steps sync from Health app
3. ✅ Check nearby friends feature
4. ✅ Test with real walking data
5. ✅ Review console logs for errors

## Development Tips

- Use mock data first to test UI
- Add real Health data gradually
- Test permission denied scenarios
- Check Settings app for permission status

## File Structure

```
/utils/
  ├── healthKit.ts       # Apple Health integration
  └── geolocation.ts     # Location & nearby friends

/components/screens/
  ├── KawaiiHomeScreen.tsx         # Shows daily steps
  ├── KawaiiNearestPeopleScreen.tsx # Shows nearby users
  └── KawaiiPermissionsScreen.tsx   # Manages permissions

App.tsx                  # Initializes services on login
```

## Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [HealthKit Plugin](https://github.com/perfood/capacitor-healthkit)
- [Geolocation Plugin](https://capacitorjs.com/docs/apis/geolocation)

---

**Ready to export?** Run `npx cap open ios` and start testing! 🎉
