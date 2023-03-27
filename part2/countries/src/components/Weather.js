import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {country }) => {
    const [weather, setWeather] = useState(null)
  
    // useEffect hook to fetch weather data from OpenWeatherMap API
    useEffect(() => {
      const apiKey = process.env.REACT_APP_API_KEY
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
      axios.get(apiUrl).then(response => {
        setWeather(response.data)
      })
    }, [country])

    return ( 
    <div>
        {weather && (
          <div>
            <h3>Weather in {country.capital}</h3>
            <div>temperature: {weather.main.temp} Celsius</div>
            <img
              alt="weather icon"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <div>wind: {weather.wind.speed} m/s</div>
          </div>
        )}
    </div>
    )
        }
export default Weather