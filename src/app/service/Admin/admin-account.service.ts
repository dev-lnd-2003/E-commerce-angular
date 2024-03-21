import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../Home/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountService {

  private url = "http://ecommerce-azure.azurewebsites.net/api/admin"

  constructor(private httpService: HttpClient, private user: UserService) { }

  private getRequestOptions(): { headers: HttpHeaders } | undefined {
    const token = this.user.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return { headers };
    }
    return undefined;

  }

  findAllAccount(): Observable<User[]> {
    const requestOptions = this.getRequestOptions();
    if (requestOptions) {
      return this.httpService.get<User[]>(`${this.url}/findAll`, requestOptions);
    } else {
      return new Observable();
    }

  }

  lockOrUnlockUser(username: string): Observable<User> {
    const requestOptions = this.getRequestOptions();
    if (requestOptions) {
      return this.httpService.post<User>(`${this.url}/lockOrUnlock?username=${username}`, {}, requestOptions);
    }
    return new Observable<User>();
  }

  findAllByRole(role: string): Observable<User[]> {
    const requestOptions = this.getRequestOptions();
    if (requestOptions) {
      return this.httpService.get<User[]>(`${this.url}/findAllByRole?role=${role}`, requestOptions);
    }
    return new Observable<User[]>();
  }

  findAllUserLockOrUnlock(active: boolean): Observable<User[]> {
    const requestOptions = this.getRequestOptions();
    if (requestOptions) {
      return this.httpService.get<User[]>(`${this.url}/findAllUserLockOrUnlock?active=${active}`, requestOptions);
    }
    return new Observable<User[]>();
  }


  addAdmin(username: string, password: string): Observable<any> {
    const requestOptions = this.getRequestOptions();
    if (requestOptions) {
      return this.httpService.post(`${this.url}/addAdmin`, { username, password }, requestOptions);
    } else {
      return new Observable<any>();
    }
  }
}
