# Installation Guide

Complete installation and setup guide for the Universal File Opener app.

## System Requirements

### Development Machine
- **Operating System**: macOS, Windows, or Linux
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Expo CLI**: Will be installed via npx

### Mobile Device (for testing)
- **iOS**: iPhone running iOS 13.4 or higher with Expo Go app
- **Android**: Device running Android 5.0 or higher with Expo Go app

## Step-by-Step Installation

### 1. Verify Prerequisites

Check if Node.js is installed:
```bash
node --version
# Should show v18.x.x or higher
```

Check npm version:
```bash
npm --version
# Should show 9.x.x or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. Clone the Repository

```bash
git clone <repository-url>
cd universal-file-opener
```

Or if you have a zip file:
```bash
unzip universal-file-opener.zip
cd universal-file-opener
```

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Expo SDK 54
- React Native 0.81.5
- React Navigation
- All Expo modules (document-picker, file-system, sharing, webview)
- AsyncStorage

**Expected output:** Should complete without errors and show ~730 packages installed.

### 4. Verify Installation

Run the test script:
```bash
node test-structure.js
```

**Expected output:**
```
✅ All required files are present!
📱 Project structure is complete and ready to run!
```

### 5. Install Expo Go on Your Device

#### iOS
1. Open the App Store
2. Search for "Expo Go"
3. Install the app
4. Open Expo Go

#### Android
1. Open Google Play Store
2. Search for "Expo Go"
3. Install the app
4. Open Expo Go

### 6. Start the Development Server

```bash
npx expo start
```

**Expected output:**
- Metro bundler starts
- QR code appears in terminal
- Dev tools open in browser (optional)

### 7. Open the App on Your Device

#### Option A: QR Code (Recommended)
1. Open Expo Go app on your device
2. Tap "Scan QR code"
3. Point camera at QR code in terminal
4. Wait for app to load (first load may take 30-60 seconds)

#### Option B: Manual Connection
1. Note the connection URL in terminal (e.g., exp://192.168.1.100:8081)
2. Open Expo Go app
3. Manually enter the connection URL
4. Tap to connect

#### Option C: Emulator/Simulator
```bash
# For Android
npx expo start --android

# For iOS (macOS only)
npx expo start --ios
```

## Troubleshooting Installation

### Issue: npm install fails

**Solution 1:** Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2:** Delete node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

**Solution 3:** Use different registry
```bash
npm install --registry=https://registry.npmjs.org/
```

### Issue: Expo CLI not found

**Solution:** Install Expo CLI globally (optional)
```bash
npm install -g expo-cli
```

Or always use npx:
```bash
npx expo start
```

### Issue: Metro bundler won't start

**Solution 1:** Kill existing processes
```bash
# macOS/Linux
pkill -f expo
pkill -f metro

# Windows
taskkill /F /IM node.exe
```

**Solution 2:** Clear Metro cache
```bash
npx expo start --clear
```

**Solution 3:** Reset project
```bash
rm -rf node_modules .expo
npm install
npx expo start
```

### Issue: Can't connect device to dev server

**Solution 1:** Ensure same network
- Computer and phone must be on same Wi-Fi network
- Disable VPN if active
- Check firewall settings

**Solution 2:** Use tunnel mode
```bash
npx expo start --tunnel
```

**Solution 3:** Use LAN mode
```bash
npx expo start --lan
```

### Issue: Dependencies incompatible

**Solution:** Use Expo's install command
```bash
npx expo install --fix
```

This automatically installs compatible versions.

### Issue: Port already in use

**Solution:** Use different port
```bash
npx expo start --port 8082
```

Or kill process using port 8081:
```bash
# macOS/Linux
lsof -ti:8081 | xargs kill -9

# Windows
netstat -ano | findstr :8081
taskkill /PID [PID] /F
```

## Platform-Specific Setup

### iOS Development (macOS only)

For iOS simulator:
1. Install Xcode from App Store
2. Open Xcode and agree to license
3. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
4. Run:
   ```bash
   npx expo start --ios
   ```

### Android Development

For Android emulator:
1. Install Android Studio
2. Set up Android SDK
3. Create AVD (Android Virtual Device)
4. Run:
   ```bash
   npx expo start --android
   ```

**Note:** Emulator setup is optional. Expo Go on a real device is recommended for testing.

## Post-Installation Verification

### 1. Check App Loads

The app should display:
- Home screen with "Universal File Opener" title
- "Browse Files" button
- "View Recent Files" button
- List of supported formats

### 2. Test File Picker

1. Tap "Browse Files"
2. Device file picker should open
3. Select any file
4. File should open in File Details screen

### 3. Test Recent Files

1. Open a few files
2. Go back to home
3. Tap "View Recent Files"
4. Recently opened files should appear

### 4. Check Console for Errors

Look at Metro bundler terminal. Should show:
- No red errors
- Only informational logs

## Optional Setup

### Enable Fast Refresh
Already enabled by default in Expo.

### Configure Editor
For VS Code, install extensions:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint

### Set Up Debugging
```bash
npx expo start --dev-client
```

Then press 'j' to open debugger.

## Environment Configuration

Create `.env` file (optional):
```bash
EXPO_PUBLIC_API_URL=your-api-url
```

**Note:** Not required for basic functionality.

## Updating Dependencies

To update to latest compatible versions:
```bash
npx expo install --check
npx expo install --fix
```

## Building for Production

Requires Expo Application Services (EAS):

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build:
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

## Next Steps

After successful installation:

1. **Read Documentation**
   - [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
   - [README.md](./README.md) - Full documentation
   - [DEVELOPMENT.md](./DEVELOPMENT.md) - Developer guide

2. **Test Features**
   - Test with sample files in `test-files/`
   - Try different file types
   - Test sharing functionality

3. **Customize**
   - Modify colors and styling
   - Add new file types
   - Implement additional features

## Getting Help

- **Documentation**: Check README.md and other docs
- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev/)
- **React Native Docs**: [reactnative.dev](https://reactnative.dev/)
- **Issues**: Open an issue on GitHub

## Success Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned/downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] Test script passes (`node test-structure.js`)
- [ ] Expo Go installed on device
- [ ] Dev server starts (`npx expo start`)
- [ ] App loads on device
- [ ] File picker works
- [ ] Files can be opened
- [ ] No console errors

If all items are checked, installation is complete! 🎉

---

**Installation Support**: If you encounter issues not covered here, please open an issue with:
- Your operating system
- Node.js version
- npm version
- Error messages
- Steps to reproduce
