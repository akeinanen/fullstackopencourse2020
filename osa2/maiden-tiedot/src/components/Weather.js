import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState([])
  
  const promise = () => {
      const key = process.env.REACT_APP_API_KEY
      const url = `http://api.weatherstack.com/current?access_key=${key}&query=${capital}`
      axios.get(url).then(response => {
        setWeather(response.data.current); 
      })}
      useEffect(promise, [])

  return(
      <>
          <h2>Weather in {capital}</h2>
          <p><b>temperature: </b>{weather.temperature} Celcius</p>
          <img alt="weather-icon" width="120" src={weather.weather_icons} />
          <p><b>Wind:</b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
      </>
  )
}

export default Weather;