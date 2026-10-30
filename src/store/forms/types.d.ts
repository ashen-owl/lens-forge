type prescriptionValuesType = {
  [key in string]: string;
};

export type formState = {
  lensPowerFormValues: number | null;
  prescriptionValues: prescriptionValuesType;
  uploadedRecipeUrl: string;
};
