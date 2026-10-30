import { RootState } from "..";

export const productSelector = ({ product }: RootState) => product;
export const productDataSelector = ({ product }: RootState) => product.data;
export const productStatusSelector = ({ product }: RootState) => product.status;
export const productErrorSelector = ({ product }: RootState) => product.error;
