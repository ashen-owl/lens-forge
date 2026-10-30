import { stepsRoadItem } from "./stepsRoad";

const stepsRoadList: stepsRoadItem[] = [
  {
    name: "usage",
    includes: ["lenses"],
  },
  {
    name: "lens",
    includes: ["lensType", "transitionsType", "sunglassesType", "lensOptions"],
  },
  {
    name: "upgrades",
    includes: ["coating"],
  },
  {
    name: "prescription",
    includes: [
      "nearVisionOptions",
      "lensPowerForm",
      "addPrescription",
      "rxForm",
      "uploadImageForm",
    ],
  },
  {
    name: "finish",
    includes: ["finish"],
  },
];

export default stepsRoadList;
