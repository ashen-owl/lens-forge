import { useCallback } from "react";
import { useDispatch } from "../../store";
import { setLensPowerFormValues } from "../../store/forms";
import { setActivePanel, setRedirectLink } from "../../store/panels";

export const useForms = () => {
  const dispatch = useDispatch();

  const addFormsParamsToHistory = useCallback(
    (id: string, redirectTo: string, value: number | boolean) => {
      dispatch(setRedirectLink(redirectTo));
      dispatch(setActivePanel(id));

      switch (id) {
        case "lensPowerForm":
          dispatch(
            setLensPowerFormValues(typeof value === "number" ? value : null)
          );
          break;
        default:
          break;
      }
    },
    [dispatch]
  );

  return { addFormsParamsToHistory };
};
