import React from "react";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import ForecastSection from "../components/ForecastSection/ForecastSection";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("ForecastSection", () => {
  let props;
  beforeEach(() => {
    props = {
      activeLocation: {
        weather: {
          forecast: [
            {
              icon:
                "https://assets.pernod-ricard.com/nz/media_images/test.jpg?hUV74FvXQrWUBk1P2.fBvzoBUmjZ1wct",
              temperatureMin: 15,
              temperatureMax: 30,
              windSpeed: 80,
              precipProbability: 0.8,
              dayOfWeek: "Monday",
              redirect: jest.fn()
            }
          ],
          today: {}
        }
      }
    };
  });
  it("Should render correctly", () => {
    const wrapper = shallow(<ForecastSection {...props}></ForecastSection>);
    expect(wrapper.exists()).toBe(true);
  });
});
