import generateUUID from "../services/uuidModule";

describe("generateUUID service", () => {
  it("should generate a random and unique uuid of type string", () => {
    // check type
    expect(typeof generateUUID() === "string").toBe(true);
    // check uniqueness
    expect(generateUUID()).not.toEqual(generateUUID());
  });
});
