export interface UserPayment {

  id: number
  userUsername: string;
  paymentType: string;
  provider: string;
  expiry: Date;
}
