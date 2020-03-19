const chai = require("chai");
const { expect } = chai;
const weatherService = require("../services/weatherService");
const Cache = require("../services/cacheService");

describe("WeatherService", () => {
  const test_location1 = {
    id: 1,
    lat: "45.759998",
    lon: "21.230000",
    name: "Timisoara, Romania"
  };

  const test_location2 = {
    id: 999,
    lat: "-999",
    lon: "-999",
    name: "Timisoara, Romania"
  };

  const cache = new Cache(120);

  // getWeather
  it("should return weather info for a given location", async () => {
    const weather = await weatherService.getWeather(test_location1);
    expect(weather).haveOwnProperty("today");
    expect(weather).haveOwnProperty("forecast");
  });

  //getWeather
  it("should return null if the given location is invalid", async () => {
    const weather = await weatherService.getWeather(test_location2);
    expect(weather).equals(null);
  });

  // remove items from cache
  after(() => cache.removeItems(1));
});
