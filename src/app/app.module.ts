import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ViewOrderComponent } from './admin/view-order/view-order.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './guest/home/home.component';
import { ProductsComponent } from './guest/products/products.component';
import { SingleProductComponent } from './guest/single-product/single-product.component';
import { CartComponent } from './guest/cart/cart.component';
import { RegisterComponent } from './guest/register/register.component';
import { LoginComponent } from './guest/login/login.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './service/product.service';
import { AuthenticationService } from './service/authentication.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProfileComponent } from './account/profile/profile.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { AccountComponent } from './admin/account/account.component';
import { CheckOutComponent } from './account/check-out/check-out.component';
import { ViewTransactionComponent } from './account/view-transaction/view-transaction.component';
import { AboutComponent } from './guest/about/about.component';
import { FaqComponent } from './guest/faq/faq.component';
import { CategoryComponent } from './guest/category/category.component';
import { ForgotPasswordComponent } from './guest/forgot-password/forgot-password.component';
import { ConfirmAccountComponent } from './guest/confirm-account/confirm-account.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminProductsComponent,
    AddProductComponent,
    EditProductComponent,
    OrdersComponent,
    ViewOrderComponent,
    AdminDashboardComponent,
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ProfileComponent,
    TransactionsComponent,
    ChangePasswordComponent,
    AccountsComponent,
    AccountComponent,
    CheckOutComponent,
    ViewTransactionComponent,
    AboutComponent,
    FaqComponent,
    CategoryComponent,
    ForgotPasswordComponent,
    ConfirmAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    AuthenticationService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
