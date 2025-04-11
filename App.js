import 'react-native-gesture-handler';  // Important: must be at the top
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

LogBox.ignoreLogs([
  'Reanimated 2',
  'AsyncStorage has been extracted',
]);

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#081325" />
      <AppNavigator />
    </AuthProvider>
  );
}