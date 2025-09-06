/**
 * MPC Weather App
 * A simple weather app built with React Native CLI
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WeatherScreen } from './src/screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { usethemeColors } from './src/themes/appColors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = usethemeColors();
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <WeatherScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
