# 🤝 Contributing to Papi Steps

Thank you for your interest in contributing to Papi Steps! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive Behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable Behavior:**
- Harassment or discriminatory language
- Personal or political attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- Code editor (VS Code recommended)
- Xcode (for iOS development)
- Android Studio (for Android development)

### Find an Issue

1. Check [Issues](https://github.com/your-username/papi-steps-app/issues)
2. Look for `good first issue` or `help wanted` labels
3. Comment on the issue to claim it

### Report a Bug

Before creating a bug report:
1. Check existing issues
2. Update to latest version
3. Verify it's not a local environment issue

**Bug Report Template:**
```markdown
**Description:**
Clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll to '...'
4. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
If applicable

**Environment:**
- OS: [e.g., iOS 17, Android 14]
- App Version: [e.g., 2.9.1]
- Device: [e.g., iPhone 14 Pro]
```

### Suggest a Feature

**Feature Request Template:**
```markdown
**Feature Description:**
Clear description of the feature

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How should it work?

**Alternatives Considered:**
Other approaches you've thought about

**Additional Context:**
Screenshots, mockups, etc.
```

---

## 💻 Development Setup

### 1. Fork the Repository

Click **Fork** button on GitHub

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/papi-steps-app.git
cd papi-steps-app
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/original-owner/papi-steps-app.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Create .env File

```bash
cp .env.example .env
```

### 6. Start Development Server

```bash
npm run dev
```

---

## 🔨 Making Changes

### 1. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Branch Naming Convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - Code style changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Follow coding standards (see below)
- Write clean, commented code
- Update documentation as needed
- Add tests if applicable

### 3. Test Your Changes

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### 4. Commit Your Changes

See [Commit Guidelines](#commit-guidelines)

---

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(shop): add new wallpaper category"

# Bug fix
git commit -m "fix(health): resolve step counting issue on iOS"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat(api)!: change health data interface

BREAKING CHANGE: HealthKit.getSteps() now returns Promise<number> instead of number"
```

---

## 🔄 Pull Request Process

### 1. Push Changes

```bash
git push origin feature/your-feature-name
```

### 2. Create Pull Request

1. Go to your fork on GitHub
2. Click **"New Pull Request"**
3. Select your branch
4. Fill in PR template

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing

## Screenshots (if applicable)

## Related Issues
Fixes #123
```

### 3. Address Review Comments

- Be responsive to feedback
- Make requested changes
- Push updates to same branch
- Re-request review when ready

### 4. Merge

Once approved:
- Maintainer will merge your PR
- Delete your branch after merge

---

## 💅 Coding Standards

### TypeScript

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  steps: number;
}

function getUserSteps(userId: string): Promise<number> {
  // Implementation
}

// ❌ Bad
function getUserSteps(userId: any): any {
  // Implementation
}
```

### React Components

```tsx
// ✅ Good - Functional component with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function KawaiiButton({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="rounded-full bg-papi-pink"
    >
      {label}
    </button>
  );
}

// ❌ Bad - No types, no export
function Button(props) {
  return <button>{props.label}</button>;
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `KawaiiButton.tsx`)
- Utilities: `camelCase.ts` (e.g., `healthKit.ts`)
- Screens: `PascalCase.tsx` with descriptive names (e.g., `KawaiiHomeScreen.tsx`)

### Imports

```typescript
// ✅ Good - Organized imports
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { KawaiiButton } from '@components/KawaiiButton';
import { getSteps } from '@utils/healthKit';

// ❌ Bad - Messy imports
import { KawaiiButton } from '../components/KawaiiButton';
import React from 'react';
import { getSteps } from '../../utils/healthKit';
```

### Comments

```typescript
// ✅ Good - Clear, helpful comments
/**
 * Calculates daily step goal based on user's evolution stage
 * @param totalSteps - Total lifetime steps
 * @returns Daily goal in steps (3,000-30,000 range)
 */
function calculateDailyGoal(totalSteps: number): number {
  if (totalSteps < 30000) {
    return 10000; // Fixed goal during evolution stages
  }
  // Adult stage: random daily goal
  return Math.floor(Math.random() * 27000) + 3000;
}

// ❌ Bad - Useless or missing comments
function calc(n) {
  if (n < 30000) return 10000;
  return Math.floor(Math.random() * 27000) + 3000; // ???
}
```

### Design Guidelines

Follow [Guidelines.md](./guidelines/Guidelines.md):
- Use kawaii pastel colors
- Rounded corners (16-24px)
- Soft shadows
- Nunito font
- Mobile-first design

---

## 🧪 Testing

### Manual Testing

1. **Browser Testing**
   ```bash
   npm run dev
   ```
   - Test all features in browser
   - Check responsive design
   - Verify no console errors

2. **iOS Testing**
   ```bash
   npm run ios:build
   ```
   - Test on simulator
   - Test on real device
   - Verify Health Kit integration

3. **Android Testing**
   ```bash
   npm run android:build
   ```
   - Test on emulator
   - Test on real device
   - Verify step tracking

### Automated Testing (Future)

```typescript
// Example test structure
describe('DailyBonusSystem', () => {
  it('should award bonus after 24 hours', () => {
    // Test implementation
  });
});
```

---

## 📚 Documentation

### Code Documentation

- Add JSDoc comments to functions
- Explain complex logic
- Document props interfaces
- Include usage examples

### File Documentation

Update relevant `.md` files:
- `README.md` - Main documentation
- `CHANGELOG.md` - Version history
- Feature-specific docs (e.g., `SLEEP_SYSTEM.md`)

### README Updates

When adding features, update:
- Features list
- Screenshots (if applicable)
- Setup instructions (if needed)

---

## 🎨 Design Contributions

### UI/UX Improvements

1. Follow existing design system
2. Use Figma for mockups (optional)
3. Include screenshots in PR
4. Explain design decisions

### Assets

- **Images**: PNG or WebP, optimized
- **Icons**: SVG preferred
- **Animations**: Use Motion library
- **Fonts**: Nunito only

---

## 🐛 Debugging

### Common Issues

**Issue: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue: Capacitor sync fails**
```bash
npx cap sync --force
```

**Issue: Build fails**
```bash
npm run type-check
npm run lint
```

### Debug Mode

Add debug logs:
```typescript
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

---

## 📞 Getting Help

### Resources

- **Documentation**: Check all `.md` files
- **Issues**: Search existing issues
- **Discussions**: GitHub Discussions
- **Code**: Read existing implementations

### Ask Questions

1. Search for similar questions first
2. Provide context and code samples
3. Be specific about the problem
4. Share error messages/screenshots

---

## 🎉 Recognition

Contributors will be recognized:
- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes
- GitHub contributor stats

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution, no matter how small, helps make Papi Steps better! 

We appreciate your time and effort! 🐾💖

---

**Happy Contributing! 🚀**

*Made with 💖 by Papi Steps Team*
