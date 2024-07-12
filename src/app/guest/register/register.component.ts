import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  account = new Account();
  loading = false;
  failed = false;
  conflict = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    if(this.authService.currentAccountValue?.id){
      this.router.navigate(['/home']);
      return;      
    }
    this.loading = false;
  }

  register(){
    this.loading = true;
    this.authService.register(this.account).subscribe(data => {
      this.router.navigate(['/login']);
    }, err =>{
      this.loading = false;
      if(err?.status === 409){
        this.conflict = true;
      }else{
        this.failed = true;
      }
    })
  }

}
