import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminStaticsComponent } from './components/admin-statics/admin-statics.component';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "statics", component: AdminStaticsComponent },
      { path: "account", component: AdminAccountComponent },
      { path: "products", component: AdminProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
