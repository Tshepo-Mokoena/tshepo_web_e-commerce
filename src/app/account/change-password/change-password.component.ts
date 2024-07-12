import { Component, OnInit } from '@angular/core';
import { PasswordResetRequest } from 'src/app/model/password-reset-request';
import { AccountsService } from 'src/app/service/accounts.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  email: string = '';
  passwordResetRequest = new PasswordResetRequest();
  loading = false;
  failed = false;

  constructor(private authService: AuthenticationService, private accountService: AccountsService) { }

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail(){
    this.loading = true;
    this.authService.currentAccount.subscribe(
      data =>{
        this.loading = false;
        this.email = data.email;
      }, error =>{
        this.loading = false;
        this.failed = true;
      }
    );
  }

  updatePassword(){
    this.loading = true;
    this.failed = false;
    this.passwordResetRequest.email = this.email;
    this.accountService.updatePassword(this.passwordResetRequest).subscribe(
      data => {        
        this.authService.logout();
      }, error =>{
        this.failed = true;
        this.loading = false;
      }
    );
  }

}