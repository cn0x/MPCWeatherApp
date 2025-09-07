/**
 * AppContainer - Main app component that handles onboarding and theme
 */

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherScreen } from '../screens/WeatherScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ThemeProvider } from '../contexts/ThemeContext';

const ONBOARDING_STORAGE_KEY = '@weather_app_onboarding_completed';

export const AppContainer: React.FC = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const completed = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
        setIsOnboardingCompleted(completed === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setIsOnboardingCompleted(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setIsOnboardingCompleted(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      setIsOnboardingCompleted(true);
    }
  };

  // Show loading state while checking onboarding status
  if (isOnboardingCompleted === null) {
    return null; // Or a loading component
  }

  return (
    <ThemeProvider>
      {isOnboardingCompleted ? (
        <WeatherScreen />
      ) : (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
    </ThemeProvider>
  );
};
