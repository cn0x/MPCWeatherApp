/**
 * TypeScript interfaces for weather data from OpenWeatherMap API
 */

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WindData {
  speed: number;
  deg: number;
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherError {
  cod: string;
  message: string;
}

export interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

// City suggestion interfaces for autocomplete
export interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  displayName: string;
}

export interface GeocodingResponse {
  name: string;
  local_names?: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface SuggestionState {
  suggestions: CitySuggestion[];
  loading: boolean;
  error: string | null;
}

// Forecast interfaces for extended weather data
export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: WindData;
  visibility: number;
  pop: number; // Probability of precipitation
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface DailyForecast {
  date: string;
  dayName: string;
  temp_max: number;
  temp_min: number;
  weather: WeatherCondition;
  humidity: number;
  wind_speed: number;
  pop: number;
}

export interface HourlyForecast {
  time: string;
  hour: string;
  temp: number;
  weather: WeatherCondition;
  pop: number;
}

export interface ForecastState {
  data: ForecastResponse | null;
  dailyForecast: DailyForecast[];
  hourlyForecast: HourlyForecast[];
  loading: boolean;
  error: string | null;
}
