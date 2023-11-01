import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  preNotify:any=[];
  todayNotify:any=[];

  constructor(private api : ApiService, private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.getNotifications().subscribe((res:any)=>{
      console.log(res,"RESPONSe");     
      this.preNotify=res[0].previous;
      this.preNotify=this.preNotify.reverse();
      this.todayNotify=res[0].today;
      console.log(this.preNotify,"previous");
      console.log(this.todayNotify,"today");
      this.spinner.hide();

    })
  }

}
