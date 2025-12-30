import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FileViewer from '../components/FileViewer';
import LoadingOverlay from '../components/LoadingOverlay';
import { saveRecentFile } from '../utils/storage';
import { shareFile } from '../utils/fileUtils';
import { openFile } from '../utils/fileViewer';
import { formatFileSize } from '../constants/fileTypes';

const FileDetailsScreen = ({ route, navigation }) => {
  const { file } = route.params;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('viewer');

  const canPreviewInApp =
    typeof file?.canPreviewInApp === 'boolean'
      ? file.canPreviewInApp
      : ['TEXT', 'CSV', 'JSON', 'HTML', 'CSS'].includes(file?.type);

  useEffect(() => {
    saveFileToRecent();
  }, []);

  const saveFileToRecent = async () => {
    try {
      await saveRecentFile(file);
    } catch (error) {
      console.error('Error saving to recent:', error);
    }
  };

  const handleShare = async () => {
    try {
      setLoading(true);
      await shareFile(file.uri);
    } catch (error) {
      console.error('Error sharing file:', error);
      Alert.alert(
        'Share Error',
        error.message || 'Failed to share file',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInApp = async () => {
    try {
      setLoading(true);
      await openFile(file);
    } catch (error) {
      console.error('Error opening file:', error);
      Alert.alert(
        'Open Error',
        error?.message ||
          'Failed to open file. Please make sure you have a compatible app installed.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const renderFileInfo = () => {
    return (
      <ScrollView style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>File Name</Text>
            <Text style={styles.infoValue} selectable>{file.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>File Type</Text>
            <Text style={styles.infoValue}>{file.typeName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>File Size</Text>
            <Text style={styles.infoValue}>{formatFileSize(file.size)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>MIME Type</Text>
            <Text style={styles.infoValue} selectable>{file.mimeType}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>File Path</Text>
            <Text style={styles.infoValue} selectable numberOfLines={3}>
              {file.uri}
            </Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Text style={styles.actionButtonIcon}>📤</Text>
            <Text style={styles.actionButtonText}>Share File</Text>
          </TouchableOpacity>

          {!canPreviewInApp && (
            <TouchableOpacity style={styles.actionButton} onPress={handleOpenInApp}>
              <Text style={styles.actionButtonIcon}>📱</Text>
              <Text style={styles.actionButtonText}>Open File</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>ℹ️ Note</Text>
          <Text style={styles.noteText}>
            {canPreviewInApp
              ? 'This file is displayed directly in the app and can be scrolled and selected.'
              : 'This file will be opened using a compatible app installed on your device (or the system share sheet).'}
          </Text>
        </View>
      </ScrollView>
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
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerIcon}>{file.icon}</Text>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {file.name}
            </Text>
            <Text style={styles.headerSubtitle}>{file.typeName}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'viewer' && styles.activeTab]}
          onPress={() => setActiveTab('viewer')}
        >
          <Text style={[styles.tabText, activeTab === 'viewer' && styles.activeTabText]}>
            Preview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'info' && styles.activeTab]}
          onPress={() => setActiveTab('info')}
        >
          <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
            File Info
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'viewer' ? (
          <FileViewer file={file} />
        ) : (
          renderFileInfo()
        )}
      </View>

      <LoadingOverlay visible={loading} message="Processing..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#1a1a1a',
  },
  actionsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  noteSection: {
    backgroundColor: '#FFF9E6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
});

export default FileDetailsScreen;
