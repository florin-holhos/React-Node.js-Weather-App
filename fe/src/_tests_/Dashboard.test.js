import React, { Component, createContext } from "react";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import Dashboard from "../components/pages/Dashboard/Dashboard";
import Adapter from "enzyme-adapter-react-16";
import LocationProvider from "../contexts/LocationContext";
import { LocationContext } from "../contexts/LocationContext";
import SmallWeatherbox from "../components/SmallWeatherBox/SmallWeatherBox";
Enzyme.configure({ adapter: new Adapter() });

describe("Dashboard", () => {
  let context = {
    locations: [
      {
        id: "ade628b5-fa95-4cbd-a2eb-5ab7b4d5a1fb",
        lat: -14.1,
        lon: -46.630001,
        name: "AAAA",
        weather: {
          forecast: [{}],

          today: {
            icon: "dg",
            dayOfWeek: "fgg",
            temperatureMin: 5,
            temperatureMax: 30,
            imgSrc: "/fggg",
            precipProbability: 2,
            windSpeed: 5
          }
        }
      }
    ],
    setActive: jest.fn(),
    updateLocations: jest.fn(),
    activeLocation: "",
    removeLocation: jest.fn(),
    loading: false
  };

  it("Should render correctly", () => {
    const wrapperL = mount(
      <LocationProvider>
        <Dashboard></Dashboard>
      </LocationProvider>
    );
    wrapperL.setState(context);

    const dash = wrapperL.find(".locDash");
    expect(dash.exists()).toBe(true);
  });

  it("Should update LocationProvider state when clicking on an item inside Dashboard", () => {
    const wrapperL = mount(
      <LocationProvider>
        <Dashboard></Dashboard>
      </LocationProvider>
    );
    wrapperL.setState(context);
    const button = wrapperL.find(".forecast-section").at(0);
    expect(context.loading).toBe(false);
    button.simulate("click");
    // context state should change after calling setActive method
    setTimeout(() => expect(context.loading).toBe(true), 0);
  });
});
