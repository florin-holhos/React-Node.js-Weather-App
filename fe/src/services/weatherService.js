import Cache from "./cacheService";
import WeatherClient from "./weatherClient";

/**@getWeatherForeach takes as argument an array of locations and returns weather info's for each location*/
/**@getForecast takes as argument a single location and returns the forecast for the next 4 days */
export default class WeatherService extends WeatherClient {
  constructor() {
    super();
    this.cache = new Cache(sessionStorage, 60 * 19); // 19 min exp time
    this.counter = 0;
  }

  getWeatherForeach = async locations => {
    return await Promise.all(
      locations.map(loc => {
        return this.getWeather(loc);
      })
    );
  };

  getWeather = async location => {
    const fromCache = this.cache.getItems(location.id);
    if (!fromCache) {
      const fromFetch = await super.getWeather(location.lat, location.lon);
      if (!fromFetch) {
        return null;
      }
      const item = {
        today: fromFetch[0],
        forecast: fromFetch.slice(1, 5)
      };
      this.cache.setItems(location.id, item);
      return item;
    }
    delete fromCache.expTime;
    return fromCache;
  };

  removeWeather = key => {
    this.cache.removeItems(key);
  };
}
