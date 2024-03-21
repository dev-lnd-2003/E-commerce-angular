import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/Home/product.service';

@Component({
  selector: 'app-category-product-page',
  templateUrl: './category-product-page.component.html',
  styleUrls: ['./category-product-page.component.css']
})
export class CategoryProductPageComponent implements OnInit {

  listProduct: Product[] = []
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.findAllProductByCategory();

  }

  findAllProductByCategory() {
    let cid = this.route.snapshot.params['cid'];
    this.productService.findAllProductByCategory(cid).subscribe(response => {
      this.listProduct = response;
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }
}
