import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewOrderDTO } from 'src/app/model/ViewOrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = "http:///ecommerce-azure.azurewebsites.net/api/order/"

  constructor(private httpService: HttpClient) { }

  findAllOrderByUsername(username: string): Observable<ViewOrderDTO[]> {
    return this.httpService.get<ViewOrderDTO[]>(this.url + "viewOrder?username=" + username)
  }
}
