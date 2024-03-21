import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleGuardService } from './service/role-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-commerce-website';
  showNavbarAndFooter: boolean = true;

  constructor(private router: Router, private roleGuardService: RoleGuardService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbarAndFooter = this.roleGuardService.isAdmin;
      }
    })
  }
}
