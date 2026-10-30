export type Product = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  specialPrice?: number;
  currency: string;
};

export type UploadPrescriptionResult = {
  success: boolean;
  fileUrl: string;
  filename: string;
};

export type PanelPriceType = {
  price: number;
  minTotalPrice?: number;
  selected?: true;
};

export type DataScreenType = {
  [key in string]: DataScreenType | PanelPriceType;
};

export type DTOType = {
  status: string;
  data: DataScreenType;
  product_price: number;
  lens_price: number;
  cart_calculated_data: {
    options: {
      [key in string]: {
        [key in string]: number;
      };
    };
    total_price: number;
  };
  total_price: number;
  time: number;
  rxType?: string;
};

export type RequestValuesType = {
  [key in string]:
    | string
    | string[]
    | {
        [key in string]: string;
      };
};

export interface LensSelectorApi {
  getProduct(productId: string): Promise<Product>;
  getValues(productId: string, values: RequestValuesType): Promise<DTOType>;
  uploadPrescription(file: File): Promise<UploadPrescriptionResult>;
}
