import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://ecommerce-azure.azurewebsites.net/api/";

  private tokenKey = "token";
  constructor(private httpService: HttpClient) { }

  register(username: string, password: string) {
    return this.httpService.post(this.url + "register", {
      "username": username,
      "password": password,

    })
  }

  login(username: string, password: string) {
    return this.httpService.post(this.url + "login", {
      "username": username,
      "password": password
    })
  }

  setUser(user: User) {
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
  }

  getUser(): User | null {
    const userString = localStorage.getItem('user');

    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        return user;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {

    const token = this.getToken();

    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    try {
      return !jwtHelper.isTokenExpired(token.toString());

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
