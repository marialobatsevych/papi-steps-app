# 🐾 Papi Steps

> A kawaii wellness game with a cute puppy companion - Track your steps, take care of Papi, and have fun!

<div align="center">

![Version](https://img.shields.io/badge/version-3.1.0-pink)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Capacitor](https://img.shields.io/badge/Capacitor-6.1.2-blue)

</div>

---

## 📱 About Papi Steps

Papi Steps is a mobile wellness application that combines step tracking with a virtual pet game. Take care of your adorable puppy companion, Papi, while staying active and healthy!

### ✨ Key Features

- 🚶 **Step Tracking** - Integrated with Google Fit
- 🐶 **Virtual Pet** - Take care of Papi with food, toys, and rest
- 💬 **Dynamic Phrases** - Papi communicates with 30+ unique mood-based phrases
- 🎮 **Evolution System** - Watch Papi grow from birth to evolved form
- 🎁 **Daily Rewards** - Get free items every 24 hours
- 🎲 **Random Events** - Interactive mini-games (butterfly, poop, spider)
- 🏪 **Shop System** - Buy food, toys, and wallpapers with paw coins
- 👥 **Friends System** - Connect with nearby players via geolocation
- 🎨 **Customization** - Unlock beautiful room backgrounds
- 📊 **Stats System** - Manage Hunger, Energy, and Fun levels
- 🔔 **Notifications** - Daily reminders and achievements
- 🌙 **Sleep Mode** - Beautiful night room animation

---

## 🛠️ Tech Stack

- **Framework**: React 18.3 + TypeScript
- **Mobile**: Capacitor 6.1.2
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion (Motion)
- **UI Components**: Radix UI
- **Build Tool**: Vite 5.2
- **State Management**: React Hooks
- **Notifications**: Capacitor Local Notifications
- **Geolocation**: Capacitor Geolocation
- **Health Data**: Capacitor Health Kit Plugin

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Xcode** 14+ (for iOS development)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependencies)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-github-username/papi-steps-app.git
cd papi-steps-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run in Browser (Development Mode)

```bash
npm run dev
```

The app will open at `http://localhost:5173`

**Note**: In browser mode, mock data is automatically used for Health Kit and Geolocation.

### 4. Build for Production

```bash
npm run build
```

---

## 📱 Mobile Development

### iOS Setup

#### Prerequisites
- macOS with Xcode 14+
- Apple Developer Account
- CocoaPods installed

#### Steps

1. **Add iOS Platform**
   ```bash
   npm run capacitor:add:ios
   ```

2. **Build and Sync**
   ```bash
   npm run ios:build
   ```

3. **Open in Xcode**
   ```bash
   npm run capacitor:open:ios
   ```

4. **Configure in Xcode**
   - Set your Development Team
   - Update Bundle Identifier (currently: `com.marialobatsevych.papi`)
   - Add required permissions in `Info.plist`:
     ```xml
     <key>NSHealthShareUsageDescription</key>
     <string>Papi Steps needs access to your step count to track your daily activity.</string>
     
     <key>NSLocationWhenInUseUsageDescription</key>
     <string>Papi Steps needs your location to show nearby friends.</string>
     
     <key>NSUserNotificationsUsageDescription</key>
     <string>Papi Steps sends you reminders to stay active and care for Papi.</string>
     ```

5. **Run on Device/Simulator**
   - Select your target device in Xcode
   - Press ⌘+R to build and run

### Android Setup

#### Prerequisites
- Android Studio installed
- Android SDK installed
- Java JDK 17+

#### Steps

1. **Add Android Platform**
   ```bash
   npm run capacitor:add:android
   ```

2. **Build and Sync**
   ```bash
   npm run android:build
   ```

3. **Open in Android Studio**
   ```bash
   npm run capacitor:open:android
   ```

4. **Configure in Android Studio**
   - Update `applicationId` in `android/app/build.gradle` (currently: `com.marialobatsevych.papi`)
   - Add permissions in `AndroidManifest.xml`:
     ```xml
     <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
     <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
     <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
     <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
     ```

5. **Run on Device/Emulator**
   - Select your target device in Android Studio
   - Click the Run button

---

## 🔧 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run type-check       # TypeScript type checking
npm run lint             # ESLint code linting
```

### Capacitor
```bash
npm run capacitor:sync          # Sync web code to native platforms
npm run capacitor:copy          # Copy web assets to native platforms
npm run capacitor:update        # Update Capacitor dependencies
npm run capacitor:open:ios      # Open iOS project in Xcode
npm run capacitor:open:android  # Open Android project in Android Studio
```

### Build for Mobile
```bash
npm run ios:build        # Build and sync for iOS
npm run android:build    # Build and sync for Android
```

---

## 📂 Project Structure

```
papi-steps-app/
├── components/              # React components
│   ├── screens/            # Screen components
│   │   ├── KawaiiHomeScreen.tsx
│   │   ├── KawaiiShopScreen.tsx
│   │   ├── KawaiiFriendsScreen.tsx
│   │   └── ...
│   ├── events/             # Random event components
│   │   ├── FlyEvent.tsx
│   │   ├── PoopEvent.tsx
│   │   └── SpiderEvent.tsx
│   ├── ui/                 # Reusable UI components
│   └── ...
├── utils/                  # Utility functions
│   ├── healthKit.ts        # Health data integration
│   ├── geolocation.ts      # Geolocation utilities
│   ├── notificationSystem.ts
│   ├── dailyBonusSystem.ts
│   ├── randomEventsSystem.ts
│   └── ...
├── styles/                 # Global styles
│   └── globals.css
├── guidelines/             # Design guidelines
│   └── Guidelines.md
├── android/                # Android native project (generated)
├── ios/                    # iOS native project (generated)
├── dist/                   # Build output (generated)
├── App.tsx                 # Main app component
├── main.tsx                # App entry point
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── capacitor.config.ts     # Capacitor configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

