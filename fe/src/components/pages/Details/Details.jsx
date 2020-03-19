import React, { useContext } from "react";
import WeatherBox from "../../WeatherBox/weatherbox";
import { LocationContext } from "../../../contexts/LocationContext";
import ForecastSection from "../../ForecastSection/ForecastSection";

const Details = () => {
  const { activeLocation, removeLocation } = useContext(LocationContext);

  return (
    <>
      {(activeLocation && activeLocation.weather && (
        <>
          <WeatherBox
            activeLocation={activeLocation}
            removeLocation={removeLocation}
          />
          <ForecastSection activeLocation={activeLocation} />
        </>
      )) ||
        null}
    </>
  );
};

export default Details;
