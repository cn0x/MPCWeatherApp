# Quick Setup Guide 🚀

## 1. Get Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

## 2. Configure the App

1. Open `src/config/api.ts`
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```typescript
   export const API_CONFIG = {
     OPENWEATHER_API_KEY: 'your_actual_api_key_here',
     // ... rest of config
   };
   ```

## 3. Run the App

```bash
# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 4. Test the App

1. Enter a city name (e.g., "London", "New York", "Tokyo")
2. Tap "Search" or press Enter
3. View the weather information

## Troubleshooting

- **"City not found"**: Check spelling, try full city names
- **API errors**: Verify your API key is correct and active
- **Build errors**: Run `npm install` and for iOS: `cd ios && pod install && cd ..`

That's it! Your weather app is ready to use! 🌤️
