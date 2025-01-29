import { useState, useRef, useEffect, useContext } from 'react'
import axios from 'axios'


import './App.css'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import WeatherInfoFiveDays from './components/WeatherInfoFiveDays/WeatherInfoFiveDays'
import { ThemeContext } from './components/ThemeContext/ThemeContext'

function App() {
  const [error, setError] = useState('')
  const [weather, setWeather] = useState()
  const [fivedays, setFivedays] = useState()
  const cityRef = useRef()

  const {theme, setTheme} = useContext(ThemeContext);
 

  async function searchCity() {
    const city = cityRef.current.value;
    const key = '1922c5408f8ea73994f71ed1d20266cf';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=en&units=metric`;
    const fivedaysurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=en&units=metric`;

    try {
      const dataWeather = await axios.get(url)
      const dataFivedays = await axios.get(fivedaysurl)
      setWeather(dataWeather.data);
      setFivedays(dataFivedays.data);
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('City not found. Please enter a valid city name.');
      }else {
        setError('Something went wrong. Please try again later.');
      }
    }
  }

  return (
    <div className={`App`}>
     <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="toggle-theme">
                Toggle Theme
     </button>
    <div className="container">
      <h1>Forecast Weather</h1>
      <div className="search-container">
      <input ref={cityRef} type="text" placeholder='Enter City' />
      <button className='btn' onClick={searchCity}>Search</button>
      </div>
      {error && <p className='error-message'>{error}</p>}
      {weather && <WeatherInfo weather={weather} />}
      {fivedays && <WeatherInfoFiveDays fivedays={fivedays} />}
    </div>
    </div>
  )
}

export default App

