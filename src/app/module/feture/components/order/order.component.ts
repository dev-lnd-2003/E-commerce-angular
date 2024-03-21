import { OrderDetailDTO } from 'src/app/model/OrderDetailDTO';
import { OrderDetail } from './../../../../model/OrderDetail';
import { Component, OnInit } from '@angular/core';
import { ViewOrderDTO } from 'src/app/model/ViewOrderDTO';
import { OrdersService } from 'src/app/service/Home/orders.service';
import { UserService } from 'src/app/service/Home/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  username: string | undefined;
  viewOrderDTO: ViewOrderDTO[] = [];
  orderDetails: OrderDetailDTO[] = [];
  totalPrice: number = 0;

  constructor(private user: UserService, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.findAllByUsername()
  }

  findAllByUsername() {
    this.username = this.user.getUser()?.username!;
    this.orderService.findAllOrderByUsername(this.username).subscribe(
      {
        next: (response) => {
          this.viewOrderDTO = response
          for (let order of this.viewOrderDTO) {
            for (let orderDetail of order.orderDetailDTOs) {
              let productTotalPrice = orderDetail.price * orderDetail.quantity;
              this.totalPrice += productTotalPrice
            }
            order.totalPrice = this.totalPrice
          }

        },
        error: (error) => {
          console.log(error);

        }
      }
    )
  }

  findAllOrderDetail(order: ViewOrderDTO) {
    this.orderDetails = order.orderDetailDTOs;
    console.log(this.orderDetails);
  }

}
