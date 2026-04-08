# Weather Dashboard 🌤️

A beautiful, responsive weather application that provides real-time weather data and forecasts for any location around the world.

## Features

✨ **Real-Time Weather Data**
- Current temperature and weather conditions
- Humidity, pressure, visibility, and wind speed
- Sunrise and sunset times
- Precipitation information

🔍 **Search Functionality**
- Search weather for any city in the world
- Easy-to-use search bar with Enter key support
- Error handling for invalid locations
- City name and country code display

📅 **7-Day Forecast**
- View 7-day weather forecast
- Daily high and low temperatures
- Weather conditions with emoji icons
- Humidity and wind speed data
- Beautiful modal interface

🌙 **Day/Night Mode**
- Automatic day/night detection based on sunrise/sunset times
- Manual toggle button to switch modes
- Beautiful gradient backgrounds for each mode
- Smooth color transitions

## Installation

1. Clone or download the repository:
```bash
git clone https://github.com/yourusername/weatherdas.git
cd weatherdas
```

2. Open `index.html` in your web browser:
```bash
open index.html
```

Or simply double-click the `index.html` file to open it in your default browser.

## Files

- **index.html** - Main HTML structure
- **style.css** - Styling and theme modes
- **main.js** - JavaScript functionality
- **README.md** - Documentation

## How to Use

### 1. View Current Weather
- The app automatically loads weather for Pune when you open it
- View the current temperature, weather condition, and detailed metrics

### 2. Search for a City
- Type a city name in the search bar
- Press **Enter** or click the 🔍 button
- View weather for the selected location
- The app will show an error if the city is not found

### 3. View 7-Day Forecast
- Click the 📅 button to open the forecast modal
- View detailed weather for the next 7 days
- Close the modal by clicking the ✕ button or clicking outside

### 4. Switch Between Day/Night Mode
- Click the 🌙 button in the search bar to toggle day/night mode
- The app automatically switches based on local sunrise/sunset times
- Choose your preferred theme anytime

## API Used

This application uses the **OpenWeatherMap API**:
- Current Weather Data: `/weather` endpoint
- Forecast Data: `/forecast` endpoint

Get your free API key at: [openweathermap.org](https://openweathermap.org/api)

## Features Breakdown

### Weather Information Displayed
- 🌡️ Temperature (in Celsius)
- 💧 Humidity percentage
- 🌬️ Wind speed (m/s)
- 🌧️ Precipitation (mm)
- 🔽 Atmospheric pressure (hPa)
- 👀 Visibility (km)
- 🌅 Sunrise time
- 🌇 Sunset time

### Weather Conditions
- ☀️ Clear sky
- ☁️ Clouds
- 🌧️ Rain
- 🌦️ Drizzle
- ❄️ Snow
- ⛈️ Thunderstorm
- 🌫️ Mist/Haze

## Responsive Design

The application is fully responsive and works great on:
- 💻 Desktop computers
- 📱 Tablets
- 📱 Mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: OpenWeatherMap REST API
- **Styling**: CSS Grid, Flexbox, Gradients
- **Animations**: CSS keyframe animations

## Customization

### Change Default Location
In `main.js`, modify the default location:
```javascript
let currentLocation = "Pune"; // Change to your preferred city
```

### Change API Key
To use your own API key, update in `main.js`:
```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```

## Features in Progress

- [ ] Weather alerts and warnings
- [ ] Multiple location favorites
- [ ] Air quality index
- [ ] Weather maps
- [ ] Local storage for preferences
- [ ] More weather icons and animations

## Known Issues

- Forecast modal might be slow on very slow internet connections
- Some weather conditions may not have specific emoji icons

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is open source and available under the MIT License.

## Support

For issues or feature requests, please open an issue in the repository.

## Version History

**v1.0.0** (April 2026)
- Initial release
- Real-time weather data
- 7-day forecast
- Day/night mode
- Search functionality
- Responsive design

---

Made with ❤️ for weather enthusiasts
