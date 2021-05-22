import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editform') editform :NgForm;
  member : Member;
  user: User

  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
     if(this.editform.dirty){
       $event.returnValue = true ;
     }
  }
  
  constructor(private accountservice:AccountService , private memberservice:MembersService ,private toastr: ToastrService) { 
    this.accountservice.CurrentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberservice.getMember(this.user.username).subscribe( member =>{
      this.member = member
    })
  }

  updateMember(){

    this.memberservice.updateMember(this.member).subscribe(() =>{
      this.toastr.success('profile updated')
      this.editform.reset(this.member);
    })
  
 }

}
