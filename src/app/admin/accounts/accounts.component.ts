import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/model/account';
import { Page } from 'src/app/model/page';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Array<Account> = [];
  page = {} as Page<Account>;  
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  loading = false;
  deleted = false;
  failed = false;

  constructor(private accountsService: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(name?: string, pageNumber: number = 0){
    this.loading = true;
    this.accountsService.getAccounts(name, pageNumber).subscribe(
      data =>{
        this.loading = false;
        this.page = data;
        this.accounts = this.page.content;
        this.currentPageSubject.next(pageNumber);
      }, error => {
        this.loading = false;
        this.failed = false;
      }
    );
  }

  viewAccount(email: string){ this.router.navigate(['/account', email]);}

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.getAccounts(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

}
