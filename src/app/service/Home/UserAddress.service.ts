import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAddress } from 'src/app/model/UserAddress';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  url = "http:///ecommerce-azure.azurewebsites.net/api/";

  constructor(private httpService: HttpClient) { }

  getUserAddress(username: string): Observable<UserAddress> {
    return this.httpService.get<UserAddress>(this.url + "user-address/edit?username=" + username)
  }

  createOrUpdateUserAddress(username: string, userAddressData: any): Observable<any> {
    return this.httpService.post<any>(this.url + "user-address/createOrUpdate?username=" + username, userAddressData);
  }


}
