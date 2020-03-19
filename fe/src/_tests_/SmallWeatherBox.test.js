import React from "react";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallWeatherbox from "../components/SmallWeatherBox/SmallWeatherBox";
Enzyme.configure({ adapter: new Adapter() });

describe("SmallWeatherBox", () => {
  let props;
  beforeEach(() => {
    props = {
      icon:
        "https://assets.pernod-ricard.com/nz/media_images/test.jpg?hUV74FvXQrWUBk1P2.fBvzoBUmjZ1wct",
      temperatureMin: 15,
      temperatureMax: 30,
      windSpeed: 80,
      precipProbability: 0.8,
      dayOfWeek: "Monday",
      redirect: jest.fn()
    };
  });

  it("Should render correctly", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    expect(wrapper.exists()).toBe(true);
  });
  it("Should call the function on click", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    const button = wrapper.find(".forecast-section").at(0);
    button.simulate("click");
    expect(props.redirect).toBeCalledTimes(1);
  });
  it("Should recieve dayOfWeek", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    const dayName = wrapper.find(".day");
    expect(dayName.text()).toBe("Monday");
  });
  it("Should display dayOfWeek", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    const dayName = wrapper.find(".day");
    expect(dayName.length).toBe(1);
  });
  it("Should recieve minMax", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    const minMax = wrapper.find(".temperatureLimits");
    expect(minMax.text()).toBe("15°C / 30°C");
  });
  it("Should display minMax", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    const minMax = wrapper.find(".temperatureLimits");
    expect(minMax.length).toBe(1);
  });
  it("Should recieve wind", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    const wind = wrapper.find(".wind");
    expect(wind.text()).toBe("80%");
  });
  it("Should display wind", () => {
    const wrapper = shallow(<SmallWeatherbox {...props}></SmallWeatherbox>);
    const wind = wrapper.find(".wind");
    expect(wind.length).toBe(1);
  });
});
