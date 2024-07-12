import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { CartRequest } from '../model/cartrequest';
import { CartItem } from '../model/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public baseUrl = `${environment.apiUrl}/carts`

  constructor(private http: HttpClient) { }

  addToCart(cartRequest: CartRequest){    
    return this.http.post<any>(this.baseUrl, cartRequest);
  }

  removeFromCart(productId: string){    
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }

  updateCart(cartRequest: CartRequest){    
    return this.http.post<any>(`${this.baseUrl}/update`, cartRequest);
  }

  getCart(){
    return  this.http.get<any>(this.baseUrl);
  }
}
