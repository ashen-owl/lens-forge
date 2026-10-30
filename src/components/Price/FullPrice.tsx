import { useBackendResponseAnalyzer } from "../../helpers/useBackendResponseAnalyzer";
import { useSelector } from "../../store";
import getScreenItemById from "../../config/screens/getScreenItem";
import { screensSelector } from "../../store/screens/selectors";
import { productDataSelector } from "../../store/product/selectors";
import { formatPrice } from "../../helpers/formatPrice";

export const FullPrice = () => {
  const { data } = useBackendResponseAnalyzer();
  const { activeScreen } = useSelector(screensSelector);
  const product = useSelector(productDataSelector);
  const foundScreen = getScreenItemById(activeScreen);
  const currency = product?.currency ?? "USD";

  return (
    <div className="full-price">
      {foundScreen?.finishScreen ? <div>Total price</div> : <div>Total:</div>}

      <div>
        <span>{formatPrice(data?.total_price ?? 0, currency)}</span>
      </div>
    </div>
  );
};
