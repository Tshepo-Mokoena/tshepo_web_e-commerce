import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { OrderItem } from 'src/app/model/order-item';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  orderId: any;
  order = new Order();
  orderItems: Array<OrderItem> = [];
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
    this.router.navigate(['product/', productId]);
  }

  getOrder(){
    this.loading = true;
    this.orderService.getOrder(this.orderId).subscribe(
      data =>{
        this.loading = false;
        this.order = data;
        this.orderItems = data['orderItems'];
      }, error =>{
        if (error?.status === 404){
          this.message = "Order Not found"
        }
        this.message = "Oops Something Went Wrong try Refreshing page";
      }
    );
  }

  pendOrder(){    
  }

  payOrder(){
  }

}