---

## 🎨 Design System

Papi Steps follows a kawaii pastel design system:

### Colors
- **Pink**: `#FFB7C5` - Primary brand color
- **Lavender**: `#C8B8FF` - Secondary accent
- **Mint**: `#B8E3FF` - Tertiary accent
- **Yellow**: `#FFD66C` - Coins/rewards

### Typography
- **Font**: Nunito (rounded, friendly)
- **Weights**: 400 (regular), 600 (semi-bold), 700 (bold), 800 (extra-bold)

### Components
- Fully rounded buttons (pill-shape)
- Soft shadows and gradients
- Smooth animations
- Mobile-first responsive design

See [Guidelines.md](./guidelines/Guidelines.md) for complete design system documentation.

---

## 🔌 Capacitor Plugins

### Required Plugins
- `@capacitor/core` - Core functionality
- `@capacitor/app` - App lifecycle
- `@capacitor/splash-screen` - Splash screen
- `@capacitor/status-bar` - Status bar styling
- `@capacitor/preferences` - Local storage
- `@capacitor/local-notifications` - Push notifications
- `@capacitor/geolocation` - Location services
- `@capacitor/haptics` - Haptic feedback

### Platform-Specific
- **iOS**: Health Kit integration
- **Android**: Google Fit integration (planned)

---

## 🌐 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_APP_NAME=Papi Steps
VITE_APP_VERSION=2.9.1
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_GEOLOCATION=true
VITE_ENABLE_HEALTH_KIT=true
```

---

## 🚢 Deployment

### CodeMagic CI/CD Setup

1. **Connect Repository**
   - Go to [CodeMagic](https://codemagic.io)
   - Connect your GitHub repository

2. **Configure Build**
   - Create `codemagic.yaml` in project root (see example below)
   - Set environment variables
   - Add signing certificates (iOS)

3. **Build Configuration Example**
   ```yaml
   workflows:
     ios-workflow:
       name: iOS Workflow
       instance_type: mac_mini_m1
       environment:
         node: 18.0.0
       scripts:
         - npm install
         - npm run build
         - npx cap sync ios
       artifacts:
         - ios/App/build/Release-iphonedir/*.ipa
     
     android-workflow:
       name: Android Workflow
       instance_type: linux_x2
       environment:
         node: 18.0.0
       scripts:
         - npm install
         - npm run build
         - npx cap sync android
       artifacts:
         - android/app/build/outputs/**/*.apk
   ```

### Manual Deployment

#### iOS (App Store)
1. Archive in Xcode (Product → Archive)
2. Validate app
3. Upload to App Store Connect
4. Submit for review

#### Android (Google Play)
1. Generate signed APK/AAB in Android Studio
2. Upload to Google Play Console
3. Submit for review

---

## 🧪 Testing

### Browser Testing
```bash
npm run dev
```
Mock data is automatically used for native features.

### Device Testing
```bash
# iOS
npm run ios:build

# Android
npm run android:build
```

---

## 📚 Documentation

Comprehensive documentation is available in the project:

- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[CAPACITOR_INTEGRATION.md](./CAPACITOR_INTEGRATION.md)** - Capacitor setup guide
- **[DEVELOPMENT_MODE_GUIDE.md](./DEVELOPMENT_MODE_GUIDE.md)** - Development tips
- **[Guidelines.md](./guidelines/Guidelines.md)** - Design system
- **Feature Documentation**:
  - [EVOLUTION_SYSTEM.md](./EVOLUTION_SYSTEM.md)
  - [DAILY_BONUS_SYSTEM.md](./DAILY_BONUS_SYSTEM.md)
  - [RANDOM_EVENTS_SYSTEM.md](./RANDOM_EVENTS_SYSTEM.md)
  - [SLEEP_SYSTEM.md](./SLEEP_SYSTEM.md)
  - [PAPI_INTERACTION_GUIDE.md](./PAPI_INTERACTION_GUIDE.md)

---

## 🐛 Troubleshooting

### Common Issues

#### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Capacitor sync fails
```bash
npx cap sync --deployment
```

#### iOS build fails
```bash
cd ios/App
pod install --repo-update
cd ../..
npm run capacitor:sync
```

#### Android Gradle errors
```bash
cd android
./gradlew clean
cd ..
npm run capacitor:sync
```

### Development Mode Issues

If native features don't work in browser:
- This is expected! Native features use mock data in browser mode
- Test on actual device for real functionality

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing code style
- Use TypeScript for type safety
- Follow design guidelines in `Guidelines.md`
- Write clean, commented code

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Papi Steps Team** 🐕💕

---

## 🙏 Acknowledgments

- Figma for design assets
- React and Capacitor communities
- All contributors and testers

---

## 📞 Support

For issues and questions:
- Open an [Issue](https://github.com/your-github-username/papi-steps-app/issues)
- Check [Documentation](./README.md)

---

## 🗺️ Roadmap

### Version 3.0 (Planned)
- [ ] Backend API integration
- [ ] Real-time multiplayer features
- [ ] Cloud save synchronization
- [ ] More evolution stages
- [ ] Mini-games expansion
- [ ] Achievement system
- [ ] Leaderboards
- [ ] In-app purchases
- [ ] Social sharing

---

<div align="center">

**Made with 💖 by Papi Steps Team**

🐾 Take care of Papi and stay active! 🐾

</div>
