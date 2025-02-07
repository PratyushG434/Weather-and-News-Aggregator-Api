
class OpenWeatherApiResponse {
    constructor(res) {
      this.location = {
        city: res.name,
        country: res.sys.country,
        timezone: res.timezone,
      };
      this.temperature = {
        value: res.main.temp,
        unit: "°C",
        feelsLike: res.main.feels_like,
      };
      this.condition = {
        description: res.weather[0].description,
        icon: res.weather[0].icon,
      };
      this.wind = {
        speed: res.wind.speed,
        direction: res.wind.deg,
      };
      this.humidity = res.main.humidity;
      this.visibility = res.visibility / 1000.0;  // Convert visibility to kilometers
      this.lastUpdated = new Date();
    }
  }
  
  export default OpenWeatherApiResponse;