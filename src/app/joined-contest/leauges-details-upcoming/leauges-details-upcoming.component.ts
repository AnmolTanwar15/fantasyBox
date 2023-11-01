import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { JoinDialogComponent } from 'src/app/contest/join-dialog/join-dialog.component';

@Component({
  selector: 'app-leauges-details-upcoming',
  templateUrl: './leauges-details-upcoming.component.html',
  styleUrls: ['./leauges-details-upcoming.component.css']
})
export class LeaugesDetailsUpcomingComponent {
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
  userInfo:any=[];

  constructor(private route : ActivatedRoute, private api : ApiService, private router : Router, private spinner : NgxSpinnerService, private dialog : MatDialog,private tostr : ToastrService){}


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

    this.api.getUserDetails().subscribe((res:any)=>{
      this.userInfo = res[0];
      console.log(this.userInfo);     
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

  onJoin(){
        if(this.contests.maximum_user!=this.contests.joinedusers){
          this.dialog.open(JoinDialogComponent,{
            width:'max-content',
            height:'max-content',
            data: {key: this.matchKey,ID: this.contests.id,refer:this.leagueDetails[0].refercode},
          })
        }
        else if(this.contests.maximum_user==this.contests.joinedusers){
          this.tostr.error("Spots Limit Exceeded")
        }
  } 

  onSwitchTeam(){
    // if(this.contests.maximum_user!=this.contests.joinedusers){
      this.dialog.open(JoinDialogComponent,{
        width:'max-content',
        height:'max-content',
        data: {key: this.matchKey,ID: this.challengeID,teamid:this.leagueDetails[0].jointeams[0].teamid,joinId:this.leagueDetails[0].jointeams[0].jid},
      })
    // }
    // else if(this.contests.maximum_user==this.contests.joinedusers){
    //   this.tostr.error("Spots Limit Exceeded")
    // }
  }

  onEdit(){
    localStorage.setItem('EditUp',this.challengeID)
    this.router.navigate(['createTeam'], { queryParams: { key: btoa(this.matchKey),teamid:btoa(this.leagueDetails[0].jointeams[0].teamid),teamnumber:btoa(this.leagueDetails[0].jointeams[0].teamnumber) } });
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}

}
