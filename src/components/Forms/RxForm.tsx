import { useEffect, useState } from "react";
import getFormItemById from "../../config/forms/getFormItem";
import { FormsItem } from "../../config/forms/forms";
import { Checkbox, Form as AntdForm, Modal, Select } from "antd";
import { Prism } from "../Modals/Prism";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { optionNameConverter } from "./helpers/optionNameConverter";
import { panelsSelector } from "../../store/panels/selectors";
import { useDispatch, useSelector } from "../../store";
import { formsSelector } from "../../store/forms/selectors";
import { useScreenRedirect } from "../../helpers/useScreenRedirect";
import { useScreen } from "../Screen/useScreen";
import { setPrescriptionValues } from "../../store/forms";

type initialStateStructure = {
 [key in string]: string;
};

const classicFields = ["SPH", "CYL", "AXI", "ADD"];
const sides = ["left", "right"];

const { Option } = Select;

const validationSchema = Yup.object().shape({
 AXI_left: Yup.string().test("custom-test", function (value, from) {
  const prev = from.parent.CYL_left;
  const prevCondition = !isNaN(Number(prev)) && Number(prev) !== 0;
  if (prevCondition && value === "None") {
   return this.createError({
    message: `Error`,
    path: this.path,
   });
  }
  return true;
 }),
 AXI_right: Yup.string().test("custom-test", function (value, from) {
  const prev = from.parent.CYL_right;
  const prevCondition = !isNaN(Number(prev)) && Number(prev) !== 0;
  if (prevCondition && value === "None") {
   return this.createError({
    message: `Error`,
    path: this.path,
   });
  }
  return true;
 }),
});

