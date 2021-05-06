import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
baseUrl ='https://localhost:44331/api/Buggy/'
ValidationError : string[] = [];
  constructor( private http : HttpClient) { }

  ngOnInit(): void {
  }
    get404Error(){
    this.http.get(this.baseUrl + 'NotFound').subscribe( response =>{
      console.log(response);
    } , error =>{
      console.log(error);
    })
}

 get400Error(){
  this.http.get(this.baseUrl + 'BadRequest').subscribe( response =>{
    console.log(response);
  } , error =>{
    console.log(error); 
  })
 }

 get500Error(){
  this.http.get( this.baseUrl + 'ServerError').subscribe( response =>{
    console.log(response);
  } , error =>{
    console.log(error);
  })
}

get401Error(){
  this.http.get( this.baseUrl +'Auth').subscribe( response =>{
    console.log(response);
  } , error =>{
    console.log(error);
  })
}

get400ValidationError(){
  this.http.post( 'https://localhost:44331/api/UserForms/Register' , {}).subscribe( response =>{
    console.log(response);
  } , error =>{
    console.log(error);
    this.ValidationError = error;
  })
}
}
