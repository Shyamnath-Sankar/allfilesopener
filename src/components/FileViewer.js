import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

import { openFile } from '../utils/fileViewer';
import { shareFile } from '../utils/fileUtils';

const TEXT_PREVIEW_TYPES = new Set(['TEXT', 'CSV', 'JSON', 'HTML', 'CSS']);

const FileViewer = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(false);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const lastAutoOpenedUriRef = useRef(null);

  const canPreviewInApp = useMemo(() => {
    if (typeof file?.canPreviewInApp === 'boolean') return file.canPreviewInApp;
    return TEXT_PREVIEW_TYPES.has(file?.type);
  }, [file]);

  const loadTextContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const fileContent = await FileSystem.readAsStringAsync(file.uri);
      setContent(fileContent);
    } catch (err) {
      console.error('Error loading file:', err);
      setError(err?.message || 'Failed to load file');
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleOpenExternal = useCallback(async () => {
    try {
      setOpening(true);
      setError(null);
      await openFile(file);
    } catch (err) {
      console.error('Error opening file:', err);

      const message =
        err?.message ||
        'Failed to open this file. Please make sure you have a compatible app installed.';
      setError(message);
    } finally {
      setOpening(false);
      setLoading(false);
    }
  }, [file]);

  useEffect(() => {
    setContent('');
    setError(null);

    if (!file?.uri) {
      setLoading(false);
      setError('Missing file');
      return;
    }

    if (canPreviewInApp) {
      loadTextContent();
      return;
    }

    setLoading(false);

    if (lastAutoOpenedUriRef.current !== file.uri) {
      lastAutoOpenedUriRef.current = file.uri;
      handleOpenExternal();
    }
  }, [canPreviewInApp, file, handleOpenExternal, loadTextContent]);

  const renderTextContent = () => {
    let formattedContent = content;

    if (file.type === 'JSON') {
      try {
        const parsed = JSON.parse(content);
        formattedContent = JSON.stringify(parsed, null, 2);
      } catch (e) {
        console.warn('Could not parse JSON:', e);
      }
    }

    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textContent} selectable>
            {formattedContent}
          </Text>
        </View>
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading file...</Text>
      </View>
    );
  }

  if (canPreviewInApp) {
    if (error) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.icon}>❌</Text>
          <Text style={styles.messageTitle}>Error Loading File</Text>
          <Text style={styles.messageText}>{error}</Text>
        </View>
      );
    }

    return renderTextContent();
  }

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.icon}>{file.icon || '📄'}</Text>
      <Text style={styles.messageTitle}>Open in Viewer</Text>

      {error ? (
        <Text style={styles.messageText}>{error}</Text>
      ) : (
        <Text style={styles.messageText}>
          This file will be opened using a compatible app installed on your device.
        </Text>
      )}

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, opening && styles.actionButtonDisabled]}
          onPress={handleOpenExternal}
          disabled={opening}
          activeOpacity={0.8}
        >
          {opening ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.actionButtonText}>Open File</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, opening && styles.actionButtonDisabled]}
          onPress={() => shareFile(file.uri)}
          disabled={opening}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  textContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 8,
  },
  textContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1a1a1a',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionsRow: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FileViewer;
