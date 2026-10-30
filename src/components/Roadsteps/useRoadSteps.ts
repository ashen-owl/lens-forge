import { useCallback } from "react";
import stepsRoadList from "../../config/stepsRoad/stepsRoadList";
import getPanelItemById from "../../config/panels/getPanelItem";
import { HistoryItem } from "../../store/panels/types";

export const useRoadSteps = () => {
  const skipStepsIndexes = useCallback((history: HistoryItem[]) => {
    return history.flatMap((item) => {
      const skipListForPanelID = getPanelItemById(item.panel)?.skipSteps;
      const arrayOfDisabledStepIndexes: number[] = [];

      if (skipListForPanelID === undefined) return [];

      stepsRoadList.forEach((stepRoadItem, index) => {
        const stepRoadItemName = stepRoadItem.name;
        skipListForPanelID.forEach((roadName) => {
          if (stepRoadItemName.includes(roadName)) {
            arrayOfDisabledStepIndexes.push(index);
          }
        });
      });

      return arrayOfDisabledStepIndexes;
    });
  }, []);

  return { skipStepsIndexes };
};
