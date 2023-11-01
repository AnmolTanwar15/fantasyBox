import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent implements OnInit {

  matchkey:any;
  teams:any;
  team1:any=[];
  team2:any=[];
  img1:any;
  img2:any; 
  upcoming:any;
  team1_name:any;
  team2_name:any;
  team1_player:any=[];
  team2_player:any=[];
  total_players:any=[];
  creditLimit:any=100;
  keeper:any=[];
  bowler:any=[];
  allRound:any=[];
  bats:any=[];
  cindex:any;
  wk:any=[];
  ar:any=[];
  bow:any=[];
  bat:any=[];
  final_players:any=[];
  teamid:any;
  team_id:any;
  focusedDiv:any=[];
  viewTeam:any=[];
  teamNumber2:any;
  sub:any;

constructor(private router : Router, private route : ActivatedRoute, private api : ApiService, private toastr : ToastrService, private spinner : NgxSpinnerService,private location: Location){
  this.api.data.subscribe((x:any)=>{
    console.log(x,"This is the subject response");
    // this.sub=x;
    // if(!x){
    //   window.history.back();
    // }
  })
}


  ngOnInit(): void {
    this.spinner.show();
    console.log("Hello");
    // if(this.sub!=undefined){
    //   window.history.back();
    // }
 
    // if(!localStorage.getItem('Clone') || !localStorage.getItem('Create New') || !localStorage.getItem('Edit') || !localStorage.getItem('Contest') || !localStorage.getItem('View')){
    //   window.history.back();
    // }
    // this.location.replaceState('/home');
    localStorage.removeItem('Players');
    localStorage.removeItem('MatchKey');
    this.route.queryParams.subscribe(params=>{
      this.matchkey=atob(params['key']);
      this.teamid=atob(params['teamid']);
      this.teamNumber2=atob(params['teamnumber'])
      console.log(this.teamNumber2,"Team NUMBER");     
      console.log(this.teamid,"TEAM ID");            
      console.log(this.matchkey,"matchKey");      
    })


    this.api.getMatchList().subscribe((res:any)=>{
      this.upcoming=res[0].upcoming;
      console.log(this.upcoming,"UP");
      this.upcoming.filter((x:any)=>{
        if(this.matchkey == x.matchkey){
          this.img1=x.team1logo;
          this.img2=x.team2logo;
          this.team1_name=x.team1name;
          this.team2_name=x.team2name;
        }
      })   
      this.spinner.hide();
   
    })

    this.api.getAllPlayers(this.matchkey).subscribe((res:any)=>{
      console.log(res, "Team");
      this.teams=res;

      this.teams.filter((x:any)=>{
       if(this.viewTeam.length == null){
        console.log("HYYYYYYYYYY");
        
        if(x.role === 'keeper'){
          this.keeper.push(x);
        }
        else if(x.role === 'batsman'){
          this.bats.push(x);
        }
        else if(x.role === 'bowler'){
          this.bowler.push(x);
        }
        else if(x.role === 'allrounder'){
          this.allRound.push(x);
        }
       }else if(this.viewTeam.length != null){
         this.viewTeam.filter((y:any)=>{
           if(x.id == y.id){
           console.log("HIIIIIII",y.id);
           x.isSelected=true;
           if(x.role === 'keeper'){
              // this.wk.push(y);
              if(x.team == 'team1'){
                if(this.team1_player.length<7){
                   this.wk.push(x);
                   this.team1_player.push(x);
                   this.creditLimit=this.creditLimit-x.credit; 
                 }
                 else{
                   x.isSelected=false;
                   this.toastr.error("Maximun player should be 7 from one team")
                 }
               }
               else if(x.team == 'team2'){
                 if(this.team2_player.length<7){
                   this.wk.push(x);
                   this.team2_player.push(x);
                   this.creditLimit=this.creditLimit-x.credit;                       
                   }
                 else{
                   x.isSelected=false;
                   this.toastr.error("Maximun player should be 7 from one team")
                 }                 
               }
            }
            else if(x.role === 'batsman'){
              // this.bat.push(y);
              if(x.team == 'team1'){
                if(this.team1_player.length<7){
                   this.bat.push(x);
                   this.team1_player.push(x);
                   this.creditLimit=this.creditLimit-x.credit;
                 }
                 else{
                   x.isSelected=false;
                   this.toastr.error("Maximun player should be 7 from one team")
                 }
               }
               else if(x.team == 'team2'){
                 if(this.team2_player.length<7){
                   this.bat.push(x);
                   this.team2_player.push(x);
                   this.creditLimit=this.creditLimit-x.credit;
                 }
                 else{
                   x.isSelected=false;
                   this.toastr.error("Maximun player should be 7 from one team")
                 }                
               }
            }
            else if(x.role === 'bowler'){
              // this.bow.push(y);
              if(x.team == 'team1'){
                if(this.team1_player.length<7){
                  this.bow.push(x);
                  this.team1_player.push(x);
                  this.creditLimit=this.creditLimit-x.credit;
                }
                else{
                  x.isSelected=false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
              else if(x.team == 'team2'){
                if(this.team2_player.length<7){
                  this.bow.push(x);
                  this.team2_player.push(x);
                  this.creditLimit=this.creditLimit-x.credit; 
                }
                else{
                  x.isSelected=false;
                  this.toastr.error("Maximun player should be 7 from one team")
                } 
              }
            }
            else if(x.role === 'allrounder'){
              // this.ar.push(y);
              if(x.team == 'team1'){
                if(this.team1_player.length<7){
                  this.ar.push(x);
                  this.team1_player.push(x);
                  this.creditLimit=this.creditLimit-x.credit; 
                }
                else{
                  x.isSelected=false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }  
              }
              else if(x.team == 'team2'){
               if(this.team2_player.length<7){
                this.ar.push(x);
                this.team2_player.push(x);
                this.creditLimit=this.creditLimit-x.credit; 
              }
              else{
                x.isSelected=false;
                this.toastr.error("Maximun player should be 7 from one team")
              }
              }
            }
            this.total_players.length=this.team1_player.length+this.team2_player.length;
            this.total_players=this.wk.concat(this.ar,this.bat,this.bow);
          }
        })
        if(x.role === 'keeper'){
            this.keeper.push(x);
          }
          else if(x.role === 'batsman'){
            this.bats.push(x);
          }
          else if(x.role === 'bowler'){
            this.bowler.push(x);
          }
          else if(x.role === 'allrounder'){
            this.allRound.push(x);
          }
       }else{
        console.log("HELLOOOOOOOOOOOOO");        
       }
      })
      console.log(this.keeper,"WK");
      console.log(this.bats,"BAT");
      console.log(this.bowler,"BOW");
      console.log(this.allRound,"AR");
      

      this.teams.filter((x:any)=>{
        if(x.team === 'team1'){
          this.team1.push(x);
        }
        else if(x.team === 'team2'){
          this.team2.push(x);
        }
      })
      console.log(this.team1,"Team 1");         
      console.log(this.team2,"Team 2"); 
      
      
   })

   this.api.getViewTeam(this.teamid).subscribe((res:any)=>{
    console.log(res,"VIEW TEAM ");
    this.viewTeam=res;
    console.log(this.viewTeam,"VIEW MY TEAM");

    })
    
  }

  onPlayer(key:any){
    console.log(key,"PLAYER_ID");
    this.teams.filter((x:any,i:any)=>{
      if(x.playerkey == key){
          x.isSelected = !x.isSelected;
          if(x.isSelected == true){
            if(x.role == 'keeper' && this.total_players.length!=11){
              if(this.wk.length<4 && this.creditLimit>0){
                  if(this.total_players.length>=7 && this.ar.length<1 && this.bat.length<2 && this.wk.length>=1 && this.bow.length>=2){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Batters required");
                    return;
                  }
                  else if(this.total_players.length>=7 && this.ar.length<1 && this.bow.length<2 && this.wk.length>=1 && this.bat.length>=2){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Bowlers required");
                    return;
                  }
                  else if(this.total_players.length>=7 && this.bow.length<2 && this.bat.length<2 && this.wk.length>=1 && this.ar.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Bowlers required");
                    return;
                  }
                  else if(this.total_players.length>=8 && this.wk.length>=1 && this.bat.length<=0 && this.ar.length>=1 && this.bow.length<=0){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Batters required");
                    return;
                  }
                  else if(this.total_players.length>=8 && this.ar.length<1 && this.bow.length<2 && this.wk.length>=1 && this.bat.length>=2){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Bowlers required");
                    return;
                  } 
                  else if(this.total_players.length>=9 && this.bow.length<2 && this.bat.length<2 && this.wk.length>=1 && this.ar.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Bowlers required");
                    return;
                  }
                  else if(this.total_players.length>=9 && this.bow.length<2 && this.ar.length<1 && this.wk.length>=1 && this.bat.length>=2){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Bowlers required");
                    return;
                  }
                  else if(this.total_players.length>=9 && this.bat.length<2 && this.ar.length<1 && this.bow.length>=2 && this.wk.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Batters required");
                    return;
                  }
                  else if(this.total_players.length>=9 && this.bat.length<2 && this.wk.length>=1 && this.bow.length>=2 && this.ar.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Batters required");
                    return;
                  }
                  else if(this.total_players.length>=9 && this.bow.length<2 && this.wk.length>=1 && this.bat.length>=2 && this.ar.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Bowlers required");
                    return;
                  }
                  else if(this.total_players.length>=10 && this.ar.length<1 && this.bat.length>=2 && this.bow.length>=2 && this.wk.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 1 All Rounder required");
                    return;
                  }
                  else if(this.total_players.length>=10 && this.bow.length<2 && this.bat.length>=2 && this.ar.length>=1 && this.wk.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Bowlers required");
                    return;
                  }
                  else if(this.total_players.length>=10 && this.bat.length<2 && this.bow.length>=2 && this.ar.length>=1 && this.wk.length>=1){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Batters required");
                    return;
                  }
                  if(x.team == 'team1'){
                   if(this.team1_player.length<7){
                      this.wk.push(x);
                      this.team1_player.push(x);
                      this.creditLimit=this.creditLimit-x.credit; 
                    }
                    else{
                      x.isSelected=false;
                      this.toastr.error("Maximun player should be 7 from one team")
                    }
                  }
                  else if(x.team == 'team2'){
                    if(this.team2_player.length<7){
                      this.wk.push(x);
                      this.team2_player.push(x);
                      this.creditLimit=this.creditLimit-x.credit;                       
                      }
                    else{
                      x.isSelected=false;
                      this.toastr.error("Maximun player should be 7 from one team")
                    }                 
                  }
              }
              else{
                x.isSelected=false;  
                this.toastr.error("Only 4 Wicket Keepers Allowed");
              }
            }
            else if(x.role == 'allrounder' && this.total_players.length!=11){
              if(this.ar.length<6 && this.creditLimit>0){
                if(this.total_players.length>=7 && this.wk.length>=1 && this.bat.length<=0 && this.ar.length<=1 && this.bow.length<=0){
                          
                }
                else if(this.total_players.length>=7 && this.wk.length>=1 && this.bat.length<=0 && this.ar.length>=1 && this.bow.length<=0){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                else if(this.total_players.length>=8 && this.wk.length<1 && this.bat.length<2 && this.ar.length>=1 && this.bow.length>=2){
                    x.isSelected=false;
                    this.toastr.error("Min 2 Batters required")
                    return;
                }
                else if(this.total_players.length>=8 && this.wk.length<1 && this.bow.length<2 && this.ar.length>=1 && this.bat.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required")
                  return;
                }
                else if(this.total_players.length>=9 && this.bow.length<2 && this.bat.length<2 && this.wk.length>=1 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bow.length<2 && this.wk.length<1 && this.ar.length>=1 && this.bat.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bat.length<2 && this.wk.length<1 && this.bow.length>=2 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bat.length<2 && this.wk.length>=1 && this.bow.length>=2 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bow.length<2 && this.wk.length>=1 && this.bat.length>=2 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=10 && this.wk.length<1 && this.bat.length>=2 && this.bow.length>=2 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 1 Wicket Keeper required");
                  return;
                }
                else if(this.total_players.length>=10 && this.bow.length<2 && this.bat.length>=2 && this.ar.length>=1 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=10 && this.bat.length<2 && this.bow.length>=2 && this.ar.length>=1 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                if(x.team == 'team1'){
                  if(this.team1_player.length<7){
                    this.ar.push(x);
                    this.team1_player.push(x);
                    this.creditLimit=this.creditLimit-x.credit; 
                  }
                  else{
                    x.isSelected=false;
                    this.toastr.error("Maximun player should be 7 from one team")
                  }  
                }
                else if(x.team == 'team2'){
                 if(this.team2_player.length<7){
                  this.ar.push(x);
                  this.team2_player.push(x);
                  this.creditLimit=this.creditLimit-x.credit; 
                }
                else{
                  x.isSelected=false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
                }
              }
              else{
                x.isSelected=false;  
                this.toastr.error("Only 6 All Rounder Allowed");
              }
            }
            else if(x.role == 'batsman' && this.total_players.length!=11){
              if(this.bat.length<6 && this.creditLimit>0){
                if(this.total_players.length>=8 && this.wk.length<1 && this.bow.length<2 && this.ar.length>=1 && this.bat.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=8 && this.ar.length<1 && this.bow.length<2 && this.wk.length>=1 && this.bat.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=9 && this.ar.length<1 && this.wk.length<1 && this.bat.length>=2 && this.bow.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 1 Wicket Keeper required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bow.length<2 && this.wk.length<1 && this.ar.length>=1 && this.bat.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bow.length<2 && this.ar.length<1 && this.wk.length>=1 && this.bat.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bow.length<2 && this.bat.length>=2 && this.ar.length>=1 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowler requiredgg");
                  return;
                }
                else if(this.total_players.length>=10 && this.wk.length<1 && this.bat.length>=2 && this.bow.length>=2 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 1 Wicket Keeper required");
                  return;
                }
                else if(this.total_players.length>=10 && this.ar.length<1 && this.bat.length>=2 && this.bow.length>=2 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 1 All Rounder required");
                  return;
                }
                else if(this.total_players.length>=10 && this.bow.length<2 && this.bat.length>=2 && this.ar.length>=1 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Bowlers required");
                  return;
                }
                if(x.team == 'team1'){
                 if(this.team1_player.length<7){
                    this.bat.push(x);
                    this.team1_player.push(x);
                    this.creditLimit=this.creditLimit-x.credit;
                  }
                  else{
                    x.isSelected=false;
                    this.toastr.error("Maximun player should be 7 from one team")
                  }
                }
                else if(x.team == 'team2'){
                  if(this.team2_player.length<7){
                    this.bat.push(x);
                    this.team2_player.push(x);
                    this.creditLimit=this.creditLimit-x.credit;
                  }
                  else{
                    x.isSelected=false;
                    this.toastr.error("Maximun player should be 7 from one team")
                  }                
                }
              }
              else{
                x.isSelected=false;  
                this.toastr.error("Only 6 Batsman Allowed");
              }
            }
            else if(x.role == 'bowler' && this.total_players.length!=11){
              if(this.bow.length<6 && this.creditLimit>0){
                if(this.total_players.length>=8 && this.wk.length<1 && this.bat.length<2 && this.ar.length>=1 && this.bow.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                else if(this.total_players.length>=8 && this.ar.length<1 && this.bat.length<2 && this.wk.length>=1 && this.bow.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                else if(this.total_players.length>=9 && this.ar.length<1 && this.wk.length<1 && this.bat.length>=2 && this.bow.length>=2){
                  x.isSelected=false;
                  this.toastr.error("Min 1 Wicket Keeper required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bat.length<2 && this.wk.length<1 && this.bow.length>=2 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bat.length<2 && this.ar.length<1 && this.bow.length>=2 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters required");
                  return;
                }
                else if(this.total_players.length>=10 && this.wk.length<1 && this.bat.length>=2 && this.bow.length>=2 && this.ar.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 1 Wicket keeper required");
                  return;
                }
                else if(this.total_players.length>=10 && this.ar.length<1 && this.bat.length>=2 && this.bow.length>=2 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 1 All Rounder required");
                  return;
                }
                else if(this.total_players.length>=9 && this.bat.length<2 && this.bow.length>=2 && this.ar.length>=1 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters requiredgg");
                  return;
                }
                else if(this.total_players.length>=9 && this.bat.length<2 && this.bow.length<2 && this.ar.length>=1 && this.wk.length>=1){
                  x.isSelected=false;
                  this.toastr.error("Min 2 Batters requireddddd");
                  return;
                }
                if(x.team == 'team1'){
                  if(this.team1_player.length<7){
                    this.bow.push(x);
                    this.team1_player.push(x);
                    this.creditLimit=this.creditLimit-x.credit;
                  }
                  else{
                    x.isSelected=false;
                    this.toastr.error("Maximun player should be 7 from one team")
                  }
                }
                else if(x.team == 'team2'){
                  if(this.team2_player.length<7){
                    this.bow.push(x);
                    this.team2_player.push(x);
                    this.creditLimit=this.creditLimit-x.credit; 
                  }
                  else{
                    x.isSelected=false;
                    this.toastr.error("Maximun player should be 7 from one team")
                  } 
                }
              }
              else{
                x.isSelected=false;  
                this.toastr.error("Only 6 Bowlers Allowed");
              }
            }
            else if(this.total_players.length=10){
              x.isSelected=false;
              this.toastr.error("Maximum player should be 11")
            }
          }
          else if(x.isSelected == false){
            if(x.role == 'keeper'){
              this.wk.splice(this.wk.indexOf(x),1);
              this.creditLimit=this.creditLimit+Number(x.credit);
              if(x.team == 'team1'){
                this.team1_player.splice(this.team1_player.indexOf(x),1);
              }
              else if(x.team == 'team2'){
                this.team2_player.splice(this.team2_player.indexOf(x),1);
              }
            }
            else if(x.role == 'allrounder'){
              this.ar.splice(this.ar.indexOf(x),1);
              this.creditLimit=this.creditLimit+Number(x.credit);
              if(x.team == 'team1'){
                this.team1_player.splice(this.team1_player.indexOf(x),1);
              }
              else if(x.team == 'team2'){
                this.team2_player.splice(this.team2_player.indexOf(x),1);
              }
            }
            else if(x.role == 'batsman'){
              this.bat.splice(this.bat.indexOf(x),1);
              this.creditLimit=this.creditLimit+Number(x.credit);
              if(x.team == 'team1'){
                this.team1_player.splice(this.team1_player.indexOf(x),1);
              }
              else if(x.team == 'team2'){
                this.team2_player.splice(this.team2_player.indexOf(x),1);
              }
            }
            else if(x.role == 'bowler'){
              this.bow.splice(this.bow.indexOf(x),1);
              this.creditLimit=this.creditLimit+Number(x.credit);
              if(x.team == 'team1'){
                this.team1_player.splice(this.team1_player.indexOf(x),1);
              }
              else if(x.team == 'team2'){
                this.team2_player.splice(this.team2_player.indexOf(x),1);
              }
            }
            else if(this.total_players.length=10){
              x.isSelected=false;
              this.toastr.error("Maximum player should be 11")
            }
          }
          this.total_players.length=this.team1_player.length+this.team2_player.length;
          this.total_players=this.wk.concat(this.ar,this.bat,this.bow);
          console.log(this.total_players,"TOTAL");          
      }
    })

  }


  onReset(){
    
    this.teams.filter((x:any)=>{
      x.isSelected=false;
      this.wk=[];
      this.ar=[];
      this.bow=[];
      this.bat=[];
      this.total_players.length=0;
      this.team1_player.length=0;
      this.team2_player.length=0;
      this.creditLimit=100;
    })
  }


  selectetPlayer(){
    console.log(this.total_players,"FINAL");
      localStorage.setItem('MatchKey',JSON.stringify(this.matchkey));
      localStorage.setItem('Players',JSON.stringify(this.total_players));
      this.router.navigate(['createTeam/view-team']);
  }

  
  editPlayer(){
    localStorage.setItem('MatchKey',JSON.stringify(this.matchkey));
    localStorage.setItem('Players',JSON.stringify(this.total_players));
    this.router.navigate(['createTeam/view-team'],{queryParams:{teamnumber:this.teamNumber2}})
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}

}

