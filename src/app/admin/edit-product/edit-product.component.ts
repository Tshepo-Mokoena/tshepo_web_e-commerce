import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: any;
  product = new Product();
  image = {} as File;
  url: any;
  categoryList: Array<Category> = [];
  loading = false;
  success = false;
  message = "";

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct();
    this.getCategories();
  }

  onChange(event: any) {
    if (event.target.files[0]) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => { this.url = reader.result; };
    }
  }

  getProduct() {
    this.productService.getAdminProduct(this.productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  getCategories(){
    this.loading = true;
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.loading = false;
        this.categoryList = data['content'];
      }, error => {
        this.loading = false;
        this.message = "Category could not be loaded"
      }
    );
  }

  editProduct() {
    this.loading = true;
    if (this.url != null) {
      const formData = this.productService.createFromFormData(this.product);
      formData.append('image', this.image, this.image.name);
      this.productService.updateProduct(this.productId, formData).subscribe(
        data => {
          this.loading = false;
          this.message = "Successfully Added";
          this.product = data;
        }, error => {
          this.loading = false;
          if (error?.status === 409) {
            this.message = "Item Name Exist"
          } else {
            this.message = "Oops something went wrong try again"
          }
        }
      );
    } else {
      const formData = this.productService.createFromFormData(this.product);
      this.productService.updateProduct(this.productId, formData).subscribe(
        data => {
          this.loading = false;
          this.message = "Successfully Added";
          this.product = data;
        }, error => {
          this.loading = false;
          if (error?.status === 409) {
            this.message = "Item Name Exist"
          } else {
            this.message = "Oops something went wrong try again"
          }
        }
      );
    }
  }

}
