import { Card, Popover } from "antd";
import getColorItemById from "../../config/colors/getColorItem";
import { FormsItem } from "../../config/forms/forms";
import getFormItemById from "../../config/forms/getFormItem";
import getPanelItemById from "../../config/panels/getPanelItem";
import getScreenItemById from "../../config/screens/getScreenItem";
import { useSelector } from "../../store";
import { formsSelector } from "../../store/forms/selectors";
import { historySelector } from "../../store/panels/selectors";
import { HistoryItem } from "../../store/panels/types";
import { FullPrice } from "../Price/FullPrice";
import { useBackendResponseAnalyzer } from "../../helpers/useBackendResponseAnalyzer";
import { productDataSelector } from "../../store/product/selectors";
import { formatPrice } from "../../helpers/formatPrice";
import { useCreateRequestJson } from "../../helpers/useCreateRequestJson";
import {
  AddToCartPayload,
  dispatchLensForgeEvent,
} from "../../helpers/hostEvents";

const classicFields = ["SPH", "CYL", "AXI", "ADD"];
const sides = ["left", "right"];

export const FinishScreen = () => {
  const history_ = useSelector(historySelector);
  const product = useSelector(productDataSelector);
  const { prescriptionValues, uploadedRecipeUrl, lensPowerFormValues } =
    useSelector(formsSelector);
  const rxForm = getFormItemById("rxForm") as FormsItem;
  const { data, loading } = useBackendResponseAnalyzer();
  const { createRequestJson } = useCreateRequestJson();
  const currency = product?.currency ?? "USD";

  const formSendLaterContent = (
    <div>
      Whenever it suits you, send your prescription later. Write to
      support@example.com if you need help with your order.
    </div>
  );

  const rxFormContent =
    Object.keys(prescriptionValues).length > 0 ? (
      <>
        <div className="rx_form_table">
          <div className="rx_form_row header">
            <div className="rx_form_cell"></div>
            {classicFields.map((id) => {
              const field = rxForm.fields?.find(({ id: id_ }) => id.includes(id_));
              return (
                <div className="rx_form_cell" key={`rx-header-${id}`}>
                  {field?.name}
                </div>
              );
            })}
          </div>
          {sides.map((side) => {
            return (
              <div className="rx_form_row" key={`rx-row-${side}`}>
                <div className="rx_form_cell side_cell">
                  {`${side.charAt(0).toUpperCase() + side.slice(1)} (${
                    side === "left" ? "OS" : "OD"
                  })`}
                </div>
                {Object.keys(prescriptionValues)
                  .filter(
                    (id) =>
                      classicFields.some((id_) => id.includes(id_)) &&
                      id.includes(side)
                  )
                  .map((id) => {
                    return (
                      <div className="rx_form_cell" key={`rx-cell-${id}`}>
                        {prescriptionValues[id]}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </>
    ) : (
      formSendLaterContent
    );

  function showFormContent() {
    const findForm = history_.filter((item) => item.form !== "");
    const formID = findForm.length > 0 ? findForm[0].form : "sendLater";

    switch (formID) {
      case "lensPowerForm":
        return (
          <div className="panel-finish_popover">
            <Popover content={rxFormContent}>(View Prescription)</Popover>
          </div>
        );
      case "rxForm":
        return (
          <div className="panel-finish_popover">
            {Object.keys(prescriptionValues).length > 0 ? (
              <Popover content={rxFormContent}>(View Prescription)</Popover>
            ) : (
              <Popover content={formSendLaterContent}>
                (Send Prescription Later)
              </Popover>
            )}
          </div>
        );
      case "uploadImageForm":
        return (
          <div className="panel-finish_popover">
            {uploadedRecipeUrl.length > 0 ? (
              <a target="_blank" href={uploadedRecipeUrl} rel="noreferrer">
                (View Prescription)
              </a>
            ) : (
              <Popover content={formSendLaterContent}>
                (Send Prescription Later)
              </Popover>
            )}
          </div>
        );
      case "sendLater":
        return (
          <div className="panel-finish_popover">
            <Popover content={formSendLaterContent}>
              (Send Prescription Later)
            </Popover>
          </div>
        );
      default:
        return <></>;
    }
  }

  function showPanelContent(historyItem: HistoryItem) {
    switch (historyItem.screen) {
      case "coating":
        return (
          <div
            key={`panel-finish-list-${historyItem.screen}-${historyItem.panel}-panel`}
            className="panel-finish_option"
          >
            {historyItem.checkboxes
              ?.map((item) => getPanelItemById(item)?.title)
              .filter(Boolean)
              .join(", ")}
          </div>
        );
      default:
        return (
          <div
            key={`panel-finish-list-${historyItem.screen}-${historyItem.panel}-panel`}
            className="panel-finish_option"
          >
            {`${getPanelItemById(historyItem.panel)?.title || ""}${
              historyItem.color
                ? ` ${getColorItemById(historyItem.color)?.title}` || ""
                : ""
            }${historyItem.tintLevel ? ` Tint Level ${historyItem.tintLevel}%` : ""}`}
          </div>
        );
    }
  }

  const addToCart = () => {
    const payload: AddToCartPayload = {
      productId: product?.id ?? "",
      values: createRequestJson(),
      totalPrice: data?.total_price ?? 0,
      prescription: {
        values: prescriptionValues,
        fileUrl: uploadedRecipeUrl,
        lensPower: lensPowerFormValues,
      },
    };

    dispatchLensForgeEvent("add-to-cart", payload);
  };

  const framePrice = product ? product.specialPrice ?? product.price : 0;

  return (
    <>
      <Card>
        <div className="panel-finish panel-finish__frame">
          <h4>Frame:</h4>
          <div className="panel-finish__product">
            <div id="product_title_finish">{product?.title}</div>
            <div>{formatPrice(framePrice, currency)}</div>
          </div>
        </div>
        <div className="panel-finish_table">
          {history_.map((item, index) => (
            <div
              key={`panel-finish-${item.panel}-${index}`}
              className="panel-finish_step"
            >
              <div key={`panel-finish-${item.screen}-${item.panel}-screen`}>
                {getScreenItemById(item.screen)?.name}
              </div>
              {(item.screen === "addPrescription" ||
                item.screen === "lensPowerForm") &&
                showFormContent()}
              {getScreenItemById(item.screen)?.name && showPanelContent(item)}
            </div>
          ))}
        </div>
        <FullPrice />
      </Card>
      <button
        className="button"
        onClick={addToCart}
        disabled={loading || !data}
      >
        {loading ? "Updating price…" : "Add To Cart"}
      </button>
    </>
  );
};
