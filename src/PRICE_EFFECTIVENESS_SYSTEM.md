# Price & Effectiveness System

## Overview
The shop now implements a **dynamic pricing system** where item prices directly correlate with their effectiveness. More expensive items provide greater stat increases, creating meaningful purchase decisions for players.

## System Details

### Food Items
Food items restore **Hunger** stat when used. The effectiveness ranges from 15 to 55 points based on price:

| Item | Price | Effectiveness | Hunger Increase |
|------|-------|---------------|-----------------|
| Fresh Carrot | 40 coins | 15 | +15 Hunger |
| Rice Bowl | 50 coins | 20 | +20 Hunger |
| Fish Snacks | 60 coins | 25 | +25 Hunger |
| Star Cookie | 70 coins | 30 | +30 Hunger |
| Premium Bone | 80 coins | 35 | +35 Hunger |
| Cool Banana | 90 coins | 40 | +40 Hunger |
| Love Cupcake | 100 coins | 45 | +45 Hunger |
| Chicken Leg | 110 coins | 50 | +50 Hunger |
| **Meat Feast** | **120 coins** | **55** | **+55 Hunger** (Premium!) |

### Toy Items
Toy items restore **Fun** stat when used. The effectiveness ranges from 20 to 55 points based on price:

| Item | Price | Effectiveness | Fun Increase |
|------|-------|---------------|--------------|
| Tennis Ball | 50 coins | 20 | +20 Fun |
| Yarn Ball | 65 coins | 28 | +28 Fun |
| Puzzle Buddy | 75 coins | 33 | +33 Fun |
| Rainbow Cube | 85 coins | 38 | +38 Fun |
| Cuddle Bear | 95 coins | 43 | +43 Fun |
| **Space Rocket** | **130 coins** | **55** | **+55 Fun** (Premium!) |

## Calculation Formula

The effectiveness is calculated to be approximately **0.4-0.5 points per coin spent**:
- Budget items (40-70 coins): ~0.37-0.5 points per coin
- Mid-tier items (80-100 coins): ~0.44-0.45 points per coin  
- Premium items (110-130 coins): ~0.42-0.45 points per coin

This ensures:
1. **Progressive value** - Higher-tier items are worth the investment
2. **Budget options** - Cheaper items are still useful for tight budgets
3. **Strategic choices** - Players must decide between multiple cheap items or one expensive item

## Visual Indicators

In the shop UI, each food and toy item displays an **effectiveness badge** showing:
- Icon (🍖 for food, 🎾 for toys)
- Number indicating stat increase (e.g., "+35")
- Soft blue gradient background for easy visibility

## Implementation

### ShopItem Interface
```typescript
export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: 'food' | 'toys' | 'wallpapers';
  emoji: string;
  description: string;
  owned?: boolean;
  imageUrl?: string;
  effectiveness?: number; // Amount of stat increase
}
```

### InventoryItem Interface
```typescript
interface InventoryItem {
  id: string;
  name: string;
  emoji: string;
  category: 'food' | 'toys';
  imageUrl?: string;
  effectiveness?: number; // Preserved from shop item
}
```

### Usage Flow
1. Player purchases item from shop with specified `effectiveness`
2. Item is added to inventory with `effectiveness` preserved
3. When item is used, the `effectiveness` value determines stat increase
4. Toast notification shows exact amount increased

## Balance Considerations

- Maximum stat value is **100 points**
- Stats decrease over time based on the timer system
- Premium items (120-130 coins) can restore over **half** the stat bar
- Budget items (40-70 coins) restore about **15-30%** of the stat bar
- This creates natural progression: early game uses cheap items, late game uses premium items

## Future Enhancements

Potential additions to the system:
- **Combo bonuses** - Use multiple items in sequence for bonus effects
- **Quality tiers** - Common, Rare, Epic items with different effectiveness ranges
- **Special effects** - Some expensive items could have unique animations or bonuses
- **Bulk discounts** - Buy 5 of the same item, get discount on effectiveness per coin
