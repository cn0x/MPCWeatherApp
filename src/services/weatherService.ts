/**
 * Weather service for fetching data from OpenWeatherMap API
 */

import axios from 'axios';
import { WeatherResponse, WeatherError } from '../types/weather';
import { API_CONFIG } from '../config/api';

// Create axios instance with default configuration
const weatherAPI = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

/**
 * Fetches current weather data for a given city
 * @param cityName - Name of the city to get weather for
 * @returns Promise with weather data or error
 */
export const getCurrentWeather = async (
  cityName: string,
): Promise<WeatherResponse> => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        q: cityName,
        appid: API_CONFIG.OPENWEATHER_API_KEY,
        units: API_CONFIG.UNITS,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(
          'City not found. Please check the city name and try again.',
        );
      } else if (error.response?.status === 401) {
        throw new Error(
          'Invalid API key. Please check your OpenWeatherMap API key.',
        );
      } else if (error.code === 'ECONNABORTED') {
        throw new Error(
          'Request timeout. Please check your internet connection.',
        );
      } else {
        throw new Error(
          'Failed to fetch weather data. Please try again later.',
        );
      }
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

/**
 * Gets the weather icon URL from OpenWeatherMap
 * @param iconCode - Icon code from weather data
 * @returns Complete URL for the weather icon
 */
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Formats temperature for display
 * @param temp - Temperature in Celsius
 * @returns Formatted temperature string
 */
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

/**
 * Capitalizes the first letter of each word in a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};
