import { useCallback, useRef } from "react";
import {
  DataScreenType,
  DTOType,
  PanelPriceType,
  RequestValuesType,
} from "../api/types";
import { useDispatch, useSelector } from "../store";
import {
  valuesDataLoaderSelector,
  valuesDataSelector,
  valuesErrorSelector,
} from "../store/screens/selectors";
import { productDataSelector } from "../store/product/selectors";
import { useCreateRequestJson } from "./useCreateRequestJson";
import { useFindBackEndIdByFrontendId } from "../config/associationsBetweenBEandFE/useFindBackEndIdByFrontendId";
import { associationsPanels } from "../config/associationsBetweenBEandFE/associationsPanels";
import { fetchValues } from "../store/screens/actions";

export const useBackendResponseAnalyzer = () => {
  const dispatch = useDispatch();
  const product = useSelector(productDataSelector);
  const { createRequestJson } = useCreateRequestJson();
  const { findItemById } = useFindBackEndIdByFrontendId();
  const loading = useSelector(valuesDataLoaderSelector);
  const data = useSelector(valuesDataSelector);
  const error = useSelector(valuesErrorSelector);

  const requestIdRef = useRef(0);

  const getBackendData = useCallback(
    (values?: RequestValuesType) => {
      if (!product) return;

      requestIdRef.current += 1;
      dispatch(
        fetchValues({
          productId: product.id,
          values: values ?? createRequestJson(),
          requestId: requestIdRef.current,
        })
      );
    },
    [dispatch, product, createRequestJson]
  );

  const findKeyInObjectIteratively = (
    list: DataScreenType | PanelPriceType,
    value: string
  ): number | null => {
    const stack = [{ list, depth: 0 }];

    while (stack.length > 0) {
      const { list: currentObj, depth } = stack.pop() as {
        list: DataScreenType;
        depth: number;
      };

      if (depth > 4) continue;

      for (const key in currentObj) {
        if (key === value) {
          const valueParams = currentObj[key] as PanelPriceType;
          return valueParams.minTotalPrice ?? valueParams.price;
        }

        if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
          stack.push({
            list: currentObj[key] as DataScreenType,
            depth: depth + 1,
          });
        }
      }
    }

    return null;
  };

  const findPanelPriceFromData = (
    data: DTOType | null,
    panelId: string
  ): number | null => {
    if (!data) return null;

    const panelBEId = findItemById(panelId, associationsPanels);
    const price = findKeyInObjectIteratively(data.data, panelBEId);

    return price !== 0 ? price : null;
  };

  return {
    getBackendData,
    loading,
    data,
    error,
    findPanelPriceFromData,
  };
};
