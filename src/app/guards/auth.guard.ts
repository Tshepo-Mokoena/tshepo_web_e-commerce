import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private currentAccount = new Account();  
  
  constructor(private router: Router, private authService: AuthenticationService){
    this.authService.currentAccount.subscribe(data =>{ this.currentAccount = data; });
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.authService.isAccountLoggedIn()){
      if (route.data.roles?.indexOf(this.currentAccount.role) === -1){
        this.router.navigate(['/401']);
        return false;
      }      
      return true; 
    }
    this.router.navigate(['/login']); 
    return false;
  }
  
}
