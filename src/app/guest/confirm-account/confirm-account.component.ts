import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  account = new Account();
  auth = false;
  token: any;
  loading = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    if(this.authService.currentAccountValue?.id){ 
      this.router.navigate(['/home']);
      return;      
    }
    this.loading = false;
  }

  showLogin(){
    this.auth = true;
  }

  closeLogin(){
    this.auth = false;
  }

  login(){
    this.authService.resendConfirmAccount(this.account).subscribe();
  }

  confirmAccount(){
    this.authService.confirmAccount(this.token).subscribe();
  }

}
