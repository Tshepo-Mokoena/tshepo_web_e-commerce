import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AccountsService } from 'src/app/service/accounts.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account = new Account();
  email: any;
  loading = false;
  updated = false;
  conflict = false;
  failed = false;
  message = "";

  constructor(private authService: AuthenticationService, private accountService: AccountsService, private activatedRoute: ActivatedRoute) {
    this.email =  this.activatedRoute.snapshot.paramMap.get('email');
   }

  ngOnInit(): void {
    this.getAccount();
  }

  updateAccount(){
    this.reset();
    this.loading = true;
    this.accountService.adminAccountUpdate(this.account).subscribe(
      data=>{
        this.loading = false;
        this.account = data;
        this.updated = true;
      }, error=>{
        if(error?.status === 409){
          this.conflict = true;
        }else{
          this.failed = true;
        }
      }
    );
  }

  getAccount(){
    this.reset();
    this.loading = true;
    this.accountService.getAccount(this.email).subscribe(
      data =>{
        this.loading = false;
        this.account = data;
      }, error =>{
        this.loading = false;
        this.failed = true;
      }
    );
  }

  resetPassword(){
    this.reset();
    this.loading = true;
    this.authService.forgotPassword(this.email).subscribe(
      data=>{
        this.loading = false;        
        this.updated = true;
      }, error=>{
        this.loading = false;
        this.failed = true;
      }
    );    
  }

  reset(){
    this.loading = false;
    this.updated = false;
    this.conflict = false;
    this.failed = false;
  }

}
