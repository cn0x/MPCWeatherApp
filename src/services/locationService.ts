/**
 * Location service for handling user location and permissions
 */

import { Platform, Alert } from 'react-native';
import { PERMISSIONS, request, RESULTS, check } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface LocationPermissionState {
  granted: boolean;
  denied: boolean;
  neverAsked: boolean;
}

/**
 * Checks the current location permission status
 */
export const checkLocationPermission =
  async (): Promise<LocationPermissionState> => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    if (!permission) {
      return { granted: false, denied: true, neverAsked: false };
    }

    try {
      const result = await check(permission);

      return {
        granted: result === RESULTS.GRANTED,
        denied: result === RESULTS.DENIED,
        neverAsked:
          result === RESULTS.UNAVAILABLE || result === RESULTS.BLOCKED,
      };
    } catch (error) {
      console.error('Error checking location permission:', error);
      return { granted: false, denied: true, neverAsked: false };
    }
  };

/**
 * Requests location permission from the user
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  });

  if (!permission) {
    return false;
  }

  try {
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

/**
 * Gets the user's current location
 */
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        console.error('Error getting location:', error);
        reject(new Error('Failed to get current location'));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};

/**
 * Shows an alert to explain why location permission is needed
 */
export const showLocationPermissionAlert = () => {
  Alert.alert(
    'Location Permission',
    'This app uses your location to show current weather automatically. You can also search for any city manually.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Enable Location',
        onPress: () => requestLocationPermission(),
      },
    ],
  );
};
