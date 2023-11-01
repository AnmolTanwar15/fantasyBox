import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-joined-contest',
  templateUrl: './joined-contest.component.html',
  styleUrls: ['./joined-contest.component.css']
})
export class JoinedContestComponent implements OnInit {

  joinedContest:any=[];
  myDate:any = new Date();
  // startDate:any=[];
  // finalDate:any=[];
  upcoming:any=[];
  live:any=[];
  completed:any=[];
  upcomingDate:any=[];
  liveDate:any=[];
  completedDate:any=[];
  finalDate1:any=[];
  finalDate2:any=[];
  finalDate3:any=[];

  constructor(private api : ApiService, private router : Router,private datePipe: DatePipe, private spinner : NgxSpinnerService){
    this.myDate =this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate=Date.parse(this.myDate)
    console.log(this.myDate,'DATE');
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.getJoinedContest().subscribe((res:any)=>{
      console.log(res,"JOINED");
      this.joinedContest=res;
      // this.joinedContest.filter((x:any)=>{
      //   this.startDate.push(Date.parse(x.start_date))
      // })
      // console.log("startDate",this.startDate);
      
      // this.startDate.filter((x:any)=>{
      //   this.finalDate.push((x - this.myDate)/1000);
      // })
      // console.log("FINAL DATE", this.finalDate);

      this.joinedContest.filter((x:any)=>{
        if(x.status === 'opened'){
          this.upcoming.push(x);
          this.upcomingDate.push(Date.parse(x.start_date))
        }
        else if(x.status==='closed' && (x.final_status==='pending' || x.final_status==='IsReviewed')){
          this.live.push(x);
          this.liveDate.push(Date.parse(x.start_date))
        }
        else if(x.status==='closed' && (x.final_status==='winnerdeclared' || x.final_status==='IsAbandoned' || x.winnerstatus==='IsCanceled')){
          this.completed.push(x);
          this.completedDate.push(Date.parse(x.start_date))
        }
      })

      this.upcomingDate.filter((x:any)=>{
        this.finalDate1.push((x - this.myDate)/1000);
      })

      this.liveDate.filter((x:any)=>{
        this.finalDate2.push((x - this.myDate)/1000);
      })

      this.completedDate.filter((x:any)=>{
        this.finalDate3.push((x - this.myDate)/1000);
      })

      this.spinner.hide();

    })
  }


  onCard(key:any,m:any){
    console.log(key,"ID");
    if(m==='Up'){
      this.router.navigate(['joined-contest/upcoming-leauges'],{queryParams: {matchkey:btoa(key)}});
    }
    else if(m==='Li'){
      this.router.navigate(['joined-contest/my-leauges'], {queryParams:{matchkey:btoa(key)}})
    }
    else if(m==='Co'){
      this.router.navigate(['joined-contest/my-leauges'], {queryParams:{matchkey:btoa(key)}})
    }
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
