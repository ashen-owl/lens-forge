import { RootState } from "..";

export const formsSelector = ({ forms }: RootState) => forms;

export const lensPowerFormValuesSelector = ({ forms }: RootState) =>
  forms.lensPowerFormValues;
export const prescriptionValuesSelector = ({ forms }: RootState) =>
  forms.prescriptionValues;
