import { useCallback } from "react";
import getPanelItemById from "../config/panels/getPanelItem";
import { RedirectToItem } from "../config/panels/panel";
import stepsRoadList from "../config/stepsRoad/stepsRoadList";
import { useDispatch, useSelector } from "../store";
import {
  setLensPowerFormValues,
  setPrescriptionValues,
  setUploadedRecipeUrl,
} from "../store/forms";
import {
  setActivePanel,
  setHistory,
  setLastChoosenColor,
  setLastChoosenPanel,
  setLastChoosenTintLevel,
  setLensUpgrades,
  setRedirectLink,
} from "../store/panels";
import { historySelector } from "../store/panels/selectors";
import { HistoryItem } from "../store/panels/types";
import { setActiveStep } from "../store/roadsteps";
import { setActiveScreen } from "../store/screens";

export function useScreenRedirect() {
  const dispatch = useDispatch();
  const history_ = useSelector(historySelector);

  const setScreenIdForRedirect = useCallback(
    (panel_redirectTo: string | RedirectToItem[]) => {
      if (typeof panel_redirectTo === "string") {
        return panel_redirectTo;
      }

      const chosenPanelFromFirstScreen = history_[0]?.panel;

      const nextScreenIDAfterCoatingScreen = panel_redirectTo.filter((obj) =>
        obj.fromScreen.find((id) => id === chosenPanelFromFirstScreen)
      )[0]?.toScreen;

      return nextScreenIDAfterCoatingScreen || "finish";
    },
    [history_]
  );

  const screenRedirect = useCallback(
    (screenID: string) => {
      dispatch(setActiveScreen(screenID));

      const indexStep = stepsRoadList.findIndex((step) =>
        step.includes.includes(screenID)
      );
      dispatch(setActiveStep(indexStep));
    },
    [dispatch]
  );

  const resetStates = useCallback(
    (history: HistoryItem[]) => {
      if (history.length === 0) {
        dispatch(setLastChoosenPanel(""));
      }
      if (!history.find((el) => el.screen === "lensType")) {
        dispatch(setLastChoosenColor(""));
        dispatch(setLastChoosenTintLevel(null));
      }
      if (!history.find((el) => el.screen === "lensOptions")) {
        dispatch(setLensUpgrades([]));
      }
      if (!history.find((el) => el.screen === "addPrescription")) {
        dispatch(setPrescriptionValues({}));
        dispatch(setUploadedRecipeUrl(""));
      }
      if (!history.find((el) => el.screen === "nearVisionOptions")) {
        dispatch(setLensPowerFormValues(null));
      }
    },
    [dispatch]
  );

  const backToPrevScreens = useCallback(
    (num: number) => {
      const history = [...history_];
      const lastHistoryItem = history[history.length - num];
      if (!lastHistoryItem) return;

      const prevScreenID = lastHistoryItem.screen;
      history.length = history.length - num;
      const lastHistoryItemRedirectTo = getPanelItemById(
        lastHistoryItem.panel
      )?.redirectTo;
      const redirectLink_ = setScreenIdForRedirect(
        lastHistoryItemRedirectTo || ""
      );

      resetStates(history);
      dispatch(setActivePanel(lastHistoryItem.panel));
      dispatch(setRedirectLink(redirectLink_));
      dispatch(setHistory([...history]));
      screenRedirect(prevScreenID);
    },
    [
      dispatch,
      history_,
      resetStates,
      screenRedirect,
      setScreenIdForRedirect,
    ]
  );

  return { setScreenIdForRedirect, screenRedirect, backToPrevScreens };
}
