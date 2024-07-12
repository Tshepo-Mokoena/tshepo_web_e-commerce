import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Page } from 'src/app/model/page';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentAccount = new Account();
  products: Array<Product> = [];
  page = {} as Page<Product>;
  loading = false;

  constructor(private productService: ProductService, private router: Router, private authService: AuthenticationService) {
    this.authService.currentAccount.subscribe(data =>{this.currentAccount = data;});
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProduct(productId: string) {
    this.router.navigate(['product/', productId]);
  }

  getProducts(name?: string, pageNumber: number = 0): void {
    this.loading = true;
    this.productService.getActiveProducts(name, pageNumber).subscribe(
      data => {
        this.loading = false;
        this.page = data;
        this.products = this.page.content;
      }, error=>{
        this.loading = false;
      });
  }

}
