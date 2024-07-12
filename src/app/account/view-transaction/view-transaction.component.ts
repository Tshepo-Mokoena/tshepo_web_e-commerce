import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/order-item';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  orderId: any;  
  orderItems: Array<OrderItem> = [];
  order = new Order();
  loading = false;  
  failed = false;
  message = "";

  constructor(private orderService: OrderService, private activeRoute: ActivatedRoute, private router: Router) {
    this.orderId = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  this.getOrder();
  }
  
  viewProduct(productId: string){
    this.router.navigate(['/product/', productId]);
  }

  getOrder(){
    this.loading = true;
    this.orderService.getCustomerOrder(this.orderId).subscribe(
      data =>{
        this.loading = false;
        this.order = data;
        this.orderItems = this.order.orderItems;
      }, error =>{
        if (error?.status === 404){
          this.message = "Order Not found"
        }
        this.message = "Oops Something Went Wrong try Refreshing page";
      }
    );
  }

}
