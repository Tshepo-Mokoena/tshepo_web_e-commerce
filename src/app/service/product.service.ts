import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private host = environment.apiUrl;

  constructor(private Http: HttpClient) {}

  getActiveProducts(keyword: string = '', page: number = 0){
    return this.Http.get<any>(`${this.host}/products?keyword=${keyword}&page=${page}`);
  }

  getAllProducts(keyword: string = '', page: number = 0){
    return this.Http.get<any>(`${this.host}/internal/products?keyword=${keyword}&page=${page}`);
  }

  addProduct(formData: FormData){  
    return this.Http.post<any>(`${this.host}/internal/products`, formData);
  }
  
  updateProduct(productId : string, formData: FormData){
    return this.Http.post<any>(`${this.host}/internal/products/${productId}`, formData);
  }

  saveProduct(formData: FormData){
    return this.Http.post<any>(`${this.host}/internal/products/update`, formData);
  }
  
  getProductCategory(productId: String): Observable<Category[]> {
    return this.Http.get<Category[]>(`${this.host}/products/${productId}/categories`);
  }

  deleteProduct(productId: string){
    return this.Http.delete(`${this.host}/internal/products/${productId}`);
  }
  
  getAdminProduct(productId: string){
    return this.Http.get<any>(`${this.host}/internal/products/${productId}`);
  }

  getCategoryProducts(keyword: string = '', page: number = 0){
    return this.Http.get<any>(`${this.host}/products/category?keyword=${keyword}&page=${page}`);
  }

  getProduct(productId: string){
    return this.Http.get<any>(`${this.host}/products/${productId}`);
  }

  createFromFormData(product: Product): FormData{
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {type : 'application/json'}));
    return formData;
  }

}
