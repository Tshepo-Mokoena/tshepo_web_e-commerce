import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartRequest } from 'src/app/model/cartrequest';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { Account } from 'src/app/model/account';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Role } from 'src/app/model/role.enum';
import { Page } from 'src/app/model/page';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  loading = false;
  currentAccount = new Account();
  private productId: any;
  product = new Product();
  cartRequest = new CartRequest();
  products: Array<Product> = [];  
  page = {} as Page<Product>;

  constructor(private authenticationService: AuthenticationService, private router: Router, private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) {
    this.authenticationService.currentAccount.subscribe(data =>{ this.currentAccount = data;});
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct();
    this.getProducts();
  }

  isAdmin(){ return this.currentAccount?.role === Role.ADMIN; }

  getProduct(){
    this.loading = true;
    this.productService.getProduct(this.productId).subscribe(
      data =>{
        this.loading = false;
        this.product = data;
        this.cartRequest.productId = this.product.productId;
      }, error=>{        
        this.loading = false;
      }
    );
  }

  addToCart(){
    this.loading = true;
    if(this.cartRequest.quantity == 0){ this.cartRequest.quantity = 1;}
    this.cartService.addToCart(this.cartRequest).subscribe(
      data=>{
        this.router.navigate(['/cart']);
      }
    );    
  }

  getPopularProduct(productId: string) {
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
