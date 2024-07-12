import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import { PasswordResetRequest } from '../model/password-reset-request';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public baseUrl = `${environment.apiUrl}/authentication`;
  public currentAccount: Observable<Account>;
  private currentAccountSubject: BehaviorSubject<Account>;
  private jwtHelper = new JwtHelperService;
  private token: string = '';

  constructor(private http: HttpClient) {
    let storageAccount;
    const storageAccountAsStr = localStorage.getItem('currentAccount')
    if (storageAccountAsStr) {
      storageAccount = JSON.parse(storageAccountAsStr);
    }
    this.currentAccountSubject = new BehaviorSubject<Account>(storageAccount);
    this.currentAccount = this.currentAccountSubject.asObservable();
  }

  public get currentAccountValue(): Account {
    return this.currentAccountSubject.value;
  }

  login(account: Account): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/sign-in`, account).pipe(
      map(response => {
        if (response) {
          localStorage
            .setItem('currentAccount', JSON.stringify(response));
          this.currentAccountSubject.next(response);
        }
        return response;
      })
    );
  }

  register(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl + `/register`, account);
  }

  logout() {
    localStorage.removeItem('currentAccount')
    this.currentAccountSubject.next(new Account);
  }

  isAccountLoggedIn(): boolean {
    this.currentAccount.subscribe(data =>{ this.token = data.token});
    if (this.token != null && this.token !== '') {
      if (!this.jwtHelper.isTokenExpired(this.token)){
        return true;          
      }      
    } 
    this.logout();
    return false;
  }

  newPassword(passwordResetRequest: PasswordResetRequest){
    return this.http.post<any>(`${this.baseUrl}/reset-password`,passwordResetRequest);
  }

  forgotPassword(email: string){
    return this.http.get<any>(`${this.baseUrl}/reset-password/${email}`);
  }

  confirmAccount(confirmToken: string){
    return this.http.get<any>(`${this.baseUrl}/confirm-account/${confirmToken}`);
  }

  resendConfirmAccount(account: Account){
    return this.http.post<any>(`${this.baseUrl}/resend-confirm-account`, account);
  }

}
