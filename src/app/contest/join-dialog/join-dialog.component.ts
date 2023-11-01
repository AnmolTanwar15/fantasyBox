import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { BottomSheetContestComponent } from '../bottom-sheet-contest/bottom-sheet-contest.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  key: any;
  ID:any;
  teamid:any;
  joinId:any;
  refer:any;
}

@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.css']
})
export class JoinDialogComponent implements OnInit {

  players: any = [];
  teams: any = [];
  matchKey: any;
  teamNumber: any;
  upcoming: any;
  team1_name: any;
  team2_name: any;
  team1_players: any = [];
  team2_players: any = [];
  wk: any = [];
  bat: any = [];
  ar: any = [];
  bow: any = [];
  team1: any = [];
  team2: any = [];
  teamLength: any;
  newData: any=[];
  showGrass=false;
  keeper:any=[];
  batsman:any=[];
  allrounder:any=[];
  bowler:any=[];
  checkData:any=[];
  radioData:any=[];
  teamId:any;
  buttonDis=true;
  showbtn1=false;
  showbtn2=true;
  showDiv1=true;
  showDiv2=false;
  joinTeamid:any=[];
  changeRadio=true;
  joinedContest:any=[];

  constructor(public dialogRef: MatDialogRef<JoinDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,private api : ApiService,private route : ActivatedRoute,private _bottomSheet: MatBottomSheet, private tostr : ToastrService, private spinner : NgxSpinnerService,private _snackBar: MatSnackBar){
    console.log(data,"DATA");    
  }
  ngOnInit(): void {
    this.spinner.show();
    if(this.data.teamid){
      this.showbtn1=true;
      this.showbtn2=false;
    }
    if(this.data.refer){
      this.showDiv1=false;
      this.showDiv2=true;
    }
    this.api.getMatchList().subscribe((res: any) => {
      this.upcoming = res[0].upcoming;
      console.log(this.upcoming, "UP");
      this.upcoming.filter((x: any) => {
        if (this.data.key == x.matchkey) {
          this.team1_name = x.team1name;
          this.team2_name = x.team2name;
        }
      })

    })

    // this.route.queryParams.subscribe(params => {
    //   this.matchKey = params['key'];
    //   console.log(this.matchKey, "Match key");
    // })

    this.api.getMyTeam(this.data.key).subscribe((res: any) => {
      this.newData=[];
      console.log(res, "MY TEAM");
      this.teams = res;
      // console.log(this.teams, "!@#$");
      this.teams.filter((x:any)=>{
        if(x.teamid == this.data.teamid){
          this.teamId=this.data.teamid;
        }
      })

      this.teams.filter((x: any) => {
        let team1Obj:any={
          't1':[],
          't2':[],
          'wk':[],
          'bat':[],
          'ar':[],
          'bow':[]
        };
        x.player.filter((y: any) => {
          if (y.team == "team1") {
            team1Obj['t1'].push(y.team)
          }
          if (y.team == "team2") {
            team1Obj['t2'].push(y.team)
          } 
          if(y.role=='keeper'){
            team1Obj['wk'].push(y)
          }
          if(y.role=='batsman'){
            team1Obj['bat'].push(y)
          }
          if(y.role=='allrounder'){
            team1Obj['ar'].push(y)
          }
          if(y.role=='bowler'){
            team1Obj['bow'].push(y)
          }
        })
        this.newData.push(team1Obj);
        
      })
      
      console.log("this.newData",this.newData);
      this.spinner.hide();
    })  

    this.api.getMyJoinedLeauges(this.data.key).subscribe((res:any)=>{
      this.joinedContest=res
      console.log("JOINED",this.joinedContest);
      this.joinedContest.filter((x:any)=>{
        if(this.data.ID == x.challenge_id){
          this.joinTeamid = x.teamid;
          console.log("TEAMID",this.joinTeamid);  
        }
      })
    })
  
  }

  // onCheck(p:any){
  //   console.log(p,"DIALOG");
  //   this.api.getUserBalance(this.data.ID).subscribe((res:any)=>{
  //     console.log(res,"RESPONSE");
  //     this.checkData=res;
  //   })
  // }

  onRadio(e:any){
    this.changeRadio=false;
    console.log(e.value,"EVENT");
    this.teamId=e.value.teamid;
    console.log(this.teamId,"ID");
    this.buttonDis=false;    
  }

  onSubmit(){
    this.api.getUserBalance(this.data.ID).subscribe((res:any)=>{
      console.log(res,"RESPONSE");
      this.radioData=res[0];
      console.log(this.radioData,"ON SUBMIT");
      this.buttonDis=true;
      if(Number(this.radioData.usablebalance)>=Number(this.radioData.entryfee)){
        this._bottomSheet.open(BottomSheetContestComponent,{
          data:{key:this.data.key,challenge:this.data.ID,teamid:this.teamId}
        });
      }
      else if(Number(this.radioData.usablebalance)<=Number(this.radioData.entryfee)){
        this.tostr.error("Insufficent Balance");
      }
    })
  }

  onSwitchTeam(){
    console.log(this.teamId,"SDFGTFDCVHG")
    let data:{}={
      "matchkey":Number(this.data.key),
      "teamid":this.teamId,
      "joinid":this.data.joinId,
      "challengeid":this.data.ID,
    }
    this.api.postSwitchTeam(data).subscribe((res:any)=>{
      console.log(res,"Switch Team");    
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, void 0,{
      duration: 2000,
      panelClass: 'center',
    });
    this.dialogRef.close();
  }

}
