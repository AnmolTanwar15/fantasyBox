import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
  styleUrls: ['./contest-details.component.css']
})
export class ContestDetailsComponent implements OnInit {

  challengeId:any;
  contestId:any;
  contestRes:any=[];
  contests:any=[];
  price:any=[];
  value:any;
  matchKey:any;
  get_all:any=[];
  leaderBoard:any=[];

  constructor(private route : ActivatedRoute,private api : ApiService, private router : Router,public dialog: MatDialog, private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    localStorage.removeItem('Players');
    localStorage.removeItem('MatchKey');
    this.route.queryParams.subscribe(params=>{
      this.challengeId=atob(params['ChallengeID']);
      this.contestId=atob(params['ContestID'])
      console.log("id",this.challengeId,this.contestId);      
    })

    this.api.getContest(this.contestId).subscribe((res:any)=>{
      this.contestRes=res;
      console.log(res,"REsPonse");
      this.contestRes.filter((x:any)=>{
        if(x.id == this.challengeId){
          this.contests=x;
          this.price=x.price_card[0];
          console.log(this.contests,"CONTEST");    
          console.log("Price",this.price);               
        }
      })
      this.value = this.contests.joinedusers/this.contests.maximum_user*100;
    })

    this.api.getMyTeam( this.contestId).subscribe((res:any)=>{
      console.log(res,"GET ALL TEAM");
      this.get_all = res;
    })

    this.api.getLeaderChallenge(this.challengeId).subscribe((res:any)=>{
      this.leaderBoard=res;
      this.leaderBoard = this.leaderBoard.sort((a:any, b:any) => { if (a.rank < 0) {return -1; } if (b.rank <0 ) {return 1;} return a.rank - b.rank });
      console.log(this.leaderBoard,"LEADER");
      this.spinner.hide();

    })
  
  }

  onJoin(){
    if(this.get_all.length >= 1){
      console.log("HELOOOOOOO");
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.contestId,ID:this.challengeId },
        })
      }else if(this.get_all.length==0){
        this.router.navigate(['createTeam'],{queryParams:{key:btoa(this.contestId)}});
      }
  }

  onBack(){
    this.router.navigate(['/contest'],{queryParams: {key: btoa(this.contestId)}});
  }

}
