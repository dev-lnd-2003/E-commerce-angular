import { OrderDetail } from './../../../../model/OrderDetail';
import { OrderDto } from '../../../../model/OrderDto';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/Cart';

import { CartShoppingService } from 'src/app/service/Home/cart-shopping.service';
import { UserService } from 'src/app/service/Home/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart[] = [];
  username: string | undefined;
  totalPrice: number = 0;

  constructor(
    private user: UserService,
    private cartShoppingService: CartShoppingService
  ) { }

  ngOnInit(): void {
    this.username = this.user.getUser()?.username!;
    this.viewCart();

  }

  viewCart() {
    if (this.username) {
      this.cartShoppingService.viewCart(this.username).subscribe(
        {
          next: (response) => {
            this.cart = response
            for (const product of this.cart) {
              this.totalPrice += product.productPrice * product.quantity;
            }
          },
          error: (error) => {
            console.error('Error fetching cart data:', error);
          }
        }
      );
    }
  }



  checkOut() {
    const username = this.user.getUser()?.username as string;
    const orderDetails: OrderDetail[] = [];
    for (const product of this.cart) {
      const orderDetail: OrderDetail = {
        product: { id: product.productId },
        price: product.productPrice,
        quantity: product.quantity
      };
      orderDetails.push(orderDetail);
    }
    const orderDto: OrderDto = {
      order: {
        user: {
          username: username,
          role: "CUSTOMER"
        },
        create_Date: new Date()
      },
      orderDetails: orderDetails,
      // userPayment :
    }
    console.log(orderDto);


    this.cartShoppingService.checkOut(orderDto).subscribe({
      next: (response) => {
        console.log(response);
        this.cartShoppingService.remove(username)
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    })

  }


}
