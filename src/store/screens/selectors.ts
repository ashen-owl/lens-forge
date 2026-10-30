import { RootState } from "..";

export const screensSelector = ({ screens }: RootState) => screens;

export const activeScreenSelector = ({ screens }: RootState) =>
  screens.activeScreen;

export const valuesDataSelector = ({ screens }: RootState) => screens.valuesData;

export const valuesDataLoaderSelector = ({ screens }: RootState) =>
  screens.valuesDataLoader;

export const valuesErrorSelector = ({ screens }: RootState) =>
  screens.valuesError;
