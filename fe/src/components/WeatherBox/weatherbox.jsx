import React from "react";
import "./weatherbox.css";

export default function WeatherBox({ activeLocation, removeLocation }) {
  // activeLocation may exist but weather property may be null...
  if (!activeLocation || !activeLocation.weather) return null;
  const {
    summary,
    temperatureMin,
    temperatureMax,
    imgSrc,
    humidity,
    windSpeed,
    precipProbability,
    pressure
  } = activeLocation.weather.today;
  return (
    <>
      <div className="wrapper">
        <h1 className="locationName">
          {activeLocation.name}
          <span
            className="removeButton"
            onClick={() => removeLocation(activeLocation.id)}
          >
            <img src="img/remove.jpg" alt="img"></img>
          </span>
        </h1>

        <div className="weatherBox-container">
          <div className="top">
            <div className="top-left">
              <p className="dayName">
                TODAY <br />
                <span className="description">{summary}</span>
              </p>
              <p className="minMax">
                {Math.round(temperatureMin)}&#176;C /{" "}
                {Math.round(temperatureMax)}
                &#176;C
              </p>
            </div>
            <div className="top-right">
              {" "}
              <img src={imgSrc} alt="img" />
            </div>
          </div>
          <div className="bottom">
            <div className="bottom-up">
              <p>
                <span>
                  <img src="img/rainIcon.png" alt="rainImg"></img>
                </span>{" "}
                {(humidity * 100).toFixed(0)}% HUMIDITY
              </p>
              <p>
                <span>
                  <img src="img/windIcon.png" alt="windImg"></img>
                </span>{" "}
                {windSpeed}/MPH WIND SPEED
              </p>
            </div>
            <div className="bottom-down">
              <p>
                <span>
                  <img src="img/rainIcon.png" alt="rainImg"></img>
                </span>{" "}
                {(precipProbability * 100).toFixed(0)}% CHANCE TO RAIN
              </p>
              <p>
                <span>
                  <img src="img/rainIcon.png" alt="rainImg"></img>
                </span>{" "}
                {pressure}/MBAR PRESSURE
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
