

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  createDate: Date;
  available: boolean;
  categoryName: string,
  categoryPhoto: string,
  inventoryId: number;
  inventoryQuantity: number;
  inventoryCreateDate: Date;

}
