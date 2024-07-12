import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/model/page';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryName: any;
  productList: Array<Product> = [];
  categoryList: Array<Category> = [];
  page = {} as Page<Product>;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  loading = false;
  success = false;
  message = "";

  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { 
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProduct(productId : string){
    this.router.navigate(['product/', productId]);
  }

  getProducts(pageNumber: number = 0): void {
    this.loading = true;
    this.productService.getCategoryProducts(this.categoryName, pageNumber).subscribe(
      data =>{
        this.loading =false;
        this.page = data;
        this.productList = this.page.content;
        this.currentPageSubject.next(pageNumber);
      }, error => {
        this.loading = false;
        this.message = "Oops something went wrong";
      }
      );
  }

  getCategories(){
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.categoryList = data['content'];
      }, error => {
        this.loading = false;
        this.message = "Oops something went wrong";
      }
    );
  }

  getCategory(name: string){
    this.categoryName = name;
    this.router.navigate(['category/', name]);
    this.getProducts();
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.getProducts( direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }


}
