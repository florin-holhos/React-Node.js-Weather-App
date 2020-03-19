import React from "react";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import WeatherClient from "../services/weatherClient";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("weatherClient", () => {
  let weatherClient = new WeatherClient("");

  it("Should call axios and return info ", async () => {
    const info = await weatherClient.getWeather("45.748871", "21.208679");
    expect(info.length > 0).toBe(true);
  });
  it("Should return NULL with no coordinates ", async () => {
    const info = await weatherClient.getWeather();
    expect(info).toBe(null);
  });
});
