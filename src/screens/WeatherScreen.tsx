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
import { SafeAreaView } from 'react-native-safe-area-context';
import { usethemeColors } from '../themes/appColors';
import {
  SearchBar,
  WeatherCard,
  LoadingSpinner,
  ErrorMessage,
  ForecastCarousel,
} from '../components';
import { getCurrentWeather } from '../services/weatherService';
import { getWeatherByCoordinates } from '../services/geocodingService';
import {
  checkLocationPermission,
  requestLocationPermission,
  getCurrentLocation,
  showLocationPermissionAlert,
} from '../services/locationService';
import {
  WeatherResponse,
  WeatherState,
  CitySuggestion,
  ForecastState,
  DailyForecast,
  HourlyForecast,
} from '../types/weather';
import {
  getForecastByCity,
  getForecastByCoordinates,
  processDailyForecast,
  processHourlyForecast,
} from '../services/forecastService';

export const WeatherScreen: React.FC = () => {
  const colors = usethemeColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null,
  );

  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });
  const [forecastState, setForecastState] = useState<ForecastState>({
    data: null,
    dailyForecast: [],
    hourlyForecast: [],
    loading: false,
    error: null,
  });

  /**
   * Fetches weather and forecast for current location
   */
  const fetchCurrentLocationWeather = async () => {
    try {
      setWeatherState({ data: null, loading: true, error: null });
      setForecastState(prev => ({ ...prev, loading: true, error: null }));

      const location = await getCurrentLocation();
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoordinates(location.latitude, location.longitude),
        getForecastByCoordinates(location.latitude, location.longitude),
      ]);

      const dailyForecast = processDailyForecast(forecastData);
      const hourlyForecast = processHourlyForecast(forecastData);

      setWeatherState({ data: weatherData, loading: false, error: null });
      setForecastState({
        data: forecastData,
        dailyForecast,
        hourlyForecast,
        loading: false,
        error: null,
      });
    } catch (error) {
      setWeatherState({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to get location weather',
      });
      setForecastState(prev => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to get forecast',
      }));
    }
  };

  /**
   * Handles initial app load and location permission
   */
  const handleInitialLoad = async () => {
    try {
      const permissionState = await checkLocationPermission();

      if (permissionState.granted) {
        setLocationPermission(true);
        await fetchCurrentLocationWeather();
      } else if (permissionState.neverAsked) {
        // Ask for permission on first launch
        const granted = await requestLocationPermission();
        setLocationPermission(granted);

        if (granted) {
          await fetchCurrentLocationWeather();
        }
      } else {
        // Permission was denied
        setLocationPermission(false);
      }
    } catch (error) {
      console.error('Error during initial load:', error);
      setLocationPermission(false);
    } finally {
      setIsInitialLoad(false);
    }
  };

  // Handle initial app load
  useEffect(() => {
    handleInitialLoad();
  }, []);

  /**
   * Handles the search for weather data
   */
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setWeatherState({ data: null, loading: true, error: null });
    setForecastState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(searchQuery.trim()),
        getForecastByCity(searchQuery.trim()),
      ]);

      const dailyForecast = processDailyForecast(forecastData);
      const hourlyForecast = processHourlyForecast(forecastData);

      setWeatherState({ data: weatherData, loading: false, error: null });
      setForecastState({
        data: forecastData,
        dailyForecast,
        hourlyForecast,
        loading: false,
        error: null,
      });
    } catch (error) {
      setWeatherState({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
      setForecastState(prev => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to get forecast',
      }));
    }
  };

  /**
   * Handles suggestion selection from autocomplete
   */
  const handleSuggestionSelect = async (suggestion: CitySuggestion) => {
    setWeatherState({ data: null, loading: true, error: null });
    setForecastState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoordinates(suggestion.lat, suggestion.lon),
        getForecastByCoordinates(suggestion.lat, suggestion.lon),
      ]);

      const dailyForecast = processDailyForecast(forecastData);
      const hourlyForecast = processHourlyForecast(forecastData);

      setWeatherState({ data: weatherData, loading: false, error: null });
      setForecastState({
        data: forecastData,
        dailyForecast,
        hourlyForecast,
        loading: false,
        error: null,
      });
    } catch (error) {
      setWeatherState({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
      setForecastState(prev => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to get forecast',
      }));
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

  /**
   * Renders the appropriate content based on the current state
   */
  const renderContent = () => {
    // Show loading spinner during initial load or weather fetch
    if (weatherState.loading || isInitialLoad) {
      const message = isInitialLoad
        ? 'Getting your location...'
        : 'Fetching weather data...';
      return <LoadingSpinner message={message} />;
    }

    if (weatherState.error) {
      return (
        <ErrorMessage message={weatherState.error} onRetry={handleRetry} />
      );
    }

    if (weatherState.data) {
      return (
        <>
          <WeatherCard weatherData={weatherState.data} />
          <ForecastCarousel
            dailyForecast={forecastState.dailyForecast}
            hourlyForecast={forecastState.hourlyForecast}
            loading={forecastState.loading}
          />
        </>
      );
    }

    // Welcome state - show different messages based on location permission
    return (
      <View style={styles.welcomeContainer}>
        <Text style={[styles.welcomeTitle, { color: colors.text }]}>
          🌤️ Weather App
        </Text>
        {locationPermission === false ? (
          <>
            <Text
              style={[styles.welcomeMessage, { color: colors.textSecondary }]}
            >
              Location access was denied. You can still search for any city to
              get weather information.
            </Text>
            <Text
              style={[
                styles.welcomeSubMessage,
                { color: colors.textSecondary },
              ]}
            >
              Enter a city name above to get started!
            </Text>
          </>
        ) : (
          <Text
            style={[styles.welcomeMessage, { color: colors.textSecondary }]}
          >
            Enter a city name above to get current weather information
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
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
            onSuggestionSelect={handleSuggestionSelect}
            disabled={weatherState.loading}
            placeholder="Enter city name"
            showSuggestions={true}
          />
          {/* Content Area */}
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 300,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12,
  },
  welcomeSubMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
