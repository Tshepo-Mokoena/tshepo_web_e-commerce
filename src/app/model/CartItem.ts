import { Product } from "./product";

export  class CartItem{

    id: number | undefined;
    product = new Product();
    qty: number = 0;
    subtotal: number = 0;
    updatedAt: any;
    createdAt: any;

}