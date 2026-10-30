import { Button } from "antd";
import { FormsItem } from "../../config/forms/forms";
import getFormItemById from "../../config/forms/getFormItem";
import { useForms } from "./useForms";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { formsSelector } from "../../store/forms/selectors";
import { setPrescriptionValues } from "../../store/forms";

export const LensPowerForm = () => {
  const dispatch = useDispatch();
  const form = getFormItemById("lensPowerForm") as FormsItem;
  const { addFormsParamsToHistory } = useForms();
  const { lensPowerFormValues } = useSelector(formsSelector);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const setParamsForLensPowerForm = useCallback(
    (index: number, value: number) => {
      setActiveIndex(index);
      addFormsParamsToHistory("lensPowerForm", "finish", value);
      dispatch(
        setPrescriptionValues({
          SPH_left: `${value}`,
          SPH_right: `${value}`,
          CYL_left: "None",
          CYL_right: "None",
          AXI_left: "None",
          AXI_right: "None",
          ADD_left: "None",
          ADD_right: "None",
          PD: "62",
        })
      );
    },
    [addFormsParamsToHistory, dispatch]
  );

  useEffect(() => {
    if (lensPowerFormValues === null) {
      setParamsForLensPowerForm(
        0,
        form.options ? Number(form.options[0]) : 0.25
      );
    } else {
      if (form.options) {
        const foundIndex = form.options.findIndex(
          (number) => Number(number) === lensPowerFormValues
        );
        setParamsForLensPowerForm(foundIndex, lensPowerFormValues);
      }
    }
  }, [form.options, lensPowerFormValues, setParamsForLensPowerForm]);

  return (
    <>
      <p className="screen_description">{form.label}</p>

      {form?.options && (
        <div className="lens-power-form">
          {form.options.map((value, index) => {
            return (
              <Button
                key={`lens-power-option-${value}-index${index}`}
                className={activeIndex === index ? "active" : ""}
                onClick={() => {
                  setParamsForLensPowerForm(index, Number(value));
                }}
              >
                {Number.isInteger(value) ? `+${value}.00` : `+${value}`}
              </Button>
            );
          })}
        </div>
      )}
    </>
  );
};
