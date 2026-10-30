import { useChecker } from "../../helpers/useChecker";
import getColorItemById from "../../config/colors/getColorItem";
import { useDispatch, useSelector } from "../../store";
import { setLastChoosenColor } from "../../store/panels";
import { lastChoosenColorSelector } from "../../store/panels/selectors";
import getPanelItemById from "../../config/panels/getPanelItem";
import { TintLevel } from "../TintLevel/TintLevel";

type propsItem = {
  colorList: string[];
  isActivePanel?: boolean;
  panelID: string;
};

export const Colors = (props: propsItem) => {
  const { colorList, isActivePanel, panelID } = props;
  const dispatch = useDispatch();
  const { disableColorForPanelChecker } = useChecker();
  const currentColor_ = useSelector(lastChoosenColorSelector);
  const panel = getPanelItemById(panelID);

  function setCurrentColorHandler(id: string) {
    dispatch(setLastChoosenColor(id));
  }

  return (
    <div className="colors_wrapper">
      {colorList.map((color, index) => {
        const colorItemValue = getColorItemById(color);

        if (disableColorForPanelChecker() || colorItemValue === undefined) {
          return null;
        }

        const { id, value, title } = colorItemValue;
        const isActiveColor = currentColor_ === id && isActivePanel;

        return (
          <div
            className="color_picker"
            id={colorItemValue.id}
            data-index={index}
            data-color={true}
            data-active={isActiveColor}
            key={`color-picker-${colorItemValue.title}-${index}`}
            onClick={() => {
              setCurrentColorHandler(id);
            }}
          >
            <div className="color_icon">
              <div style={{ background: value }}></div>
            </div>
            <span className="radio-button-title">{title}</span>
          </div>
        );
      })}
      {panel?.tintLevel && isActivePanel && <TintLevel />}
    </div>
  );
};
