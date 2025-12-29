# Quick Start Guide

Get up and running with Universal File Opener in minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Expo Go app on your mobile device (iOS or Android)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd universal-file-opener
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npx expo start
```

This will start the Metro bundler and display a QR code in your terminal.

### 4. Open on Your Device

**Option A: Scan QR Code**
1. Open the Expo Go app on your device
2. Tap "Scan QR Code"
3. Point your camera at the QR code in the terminal
4. Wait for the app to load

**Option B: Development Build (Optional)**
```bash
# For Android
npx expo start --android

# For iOS (macOS only)
npx expo start --ios
```

## Testing the App

### 1. Test File Opening

1. On the home screen, tap "📂 Browse Files"
2. Select a file from your device
3. The file will open in the viewer

### 2. Test Recent Files

1. Open a few different files
2. Tap "🕒 View Recent Files" on the home screen
3. You'll see your recently opened files
4. Tap any file to open it again
5. Long press to remove from recent files

### 3. Test File Sharing

1. Open a file in the File Details screen
2. Switch to the "File Info" tab
3. Tap "📤 Share File"
4. Choose an app to share with

### 4. Test Different File Types

Use the sample files in the `test-files/` directory:
- `sample.txt` - Text file
- `sample.json` - JSON file
- `sample.csv` - CSV file

Create or download additional test files:
- PDF documents
- Excel spreadsheets
- Word documents
- PowerPoint presentations

## Supported File Types

### ✅ Full Preview Support
- Text files (.txt)
- JSON files (.json)
- CSV files (.csv)
- PDF files (.pdf)

### 📱 Share to Native App
- Excel (.xlsx, .xls)
- Word (.docx, .doc)
- PowerPoint (.pptx, .ppt)

For Office files, use the Share button to open them in:
- Microsoft Office apps
- Google Docs/Sheets/Slides
- Other compatible apps

## Common Commands

```bash
# Start development server
npx expo start

# Clear cache and restart
npx expo start --clear

# Check for issues
npx expo doctor

# Update dependencies
npx expo install --fix

# View logs
npx expo start --dev-client
```

## Troubleshooting

### Metro Bundler Won't Start
```bash
# Kill any running processes
pkill -f expo

# Clear cache and restart
npx expo start --clear
```

### Can't Scan QR Code
- Make sure your computer and phone are on the same network
- Try using the Expo Go app's manual connection option
- Enter the connection URL manually

### File Picker Not Working
- Grant file access permissions when prompted
- Check device storage permissions in Settings
- Restart the app

### App Crashes on File Open
- Check if the file is corrupted
- Try a smaller file
- Check console logs for errors
- Restart the app

## Next Steps

Once you have the app running:

1. **Read the Documentation**
   - [README.md](./README.md) - Full documentation
   - [DEVELOPMENT.md](./DEVELOPMENT.md) - Developer guide
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

2. **Explore the Code**
   - Check out the project structure
   - Review components and screens
   - Understand the file type system

3. **Customize the App**
   - Add new file types
   - Modify the UI
   - Add new features

4. **Contribute**
   - Report bugs
   - Suggest features
   - Submit pull requests

## Getting Help

- Check the [README](./README.md) for detailed information
- Review [DEVELOPMENT.md](./DEVELOPMENT.md) for technical details
- Open an issue on GitHub for bugs or questions
- Contact the maintainers

---

Happy file opening! 📁✨
