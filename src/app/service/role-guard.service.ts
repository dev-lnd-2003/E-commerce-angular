import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './Home/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  isAdmin: boolean = false; // Biến trạng thái cho biết người dùng có vai trò là 'ADMIN' hay không


  constructor(public auth: UserService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data["role"];
    const token = this.auth.getToken();

    let tokenPayload: any;
    if (token) {
      tokenPayload = jwtDecode(token.toString())
      this.isAdmin = roles.includes(tokenPayload.role); // Lưu trữ thông tin vai trò của người dùng

    }

    if (!this.auth.isAuthenticated() || !roles.includes(tokenPayload.role)) {
      this.router.navigate(['home']);
      return false
    }
    return true
  }
}
