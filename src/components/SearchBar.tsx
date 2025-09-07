/**
 * Reusable SearchBar component for city input
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { usethemeColors } from '../themes/appColors';
import { useDebounce } from '../utils/useDebounce';
import { getCitySuggestions } from '../services/geocodingService';
import { CitySuggestion, SuggestionState } from '../types/weather';
import { CitySuggestionList } from './CitySuggestionList';
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  onSuggestionSelect?: (suggestion: CitySuggestion) => void;
  placeholder?: string;
  disabled?: boolean;
  showSuggestions?: boolean;
}

const { width } = Dimensions.get('window');

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  onSuggestionSelect,
  placeholder = 'Enter city name...',
  disabled = false,
  showSuggestions = true,
}) => {
  const inputRef = useRef<TextInput>(null);
  const colors = usethemeColors();

  // State for suggestions
  const [suggestionState, setSuggestionState] = useState<SuggestionState>({
    suggestions: [],
    loading: false,
    error: null,
  });
  const [showSuggestionList, setShowSuggestionList] = useState(false);

  // Debounce the input value to prevent excessive API calls
  const debouncedValue = useDebounce(value, 300);

  // Fetch suggestions when debounced value changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (
        !showSuggestions ||
        !debouncedValue.trim() ||
        debouncedValue.length < 2
      ) {
        setSuggestionState({ suggestions: [], loading: false, error: null });
        setShowSuggestionList(false);
        return;
      }

      setSuggestionState(prev => ({ ...prev, loading: true, error: null }));
      setShowSuggestionList(true);

      try {
        const suggestions = await getCitySuggestions(debouncedValue, 5);
        setSuggestionState({
          suggestions,
          loading: false,
          error: null,
        });
      } catch (error) {
        setSuggestionState({
          suggestions: [],
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Failed to fetch suggestions',
        });
      }
    };

    fetchSuggestions();
  }, [debouncedValue, showSuggestions]);

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: CitySuggestion) => {
    setShowSuggestionList(false);
    onSuggestionSelect?.(suggestion);
  };

  // Show suggestions again whenever user clicks on TextInput
  const handleFocus = () => {
    setShowSuggestionList(true);
  };

  // Handle text input changes
  const handleTextChange = (text: string) => {
    onChangeText(text);
    if (text.length >= 2) {
      setShowSuggestionList(true);
    } else {
      setShowSuggestionList(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginVertical: 16,
      position: 'relative',
      zIndex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.outline,
      borderRadius: 25,
      paddingHorizontal: 20,
      paddingVertical: 4,
      width: width - 40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    input: {
      flex: 1,
      height: 44,
      fontSize: 16,
      color: colors.text,
      paddingHorizontal: 12,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={20} color={colors.primary} />
        <TextInput
          style={[
            styles.input,
            disabled && {
              color: colors.textSecondary,
            },
          ]}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          editable={!disabled}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          autoCapitalize="words"
          autoCorrect={false}
          ref={inputRef}
          onFocus={handleFocus}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity
          onPress={() => {
            if (inputRef.current) {
              inputRef.current?.clear();
              inputRef.current?.blur();
            }
          }}
        >
          <Ionicons name="close-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* City Suggestions List */}
      <CitySuggestionList
        suggestions={suggestionState.suggestions}
        loading={suggestionState.loading}
        error={suggestionState.error}
        onSuggestionSelect={handleSuggestionSelect}
        visible={showSuggestionList && showSuggestions}
      />
    </View>
  );
};