export const RxForm = () => {
 const rxForm = getFormItemById("rxForm") as FormsItem;
 const twoPD = getFormItemById("twoPD");
 const prismCheckbox = getFormItemById("includes_prism");
 const { screenRedirect } = useScreenRedirect();
 const { history } = useSelector(panelsSelector);
 const [showErrors, setShowErrors] = useState(false);
 const { prescriptionValues } = useSelector(formsSelector);
 const { updateHistory } = useScreen();
 const dispatch = useDispatch();

 const initialValues: initialStateStructure = {};

 rxForm.fields?.forEach((field) => {
  if (classicFields.includes(field.id)) {
   initialValues[`${field.id}_left`] = field.default[0];
   initialValues[`${field.id}_right`] = field.default[0];
  } else {
   initialValues[field.id] = field.default[0];
  }
 });

 const [PDSides, setPDSides] = useState<boolean>(false);

 const [isPrismModalOpen, setIsPrismModalOpen] = useState(false);
 const [isPrismCheckboxChecked, setIsPrismCheckboxChecked] = useState(false);

 const formik = useFormik({
  initialValues:
   Object.keys(prescriptionValues).length > 0
    ? prescriptionValues
    : initialValues,
  validationSchema,
  onSubmit: (values) => {},
 });

 const initilStateValues = Object.keys(initialValues);

 let formIsChanged = false;

 for (let key in initilStateValues) {
  const initialValue = initilStateValues[key];

  if (initialValues[initialValue] !== formik.values[initialValue]) {
   formIsChanged = true;
  }
 }

 function redirectToNextScreenByFormButton() {
  updateHistory(rxForm.id);
  rxForm?.redirectTo && screenRedirect(rxForm.redirectTo);
 }

 const config = {
  className: "lensforge-confirm",
  centered: true,
  content: "You have not provided a prescription. Proceed anyway?",
  onOk: () => {
   redirectToNextScreenByFormButton();
  },
 };

 const submitForm = () => {
  if (formik.isValid) {
   formik.submitForm();
   dispatch(setPrescriptionValues(formik.values));

   if (!formIsChanged) {
    Modal.confirm(config);
   } else {
    updateHistory(rxForm.id);
    rxForm?.redirectTo && screenRedirect(rxForm.redirectTo);
   }
  } else {
   setShowErrors(true);
  }
 };

 useEffect(() => {
  setShowErrors(false);
 }, [formik.values]);

 const handleCheckboxChange = (e: CheckboxChangeEvent) => {
  setIsPrismCheckboxChecked(e.target.checked);
  if (e.target.checked) {
   setIsPrismModalOpen(true);
  }
 };

 const closePrismModal: () => void = () => {
  setIsPrismModalOpen(false);
  setIsPrismCheckboxChecked(false);
 };

 const findDisabledForNearDPField = rxForm.fields?.find(
  (field) => field.id === "Near_PD"
 )?.disabledFor;

 const isDisplayNearPD = findDisabledForNearDPField?.some((item) =>
  history.some((historyItem) => {
   return item.fromID.includes(historyItem.panel);
  })
 );

 let fieldIndex = 0;

 const CustomSelect = (props: { id: string }) => {
  fieldIndex++;
  const { id } = props;
  const field = rxForm.fields?.find(({ id: id_ }) => id.includes(id_));
  const options = field?.options;
  let isDisabled = false;
  const isError = Object.keys(formik.errors).includes(id) && showErrors;

  const errorStyles = isError
   ? {
      border: "1px solid red",
     }
   : {};

  const side = sides.find((side) => id.includes(side));

  const CYL = Number(formik.values[`CYL_${side}`]);

  if (id.includes("AXI") && (isNaN(CYL) || CYL === 0)) {
   isDisabled = true;
  }

  return options ? (
   <AntdForm.Item key={`Form-Select-${fieldIndex}`} className="rx_form_cell">
    {(id === "pdLeft" || id === "pdRight") && (
     <span className={`label-${id}`}>{field.name}</span>
    )}

    <Select
     id={id}
     onChange={(value) => {
      formik.setFieldValue(id, value);
     }}
     style={{ ...errorStyles }}
     value={formik.values[id]}
     disabled={isDisabled}
    >
     {options.map((option, i) => (
      <Option key={`option-${id}-${option}-${i}`} value={option}>
       {optionNameConverter(option, id)}
      </Option>
     ))}
    </Select>
   </AntdForm.Item>
  ) : null;
 };

 return (
  <>
   {isPrismModalOpen && <Prism closeModal={closePrismModal} />}

   <AntdForm onFinish={formik.handleSubmit}>
    <div className="rx_form_table">
     <div className="rx_form_row header">
      <div className="rx_form_cell"></div>
      {classicFields.map((id) => {
       const field = rxForm.fields?.find(({ id: id_ }) => id.includes(id_));
       return <div className="rx_form_cell">{field?.name}</div>;
      })}
     </div>
     {sides.map((side, index) => {
      return (
       <div className="rx_form_row" key={`rx_form_row-side-${index}`}>
        <div className="rx_form_cell side_cell">
         {`${side.charAt(0).toUpperCase() + side.slice(1)} (${
          side === "left" ? "OS" : "OD"
         })`}
        </div>
        {Object.keys(formik.values)
         .filter(
          (id) =>
           classicFields.some((id_) => id.includes(id_)) && id.includes(side)
         )
         .map((id) => {
          return <CustomSelect id={id} />;
         })}
       </div>
      );
     })}
    </div>
    <div>
     {PDSides ? (
      <div className="rx_form_row">
       <span>PD</span>
       <CustomSelect id={"pdLeft"} />
       <CustomSelect id={"pdRight"} />
      </div>
     ) : (
      <div className="rx_form_row">
       <span>PD</span>
       <CustomSelect id={"PD"} />
      </div>
     )}
     {!isDisplayNearPD ? (
      <div>
       <span>Near PD</span>
       <CustomSelect id={"Near_PD"} />
      </div>
     ) : null}
    </div>
    {showErrors && (
     <div className="rx_form_errors">
      <span style={{ color: "red" }}>Please fill out the missing fields.</span>
     </div>
    )}
    {twoPD && (
     <Checkbox
      onChange={() => {
       setPDSides((s) => !s);
      }}
      checked={PDSides}
     >
      {twoPD.label}
     </Checkbox>
    )}
    {prismCheckbox && (
     <Checkbox checked={isPrismCheckboxChecked} onChange={handleCheckboxChange}>
      {prismCheckbox.label}
     </Checkbox>
    )}
    <div className="rx_form_buttons">
     <div>
      <button className="button submit-button" onClick={() => submitForm()}>
       Continue
      </button>
     </div>
     <div>
      <button
       className="button button-sec send-later-button"
       onClick={() => redirectToNextScreenByFormButton()}
      >
       Send Later
      </button>
     </div>
    </div>
   </AntdForm>
  </>
 );
};
