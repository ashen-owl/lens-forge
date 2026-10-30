import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { screenState } from "./types";
import { fetchValues } from "./actions";

const initialState: screenState = {
  activeScreen: "lenses",
  valuesData: null,
  valuesDataLoader: false,
  valuesError: null,
  latestRequestId: 0,
};

export const screenSlice = createSlice({
  initialState,
  name: "screen",
  reducers: {
    setActiveScreen(state, { payload }: PayloadAction<null | string>) {
      state.activeScreen = payload ? payload : "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValues.pending, (state, action) => {
        state.valuesDataLoader = true;
        state.valuesError = null;
        state.latestRequestId = action.meta.arg.requestId;
      })
      .addCase(fetchValues.fulfilled, (state, action) => {
        if (action.meta.arg.requestId !== state.latestRequestId) return;

        state.valuesDataLoader = false;
        state.valuesData = action.payload;
        state.valuesError = null;
      })
      .addCase(fetchValues.rejected, (state, action) => {
        if (action.meta.arg.requestId !== state.latestRequestId) return;

        state.valuesDataLoader = false;
        state.valuesError =
          typeof action.payload === "string"
            ? action.payload
            : "Could not load lens prices.";
      });
  },
});

export const { setActiveScreen } = screenSlice.actions;

export const screenReducer = screenSlice.reducer;
