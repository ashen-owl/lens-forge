import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryItem, panelState } from "./types";

const initialState: panelState = {
  lastChoosenPanel: "",
  activePanel: "",
  history: [],
  lastChoosenColor: "",
  lastChoosenTintLevel: null,
  lensUpgrades: [],
  redirectLink: "",
};

export const panelSlice = createSlice({
  initialState,
  name: "panel",
  reducers: {
    setLastChoosenPanel(state, { payload }: PayloadAction<null | string>) {
      state.lastChoosenPanel = payload ? payload : "";
    },

    setActivePanel(state, { payload }: PayloadAction<null | string>) {
      state.activePanel = payload ? payload : "";
    },

    setHistory(state, { payload }: PayloadAction<null | HistoryItem[]>) {
      if (payload) {
        state.history = payload;
      }
    },

    setLastChoosenColor(state, { payload }: PayloadAction<string>) {
      state.lastChoosenColor = payload;
    },

    setLastChoosenTintLevel(state, { payload }: PayloadAction<number | null>) {
      state.lastChoosenTintLevel = payload;
    },

    setLensUpgrades(state, { payload }: PayloadAction<string[]>) {
      if (payload) {
        state.lensUpgrades = payload;
      }
    },

    setRedirectLink(state, { payload }: PayloadAction<null | string>) {
      state.redirectLink = payload ? payload : "";
    },
  },
});

export const {
  setLastChoosenPanel,
  setHistory,
  setLastChoosenColor,
  setLastChoosenTintLevel,
  setLensUpgrades,
  setRedirectLink,
  setActivePanel,
} = panelSlice.actions;

export const panelReducer = panelSlice.reducer;
