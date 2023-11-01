import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  
  userInfo:any=[];

  constructor(private api : ApiService, private router : Router, private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.getUserDetails().subscribe((res:any)=>{
      this.userInfo = res[0];
      console.log(this.userInfo);  
      this.spinner.hide();   
    })
  }


}
