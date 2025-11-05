# Development Mode Guide - Mock Data & Testing

## Overview

The Papi Steps app now handles development mode gracefully, allowing you to test all features in a web browser without needing iOS device permissions.

## What Changed

### ✅ Fixed Issues

1. **No More Permission Errors in Development**
   - Previously: App showed errors "HealthKit permission denied" in browser
   - Now: Silently uses mock data in development mode
   - Console logs inform you what's happening

2. **Graceful Fallback**
   - If HealthKit unavailable → Use mock steps data
   - If Location unavailable → Use mock location data
   - No error toasts in development mode

3. **Platform Detection**
   - Automatically detects if running on iOS or web
   - Different behavior for each platform
   - No code changes needed when switching platforms

## Development Mode Behavior

### HealthKit (Apple Health)

**In Browser/Development:**
```javascript
// Console output:
"HealthKit not available on this platform (using mock data for development)"
"Steps data loaded: 5247" // Mock data based on time of day
```

**On iOS Device:**
```javascript
// Console output:
"HealthKit available: true"
"Requesting HealthKit permission..."
"Steps data loaded: 8547" // Real data from Health app
```

### Geolocation

**In Browser/Development:**
```javascript
// Console output:
"Requesting location permission (web)..."
"Using mock location data for development"
"User location: { latitude: 37.7749, longitude: -122.4194 }"
```

**On iOS Device:**
```javascript
// Console output:
"Requesting location permission (native)..."
"User location: { latitude: 40.7128, longitude: -74.0060 }" // Real GPS
```

## Mock Data Specifications

### Mock Steps
The app generates realistic step counts based on time of day:

| Time | Step Range | Example |
|------|------------|---------|
| 0-12h (Morning) | 0-1,000 + (hour × 80) | 8am = 640 steps |
| 12-18h (Afternoon) | 1,000-5,000 | Random: 3,247 steps |
| 18-24h (Evening) | 5,000-12,000 | Random: 8,932 steps |

**Refresh to get new values** - Each page load generates new random steps within the range.

### Mock Location
Default coordinates: **San Francisco, CA**
- Latitude: 37.7749
- Longitude: -122.4194
- Accuracy: 10 meters

Can be customized in `/utils/geolocation.ts`:
```typescript
private getMockLocation(): UserLocation {
  return {
    latitude: 37.7749,  // Change to your test location
    longitude: -122.4194,
    accuracy: 10,
    timestamp: Date.now()
  };
}
```

### Mock Nearby Friends
Automatically generates 3-6 nearby users:
- Random distances: 0.1 km - 5 km
- Random Papi stages: baby, child, adult, evolved
- Random usernames from preset list
- Sorted by distance (closest first)

## Console Logs

### What You'll See in Development

```javascript
// On app start
"Initializing Apple Health and Location services..."
"HealthKit not available on this platform (using mock data for development)"
"Steps data loaded: 4521"
"Requesting location permission (web)..."
"Using mock location data for development"
"User location: { latitude: 37.7749, longitude: -122.4194 }"

// When opening Nearest People screen
"Finding nearby friends within 5km..."
"Found 5 nearby friends: [...]"
```

### What You'll See on iOS

```javascript
// On app start
"Initializing Apple Health and Location services..."
"HealthKit available: true"
"Requesting HealthKit permission..."
"Steps data loaded: 8547" // Real steps from Health app
"Requesting location permission (native)..."
"User location: { latitude: 40.7128, longitude: -74.0060 }" // Real GPS
```

## Testing Features in Development

### Test Steps Tracking
1. Open app in browser
2. Check home screen
3. See mock step count (varies by time)
4. Progress bar updates based on mock steps
5. Console shows: `"Steps data loaded: XXXX"`

### Test Nearby Friends
1. Navigate to "Nearest People" screen
2. See 3-6 mock friends with distances
3. Click "Refresh" to regenerate list
4. Console shows: `"Found X nearby friends"`

