import Storage from "../services/storageService";

describe("Storage service", () => {
  it("should create a new Storage instance", () => {
    const storage = new Storage(localStorage);
    expect(storage instanceof Storage).toBe(true);
  });

  it("should store the given items in the selected storage", () => {
    // test items
    const items = { item1: 1, item2: 2 };
    // localStorage
    let storage = new Storage(localStorage);
    storage.setItems("items", items);
    expect(storage.getItems("items")).toStrictEqual(items);
    // sessionStorage
    storage = new Storage(sessionStorage);
    storage.setItems("items", items);
    expect(storage.getItems("items")).toStrictEqual(items);
  });

  it("should return null when trying to parse modified items", () => {
    localStorage.setItem("test-item", "[");
    expect(new Storage().getItems("test-item")).toBe(null);
  });

  it("should remove items with a given key", () => {
    let storage = new Storage(localStorage);
    const items = { item1: 1, item2: 2 };
    storage.setItems("items", items);
    // items are there
    expect(storage.getItems("items")).toStrictEqual(items);
    storage.removeItems("items");
    // items are removed
    expect(storage.getItems("items")).toStrictEqual(null);
  });

  it("should create a default localStorage instance when called without arguments", () => {
    const storage = new Storage();
    // test
    storage.setItems("test-items", 1);
    expect(localStorage.getItem("test-items")).toBe("1");
  });
});
