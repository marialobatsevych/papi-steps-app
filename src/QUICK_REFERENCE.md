# ⚡ Quick Reference - Papi Steps

Fast reference for common tasks and commands.

---

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/papi-steps-app.git
cd papi-steps-app

# Install dependencies
npm install

# Start development
npm run dev
```

---

## 📦 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint code |
| `npm run type-check` | TypeScript type checking |

---

## 📱 Capacitor Commands

| Command | Description |
|---------|-------------|
| `npm run capacitor:sync` | Sync web code to native |
| `npm run capacitor:add:ios` | Add iOS platform |
| `npm run capacitor:add:android` | Add Android platform |
| `npm run ios:build` | Build and open iOS |
| `npm run android:build` | Build and open Android |

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `capacitor.config.ts` | Mobile app config |
| `vite.config.ts` | Build config |
| `tsconfig.json` | TypeScript config |
| `.env` | Environment variables |

---

## 📂 Project Structure

```
components/          React components
  screens/          Screen components
  events/           Random event components
  ui/              Reusable UI components
utils/             Utility functions
styles/            Global styles
guidelines/        Design guidelines
```

---

## 🎨 Design System

### Colors
```css
Pink:     #FFB7C5  /* Primary */
Lavender: #C8B8FF  /* Secondary */
Mint:     #B8E3FF  /* Tertiary */
Yellow:   #FFD66C  /* Coins */
```

### Font
- Family: Nunito
- Weights: 400, 600, 700, 800

---

## 🐛 Common Issues

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Capacitor sync fails
```bash
npx cap sync --force
```

### Build fails
```bash
npm run type-check
npm run lint
```

---

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/name

# Commit changes
git add .
git commit -m "feat: description"

# Push to GitHub
git push origin feature/name
```

---

## 🔐 Environment Variables

```env
VITE_APP_NAME=Papi Steps
VITE_APP_VERSION=2.9.1
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_GEOLOCATION=true
VITE_ENABLE_HEALTH_KIT=true
```

---

## 📚 Documentation

| File | Topic |
|------|-------|
| `README.md` | Main documentation |
| `DEPLOYMENT_GUIDE.md` | CodeMagic deployment |
| `GITHUB_SETUP.md` | GitHub setup |
| `CONTRIBUTING.md` | Contributing guide |
| `EVOLUTION_SYSTEM.md` | Evolution mechanics |
| `DAILY_BONUS_SYSTEM.md` | Daily rewards |
| `RANDOM_EVENTS_SYSTEM.md` | Random events |
| `SLEEP_SYSTEM.md` | Sleep mechanics |

---

## 🎯 App Info

```
Name: Papi Steps
ID: com.marialobatsevych.papi
Version: 2.9.1
Platforms: iOS, Android
```

---

## 📞 Support

- **Issues**: GitHub Issues
- **Docs**: Check `.md` files
- **Code**: Read existing code

---

**Quick Reference v2.9.1**
