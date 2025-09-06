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

interface WeatherCardProps {
  weatherData: WeatherResponse;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const weather = weatherData.weather[0];
  const main = weatherData.main;

  return (
    <View style={styles.container}>
      {/* City Name */}
      <Text style={styles.cityName}>{weatherData.name}</Text>
      <Text style={styles.countryName}>{weatherData.sys.country}</Text>

      {/* Weather Icon and Temperature */}
      <View style={styles.mainWeatherContainer}>
        <Image
          source={{ uri: getWeatherIconUrl(weather.icon) }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={styles.temperature}>{formatTemperature(main.temp)}</Text>
      </View>

      {/* Weather Description */}
      <Text style={styles.description}>
        {capitalizeWords(weather.description)}
      </Text>

      {/* Additional Weather Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels like</Text>
          <Text style={styles.detailValue}>
            {formatTemperature(main.feels_like)}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{main.humidity}%</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{weatherData.wind.speed} m/s</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{main.pressure} hPa</Text>
        </View>
      </View>

      {/* Temperature Range */}
      <View style={styles.temperatureRange}>
        <Text style={styles.rangeText}>
          H: {formatTemperature(main.temp_max)} • L:{' '}
          {formatTemperature(main.temp_min)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  countryName: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  mainWeatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    width: '48%',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  temperatureRange: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  rangeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
