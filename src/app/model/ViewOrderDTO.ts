import { OrderDetailDTO } from "./OrderDetailDTO";

export interface ViewOrderDTO {

  id: number;
  createDate: Date;
  orderDetailDTOs: OrderDetailDTO[];
  totalPrice: number

}
