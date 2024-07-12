import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  submitCustomerOrder(){
    return this.http.post<any>(`${this.host}/orders/submit`, null);
  }

  getCustomerOrders(page: number = 0){
    return this.http.get<any>(`${this.host}/orders?page=${page}`);
  }

  getCustomerOrder(orderId: number){
    return this.http.get<any>(`${this.host}/orders/${orderId}`);
  }

  getCustomerOrderItems(orderId: number){
    return this.http.get<any>(`${this.host}/orders/${orderId}/order-items`);
  }

//Administration

  getAllCustomersOrders(page: number = 0){
    return this.http.get<any>(`${this.host}/internal/orders?page=${page}`);
  }

  getCustomersPendingOrders(page: number = 0){
    return this.http.get<any>(`${this.host}/internal/orders/pending?page=${page}`);
  }

  getCustomersPaidOrders(page: number = 0){
    return this.http.get<any>(`${this.host}/internal/orders/paid?page=${page}`);
  }

  getCustomersNewOrders(page: number = 0){
    return this.http.get<any>(`${this.host}/internal/orders/new?page=${page}`);
  }

  getOrderItems(orderId: number){
    return this.http.get<any>(`${this.host}/internal/orders/${orderId}/order-items`);
  }

  getOrder(orderId: number){
    return this.http.get<any>(`${this.host}/internal/orders/${orderId}`);
  }
  

}
