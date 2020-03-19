const chai = require("chai");
const Cache = require("../services/cacheService");

const { expect } = chai;

describe("cacheService", () => {
  let cache;

  it("should create a new instance of Cache", () => {
    cache = new Cache(120); // 2 minutes
    expect(cache instanceof Cache).equals(true);
  });

  // setItems
  it("should store some given items", async () => {
    // items are not stored yet
    expect(await cache.getItems("test")).equals(null);
    // store items
    cache.setItems("test", { test_item: "test..." });
    // verify if items are stored
    expect(await cache.getItems("test")).equals(
      JSON.stringify({ test_item: "test..." })
    );
  });

  //getItems
  it("should return stored items for a given key if the items exist || otherwise null", async () => {
    expect(await cache.getItems("test")).equals(
      JSON.stringify({ test_item: "test..." })
    );
    expect(await cache.getItems("test12312312321")).equals(null);
  });

  // removeItems
  it("should remove items for a given key", async () => {
    // check if items are there
    expect(await cache.getItems("test")).equals(
      JSON.stringify({ test_item: "test..." })
    );
    // remove items
    cache.removeItems("test");
    // items should be removed
    expect(await cache.getItems("test")).equals(null);
  });
});
