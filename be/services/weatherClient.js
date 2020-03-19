const axios = require("axios");

module.exports = class WeatherClient {
  constructor() {
    this.url = process.env.WEATHER_URL;
    this.key = process.env.WEATHER_KEY;
    // actualy these icons should be uploaded somewhere on the web
    // and i should provide just the urls for them
    this.icons = {
      "clear-day": "img/day_clear.png",
      "clear-night": "img/night_clear.png",
      rain: "img/rain.png",
      snow: "img/snow.png",
      sleet: "img/sleet.png",
      wind: "img/wind.png",
      fog: "img/fog.png",
      cloudy: "img/cloudy.png",
      "partly-cloudy-day": "img/day_partial_cloud.png",
      "partly-cloudy-night": "img/night_partial_cloud.png"
    };
  }

  async getWeather(lat, lon) {
    try {
      const response = await axios.get(
        `${this.url}/${this.key}/${lat},${lon}?exclude=minutely,hourly,currently,alerts,flags&units=si`
      );

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const info = response.data.daily.data.slice(0, 5).map(day => {
        return {
          ...day,
          imgSrc: this.icons[day.icon],
          dayOfWeek: days[new Date(day.time * 1000).getDay()]
        };
      });
      return info;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
