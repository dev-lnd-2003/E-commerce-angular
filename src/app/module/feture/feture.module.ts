import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetureComponent } from './feture.component';
import { HomeComponent } from './components/home/home.component';
import { MainCarouselComponent } from './components/home/main-carousel/main-carousel.component';
import { HomeCategoryProductComponent } from './components/home/home-category-product/home-category-product.component';
import { HomeBestProductComponent } from './components/home/home-best-product/home-best-product.component';
import { CategoryProductPageComponent } from './components/category-product-page/category-product-page.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { EmptyFieldPipe } from 'src/app/pipe/EmptyFieldPipe';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';



@NgModule({
  declarations: [
    FetureComponent,
    HomeComponent,
    MainCarouselComponent,
    HomeCategoryProductComponent,
    HomeBestProductComponent,
    ProductDetailComponent,
    CategoryProductPageComponent,
    CartComponent,
    CheckoutComponent,
    OrderComponent,
    OrderDetailComponent,
    PaymentMethodComponent,
    RegisterComponent,
    LoginComponent,
    EmptyFieldPipe,
    UserAddressComponent,
    PaymentMethodComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatStepperModule
  ],
  exports: [
    FetureComponent,
    HomeComponent,

  ]
})
export class FetureModule { }
