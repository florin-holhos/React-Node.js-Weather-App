import React from "react";
import "./ForecastSection.css";
import SmallWeatherbox from "../SmallWeatherBox/SmallWeatherBox";

export default function ForecastSection({ activeLocation }) {
  const forecast = activeLocation.weather.forecast || null;
  return (
    <>
      {(forecast && forecast.length && (
        <div className="forecast-wrapper">
          {forecast.map((item, index) => {
            return (
              <SmallWeatherbox
                key={`item_${index}`}
                icon={item.icon}
                temperatureMin={item.temperatureMin}
                temperatureMax={item.temperatureMax}
                imgSrc={item.imgSrc}
                precipProbability={item.precipProbability}
                windSpeed={item.windSpeed}
                dayOfWeek={item.dayOfWeek}
              />
            );
          })}
        </div>
      )) ||
        null}
    </>
  );
}
