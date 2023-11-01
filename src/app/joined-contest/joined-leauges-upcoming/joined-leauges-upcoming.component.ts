import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { JoinDialogComponent } from 'src/app/contest/join-dialog/join-dialog.component';

@Component({
  selector: 'app-joined-leauges-upcoming',
  templateUrl: './joined-leauges-upcoming.component.html',
  styleUrls: ['./joined-leauges-upcoming.component.css']
})
export class JoinedLeaugesUpcomingComponent {
  matchKey:any;
  joinedLeagues:any=[];
  value:any=[];
  constructor(private route : ActivatedRoute, private api : ApiService, private router : Router, private spinner : NgxSpinnerService, private dialog : MatDialog,private tostr : ToastrService){}

  ngOnInit(): void {
    this.spinner.show();

    this.route.queryParams.subscribe(params=>{
      this.matchKey = atob(params['matchkey']);
      console.log(this.matchKey,"KEY");     
    })

    this.api.getMyJoinedLeauges(this.matchKey).subscribe((res:any)=>{
      console.log(res,"REsponse");
      this.joinedLeagues=res;

      this.joinedLeagues.filter((x:any)=>{
        this.value.push((x.maximum_user - x.joinedusers)/x.maximum_user*100);
      })
      console.log(this.value,"VAlue");
      this.joinedLeagues.filter((x:any)=>{
        x.value=0;
      });
      this.joinedLeagues.filter((x:any,i:any)=>{
        x.value=(this.value[i]);
      });
      console.log(this.joinedLeagues,"AQWSEDC");
      this.spinner.hide();

    })
  }

  onDetails(id:any,Key:any){
    console.log(id,"CHALLENGE");
    this.joinedLeagues.filter((x:any)=>{
      if(id==x.challenge_id){
        // if(x.maximum_user!=x.joinedusers){
          // this.router.navigate(['joined-contest/leauges-details'], {queryParams:{challengeID:btoa(id),key:btoa(this.matchKey)}})
          this.router.navigate(['joined-contest/upcoming-leauges-details'],{queryParams:{challengeID:btoa(id),key:btoa(this.matchKey)}})
        // }
        // else if(x.maximum_user==x.joinedusers){
        //   this.tostr.error("Spots Limit Exceeded")
        // }
      }
    })
  }

  onJoin(id:any){
    this.joinedLeagues.filter((x:any)=>{
      if(id==x.challenge_id){
        if(x.maximum_user!=x.joinedusers){
          this.dialog.open(JoinDialogComponent,{
            width:'max-content',
            height:'max-content',
            data: {key: this.matchKey,ID: id, refer : x.refercode},
          })
        }
        else if(x.maximum_user==x.joinedusers){
          this.tostr.error("Spots Limit Exceeded")
        }
      }
    })
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
