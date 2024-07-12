import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Account } from '../model/account';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { ProductService } from '../service/product.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private currentAccount = new Account();
  constructor(private authService: AuthenticationService, private productService: ProductService) {
    this.authService.currentAccount.subscribe(data =>{this.currentAccount = data;});
  }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authService.baseUrl}/register`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authService.baseUrl}/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authService.baseUrl}/sign-in`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authService.baseUrl}/products`)) {
      return httpHandler.handle(httpRequest);
    }    
    if (httpRequest.url.includes(`${this.authService.baseUrl}/category`)) {
      return httpHandler.handle(httpRequest);
    }

    const request = httpRequest.clone({ headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.currentAccount.token
      })
    }); 
    return httpHandler.handle(request);
  }
}
