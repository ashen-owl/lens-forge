import {
  Product,
  RequestValuesType,
  DTOType,
  DataScreenType,
  PanelPriceType,
} from "../types";
import { getLensPrice, lensPrices, PriceGroup } from "./data/lensPrices";

const asString = (value: RequestValuesType[string] | undefined): string =>
  typeof value === "string" ? value : "";

const asStringArray = (
  value: RequestValuesType[string] | undefined
): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const buildPriceGroup = (
  group: PriceGroup,
  selectedId: string
): DataScreenType =>
  Object.fromEntries(
    Object.entries(lensPrices[group]).map(([id, price]) => [
      id,
      {
        price,
        ...(id === selectedId ? { selected: true as const } : {}),
      },
    ])
  );

const resolvePurpose = (values: RequestValuesType): string => {
  const purpose = asString(values.purpose);

  if (purpose) {
    return purpose;
  }

  if (asString(values.prescriptionType) === "nonPrescription") {
    return "nonPrescription";
  }

  return "singleVisionDistance";
};

const resolveType = (values: RequestValuesType): string => {
  const type = asString(values.type) || "clearLenses";
  return type.split(".")[0];
};

const resolveLensOption = (values: RequestValuesType): string =>
  asString(values.options) || "cr39Lens";

export const buildValuesResponse = (
  product: Product,
  values: RequestValuesType,
  now: number = Date.now()
): DTOType => {
  const purpose = resolvePurpose(values);
  const type = resolveType(values);
  const lensOption = resolveLensOption(values);
  const upgrades = asStringArray(values.upgrades).filter(Boolean);

  const productPrice = product.specialPrice ?? product.price;
  const lensPrice =
    getLensPrice("purpose", purpose) +
    getLensPrice("type", type) +
    getLensPrice("options", lensOption) +
    upgrades.reduce((sum, id) => sum + getLensPrice("upgrades", id), 0);

  const totalPrice = productPrice + lensPrice;

  const cartOptions: Record<string, Record<string, number>> = {
    type: { [type]: getLensPrice("type", type) },
    options: { [lensOption]: getLensPrice("options", lensOption) },
  };

  if (getLensPrice("purpose", purpose) > 0) {
    cartOptions.purpose = {
      [purpose]: getLensPrice("purpose", purpose),
    };
  }

  if (upgrades.length > 0) {
    cartOptions.upgrades = Object.fromEntries(
      upgrades.map((id) => [id, getLensPrice("upgrades", id)])
    );
  }

  const data: DataScreenType = {
    purpose: buildPriceGroup("purpose", purpose),
    type: buildPriceGroup("type", type),
    options: buildPriceGroup("options", lensOption),
    sunglassLenses: { minTotalPrice: 39 } as PanelPriceType,
    upgrades: buildPriceGroup("upgrades", ""),
    extras: buildPriceGroup("extras", ""),
  };

  const response: DTOType = {
    status: "success",
    time: Math.floor(now / 1000),
    product_price: productPrice,
    lens_price: lensPrice,
    total_price: totalPrice,
    data,
    cart_calculated_data: {
      options: cartOptions,
      total_price: totalPrice,
    },
  };

  if (
    asString(values.prescriptionType) !== "nonPrescription" &&
    !values.rxValues
  ) {
    response.rxType = "provideItLater";
  }

  return response;
};
