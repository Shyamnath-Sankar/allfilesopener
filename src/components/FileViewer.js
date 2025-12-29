import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const FileViewer = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFileContent();
  }, [file]);

  const loadFileContent = async () => {
    try {
      setLoading(true);
      setError(null);

      if (file.type === 'TEXT' || file.type === 'CSV' || file.type === 'JSON') {
        const fileContent = await FileSystem.readAsStringAsync(file.uri);
        setContent(fileContent);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error loading file:', err);
      setError(err.message);
      setLoading(false);
    }
  };

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

  const renderPdfViewer = () => {
    return (
      <WebView
        source={{ uri: file.uri }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setError('Failed to load PDF');
        }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
      />
    );
  };

  const renderOfficeDocumentViewer = () => {
    const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(file.uri)}`;
    
    return (
      <WebView
        source={{ uri: googleDocsUrl }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setError('Failed to load document. The file might not be accessible via URL.');
        }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
      />
    );
  };

  const renderUnsupportedMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.messageTitle}>Preview Not Available</Text>
        <Text style={styles.messageText}>
          This file format cannot be previewed in the app.
          {'\n\n'}
          For Office files (Word, Excel, PowerPoint), you can share this file to open it in the native app.
        </Text>
      </View>
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

  if (error) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.icon}>❌</Text>
        <Text style={styles.messageTitle}>Error Loading File</Text>
        <Text style={styles.messageText}>{error}</Text>
      </View>
    );
  }

  switch (file.type) {
    case 'TEXT':
    case 'CSV':
    case 'JSON':
      return renderTextContent();
    
    case 'PDF':
      return renderPdfViewer();
    
    case 'EXCEL':
    case 'WORD':
    case 'POWERPOINT':
      return renderUnsupportedMessage();
    
    default:
      return renderUnsupportedMessage();
  }
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
  webview: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  },
});

export default FileViewer;
