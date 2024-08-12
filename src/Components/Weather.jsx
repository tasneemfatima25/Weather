import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weather, setWeather] = useState(null); 
    const [city, setCity] = useState("");
    const [error, setError] = useState(null);

    // Fetch weather data whenever city changes
    useEffect(() => {
        if (city.trim()) {
            getWeather();
        }
    }, [city]);

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const getWeather = async () => {
        const apiKey = '188f969afb1d102d710801caa3e1f011';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('');
            }
            const data = await response.json();
            setWeather(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeather(null);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen
        bg-gradient-to-br from-purple-300 via-gray-200 to-purple-300 p-4">
            <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-2xl rounded-3xl p-10 max-w-lg w-full border border-gray-600 transform transition-transform duration-300 hover:scale-105">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-6">Weather App</h1>
                    <div className="flex items-center justify-center mb-6">
                        <input
                            onChange={handleChange}
                            value={city}
                            type="text"
                            placeholder="Enter city name"
                            className="border-2 capitalize border-gray-500 rounded-l-lg py-2 px-4 w-full shadow-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition duration-300"
                        />
                        <button
                            onClick={() => city && getWeather()}
                            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-2 px-4 ml-2 rounded-r-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Search
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-400 text-center mt-4">{error}</p>}
                {weather && (
                    <div className="mt-8 text-center">
                        <h2 className="text-5xl font-bold text-white">{weather.name}</h2>
                        <p className="text-gray-200 text-3xl py-2">{weather.main.temp}°C</p>
                        <p className="text-gray-200 text-xl">{weather.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
