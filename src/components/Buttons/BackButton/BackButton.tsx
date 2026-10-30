import { useScreenRedirect } from "../../../helpers/useScreenRedirect";
import { ArrowIcon } from "../../../share/icons/ArrowIcon";

export const BackButton = () => {
  const { backToPrevScreens } = useScreenRedirect();

  return (
    <div className="lensforge__prev-wrapp">
      <button
        className="lensforge__back lensforge__prev"
        onClick={() => {
          backToPrevScreens(1);
        }}
      >
        <ArrowIcon />
        Back
      </button>
    </div>
  );
};
