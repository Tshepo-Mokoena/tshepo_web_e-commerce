import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ViewOrderComponent } from './admin/view-order/view-order.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './guest/cart/cart.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { HomeComponent } from './guest/home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { ProductsComponent } from './guest/products/products.component';
import { RegisterComponent } from './guest/register/register.component';
import { SingleProductComponent } from './guest/single-product/single-product.component';
import { Role } from './model/role.enum';
import { AccountComponent } from './admin/account/account.component';
import { ViewTransactionComponent } from './account/view-transaction/view-transaction.component';
import { CheckOutComponent } from './account/check-out/check-out.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { FaqComponent } from './guest/faq/faq.component';
import { AboutComponent } from './guest/about/about.component';
import { CategoryComponent } from './guest/category/category.component';
import { ForgotPasswordComponent } from './guest/forgot-password/forgot-password.component';
import { ConfirmAccountComponent } from './guest/confirm-account/confirm-account.component';

const routes: Routes = [
  { path: "admin", component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "add-product", component: AddProductComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "edit-product/:id", component: EditProductComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "product-admin", component: AdminProductsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "accounts", component: AccountsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "account/:email", component: AccountComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "orders", component: OrdersComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "order/:id", component: ViewOrderComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "cart", component: CartComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}  
  },
  { path: "profile", component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER, Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "change-password", component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER, Role.ADMIN, Role.SUPER_ADMIN]}
  },
  { path: "transactions", component: TransactionsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}
  },
  { path: "view-transaction/:id", component: ViewTransactionComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}
  },
  { path: "checkout", component: CheckOutComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}
  },
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "products", component: ProductsComponent},  
  {path: "category/:name", component: CategoryComponent},
  {path: "product/:id", component: SingleProductComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "forgot-password", component: ForgotPasswordComponent},
  {path: "confirm-account", component: ConfirmAccountComponent},
  {path: "401", component: UnauthorizedComponent},  
  {path: "404", component: NotFoundComponent},
  {path: "about", component: AboutComponent},
  {path: "faq", component: FaqComponent},
  {path: "test", component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router){
    this.router.errorHandler = (error: any) =>{
      this.router.navigate(['/404']);
    };
  }
}
