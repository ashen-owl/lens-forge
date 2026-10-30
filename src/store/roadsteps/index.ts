import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { roadStepsState } from "./types";

const initialState: roadStepsState = {
  activeStepNumber: 0,
  stepDisabledIndexes: [],
};

export const roadStepsSlice = createSlice({
  initialState,
  name: "roadsteps",
  reducers: {
    setActiveStep(state, { payload }: PayloadAction<number>) {
      state.activeStepNumber = payload;
    },
    setStepDisabledIndex(state, { payload }: PayloadAction<number[]>) {
      state.stepDisabledIndexes = payload;
    },
  },
});

export const { setActiveStep, setStepDisabledIndex } = roadStepsSlice.actions;

export const roadStepsReducer = roadStepsSlice.reducer;
