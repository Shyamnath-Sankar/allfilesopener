import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import EmptyState from '../components/EmptyState';
import { pickDocument } from '../utils/fileUtils';
import { FILE_TYPES } from '../constants/fileTypes';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handlePickFile = async () => {
    try {
      setLoading(true);
      const file = await pickDocument();
      
      if (file) {
        navigation.navigate('FileDetails', { file });
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert(
        'Error',
        'Failed to pick file. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const renderSupportedFormats = () => {
    const formats = Object.values(FILE_TYPES);
    
    return (
      <View style={styles.formatsContainer}>
        <Text style={styles.formatsTitle}>Supported Formats</Text>
        <View style={styles.formatsList}>
          {formats.map((format, index) => (
            <View key={index} style={styles.formatItem}>
              <View style={[styles.formatIconContainer, { backgroundColor: format.color + '20' }]}>
                <Text style={styles.formatIcon}>{format.icon}</Text>
              </View>
              <Text style={styles.formatName}>{format.name}</Text>
              <Text style={styles.formatExtensions}>
                {format.extensions.join(', ')}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Universal File Opener</Text>
        <Text style={styles.headerSubtitle}>
          Open and view multiple file formats
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroIcon}>📁</Text>
          <Text style={styles.heroTitle}>Open Any File</Text>
          <Text style={styles.heroDescription}>
            Select a file from your device to view it instantly
          </Text>
          
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handlePickFile}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Opening...' : '📂 Browse Files'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Recent')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>
              🕒 View Recent Files
            </Text>
          </TouchableOpacity>
        </View>

        {renderSupportedFormats()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#ffffff',
    padding: 32,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heroIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    minWidth: 200,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  formatsContainer: {
    padding: 16,
  },
  formatsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  formatsList: {
    gap: 12,
  },
  formatItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formatIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  formatIcon: {
    fontSize: 22,
  },
  formatName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  formatExtensions: {
    fontSize: 12,
    color: '#999999',
  },
});

export default HomeScreen;
