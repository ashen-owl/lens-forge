import { useCallback } from "react";
import { RequestValuesType } from "../api/types";
import { associationsPanels } from "../config/associationsBetweenBEandFE/associationsPanels";
import { associationsScreen } from "../config/associationsBetweenBEandFE/associationsScreen";
import { useFindBackEndIdByFrontendId } from "../config/associationsBetweenBEandFE/useFindBackEndIdByFrontendId";
import { useSelector } from "../store";
import { formsSelector } from "../store/forms/selectors";
import { panelsSelector } from "../store/panels/selectors";
import { activeScreenSelector } from "../store/screens/selectors";
import { HistoryItem } from "../store/panels/types";
import { AssociationsBetweenBEandFEType } from "../config/associationsBetweenBEandFE/types";

type PrescriptionValues = { [key in string]: string };
type FindItemById = (
  id: string,
  list: AssociationsBetweenBEandFEType
) => string;

const prescriptionCase: RequestValuesType = {
  prescriptionType: "prescription",
  purpose: "distanceVisionDistance",
  type: "clearLenses",
  options: "cr39Lens",
  arCoating: "noAR",
  rxType: "provideItLater",
  upgrades: [""],
};

const nonPrescriptionCase: RequestValuesType = {
  prescriptionType: "nonPrescription",
  type: "clearLenses",
  options: "cr39Lens",
  arCoating: "noAR",
  upgrades: [""],
};

const convertTintValue = (
  tintLevel: number | null | undefined
): string | null => {
  if (tintLevel === null || tintLevel === undefined) return null;
  if (tintLevel === 80) return "tintLevel3";
  if (tintLevel === 50) return "tintLevel2";
  if (tintLevel === 30) return "tintLevel1";
  return null;
};

export const buildRequestValues = (
  history: HistoryItem[],
  prescriptionValues: PrescriptionValues,
  findItemById: FindItemById
): RequestValuesType => {
  if (history.length === 0) {
    return { ...nonPrescriptionCase };
  }

  let values: RequestValuesType = {};

  history.forEach((item, index) => {
    if (index === 0) {
      values =
        item.panel === "nonPrescription"
          ? { ...nonPrescriptionCase }
          : { ...prescriptionCase };
    }

    const screen = findItemById(item.screen, associationsScreen);
    const panel = findItemById(item.panel, associationsPanels);

    if (index === 0 && panel !== "nonPrescription") {
      values.purpose = panel;
      return;
    }

    if (Object.keys(prescriptionCase).includes(screen)) {
      values[screen] = panel || "";
    }

    if (screen === "upgrades") {
      const upgradesValues = history.find(
        (historyItem) => historyItem.screen === "coating"
      )?.checkboxes;

      values.upgrades = upgradesValues ?? [""];
    }

    if (screen === "type") {
      values.type = "clearLenses";
    }

    if (item.screen === "sunglassesType" || item.screen === "transitionsType") {
      const tint = convertTintValue(item.tintLevel);
      values.type = `${panel}.${item.color?.split("_")[0] || ""}${
        tint !== null ? `.${tint}` : ""
      }`;
    }

    if (screen === "rxForm" || screen === "lensPowerForm") {
      if (Object.keys(prescriptionValues).length > 0) {
        values.rxValues = prescriptionValues;
      } else {
        values.rxType = "provideItLater";
      }
    }
  });

  return values;
};

export const useCreateRequestJson = () => {
  const { history, lensUpgrades } = useSelector(panelsSelector);
  const { prescriptionValues } = useSelector(formsSelector);
  const activeScreen = useSelector(activeScreenSelector);
  const { findItemById } = useFindBackEndIdByFrontendId();

  const createRequestJson = useCallback((): RequestValuesType => {
    const values = buildRequestValues(
      history,
      prescriptionValues,
      findItemById
    );
    const coatingIsRelevant =
      activeScreen === "coating" ||
      history.some((item) => item.screen === "coating");

    if (coatingIsRelevant) {
      values.upgrades = lensUpgrades;
    }

    return values;
  }, [
    activeScreen,
    findItemById,
    history,
    lensUpgrades,
    prescriptionValues,
  ]);

  return { createRequestJson };
};
