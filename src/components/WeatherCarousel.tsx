import { StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import React from 'react';
import { WeatherResponse } from '../types/weather';
import { WeatherCard } from './WeatherCard';

interface WeatherCarouselProps {
  weatherData: WeatherResponse;
}

const WeatherCarousel: React.FC<WeatherCarouselProps> = ({ weatherData }) => {
  return (
    <View style={styles.container}>
      <Carousel
        data={weatherData}
        renderItem={({ item }) => <WeatherCard weatherData={item} />}
      />
    </View>
  );
};

export default WeatherCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
