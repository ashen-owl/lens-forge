import { HistoryItem } from "../store/panels/types";
import { RequestValuesType } from "../api/types";

export type PrescriptionPayload = {
  values: { [key: string]: string };
  fileUrl: string;
  lensPower: number | null;
};

export type AddToCartPayload = {
  productId: string;
  values: RequestValuesType;
  totalPrice: number;
  prescription: PrescriptionPayload;
};

export type LensForgeEventName = "close" | "help" | "add-to-cart";

export const dispatchLensForgeEvent = <TDetail>(
  name: LensForgeEventName,
  detail?: TDetail
): void => {
  if (typeof document === "undefined") return;

  const container = document.getElementById("lensforge");
  if (!container) return;

  container.dispatchEvent(
    new CustomEvent(`lensforge:${name}`, {
      bubbles: true,
      detail,
    })
  );
};

export type { HistoryItem };
