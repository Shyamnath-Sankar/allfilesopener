# Development Guide

This document provides detailed information for developers working on the Universal File Opener project.

## Architecture Overview

### Component Structure

The app follows a modular architecture with clear separation of concerns:

```
src/
├── components/      # Reusable UI components
├── screens/         # Screen-level components
├── utils/           # Helper functions and utilities
└── constants/       # App-wide constants and configurations
```

### Data Flow

1. **File Selection**: User picks a file via `expo-document-picker`
2. **File Processing**: File metadata is extracted and formatted
3. **Storage**: File info is saved to AsyncStorage for recent files
4. **Display**: File content is rendered based on file type
5. **Sharing**: Files can be shared via `expo-sharing`

## Key Components

### FileViewer Component
**Location**: `src/components/FileViewer.js`

Handles rendering different file types:
- Text files: Direct display with formatting
- PDF files: WebView rendering
- Office files: Instructions for external viewing

### FileItem Component
**Location**: `src/components/FileItem.js`

Displays file information in lists with:
- File icon and name
- File type and size
- Last opened date
- Long press for options

## Utilities

### fileUtils.js
**Location**: `src/utils/fileUtils.js`

Core file operations:
- `pickDocument()`: Opens document picker
- `shareFile(uri)`: Shares file with other apps
- `getFileInfo(uri)`: Gets file metadata
- `deleteFile(uri)`: Deletes a file

### storage.js
**Location**: `src/utils/storage.js`

Recent files management:
- `saveRecentFile(fileInfo)`: Adds file to recent list
- `getRecentFiles()`: Retrieves recent files
- `clearRecentFile(uri)`: Removes a file from recent
- `clearAllRecentFiles()`: Clears all recent files

## File Type System

### File Type Detection
**Location**: `src/constants/fileTypes.js`

The `getFileType()` function:
1. Extracts file extension
2. Matches against FILE_TYPES constants
3. Returns type metadata (icon, color, name, MIME type)

### Supported Types

Each file type has:
- **extensions**: Array of supported extensions
- **mimeTypes**: Array of MIME types
- **icon**: Emoji for visual representation
- **color**: Brand color for the file type
- **name**: Human-readable name

## Navigation

### Stack Navigator Structure

```
HomeScreen (Root)
  ├── RecentFilesScreen
  └── FileDetailsScreen
```

Navigation params:
- `FileDetailsScreen`: Receives `file` object with metadata

## State Management

### Local State
- Component-level state for UI interactions
- React hooks (useState, useEffect, useCallback)

### Persistent State
- AsyncStorage for recent files
- Survives app restarts
- Limited to 20 most recent files

## Error Handling

### File Operations
- Try-catch blocks for all async operations
- User-friendly error messages via Alert
- Console logging for debugging

### File Validation
- Check file existence before display
- Validate file access permissions
- Handle corrupted or invalid files

## Performance Considerations

### Large Files
- Implement file size checks
- Show warnings for very large files
- Consider chunked reading for text files

### Memory Management
- Proper cleanup in useEffect hooks
- Avoid memory leaks with cleanup functions
- Optimize list rendering with FlatList

## Testing

### Manual Testing Checklist

#### File Selection
- [ ] Open document picker
- [ ] Select various file types
- [ ] Cancel file selection
- [ ] Test with very large files

#### File Viewing
- [ ] View text files
- [ ] View PDF files
- [ ] Attempt Office files (should show message)
- [ ] Test with corrupted files

#### Recent Files
- [ ] Files saved on open
- [ ] Recent list displays correctly
- [ ] Long press to delete
- [ ] Clear all recent files
- [ ] Refresh to update list

#### File Sharing
- [ ] Share text file
- [ ] Share PDF file
- [ ] Share Office file
- [ ] Cancel sharing

### Device Testing
- Test on iOS simulator/device
- Test on Android emulator/device
- Test on different screen sizes
- Test with different OS versions

## Common Issues and Solutions

### Issue: Office Files Not Opening
**Solution**: This is expected. Office files require native apps. Use sharing functionality.

### Issue: PDF Not Rendering
**Solution**: Check WebView implementation. Some PDFs may have restrictions.

### Issue: Recent Files Not Persisting
**Solution**: Verify AsyncStorage permissions. Check for errors in console.

### Issue: File Picker Not Opening
**Solution**: Ensure proper permissions in app.json. Check Expo Go compatibility.

## Development Workflow

### Adding a New File Type

1. Add to `FILE_TYPES` in `src/constants/fileTypes.js`:
   ```javascript
   NEW_TYPE: {
     extensions: ['.ext'],
     mimeTypes: ['application/ext'],
     icon: '📄',
     color: '#000000',
     name: 'New File Type'
   }
   ```

2. Add rendering logic in `FileViewer.js`:
   ```javascript
   case 'NEW_TYPE':
     return renderNewTypeViewer();
   ```

3. Test with sample files

### Adding a New Screen

1. Create screen component in `src/screens/`
2. Add to Stack Navigator in `App.js`
3. Update navigation calls in other screens
4. Test navigation flow

### Adding a New Feature

1. Create feature branch
2. Implement feature with proper error handling
3. Test on both iOS and Android
4. Update documentation
5. Submit pull request

## Best Practices

### Code Style
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into utilities
- Use meaningful variable names
- Add JSDoc comments for complex functions

### Performance
- Use React.memo for expensive components
- Implement proper key props in lists
- Avoid inline function definitions in renders
- Use useCallback and useMemo appropriately

### Error Handling
- Always wrap async operations in try-catch
- Provide user-friendly error messages
- Log errors for debugging
- Handle edge cases gracefully

### Security
- Validate file types before processing
- Be cautious with file URIs
- Don't expose sensitive information
- Follow platform security guidelines

## Debugging

### Common Debug Commands

```bash
# Clear Metro bundler cache
npx expo start --clear

# View logs
npx expo start --dev-client

# Check for issues
npx expo doctor
```

### Debug Tools
- React Native Debugger
- Expo Dev Tools
- Chrome DevTools (for WebView)
- console.log statements

## Deployment

### Pre-deployment Checklist
- [ ] Test on real devices
- [ ] Update version in app.json
- [ ] Update CHANGELOG
- [ ] Test all file types
- [ ] Verify error handling
- [ ] Check performance
- [ ] Update documentation

### Build Commands

```bash
# Development build
npx expo start

# Production build (requires EAS)
eas build --platform android
eas build --platform ios
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Document Picker](https://docs.expo.dev/versions/latest/sdk/document-picker/)

## Support

For questions or issues:
1. Check this documentation
2. Search existing issues
3. Open a new issue with details
4. Contact maintainers

---

Happy coding! 🚀
