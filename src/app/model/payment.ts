import { Account } from "./account";

export class Payment {
    id: number | undefined;
    type: string  = '';
    paymentId: string = '';
    cardName: string = '';
    cardNumber: string = ''; 
    expiryDate: string = "";
    cvc: string = '';
    holderName: string = '';
    createdAt: any;
}