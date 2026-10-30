import { useScreenRedirect } from "../../../helpers/useScreenRedirect";
import getScreenItemById from "../../../config/screens/getScreenItem";
import { useDispatch, useSelector } from "../../../store";
import { setActivePanel } from "../../../store/panels";
import { panelsSelector } from "../../../store/panels/selectors";
import { screensSelector } from "../../../store/screens/selectors";
import { useScreen } from "../../Screen/useScreen";

export const ContinueButton = () => {
  const dispatch = useDispatch();
  const { screenRedirect } = useScreenRedirect();
  const { updateHistory } = useScreen();
  const { activeScreen } = useSelector(screensSelector);
  const { redirectLink, activePanel } = useSelector(panelsSelector);

  const isDisabled = () => {
    let isDisabled_: boolean = false;
    if (
      getScreenItemById(activeScreen)?.isCheckboxesScreen !== undefined ||
      activeScreen === "lensPowerForm"
    ) {
      isDisabled_ = false;
      return isDisabled_;
    }
    if (activePanel === "") {
      isDisabled_ = true;
      return isDisabled_;
    }
  };

  return (
    <button
      className="button lensforge__next"
      disabled={isDisabled()}
      onClick={() => {
        screenRedirect(redirectLink);
        updateHistory(activePanel);
        dispatch(setActivePanel(""));
      }}
    >
      Next
    </button>
  );
};
