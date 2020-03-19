import React from "react";
import Enzyme, { shallow } from "enzyme";
import WeatherBox from "../components/WeatherBox/weatherbox";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("WeatherBox", () => {
  let props;

  beforeEach(() => {
    props = {
      removeLocation: jest.fn(),
      activeLocation: {
        weather: {
          today: {
            summary: "Test text",
            temperatureMin: 15,
            temperatureMax: 30,
            imgSrc:
              "https://assets.pernod-ricard.com/nz/media_images/test.jpg?hUV74FvXQrWUBk1P2.fBvzoBUmjZ1wct",
            humidity: 80,
            windSpeed: 80,
            precipProbability: 80,
            pressure: 40
          }
        }
      }
    };
  });

  it("Should render correctly with props", () => {
    const wrapper = shallow(<WeatherBox {...props}></WeatherBox>);
    expect(wrapper.exists()).toBe(true);
  });
  it("Content should not exist if no props are passed", () => {
    const wrapper = shallow(<WeatherBox></WeatherBox>);
    expect(wrapper.children().length).toBe(0);
  });
  it("Should call the function on click", () => {
    const wrapper = shallow(<WeatherBox {...props} />);
    const button = wrapper.find(".removeButton");
    button.simulate("click");
    expect(props.removeLocation).toBeCalledTimes(1);
  });

  it("Should recieve correct value", () => {
    const wrapper = shallow(<WeatherBox {...props} />);
    const summary = wrapper.find(".description");
    expect(summary.text()).toBe("Test text");
  });
  it("Description and temperature should be visible", () => {
    const wrapper = shallow(<WeatherBox {...props}></WeatherBox>);
    expect(wrapper.find(".description").at(0).length).toBe(1);
    expect(wrapper.find(".minMax").at(0).length).toBe(1);
  });
  it("Humidity,wind speed, precipitation and pressure should be visible", () => {
    const wrapper = shallow(<WeatherBox {...props}></WeatherBox>);
    expect(wrapper.find(".bottom-up").at(0).length).toBe(1);
  });
});
