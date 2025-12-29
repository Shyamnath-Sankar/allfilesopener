# API Documentation

This document provides detailed API documentation for the utilities and constants used in the Universal File Opener app.

## File Utilities (`src/utils/fileUtils.js`)

### `pickDocument()`

Opens the document picker to select a file from device storage.

**Returns:** `Promise<Object|null>`

**Returns Object Structure:**
```javascript
{
  uri: string,           // File URI
  name: string,          // File name
  size: number,          // File size in bytes
  mimeType: string,      // MIME type
  type: string,          // File type (EXCEL, WORD, PDF, etc.)
  icon: string,          // Emoji icon
  color: string,         // Hex color code
  typeName: string       // Human-readable type name
}
```

**Returns:** `null` if user cancels

**Throws:** Error if picker fails

**Example:**
```javascript
const file = await pickDocument();
if (file) {
  console.log('Selected file:', file.name);
}
```

---

### `shareFile(uri)`

Shares a file using the native sharing dialog.

**Parameters:**
- `uri` (string): The file URI to share

**Returns:** `Promise<void>`

**Throws:** 
- Error if sharing is not available
- Error if sharing fails

**Example:**
```javascript
await shareFile(file.uri);
```

---

### `getFileInfo(uri)`

Gets detailed information about a file.

**Parameters:**
- `uri` (string): The file URI

**Returns:** `Promise<Object|null>`

**Returns Object Structure:**
```javascript
{
  exists: boolean,
  uri: string,
  size: number,
  isDirectory: boolean,
  modificationTime: number,
  md5?: string
}
```

**Returns:** `null` if file info cannot be retrieved

**Example:**
```javascript
const info = await getFileInfo(file.uri);
if (info && info.exists) {
  console.log('File size:', info.size);
}
```

---

### `deleteFile(uri)`

Deletes a file from the device.

**Parameters:**
- `uri` (string): The file URI to delete

**Returns:** `Promise<void>`

**Throws:** Error if deletion fails

**Example:**
```javascript
await deleteFile(file.uri);
```

---

## Storage Utilities (`src/utils/storage.js`)

### `saveRecentFile(fileInfo)`

Saves a file to the recent files list.

**Parameters:**
- `fileInfo` (Object): File information object

**Returns:** `Promise<Array>` - Updated list of recent files

**Behavior:**
- Adds file to the top of the list
- Removes duplicates (same URI)
- Limits to MAX_RECENT_FILES (20)
- Adds `openedAt` timestamp

**Example:**
```javascript
const recentFiles = await saveRecentFile({
  uri: file.uri,
  name: file.name,
  size: file.size,
  type: file.type,
  icon: file.icon,
  color: file.color,
  typeName: file.typeName
});
```

---

### `getRecentFiles()`

Retrieves the list of recent files.

**Returns:** `Promise<Array>` - Array of file objects

**Returns:** `[]` (empty array) if no recent files

**Example:**
```javascript
const recentFiles = await getRecentFiles();
console.log('Recent files:', recentFiles.length);
```

---

### `clearRecentFile(uri)`

Removes a specific file from recent files.

**Parameters:**
- `uri` (string): The file URI to remove

**Returns:** `Promise<Array>` - Updated list of recent files

**Example:**
```javascript
const updatedFiles = await clearRecentFile(file.uri);
```

---

### `clearAllRecentFiles()`

Clears all recent files from storage.

**Returns:** `Promise<void>`

**Example:**
```javascript
await clearAllRecentFiles();
```

---

## File Type Constants (`src/constants/fileTypes.js`)

### `FILE_TYPES`

Object containing all supported file types.

**Structure:**
```javascript
{
  TYPE_NAME: {
    extensions: string[],
    mimeTypes: string[],
    icon: string,
    color: string,
    name: string
  }
}
```

**Available Types:**
- `EXCEL`: Excel spreadsheets
- `WORD`: Word documents
- `POWERPOINT`: PowerPoint presentations
- `PDF`: PDF documents
- `TEXT`: Plain text files
- `CSV`: CSV files
- `JSON`: JSON files

**Example:**
```javascript
console.log(FILE_TYPES.EXCEL.extensions); // ['.xlsx', '.xls', ...]
console.log(FILE_TYPES.PDF.color);        // '#F40F02'
```

---

### `getFileType(fileName)`

Determines the file type based on the file name.

**Parameters:**
- `fileName` (string): The file name with extension

**Returns:** `Object`

**Returns Object Structure:**
```javascript
{
  type: string,      // Type key (e.g., 'EXCEL', 'UNKNOWN')
  extensions: array, // Supported extensions
  mimeTypes: array,  // MIME types
  icon: string,      // Emoji icon
  color: string,     // Hex color
  name: string       // Display name
}
```

