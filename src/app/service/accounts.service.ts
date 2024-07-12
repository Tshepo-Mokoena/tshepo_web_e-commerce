import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { PasswordResetRequest } from '../model/password-reset-request';
import { Payment } from '../model/payment';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAccounts(keyword: string = '', page: number = 0){
    return this.http.get<any>(`${this.host}/internal/accounts?keyword=${keyword}&page=${page}`);
  }

  getAccount(email: string){
    return this.http.get<any>(`${this.host}/internal/accounts/${email}`);
  }

  adminAccountUpdate(account: Account){
    return this.http.post<any>(`${this.host}/internal/accounts`, account);
  }

  updateAccount(account: Account){
    return this.http.post<any>(`${this.host}/accounts`, account);
  }

  updatePassword(passwordResetRequest: PasswordResetRequest){
    return this.http.post<any>(`${this.host}/accounts/password`, passwordResetRequest);
  }

  lockAccount(email: string){
    return this.http.get<any>(`${this.host}/internal/accounts/${email}/lock`);
  }

  unLockAccount(email: string){
    return this.http.get<any>(`${this.host}/internal/accounts/${email}/unlock`);
  } 

  getAdress(){
    return this.http.get<any>(`${this.host}/accounts/address`);
  }

  updateAddress(address: Address){
    return this.http.post<any>(`${this.host}/accounts/address`, address);
  }

  getPayment(){
    return this.http.get<any>(`${this.host}/accounts/payment`);
  }

  updatePayment(pay: Payment){
    return this.http.post<any>(`${this.host}/accounts/payment`, pay);
  }
  
}
