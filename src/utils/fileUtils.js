import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { getInfoAsync } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { getFileType } from '../constants/fileTypes';

export const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) {
      return null;
    }

    const file = result.assets[0];
    const fileType = getFileType(file.name);

    let fileInfo = null;

    try {
      fileInfo = await getInfoAsync(file.uri);
    } catch (error) {
      console.warn('Could not get file info:', error);
    }

    return {
      uri: file.uri,
      name: file.name,
      size: file.size || fileInfo?.size || 0,
      mimeType: file.mimeType || fileType?.mimeTypes?.[0] || 'application/octet-stream',
      type: fileType?.type || 'UNKNOWN',
      icon: fileType?.icon || '📎',
      color: fileType?.color || '#999999',
      typeName: fileType?.name || 'Unknown File',
      canPreviewInApp: fileType?.canPreviewInApp || false,
    };
  } catch (error) {
    console.error('Error picking document:', error);
    throw error;
  }
};

export const shareFile = async (uri) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      throw new Error('Sharing is not available on this device');
    }

    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error('Error sharing file:', error);
    throw error;
  }
};

export const getFileInfo = async (uri) => {
  try {
    return await getInfoAsync(uri);
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};

export const deleteFile = async (uri) => {
  try {
    const info = await getInfoAsync(uri);
    if (info.exists) {
      await FileSystem.deleteAsync(uri);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
