import './WeatherInfo.css'

function WeatherInfo({weather}) {
    if (weather.status === 404) {
        return <p>City not found</p>;
    }
    return (
        <div className='weather-container'>
            <h2>City: {weather.name}, {weather.sys.country}</h2>
            <div className='weather-info'>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='weather icon' />
            <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
            </div>
            <p className='description'>Weather: {weather.weather[0].description}</p>
            <div className='details'>
                <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Pressure: {weather.main.pressure} hPa</p>
            </div>
        </div>
    )
}

export default WeatherInfo