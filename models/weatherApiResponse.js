
class WeatherApiResponse {
    constructor(res) {
      this.location = {
        city: res.location.name,
        country: res.location.country,
        timezone: res.location.tz_id,
      };
      this.temperature = {
        value: res.current.temp_c,
        unit: "°C",
        feelsLike: res.current.feelslike_c,
      };
      this.condition = {
        description: res.current.condition.text,
        icon: res.current.condition.icon,
      };
      this.wind = {
        speed: res.current.wind_kph,
        direction: res.current.wind_degree,
      };
      this.humidity = res.current.humidity;
      this.visibility = res.current.vis_km;
      this.lastUpdated = new Date();
    }
  }
  
  export default WeatherApiResponse;