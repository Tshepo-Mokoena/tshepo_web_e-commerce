import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from './model/account';
import { Role } from './model/role.enum';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Siya Online Shopping';

  account: Account = new Account();
  gfg = true;

  constructor(private authenticationService: AuthenticationService, private router: Router){
    this.authenticationService.currentAccount.subscribe(data =>{ this.account = data;});
  }

  isUser(){
    return this.account?.role === Role.USER
  }

  isAdmin(){
    return this.account?.role === Role.ADMIN
  }

  isSuperAdmin(){
    return this.account?.role == Role.SUPER_ADMIN
  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
