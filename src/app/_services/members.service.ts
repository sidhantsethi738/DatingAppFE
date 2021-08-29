import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Paginated } from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl + 'Users/';
  members:Member[] =[];
  paginatedResult:Paginated<Member[]> = new Paginated<Member[]>();

  constructor(private http:HttpClient) { }

  getMembers( page?:number, itemsPerPage?:number){
    let params =new HttpParams();
    if(page !== null && itemsPerPage !== null){
      params = params.append('pageNumber',page.toString());
      params = params.append('pageSize',itemsPerPage.toString());
    }
    // if(this.members.length >0) return of(this.members);
     return this.http.get<Member[]>(this.baseUrl + 'GetUSers' ,{observe : 'response',params}).pipe(
     map(response =>{
       this.paginatedResult.result = response.body;
       if(response.headers.get('Pagination') !== null){
         this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
       }
       return  this.paginatedResult;
     })
     
      //  map(members => {
      //    this.members = members;
      //    return members;
      //  })
     )
  }

  getMember(username:string){

    const member = this.members.find(x =>x.username === username);
    if(member !== undefined)  return of(member);
   return  this.http.get<Member>(this.baseUrl + 'GetByUsername?username=' + username );
  }

  updateMember(member:Member){
 return this.http.put(this.baseUrl + 'UpdateProfile' , member).pipe(
   map( () => {
     const index = this.members.indexOf(member);
     this.members[index]= member;
   })
 )
  }

  setMainPhoto(photoId:number){

 return this.http.put(this.baseUrl + 'SetMainPhoto/' + photoId ,{});

  }

  deletePhoto(photoId:number){

    return this.http.delete(this.baseUrl + 'PhotoDelete/' + photoId );
   
     }
}
