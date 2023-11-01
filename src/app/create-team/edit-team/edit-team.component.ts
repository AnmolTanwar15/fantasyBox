import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit, OnDestroy {

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
  // private unsubscriber: Subject<void> = new Subject<void>();
  
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private spinner : NgxSpinnerService, private location : Location) { }

  ngOnInit(): void {
    this.spinner.show();
    // localStorage.removeItem('Contest');
    // localStorage.removeItem('Edit');
    // localStorage.removeItem('Create New');
    // localStorage.removeItem('Clone');
    localStorage.removeItem('Players');
    localStorage.removeItem('MatchKey');
    // this.location.replaceState('/home');
    this.api.getMatchList().subscribe((res: any) => {
      this.upcoming = res[0].upcoming;
      console.log(this.upcoming, "UP");
      this.upcoming.filter((x: any) => {
        if (this.matchKey == x.matchkey) {
          this.team1_name = x.team1name;
          this.team2_name = x.team2name;
        }
      })
      
      this.spinner.hide();
    })

    this.route.queryParams.subscribe(params => {
      this.matchKey = atob(params['key']);
      console.log(this.matchKey, "Match key");
    })

    this.api.getMyTeam(this.matchKey).subscribe((res: any) => {
      this.newData=[];
      console.log(res, "MY TEAM");
      this.teams = res;
      console.log(this.teams, "!@#$");


     
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

    })

  }

  ngOnDestroy(): void {
    // this.unsubscriber.next();
    // this.unsubscriber.complete();
  }

  onViewTeam(p:any) {
    this.spinner.show();
    this.keeper=[];
    this.batsman=[];
    this.allrounder=[];
    this.bowler=[];
    this.showGrass=true;
    this.api.getViewTeam(p.teamid).subscribe((res:any)=>{
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
      this.spinner.hide();
    })
  }


  onClone(p:any){
    // localStorage.setItem('Clone','CL')
    this.api.data.next('Create')
    this.router.navigate(['createTeam'], { queryParams: { key: btoa(this.matchKey),teamid:btoa(p.teamid) }})
  }

  onCreateNew() {
    // localStorage.setItem('Create New','CN')
    this.api.data.next('Create')
    this.router.navigate(['createTeam'], { queryParams: { key: btoa(this.matchKey) }})
  }

  onEdit(p:any){
    // localStorage.setItem('Edit','E')
    this.api.data.next('Create')
    this.router.navigate(['createTeam'], { queryParams: { key: btoa(this.matchKey),teamid:btoa(p.teamid),teamnumber:btoa(p.teamnumber) }});
  }

  onHome(){
    this.router.navigate(['contest'], { queryParams: { key: btoa(this.matchKey)} });
  }


  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
