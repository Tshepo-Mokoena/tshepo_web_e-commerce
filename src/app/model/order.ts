import { Account } from "./account";
import { Address } from "./address";
import { OrderItem } from "./order-item";
import { Payment } from "./payment";

export class Order{

    id: Number | undefined;
    total: number = 0;
    orderStatus: String = '';
    orderItems: OrderItem[] = [];
    payment= new Payment();
    account = new Account();
    address = new Address();
    createdAt: Date = new Date();
    
}