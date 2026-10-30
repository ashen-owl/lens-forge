import { FormsItem } from "./forms";
import { optionCreatorByStep } from "./helpers/optionsCreatorByStep";
import { optionsSorter } from "./helpers/optionsSorter";
export const formsList: FormsItem[] = [
  {
    type: "checkbox",
    id: "includes_prism",
    label: "My prescription includes prism",
  },
  {
    type: "checkbox",
    id: "twoPD",
    label: "I have 2 PD numbers",
  },
  {
    type: "checkbox",
    id: "save_prescription",
    label: "Save my prescription",
  },
  {
    type: "uploadImageForm",
    id: "uploadImageForm",
    label: "Drag and drop file or click to upload (Max Size 5MB)",
    redirectTo: "finish",
  },
  {
    type: "lensPowerForm",
    id: "lensPowerForm",
    label:
      "Our high-quality Readers are ready-made glasses with an equal magnification power in both lenses.",
    redirectTo: "finish",
    options: optionCreatorByStep(0.25, 4.0, 0.25),
  },
  {
    type: "rxForm",
    id: "rxForm",
    redirectTo: "finish",
    fields: [
      {
        name: "Sphere (SPH)",
        id: "SPH",
        options: optionsSorter([
          "00 plano",
          "None",
          "SPH",
          "DS",
          "Balance",
          ...optionCreatorByStep(-14, 9, 0.25),
        ]),
        default: ["None"],
      },
      {
        name: "Cylinder (CYL)",
        id: "CYL",
        options: optionsSorter([
          "00 plano",
          "None",
          "SPH",
          "DS",
          "Balance",
          ...optionCreatorByStep(-5, 5, 0.25),
        ]),
        default: ["None"],
      },
      {
        name: "Axis (AXI)",
        id: "AXI",
        options: ["None", ...optionCreatorByStep(1, 180, 1)],
        default: ["None"],
      },
      {
        name: "Add",
        id: "ADD",
        disabledFor: [{ fromID: ["distanceVision"] }],
        options: ["None", ...optionCreatorByStep(0.75, 3.5, 0.25)],
        default: ["None"],
      },
      {
        name: "PD",
        id: "PD",
        options: ["None", ...optionCreatorByStep(40, 80, 1)],
        default: ["62"],
      },
      {
        name: "Left",
        id: "pdLeft",
        options: ["None", ...optionCreatorByStep(20, 40, 0.5)],
        default: ["35.5"],
      },
      {
        name: "Right",
        id: "pdRight",
        options: ["None", ...optionCreatorByStep(20, 40, 0.5)],
        default: ["35.5"],
      },
      {
        name: "Near(PD)",
        id: "Near_PD",
        disabledFor: [{ fromID: ["distanceVision"] }],
        options: ["None", ...optionCreatorByStep(40, 70, 1)],
        default: ["None"],
      },
    ],
  },
];
