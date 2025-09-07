/**
 * Reusable WeatherCard component for displaying weather information
 */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WeatherResponse } from '../types/weather';
import {
  getWeatherIconUrl,
  formatTemperature,
  capitalizeWords,
} from '../services/weatherService';
import { usethemeColors } from '../themes/appColors';

interface WeatherCardProps {
  weatherData: WeatherResponse;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const colors = usethemeColors();
  const weather = weatherData.weather[0];
  const main = weatherData.main;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.outline,
          shadowColor: colors.outline,
        },
      ]}
    >
      {/* City Name */}
      <Text style={[styles.cityName, { color: colors.text }]}>
        {weatherData.name}
      </Text>
      <Text style={[styles.countryName, { color: colors.textSecondary }]}>
        {weatherData.sys.country}
      </Text>

      {/* Weather Icon and Temperature */}
      <View style={styles.mainWeatherContainer}>
        <Image
          source={{ uri: getWeatherIconUrl(weather.icon) }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={[styles.temperature, { color: colors.text }]}>
          {formatTemperature(main.temp)}
        </Text>
      </View>

      {/* Weather Description */}
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {capitalizeWords(weather.description)}
      </Text>

      {/* Additional Weather Details */}
      <View style={styles.detailsContainer}>
        <View
          style={[styles.detailItem, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Feels like
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {formatTemperature(main.feels_like)}
          </Text>
        </View>

        <View
          style={[styles.detailItem, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Humidity
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {main.humidity}%
          </Text>
        </View>

        <View
          style={[styles.detailItem, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Wind Speed
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {weatherData.wind.speed} m/s
          </Text>
        </View>

        <View
          style={[styles.detailItem, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
            Pressure
          </Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>
            {main.pressure} hPa
          </Text>
        </View>
      </View>

      {/* Temperature Range */}
      <View
        style={[styles.temperatureRange, { borderTopColor: colors.outline }]}
      >
        <Text style={[styles.rangeText, { color: colors.textSecondary }]}>
          H: {formatTemperature(main.temp_max)} • L:{' '}
          {formatTemperature(main.temp_min)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 24,
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  countryName: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  mainWeatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  temperature: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,

    textAlign: 'center',
    marginBottom: 32,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailItem: {
    width: '48%',
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temperatureRange: {
    borderTopWidth: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  rangeText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
