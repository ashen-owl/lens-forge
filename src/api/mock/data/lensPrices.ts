export type PriceGroup =
  | "purpose"
  | "type"
  | "options"
  | "upgrades"
  | "extras";

export const lensPrices: Record<PriceGroup, Record<string, number>> = {
  purpose: {
    nonPrescription: 0,
    singleVisionDistance: 49,
    singleVisionReading: 49,
    singleVisionWork: 49,
    progressivetrivexLens: 149,
  },
  type: {
    clearLenses: 0,
    tintedSunglassLensesSolid: 39,
    tintedSunglassLensesPolarized: 79,
    tintedSunglassLensesPolarizedMirror: 99,
    transitionsLensesSignatureGen8: 99,
    transitionsLensesXTractive: 129,
    transitionsLensesDriveWear: 149,
    transitionsLensesXTractivePolarized: 159,
  },
  options: {
    cr39Lens: 0,
    polycarbonateLens: 39,
    trivexLens: 49,
    highIndex167Lens: 79,
    highIndex174Lens: 129,
  },
  upgrades: {
    scratchResistantCoating: 15,
    hydrophobicCoating: 19,
    antiReflectiveCoating: 25,
    blueLightBlockingLenses: 29,
  },
  extras: {
    prism: 30,
  },
};

export const getLensPrice = (group: PriceGroup, id: string): number =>
  lensPrices[group][id] ?? 0;
