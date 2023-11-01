import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:any="http://143.110.244.110/swagger/api/";
  userName:any;
  password:any;
  localdata:any;
  httpOptions:any


  constructor(private http : HttpClient) { 
    this.localdata = localStorage.getItem('AuthKey');
    if(localStorage.getItem('AuthKey')){
      console.log(this.localdata,"SERVICE");
      this.httpOptions={
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.localdata,
        })
      };
    }
    else{
        console.log("hello"); 
    }
  }
  // subject start
  data= new Subject()  
  // subject end


  postData(data:any){
    return this.http.post(this.url+"tempregisteruser",data)
  };
  postOTP(data:any){
    return this.http.post(this.url+"registerusers",data)
  };
  getData(){
    return this.http.get(this.url+"loginuser?username="+this.userName+"&"+"password="+this.password);
  };
  getMatchList(){
    return this.http.get(this.url+"getmatchlistagain",this.httpOptions)
  };
  getContest(id:any){
    return this.http.get(this.url+"getAllContests?matchkey="+id,this.httpOptions)
  };
  getContestByCat(matchkey:any,catid:any){
    return this.http.get(this.url+"getContestByCategory?matchkey="+matchkey+"&category_id="+catid,this.httpOptions);
  };
  getAllPlayers(matchkey:any){
    return this.http.get(this.url+"getallplayers?matchkey="+matchkey,this.httpOptions);
  };
  postCreateTeam(data:any){
    return this.http.post(this.url+"createmyteam",data,this.httpOptions)
  };
  getMyTeam(matchKey:any){
    return this.http.get(this.url+"myteam?matchkey="+matchKey,this.httpOptions)
  };
  getViewTeam(teamId:any){
    return this.http.get(this.url+"viewteam?teamid="+teamId,this.httpOptions)
  };
  getUserBalance(id:any){
    return this.http.get(this.url+"getUsableBalance?challengeid="+id+"&total_team_count=1",this.httpOptions)
  };
  getUserDetails(){
    return this.http.get(this.url+"userfulldetails",this.httpOptions)
  };
  postJoinLeague(obj:any){
    return this.http.post(this.url+"joinleauge",obj,this.httpOptions)
  };
  getTransactions(){
    return this.http.get(this.url+"mytransactions",this.httpOptions)
  };
  getJoinedContest(){
    return this.http.get(this.url+"joinedmatches",this.httpOptions)
  };
  getMyJoinedLeauges(key:any){
    return this.http.get(this.url+"myjoinedleauges?matchkey="+key,this.httpOptions)
  };
  getLeaugesDetails(id:any){
    return this.http.get(this.url+"leaugesdetails?challengeid="+id,this.httpOptions)
  };
  getNotifications(){
    return this.http.get(this.url+"getnotification",this.httpOptions)
  };
  getLeaderChallenge(id:any){
    return this.http.get(this.url+"getleaderboard_challenge?challenge_id="+id,this.httpOptions)
  };
  postEditPofile(data:any){
    return this.http.post(this.url+"editprofile",data,this.httpOptions)
  };
  postSwitchTeam(data:any){
    return this.http.post(this.url+"switchteams",data,this.httpOptions)
  };
}
