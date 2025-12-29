import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_FILES_KEY = '@recent_files';
const MAX_RECENT_FILES = 20;

export const saveRecentFile = async (fileInfo) => {
  try {
    const existingFiles = await getRecentFiles();
    
    const filteredFiles = existingFiles.filter(
      file => file.uri !== fileInfo.uri
    );
    
    const updatedFiles = [
      {
        ...fileInfo,
        openedAt: new Date().toISOString()
      },
      ...filteredFiles
    ].slice(0, MAX_RECENT_FILES);
    
    await AsyncStorage.setItem(RECENT_FILES_KEY, JSON.stringify(updatedFiles));
    
    return updatedFiles;
  } catch (error) {
    console.error('Error saving recent file:', error);
    throw error;
  }
};

export const getRecentFiles = async () => {
  try {
    const filesJson = await AsyncStorage.getItem(RECENT_FILES_KEY);
    
    if (!filesJson) {
      return [];
    }
    
    return JSON.parse(filesJson);
  } catch (error) {
    console.error('Error getting recent files:', error);
    return [];
  }
};

export const clearRecentFile = async (uri) => {
  try {
    const existingFiles = await getRecentFiles();
    const updatedFiles = existingFiles.filter(file => file.uri !== uri);
    
    await AsyncStorage.setItem(RECENT_FILES_KEY, JSON.stringify(updatedFiles));
    
    return updatedFiles;
  } catch (error) {
    console.error('Error clearing recent file:', error);
    throw error;
  }
};

export const clearAllRecentFiles = async () => {
  try {
    await AsyncStorage.removeItem(RECENT_FILES_KEY);
  } catch (error) {
    console.error('Error clearing all recent files:', error);
    throw error;
  }
};
