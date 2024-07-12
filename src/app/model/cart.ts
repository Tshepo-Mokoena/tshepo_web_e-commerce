import { CartItem } from "./CartItem";

export  class Cart{
    id: number | undefined;
    total: number = 0;
    cartItems: CartItem[] = [];    
    updatedAt: any;
    createdAt: any;
}