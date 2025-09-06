# MPC Weather App 🌤️

A simple, clean weather application built with React Native CLI that fetches and displays weather data from OpenWeatherMap API.

## Features ✨

- **City Search**: Search for weather information by city name
- **Current Weather Display**: Shows temperature, weather description, and weather icon
- **Detailed Information**: Displays humidity, wind speed, pressure, and temperature range
- **Loading States**: Shows loading indicators while fetching data
- **Error Handling**: Proper error handling for invalid cities and network issues
- **Clean UI**: Modern, responsive design with a clean interface
- **TypeScript**: Fully typed for better development experience

## Screenshots 📱

The app features a clean interface with:

- Search bar for city input
- Weather card displaying current conditions
- Loading spinner during API calls
- Error messages with retry functionality

## Prerequisites 📋

Before running this project, make sure you have:

- **Node.js** (version 20 or higher)
- **React Native CLI** installed globally
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **OpenWeatherMap API Key** (free account required)

## Installation 🚀

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd MPCWeatherApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Get OpenWeatherMap API Key**

   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

5. **Configure API Key**
   - Open `src/services/weatherService.ts`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```typescript
   const API_KEY = 'your_actual_api_key_here';
   ```

## Running the App 🏃‍♂️

### Android

```bash
npm run android
```

### iOS (macOS only)

```bash
npm run ios
```

### Start Metro Bundler

```bash
npm start
```

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.tsx   # City search input component
│   ├── WeatherCard.tsx # Weather display card
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── ErrorMessage.tsx # Error display component
│   └── index.ts        # Component exports
├── services/           # API and business logic
│   └── weatherService.ts # OpenWeatherMap API integration
├── screens/            # App screens
│   ├── WeatherScreen.tsx # Main weather screen
│   └── index.ts        # Screen exports
├── types/              # TypeScript type definitions
│   └── weather.ts      # Weather data interfaces
└── utils/              # Utility functions (future use)
```

## Key Components 🔧

### WeatherScreen

The main screen that handles:

- City search functionality
- Weather data fetching
- Loading and error states
- Displaying weather information

### SearchBar

Reusable component for city input with:

- Text input validation
- Search button
- Disabled state during loading

### WeatherCard

Displays weather information including:

- City name and country
- Current temperature and weather icon
- Weather description
- Additional details (humidity, wind, pressure)
- Temperature range (high/low)

### Error Handling

Comprehensive error handling for:

- Invalid city names
- Network connectivity issues
- API key problems
- Request timeouts

## API Integration 🌐

The app uses the OpenWeatherMap Current Weather API:

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: City name, API key, metric units
- **Response**: Complete weather data including temperature, humidity, wind, etc.

## Development Notes 💡

### Code Quality

- **TypeScript**: Full type safety with interfaces for all data structures
- **Functional Components**: Uses React hooks (useState, useEffect)
- **Clean Architecture**: Separated concerns with services, components, and screens
- **Error Boundaries**: Proper error handling throughout the app
- **Comments**: Well-documented code for maintainability

### Performance

- **Efficient Re-renders**: Optimized component structure
- **Loading States**: Prevents multiple simultaneous requests
- **Image Caching**: Weather icons are cached by React Native

## Troubleshooting 🔧

### Common Issues

1. **"City not found" error**

   - Check the city name spelling
   - Try using the full city name (e.g., "New York" instead of "NY")

2. **API key errors**

   - Verify your OpenWeatherMap API key is correct
   - Ensure your API key is active and has remaining requests

3. **Network errors**

   - Check your internet connection
   - Verify the API endpoint is accessible

4. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - For iOS: Run `cd ios && pod install && cd ..`
   - Clear Metro cache: `npx react-native start --reset-cache`

## Future Enhancements 🚀

Potential features for future versions:

- 5-day weather forecast
- Location-based weather (GPS)
- Weather alerts and notifications
- Multiple city favorites
- Dark mode theme
- Weather history
- Offline caching

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [React Native](https://reactnative.dev/) for the amazing framework
- [React Native CLI](https://github.com/react-native-community/cli) for the development tools

---

**Happy Weather Tracking! 🌤️**