### Test Permissions Screen
1. Navigate to Settings → Permissions
2. Click "Enable" on any permission
3. See success toast (no error toasts)
4. Permission shows as "Enabled"

## Switching to Production Mode

When you export to iOS using Capacitor:

### No Code Changes Needed! ✅

The app automatically detects:
```typescript
if (Capacitor.isNativePlatform()) {
  // Use real HealthKit & Location APIs
} else {
  // Use mock data
}
```

### What Happens on iOS:
1. Real permission dialogs appear
2. Real step data from Health app
3. Real GPS coordinates
4. Real error handling for denied permissions

## Error Handling

### Development Mode
- No error toasts for unavailable features
- Console warnings only
- Graceful fallback to mock data
- App continues to work normally

### Production Mode (iOS)
- Real permission dialogs
- User can grant or deny
- If denied: Show helpful error toast
- Link to Settings to enable

## Best Practices for Development

### 1. Check Console Logs
Always have console open to see:
- What mode you're in (development/production)
- What data is being loaded (mock/real)
- Any warnings or errors

### 2. Test Both Modes
- **Development (Browser)**: Test UI/UX with mock data
- **Production (iOS Device)**: Test real integrations

### 3. Ignore Development Warnings
These are normal in browser:
```javascript
"HealthKit not available on this platform (using mock data for development)"
"Using mock location data for development"
```

### 4. Verify on Real Device
Before shipping, always test on real iOS device:
- Real permission flows
- Real step data sync
- Real location updates
- Real nearby friends (when backend ready)

## Customizing Mock Data

### Change Mock Steps
Edit `/utils/healthKit.ts`:
```typescript
private getMockSteps(): number {
  // Return any number you want for testing
  return 10000; // Always return 10k steps
}
```

### Change Mock Location
Edit `/utils/geolocation.ts`:
```typescript
private getMockLocation(): UserLocation {
  return {
    latitude: 40.7128,  // New York City
    longitude: -74.0060,
    accuracy: 10,
    timestamp: Date.now()
  };
}
```

### Change Mock Friends
Edit `/utils/geolocation.ts`:
```typescript
const friendCount = Math.floor(Math.random() * 4) + 3; // 3-6 friends
// Change to:
const friendCount = 10; // Always 10 friends
```

## Debugging Tips

### Issue: No step data showing
**Check:**
1. Console for "Steps data loaded: X"
2. Time of day (morning = low steps)
3. `gameState.steps` value

### Issue: No nearby friends
**Check:**
1. Console for "Found X nearby friends"
2. Location permission status
3. Network errors in console

### Issue: Errors in console
**Ignore if development warnings:**
- "not available on this platform"
- "using mock data"

**Investigate if:**
- JavaScript errors
- Failed network requests
- Undefined variables

## Production Checklist

Before deploying to App Store:

- [ ] Test on real iOS device
- [ ] Verify HealthKit permission flow
- [ ] Verify Location permission flow
- [ ] Confirm steps sync from Health app
- [ ] Confirm GPS location works
- [ ] Check permission denial handling
- [ ] Review console for real errors
- [ ] Test with Health app having real step data
- [ ] Test permission flows (grant/deny/change)

## Summary

✅ **Development Mode** (Browser)
- Uses mock data automatically
- No error toasts
- Console logs inform you
- Perfect for UI/UX testing

✅ **Production Mode** (iOS)
- Uses real HealthKit & Location APIs
- Real permission dialogs
- Real error handling
- Ready for App Store

**No code changes needed when switching between modes!**

The app intelligently detects the platform and behaves accordingly. 🎉

---

For more details, see:
- `CAPACITOR_INTEGRATION.md` - iOS setup guide
- `INTEGRATION_SUMMARY.md` - Feature overview
- `/utils/healthKit.ts` - Health service code
- `/utils/geolocation.ts` - Location service code
