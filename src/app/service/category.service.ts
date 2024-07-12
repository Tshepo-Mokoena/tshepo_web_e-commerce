import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  addCategory(category: Category){
    return this.http.post<any>(`${this.baseUrl}/internal/category`, category);
  }

  updateCategory(category: Category){
    return this.http.post<any>(`${this.baseUrl}/internal/category/${category.categoryId}`, category);
  }

  getAllCategory(keyword: string = '', page: number = 0, pageSize: number = 20){
    return this.http.get<any>(`${this.baseUrl}/category?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);
  }

  getCategory(categoryId: string){
    return this.http.get<any>(`${this.baseUrl}/category/${categoryId}`);
  }

  deleteCategory(categoryId: string){
    return this.http.delete<any>(`${this.baseUrl}/internal/category/${categoryId}`);
  }
}
