# Universal File Opener

A comprehensive React Native mobile app built with Expo that serves as a universal file opener supporting multiple file formats.

## Features

### 🚀 Core Functionality
- **File Selection**: Pick files from device storage using an intuitive file picker
- **Multi-Format Support**: Open and view various file types
- **Cross-Platform**: Works on both iOS and Android
- **Recent Files**: Track and quickly access recently opened files
- **File Sharing**: Share files with other apps on the device
- **File Information**: View detailed metadata for each file

### 📄 Supported File Types
- **Microsoft Excel**: `.xlsx`, `.xls`, `.xlsm`, `.xlsb`
- **Microsoft Word**: `.docx`, `.doc`, `.docm`
- **Microsoft PowerPoint**: `.pptx`, `.ppt`, `.pptm`
- **PDF Documents**: `.pdf`
- **Text Files**: `.txt`, `.text`
- **CSV Files**: `.csv`
- **JSON Files**: `.json`

### 🎨 UI/UX Features
- Clean, modern interface with intuitive navigation
- Recently opened files list with quick access
- File metadata display (name, size, type, date)
- Share and file management options
- Error handling with helpful messages
- Loading states and smooth transitions

## Tech Stack

- **React Native** with Expo SDK 54
- **Expo Document Picker** for file selection
- **Expo File System** for file operations
- **Expo Sharing** for file sharing
- **React Navigation** for app navigation
- **AsyncStorage** for recent files tracking
- **React Native WebView** for document rendering
- **React Native Safe Area Context** for safe area handling

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── FileItem.js          # File list item component
│   │   ├── EmptyState.js        # Empty state component
│   │   ├── LoadingOverlay.js    # Loading modal component
│   │   └── FileViewer.js        # Main file viewer component
│   ├── screens/
│   │   ├── HomeScreen.js        # Home screen with file picker
│   │   ├── RecentFilesScreen.js # Recent files list
│   │   └── FileDetailsScreen.js # File details and viewer
│   ├── utils/
│   │   ├── fileUtils.js         # File operations utilities
│   │   └── storage.js           # AsyncStorage utilities
│   └── constants/
│       └── fileTypes.js         # File type definitions
├── assets/                      # App assets
├── App.js                       # Main app entry point
└── package.json                 # Dependencies
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on a device or emulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Scan the QR code with Expo Go app on your device

## Usage

### Opening Files
1. Launch the app
2. Tap "Browse Files" on the home screen
3. Select a file from your device
4. The app will display the file content or offer sharing options

### Recent Files
1. Tap "View Recent Files" on the home screen
2. Tap any file to open it again
3. Long press a file to remove it from recent files
4. Use "Clear All" to remove all recent files

### File Viewing
- **Text Files** (TXT, CSV, JSON): Displayed directly in the app with syntax highlighting for JSON
- **PDF Files**: Rendered using WebView
- **Office Files** (Excel, Word, PowerPoint): Preview not available in-app, but can be shared to native apps

### Sharing Files
1. Open a file in the File Details screen
2. Switch to the "File Info" tab
3. Tap "Share File" to share with other apps
4. For Office files, tap "Open in App" for instructions

## How It Works

### File Type Detection
The app automatically detects file types based on file extensions and assigns appropriate:
- Icons and colors for visual identification
- MIME types for proper handling
- View strategies based on file type

### File Viewing Strategies
- **Text-based files**: Read and display content directly
- **PDF files**: Use WebView for rendering
- **Office files**: Provide sharing options to open in native apps

### Recent Files Management
- Files are saved to AsyncStorage when opened
- Limited to 20 most recent files
- Duplicate entries are automatically removed
- Files are validated before display (checked if still exist)

## Limitations

### Office Files (Excel, Word, PowerPoint)
Due to the complexity of Office file formats and Expo Go limitations:
- **Preview**: Not available directly in the app
- **Solution**: Use the Share feature to open in Microsoft Office, Google Docs, or other compatible apps
- This is a common limitation in React Native apps running on Expo Go

### Large Files
Very large files (>100MB) may cause performance issues depending on:
- Device capabilities
- Available memory
- File type and complexity

### File Access
- The app can only access files through the document picker
- Some system files may be restricted by the OS
- Files must be readable by the app

## Testing

### Test with Sample Files
1. Create test files in various formats (TXT, PDF, CSV, JSON)
2. Test file opening and viewing
3. Test recent files functionality
4. Test error handling with corrupted files
5. Test sharing functionality

### Edge Cases Handled
- Corrupted or invalid files
- Very large files
- Unsupported file formats
- Missing file permissions
- File no longer exists

## Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

Note: Building for production requires an EAS account and proper configuration.

## Troubleshooting

### App Crashes When Opening Files
- Check if the file is corrupted
- Verify file permissions
- Try a smaller file
- Check device available memory

### Recent Files Not Showing
- Clear app cache and restart
- Check AsyncStorage permissions
- Verify files still exist on device

### Office Files Won't Open
- This is expected behavior in Expo Go
- Use the Share feature to open in native apps
- For production apps, consider using native modules

## Future Enhancements

- [ ] Dark mode support
- [ ] File search functionality
- [ ] File categories and filtering
- [ ] Cloud storage integration (Google Drive, Dropbox)
- [ ] File compression/decompression
- [ ] Document annotation tools
- [ ] Native Office file preview (production build)
- [ ] File encryption/decryption

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- Expo team for the amazing framework
- React Navigation for routing
- All open-source contributors

---

Built with ❤️ using React Native and Expo
