import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-leauges-details',
  templateUrl: './leauges-details.component.html',
  styleUrls: ['./leauges-details.component.css']
})
export class LeaugesDetailsComponent implements OnInit {

  challengeID:any;
  leagueDetails:any=[];
  showGrass=false;
  keeper:any=[];
  batsman:any=[];
  allrounder:any=[];
  bowler:any=[];
  leaderBoard:any=[];
  contestRes:any=[];
  contests:any=[];
  price:any=[];
  matchKey:any;

  constructor(private route : ActivatedRoute, private api : ApiService, private router : Router, private spinner : NgxSpinnerService){}


  ngOnInit(): void {
    this.matchKey=''
    this.spinner.show();
    this.route.queryParams.subscribe(params=>{
      this.challengeID = atob(params['challengeID']);
      this.matchKey = atob(params['key'])
      console.log(this.matchKey,"Challenge");     
    })

    this.api.getLeaugesDetails(this.challengeID).subscribe((res:any)=>{
      console.log(res,"LEAUGES DETAILS");
      this.leagueDetails=res;
    })
    
    this.api.getLeaderChallenge(this.challengeID).subscribe((res:any)=>{
      this.leaderBoard=res;
      this.leaderBoard = this.leaderBoard.sort((a:any, b:any) => { if (a.rank < 0) {return -1; } if (b.rank <0 ) {return 1;} return a.rank - b.rank });
      console.log(this.leaderBoard,"LEADER");
      this.spinner.hide();
      
    })
    
    this.api.getContest(this.matchKey).subscribe((res:any)=>{
      this.contestRes=res;
      console.log(this.contestRes,"REsPonse");
      this.contestRes.filter((x:any)=>{
        if(x.id == this.challengeID){
          this.contests=x;
          this.price=x.price_card[0];
          console.log(this.contests,"CONTEST");    
          console.log("Price",this.price);               
        }
      })
      // this.spinner.hide();
    })

  }

  onViewTeam(p:any) {
    this.keeper=[];
    this.batsman=[];
    this.allrounder=[];
    this.bowler=[];
    this.showGrass=true;
    this.api.getViewTeam(p).subscribe((res:any)=>{
      console.log(res,"GRASSS");
      res.filter((x:any)=>{
        if(x.role=='keeper'){
          this.keeper.push(x);
        }
        else if(x.role=='batsman'){
          this.batsman.push(x);
        }
        else if(x.role=='allrounder'){
          this.allrounder.push(x);
        }
        else if(x.role=='bowler'){
          this.bowler.push(x);
        }      
      })
    })
  }



  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}

}
