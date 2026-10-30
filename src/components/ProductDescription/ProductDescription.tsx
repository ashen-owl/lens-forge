import { LensColorFilter } from "../Colors/LensColorFilter";
import { useSelector } from "../../store";
import { screensSelector } from "../../store/screens/selectors";
import getScreenItemById from "../../config/screens/getScreenItem";
import {
  activePanelSelector,
  panelsSelector,
} from "../../store/panels/selectors";
import getPanelItemById from "../../config/panels/getPanelItem";
import getColorItemById from "../../config/colors/getColorItem";
import { FullPrice } from "../Price/FullPrice";
import { BackToFrame } from "../Buttons/BackButton/BackToFrame";
import { productDataSelector } from "../../store/product/selectors";
import { assetUrl } from "../../api/config";

export const ProductDescription = () => {
  const { activeScreen } = useSelector(screensSelector);
  const foundScreen = getScreenItemById(activeScreen);
  const product = useSelector(productDataSelector);

  const activePanel_ = useSelector(activePanelSelector);
  const foundPanel =
    activePanel_.length > 0 ? getPanelItemById(activePanel_) : undefined;

  const { history } = useSelector(panelsSelector);

  const historyHasChosenColor = history.find((item) => {
    return item.color?.length;
  });

  function renderChosenColorLabel() {
    const chosenColorID = historyHasChosenColor?.color;
    if (chosenColorID === undefined) return;

    return (
      <div className="product_choosen-color">
        <div
          className="product_choosen-color-icon"
          style={{
            background: getColorItemById(chosenColorID)?.value || "transparent",
          }}
        ></div>
        <div className="product_choosen-color-title">
          <span>Lens color:</span>
          <p>{getColorItemById(chosenColorID)?.title}</p>
        </div>
      </div>
    );
  }

  const lensColorFilterIsEnabled_ =
    foundScreen?.lensColorFilterIsEnabled && foundPanel?.lensColorFilterIsEnabled;

  return (
    <div className="lensforge_image">
      <BackToFrame />
      {lensColorFilterIsEnabled_ ? (
        <LensColorFilter />
      ) : (
        <div className="product_information">
          <div className="product_image" id="product_image">
            <img
              src={product ? assetUrl(product.imageUrl) : undefined}
              alt={product?.title}
            />
            {historyHasChosenColor !== undefined && renderChosenColorLabel()}
          </div>
          <div id="product_title">{product?.title}</div>
        </div>
      )}
      {activeScreen !== "finish" && <FullPrice />}
    </div>
  );
};
