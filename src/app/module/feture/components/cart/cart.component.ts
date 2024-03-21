import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/Cart';
import { CartShoppingService } from 'src/app/service/Home/cart-shopping.service';
import { UserService } from 'src/app/service/Home/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[] = [];
  username: string | undefined;

  constructor(
    private auth: UserService,
    private cartShoppingService: CartShoppingService
  ) { }

  ngOnInit(): void {
    this.username = this.auth.getUser()?.username!;
    this.viewCart();
  }

  viewCart() {
    if (this.username) {
      this.cartShoppingService.viewCart(this.username).subscribe(
        {
          next: (response) => {
            this.cart = response
          },
          error: (error) => {
            console.error('Error fetching cart data:', error);
          }
        }
      );
    }
  }

  removeProduct(pid: number) {
    let username = this.username as string
    this.cartShoppingService.removeCartItemByUsernameAndProductId(username, pid)
    window.location.reload()
  }
}
