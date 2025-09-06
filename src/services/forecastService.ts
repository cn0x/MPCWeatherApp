/**
 * Forecast service for fetching extended weather data
 */

import axios from 'axios';
import {
  ForecastResponse,
  DailyForecast,
  HourlyForecast,
  ForecastItem,
} from '../types/weather';
import { API_CONFIG } from '../config/api';

// Create axios instance for forecast API
const forecastAPI = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

/**
 * Fetches 5-day/3-hour forecast data for a given city
 * @param cityName - Name of the city to get forecast for
 * @returns Promise with forecast data
 */
export const getForecastByCity = async (
  cityName: string,
): Promise<ForecastResponse> => {
  try {
    const response = await forecastAPI.get('/forecast', {
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
          'Failed to fetch forecast data. Please try again later.',
        );
      }
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

/**
 * Fetches 5-day/3-hour forecast data by coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise with forecast data
 */
export const getForecastByCoordinates = async (
  lat: number,
  lon: number,
): Promise<ForecastResponse> => {
  try {
    const response = await forecastAPI.get('/forecast', {
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
          'Failed to fetch forecast data. Please try again later.',
        );
      }
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

/**
 * Processes forecast data to create daily forecasts
 * @param forecastData - Raw forecast response data
 * @returns Array of daily forecast objects
 */
export const processDailyForecast = (
  forecastData: ForecastResponse,
): DailyForecast[] => {
  const dailyData: { [key: string]: ForecastItem[] } = {};

  // Group forecast items by date
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  // Process each day
  const dailyForecasts: DailyForecast[] = Object.entries(dailyData).map(
    ([date, items]) => {
      const dayName = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
      });
      const temps = items.map(item => item.main.temp);
      const humidities = items.map(item => item.main.humidity);
      const windSpeeds = items.map(item => item.wind.speed);
      const pops = items.map(item => item.pop);

      // Get the most common weather condition for the day
      const weatherCounts: { [key: string]: number } = {};
      items.forEach(item => {
        const weatherId = item.weather[0].id;
        weatherCounts[weatherId] = (weatherCounts[weatherId] || 0) + 1;
      });
      const mostCommonWeatherId = Object.keys(weatherCounts).reduce((a, b) =>
        weatherCounts[a] > weatherCounts[b] ? a : b,
      );
      const mostCommonWeather = items.find(
        item => item.weather[0].id.toString() === mostCommonWeatherId,
      )?.weather[0];

      return {
        date,
        dayName,
        temp_max: Math.max(...temps),
        temp_min: Math.min(...temps),
        weather: mostCommonWeather || items[0].weather[0],
        humidity: Math.round(
          humidities.reduce((a, b) => a + b, 0) / humidities.length,
        ),
        wind_speed:
          Math.round(
            (windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length) * 10,
          ) / 10,
        pop: Math.round(Math.max(...pops) * 100),
      };
    },
  );

  return dailyForecasts.slice(0, 7); // Return next 7 days
};

/**
 * Processes forecast data to create hourly forecasts for today
 * @param forecastData - Raw forecast response data
 * @returns Array of hourly forecast objects
 */
export const processHourlyForecast = (
  forecastData: ForecastResponse,
): HourlyForecast[] => {
  const today = new Date().toDateString();

  // Filter items for today and next 24 hours
  const todayItems = forecastData.list.filter(item => {
    const itemDate = new Date(item.dt * 1000).toDateString();
    return itemDate === today;
  });

  return todayItems.slice(0, 8).map(item => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      hour: date.getHours().toString().padStart(2, '0') + ':00',
      temp: Math.round(item.main.temp),
      weather: item.weather[0],
      pop: Math.round(item.pop * 100),
    };
  });
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
 * Gets the weather icon URL from OpenWeatherMap
 * @param iconCode - Icon code from weather data
 * @returns Complete URL for the weather icon
 */
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
