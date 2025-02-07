import axios from 'axios';
import OpenWeatherApiResponse from '../models/openWeatherApiResponse.js';
import WeatherApiResponse from '../models/weatherApiResponse.js';



const geoUrlBase = "http://api.openweathermap.org/geo/1.0/";
const openWeatherUrlBase = "https://api.openweathermap.org/data/2.5/";
const weatherApiUrlBase = "http://api.weatherapi.com/v1/";

export async function getWeather(city_name, res, preferences) {
    try {
        let currentWeather = {};

        let latitude, longitude;
        
        // Fetching coordinates
        try {
            console.log(city_name||preferences.preferred_city);
            const { data } = await axios.get(`${geoUrlBase}direct?q=${city_name||preferences.preferred_city}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`);
            if (data.length === 0) {
                return res.json({ message: "Please enter a valid location." });
            }
            
            latitude = data[0].lat;
            longitude = data[0].lon;
        } catch (error) {
            console.error("Error fetching coordinates:", error.message);
            currentWeather = { message: "Error retrieving coordinates. Try again later." };
            return;
        }

        

        // Fetching OpenWeather data
        try {
            const { data } = await axios.get(`${openWeatherUrlBase}weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
            currentWeather.openWeatherApi = new OpenWeatherApiResponse(data);
        } catch (error) {
            console.error("Error fetching OpenWeather data:", error.message);
            currentWeather.openWeatherApi = { error: "Weather data unavailable from OpenWeather." };
        }

        // Fetching WeatherAPI data
        try {
            const { data } = await axios.get(`${weatherApiUrlBase}current.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}`);
            currentWeather.weatherAPI = new WeatherApiResponse(data);

        } catch (error) {
            console.error("Error fetching WeatherAPI data:", error.message);
            currentWeather.weatherApi = { error: "Weather data unavailable from WeatherAPI." };
        }

        
        return currentWeather;

    } catch (err) {
        console.error("Unexpected error:", err.message);
        res.json({ message: "Couldn't process your request at the moment. Try again later." });
    }
}