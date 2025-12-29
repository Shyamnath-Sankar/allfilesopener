import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import RecentFilesScreen from './src/screens/RecentFilesScreen';
import FileDetailsScreen from './src/screens/FileDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Universal File Opener' }}
          />
          <Stack.Screen
            name="Recent"
            component={RecentFilesScreen}
            options={{ title: 'Recent Files' }}
          />
          <Stack.Screen
            name="FileDetails"
            component={FileDetailsScreen}
            options={{ title: 'File Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
