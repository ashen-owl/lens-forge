export type CheckboxesStore = {
  [key in string]: boolean;
};

export type HistoryItem = {
  screen: string;
  panel: string;
  form: string;
  color?: string;
  tintType?: string;
  tintLevel?: number | null;
  price?: number;
  checkboxes?: string[];
  lensPowerFormValues?: number | null;
  prescriptionValues?: prescriptionValuesType | null;
};
export type panelState = {
  lastChoosenPanel: string;
  activePanel: string;
  history: HistoryItem[];
  lastChoosenColor: string;
  lastChoosenTintLevel: number | null;
  lensUpgrades: string[];
  redirectLink: string;
};
