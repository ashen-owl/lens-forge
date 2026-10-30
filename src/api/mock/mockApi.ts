import {
  DTOType,
  LensSelectorApi,
  Product,
  RequestValuesType,
  UploadPrescriptionResult,
} from "../types";
import { buildValuesResponse } from "./buildValuesResponse";
import { findProductById } from "./data/products";

const MIN_DELAY = 300;
const MAX_DELAY = 500;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/png",
];
const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "gif", "png"];

const delay = () =>
  new Promise<void>((resolve) => {
    const timeout = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
    setTimeout(resolve, timeout);
  });

const getProduct = async (productId: string): Promise<Product> => {
  await delay();

  const product = findProductById(productId);

  if (!product) {
    throw new Error(`Product "${productId}" was not found`);
  }

  return product;
};

const getValues = async (
  productId: string,
  values: RequestValuesType
): Promise<DTOType> => {
  await delay();

  const product = findProductById(productId);

  if (!product) {
    throw new Error(`Product "${productId}" was not found`);
  }

  return buildValuesResponse(product, values);
};

const validatePrescriptionFile = (file: File): void => {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (
    !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) &&
    !ALLOWED_EXTENSIONS.includes(extension)
  ) {
    throw new Error(
      "Unsupported file format. Upload a PDF, JPG, GIF, PNG or JPEG file."
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("The prescription file must be 5 MB or smaller.");
  }
};

const uploadPrescription = async (
  file: File
): Promise<UploadPrescriptionResult> => {
  await delay();
  validatePrescriptionFile(file);

  const fileUrl =
    typeof URL !== "undefined" && typeof URL.createObjectURL === "function"
      ? URL.createObjectURL(file)
      : "";

  return {
    success: true,
    fileUrl,
    filename: file.name,
  };
};

export const mockApi: LensSelectorApi = {
  getProduct,
  getValues,
  uploadPrescription,
};
