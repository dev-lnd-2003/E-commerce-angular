import { PaymentMethodComponent } from './module/feture/components/payment-method/payment-method.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './module/feture/components/home/home.component';
import { CartComponent } from './module/feture/components/cart/cart.component';
import { CheckoutComponent } from './module/feture/components/checkout/checkout.component';
import { OrderComponent } from './module/feture/components/order/order.component';
import { OrderDetailComponent } from './module/feture/components/order-detail/order-detail.component';
import { CategoryProductPageComponent } from './module/feture/components/category-product-page/category-product-page.component';
import { RegisterComponent } from './module/feture/components/register/register.component';
import { LoginComponent } from './module/feture/components/login/login.component';
import { RoleGuardService } from './service/role-guard.service';
import { ProductDetailComponent } from './module/feture/components/product-detail/product-detail.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "category-product/:cid", component: CategoryProductPageComponent },
      { path: "cart", component: CartComponent },
      { path: "product-detail/:pid", component: ProductDetailComponent },
      { path: "checkout/payment-method/:id", component: PaymentMethodComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "orders", component: OrderComponent },
      { path: "order/:id", component: OrderDetailComponent },
    ]
  },
  {
    path: "admin",
    loadChildren: () => import("./module/admin/admin-routing.module")
      .then(m => m.AdminRoutingModule),
    canActivate: [RoleGuardService],
    data: {
      role: "ADMIN"
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
