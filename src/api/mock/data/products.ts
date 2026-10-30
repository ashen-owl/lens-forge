import { Product } from "../../types";

export const products: Product[] = [
  {
    id: "demo-frame",
    title: "Demo Frame",
    imageUrl: "demo/products/demo-frame.png",
    price: 300,
    currency: "USD",
  },
];

export const findProductById = (productId: string): Product | undefined =>
  products.find((product) => product.id === productId);
