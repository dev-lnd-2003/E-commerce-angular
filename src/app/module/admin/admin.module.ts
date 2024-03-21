import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminStaticsComponent } from './components/admin-statics/admin-statics.component';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AdminProductComponent,
    SidebarComponent,
    LayoutComponent,
    AdminStaticsComponent,
    AdminAccountComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
