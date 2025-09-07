/**
 * ForecastCarousel component - Displays today's hourly and 7-day forecasts
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { usethemeColors } from '../themes/appColors';
import { DailyForecast, HourlyForecast } from '../types/weather';
import {
  formatTemperature,
  getWeatherIconUrl,
} from '../services/forecastService';
import Ionicons from '@react-native-vector-icons/ionicons';

const { width } = Dimensions.get('window');

interface ForecastCarouselProps {
  dailyForecast: DailyForecast[];
  hourlyForecast: HourlyForecast[];
  loading?: boolean;
}

export const ForecastCarousel: React.FC<ForecastCarouselProps> = ({
  dailyForecast,
  hourlyForecast,
  loading = false,
}) => {
  const colors = usethemeColors();
  const [activeTab, setActiveTab] = useState<'today' | 'weekly'>('today');

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 20,
      paddingBottom: 20,
      shadowColor: colors.outline,
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    date: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    tabContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 20,
      backgroundColor: colors.secondary,
      borderRadius: 12,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.background,
    },
    content: {
      minHeight: 200,
    },
    hourlyContainer: {
      paddingHorizontal: 20,
    },
    hourlyScrollView: {
      paddingVertical: 10,
    },
    hourlyItem: {
      alignItems: 'center',
      marginRight: 20,
      minWidth: 80,
    },
    hourlyTime: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    hourlyIcon: {
      width: 40,
      height: 40,
      marginBottom: 8,
    },
    hourlyTemp: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    hourlyPop: {
      fontSize: 12,
      color: colors.primary,
      marginTop: 4,
    },
    dailyContainer: {
      paddingHorizontal: 20,
    },
    dailyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.separator,
    },
    dailyItemLast: {
      borderBottomWidth: 0,
    },
    dailyDay: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      width: 80,
    },
    dailyIcon: {
      width: 32,
      height: 32,
      marginHorizontal: 16,
    },
    dailyTemp: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dailyTempMax: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    dailyTempMin: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    dailyPop: {
      fontSize: 12,
      color: colors.primary,
      marginLeft: 8,
    },
    loadingContainer: {
      padding: 40,
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 12,
    },
  });

  const renderHourlyForecast = () => (
    <View style={styles.hourlyContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hourlyScrollView}
      >
        {hourlyForecast.map((item, index) => (
          <View key={index} style={styles.hourlyItem}>
            <Text style={styles.hourlyTime}>{item.time}</Text>
            <Image
              source={{ uri: getWeatherIconUrl(item.weather.icon) }}
              style={styles.hourlyIcon}
              resizeMode="contain"
            />
            <Text style={styles.hourlyTemp}>
              {formatTemperature(item.temp)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderDailyForecast = () => (
    <View style={styles.dailyContainer}>
      {dailyForecast.map((item, index) => (
        <View
          key={index}
          style={[
            styles.dailyItem,
            index === dailyForecast.length - 1 && styles.dailyItemLast,
          ]}
        >
          <Text style={styles.dailyDay}>{item.dayName}</Text>
          <Image
            source={{ uri: getWeatherIconUrl(item.weather.icon) }}
            style={styles.dailyIcon}
            resizeMode="contain"
          />
          <View style={styles.dailyTemp}>
            <Text style={styles.dailyTempMax}>
              {formatTemperature(item.temp_max)}
            </Text>
            <Text style={styles.dailyTempMin}>
              {formatTemperature(item.temp_min)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Ionicons
            name="cloud-outline"
            size={48}
            color={colors.textSecondary}
          />
          <Text style={styles.loadingText}>Loading forecast...</Text>
        </View>
      );
    }

    return activeTab === 'today'
      ? renderHourlyForecast()
      : renderDailyForecast();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {activeTab === 'today' ? "Today's" : 'Weekly'} Forecast
        </Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'today' && styles.activeTabText,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'weekly' && styles.activeTabText,
            ]}
          >
            7 Days
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};
