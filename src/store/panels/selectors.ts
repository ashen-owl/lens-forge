import { RootState } from "..";

export const panelsSelector = ({ panels }: RootState) => panels;

export const lastChoosenPanelSelector = ({ panels }: RootState) =>
  panels.lastChoosenPanel;
export const historySelector = ({ panels }: RootState) => panels.history;
export const lastChoosenColorSelector = ({ panels }: RootState) =>
  panels.lastChoosenColor;
export const lastChoosenTintLevelSelector = ({ panels }: RootState) =>
  panels.lastChoosenTintLevel;
export const lensUpgradesSelector = ({ panels }: RootState) =>
  panels.lensUpgrades;
export const redirectLinkSelector = ({ panels }: RootState) =>
  panels.redirectLink;
export const activePanelSelector = ({ panels }: RootState) =>
  panels.activePanel;
