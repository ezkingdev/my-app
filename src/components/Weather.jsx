// Suggested code may be subject to a license. Learn more: ~LicenseLog:93332120.
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Weather () {
    const [forecast, setForecast] = useState(null);

    useEffect (() => {
        const fetchForecast = async () => {
            try {

                const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
                setForecast(response.data);
            }
            catch{
                console.log('error');
            }
        }
        fetchForecast();
    }, []);

    return (
        <>
            <h1 className="text-blue-300">Accra Weather</h1>
            {forecast && ( 
                <div>
                    <p className="">Temp: {forecast.current.temperature_2m}°C</p>
                    <p>Wind Speed: {forecast.current.wind_speed_10m}km/h</p>
                    <p>Humidity: {forecast.current.relative_humidity_2m}%</p>
                </div>
            )}
        </>
    )
};

export default Weather;


