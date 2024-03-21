import { CartShoppingService } from './../../../../service/Home/cart-shopping.service';
import { ProductService } from './../../../../service/Home/product.service';
import { UserService } from './../../../../service/Home/user.service';
import { Product } from './../../../../model/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;

  constructor(
    private auth: UserService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartShopping: CartShoppingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showDetailProduct()
  }

  showDetailProduct() {
    let pid = this.route.snapshot.params['pid'];
    this.productService.findProductById(pid).subscribe(response => {
      this.product = response
    }, (error) => {
      console.log(error);

    })

  }

  addToCart(pid: number) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
    } else {
      let username = this.auth.getUser()?.username!


      this.cartShopping.addToCart(username, pid).subscribe({
        next: (response) => {
          console.log(response);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            text: 'Thêm sản phẩm thành công',
          })
        },

        error: (error) => {
          console.log(error);
        }
      })

    }




  }
}
