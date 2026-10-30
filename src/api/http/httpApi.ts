import axios from "axios";
import {
  DTOType,
  LensSelectorApi,
  Product,
  RequestValuesType,
  UploadPrescriptionResult,
} from "../types";
import { apiBaseUrl, getUploadToken } from "../config";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: "application/json",
  },
});

const getProduct = async (productId: string): Promise<Product> => {
  const response = await apiClient.get<Product>(
    `/products/${encodeURIComponent(productId)}`
  );
  return response.data;
};

const getValues = async (
  productId: string,
  values: RequestValuesType
): Promise<DTOType> => {
  const body = new URLSearchParams({
    values: JSON.stringify(values),
    product_id: productId,
  });

  const response = await apiClient.post<DTOType>("/lens-values", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });

  return response.data;
};

const uploadPrescription = async (
  file: File
): Promise<UploadPrescriptionResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const token = getUploadToken();
  if (token) {
    formData.append("token", token);
  }

  const response = await apiClient.post<{
    success: boolean | string;
    fileUrl?: string;
    file?: string;
    filename?: string;
  }>("/prescriptions", formData);

  const data = response.data;
  const fileUrl = data.fileUrl ?? data.file ?? "";

  return {
    success: Boolean(data.success),
    fileUrl,
    filename: data.filename ?? file.name,
  };
};

export const httpApi: LensSelectorApi = {
  getProduct,
  getValues,
  uploadPrescription,
};
