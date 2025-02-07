import dotenv from 'dotenv';

dotenv.config();

export const geoUrlBase = process.env.GEO_API_URL;
export const openWeatherUrlBase = process.env.OPEN_WEATHER_API_URL;
export const weatherApiUrlBase = process.env.WEATHER_API_URL;
export const newsApiUrlBase = process.env.NEWS_API_URL;
export const GNewsApiUrlBase = process.env.GNEWS_API_URL;