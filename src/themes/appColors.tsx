import { useColorScheme } from 'react-native';

export const commonColors = {
  white: '#fff',
  black: '#000',
  gray: '#808080',
  lightGray: '#D3D3D3',
  darkGray: '#A9A9A9',
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  yellow: '#FFFF00',
  purple: '#800080',
  orange: '#FFA500',
  pink: '#FFC0CB',
};

export const lightModeColors = {
  // Primary colors
  primary: '#007AFF',
  primaryLight: '#4DA6FF',
  primaryDark: '#0051D5',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  backgroundTertiary: '#FFFFFF',

  // Text colors
  text: '#000000',
  textSecondary: '#6D6D70',
  textTertiary: '#AEAEB2',

  // UI colors
  secondary: '#F2F2F7',
  outline: '#C6C6C8',
  separator: '#C6C6C8',

  // Status colors
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',

  // Card colors
  cardBackground: '#FFFFFF',
  cardBorder: '#E5E5EA',

  // Gradient colors for weather
  gradientStart: '#F2F2F7',
  gradientEnd: '#FFFFFF',
};

export const darkModeColors = {
  // Primary colors
  primary: '#0A84FF',
  primaryLight: '#1A94FF',
  primaryDark: '#0056CC',

  // Background colors
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  backgroundTertiary: '#2C2C2E',

  // Text colors
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#48484A',

  // UI colors
  secondary: '#1C1C1E',
  outline: '#38383A',
  separator: '#38383A',

  // Status colors
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',

  // Card colors
  cardBackground: '#1C1C1E',
  cardBorder: '#38383A',

  // Gradient colors for weather
  gradientStart: '#1C1C1E',
  gradientEnd: '#2C2C2E',
};

export function usethemeColors() {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? darkModeColors : lightModeColors;
}
