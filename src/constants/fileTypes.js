export const FILE_TYPES = {
  EXCEL: {
    extensions: ['.xlsx', '.xls', '.xlsm', '.xlsb'],
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel.sheet.macroEnabled.12',
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    ],
    icon: '📊',
    color: '#1D6F42',
    name: 'Excel Spreadsheet',
    canPreviewInApp: false,
  },
  WORD: {
    extensions: ['.docx', '.doc', '.docm'],
    mimeTypes: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-word.document.macroEnabled.12',
    ],
    icon: '📄',
    color: '#2B579A',
    name: 'Word Document',
    canPreviewInApp: false,
  },
  POWERPOINT: {
    extensions: ['.pptx', '.ppt', '.pptm'],
    mimeTypes: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    ],
    icon: '📽️',
    color: '#D24726',
    name: 'PowerPoint Presentation',
    canPreviewInApp: false,
  },
  PDF: {
    extensions: ['.pdf'],
    mimeTypes: ['application/pdf'],
    icon: '📕',
    color: '#F40F02',
    name: 'PDF Document',
    canPreviewInApp: false,
  },
  TEXT: {
    extensions: ['.txt', '.text'],
    mimeTypes: ['text/plain'],
    icon: '📝',
    color: '#666666',
    name: 'Text File',
    canPreviewInApp: true,
  },
  HTML: {
    extensions: ['.html', '.htm'],
    mimeTypes: ['text/html'],
    icon: '🌐',
    color: '#E34F26',
    name: 'HTML File',
    canPreviewInApp: true,
  },
  CSS: {
    extensions: ['.css'],
    mimeTypes: ['text/css'],
    icon: '🎨',
    color: '#1572B6',
    name: 'CSS Stylesheet',
    canPreviewInApp: true,
  },
  CSV: {
    extensions: ['.csv'],
    mimeTypes: ['text/csv', 'application/csv'],
    icon: '📋',
    color: '#34A853',
    name: 'CSV File',
    canPreviewInApp: true,
  },
  JSON: {
    extensions: ['.json'],
    mimeTypes: ['application/json', 'text/json'],
    icon: '🔧',
    color: '#FFA500',
    name: 'JSON File',
    canPreviewInApp: true,
  },
};

export const getFileType = (fileName) => {
  if (!fileName) return null;

  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));

  for (const [key, value] of Object.entries(FILE_TYPES)) {
    if (value.extensions.includes(extension)) {
      return { type: key, ...value };
    }
  }

  return {
    type: 'UNKNOWN',
    icon: '📎',
    color: '#999999',
    name: 'Unknown File',
    canPreviewInApp: false,
  };
};

export const isFileSupported = (fileName) => {
  const fileType = getFileType(fileName);
  return fileType && fileType.type !== 'UNKNOWN';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Today';
  }

  if (diffDays === 2) {
    return 'Yesterday';
  }

  if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  }

  return date.toLocaleDateString();
};
