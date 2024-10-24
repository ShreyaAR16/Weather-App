'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Search, Droplets, Wind } from 'lucide-react'

type WeatherData = {
  name: string
  country: string
  temp: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

type WeatherCode = string

const getWeatherEmoji = (weatherCode: WeatherCode): string => {
  const weatherMap: Record<WeatherCode, string> = {
    '01d': '☀️', '01n': '🌙', // clear sky
    '02d': '⛅', '02n': '☁️', // few clouds
    '03d': '☁️', '03n': '☁️', // scattered clouds
    '04d': '☁️', '04n': '☁️', // broken clouds
    '09d': '🌧️', '09n': '🌧️', // shower rain
    '10d': '🌦️', '10n': '🌧️', // rain
    '11d': '⛈️', '11n': '⛈️', // thunderstorm
    '13d': '❄️', '13n': '❄️', // snow
    '50d': '🌫️', '50n': '🌫️'  // mist
  }
  return weatherMap[weatherCode] || '🌈'
}

export default function WeatherApp() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    setError(null)
    setWeatherData(null)
    setLoading(true)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city.trim())}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data')
      }

      setWeatherData({
        name: data.name,
        country: data.sys?.country || 'Unknown',
        temp: Math.round(data.main?.temp ?? 0),
        description: data.weather?.[0]?.description || 'No description available',
        humidity: data.main?.humidity ?? 0,
        windSpeed: data.wind?.speed ?? 0,
        icon: getWeatherEmoji(data.weather?.[0]?.icon || '01d')
      })
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setError(error instanceof Error ? error.message : 'An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-700' : 'from-blue-200 to-blue-400'} transition-colors duration-500`}>
      <div className={`max-w-md w-full p-6 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-500`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Weather App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'} transition-colors duration-300`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className={`flex-grow px-4 py-2 rounded-l-lg focus:outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
          />
          <button
            onClick={getWeather}
            disabled={loading}
            className={`px-4 py-2 rounded-r-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300 disabled:opacity-50`}
          >
            {loading ? 'Loading...' : <Search size={20} />}
          </button>
        </div>
        {error && (
          <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}
        {weatherData && (
          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} transition-colors duration-500`}>
            <h2 className="text-2xl font-semibold mb-2">{weatherData.name}, {weatherData.country}</h2>
            <div className="text-6xl mb-4">{weatherData.icon}</div>
            <p className="text-xl mb-4 capitalize">{weatherData.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg flex items-center ${darkMode ? 'bg-gray-600' : 'bg-white'} transition-colors duration-500`}>
                <Sun size={24} className="mr-2 text-yellow-500" />
                <span>{weatherData.temp}°C</span>
              </div>
              <div className={`p-3 rounded-lg flex items-center ${darkMode ? 'bg-gray-600' : 'bg-white'} transition-colors duration-500`}>
                <Droplets size={24} className="mr-2 text-blue-500" />
                <span>{weatherData.humidity}%</span>
              </div>
              <div className={`p-3 rounded-lg flex items-center ${darkMode ? 'bg-gray-600' : 'bg-white'} transition-colors duration-500`}>
                <Wind size={24} className="mr-2 text-green-500" />
                <span>{weatherData.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}