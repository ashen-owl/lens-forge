import { buildRequestValues } from "./useCreateRequestJson";
import { findItemById } from "../config/associationsBetweenBEandFE/useFindBackEndIdByFrontendId";
import { HistoryItem } from "../store/panels/types";

const baseHistory: HistoryItem[] = [
  {
    screen: "lenses",
    panel: "distanceVision",
    form: "",
    price: 0,
  },
  {
    screen: "lensType",
    panel: "clear",
    form: "",
    price: 0,
  },
  {
    screen: "lensOptions",
    panel: "polycarbonateLens",
    form: "",
    price: 0,
  },
  {
    screen: "coating",
    panel: "",
    form: "",
    checkboxes: ["blueLightBlockingLenses", "scratchResistantCoating"],
    price: 0,
  },
];

describe("buildRequestValues", () => {
  it("maps frontend panel ids to backend ids", () => {
    const values = buildRequestValues(baseHistory, {}, findItemById);

    expect(values.purpose).toBe("singleVisionDistance");
    expect(values.type).toBe("clearLenses");
    expect(values.options).toBe("polycarbonateLens");
    expect(values.upgrades).toEqual([
      "blueLightBlockingLenses",
      "scratchResistantCoating",
    ]);
  });

  it("builds the sunglasses type with color and tint level", () => {
    const values = buildRequestValues(
      [
        ...baseHistory.slice(0, 2),
        {
          screen: "sunglassesType",
          panel: "polarized",
          form: "",
          color: "grey_tint",
          tintLevel: 80,
          price: 0,
        },
      ],
      {},
      findItemById
    );

    expect(values.type).toBe("tintedSunglassLensesPolarized.grey.tintLevel3");
  });

  it("adds rxValues when the prescription form is filled", () => {
    const values = buildRequestValues(
      [
        ...baseHistory,
        {
          screen: "rxForm",
          panel: "rxForm",
          form: "rxForm",
          price: 0,
        },
      ],
      { SPH_left: "-1.25", SPH_right: "-1.5" },
      findItemById
    );

    expect(values.rxValues).toEqual({
      SPH_left: "-1.25",
      SPH_right: "-1.5",
    });
  });

  it("falls back to provideItLater without a filled prescription", () => {
    const values = buildRequestValues(
      [
        ...baseHistory,
        {
          screen: "addPrescription",
          panel: "sendLater",
          form: "",
          price: 0,
        },
      ],
      {},
      findItemById
    );

    expect(values.rxType).toBe("provideItLater");
  });

  it("starts with nonPrescription defaults for an empty history", () => {
    const values = buildRequestValues([], {}, findItemById);

    expect(values.prescriptionType).toBe("nonPrescription");
    expect(values.type).toBe("clearLenses");
    expect(values.options).toBe("cr39Lens");
  });
});
