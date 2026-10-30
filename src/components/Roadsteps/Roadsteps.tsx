import { Steps } from "antd";
import { roadStepSelector } from "../../store/roadsteps/selectors";
import { useSelector } from "../../store";
import stepsRoadList from "../../config/stepsRoad/stepsRoadList";
import { panelsSelector } from "../../store/panels/selectors";
import { useScreenRedirect } from "../../helpers/useScreenRedirect";

export const Roadsteps = () => {
  const { backToPrevScreens } = useScreenRedirect();
  const { history } = useSelector(panelsSelector);

  const {
    activeStepNumber: activeStepInfo,
    stepDisabledIndexes: stepDisabledIndex_,
  } = useSelector(roadStepSelector);

  const handlerChangeSteps = (choosenStepNumber: number) => {
    if (choosenStepNumber >= activeStepInfo) return;
    const firstScreenInChoosenStep =
      stepsRoadList[choosenStepNumber].includes[0];
    const searchingScreenIndex = history.findIndex((item) => {
      return item.screen === firstScreenInChoosenStep;
    });

    backToPrevScreens(history.length - searchingScreenIndex);
  };

  const setDisabled = (index: number): boolean => {
    return stepDisabledIndex_.some((item) => item === index);
  };

  return (
    <>
      <Steps
        size="small"
        current={activeStepInfo}
        onChange={(current) => handlerChangeSteps(current)}
        items={stepsRoadList.map((step, index) => ({
          title: step.name,
          key: `${step.name}-steps-${index}`,
          disabled: setDisabled(index),
        }))}
      />
    </>
  );
};
