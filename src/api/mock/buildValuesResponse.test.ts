import { buildValuesResponse } from "./buildValuesResponse";
import { products } from "./data/products";
import { Product, RequestValuesType } from "../types";
import fixture from "./fixtures/valuesResponse.example.json";

const product = products[0];
const defaultValues: RequestValuesType = {
  prescriptionType: "nonPrescription",
  type: "clearLenses",
  options: "cr39Lens",
  arCoating: "noAR",
  upgrades: [""],
};

describe("buildValuesResponse", () => {
  it("matches the documented default response", () => {
    const response = buildValuesResponse(
      product,
      defaultValues,
      1761696000 * 1000
    );

    expect(response).toEqual(fixture);
  });

  it("returns $300 for the default configuration", () => {
    const response = buildValuesResponse(product, defaultValues);

    expect(response.product_price).toBe(300);
    expect(response.lens_price).toBe(0);
    expect(response.total_price).toBe(300);
  });

  it("returns $417 for distance vision with polycarbonate and blue light", () => {
    const response = buildValuesResponse(product, {
      prescriptionType: "prescription",
      purpose: "singleVisionDistance",
      type: "clearLenses",
      options: "polycarbonateLens",
      rxType: "provideItLater",
      upgrades: ["blueLightBlockingLenses"],
    });

    expect(response.lens_price).toBe(49 + 39 + 29);
    expect(response.total_price).toBe(417);
    expect(response.cart_calculated_data.total_price).toBe(417);
  });

  it("prices the selected coatings", () => {
    const response = buildValuesResponse(product, {
      ...defaultValues,
      upgrades: [
        "scratchResistantCoating",
        "hydrophobicCoating",
        "antiReflectiveCoating",
      ],
    });

    expect(response.lens_price).toBe(15 + 19 + 25);
    expect(response.total_price).toBe(359);
  });

  it("keeps the prism price in extras", () => {
    const response = buildValuesResponse(product, defaultValues);
    const extras = response.data.extras as {
      prism: { price: number };
    };

    expect(extras.prism.price).toBe(30);
  });

  it("uses specialPrice when the product has one", () => {
    const discounted: Product = { ...product, specialPrice: 250 };
    const response = buildValuesResponse(discounted, defaultValues);

    expect(response.product_price).toBe(250);
    expect(response.total_price).toBe(250);
  });

  it("returns rxType provideItLater for a prescription without rxValues", () => {
    const response = buildValuesResponse(product, {
      prescriptionType: "prescription",
      purpose: "singleVisionDistance",
      type: "clearLenses",
      options: "cr39Lens",
      upgrades: [""],
    });

    expect(response.rxType).toBe("provideItLater");
  });
});
