# 🔗 GitHub Setup Guide - Papi Steps

Complete guide for setting up and pushing the Papi Steps project to GitHub.

---

## 📋 Prerequisites

- Git installed on your machine
- GitHub account created
- Project files ready

---

## 🚀 Quick Setup (Recommended)

### Step 1: Create Repository on GitHub

1. **Go to GitHub**
   - Visit [https://github.com](https://github.com)
   - Sign in to your account

2. **Create New Repository**
   - Click the **+** icon in the top right
   - Select **"New repository"**

3. **Configure Repository**
   - **Owner**: `your-github-username`
   - **Repository name**: `papi-steps-app`
   - **Description**: `A kawaii wellness game with a cute puppy companion - Track your steps, take care of Papi, and have fun!`
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click **"Create repository"**

### Step 2: Initialize Local Git Repository

In your project directory, run:

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Papi Steps v2.9.1 - Production ready"
```

### Step 3: Connect to GitHub

```bash
# Add remote repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/papi-steps-app.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Verify Upload

1. Refresh your repository page on GitHub
2. You should see all files uploaded
3. README.md should display on the repository home page

---

## 📦 What Gets Pushed

The following structure will be uploaded:

```
✅ Source code (components, utils, styles)
✅ Configuration files (package.json, vite.config.ts, etc.)
✅ Documentation (all .md files)
✅ Guidelines and attributions
✅ .gitignore (prevents uploading node_modules, build files)

❌ node_modules (excluded by .gitignore)
❌ dist (build output - excluded)
❌ android/ios folders (generated - excluded)
❌ .env (secrets - excluded)
```

---

## 🔐 Important: Protect Sensitive Data

### Before Pushing, Ensure:

1. **No API Keys in Code**
   ```bash
   # Search for potential secrets
   grep -r "API_KEY" .
   grep -r "SECRET" .
   grep -r "PASSWORD" .
   ```

2. **Use Environment Variables**
   - All secrets go in `.env` (which is gitignored)
   - Share `.env.example` instead (without actual values)

3. **No Keystore Files**
   - Android keystore should NEVER be committed
   - Store securely outside repository

---

## 🏷️ Repository Settings

### 1. Add Topics

Go to repository → **About** (gear icon) → Add topics:
```
papi-steps
wellness-app
step-tracker
virtual-pet
capacitor
react
typescript
mobile-app
ios
android
kawaii
health-fitness
```

### 2. Set Description

```
🐾 A kawaii wellness game with a cute puppy companion - Track your steps, take care of Papi, and have fun!
```

### 3. Add Website (Optional)

If you have a website or landing page:
```
https://papi-steps.marialobatsevych.com
```

---

## 🌿 Branch Strategy

### Main Branch
- **Purpose**: Production-ready code
- **Protection**: Enable branch protection
- **Requirements**:
  - Require pull request reviews
  - Require status checks to pass

### Development Branch (Optional)

```bash
# Create development branch
git checkout -b develop
git push -u origin develop
```

### Feature Branches

```bash
# For new features
git checkout -b feature/new-feature-name
```

---

## 📝 Commit Conventions

Use conventional commits:

```bash
# Features
git commit -m "feat: add new evolution stage"

# Bug fixes
git commit -m "fix: resolve step counting issue"

# Documentation
git commit -m "docs: update README with new features"

# Styles
git commit -m "style: improve button animations"

# Refactoring
git commit -m "refactor: optimize health kit integration"

# Performance
git commit -m "perf: reduce bundle size"

# Tests
git commit -m "test: add unit tests for daily bonus system"

# Chores
git commit -m "chore: update dependencies"
```

---

## 🔄 Keeping Repository Updated

### Push New Changes

```bash
# After making changes
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Pull Latest Changes

```bash
git pull origin main
```

### Create a Release

```bash
# Create and push a tag
git tag -a v2.9.1 -m "Release version 2.9.1"
git push origin v2.9.1
```

Then create a release on GitHub:
1. Go to repository → **Releases** → **Create a new release**
2. Choose tag: `v2.9.1`
3. Title: `Papi Steps v2.9.1`
4. Description: Copy from CHANGELOG.md
5. Attach build artifacts (optional)
6. Click **Publish release**

---

## 🤝 Collaboration Setup

### Add Collaborators

1. Repository → **Settings** → **Collaborators**
2. Click **Add people**
3. Enter GitHub username or email
4. Select permission level

### Enable Issues

1. Repository → **Settings** → **General**
2. Check **Issues**
3. Configure issue templates (optional)

### Enable Discussions

1. Repository → **Settings** → **General**
2. Check **Discussions**
3. Create categories (Ideas, Q&A, etc.)

---

## 🔒 Security Best Practices

### 1. Enable Security Features

- **Dependabot**: Auto-update dependencies
- **Code Scanning**: Detect vulnerabilities
- **Secret Scanning**: Prevent secret leaks

Go to: **Settings** → **Security & analysis**

### 2. Add Security Policy

Create `.github/SECURITY.md`:

```markdown
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email:
maria.lobatsevych@gmail.com

Do not create public issues for security vulnerabilities.
```

### 3. Review Dependencies

```bash
npm audit
npm audit fix
```

---

## 📄 GitHub Pages (Optional)

Host documentation on GitHub Pages:

1. Create `docs` folder
2. Add documentation files
3. Repository → **Settings** → **Pages**
4. Source: Deploy from branch → `main` → `/docs`
5. Save

Access at: `https://your-username.github.io/papi-steps-app`

---

## 🎨 Customize Repository

### Add README Badges

```markdown
![Version](https://img.shields.io/badge/version-2.9.1-pink)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build Status](https://github.com/your-username/papi-steps-app/workflows/CI/badge.svg)
```

### Add Social Preview

1. Repository → **Settings** → **General**
2. Scroll to **Social preview**
3. Upload image (1280x640px)
4. Recommended: Screenshot of Papi

---

## 🔗 Connect to CodeMagic

After repository is created:

1. **Get Repository URL**
   ```
   https://github.com/YOUR-USERNAME/papi-steps-app
   ```

2. **Connect to CodeMagic**
   - Go to [codemagic.io](https://codemagic.io)
   - Add application
   - Connect GitHub
   - Select `papi-steps-app`

3. **Configure Builds**
   - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📊 Repository Insights

### View Analytics

Go to **Insights** tab to see:
- Contributors
- Traffic
- Commits
- Code frequency
- Dependency graph

### Enable Analytics

1. Repository → **Settings** → **General**
2. Enable **Traffic** insights
3. Enable **Dependency graph**

---

## 🎯 Repository Checklist

### Essential
- [ ] Repository created on GitHub
- [ ] Local git initialized
- [ ] Remote added
- [ ] Initial commit pushed
- [ ] README.md displays correctly
- [ ] .gitignore working (node_modules not pushed)
- [ ] License file included

### Recommended
- [ ] Description added
- [ ] Topics added
- [ ] Branch protection enabled
- [ ] Issues enabled
- [ ] Dependabot enabled
- [ ] Security policy added

### Optional
- [ ] GitHub Pages configured
- [ ] Discussions enabled
- [ ] Wiki created
- [ ] Projects board created
- [ ] CI/CD configured

---

## 🆘 Troubleshooting

### "Remote already exists"

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR-USERNAME/papi-steps-app.git
```

### "Large files" error

```bash
# Find large files
find . -size +50M

# Remove from git history if needed
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch PATH/TO/LARGE/FILE' \
  --prune-empty --tag-name-filter cat -- --all
```

### Authentication Issues

**HTTPS**: Use personal access token instead of password
```bash
# Generate token: GitHub → Settings → Developer settings → Personal access tokens
# Use token as password when prompted
```

**SSH**: Set up SSH key
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH and GPG keys
# Change remote to SSH
git remote set-url origin git@github.com:YOUR-USERNAME/papi-steps-app.git
```

---

## 🎉 Success!

Your repository is now live on GitHub! 🚀

**Repository URL:**
```
https://github.com/YOUR-USERNAME/papi-steps-app
```

**Next Steps:**
1. ✅ Connect to CodeMagic
2. ✅ Configure CI/CD (see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md))
3. ✅ Invite collaborators
4. ✅ Start building!

---

**Made with 💖 by Papi Steps Team**
