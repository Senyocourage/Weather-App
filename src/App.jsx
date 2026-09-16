import { useState } from 'react'

function App() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const searchWeather = async () => {

    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)

    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('City not found')
      }

      const data = await response.json()

      setWeather(data)

    } catch (error) {

      setError(error.message)

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Weather App
        </h1>

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={searchWeather}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

        </div>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        {weather && (
          <div className="text-center mt-8">

            <h2 className="text-2xl font-bold text-blue-800">
              {weather.name}
            </h2>

            <p className="text-5xl font-bold text-gray-500 mt-4">
              {Math.round(weather.main.temp)}°C
            </p>

            <p className="text-gray-600 mt-2 capitalize">
              {weather.weather[0].description}
            </p>

          </div>
        )}

      </div>

    </div>
  )
}

export default App
