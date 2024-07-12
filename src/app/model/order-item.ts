import { Product } from "./product";

export class OrderItem{

    id: Number | undefined;
    qty: number = 0;
    product = new Product();
    subtotal: number = 0;
    
}