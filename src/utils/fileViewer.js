import { Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { getInfoAsync } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

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

const openWithSharingFallback = async (uri, mimeType) => {
  const isAvailable = await Sharing.isAvailableAsync();

  if (!isAvailable) {
    await Linking.openURL(uri);
    return;
  }

  await Sharing.shareAsync(uri, {
    mimeType: mimeType || undefined,
  });
};

export const openFile = async ({ uri, name, mimeType }) => {
  let localUri = uri;

  try {
    const info = await getInfoAsync(uri);
    if (!info?.exists) {
      if (uri.startsWith('content://')) {
        localUri = await ensureLocalFileUri(uri, name);
      } else {
        throw new Error('File not found or no longer accessible');
      }
    }
  } catch (error) {
    if (uri.startsWith('content://')) {
      localUri = await ensureLocalFileUri(uri, name);
    } else {
      throw error;
    }
  }

  if (!localUri.startsWith('file://') && !localUri.startsWith('content://')) {
    throw new Error('Unsupported file URI');
  }

  const RNFileViewer = getRNFileViewer();
  if (!RNFileViewer?.open) {
    await openWithSharingFallback(localUri, mimeType);
    return;
  }

  try {
    await RNFileViewer.open(localUri, { showOpenWithDialog: true });
  } catch (error) {
    const message = typeof error?.message === 'string' ? error.message : '';

    if (message.includes('RNFileViewer') || message.includes('NativeModule')) {
      await openWithSharingFallback(localUri, mimeType);
      return;
    }

    throw error;
  }
};
