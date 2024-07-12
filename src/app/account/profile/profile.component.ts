import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AccountsService } from 'src/app/service/accounts.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  account = new Account();
  loading = false;
  updated = false;
  failed = false;
  message: string = '';

  constructor(private authService: AuthenticationService, private accountService: AccountsService) { }

  ngOnInit(): void {    
    this.getAccount();
  }

  getAccount(){
    this.authService.currentAccount.subscribe(data =>{ this.account = data;});
  }

  updateAccount(){
    this.accountService.updateAccount(this.account).subscribe(
      data =>{
        this.loading = false;
        this.updated = true;
        this.getAccount();
      }, error =>{
        this.loading = false;
        this.failed = true;
      }
    );
  }

}
