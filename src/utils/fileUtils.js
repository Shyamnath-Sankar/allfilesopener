import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getFileType } from '../constants/fileTypes';

export const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false
    });
    
    if (result.canceled) {
      return null;
    }
    
    const file = result.assets[0];
    const fileType = getFileType(file.name);
    
    let fileInfo = null;
    
    try {
      fileInfo = await FileSystem.getInfoAsync(file.uri);
    } catch (error) {
      console.warn('Could not get file info:', error);
    }
    
    return {
      uri: file.uri,
      name: file.name,
      size: file.size || (fileInfo && fileInfo.size) || 0,
      mimeType: file.mimeType || fileType.mimeTypes[0],
      type: fileType.type,
      icon: fileType.icon,
      color: fileType.color,
      typeName: fileType.name
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
    const info = await FileSystem.getInfoAsync(uri);
    return info;
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};

export const deleteFile = async (uri) => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists) {
      await FileSystem.deleteAsync(uri);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