**Example:**
```javascript
const type = getFileType('document.pdf');
console.log(type.type);  // 'PDF'
console.log(type.icon);  // '📕'
console.log(type.name);  // 'PDF Document'
```

---

### `isFileSupported(fileName)`

Checks if a file type is supported.

**Parameters:**
- `fileName` (string): The file name with extension

**Returns:** `boolean`

**Example:**
```javascript
if (isFileSupported('document.pdf')) {
  console.log('This file is supported!');
}
```

---

### `formatFileSize(bytes)`

Formats a file size in bytes to a human-readable string.

**Parameters:**
- `bytes` (number): File size in bytes

**Returns:** `string` - Formatted size (e.g., "1.5 MB")

**Example:**
```javascript
console.log(formatFileSize(1024));        // "1 KB"
console.log(formatFileSize(1536000));     // "1.47 MB"
console.log(formatFileSize(0));           // "0 Bytes"
```

---

### `formatDate(timestamp)`

Formats a timestamp to a relative date string.

**Parameters:**
- `timestamp` (number|string|Date): The timestamp to format

**Returns:** `string` - Formatted date

**Formats:**
- "Today" - If today
- "Yesterday" - If yesterday
- "X days ago" - If within a week
- Date string - If older than a week

**Example:**
```javascript
console.log(formatDate(new Date()));              // "Today"
console.log(formatDate(Date.now() - 86400000));   // "Yesterday"
console.log(formatDate(Date.now() - 259200000));  // "3 days ago"
```

---

## Component Props

### `FileItem`

Displays a file item in a list.

**Props:**
- `file` (Object): File information object
- `onPress` (Function): Called when item is pressed
- `onDelete` (Function): Called when delete is requested

**Example:**
```jsx
<FileItem
  file={file}
  onPress={(file) => console.log('Pressed:', file.name)}
  onDelete={(uri) => console.log('Delete:', uri)}
/>
```

---

### `EmptyState`

Displays an empty state message.

**Props:**
- `icon` (string): Emoji icon to display
- `title` (string): Title text
- `message` (string): Description message

**Example:**
```jsx
<EmptyState
  icon="📭"
  title="No Files"
  message="No files have been opened yet"
/>
```

---

### `LoadingOverlay`

Displays a loading modal overlay.

**Props:**
- `visible` (boolean): Whether to show the overlay
- `message` (string): Loading message (default: "Loading...")

**Example:**
```jsx
<LoadingOverlay
  visible={isLoading}
  message="Opening file..."
/>
```

---

### `FileViewer`

Displays file content based on file type.

**Props:**
- `file` (Object): File information object

**Example:**
```jsx
<FileViewer file={file} />
```

---

## Navigation

### Screen Names
- `Home`: Home screen
- `Recent`: Recent files screen
- `FileDetails`: File details screen

### Navigation Parameters

**FileDetailsScreen:**
```javascript
navigation.navigate('FileDetails', {
  file: {
    uri: string,
    name: string,
    size: number,
    type: string,
    icon: string,
    color: string,
    typeName: string,
    mimeType: string
  }
});
```

**Example:**
```javascript
navigation.navigate('FileDetails', { file });
```

---

## Constants

### Storage Keys
- `@recent_files`: AsyncStorage key for recent files

### Limits
- `MAX_RECENT_FILES`: 20 files

### File Size Units
- Bytes
- KB (1024 bytes)
- MB (1024 KB)
- GB (1024 MB)

---

## Error Handling

All async functions use try-catch blocks and throw errors that should be caught by the calling code.

**Example Error Handling:**
```javascript
try {
  const file = await pickDocument();
  if (file) {
    // Process file
  }
} catch (error) {
  console.error('Error picking document:', error);
  Alert.alert('Error', 'Failed to pick file');
}
```

---

## Best Practices

1. **Always check for null returns** from `pickDocument()`
2. **Handle errors** with try-catch blocks
3. **Validate file existence** before operations
4. **Use formatters** for consistent UI display
5. **Clean up resources** in useEffect cleanup functions
6. **Check file type support** before processing

---

## Type Definitions (Pseudo-TypeScript)

```typescript
type FileInfo = {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
  type: string;
  icon: string;
  color: string;
  typeName: string;
  openedAt?: string;
};

type FileType = {
  extensions: string[];
  mimeTypes: string[];
  icon: string;
  color: string;
  name: string;
};

type FileSystemInfo = {
  exists: boolean;
  uri: string;
  size: number;
  isDirectory: boolean;
  modificationTime: number;
  md5?: string;
};
```

---

For more information, see the [DEVELOPMENT.md](./DEVELOPMENT.md) guide.
