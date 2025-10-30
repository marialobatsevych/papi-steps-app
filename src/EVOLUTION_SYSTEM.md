# Papi Steps - Character Evolution System

## Overview
The character evolution system automatically changes Papi's appearance based on the user's total number of steps accumulated over time.

## Evolution Stages

### 1. Birth Papi (0 - 10,000 steps)
- Starting stage for all new players
- Features adorable egg-like appearance
- Alternates between two frames (closed eyes / open eyes) for a blinking animation
- Color theme: Soft pink gradient in progress bar

### 2. Baby Papi (10,001 - 20,000 steps)
- First evolution at 10,000 steps
- TODO: Add Baby Papi character images
- Color theme: Lavender/purple gradient

### 3. Teenager Papi (20,001 - 30,000 steps)
- Second evolution at 20,000 steps
- TODO: Add Teenager Papi character images
- Color theme: Light blue gradient

### 4. Adult Papi (30,001 - 50,000+ steps)
- Final evolution at 30,000 steps
- Maximum level reached
- TODO: Add Adult Papi character images
- Color theme: Golden yellow gradient
- Special "Max Level!" indicator appears when reaching 50,000 steps

## Key Features

### Evolution Progress Bar
- Displays current evolution stage name
- Shows progress within the current stage
- Animated gradient changes color based on stage
- Shows steps remaining to next evolution
- Glassmorphism effect with soft backdrop blur

### Evolution Animation
When evolving to a new stage:
1. Previous character image fades out (0.5s)
2. Beautiful sparkle effects appear around the character
3. Multi-colored glowing aura pulses
4. New character image fades in with scale animation (1s)
5. Sparkles continue for full evolution effect

### Birth Papi Animation
- Unique blinking animation
- Alternates between two frames every 1.5 seconds
- Creates a cute, alive feeling even at the first stage

## Technical Implementation

### Components
- `EvolutionPapiCharacter.tsx` - Main character component with evolution logic
- `EvolutionProgress.tsx` - Progress bar showing evolution stage and progress
- Helper function `getEvolutionProgress()` - Calculates current stage and progress

### CSS Animations
- `evolution-fade-out` - Smooth fade out of previous stage
- `evolution-fade-in` - Dramatic fade in of new stage
- `evolution-glow` - Pulsing glow effect during evolution

### State Management
- `totalSteps` - Accumulated total steps (persists across sessions)
- Automatically calculates current evolution stage
- Triggers evolution animation when crossing thresholds

## Testing
Development buttons have been added to the home screen:
- "+1K Steps" - Add 1,000 steps for quick testing
- "+5K Steps" - Add 5,000 steps to test evolution transitions

**Note:** These buttons should be removed in production or hidden behind a debug flag.

## Next Steps
1. Add actual character images for Baby, Teenager, and Adult stages
2. Import images and update the `getCharacterImage()` function in `EvolutionPapiCharacter.tsx`
3. Consider adding sound effects for evolution
4. Add celebration modal when evolving
5. Implement persistence to save totalSteps to localStorage or backend

## Usage Example

```tsx
// In App.tsx
const [gameState, setGameState] = useState({
  totalSteps: 5500, // Current total accumulated steps
  // ... other state
});

// In KawaiiHomeScreen.tsx
<EvolutionProgress totalSteps={totalSteps} />
<EvolutionPapiCharacter totalSteps={totalSteps} />
```

## Design Philosophy
The evolution system maintains the kawaii aesthetic with:
- Soft pastel gradients for each stage
- Smooth, gentle animations
- Rounded corners and soft shadows
- Playful sparkle effects
- Clear visual feedback for progress
