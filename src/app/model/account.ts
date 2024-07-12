import { Role } from "./role.enum";

export class Account{

    id: number | undefined;
    accountId: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    password: string = '';
    role: Role = Role.USER ;
    token: string = '';
    active: boolean = true;
    locked: boolean = true;
    updatedAt: any;
    createdAt: any;

}