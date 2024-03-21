
export interface OrderDto {

  order: {
    user: {
      username: string
      role: string
    };

    create_Date: Date;
  };
  orderDetails: any[];
}
