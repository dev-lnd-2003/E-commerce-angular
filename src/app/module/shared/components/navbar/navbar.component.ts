import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/Home/user.service';
import { faCoffee, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faShoppingCart = faShoppingCart
  faUser = faUser
  constructor(private auth: UserService, private router: Router) { }

  token = this.auth.getToken()?.toString;
  fullname: string | undefined;
  photo: string | undefined
  ngOnInit(): void {
    this.loadData()

  }

  loadData() {
    if (this.token) {
      const user = this.auth.getUser();
      this.photo = user?.photo
      this.fullname = user?.fullname
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['home']).then(() => {
      location.reload();
    })

  }



}
