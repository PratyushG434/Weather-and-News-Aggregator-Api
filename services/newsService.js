import axios from 'axios';
import NewsInfo from '../models/newsResponse.js';


const newsApiUrlBase = "https://newsapi.org/v2/everything";
const GNewsApiUrlBase = "https://gnews.io/api/v4/";


export async function getNews(city_name,preferences ) {
    const dateToday = new Date();
    const dateBefore = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const latestNews = {};
    const { preferredCategory, language , country } = preferences || {}; 
    // Fetching News API Data
    try {
        const {data} = await axios.get(
            `${newsApiUrlBase}?q=${city_name||preferences.preferredCategory||preferences.country}&from=${dateBefore.toISOString()}&to=${dateToday.toISOString()}&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}`
        );
        if (!data || !data.articles || data.articles.length === 0) {
            latestNews.gNewsApi = { message: "No news found for this query in the News API." };
        }
        
        latestNews.newsApi = new NewsInfo(data);



    } catch (error) {
        console.error("Error fetching News API data:", error.message);
        latestNews.newsApi = { message: "Error retrieving news data from News API. Please try again later." };
    }

    // Fetching G News API Data
    try {
        const {data} = await axios.get
        (
            `${GNewsApiUrlBase}search?q=${city_name}&lang=${language}&country=${country}&category=${preferredCategory}&from=${dateBefore.toISOString()}&to=${dateToday.toISOString()}&apikey=${process.env.G_NEWS_API_KEY}`
        );
        if (!data || !data.articles || data.articles.length === 0) {
            latestNews.gNewsApi = { message: "No news found for this query in the G News API." };
        }
        
        latestNews.gNewsApi = new NewsInfo(data,true,preferredCategory);

    } catch (error) {
        console.error("Error fetching G News API data:", error.message);
        latestNews.gNewsApi = { message: "Error retrieving news data from G News API. Please try again later." };
    }

    return latestNews;
}
