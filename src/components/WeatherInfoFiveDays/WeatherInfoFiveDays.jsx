import './WeatherInfoFiveDays.css'

function WeatherInfoFiveDays({fivedays}) {

    let dailyForecast = {}

     for ( let forecast of fivedays.list) {
        const date = new Date(forecast.dt_txt).toLocaleDateString('en-US', {weekday: 'long', day:'2-digit'});
        if (!dailyForecast[date]) {
            dailyForecast[date] = [];
        }
        dailyForecast[date].push(forecast);
    }


    return (
        <div className="weather-container">
            <h3>5 days Forecast</h3>
            <div className='weather-list'>
            {Object.keys(dailyForecast).slice(1,6).map((date) => (
                <div key={date} className="weather-item">
                    <p className='date'>{date}</p>
                    <img src={`http://openweathermap.org/img/w/${dailyForecast[date][0].weather[0].icon}.png`} alt={dailyForecast[date][0].weather[0].description} />
                    <p className='description'>{dailyForecast[date][0].weather[0].description}</p>
                    <div className="">
                        <p>{Math.round(dailyForecast[date][0].main.temp_min)} min °C / {Math.round(dailyForecast[date][0].main.temp_max)} max °C</p>
                    </div>
                </div>
                
            ))}
            </div>
        </div>
    )
    
}


export default WeatherInfoFiveDays