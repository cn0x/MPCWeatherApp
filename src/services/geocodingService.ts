/**
 * Geocoding service for city autocomplete using OpenWeatherMap Geocoding API
 */

import axios from 'axios';
import { GeocodingResponse, CitySuggestion } from '../types/weather';
import { API_CONFIG } from '../config/api';

// Create axios instance for geocoding API
const geocodingAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  timeout: API_CONFIG.TIMEOUT,
});

/**
 * Fetches city suggestions based on partial city name
 * @param query - Partial city name to search for
 * @param limit - Maximum number of suggestions to return (default: 5)
 * @returns Promise with array of city suggestions
 */
export const getCitySuggestions = async (
  query: string,
  limit: number = 5,
): Promise<CitySuggestion[]> => {
  try {
    if (!query.trim() || query.length < 2) {
      return [];
    }

    const response = await geocodingAPI.get('/direct', {
      params: {
        q: query.trim(),
        limit,
        appid: API_CONFIG.OPENWEATHER_API_KEY,
      },
    });

    const suggestions: CitySuggestion[] = response.data.map(
      (item: GeocodingResponse) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
        displayName: formatDisplayName(item.name, item.country, item.state),
      }),
    );

    return suggestions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error(
          'Invalid API key. Please check your OpenWeatherMap API key.',
        );
      } else if (error.code === 'ECONNABORTED') {
        throw new Error(
          'Request timeout. Please check your internet connection.',
        );
      } else {
        throw new Error(
          'Failed to fetch city suggestions. Please try again later.',
        );
      }
    }
    throw new Error('An unexpected error occurred while fetching suggestions.');
  }
};

/**
 * Formats city name for display
 * @param name - City name
 * @param country - Country code
 * @param state - State/province (optional)
 * @returns Formatted display name
 */
const formatDisplayName = (
  name: string,
  country: string,
  state?: string,
): string => {
  let displayName = name;

  if (state) {
    displayName += `, ${state}`;
  }

  displayName += `, ${country}`;

  return displayName;
};

/**
 * Gets weather by coordinates (for when user selects a suggestion)
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise with weather data
 */
export const getWeatherByCoordinates = async (
  lat: number,
  lon: number,
): Promise<any> => {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_CONFIG.OPENWEATHER_API_KEY,
        units: API_CONFIG.UNITS,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
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
