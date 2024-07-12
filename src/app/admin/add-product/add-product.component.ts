
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product = new Product();
  categoryList: Array<Category> = [];
  image = {} as File;
  url: any;
  subscriptions: Subscription[] = [];
  loading = false;
  failed = false;
  added = false;
  productName = false;

  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.loading = true;
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.loading = false;
        this.categoryList = data['content'];
      }, error => {
        this.loading = false;
      }
    );
  }

  onChange(event: any) {
    if (event.target.files[0]) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => { this.url = reader.result; };
    }
  }

  addProduct(productForm: NgForm): void {
    this.reset();
    this.loading = true;
    if (this.url != null) {
      const formData = this.productService.createFromFormData(productForm.value);
      formData.append('image', this.image, this.image.name);
      this.subscriptions.push(
        this.productService.addProduct(formData).subscribe(
          data => {     
            this.loading = false;
            this.added = true;  
            this.getCategories();      
          }, error => {
            this.loading = false;
            this.getCategories();
            if(error?.status === 409){
              this.productName = true;
            } else {
              this.failed = true;
            }            
          }
        )
      );
    } else {
      const formData = this.productService.createFromFormData(productForm.value);
      this.subscriptions.push(
        this.productService.addProduct(formData).subscribe(
          data => {     
            this.loading = false;
            this.added = true;
            this.getCategories();
          }, error => {
            this.loading = false;
            this.getCategories();
            if(error?.status === 409){
              this.productName = true;              
            } else {
              this.failed = true;
            }
          }
        )
      );
    }
  }
  reset(){
    this.added = false;
    this.failed = false;
    this.productName = false;
  }
}