import { useEffect, useState } from "react";
import { useScreenRedirect } from "../../helpers/useScreenRedirect";
import getPanelItemById from "../../config/panels/getPanelItem";
import { PanelItem } from "../../config/panels/panel";
import getScreenItemById from "../../config/screens/getScreenItem";
import { useDispatch, useSelector } from "../../store";
import {
 setActivePanel,
 setHistory,
 setLastChoosenColor,
 setLastChoosenPanel,
 setLastChoosenTintLevel,
 setLensUpgrades,
 setRedirectLink,
} from "../../store/panels";
import { panelsSelector } from "../../store/panels/selectors";
import { CheckboxesStore } from "../../store/panels/types";
import { setStepDisabledIndex } from "../../store/roadsteps";
import { activeStepSelector } from "../../store/roadsteps/selectors";
import { screensSelector } from "../../store/screens/selectors";
import { useRoadSteps } from "../Roadsteps/useRoadSteps";

export const useScreen = () => {
 const dispatch = useDispatch();
 const activeStepValue = useSelector(activeStepSelector);
 const { activeScreen } = useSelector(screensSelector);
 const {
  history,
  lastChoosenColor,
  activePanel,
  lensUpgrades,
  lastChoosenTintLevel,
 } = useSelector(panelsSelector);
 const { screenRedirect, setScreenIdForRedirect } = useScreenRedirect();
 const activeScreenInfo = getScreenItemById(activeScreen);
 const { skipStepsIndexes } = useRoadSteps();

 const [switchElementsValues, setSwitchElementsValues] =
  useState<CheckboxesStore>({});

 const isUpload =
  activeScreenInfo?.forms && activeScreenInfo?.forms === "uploadImageForm";

 const isLensPowerForms =
  activeScreenInfo?.forms && activeScreenInfo?.forms === "lensPowerForm";

 const isFillOnlinePrescriptionForm =
  activeScreenInfo?.forms && activeScreenInfo?.forms === "rxForm";

 const blueLightCoatingIncluded = history.some(
  (item) => item.panel === "transitionsType"
 );

 function updateStateAndStoreForCoatings<K extends keyof CheckboxesStore>(
  panelID: K,
  checked: CheckboxesStore[K]
 ) {
  setSwitchElementsValues((switchElementsValues) => ({
   ...switchElementsValues,
   [panelID]: checked,
  }));

  if (checked) {
   dispatch(setLensUpgrades([...lensUpgrades, panelID]));
  } else {
   const deleteUpgradesItem = lensUpgrades.filter((item) => item !== panelID);
   dispatch(setLensUpgrades(deleteUpgradesItem));
  }
 }

 function handleClickToSwitchPanel(
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  panelID: string
 ) {
  e.stopPropagation();
  const newSwitchCheckerValue = !switchElementsValues[panelID];
  updateStateAndStoreForCoatings(panelID, newSwitchCheckerValue);
 }

 function updateHistory(id: string) {
  dispatch(setLastChoosenPanel(id));
  dispatch(
   setHistory([
    ...history,
    {
     screen: activeScreenInfo?.id || "",
     panel:
      activeScreenInfo?.panels && !activeScreenInfo?.isCheckboxesScreen
       ? id
       : "",
     form: activeScreenInfo?.forms ? id : "",
     color: (getPanelItemById(id)?.colors && lastChoosenColor) || "",
     price: 0,
     checkboxes: activeScreenInfo?.isCheckboxesScreen ? lensUpgrades : [],
     tintLevel: getPanelItemById(id)?.tintLevel ? lastChoosenTintLevel : null,
    },
   ])
  );
 }

 function setFirstColor(colors: string[]) {
  dispatch(setLastChoosenColor(colors[0]));
 }

 const handlePanelToggle = (
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  panel: PanelItem
 ) => {
  const target = e.target as HTMLElement;
  const isCurrentElementColored = target.dataset.color === "true";
  const isParentElementColored = target.closest('[data-color="true"]') !== null;

  if (!panel.redirectTo) return;

  if (activeScreenInfo && activeScreenInfo.continueButtonEnabled) {
   dispatch(setRedirectLink(setScreenIdForRedirect(panel.redirectTo)));
   if (activePanel !== panel.id) {
    dispatch(setActivePanel(panel.id));

    if (!isCurrentElementColored && !isParentElementColored) {
     setFirstColor(panel.colors || []);
     if (panel.tintLevel) {
      dispatch(setLastChoosenTintLevel(80));
     }
    }
   } else if (activeScreenInfo.isCheckboxesScreen) {
    dispatch(setActivePanel(""));
   }
  } else {
   screenRedirect(setScreenIdForRedirect(panel.redirectTo));
   updateHistory(panel.id);
  }
 };

 useEffect(() => {
  if (
   blueLightCoatingIncluded &&
   !lensUpgrades.includes("blueLightBlockingLenses")
  ) {
   dispatch(setLensUpgrades([...lensUpgrades, "blueLightBlockingLenses"]));
  }
 }, [blueLightCoatingIncluded, dispatch, lensUpgrades]);

 useEffect(() => {
  if (activeScreen === "coating") {
   const panelRedirect = getPanelItemById(
    "blueLightBlockingLenses"
   )?.redirectTo;
   panelRedirect &&
    dispatch(setRedirectLink(setScreenIdForRedirect(panelRedirect)));
  }
 }, [activeScreen, dispatch, setScreenIdForRedirect]);

 useEffect(() => {
  const skipStepIndexes_ = skipStepsIndexes(history);
  dispatch(setStepDisabledIndex([...skipStepIndexes_]));
 }, [dispatch, history, skipStepsIndexes]);

 return {
  activeScreenInfo,
  isUpload,
  activeScreen,
  isLensPowerForms,
  isFillOnlinePrescriptionForm,
  activeStepValue,
  history,
  blueLightCoatingIncluded,
  switchElementsValues,
  updateHistory,
  handlePanelToggle,
  updateStateAndStoreForCoatings,
  handleClickToSwitchPanel,
  setSwitchElementsValues,
 };
};
