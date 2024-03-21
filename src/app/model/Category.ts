import { Product } from "./Product";

export interface Category {
  id: string;
  name: string;
  photo: string;
  products: Product[];

}
