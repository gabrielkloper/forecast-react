import { useState, useRef, useEffect } from 'react'
import axios from 'axios'


import './App.css'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import WeatherInfoFiveDays from './components/WeatherInfoFiveDays/WeatherInfoFiveDays'

function App() {
  const [error, setError] = useState('')
  const [theme, setTheme] = useState('dark')
  const [weather, setWeather] = useState()
  const [fivedays, setFivedays] = useState()
  const cityRef = useRef()

  useEffect(() => {
    const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
    const theme = prefersLightScheme.matches ? 'light' : 'dark';
    setTheme(theme);
    document.body.classList.add(theme);

    const handleChange = (e) => {
        const newTheme = e.matches ? 'light' : 'dark';
        setTheme(newTheme);
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newTheme);
    };

    prefersLightScheme.addEventListener('change', handleChange);

    return () => {
        prefersLightScheme.removeEventListener('change', handleChange);
    };
}, []);
 

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
    <div className={`App ${theme}`}>
     <button onClick={() => {
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                document.body.classList.remove('light', 'dark');
                document.body.classList.add(newTheme);
            }}>
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

