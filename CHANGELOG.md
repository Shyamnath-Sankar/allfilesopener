# Changelog

All notable changes to the Universal File Opener project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-29

### Added
- Initial release of Universal File Opener
- File picker functionality for selecting files from device storage
- Support for multiple file formats:
  - Microsoft Excel (.xlsx, .xls, .xlsm, .xlsb)
  - Microsoft Word (.docx, .doc, .docm)
  - Microsoft PowerPoint (.pptx, .ppt, .pptm)
  - PDF documents (.pdf)
  - Text files (.txt, .text)
  - CSV files (.csv)
  - JSON files (.json)
- File viewing capabilities:
  - Direct text file viewing with formatting
  - PDF rendering using WebView
  - Instructions for opening Office files in native apps
- Recent files functionality:
  - Track up to 20 recently opened files
  - Display with metadata (name, type, size, date)
  - Remove individual files or clear all
  - Pull to refresh
- File details screen with two tabs:
  - Preview tab for viewing file content
  - File Info tab for metadata and actions
- File sharing functionality
- Clean, modern UI with intuitive navigation
- Error handling for:
  - Unsupported file formats
  - Corrupted files
  - Missing files
  - Permission issues
- Cross-platform support (iOS and Android)
- Comprehensive documentation:
  - README with usage instructions
  - Development guide for contributors
  - Contributing guidelines
  - Sample test files

### Technical Stack
- React Native with Expo SDK 54
- React Navigation for app navigation
- AsyncStorage for persistent data
- Expo Document Picker for file selection
- Expo File System for file operations
- Expo Sharing for sharing functionality
- React Native WebView for document rendering
- React Native Safe Area Context for safe areas

### Components
- FileViewer: Main file viewing component
- FileItem: List item component for files
- EmptyState: Empty state component
- LoadingOverlay: Loading modal component

### Screens
- HomeScreen: Main landing page with file picker
- RecentFilesScreen: List of recently opened files
- FileDetailsScreen: File viewer and metadata

### Utilities
- fileUtils: File operation utilities
- storage: AsyncStorage wrapper for recent files

### Constants
- fileTypes: File type definitions and helpers

## [Unreleased]

### Planned Features
- Dark mode support
- File search functionality
- File categories and filtering
- Cloud storage integration (Google Drive, Dropbox)
- File compression/decompression
- Document annotation tools
- Enhanced Office file preview (native modules)
- File encryption/decryption
- Batch file operations
- File management (rename, delete, move)
- Favorites/bookmarks
- File history and statistics

### Known Limitations
- Office files (Excel, Word, PowerPoint) cannot be previewed directly in Expo Go
  - Workaround: Use share functionality to open in native apps
- Very large files (>100MB) may cause performance issues
- Some PDFs with restrictions may not render properly

---

[1.0.0]: https://github.com/yourusername/universal-file-opener/releases/tag/v1.0.0
