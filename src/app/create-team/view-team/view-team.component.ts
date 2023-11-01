import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Location } from '@angular/common';


declare var $:any;

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})

export class ViewTeamComponent implements OnInit {

  allPlayers:any=[];
  wk:any=[];
  bat:any=[];
  ar:any=[];
  bow:any=[];
  captain:any;
  vicecaptain:any;
  matchkey:any;
  playersId:any=[];
  buttonCap:any=[];
  buttonVice:any=[];
  teamNumber:any;
  team_id:any;
  teamnumber2:any;
  total_players:any=[];
  upcoming:any;
constructor(private router:Router, private route : ActivatedRoute, private api : ApiService, private tostr : ToastrService, private spinner : NgxSpinnerService, private location : Location){}

  ngOnInit(): void {
    this.spinner.show();
    // localStorage.removeItem('Contest');
    // localStorage.removeItem('Edit');
    // localStorage.removeItem('Create New');
    // localStorage.removeItem('Clone')
    if(!localStorage.getItem('Players')){
      window.history.back();
    }
    // this.location.replaceState('/home');
    this.allPlayers = JSON.parse(localStorage.getItem('Players') || '');
    this.matchkey = JSON.parse(localStorage.getItem('MatchKey') || '');
    this.upcoming = localStorage.getItem('EditUp')

    console.log(this.matchkey,"MATCH");

    this.route.queryParams.subscribe(params=>{
      this.teamnumber2=params['teamnumber'];
      console.log(this.teamnumber2,"TEAM NUMBER 2");
      
    })
    

    this.allPlayers.filter((x:any)=>{
      x.Active1=false;
      x.Active2=false;
      this.playersId.push(x.id);

      if(x.role=='keeper'){
        this.wk.push(x);
      }
      else if(x.role=='batsman'){
        this.bat.push(x);
      }
      else if(x.role=='allrounder'){
        this.ar.push(x);
      }
      else if(x.role=='bowler'){
        this.bow.push(x);
      }
    })
    console.log(this.playersId,"HEllo");


    this.api.getMyTeam(this.matchkey).subscribe((res:any)=>{
      console.log(res,"GET TEAM");
      this.teamNumber=res;
      if(this.teamnumber2 != undefined){       
        this.teamNumber.filter((a:any)=>{
          if(this.teamnumber2 == a.teamnumber){
            this.total_players=a.player;
          }
        })
        console.log(this.total_players,"TOTAL");
        this.allPlayers.filter((x:any)=>{
          this.total_players.filter((y:any)=>{
            if(y.captain == 1 && x.id == y.id){
              x.Active1=true;
              x.Active2=false;
              this.buttonCap.push(x.id);
              this.captain=x.id;
            }
            if(y.vicecaptain == 1 && x.id == y.id){
              x.Active1=false;
              x.Active2=true;
              this.buttonVice.push(x.id);
              this.vicecaptain=x.id;
            }
          })
        })
      }
      this.spinner.hide();
    })

  }


  onLableCaptain(i:any,role:any,index:any){    
    this.allPlayers.filter((x:any)=>{
      if(i==x.id){
          x.Active1=true;
          x.Active2=false;
          this.captain=x.id;
        }else{
          x.Active1=false;
        }
      })
      this.buttonCap=[]
      this.buttonCap.push(i);
      this.buttonVice.filter((x:any)=>{
        if(i==x){
          this.buttonVice.splice(this.buttonVice.findIndex((y:any)=>y==i),1) 
        }       
      })
      console.log(this.buttonCap,'ccc');
      console.log(this.captain,"CAP");
  }

  onLableVice(j:any,role:any,index:any){
    this.allPlayers.filter((x:any)=>{
      if(j==x.id){
          x.Active2=true;
          x.Active1=false;
          this.vicecaptain=x.id;
        }else{
          x.Active2=false;
        }
      })
      this.buttonVice=[]
    this.buttonVice.push(j)
    this.buttonCap.filter((x:any)=>{
      if(j==x){
        this.buttonCap.splice(this.buttonCap.findIndex((y:any)=>y==j),1) 
      }     
    })
    console.log(this.buttonVice,'vcccc');
    console.log(this.vicecaptain,"VICE");
}


createTeam(){
  console.log(this.buttonVice,'vccccf');
  console.log(this.buttonCap,'cccf');
  if(this.teamnumber2 != null){
    let data={
      "matchkey":this.matchkey,
      "teamnumber":this.teamnumber2,
      "players":this.playersId[0]+","+this.playersId[1]+","+this.playersId[2]+","+this.playersId[3]+","+this.playersId[4]+","+this.playersId[5]+","+this.playersId[6]+","+this.playersId[7]+","+this.playersId[8]+","+this.playersId[9]+","+this.playersId[10],
      "captain":this.captain,
      "vicecaptain":this.vicecaptain,
    }
    this.api.postCreateTeam(data).subscribe((res:any)=>{
      console.log(res,"RESPONSE");
      if(localStorage.getItem('EditUp')){
        localStorage.removeItem('EditUp')
        this.router.navigate(['joined-contest/upcoming-leauges-details'],{queryParams:{challengeID:btoa(this.upcoming),key:btoa(this.matchkey)}})
      }else{
        if(res.success == true){
          this.tostr.success(res.message);
          this.router.navigate(['createTeam/edit-team'],{queryParams:{key:btoa(this.matchkey)}})
        }else{
          this.tostr.error(res.message);
        }
      }
    })
  }else if(this.teamnumber2 == undefined){
    let data={
      "matchkey":this.matchkey,
      "teamnumber":this.teamNumber.length +1,
      "players":this.playersId[0]+","+this.playersId[1]+","+this.playersId[2]+","+this.playersId[3]+","+this.playersId[4]+","+this.playersId[5]+","+this.playersId[6]+","+this.playersId[7]+","+this.playersId[8]+","+this.playersId[9]+","+this.playersId[10],
      "captain":this.captain,
      "vicecaptain":this.vicecaptain,
    }
    this.api.postCreateTeam(data).subscribe((res:any)=>{
      console.log(res,"RESPONSE");
      if(res.success == true){
        this.tostr.success(res.message);
        this.router.navigate(['createTeam/edit-team'],{queryParams:{key:btoa(this.matchkey)}})
      }else{
        this.tostr.error(res.message);
      }
    })
  }
  // else{
  //   let data={
  //     "matchkey":this.matchkey,
  //     "teamnumber":this.teamNumber.length +1,
  //     "players":this.playersId[0]+","+this.playersId[1]+","+this.playersId[2]+","+this.playersId[3]+","+this.playersId[4]+","+this.playersId[5]+","+this.playersId[6]+","+this.playersId[7]+","+this.playersId[8]+","+this.playersId[9]+","+this.playersId[10],
  //     "captain":this.captain,
  //     "vicecaptain":this.vicecaptain,
  //   }
  //   this.api.postCreateTeam(data).subscribe((res:any)=>{
  //     console.log(res,"RESPONSE");
  //     if(res.success == true){
  //       this.tostr.success(res.message);
  //       this.router.navigate(['createTeam/edit-team'],{queryParams:{key:this.matchkey}})
  //     }else{
  //       this.tostr.error(res.message);
  //     }
  //   })
  // }

}

previous(){
  confirm("ARE YOU SURE")
  this.router.navigate(['createTeam'],{queryParams:{key:btoa(this.matchkey)}})
}


  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}
}
