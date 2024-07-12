import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartRequest } from 'src/app/model/cartrequest';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart = new Cart();
  cartRequest = new CartRequest();
  loading = false;
  failed = false;
  updated = false;
  deleted = false;
  isNumber = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  refreshCart(){
    this.reset();
    this.getCart();
  }

  getCart() {
    this.loading = true;
    this.cartService.getCart().subscribe(
      data => {
        this.loading = false;
        this.cart = data;
      }, error =>{
        this.loading = false;
        this.failed = true;
      }
    );
  }
  
  updateQty(qty: number, productId: string) {    
    console.log(qty);
    console.log(productId);
    this.reset();
    if (isNaN(qty) || qty > 0){
      this.cartRequest.quantity = qty;
      this.cartRequest.productId = productId;
      this.cartService.addToCart(this.cartRequest).subscribe(
        data => {
          this.getCart();
          this.loading = false;
          this.updated = true;
        }, error =>{
          this.loading = false;
          this.failed = true;
        }
      );
    }else{      
      this.loading = false;        
      this.isNumber = false;
    }    
  }

  removeFromCart(productId: string) {
    this.loading = true;
    this.reset();
    this.cartService.removeFromCart(productId).subscribe(
      data => {
        this.getCart();
        this.loading = false;
        this.deleted = true;
      }, error =>{
        this.loading = false;
        this.failed = true;
      }
    );
  }

  reset(){
    this.failed = false;
    this.updated = false;
    this.deleted = false;
    this.isNumber = true;
  }

}
