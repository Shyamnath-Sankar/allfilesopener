import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import FileItem from '../components/FileItem';
import EmptyState from '../components/EmptyState';
import { getRecentFiles, clearRecentFile, clearAllRecentFiles } from '../utils/storage';
import { getFileInfo } from '../utils/fileUtils';

const RecentFilesScreen = ({ navigation }) => {
  const [recentFiles, setRecentFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadRecentFiles();
    }, [])
  );

  const loadRecentFiles = async () => {
    try {
      setLoading(true);
      const files = await getRecentFiles();
      
      const validFiles = [];
      for (const file of files) {
        const info = await getFileInfo(file.uri);
        if (info && info.exists) {
          validFiles.push(file);
        }
      }
      
      setRecentFiles(validFiles);
    } catch (error) {
      console.error('Error loading recent files:', error);
      Alert.alert('Error', 'Failed to load recent files');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadRecentFiles();
  };

  const handleFilePress = (file) => {
    navigation.navigate('FileDetails', { file });
  };

  const handleFileDelete = async (uri) => {
    try {
      const updatedFiles = await clearRecentFile(uri);
      setRecentFiles(updatedFiles);
    } catch (error) {
      console.error('Error deleting file from recent:', error);
      Alert.alert('Error', 'Failed to remove file from recent');
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Recent Files',
      'Are you sure you want to clear all recent files?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllRecentFiles();
              setRecentFiles([]);
            } catch (error) {
              console.error('Error clearing all recent files:', error);
              Alert.alert('Error', 'Failed to clear recent files');
            }
          }
        }
      ]
    );
  };

  const renderHeader = () => {
    if (recentFiles.length === 0) return null;

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.fileCount}>
          {recentFiles.length} {recentFiles.length === 1 ? 'file' : 'files'}
        </Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyState = () => {
    return (
      <EmptyState
        icon="📭"
        title="No Recent Files"
        message="Files you open will appear here for quick access"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent Files</Text>
      </View>

      {recentFiles.length === 0 && !loading ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={recentFiles}
          renderItem={({ item }) => (
            <FileItem
              file={item}
              onPress={handleFilePress}
              onDelete={handleFileDelete}
            />
          )}
          keyExtractor={(item, index) => `${item.uri}-${index}`}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#007AFF"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    paddingRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  listContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fileCount: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  clearButton: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '600',
  },
});

export default RecentFilesScreen;
