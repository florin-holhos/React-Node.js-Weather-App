const chai = require("chai");
const { expect } = chai;
const WeatherClient = require("../services/weatherClient");

describe("WeatherClient", () => {
  const weatherClient = new WeatherClient();

  // getWeather
  it("should return an array with 5 elements for some given coordinates", async () => {
    const weather = await weatherClient.getWeather("45.759998", "21.230000");
    expect(weather).haveOwnProperty("length");
    expect(weather.length).equals(5);
  });

  // getWeather
  it("should return null if the given coo", async () => {
    const weather = await weatherClient.getWeather("-999", "-999");
    expect(weather).equals(null);
  });
});
