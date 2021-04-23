import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingAppFE';
  users:any;

  constructor(  private accountservice:AccountService){}

  ngOnInit(){
  
  this.setCurrentUser();
  }

  setCurrentUser(){
  const user = JSON.parse(localStorage.getItem('user'));
  this.accountservice.setCurrentuser(user);
  }


 
}
