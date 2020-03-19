import React, { useContext } from "react";
import SmallWeatherbox from "../../SmallWeatherBox/SmallWeatherBox";
import { LocationContext } from "../../../contexts/LocationContext";
import history from "../../../services/browserHistory";
import "./Dashboard.css";

const Dashboard = () => {
  const { locations, setActive } = useContext(LocationContext);

  function redirect(location) {
    setActive(location);
    return history.push(`/${location.id}`);
  }

  return (
    <>
      {(locations && locations.length && (
        <div className="locDash">
          {locations.map((location, index) => {
            return (
              location.weather &&
              location.weather.today && (
                <SmallWeatherbox
                  key={`loc_${index}`}
                  icon={location.weather.today.icon}
                  dayOfWeek={location.name}
                  temperatureMin={location.weather.today.temperatureMin}
                  temperatureMax={location.weather.today.temperatureMax}
                  imgSrc={location.weather.today.imgSrc}
                  precipProbability={location.weather.today.precipProbability}
                  windSpeed={location.weather.today.windSpeed}
                  redirect={() => redirect(location)}
                  cursor={"pointer"}
                  customClass="dashSection"
                ></SmallWeatherbox>
              )
            );
          })}
        </div>
      )) || (
        <h3 className="alternative-text">
          You don't have any saved locations!
        </h3>
      )}
    </>
  );
};

export default Dashboard;
