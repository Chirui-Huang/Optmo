# 🔒 Security Configuration Guide

## Protecting Sensitive Information

This project uses several methods to keep sensitive information secure:

### 1. **Private Configuration (JavaScript)**
- **File**: `js/private-config.js` (contains sensitive frontend config)
- **Status**: Ignored by `.gitignore` - **never committed to git**
- **Template**: `js/private-config.example.js` shows the required structure

#### Setup Instructions:
```bash
# Copy the example file to create your local config
cp js/private-config.example.js js/private-config.js

# Edit the file and add your actual password
# DO NOT commit this file!
```

### 2. **Environment Variables**
- **File**: `.env` (contains sensitive backend config)
- **Status**: Ignored by `.gitignore` - **never committed to git**
- **Template**: `.env.example` shows all available variables

#### Setup Instructions:
```bash
# Copy the example file to create your local config
cp .env.example .env

# Edit the file with your actual values
# DO NOT commit this file!
```

### 3. **PocketBase Local Data**
- **Directory**: `pb_data/`, `pocketbase/`
- **Status**: Ignored by `.gitignore` - local development only

---

## Before Pushing to GitHub

1. ✅ **Verify `.gitignore` is in place** - protects sensitive files
2. ✅ **Check git history** - ensure no secrets were previously committed
3. ✅ **Create local config files** - use the `.example` templates
4. ✅ **Never commit**:
   - `js/private-config.js`
   - `.env`
   - `pb_data/` directory
   - `pocketbase/` directory
   - Any `.key`, `.pem`, or credential files

---

## Development Setup

1. Clone the repository
2. Copy example files:
   ```bash
   cp js/private-config.example.js js/private-config.js
   cp .env.example .env
   ```
3. Edit the files with your local values
4. Start developing!

---

## Checking for Secrets

To scan for accidental hardcoded secrets:
```bash
bash scripts/scan_secrets.sh
```

This script checks all tracked files for common secret patterns.

---

## Summary

✅ **Current Status**: All sensitive information is properly protected
- No secrets in git history
- `.gitignore` covers all sensitive files
- Templates provided for easy setup
- Secret scanning script available

You're safe to push to GitHub! 🚀
