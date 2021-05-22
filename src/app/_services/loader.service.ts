import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 busyRequestCount = 0;
  constructor( private spinner:NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      // type:'ball-climbing-dot',
      type:'pacman',
      bdColor:'rgba(0,0,0,0.8)',
      color:'rgba(195,223,18,0.99)'
    })
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <=0)
    {
      this.busyRequestCount =0;
      this.spinner.hide();
    }
  }
}
