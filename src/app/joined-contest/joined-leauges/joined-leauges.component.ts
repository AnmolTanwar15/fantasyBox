import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-joined-leauges',
  templateUrl: './joined-leauges.component.html',
  styleUrls: ['./joined-leauges.component.css']
})
export class JoinedLeaugesComponent implements OnInit {

  matchKey:any;
  joinedLeagues:any=[];
  value:any=[];
  constructor(private route : ActivatedRoute, private api : ApiService, private router : Router, private spinner : NgxSpinnerService){}

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
    this.router.navigate(['joined-contest/leauges-details'], {queryParams:{challengeID:btoa(id),key:btoa(this.matchKey)}})
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['']);
}

}
