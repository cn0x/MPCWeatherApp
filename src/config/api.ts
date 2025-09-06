/**
 * API Configuration
 *
 * IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key
 * Get your free API key at: https://openweathermap.org/api
 */

export const API_CONFIG = {
  OPENWEATHER_API_KEY: '46d7cc59e9585a0fb97a32ef71993de5',
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  TIMEOUT: 10000, // 10 seconds
  UNITS: 'metric', // Celsius
} as const;
