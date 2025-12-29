const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Universal File Opener Project Structure...\n');

const requiredFiles = [
  'package.json',
  'app.json',
  'App.js',
  'README.md',
  'src/components/FileItem.js',
  'src/components/EmptyState.js',
  'src/components/LoadingOverlay.js',
  'src/components/FileViewer.js',
  'src/screens/HomeScreen.js',
  'src/screens/RecentFilesScreen.js',
  'src/screens/FileDetailsScreen.js',
  'src/utils/fileUtils.js',
  'src/utils/storage.js',
  'src/constants/fileTypes.js'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  
  if (!exists) {
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('✅ All required files are present!');
  console.log('\n📱 Project structure is complete and ready to run!');
  console.log('\nNext steps:');
  console.log('  1. Run: npx expo start');
  console.log('  2. Scan QR code with Expo Go app');
  console.log('  3. Test file opening functionality\n');
} else {
  console.log('❌ Some files are missing. Please check the structure.');
  process.exit(1);
}
