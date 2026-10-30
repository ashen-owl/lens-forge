import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, CheckboxProps, message, Upload, UploadProps } from "antd";
import { useState } from "react";
import { api } from "../../api";
import { useScreenRedirect } from "../../helpers/useScreenRedirect";
import getFormItemById from "../../config/forms/getFormItem";
import { useDispatch } from "../../store";
import { setUploadedRecipeUrl } from "../../store/forms";
import { useScreen } from "./useScreen";

export const UploadPrescriptionPhotoScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { updateHistory } = useScreen();
  const { screenRedirect } = useScreenRedirect();
  const prismCheckbox = getFormItemById("includes_prism");
  const uploadPhotoForm = getFormItemById("uploadImageForm");

  const props: UploadProps = {
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);

      try {
        const response = await api.uploadPrescription(file as File);

        if (response.success) {
          message.success("Uploaded successfully");
          dispatch(setUploadedRecipeUrl(response.fileUrl));
          onSuccess?.(response);
        } else {
          message.error("Upload failed");
          onError?.(new Error("Upload failed"));
        }
      } catch (error) {
        message.error(
          error instanceof Error ? error.message : "Upload failed"
        );
        onError?.(error instanceof Error ? error : new Error("Upload failed"));
      } finally {
        setLoading(false);
      }
    },
  };

  const redirectToNextScreenByFormButton = () => {
    if (uploadPhotoForm) {
      updateHistory(uploadPhotoForm.id);
      uploadPhotoForm.redirectTo && screenRedirect(uploadPhotoForm.redirectTo);
    }
  };

  const onChange: CheckboxProps["onChange"] = () => {};

  return (
    <>
      <Upload.Dragger {...props}>
        <p className="ant-upload-drag-icon">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </p>
        <p className="ant-upload-text">Drag and drop file or click to upload</p>
        <p className="ant-upload-hint">(Max Size 5MB)</p>
      </Upload.Dragger>
      {prismCheckbox && (
        <Checkbox onChange={onChange}>{prismCheckbox.label}</Checkbox>
      )}
      <div className="rx_form_buttons">
        <div>
          <button
            className="button submit-button"
            onClick={redirectToNextScreenByFormButton}
          >
            Continue
          </button>
        </div>
        <div>
          <button
            className="button button-sec send-later-button"
            onClick={redirectToNextScreenByFormButton}
          >
            Send Later
          </button>
        </div>
      </div>
    </>
  );
};
