import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contest-by-cat',
  templateUrl: './contest-by-cat.component.html',
  styleUrls: ['./contest-by-cat.component.css']
})
export class ContestByCatComponent implements OnInit {

  matchKey:any;
  catId:any;
  data:any;
  get_all:any=[];
  value:any=[];
  myAllTeam:any=[];

  constructor(private route : ActivatedRoute,private api : ApiService, private router : Router, private dialog : MatDialog, private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    console.log(window,"NAVIGATION");      
    // localStorage.removeItem('Contest');
    // localStorage.removeItem('Edit');
    // localStorage.removeItem('Create New');
    // localStorage.removeItem('Clone');
    localStorage.removeItem('Players');
    localStorage.removeItem('MatchKey');
    this.route.queryParams.subscribe(params=>{
      this.matchKey=atob(params['key']);
      this.catId=atob(params['cat']);
    });

    this.api.getContestByCat(this.matchKey,this.catId).subscribe((res:any)=>{
      console.log(res,"RESPONSE");   
      this.data=res;  
      this.data.filter((x:any)=>{
        this.value.push((x.maximum_user - x.joinedusers)/x.maximum_user*100);
      })
      console.log(this.value,"VAlue");
      this.data.filter((x:any)=>{
        x.value=0;
      });
      this.data.filter((x:any,i:any)=>{
        x.value=(this.value[i]);
      });
      console.log(this.data,"AQWSEDC");
    })

    this.api.getMyTeam(this.matchKey).subscribe((res:any)=>{
      console.log(res,"GET ALL TEAM");
      this.get_all = res;
      this.spinner.hide();
    })

    this.api.getMyTeam(this.matchKey).subscribe((res:any)=>{
      console.log(res,"MY TEam");
      this.myAllTeam=res;
    })

  }


  onJoin(id:any){
    if(this.get_all.length >= 1){
      this.dialog.open(JoinDialogComponent,{
        width:'max-content',
        height:'max-content',
        data: {key: this.matchKey,ID: id},
      })
    }
    else if(this.get_all.length==0){
      this.router.navigate(['createTeam'],{queryParams:{key:btoa(this.matchKey)}});
    }
  }

  onCard(id:any){
    console.log(id,"CHALLENGE ID");
    // if(this.cardBool == false){
      this.router.navigate(['contest/contest-details'],{queryParams:{ChallengeID:btoa(id),ContestID:btoa(this.matchKey)}})
    // }  
  }


  onCreateTeam(){
    // localStorage.setItem('Contest','C')
    this.router.navigate(['createTeam'],{queryParams:{key:btoa(this.matchKey)}})
  }

  myTeam(){
    this.router.navigate(['createTeam/edit-team'],{queryParams:{key:btoa(this.matchKey)}})
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
