import { configureStore } from "@reduxjs/toolkit";
import {
  EqualityFn,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { roadStepsReducer } from "./roadsteps";
import { screenReducer } from "./screens";
import { panelReducer } from "./panels";
import { formsReducer } from "./forms";
import { productReducer } from "./product";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    roadSteps: roadStepsReducer,
    screens: screenReducer,
    panels: panelReducer,
    forms: formsReducer,
    product: productReducer,
  },
});

export type Store = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
type useSelectorT = <TState = RootState, Selected = unknown>(
  selector: (state: TState) => Selected,
  equalityFn?: EqualityFn<Selected> | undefined
) => Selected;
export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector: useSelectorT = useAppSelector;
