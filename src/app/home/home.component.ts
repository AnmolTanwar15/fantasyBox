import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  upcoming:any=[];
  targetDate:any=[];
  lockTime:any=[];
  timeStart:any=[];
  spiltLock:any=[];
  newData:any=[];
  myDate:any = new Date();
  countdown:any=30;
  finalDate:any=[];
  userInfo:any=[];

  constructor(private router : Router, private api:ApiService,private datePipe: DatePipe,public dialog: MatDialog,private spinner: NgxSpinnerService){
    this.myDate =this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate=Date.parse(this.myDate)
    console.log(this.myDate,'DATE');
  }


  ngOnInit(): void {
    this.spinner.show();
    this.api.getMatchList().subscribe((res:any)=>{
      console.log(res,"Match List");     
      this.upcoming=res[0].upcoming;
      console.log(this.upcoming,"UP");
      this.upcoming.filter((x:any)=>{
        this.lockTime.push(Date.parse(x.locktime));
        this.timeStart.push(x.time_start);
      })
      console.log(this.lockTime,"LOCK");
      console.log(this.timeStart,"START");
      
      this.lockTime.filter((x:any)=>{
        this.finalDate.push((x - this.myDate)/1000);
      })
      console.log(this.finalDate,"FINAL");
      
      this.spinner.hide();
    })

    this.api.getUserDetails().subscribe((res:any)=>{
      this.userInfo=res[0];
      console.log(this.userInfo,"USER DEtails");         
      if(this.userInfo.dob=="" && this.userInfo.team=="" && this.userInfo.state==""){
        this.dialog.open(EditProfileComponent,{
          width:'55%',
          height:'75%',
          disableClose: true
        });
      }
    })
  }

  onLogout(){
    this.dialog.closeAll();
    localStorage.clear();
    this.router.navigate(['']);
  }

  onCard(id:any){
    console.log(id,"ID");
    this.router.navigate(['contest'],{queryParams: {key: btoa(id)}});
  }

}
