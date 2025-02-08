import { getWeather } from '../services/weatherService.js';
import { getNews } from '../services/newsService.js';
// import redisClient from '../config/redis.js';
import pool from '../config/db.js';


// Fetching  weather and news Data for non logged in user 

export async function getWeatherAndNews(req, res){
    const city = req.query.city;
    if (!city) {
        return res.status(400).send('City is required');
    }

    // Checking Redis cache first
    // const cachedData = await redisClient.get(`weather_news:${city}`);
    // if (cachedData) {
    //     console.log("Serving Cached data");
    //     return res.json(JSON.parse(cachedData)); // Serving cached data 
    // }

    // If not cached, fetching fresh data
    const currentWeather = await getWeather(city,res);
    const latestNews = await getNews(city,res);

    const responseData = { weather: currentWeather, news: latestNews };

    // Storing in Redis for 10 min 
    // await redisClient.set(`weather_news:${city}`, JSON.stringify(responseData),'EX',600);

    res.json(responseData);
};



// Fetching weather and news according to user preferences for logged in users

export async function getPersonalizedWeatherAndNews(req,res){


    const preferences = await pool.query('SELECT * FROM user_preferences WHERE user_id = $1', [req.userId]);
    let city = req.query.city;
console.log(preferences.rows[0].preferred_city);
    if (!city && !(preferences.rows[0].preferred_city)) {
        return res.status(400).send('City is required');
    }

    // const cachedData = await redisClient.get(`weather_news:${city}`);
    // if (cachedData) {
    //     console.log("Serving Cached data");
    //     return res.json(JSON.parse(cachedData)); 
    // }
    const currentWeather = await getWeather(city,res,preferences.rows[0]);
    const latestNews = await getNews(city,res,preferences.rows[0]);

    const responseData = { weather: currentWeather, news: latestNews };

    // Storing in Redis for 10 min 
    // await redisClient.setEx(`weather_news:${city}`, 600, JSON.stringify(responseData));

    res.json(responseData);
}


// export async function deleteCache(req,res){
//     try {
//         await redisClient.flushAll();
//         res.json({ message: "Redis cache cleared successfully." });
//     } catch (error) {
//         console.error("Error clearing Redis cache:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export async function deleteCacheCity(req,res) {
//     try {
//         const city = req.params.city.toLowerCase(); // Normalize city name
//         await redisClient.del(`weather_news:${city}`);
//         res.json({ message: `Cache cleared for city: ${city}` });
//     } catch (error) {
//         console.error("Error clearing Redis cache:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
    
// }