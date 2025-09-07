/**
 * CitySuggestionList component for displaying autocomplete suggestions
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CitySuggestion } from '../types/weather';
import { usethemeColors } from '../themes/appColors';
import Ionicons from '@react-native-vector-icons/ionicons';

interface CitySuggestionListProps {
  suggestions: CitySuggestion[];
  loading: boolean;
  error: string | null;
  onSuggestionSelect: (suggestion: CitySuggestion) => void;
  visible: boolean;
}

export const CitySuggestionList: React.FC<CitySuggestionListProps> = ({
  suggestions,
  loading,
  error,
  onSuggestionSelect,
  visible,
}) => {
  const colors = usethemeColors();

  if (!visible) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 60, // Position below the search bar
      left: 20,
      right: 20,
      backgroundColor: colors.background,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
      maxHeight: 200,
      zIndex: 1000,
    },
    loadingContainer: {
      padding: 20,
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 8,
      fontSize: 14,
      color: colors.textSecondary,
    },
    errorContainer: {
      padding: 20,
      alignItems: 'center',
    },
    errorText: {
      fontSize: 14,
      color: colors.error,
      textAlign: 'center',
    },
    emptyContainer: {
      padding: 20,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
    },
    suggestionItemLast: {
      borderBottomWidth: 0,
    },
    locationIcon: {
      marginRight: 12,
    },
    suggestionContent: {
      flex: 1,
    },
    suggestionName: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 2,
    },
    suggestionDetails: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });

  const renderSuggestion = ({
    item,
    index,
  }: {
    item: CitySuggestion;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.suggestionItem,
        index === suggestions.length - 1 && styles.suggestionItemLast,
      ]}
      onPress={() => onSuggestionSelect(item)}
      activeOpacity={0.7}
    >
      <Ionicons
        name="location-outline"
        size={20}
        color={colors.primary}
        style={styles.locationIcon}
      />
      <View style={styles.suggestionContent}>
        <Text style={styles.suggestionName}>{item.name}</Text>
        <Text style={styles.suggestionDetails}>
          {item.state ? `${item.state}, ` : ''}
          {item.country}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>Searching cities...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (suggestions.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No cities found</Text>
        </View>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={suggestions}
          renderItem={renderSuggestion}
          keyExtractor={(item, index) =>
            `${item.name}-${item.country}-${index}`
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled
        />
      </ScrollView>
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};
