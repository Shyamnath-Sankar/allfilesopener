import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { formatDate, formatFileSize } from '../constants/fileTypes';
import { openFile } from '../utils/fileViewer';

const FileItem = ({ file, onPress, onDelete }) => {
  const [opening, setOpening] = useState(false);
  const color = file?.color || '#999999';

  const handleOpen = useCallback(async () => {
    try {
      setOpening(true);
      await openFile(file);
    } catch (error) {
      console.error('Error opening file:', error);
      Alert.alert(
        'Open Error',
        error?.message || 'Failed to open file. Please make sure you have a compatible app installed.',
        [{ text: 'OK' }]
      );
    } finally {
      setOpening(false);
    }
  }, [file]);

  const handleLongPress = () => {
    Alert.alert('File Options', `What would you like to do with ${file.name}?`, [
      {
        text: 'Open',
        onPress: handleOpen,
      },
      onPress
        ? {
            text: 'View Details',
            onPress: () => onPress(file),
          }
        : null,
      {
        text: 'Remove from Recent',
        style: 'destructive',
        onPress: () => onDelete(file.uri),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ].filter(Boolean));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOpen}
      onLongPress={handleLongPress}
      disabled={opening}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        {opening ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <Text style={styles.icon}>{file.icon}</Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.fileName} numberOfLines={1}>
          {file.name}
        </Text>

        <View style={styles.metadataContainer}>
          <Text style={styles.fileType}>{file.typeName}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
        </View>

        {file.openedAt && (
          <Text style={styles.dateText}>Opened {formatDate(file.openedAt)}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
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
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  fileType: {
    fontSize: 13,
    color: '#666666',
  },
  separator: {
    fontSize: 13,
    color: '#cccccc',
    marginHorizontal: 6,
  },
  fileSize: {
    fontSize: 13,
    color: '#666666',
  },
  dateText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
});

export default FileItem;
