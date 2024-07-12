import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Page } from 'src/app/model/page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order> = [];
  page = {} as Page<Order>;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  loading = false;
  failed = false;
  deleted = false;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(pageNumber: number = 0){
    this.loading = true;
    this.orderService.getAllCustomersOrders(pageNumber).subscribe(
      data => {
        this.loading = false;
        this.page = data;
        this.orders = this.page.content;
        this.currentPageSubject.next(pageNumber);
      }, error =>{
        this.loading = false;
        this.failed = true;
      }
    );
  }

  viewOrder(order: Order){
    this.router.navigate(['order/', order.id]);
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.getOrders(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

}
