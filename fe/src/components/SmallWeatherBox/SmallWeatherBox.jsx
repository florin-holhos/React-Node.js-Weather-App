import React from "react";
import "./SmallWeatherBox.css";
function SmallWeatherbox({
  icon,
  temperatureMin,
  temperatureMax,
  precipProbability,
  windSpeed,
  dayOfWeek,
  imgSrc,
  redirect,
  cursor,
  customClass
}) {
  function changeString(text) {
    text = String(text);
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, " ");
  }

  return (
    <div
      className={`forecast-section ${customClass || null}`}
      onClick={redirect}
      style={{ cursor: cursor }}
    >
      <div className="up">
        <div className="up-left">
          <p className="day">
            {dayOfWeek}
            <br />
          </p>
          <span className="weather-details">{changeString(icon)}</span>
        </div>
        <div className="up-right">
          <img src={imgSrc} alt="img" className="small-img"></img>
        </div>
      </div>
      <div className="down">
        <div className="down-temperature">
          <p className="temperatureLimits">
            {parseInt(temperatureMin)}&#176;C / {parseInt(temperatureMax)}
            &#176;C
          </p>
        </div>
        <div className="down-details">
          <span className="wind">
            <img
              src="img/rainIcon.png"
              alt="img"
              className="weather-icons"
            ></img>
            {(precipProbability * 100).toFixed(0)}%
          </span>

          <span className="humidity">
            <img
              src="img/windIcon.png"
              alt="img"
              className="weather-icons"
            ></img>
            {windSpeed.toFixed(0)}/MPH
          </span>
        </div>
      </div>
    </div>
  );
}

//

export default SmallWeatherbox;
