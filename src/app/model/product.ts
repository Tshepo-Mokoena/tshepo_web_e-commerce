import { Category } from "./category";

export class Product {
    id: number | undefined;
    productId: string = '';
    name: string = '';
    desc: string = '';
    qty: number = 0;
    price: number = 0;
    categories: Category [] = [];
    productImageURL: string = '';    
    active: boolean | undefined;
    productStatus: string = ';'
    imageName: string = '';
    createdAt: any;
}
