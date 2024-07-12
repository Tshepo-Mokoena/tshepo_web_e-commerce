import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Page } from 'src/app/model/page';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList: Array<Product> = [];
  page = {} as Page<Product>;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  categoryList: Array<Category> = [];
  categ = new Category();
  deleteProductId = '';
  loading = false;
  failed = false;
  deleted = false
  open = false;
  add = false;
  edit = false;

  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.categoryList = data['content'];
      }
    );
  }

  getProducts(name?: string, pageNumber: number = 0): void {
    this.loading = true;
    this.productService.getAllProducts(name, pageNumber).subscribe(
      data => {
        this.loading = false;
        this.page = data;
        this.productList = this.page.content;
        this.currentPageSubject.next(pageNumber);
      }, error => {
        this.loading = false;
        this.failed = true;
      }
    );
  }

  getMultipliedValue(price:number, quantity:number) {
    return price * quantity;
  }

  editProduct(productId: string) {
    this.router.navigate(['edit-product/', productId]);
  }

  deleteProduct() {
    this.loading = true;
    this.productService.deleteProduct(this.deleteProductId).subscribe(
      data => {
        this.loading = false;
        this.deleted = true;
        this.getProducts();
      }, error => {
        this.loading = false;
        if (error?.status === 404) {
          this.failed = true;
        }
        this.failed = true;
        this.getProducts();
      }
    );
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.getProducts(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  closeEditModal(){ this.edit = false; }

  closeAddModal(){ this.add = false; }

  editModal(category: Category){
    this.edit = true;
    this.categ = category;
  }

  deleteNotification(productId: string){
    this.open = true;
    this.deleteProductId = productId;
  }
  deleteCancel(){this.open = false;}
  deleteConfirm(){
    this.open = false;
    this.deleteProduct();
  }

  addModal(){
    this.add = true;
    this.categ = new Category();
  }

  editCategory(){
    this.loading = true;
    console.log(this.categ);
    this.categoryService.updateCategory(this.categ).subscribe(
      data=>{
        this.loading = false;
        this.getCategories();        
      }, error=>{
        this.loading = false;
      }
    );
  }

  addCategory(){
    this.loading = false;
    this.categoryService.addCategory(this.categ).subscribe(
      data=>{
        this.loading = false;
        this.getCategories();        
      }, error=>{
        this.loading = false;
      }
    );
  }

  deleteCategory(productId: string){
    this.loading = true;
    this.categoryService.deleteCategory(productId).subscribe(
      data=>{
        this.loading = false;
        this.getCategories();
      },err=>{
        this.loading = false;
      }
    );
  }

}