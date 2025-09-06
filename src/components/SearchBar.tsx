/**
 * Reusable SearchBar component for city input
 */

import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { usethemeColors } from '../themes/appColors';
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const { width } = Dimensions.get('window');

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = 'Enter city name...',
  disabled = false,
}) => {
  const inputRef = useRef<TextInput>(null);
  const colors = usethemeColors();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            borderColor: colors.primary,
            backgroundColor: colors.primary,
          },
        ]}
        onPress={() => inputRef.current?.focus()}
      >
        <Ionicons name="location-outline" size={20} color={colors.primary} />
        <TextInput
          style={[
            styles.input,
            disabled && {
              backgroundColor: colors.primary,
              color: colors.secondary,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          editable={!disabled}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          autoCapitalize="words"
          autoCorrect={false}
          ref={inputRef}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 'auto',
    gap: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: width - 40,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
