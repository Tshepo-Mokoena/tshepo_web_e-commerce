import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account = new Account();
  loading = false;
  credentials = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    if(this.authService.currentAccountValue?.id){ 
      this.router.navigate(['/home']);
      return;      
    }
    this.loading = false;
  }

  login(){
    this.loading = true;
    this.authService.login(this.account).subscribe(
      data =>{this.router.navigate(['/home']);}, 
      err =>{
        this.loading = false;
        this.credentials = true;
      });
  }

}
