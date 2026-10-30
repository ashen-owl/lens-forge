import { optionCreatorByStep } from "./optionsCreatorByStep";
import { optionsSorter } from "./optionsSorter";

describe("optionCreatorByStep", () => {
  it("creates inclusive steps", () => {
    expect(optionCreatorByStep(0.5, 1.5, 0.5)).toEqual(["0.5", "1", "1.5"]);
  });

  it("does not overshoot the maximum", () => {
    expect(optionCreatorByStep(1, 2, 0.3)).toEqual([
      "1",
      "1.3",
      "1.6",
      "1.9",
    ]);
  });
});

describe("optionsSorter", () => {
  it("puts positive values in ascending order", () => {
    expect(optionsSorter(["2", "0.5", "1.25"])).toEqual(["0.5", "1.25", "2"]);
  });

  it("keeps non-numeric values grouped at the start", () => {
    const sorted = optionsSorter(["1", "None", "0.5", "DS"]);

    expect(sorted.slice(2)).toEqual(["0.5", "1"]);
    expect(sorted).toEqual(expect.arrayContaining(["None", "DS"]));
  });

  it("keeps negative values in ascending order", () => {
    expect(optionsSorter(["-1", "-2", "0.5"])).toEqual(["-2", "-1", "0.5"]);
  });
});
