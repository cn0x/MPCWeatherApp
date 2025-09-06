/**
 * Onboarding Screen - Introduces the app to first-time users
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usethemeColors } from '../themes/appColors';
import Ionicons from '@react-native-vector-icons/ionicons';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
}) => {
  const colors = usethemeColors();
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: 'Welcome to Weather App',
      subtitle: 'Get accurate weather forecasts for any location',
      description:
        'Stay informed with real-time weather data and detailed forecasts.',
      icon: 'cloud-outline',
      gradient: ['#4A90E2', '#357ABD'],
    },
    {
      title: 'Location-Based Weather',
      subtitle: 'Automatic weather for your current location',
      description:
        'Allow location access to get instant weather updates for your area.',
      icon: 'location-outline',
      gradient: ['#50C878', '#3A9B5C'],
    },
    {
      title: 'Detailed Forecasts',
      subtitle: '7-day and hourly weather predictions',
      description:
        'Plan your week with comprehensive weather forecasts and hourly updates.',
      icon: 'calendar-outline',
      gradient: ['#FF6B6B', '#E55555'],
    },
    {
      title: 'Ready to Start',
      subtitle: 'Your weather companion is ready',
      description:
        'Get started and never be caught off guard by the weather again.',
      icon: 'checkmark-circle-outline',
      gradient: ['#9B59B6', '#8E44AD'],
    },
  ];

  const currentStepData = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.primary,
      textAlign: 'center',
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 60,
    },
    buttonContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    primaryButtonText: {
      color: colors.background,
      fontSize: 18,
      fontWeight: '600',
    },
    secondaryButton: {
      paddingVertical: 12,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: colors.textSecondary,
      fontSize: 16,
    },
    indicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      backgroundColor: colors.outline,
    },
    activeIndicator: {
      backgroundColor: colors.primary,
      width: 24,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={currentStepData.icon as any}
            size={60}
            color={colors.background}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{currentStepData.title}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>

        {/* Description */}
        <Text style={styles.description}>{currentStepData.description}</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>
              {currentStep === onboardingSteps.length - 1
                ? 'Get Started'
                : 'Next'}
            </Text>
          </TouchableOpacity>

          {currentStep < onboardingSteps.length - 1 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleSkip}
            >
              <Text style={styles.secondaryButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Progress Indicators */}
        <View style={styles.indicatorContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentStep && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
