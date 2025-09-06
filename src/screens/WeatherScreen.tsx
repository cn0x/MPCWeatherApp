/**
 * Main Weather Screen - handles weather search and display
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  SearchBar,
  WeatherCard,
  LoadingSpinner,
  ErrorMessage,
} from '../components';
import { getCurrentWeather } from '../services/weatherService';
import { WeatherResponse, WeatherState } from '../types/weather';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';

export const WeatherScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  // Asks User for Location Permission
  async function requestLocationPermission() {
    const result = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      })!,
    );

    if (result === RESULTS.GRANTED) {
      setLocationPermission(true);
    } else {
      setLocationPermission(false);
    }
  }

  // Request location permission on component mount
  useEffect(() => {
    if (!locationPermission) {
      requestLocationPermission();
    }
  }, [locationPermission]);

  /**
   * Handles the search for weather data
   */
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setWeatherState({ data: null, loading: true, error: null });

    try {
      const weatherData = await getCurrentWeather(searchQuery.trim());
      setWeatherState({ data: weatherData, loading: false, error: null });
    } catch (error) {
      setWeatherState({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    }
  };

  /**
   * Handles retry when there's an error
   */
  const handleRetry = () => {
    if (searchQuery.trim()) {
      handleSearch();
    }
  };

  // Gets the User's current location
  const fetchUserLocation = () => {
    try {
      Geolocation.getCurrentPosition(currentLocation =>
        setCurrentLocation(currentLocation),
      );
    } catch (error) {}
  };
  /**
   * Renders the appropriate content based on the current state
   */
  const renderContent = () => {
    if (weatherState.loading) {
      return <LoadingSpinner message="Fetching weather data..." />;
    }

    if (weatherState.error) {
      return (
        <ErrorMessage message={weatherState.error} onRetry={handleRetry} />
      );
    }

    if (weatherState.data) {
      return <WeatherCard weatherData={weatherState.data} />;
    }

    // Initial state - show welcome message
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>🌤️ Weather App</Text>
        <Text style={styles.welcomeMessage}>
          Enter a city name above to get current weather information
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={handleSearch}
            disabled={weatherState.loading}
            placeholder="Enter city name"
          />
          {/* Content Area */}
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
