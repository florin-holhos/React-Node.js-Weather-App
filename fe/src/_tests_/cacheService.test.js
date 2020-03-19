import Cache from "../services/cacheService";

describe("Cache service", () => {
  let cache = new Cache(sessionStorage, 5000); // 5000 seconds

  beforeAll(() => {
    // new Cache
    cache.setItems("test_item", { test_item: 1 });
  });

  it("should create a new Cache instance", () => {
    expect(cache instanceof Cache).toBe(true);
  });

  // setItems
  it("should store some given items adding them an expiration time", () => {
    expect(cache.getItems("test_item").test_item).toBe(1);
    expect(cache.getItems("test_item").hasOwnProperty("expTime")).toBe(true);
  });

  // getItems
  it("should retrieve cached items for a given key if items exists", () => {
    expect(cache.getItems("test_item")).not.toBe(null);
  });

  // getItems
  it("should remove items from storage and return null if threshold expired", () => {
    cache = new Cache(sessionStorage, 0);
    cache.setItems("new_item", { test: 1 });
    cache.getItems("new_item"); // will remove the items
    // execute when the execution stack is empty
    expect(cache.getItems("new_item")).toBe(null);
  });

  // removeItems
  it("should remove cached items for a given key", () => {
    // items are there
    expect(cache.getItems("test_item")).not.toBe(null);
    cache.removeItems("test_item");
    // items are removed...
    expect(cache.getItems("test_item")).toBe(null);
  });
});
