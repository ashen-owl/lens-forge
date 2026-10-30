import { RootState } from "..";

export const roadStepSelector = ({ roadSteps }: RootState) => roadSteps;

export const activeStepSelector = ({ roadSteps }: RootState) =>
  roadSteps.activeStepNumber;

export const stepDisabledIndexesSelector = ({ roadSteps }: RootState) =>
  roadSteps.stepDisabledIndexes;
