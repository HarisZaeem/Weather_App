// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';
import { WiDaySunny, WiHumidity, WiStrongWind, WiCloudy } from 'react-icons/wi';
import { FaSearchLocation } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'e40572332a6f223b16502d4d30aed11b';

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found. Try again.');
      setWeatherData(null);
    }
    setLoading(false);
  };

  return (
    <div className="weather-glass">
      <div className="weather-box">
        <h1 className="title">🌤️ Weather App</h1>
        <div className="search-box">
          <input
            className="weather-input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button className="weather-button" onClick={getWeather}>
            <FaSearchLocation />
          </button>
        </div>

        {loading && <div className="loading"><ImSpinner9 className="spinner" /></div>}

        {error && <p className="error">{error}</p>}

        {weatherData && !loading && (
          <div className="weather-result">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <div className="info-card">
              <p><WiDaySunny className="icon" /> Temperature: {weatherData.main.temp}°C</p>
              <p><WiCloudy className="icon" /> Weather: {weatherData.weather[0].description}</p>
              <p><WiHumidity className="icon" /> Humidity: {weatherData.main.humidity}%</p>
              <p><WiStrongWind className="icon" /> Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
