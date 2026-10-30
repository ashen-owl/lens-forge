import { DisabledItem } from "../config/panels/panel";
import { HistoryItem } from "../store/panels/types";

export const useChecker = () => {
  function checkerHistory(fromIdList: string[], history: HistoryItem[]) {
    return history.every((historyItem) =>
      fromIdList.includes(historyItem.panel)
    );
  }

  function containsElements(fromIdList: string[], history: HistoryItem[]) {
    return history.filter((historyItem) =>
      fromIdList.includes(historyItem.panel)
    );
  }

  const disablePanelChecker = (
    disabledForList: DisabledItem[] | undefined,
    history: HistoryItem[]
  ) => {
    if (!disabledForList) return false;

    return history.some((item) =>
      disabledForList[0].fromID[0].includes(item.panel)
    );
  };

  const disableColorForPanelChecker = () => false;

  return {
    checkerHistory,
    containsElements,
    disablePanelChecker,
    disableColorForPanelChecker,
  };
};
