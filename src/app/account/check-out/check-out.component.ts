import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { Address } from 'src/app/model/address';
import { Payment } from 'src/app/model/payment';
import { Cart } from 'src/app/model/cart';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AccountsService } from 'src/app/service/accounts.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  account = new Account();
  address = new Address();
  payment = new Payment();
  cart = new Cart();
  loading = false;
  updated = false;
  failed = false;
  message: string = '';

  constructor(private router: Router, private authService: AuthenticationService, private accountService: AccountsService, private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getAccount();
    this.getCart();
    this.loading = false;
  }

  updateAccount(){
    this.loading = true;
    this.accountService.updateAccount(this.account).subscribe(
      data =>{
        this.loading = false;
        this.updated = true;
        this.account = data;
      }, error =>{
        this.failed = false;
        this.loading = false;
      }
    );
  }

  updateAddress(){}
  updatePayment(){}

  getAccount(){    
    this.loading = true;
    this.authService.currentAccount.subscribe(data =>{ 
      this.loading = false;
      this.account = data;
    });
  }

  submitOrder(){
    this.orderService.submitCustomerOrder().subscribe(
      data =>{
        this.router.navigate(['/transactions']);
      }, error =>{
        this.loading = false;
        this.failed = true;
      }
    );
  }

  getCart() {
    this.loading = true;
    this.cartService.getCart().subscribe(
      data => {
        this.cart = data;
        this.loading = false;
      }, error =>{
        this.loading = false;
      }
    );
  }


}
