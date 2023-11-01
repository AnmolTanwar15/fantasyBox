import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { JoinDialogComponent } from './join-dialog/join-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {

  contestId:any;
  contests:any=[];
  value:any=[];
  cat:any=[]
  category:any=[];
  sortCat:any=[];
  head:any=[];
  head2:any=[];
  winner:any=[];
  mega:any=[];
  bonus:any=[];
  special:any=[];
  xyz:any=[];
  safe:any=[];
  img:any=[];
  practice:any=[];
  allwinner:any=[];
  comm:any=[];
  matchKey:any;
  get_all:any=[];
  userInfo:any=[];
  myAllTeam:any=[];

  constructor(private router : Router, private route : ActivatedRoute, private api : ApiService, private tostr : ToastrService,public dialog: MatDialog,private spinner : NgxSpinnerService){}


  ngOnInit(): void {
    this.spinner.show();
    // localStorage.removeItem('Contest');
    // localStorage.removeItem('Edit');
    // localStorage.removeItem('Create New');
    // localStorage.removeItem('Clone');
    localStorage.removeItem('Players');
    localStorage.removeItem('MatchKey');
    this.route.queryParams.subscribe(params=>{
      this.contestId=atob(params['key']);
      console.log(this.contestId,"ContestId");      
    })

    this.api.getContest(this.contestId).subscribe((res:any)=>{
      console.log(res, "Contest");
      this.contests=res;
      this.matchKey=res[0].matchkey
  
      this.contests.filter((x:any)=>{
        this.value.push((x.maximum_user - x.joinedusers)/x.maximum_user*100);
      })
      console.log(this.value,"VAlue");
      this.contests.filter((x:any)=>{
        x.value=0;
      });
      this.contests.filter((x:any,i:any)=>{
        x.value=(this.value[i]);
      });
      console.log(this.contests,"AQWSEDC");
      
      res.filter((x:any)=>{
        this.cat.push(x.catname);
      })  
      console.log(this.cat,"CAT");
      
      this.category = [... new Set(this.cat)];
      console.log(this.category,"CATEGORY");

      this.sortCat = this.category.sort();
      console.log(this.sortCat,"SORT");
      
      
      this.contests.filter((x:any,i:any)=>{
        if(x.catname==this.sortCat[0]){
          if(this.comm.length<3){
            this.comm.push(x);
          }        
        }
        else if(x.catname==this.sortCat[1]){
          if(this.bonus.length<3){
            this.bonus.push(x);
          }
        }
        else if(x.catname==this.sortCat[2]){
          if(this.allwinner.length<3){
            this.allwinner.push(x);
          }
        }
        else if(x.catname==this.sortCat[3]){
            if(this.head.length<3){
              this.head.push(x);
            }
        }
        else if(x.catname==this.sortCat[4]){
          if(this.img.length<3){
            this.img.push(x);
          }
        }
        else if(x.catname==this.sortCat[5]){
          if(this.mega.length<3){
            this.mega.push(x);
          }
        }
        else if(x.catname==this.sortCat[6]){
          if(this.practice.length<3){
            this.practice.push(x);
          }
        }
        else if(x.catname==this.sortCat[7]){
          if(this.safe.length<3){
            this.safe.push(x);
          }
        }
        else if(x.catname==this.sortCat[8]){
          if(this.special.length<3){
            this.special.push(x);
          }
        }
        else if(x.catname==this.sortCat[9]){
          if(this.winner.length<3){
            this.winner.push(x);
          }
        }
        else if(x.catname==this.sortCat[10]){
          if(this.xyz.length<3){
            this.xyz.push(x);
          }
        }
      })
      console.log(this.head,"HEAD");
      console.log(this.comm,"COMM");
      console.log(this.bonus,"bonus");
      console.log(this.allwinner,"allwinner");
      console.log(this.img,"img");
      console.log(this.mega,"mega");
      console.log(this.practice,"practice");
      console.log(this.safe,"safe");
      console.log(this.special,"specila");
      console.log(this.winner,"winner");
      console.log(this.xyz,"xyz");

      this.api.getMyTeam(this.matchKey).subscribe((res:any)=>{
        console.log(res,"GET ALL TEAM");
        this.get_all = res;
      })
      this.spinner.hide();
    })

    this.api.getMyTeam(this.contestId).subscribe((res:any)=>{
      console.log(res,"MY TEam");
      this.myAllTeam=res;
    })
   
    
  }

onJoin(c:any,id:any){
  if(this.get_all.length >= 1){
      console.log("HELOOOOOOO");
      if(c === 'head'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'winner'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'mega'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'bonus'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'special'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'safe'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'img'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'practice'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'allwinner'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }
      else if(c === 'comm'){
        // this.tostr.success(c);
        this.dialog.open(JoinDialogComponent,{
          width:'max-content',
          height:'max-content',
          data: {key: this.matchKey,ID: id},
        })
      }else{
        this.tostr.error("ERROR")
      }
    }else if(this.get_all.length==0){
      this.router.navigate(['createTeam'],{queryParams:{key:btoa(this.matchKey)}});
    }
}

onCard(id:any){
  console.log(id,"CHALLENGE ID");
  this.router.navigate(['contest/contest-details'],{queryParams:{ChallengeID:btoa(id),ContestID:btoa(this.contestId)}})
}

onEntry(matchkey:any,catid:any){
  this.router.navigate(['contest/contestByCat'],{queryParams:{key:btoa(matchkey),cat:btoa(catid)}})
}


onCreateTeam(){
  this.api.data.next('Create')
  // localStorage.setItem('Contest','C')
  this.router.navigate(['createTeam'],{queryParams:{key:btoa(this.matchKey)}})
}

myTeam(){
  this.router.navigate(['createTeam/edit-team'],{queryParams:{key:btoa(this.contestId)}})
}

onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}
}
