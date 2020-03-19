const WeatherClient = require("./weatherClient");
const Cache = require("./cacheService");

/**@getWeatherForeach takes as argument an array of locations and returns weather info's for each location*/
/**@getForecast takes as argument a single location and returns the forecast for the next 4 days */
class WeatherService extends WeatherClient {
  constructor() {
    super();
    this.cache = new Cache(1140); // 19 min exp time
  }

  async getWeatherForeach(locations) {
    return await Promise.all(
      locations.map(loc => {
        return this.getWeather(loc);
      })
    );
  }

  async getWeather(location) {
    const fromCache = await this.cache.getItems(location.id);
    if (!fromCache) {
      const fromFetch = await super.getWeather(location.lat, location.lon);
      if (!fromFetch) {
        return null;
      }
      const weather = {
        today: fromFetch[0], // first element is the current day
        forecast: fromFetch.slice(1, 5) // the rest 4 days
      };
      // store fetched items
      this.cache.setItems(location.id, weather);
      return weather;
    }
    delete fromCache.expTime;
    return JSON.parse(fromCache);
  }
}

module.exports = new WeatherService();
