
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import  { map}        from  'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl + 'UserForms';

  private currentUserSource = new ReplaySubject<User>(1);
CurrentUser$ = this.currentUserSource.asObservable();

  constructor( private http:HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl+ '/Login',model).pipe(
      map((response:User) =>{
        const user = response ;

        if(user){
          this.setCurrentuser(user);
        }
        return user;
      })
    )
  }

  register(model:any){
    return this.http.post(this.baseUrl+ '/Register',model).pipe(
      map((user:User) =>{
        if(user){
         
          this.setCurrentuser(user);
        }
        return user;
      })
    )
  }

  setCurrentuser(user:User){
    localStorage.setItem('user' , JSON.stringify(user));
    this.currentUserSource.next(user);
  }


  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
