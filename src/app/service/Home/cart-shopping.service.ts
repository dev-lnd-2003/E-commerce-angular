import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/model/Cart';
import { OrderDto } from 'src/app/model/OrderDto';
import { UserAddress } from 'src/app/model/UserAddress';

@Injectable({
  providedIn: 'root'
})
export class CartShoppingService {


  url = "https://ecommerce-azure.azurewebsites.net/api/cart/"

  constructor(private httpService: HttpClient) { }

  addToCart(username: string, pid: number) {
    return this.httpService.post<Cart>(this.url + "addToCart", null, {
      params: {
        "username": username,
        "pid": pid.toString()
      }
    });
  }


  viewCart(username: string): Observable<Cart[]> {
    return this.httpService.get<Cart[]>(this.url + "viewCart?username=" + username)
  }

  checkOut(orderDto: OrderDto) {
    return this.httpService.post<OrderDto>(this.url + "check-out", orderDto);
  }

  remove(username: string): void {
    this.httpService.delete(this.url + "removeCart?username=" + username).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  removeCartItemByUsernameAndProductId(username: string, pid: number): void {
    const params = new HttpParams()
      .set('username', username)
      .set('pid', pid)

    this.httpService.delete(this.url + "removeCartItem", { params }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
