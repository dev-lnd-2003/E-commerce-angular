import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http:///ecommerce-azure.azurewebsites.net/api/public/product/"

  constructor(private httpService: HttpClient) { }

  findAllProductByCategory(cid: string): Observable<Product[]> {
    return this.httpService.get<Product[]>(this.url + "category-product?cid=" + cid);
  }

  findProductById(pid: number): Observable<Product> {
    return this.httpService.get<Product>(this.url + "product-detail?pid=" + pid);
  }
}
