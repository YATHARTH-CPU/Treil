const API_KEY = "41fa3f1392dbb6a0cc306376c44b5443";
let currentLocation = "Pune";
const BASE_URL = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
const FORECAST_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

const weatherContainer = document.getElementById("weatherContainer");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const locationTitle = document.getElementById("locationTitle");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const forecastBtn = document.getElementById("forecastBtn");
const forecastModal = document.getElementById("forecastModal");
const forecastContainer = document.getElementById("forecastContainer");
const closeBtn = document.getElementById("closeBtn");

let isDayMode = true;
let currentWeatherData = null;

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
}

async function fetchWeather() {
    loading.style.display = "block";

    try {
        const res = await fetch(BASE_URL(currentLocation));
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("City not found");
            }
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        currentWeatherData = data;
        displayWeather(data);
        locationTitle.textContent = `📍 ${data.name}, ${data.sys.country}`;
        updateDayNightMode(data);
    } catch (error) {
        if (error.message.includes("City not found")) {
            weatherContainer.innerHTML = "❌ City not found. Please try another location.";
        } else {
            weatherContainer.innerHTML = "❌ Error fetching data. Check your connection.";
        }
    } finally {
        loading.style.display = "none";
    }
}

function displayWeather(data) {
    if (!data || !data.main) {
        weatherContainer.innerHTML = "❌ No data available";
        return;
    }

    const temp = Math.round(data.main.temp);
    const condition = data.weather[0]?.main || "Unknown";
    const description = data.weather[0]?.description || "No description";
    const humidity = data.main.humidity ?? "—";
    const pressure = data.main.pressure ?? "—";
    const visibility = (typeof data.visibility === "number") ? (data.visibility / 1000).toFixed(1) : "—";
    const windSpeed = data.wind?.speed ?? "—";
    const sunrise = data.sys?.sunrise ? formatTime(data.sys.sunrise) : "—";
    const sunset = data.sys?.sunset ? formatTime(data.sys.sunset) : "—";
    const precipitation = data.rain ? (data.rain["1h"] || 0) : 0;

    // Update header elements
    document.getElementById("temp").textContent = `${temp}°`;
    document.getElementById("condition").textContent = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById("status").textContent = condition;

    weatherContainer.innerHTML = `
        <p>🌧️ Precipitation: ${precipitation} mm</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬️ Wind: ${windSpeed} m/s</p>
        <p>🌅 Sunrise: ${sunrise}</p>
        <p>🌇 Sunset: ${sunset}</p>
        <p>🔽 Pressure: ${pressure} hPa</p>
        <p>👀 Visibility: ${visibility} km</p>
    `;
}

function updateDayNightMode(data) {
    const body = document.body;
    const app = document.querySelector(".app");
    const sunrise = data.sys?.sunrise * 1000;
    const sunset = data.sys?.sunset * 1000;
    const now = new Date().getTime();

    if (now >= sunrise && now < sunset) {
        isDayMode = true;
        body.classList.remove("night-mode");
        body.classList.add("day-mode");
        app.classList.remove("night-mode");
        app.classList.add("day-mode");
        themeToggleBtn.textContent = "🌙";
    } else {
        isDayMode = false;
        body.classList.remove("day-mode");
        body.classList.add("night-mode");
        app.classList.remove("day-mode");
        app.classList.add("night-mode");
        themeToggleBtn.textContent = "☀️";
    }
}

function toggleTheme() {
    const body = document.body;
    const app = document.querySelector(".app");

    isDayMode = !isDayMode;

    if (isDayMode) {
        body.classList.remove("night-mode");
        body.classList.add("day-mode");
        app.classList.remove("night-mode");
        app.classList.add("day-mode");
        themeToggleBtn.textContent = "🌙";
    } else {
        body.classList.remove("day-mode");
        body.classList.add("night-mode");
        app.classList.remove("day-mode");
        app.classList.add("night-mode");
        themeToggleBtn.textContent = "☀️";
    }
}

async function fetchForecast() {
    if (!currentWeatherData) {
        alert("Please load weather data first");
        return;
    }

    loading.style.display = "block";

    try {
        const lat = currentWeatherData.coord.lat;
        const lon = currentWeatherData.coord.lon;
        const res = await fetch(FORECAST_URL(lat, lon));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        displayForecast(data);
        forecastModal.style.display = "flex";
        applyModalTheme();
    } catch (error) {
        alert("Error fetching forecast data");
    } finally {
        loading.style.display = "none";
    }
}

function displayForecast(data) {
    const forecasts = data.list;
    const dailyForecasts = {};

    forecasts.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                temps: [],
                weather: forecast.weather[0],
                humidity: forecast.main.humidity,
                windSpeed: forecast.wind.speed,
            };
        }
        dailyForecasts[day].temps.push(forecast.main.temp);
    });

    forecastContainer.innerHTML = "";
    let dayCount = 0;

    Object.keys(dailyForecasts).forEach((day) => {
        if (dayCount >= 7) return;

        const forecast = dailyForecasts[day];
        const avgTemp = Math.round(forecast.temps.reduce((a, b) => a + b) / forecast.temps.length);
        const minTemp = Math.round(Math.min(...forecast.temps));
        const maxTemp = Math.round(Math.max(...forecast.temps));

        const iconMap = {
            "Clouds": "☁️",
            "Clear": "☀️",
            "Rain": "🌧️",
            "Snow": "❄️",
            "Thunderstorm": "⛈️",
            "Drizzle": "🌦️",
            "Mist": "🌫️",
            "Haze": "🌫️",
        };

        const icon = iconMap[forecast.weather.main] || "🌤️";

        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
            <h3>${day}</h3>
            <div class="icon">${icon}</div>
            <p class="temp">${avgTemp}°</p>
            <p>High: ${maxTemp}°</p>
            <p>Low: ${minTemp}°</p>
            <p class="condition">${forecast.weather.main}</p>
            <p>💧 ${forecast.humidity}%</p>
            <p>🌬️ ${forecast.windSpeed.toFixed(1)} m/s</p>
        `;
        forecastContainer.appendChild(card);
        dayCount++;
    });
}

function applyModalTheme() {
    if (isDayMode) {
        forecastModal.classList.remove("night-mode");
    } else {
        forecastModal.classList.add("night-mode");
    }
}

function closeForecalModal() {
    forecastModal.style.display = "none";
}

window.onload = () => {
    fetchWeather();

    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
    themeToggleBtn.addEventListener("click", toggleTheme);
    forecastBtn.addEventListener("click", fetchForecast);
    closeBtn.addEventListener("click", closeForecalModal);
    window.addEventListener("click", (e) => {
        if (e.target === forecastModal) {
            forecastModal.style.display = "none";
        }
    });
};

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        currentLocation = searchTerm;
        searchInput.value = "";
        fetchWeather();
    }
}
