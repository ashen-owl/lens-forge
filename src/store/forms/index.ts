import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formState, prescriptionValuesType } from "./types";

const initialState: formState = {
  lensPowerFormValues: null,
  prescriptionValues: {},
  uploadedRecipeUrl: "",
};

export const formsSlice = createSlice({
  initialState,
  name: "form",
  reducers: {
    setLensPowerFormValues(state, { payload }: PayloadAction<number | null>) {
      state.lensPowerFormValues = payload ? payload : null;
    },
    setPrescriptionValues(
      state,
      { payload }: PayloadAction<prescriptionValuesType>
    ) {
      state.prescriptionValues = payload;
    },
    setUploadedRecipeUrl(state, { payload }: PayloadAction<string>) {
      state.uploadedRecipeUrl = payload;
    },
  },
});

export const {
  setLensPowerFormValues,
  setPrescriptionValues,
  setUploadedRecipeUrl,
} = formsSlice.actions;

export const formsReducer = formsSlice.reducer;
