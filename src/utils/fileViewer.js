import * as FileSystem from 'expo-file-system';
import { getInfoAsync } from 'expo-file-system/legacy';

const getRNFileViewer = () => {
  try {
    const mod = require('react-native-file-viewer');
    return mod?.default || mod;
  } catch {
    return null;
  }
};

const sanitizeFileName = (name) => {
  if (!name) return null;

  return name
    .replace(/\s+/g, ' ')
    .replace(/[^a-zA-Z0-9._ -]/g, '_')
    .trim();
};

const ensureLocalFileUri = async (uri, fileName) => {
  if (!uri) {
    throw new Error('Missing file URI');
  }

  if (uri.startsWith('file://')) {
    return uri;
  }

  const baseDir = FileSystem.cacheDirectory || FileSystem.documentDirectory;
  if (!baseDir) {
    throw new Error('No writable directory is available to open this file');
  }

  const destDir = `${baseDir}file-viewer/`;
  await FileSystem.makeDirectoryAsync(destDir, { intermediates: true });

  const safeName =
    sanitizeFileName(fileName) || `file-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const destUri = `${destDir}${safeName}`;

  await FileSystem.copyAsync({ from: uri, to: destUri });

  return destUri;
};

export const openFile = async ({ uri, name, mimeType }) => {
  console.log('[FileViewer] Opening file:', { uri, name, mimeType });
  let localUri = uri;

  if (uri.startsWith('content://')) {
    console.log('[FileViewer] Converting content:// URI to file:// URI');
    localUri = await ensureLocalFileUri(uri, name);
  } else {
    try {
      const info = await getInfoAsync(uri);
      if (!info?.exists) {
        throw new Error('File not found or no longer accessible');
      }
      
      if (!uri.startsWith('file://')) {
        console.log('[FileViewer] Converting non-file:// URI to file:// URI');
        localUri = await ensureLocalFileUri(uri, name);
      }
    } catch (error) {
      const errorMessage = typeof error?.message === 'string' ? error.message : '';
      if (errorMessage.includes('not found') || errorMessage.includes('accessible')) {
        throw error;
      }
      console.log('[FileViewer] Error checking file, attempting conversion:', errorMessage);
      localUri = await ensureLocalFileUri(uri, name);
    }
  }

  if (!localUri.startsWith('file://')) {
    throw new Error('Unable to convert file to a valid file:// URI');
  }

  console.log('[FileViewer] Final URI:', localUri);

  const RNFileViewer = getRNFileViewer();
  if (!RNFileViewer?.open) {
    console.error('[FileViewer] react-native-file-viewer not available');
    throw new Error('File viewer not available. Please install a compatible app to open this file type.');
  }

  try {
    console.log('[FileViewer] Opening with react-native-file-viewer');
    await RNFileViewer.open(localUri, {
      showOpenWithDialog: false,
      showAppsSuggestions: false,
      displayName: name || undefined,
    });
    console.log('[FileViewer] File opened successfully');
  } catch (error) {
    console.error('[FileViewer] Error opening file:', error);
    const message = typeof error?.message === 'string' ? error.message : '';

    if (message.includes('RNFileViewer') || message.includes('NativeModule')) {
      throw new Error('File viewer not available. Please install a compatible app to open this file type.');
    }

    if (message.toLowerCase().includes('no app') || message.toLowerCase().includes('cannot open')) {
      throw new Error(`No app found to open ${name || 'this file'}. Please install a compatible app (e.g., ${getAppSuggestion(mimeType)}).`);
    }

    throw error;
  }
};

const getAppSuggestion = (mimeType) => {
  if (!mimeType) return 'a file viewer app';
  
  if (mimeType.includes('pdf')) return 'Adobe Acrobat or a PDF reader';
  if (mimeType.includes('word') || mimeType.includes('msword')) return 'Microsoft Word or Google Docs';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Microsoft Excel or Google Sheets';
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'Microsoft PowerPoint or Google Slides';
  
  return 'a compatible file viewer app';
};
