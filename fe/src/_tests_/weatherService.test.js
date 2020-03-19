import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WeatherClient from "../services/weatherClient";
import WeatherService from "../services/weatherService";

Enzyme.configure({ adapter: new Adapter() });

describe("weatherService", () => {
  const weatherService = new WeatherService();

  const test_loc = {
    id: "8da20a29-196d-4d02-9798-fdc39d5f2738",
    lat: "-14.050000",
    lon: "-75.260002",
    name: "Ccaccamarca, Peru"
  };

  const mockgetWeather = jest.fn((lat, lon) => {
    if (!lat || !lon) return null;
    return ["current_day_Weather", 1, 2, 3, 4, 5];
  });

  // getWeather
  it("should return an object with informations about weather", async () => {
    WeatherClient.prototype.getWeather = mockgetWeather;
    const weather = await weatherService.getWeather(test_loc);
    expect(typeof weather === "object" && weather !== null).toBe(true);
  });

  //getWeatherForeach
  it("should return an array with the resolved values", async () => {
    const array = await weatherService.getWeatherForeach([test_loc]);
    expect(Array.prototype.isPrototypeOf(array)).toBe(true);
    expect(array.length > 0).toBe(true);
  });

  //getWeather
  it("should return null when called with wrong arguments", async () => {
    weatherService.removeWeather(test_loc.id);
    test_loc.lat = null;
    test_loc.lon = null;
    const weather = await weatherService.getWeather(test_loc);
    expect(weather).toBe(null);
  });

  // removeWeather
  it("should remove items from sessionStorage when called", async () => {
    const spyremoveWeather = jest.spyOn(weatherService, "removeWeather");
    // store some items for test
    sessionStorage.setItem(test_loc.id, test_loc);
    // items are there
    expect(sessionStorage.getItem(test_loc.id)).not.toBe(null);
    weatherService.removeWeather(test_loc.id);
    // items are removed
    expect(spyremoveWeather).toBeCalledTimes(1);
    expect(sessionStorage.getItem(test_loc.id)).toBe(null);
  });
});
