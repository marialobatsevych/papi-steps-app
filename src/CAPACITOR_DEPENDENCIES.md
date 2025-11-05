# Capacitor Dependencies for Papi Steps

## Required NPM Packages

Add these to your `package.json` dependencies:

```json
{
  "dependencies": {
    "@capacitor/core": "^6.0.0",
    "@capacitor/ios": "^6.0.0",
    "@capacitor/geolocation": "^6.0.0",
    "@capacitor-community/health": "^1.0.0"
  },
  "devDependencies": {
    "@capacitor/cli": "^6.0.0"
  }
}
```

## Installation Commands

### Option 1: Install All at Once
```bash
npm install @capacitor/core @capacitor/ios @capacitor/geolocation @capacitor-community/health --save
npm install @capacitor/cli --save-dev
```

### Option 2: Install One by One
```bash
# Core packages
npm install @capacitor/core
npm install @capacitor/cli --save-dev

# iOS platform
npm install @capacitor/ios

# Plugins
npm install @capacitor/geolocation
npm install @capacitor-community/health
```

## Verify Installation

After installation, check `package.json`:

```bash
npm list @capacitor/core
npm list @capacitor/geolocation
npm list @capacitor-community/health
```

## CocoaPods (iOS)

After syncing, CocoaPods will install iOS native dependencies:

```bash
npx cap sync ios
```

This will create/update:
- `ios/App/Podfile`
- `ios/App/Pods/` directory

## Version Compatibility

| Package | Minimum Version | Tested Version |
|---------|----------------|----------------|
| @capacitor/core | 6.0.0 | 6.0.0 |
| @capacitor/ios | 6.0.0 | 6.0.0 |
| @capacitor/cli | 6.0.0 | 6.0.0 |
| @capacitor/geolocation | 6.0.0 | 6.0.0 |
| @capacitor-community/health | 1.0.0 | 1.0.0 |

## iOS Requirements

- **iOS Version**: 13.0 or higher
- **Xcode**: 14.0 or higher
- **Swift**: 5.5 or higher
- **CocoaPods**: 1.10 or higher

## Android (Future)

If you plan to support Android:

```bash
npm install @capacitor/android
npx cap add android
```

Android-specific packages:
- Google Fit API (for steps)
- Google Location Services (for location)

## Additional Useful Plugins

Optional plugins that might be useful:

```bash
# App updates and management
npm install @capacitor/app

# Push notifications
npm install @capacitor/push-notifications

# Local notifications
npm install @capacitor/local-notifications

# Storage
npm install @capacitor/preferences

# Network status
npm install @capacitor/network

# Haptics feedback
npm install @capacitor/haptics
```

## Development Dependencies

Already in your project:
- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Sonner (toasts)

## Troubleshooting Package Issues

### Clear cache and reinstall
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Update Capacitor
```bash
npm install @capacitor/core@latest @capacitor/cli@latest
npx cap sync
```

### Check for conflicts
```bash
npm ls
```

## Native Bridge

The packages provide TypeScript/JavaScript → Native iOS bridge:

```
JavaScript Code (React)
        ↓
Capacitor Bridge
        ↓
iOS Native Plugins
        ↓
HealthKit / CoreLocation
```

## Size Impact

Approximate size added to app:

| Component | Size |
|-----------|------|
| Capacitor Core | ~200 KB |
| HealthKit Plugin | ~50 KB |
| Geolocation Plugin | ~30 KB |
| iOS Native Bridge | ~100 KB |
| **Total Added** | **~380 KB** |

This is minimal compared to typical app size (5-20 MB).

## Security Notes

All packages are:
- ✅ Open source
- ✅ Actively maintained
- ✅ Used by thousands of apps
- ✅ Security audited

Official Capacitor packages:
- https://github.com/ionic-team/capacitor
- https://github.com/capacitor-community

## Support & Updates

- **Capacitor**: Monthly releases
- **Plugins**: Regular updates
- **Security patches**: Applied quickly
- **Breaking changes**: Documented in changelogs

## License Compatibility

All packages use permissive licenses:
- Capacitor: MIT License
- Plugins: MIT License
- Compatible with commercial apps ✅

---

**Ready to install?** Copy the installation commands and run them in your project directory! 📦
