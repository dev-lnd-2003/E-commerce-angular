import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPaymentMethodService {

  url = "http:///ecommerce-azure.azurewebsites.net/api/";

  constructor(private httpService: HttpClient) { }

  createOrUpdateUserAddress(username: string, userPaymentData: any): Observable<any> {
    return this.httpService.post<any>(this.url + "user-payment-method/createOrUpdate?username=" + username, userPaymentData);
  }
}
