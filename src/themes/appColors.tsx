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
  primary: commonColors.white,
  secondary: commonColors.lightGray,
  background: commonColors.white,
  text: commonColors.black,
  textSecondary: commonColors.lightGray,
  outline: commonColors.black,
};

export const darkModeColors = {
  primary: commonColors.black,
  secondary: commonColors.lightGray,
  background: commonColors.black,
  text: commonColors.white,
  textSecondary: commonColors.lightGray,
  outline: commonColors.white,
};

export function usethemeColors() {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? darkModeColors : lightModeColors;
}
