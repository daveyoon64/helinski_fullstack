import { useState, useEffect } from 'react'

import axios from 'axios'

const Weather = ({country}) => {
  const [weather, setWeather] = useState({
    current: null
  })

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_CODE}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }, [country.capital])

  if (weather.current === null) {
    return (<div>Loading Weather of Capial...</div>)
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div><b>temperature:</b> {weather.current.temperature} Celcius</div>
      <img src={weather.current.weather_icons[0]} alt=''/>
      <div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  );
}

export default Weather 