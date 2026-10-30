import { ArrowIcon } from "../../../share/icons/ArrowIcon";
import { dispatchLensForgeEvent } from "../../../helpers/hostEvents";

export const BackToFrame = () => {
 return (
  <div className="lensforge__backFrame">
   <button
    id="back-to-frame"
    className="lensforge__back lensforge__prev"
    onClick={() => dispatchLensForgeEvent("close")}
   >
    <ArrowIcon />
    Back to frame
   </button>
  </div>
 );
};
