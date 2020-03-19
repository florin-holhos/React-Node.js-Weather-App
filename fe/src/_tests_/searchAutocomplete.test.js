import { searchAutocomplete } from "../services/searchAutocomplete";

describe("searchAutocomplete service", () => {
  it("should return an array with predictions based on the given argument", async () => {
    const argument = "Timi";
    const predictions = await searchAutocomplete(argument);
    expect(predictions.length > 0).toBe(true);
    expect(predictions.every(pred => pred.name.startsWith(argument))).toBe(
      true
    );
  });

  it("should return an empty array if no suggestions are available", async () => {
    const predictions = await searchAutocomplete("xyxyxyw");
    expect(predictions).toEqual([]);
  });
});
