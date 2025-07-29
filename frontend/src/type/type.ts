export type Product = {
  id: number;
  name: string;
  price: number;
};
export type ProductDisplayType = Product & {
  stock: number;
};
