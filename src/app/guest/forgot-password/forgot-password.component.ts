import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  account = new Account();
  loading = false;
  notfound = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    if(this.authService.currentAccountValue?.id){ 
      this.router.navigate(['/home']);
      return;      
    }
    this.loading = false;
  }

  forgotPassword(){
    this.loading = true;
    this.authService.forgotPassword(this.account.email).subscribe(
      data =>{this.router.navigate(['/login']);}, 
      err =>{
        this.loading = false;
        this.notfound = true;
      });
  }

}
