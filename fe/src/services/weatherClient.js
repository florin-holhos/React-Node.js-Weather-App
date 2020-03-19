import axios from "axios";

export default class WeatherClient {
  constructor(proxy) {
    this.proxyurl = process.env.REACT_APP_WEATHER_PROXY;
    this.client = axios.create({
      baseURL:
        (proxy === "" ? "" : this.proxyurl) +
        `${process.env.REACT_APP_WEATHER_URL}${process.env.REACT_APP_WEATHER_KEY}`,
      timeout: 10000
    });
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
  getWeather(lat, long) {
    return this.client
      .get(
        `${lat},${long}?exclude=minutely,hourly,currently,alerts,flags&units=si`
      )
      .then(res => {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        if (res.status !== 200) return null;
        const info = res.data.daily.data.slice(0, 5).map(day => {
          return {
            ...day,
            imgSrc: this.icons[day.icon],
            dayOfWeek: days[new Date(day.time * 1000).getDay()]
          };
        });
        return info;
      })
      .catch(err => {
        console.log(err.response.data);
        return null;
      });
  }
}
